import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/common/pagination-dto';
import { ServiceListDto } from 'src/dto/services/services-list.dto';
import { Services } from 'src/entities/service.entity';
import { PLATFORM_CONFIG } from 'src/utill/config';
import { ILike, Repository } from 'typeorm';
import { cloneDeep } from 'lodash';

@Injectable()
export class PlatformApiService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Services) private serviceRepository: Repository<Services>,
  ) {}

  private GitContants = {
    user: {
      token: PLATFORM_CONFIG.GIT_HUB_USER_API_TOKEN,
      owner: PLATFORM_CONFIG.GIT_HUB_USERNAME,
    },
    org: {
      token: PLATFORM_CONFIG.GIT_HUB_ORG_API_TOKEN,
      owner: PLATFORM_CONFIG.GIT_HUB_ORGANIZATION,
    },
  };

  /**
   * 获取组织下所有的仓库
   * @param org
   */
  async getRepositoriesForOrg(org: string) {
    const apiUrl = PLATFORM_CONFIG.GIT_HUB_API_URL;
    const token = this.GitContants['org'].token;

    const response = await this.httpService
      .get(`${apiUrl}/orgs/${org}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .toPromise();
    console.log('仓库数据', response.data);
    for (const item of response.data) {
      const repo = await this.serviceRepository.findOneBy({ name: item.name });
      if (repo) {
        await this.serviceRepository.remove(repo);
      }
      await this.saveApiDataToDB(item, 'org');
    }
    return response.data;
  }

  /**
   * 获取用户下所有的仓库
   * @param user
   */
  async getRepositoriesForUser(user: string) {
    const apiUrl = PLATFORM_CONFIG.GIT_HUB_API_URL;
    const token = this.GitContants['user'].token;

    const response = await this.httpService
      .get(`${apiUrl}/users/${user}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .toPromise();
    console.log('仓库数据', response.data);
    for (const item of response.data) {
      const repo = await this.serviceRepository.findOneBy({ name: item.name });
      if (repo) {
        await this.serviceRepository.remove(repo);
      }
      await this.saveApiDataToDB(item, 'org');
    }
    return response.data;
  }

  /**
   * 获取仓库对应的分支列表
   * @param repo
   * @param owner
   */
  async getBranchForRepo(type: string, repos: string) {
    const apiUrl = PLATFORM_CONFIG.GIT_HUB_API_URL;

    const { token, owner } = this.GitContants[type];

    const response = await this.httpService
      .get(`${apiUrl}/repos/${owner}/${repos}/branches`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .toPromise();

    return response.data;
  }

  /**
   * 保存仓库信息到数据库
   * @param data
   */
  async saveApiDataToDB(data: any, type: string) {
    console.log('仓库信息---', data);

    const service = new Services();
    service.name = data.name;
    service.gitAddress = data.clone_url;
    service.gitBranch = data.default_branch;
    service.owner = type;

    const commits = await this.getReposCommits(type, data.name);
    if (commits.length > 0) {
      service.gitCommitId = commits[0].sha;
      service.gitCommitMessage = commits[0].commit.message;
      service.gitCommitTime = commits[0].commit.committer.date;
    }
    return this.serviceRepository.save(service);
  }

  /**
   * 获取仓库对应的提交记录
   * @param repo
   * @param owner
   */
  async getReposCommits(type: string, repos: string) {
    const apiUrl = PLATFORM_CONFIG.GIT_HUB_API_URL;

    const { token, owner } = this.GitContants[type];

    const response = await this.httpService
      .get(`${apiUrl}/repos/${owner}/${repos}/commits`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .toPromise();

    return response.data;
  }

  /**
   * 分页查询所有服务
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: ServiceListDto[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    const [data, count] = await this.serviceRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
    });

    const result = cloneDeep(data);
    result.forEach((item) => {
      item.owner = this.GitContants[item.owner].owner;
    });

    return { content: result, total: count };
  }

  /**
   * @description: 删除服务
   * @param uuid 服务uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.serviceRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.serviceRepository.remove(result);
  }
}

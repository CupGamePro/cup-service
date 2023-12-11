import { PaginationDto } from './../common/dto/pagination-dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family } from './entities/family.entity';
import { EnumCommonDto } from './../common/dto/enum-common.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
  ) {}

  /**
   * 添加家族
   * @param createFamilyDto
   * @returns
   */
  async create(createFamilyDto: CreateFamilyDto) {
    const { code } = createFamilyDto;
    const result = await this.familyRepository.findOne({ where: { code } });
    if (result) {
      throw new HttpException(
        `${code}编号已存在，请勿重复提交`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.familyRepository.save(createFamilyDto);
  }

  /**
   * 分页查询所有家族
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: Family[]; total: number }> {
    const [data, count] = await this.familyRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: { isDelete: 0, ...condition },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { content: data, total: count };
  }

  /**
   * 查询所有家族（按编号去重）
   * @returns
   */
  async getAllFamilies(): Promise<Family[]> {
    const families = await this.familyRepository
      .createQueryBuilder('family')
      .select()
      .where('family.status = :status', { status: 1 })
      .andWhere('family.isDelete = :isDelete', { isDelete: 0 })
      .getMany();
    return families;
  }

  /**
   * 查询所有区服
   * @returns
   */
  async getAllServer(): Promise<EnumCommonDto[]> {
    const servers = await this.familyRepository
      .createQueryBuilder('family')
      .select(['family.serve'])
      .getMany();

    const result = servers.map((e) => {
      return {
        name: e.serve,
        value: e.serve,
      };
    });
    return result;
  }

  /**
   * 查询单个家族
   * @param id
   * @returns
   */
  async findOne(uuid: string): Promise<Family> {
    const result = await this.familyRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return result;
  }

  /**
   * 更新家族信息
   * @param uuid
   * @param updateFamilyDto
   * @returns
   */
  async update(uuid: string, updateFamilyDto: UpdateFamilyDto) {
    const result = await this.familyRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.familyRepository.update(uuid, updateFamilyDto);
  }

  /**
   * 删除家族信息
   * @param uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.familyRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.familyRepository.update(uuid, { isDelete: 1 });
  }
}

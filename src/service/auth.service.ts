import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from 'src/dto/auth/create-auth.dto';
import { PaginationDto } from 'src/dto/common/pagination-dto';
import { MenuListDto } from 'src/dto/menu/menu-list-info.dto';
import { Auth } from 'src/entities/auth.entity';
import { Menu } from 'src/entities/menu.entity';
import { ILike, Repository } from 'typeorm';
import { MenuService } from './menu.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private readonly menuService: MenuService,
  ) {}
  /**
   * @description: 创建权限
   * @param auth 权限实体
   * @returns
   */
  async create(auth: CreateAuthDto) {
    const { code } = auth;
    const result = await this.authRepository.findOne({ where: { code } });
    if (result) {
      throw new HttpException(
        `${code}编码已存在，请勿重复提交`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.authRepository.save(auth);
  }
  /**
   * 分页查询所有权限
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: Auth[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    const [data, count] = await this.authRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
    });
    return { content: data, total: count };
  }

  /**
   * @description: 查询所有菜单
   * @return {*}
   */
  async findAllMenu(): Promise<MenuListDto[]> {
    const whereCondition = {
      isDelete: 0,
    };
    // 查询所有菜单数据
    const data = await this.menuRepository.find({
      where: whereCondition,
      order: { sort: 'ASC' },
    });

    // 将所有菜单数据转换为树形结构
    const roots = this.menuService.buildTree(data);

    return roots;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  /**
   * @description: 删除权限
   * @param uuid 菜单uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.authRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.authRepository.update(uuid, { isDelete: 1 });
  }
}

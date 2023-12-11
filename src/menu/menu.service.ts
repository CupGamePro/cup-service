/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-02 15:46:22
 * @Description: 菜单管理service
 */
import { PaginationDto } from './../common/dto/pagination-dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuListDto } from './dto/menu-list-info.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  private readonly MENU_TYPE = {
    1: '目录',
    2: '菜单',
  };

  /**
   * @description: 创建菜单
   * @param menu 菜单实体
   * @returns
   */
  async create(menu: CreateMenuDto) {
    const { code } = menu;
    const result = await this.menuRepository.findOne({ where: { code } });
    if (result) {
      throw new HttpException(
        `${code}编码已存在，请勿重复提交`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.menuRepository.save(menu);
  }

  /**
   * @description: 分页查询所有菜单
   * @return {*}
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: MenuListDto[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    // 查询所有菜单数据
    const data = await this.menuRepository.find({
      where: whereCondition,
      order: { sort: 'ASC' },
      cache: true,
    });

    // 将所有菜单数据转换为树形结构
    const roots = this.buildTree(data);

    // 对树形结构进行分页处理，并返回分页后的数据
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const total = roots.length;
    const content = roots.slice(start, end);

    return { content, total };
  }

  /**
   * @description: 查询所有目录
   * @returns {Promise<MenuListDto[]>}
   */
  async findAllCatalog(): Promise<MenuListDto[]> {
    return await this.menuRepository.find({
      where: { isDelete: 0, type: 1 },
      order: { createTime: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  /**
   * @description: 更新菜单
   * @param {*}
   * @return {*}
   */
  async update(menu: UpdateMenuDto) {
    const result = await this.menuRepository.findOne({
      where: { uuid: menu.uuid },
    });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.menuRepository.update(menu.uuid, menu);
  }

  /**
   * @description: 禁用启用
   * @param {*}
   * @return {*}
   */
  async updateStatus(uuid: string, status: number) {
    const menu = await this.menuRepository.findOne({ where: { uuid } });
    if (!menu) {
      throw new NotFoundException('未发现该菜单');
    }

    menu.status = status;
    await this.menuRepository.save(menu);
    await this.disableMenuAndChildrenRecursive(menu, status);
  }

  /**
   * @description: 删除菜单
   * @param uuid 菜单uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.menuRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.menuRepository.update(uuid, { isDelete: 1 });
  }

  /**
   * @description: 递归禁用子菜单
   * @param menu 菜单实体
   * @return {*}
   */
  private async disableMenuAndChildrenRecursive(menu: Menu, status: number) {
    menu.status = status;
    await this.menuRepository.save(menu);

    const children = await this.menuRepository.find({
      where: { parentId: menu.uuid },
    });
    for (const child of children) {
      await this.disableMenuAndChildrenRecursive(child, status);
    }
  }

  /**
   * @description: 构建树形结构
   * @param data 菜单数据
   * @return {*}
   */
  private buildTree(data: MenuListDto[]): MenuListDto[] {
    const map = new Map<string, MenuListDto>();
    const roots: MenuListDto[] = [];
    // 将所有菜单按照 ID 存储到 Map 中
    for (const item of data) {
      item.typeName = this.MENU_TYPE[item.type];
      map.set(item.uuid, { ...item, children: [] });
    }

    // 构建树形结构
    for (const item of data) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(map.get(item.uuid));
      } else {
        roots.push(map.get(item.uuid));
      }
    }

    return roots;
  }
}

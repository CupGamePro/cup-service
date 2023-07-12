/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-02 15:46:22
 * @Description: 菜单管理service
 */
import { PaginationDto } from './../common/dto/pagination-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  /**
   *
   * @description: 分页查询所有菜单
   * @return {*}
   *
   */
  async findAll({
    pageSize,
    page,
  }: PaginationDto): Promise<{ data: Menu[]; count: number }> {
    const [data, count] = await this.menuRepository.findAndCount({
      order: { createTime: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { data, count };
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}

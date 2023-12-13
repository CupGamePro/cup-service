import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { Role } from '../entities/role.entity';
import { PaginationDto } from '../dto/common/pagination-dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * @description 创建角色
   * @param CreateRoleDto 角色
   * @returns
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  /**
   * 分页查询所有角色
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: Role[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    const [data, count] = await this.roleRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { content: data, total: count };
  }

  /**
   * 查询角色
   * @param uuid
   * @returns
   */
  async findOne(uuid: string): Promise<Role> {
    const result = await this.roleRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return result;
  }

  /**
   * @description: 更新角色
   * @param {*}
   * @return {*}
   */
  async update(role: UpdateRoleDto) {
    const result = await this.roleRepository.findOne({
      where: { uuid: role.uuid },
    });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.roleRepository.update(role.uuid, role);
  }

  /**
   * @description: 禁用启用
   * @param {*}
   * @return {*}
   */
  async updateStatus(uuid: string, status: number) {
    const menu = await this.roleRepository.findOne({ where: { uuid } });
    if (!menu) {
      throw new NotFoundException('查询不到此记录');
    }

    menu.status = status;
    await this.roleRepository.save(menu);
  }

  /**
   * @description: 删除角色
   * @param uuid 角色uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.roleRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.roleRepository.update(uuid, { isDelete: 1 });
  }
}

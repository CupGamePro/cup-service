import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private userRepository: Repository<Role>,
  ) {}

  /**
   * @description 创建用户
   * @param CreateRoleDto 用户
   * @returns
   */
  async create(CreateRoleDto: CreateRoleDto): Promise<Role> {
    const user = this.userRepository.create(CreateRoleDto);
    return await this.userRepository.save(user);
  }

  /**
   * 分页查询所有用户
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: Role[]; total: number }> {
    const [data, count] = await this.userRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: { isDelete: 0, ...condition },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { content: data, total: count };
  }

  /**
   * 查询用户
   * @param uuid
   * @returns
   */
  async findOne(uuid: string): Promise<Role> {
    const result = await this.userRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return result;
  }

  /**
   * @description: 更新用户
   * @param {*}
   * @return {*}
   */
  async update(user: UpdateRoleDto) {
    const result = await this.userRepository.findOne({
      where: { uuid: user.uuid },
    });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.userRepository.update(user.uuid, user);
  }

  /**
   * @description: 删除用户
   * @param uuid 用户uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.userRepository.findOne({ where: { uuid } });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.userRepository.update(uuid, { isDelete: 1 });
  }
}

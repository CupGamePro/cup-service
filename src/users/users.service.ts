import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { UserListDto } from './dto/user-list-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly GENDER_STATUS = {
    male: '男',
    female: '女',
  };

  /**
   * @description 创建用户
   * @param createUserDto 用户
   * @returns
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.code = await this.generateEmployeeNumber();
    const user = this.userRepository.create(createUserDto);
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
  }: PaginationDto): Promise<{ content: UserListDto[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    const [data, count] = await this.userRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
    });

    const result = data.map((ele) => {
      return {
        ...ele,
        genderName: this.GENDER_STATUS[ele.gender],
      };
    });
    return { content: result, total: count };
  }

  /**
   * 查询用户
   * @param uuid
   * @returns
   */
  async findOne(uuid: string): Promise<User> {
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
  async update(user: UpdateUserDto) {
    const result = await this.userRepository.findOne({
      where: { uuid: user.uuid },
    });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.userRepository.update(user.uuid, user);
  }

  /**
   * @description: 禁用启用
   * @param {*}
   * @return {*}
   */
  async updateStatus(uuid: string, status: number) {
    const menu = await this.userRepository.findOne({ where: { uuid } });
    if (!menu) {
      throw new NotFoundException('查询不到此记录');
    }

    menu.status = status;
    await this.userRepository.save(menu);
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

  /**
   * @description: 生成工号
   * @param {*}
   * @return {*}
   */
  async generateEmployeeNumber(): Promise<string> {
    // 获取当前日期
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // 获当年录入的用户总数
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('YEAR(user.create_time) = :year', { year: year })
      .getCount();

    // 生成工号
    const employeeNumber = `${year}${month}${day}${count
      .toString()
      .padStart(4, '0')}`;
    return employeeNumber;
  }
}

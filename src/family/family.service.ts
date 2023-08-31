import { PaginationDto } from './../common/dto/pagination-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family } from './entities/family.entity';

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
  }: PaginationDto): Promise<{ data: Family[]; count: number }> {
    const [data, count] = await this.familyRepository.findAndCount({
      order: { createTime: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { data, count };
  }

  /**
   * 查询单个家族
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<Family> {
    const options: FindOneOptions<Family> = { where: { id } };
    return await this.familyRepository.findOne(options);
  }

  /**
   * 更新家族信息
   * @param id
   * @param updateFamilyDto
   * @returns
   */
  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return await this.familyRepository.update(id, updateFamilyDto);
  }

  /**
   * 删除家族信息
   * @param id
   * @returns
   */
  async remove(id: string) {
    return await this.familyRepository.update(id, { isDelete: '1' });
  }
}

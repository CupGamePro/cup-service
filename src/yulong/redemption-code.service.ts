import { PaginationDto } from './../common/dto/pagination-dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRedemptionCodeDto } from './dto/create-redemption-code.dto';
import { UpdateRedemptionCodeDto } from './dto/update-redemption-code.dto';
import { RedemptionCode } from './entities/redemption-code.entity';

@Injectable()
export class RedemptionCodeService {
  constructor(
    @InjectRepository(RedemptionCode)
    private redemptionCodeRepository: Repository<RedemptionCode>,
  ) {}

  /**
   * 添加兑换码
   * @param createRedemptionCodeDto
   * @returns
   */
  async create(createRedemptionCodeDto: CreateRedemptionCodeDto) {
    const { code } = createRedemptionCodeDto;
    const result = await this.redemptionCodeRepository.findOne({
      where: { code },
    });
    if (result) {
      throw new HttpException(
        `${code}兑换码已存在，请勿重复提交`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.redemptionCodeRepository.save(createRedemptionCodeDto);
  }

  /**
   * 分页查询所有记录
   * @param param0
   * @returns
   */
  async findAll({
    pageSize,
    page,
  }: PaginationDto): Promise<{ content: RedemptionCode[]; total: number }> {
    const [data, count] = await this.redemptionCodeRepository.findAndCount({
      order: { createTime: 'DESC' },
      relations: ['family'],
      where: { isDelete: 0 },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return { content: data, total: count };
  }

  /**
   * 查询一条记录
   * @param id
   * @returns
   */
  async findOne(code: string): Promise<RedemptionCode> {
    const result = await this.redemptionCodeRepository.findOne({
      where: { code },
    });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return result;
  }

  /**
   * 更新记录
   * @param id
   * @param updateRedemptionCodeDto
   * @returns
   */
  async update(uuid: string, updateRedemptionCodeDto: UpdateRedemptionCodeDto) {
    const result = await this.redemptionCodeRepository.findOne({
      where: { uuid },
    });
    if (!result) {
      throw new NotFoundException('更新失败');
    }
    return await this.redemptionCodeRepository.update(
      uuid,
      updateRedemptionCodeDto,
    );
  }

  /**
   * 删除记录
   * @param uuid
   * @returns
   */
  async remove(uuid: string) {
    const result = await this.redemptionCodeRepository.findOne({
      where: { uuid },
    });
    if (!result) {
      throw new NotFoundException('查询不到此记录');
    }
    return await this.redemptionCodeRepository.update(uuid, { isDelete: 1 });
  }
}

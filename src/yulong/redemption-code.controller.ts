import { PaginationDto } from './../common/dto/pagination-dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RedemptionCodeService } from './redemption-code.service';
import { CreateRedemptionCodeDto } from './dto/create-redemption-code.dto';
import { UpdateRedemptionCodeDto } from './dto/update-redemption-code.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('兑换码管理')
@Controller('redemption-code')
export class RedemptionCodeController {
  constructor(private readonly redemptionCodeService: RedemptionCodeService) {}

  @ApiOperation({ summary: '添加兑换码记录' })
  @Post()
  async create(@Body() createRedemptionCodeDto: CreateRedemptionCodeDto) {
    return await this.redemptionCodeService.create(createRedemptionCodeDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.redemptionCodeService.findAll(query);
  }

  @ApiOperation({ summary: '查询详情' })
  @Get(':code')
  async findOne(@Param('code') code: string) {
    return await this.redemptionCodeService.findOne(code);
  }

  @ApiOperation({ summary: '修改记录' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRedemptionCodeDto: UpdateRedemptionCodeDto,
  ) {
    return await this.redemptionCodeService.update(id, updateRedemptionCodeDto);
  }

  @ApiOperation({ summary: '删除记录' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.redemptionCodeService.remove(id);
  }
}

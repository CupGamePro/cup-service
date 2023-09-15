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
import { FamilyService } from './family.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('家族管理')
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @ApiOperation({ summary: '添加家族记录' })
  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.create(createFamilyDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/list')
  async findAll(@Body() family: PaginationDto) {
    return await this.familyService.findAll(family);
  }

  @ApiOperation({ summary: '查询所有家族（按编号去重）' })
  @Get('/families')
  async getAllFamilies() {
    return await this.familyService.getAllFamilies();
  }

  @ApiOperation({ summary: '查询所有区服' })
  @Get('/servers')
  async getAllServer() {
    return await this.familyService.getAllServer();
  }

  @ApiOperation({ summary: '查询详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyService.findOne(id);
  }

  @ApiOperation({ summary: '修改记录' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familyService.update(id, updateFamilyDto);
  }

  @ApiOperation({ summary: '删除记录' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyService.remove(id);
  }
}

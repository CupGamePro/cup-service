import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('公共接口')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post()
  create() {
    return this.commonService.create();
  }

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.commonService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(+id);
  }
}

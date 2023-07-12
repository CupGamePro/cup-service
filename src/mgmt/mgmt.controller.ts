import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MgmtService } from './mgmt.service';
import { CreateMgmtDto } from './dto/create-mgmt.dto';
import { UpdateMgmtDto } from './dto/update-mgmt.dto';

@Controller('mgmt')
export class MgmtController {
  constructor(private readonly mgmtService: MgmtService) {}

  @Post()
  create(@Body() createMgmtDto: CreateMgmtDto) {
    return this.mgmtService.create(createMgmtDto);
  }

  @Get()
  findAll() {
    return this.mgmtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mgmtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMgmtDto: UpdateMgmtDto) {
    return this.mgmtService.update(+id, updateMgmtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mgmtService.remove(+id);
  }
}

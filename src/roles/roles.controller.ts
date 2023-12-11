import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { BaseServiceName } from 'src/config';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('角色')
@Controller(BaseServiceName + '/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: '添加角色' })
  @Post()
  create(@Body() role: CreateRoleDto) {
    return this.rolesService.create(role);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/list')
  async findAll(@Body() role: PaginationDto) {
    return await this.rolesService.findAll(role);
  }

  @ApiOperation({
    summary: '查询角色',
  })
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.rolesService.findOne(uuid);
  }

  @ApiOperation({
    summary: '修改角色',
  })
  @Patch()
  update(@Body() role: UpdateRoleDto) {
    return this.rolesService.update(role);
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.rolesService.remove(uuid);
  }
}

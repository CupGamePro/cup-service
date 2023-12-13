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
import { RolesService } from '../service/roles.service';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dto/common/pagination-dto';
import { BaseServiceName } from 'src/config';
import { CreateRoleDto } from '../dto/role/create-role.dto';

@ApiTags('角色')
@Controller(BaseServiceName + '/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: '添加角色' })
  @Post('create')
  create(@Body() role: CreateRoleDto) {
    return this.rolesService.create(role);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/lists')
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
    summary: '更新用户状态',
  })
  @Patch('/updateStatus/:uuid')
  updateStatus(@Param('uuid') uuid: string, @Query('status') status: number) {
    return this.rolesService.updateStatus(uuid, status);
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.rolesService.remove(uuid);
  }
}

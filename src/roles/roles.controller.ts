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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { BaseServiceName } from 'src/config';

@ApiTags('角色')
@Controller(BaseServiceName + '/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: '添加角色' })
  @Post()
  create(@Body() CreateRoleDto: CreateRoleDto) {
    return this.rolesService.create(CreateRoleDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/list')
  async findAll(@Body() user: PaginationDto) {
    return await this.rolesService.findAll(user);
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
  update(@Body() user: UpdateRoleDto) {
    return this.rolesService.update(user);
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.rolesService.remove(uuid);
  }
}

/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-01 22:42:58
 * @Description: 菜单模块
 */
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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { BaseServiceName } from 'src/config';

@ApiTags('菜单')
@Controller(BaseServiceName + '/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '新增菜单',
  })
  @Post('createMenu')
  create(@Body() menu: CreateMenuDto) {
    return this.menuService.create(menu);
  }

  @ApiOperation({
    summary: '查询所有菜单',
  })
  @Post('lists')
  async findAll(@Body() query: PaginationDto) {
    return await this.menuService.findAll(query);
  }

  @ApiOperation({
    summary: '查询所有目录',
  })
  @Get('catalogs')
  async findAllCatalog() {
    return await this.menuService.findAllCatalog();
  }

  @ApiOperation({
    summary: '查询单个菜单',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @ApiOperation({
    summary: '修改菜单',
  })
  @Patch()
  update(@Body() menu: UpdateMenuDto) {
    return this.menuService.update(menu);
  }

  @ApiOperation({
    summary: '更新菜单状态',
  })
  @Patch('/updateStatus/:uuid')
  updateStatus(@Param('uuid') uuid: string, @Query('status') status: number) {
    return this.menuService.updateStatus(uuid, status);
  }

  @ApiOperation({
    summary: '删除菜单',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.menuService.remove(uuid);
  }
}

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
  UseInterceptors,
} from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { CreateMenuDto } from '../dto/menu/create-menu.dto';
import { UpdateMenuDto } from '../dto/menu/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dto/common/pagination-dto';
import { SERVICE_NAME } from 'src/utill/config';
import { CurrentUserInterceptor } from 'src/utill/current.user.decorator';

@ApiTags('菜单')
@Controller(SERVICE_NAME + '/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '新增菜单',
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Post('create')
  create(@Body() menu: CreateMenuDto) {
    return this.menuService.create(menu);
  }

  @ApiOperation({
    summary: '分页查询所有菜单',
  })
  @Post('list')
  async findAll(@Body() query: PaginationDto) {
    return await this.menuService.findAll(query);
  }

  @ApiOperation({
    summary: '查询所有菜单',
  })
  @Get('sysmenu')
  async findAllMenu() {
    return await this.menuService.findAllMenu();
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
  @UseInterceptors(CurrentUserInterceptor)
  @Patch()
  update(@Body() menu: UpdateMenuDto) {
    return this.menuService.update(menu);
  }

  @ApiOperation({
    summary: '更新菜单状态',
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Patch('/updateStatus/:uuid')
  updateStatus(@Param('uuid') uuid: string, @Query('status') status: number) {
    return this.menuService.updateStatus(uuid, status);
  }

  @ApiOperation({
    summary: '删除菜单',
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.menuService.remove(uuid);
  }
}

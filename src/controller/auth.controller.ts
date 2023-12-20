/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-01 22:42:58
 * @Description: 权限模块
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/auth/create-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dto/common/pagination-dto';
import { SERVICE_NAME } from 'src/utill/config';
import { CurrentUserInterceptor } from 'src/utill/current.user.decorator';

@ApiTags('权限')
@Controller(SERVICE_NAME + '/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '新增权限',
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Post('create')
  create(@Body() auth: CreateAuthDto) {
    return this.authService.create(auth);
  }

  @ApiOperation({
    summary: '分页查询所有权限',
  })
  @Post('list')
  async findAll(@Body() query: PaginationDto) {
    return await this.authService.findAll(query);
  }

  @ApiOperation({
    summary: '查询权限树',
  })
  @Get('tree/list')
  async findAuthTree() {
    return await this.authService.findAllMenu();
  }

  @ApiOperation({
    summary: '查询单个权限',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @ApiOperation({
    summary: '删除权限',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.authService.remove(uuid);
  }
}

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
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseServiceName } from 'src/config';
import { PaginationDto } from '../dto/common/pagination-dto';

@ApiTags('用户')
@Controller(BaseServiceName + '/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '添加用户' })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/list')
  async findAll(@Body() user: PaginationDto) {
    return await this.usersService.findAll(user);
  }

  @ApiOperation({
    summary: '查询用户',
  })
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @Patch()
  update(@Body() user: UpdateUserDto) {
    return this.usersService.update(user);
  }

  @ApiOperation({
    summary: '更新用户状态',
  })
  @Patch('/updateStatus/:uuid')
  updateStatus(@Param('uuid') uuid: string, @Query('status') status: number) {
    return this.usersService.updateStatus(uuid, status);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
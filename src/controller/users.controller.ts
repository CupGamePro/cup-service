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
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SERVICE_NAME } from 'src/utill/config';
import { PaginationDto } from '../dto/common/pagination-dto';
import { UserBodyParamsDto } from 'src/dto/user/user-body-params.dto';
import { CurrentUserInterceptor } from 'src/utill/current.user.decorator';

@ApiTags('用户')
@Controller(SERVICE_NAME + '/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '添加用户' })
  @UseInterceptors(CurrentUserInterceptor)
  @Post('create')
  create(@Body() user: UserBodyParamsDto) {
    return this.usersService.create(user);
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
  @UseInterceptors(CurrentUserInterceptor)
  @Patch()
  update(@Body() user: UserBodyParamsDto) {
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

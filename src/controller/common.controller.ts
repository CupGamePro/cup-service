import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { CommonService } from '../service/common.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/common/login.dto';
import { BaseServiceName } from 'src/config';
import { Public } from 'src/utill/public.decorator';

@ApiTags('公共接口')
@Controller(BaseServiceName + '')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  @ApiOperation({
    summary: '登录',
  })
  @Post('login')
  @Public()
  login(@Body() user: LoginDto) {
    return this.commonService.login(user);
  }

  @ApiOperation({
    summary: '获取用户信息',
  })
  @Get('getUserInfo')
  getUserInfo(@Headers('authorization') authorization: string) {
    console.log(authorization);

    const token = authorization.split(' ')[1]; // 提取 token 的语法
    return this.commonService.getUserInfo(token);
  }
}

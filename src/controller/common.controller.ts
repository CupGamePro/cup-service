import { Body, Controller, Get, Post, Headers, Req } from '@nestjs/common';
import { CommonService } from '../service/common.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/common/login.dto';
import { SERVICE_NAME } from 'src/config';
import { Public } from 'src/utill/public.decorator';

@ApiTags('公共接口')
@Controller(SERVICE_NAME + '')
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
  getUserInfo(@Req() request: Request) {
    const userUuid = request['user'].uuid || '';
    return this.commonService.getUserInfo(userUuid);
  }
}

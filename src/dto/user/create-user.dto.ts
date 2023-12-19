import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '工号', example: '20230923' })
  code: string;

  @ApiProperty({ description: '用户名', example: 'Admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: '119728@zcw' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '邮箱', example: 'changweicup@163.com' })
  email: string;

  @ApiProperty({ description: '真实姓名', example: '张三' })
  reallyName: string;

  @ApiProperty({ description: '电话', example: '1398888888' })
  phone: string;

  @ApiProperty({ description: '地址', example: '北海市衢州县星海村' })
  address: string;

  @ApiProperty({ description: '头像', example: '' })
  avatar: string;

  @ApiProperty({ description: '性别', example: 'male' })
  gender: string;

  @ApiProperty({ description: '状态', example: 1 })
  status: number;

  @ApiProperty({ description: '角色', example: [] })
  roleIds: string[];
}

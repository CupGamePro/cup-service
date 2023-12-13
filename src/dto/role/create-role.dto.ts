import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名', example: '管理员' })
  @IsNotEmpty({ message: '角色名不能为空' })
  name: string;

  @ApiProperty({ description: '角色编码', example: 'ADMIN' })
  @IsNotEmpty({ message: '角色编码不能为空' })
  code: string;

  @ApiProperty({ description: '描述', example: '' })
  description: string;

  @ApiProperty({ description: '状态', example: 1 })
  status: number;
}

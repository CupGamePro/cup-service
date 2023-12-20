import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ description: '权限名称', example: '新建' })
  @IsNotEmpty({ message: '名称不能为空' })
  name?: string;

  @ApiProperty({ description: '权限标识', example: 'create' })
  @IsNotEmpty({ message: '标识不能为空' })
  code?: string;
}

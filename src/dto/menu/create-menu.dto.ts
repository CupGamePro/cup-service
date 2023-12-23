/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-01 23:42:16
 * @Description: 菜单DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base-dto';

export class CreateMenuDto extends BaseDto {
  @ApiProperty({ description: '菜单名称', example: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  name?: string;

  @ApiProperty({ example: '编码' })
  @IsNotEmpty()
  code?: string;

  @ApiProperty({ example: 'icon' })
  icon?: string;

  @ApiProperty({ example: '/menu/pageList' })
  path?: string;

  level?: number;

  @ApiProperty({ example: '' })
  parentId?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  type?: number;

  @ApiProperty({ example: 1 })
  sort?: number;

  @ApiProperty({ example: '菜单名称' })
  describe?: string;

  @ApiProperty({ example: 1 })
  status?: number;
}

/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-04-01 22:07:55
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-01 22:44:37
 * @Description: 全局分页
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'PageSize, defaults to 100',
    type: Number,
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  pageSize = 5;

  @ApiPropertyOptional({
    description: 'Page, defaults to 0',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page = 1;
}

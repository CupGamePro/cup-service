import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiPropertyOptional({
    description: '创建人',
    type: String,
  })
  createdBy: string;
  @ApiPropertyOptional({
    description: '更新人',
    type: String,
  })
  updatedBy: string;
}

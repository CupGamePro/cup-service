import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRedemptionCodeDto {
  @ApiProperty({ description: '玩家昵称', example: '唐舞桐' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '家族ID',
    example: '65b76536-f720-4742-b4bd-a31be20e1295',
  })
  @IsNotEmpty()
  familyId: string;

  @ApiProperty({ description: '兑换码', example: 'KDSFSKFOWKKKRER' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '状态', example: '已发放' })
  @IsNotEmpty()
  status: string;
}

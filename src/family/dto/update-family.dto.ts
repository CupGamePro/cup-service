import { PartialType } from '@nestjs/swagger';
import { CreateFamilyDto } from './create-family.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @ApiProperty({ description: '家族名称' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: '家族名称', example: '一曲相思' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '家族编号', example: 'DG050' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '区服', example: 'X50大国崛起' })
  @IsNotEmpty()
  serve: string;

  @ApiProperty({ description: '状态', example: '开启中' })
  @IsNotEmpty()
  status: string;
}

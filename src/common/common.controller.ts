import { Controller } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('公共接口')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateMgmtDto } from './create-mgmt.dto';

export class UpdateMgmtDto extends PartialType(CreateMgmtDto) {}

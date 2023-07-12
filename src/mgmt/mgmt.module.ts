import { Module } from '@nestjs/common';
import { MgmtService } from './mgmt.service';
import { MgmtController } from './mgmt.controller';

@Module({
  controllers: [MgmtController],
  providers: [MgmtService],
})
export class MgmtModule {}

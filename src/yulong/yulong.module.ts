import { Module } from '@nestjs/common';
import { RedemptionCodeService } from './redemption-code.service';
import { RedemptionCodeController } from './redemption-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedemptionCode } from './entities/redemption-code.entity';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { Family } from './entities/family.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RedemptionCode, Family]),
    TypeOrmModule.forFeature([Family]),
  ],
  controllers: [RedemptionCodeController, FamilyController],
  providers: [RedemptionCodeService, FamilyService],
})
export class YulongModule {}

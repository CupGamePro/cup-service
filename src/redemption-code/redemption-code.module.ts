import { Module } from '@nestjs/common';
import { RedemptionCodeService } from './redemption-code.service';
import { RedemptionCodeController } from './redemption-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedemptionCode } from './entities/redemption-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RedemptionCode])],
  controllers: [RedemptionCodeController],
  providers: [RedemptionCodeService],
})
export class RedemptionCodeModule {}

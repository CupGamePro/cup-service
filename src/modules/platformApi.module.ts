import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlatformApiService } from 'src/service/platformApi.service';
import { PlatformApiController } from 'src/controller/platformApi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/entities/service.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Services])],
  controllers: [PlatformApiController],
  providers: [PlatformApiService],
})
export class PlatformApiModule {}

import { Module } from '@nestjs/common';
import { PipelineService } from '../service/pipeline.service';
import { PipelineController } from '../controller/pipeline.controller';
import { Pipeline } from 'src/entities/pipeline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pipeline])],
  controllers: [PipelineController],
  providers: [PipelineService],
})
export class PipelineModule {}

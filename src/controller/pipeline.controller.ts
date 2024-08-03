import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/common/pagination-dto';
import { CreatePipelineDto } from 'src/dto/pipeline/create-pipeline.dto';
import { UpdatePipelineDto } from 'src/dto/pipeline/update-pipeline.dto';
import { PipelineService } from 'src/service/pipeline.service';
import { Public } from 'src/utill/public.decorator';

@ApiTags('流水线')
@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelineService.create(createPipelineDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Post('/list')
  @Public()
  async findAllByPage(@Body() condition: PaginationDto) {
    return await this.pipelineService.findAll(condition);
  }

  @ApiOperation({ summary: '执行流水线' })
  @Get('/exec/:pipelineId')
  @Public()
  async execPipeline(@Param('pipelineId') pipelineId: string) {
    return await this.pipelineService.execPipeline(pipelineId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(+id, updatePipelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineService.remove(+id);
  }
}

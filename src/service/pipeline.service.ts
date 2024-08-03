import { Injectable } from '@nestjs/common';
import { CreatePipelineDto } from '../dto/pipeline/create-pipeline.dto';
import { UpdatePipelineDto } from '../dto/pipeline/update-pipeline.dto';
import { Pipeline } from 'src/entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/common/pagination-dto';
import { Repository, ILike } from 'typeorm';
import { spawn } from 'child_process';

@Injectable()
export class PipelineService {
  constructor(
    @InjectRepository(Pipeline)
    private readonly pipelineRepository: Repository<Pipeline>,
  ) {}

  create(createPipelineDto: CreatePipelineDto) {
    return 'This action adds a new pipeline';
  }

  /**
   * 分页查询
   * @param param0 分页参数
   * @returns
   */
  async findAll({
    pageSize,
    page,
    condition,
  }: PaginationDto): Promise<{ content: Pipeline[]; total: number }> {
    const whereCondition = {
      isDelete: 0,
      ...Object.entries(condition).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = ILike(`%${value}%`);
        }
        return acc;
      }, {}),
    };
    const [data, count] = await this.pipelineRepository.findAndCount({
      order: { createTime: 'DESC' },
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
    });
    return { content: data, total: count };
  }

  async execPipeline(pipelineId: string) {
    const commands = [
      'git clone git@github.com:CupGamePro/hundun-website.git',
      'yarn',
      'npm run build',
    ];
    for (const command of commands) {
      console.log(`执行命令：${command}`);
      const executionLog = await this.executeCommandAndGetLog(
        command,
        commands,
      );
      console.log(`${command} 执行成功`);
    }
  }

  private async executeCommandAndGetLog(
    command: string,
    commands,
  ): Promise<string> {
    const spacePath =
      commands[0] !== command
        ? process.cwd() + '/space/hundun-website'
        : process.cwd() + '/space';
    return new Promise<string>((resolve, reject) => {
      const startTime = new Date().getTime(); // Record start time
      const task = spawn(command, {
        shell: true,
        cwd: spacePath,
      });

      let executionLog = '';

      task.stdout.on('data', (data) => {
        executionLog += data.toString();
      });

      task.stderr.on('data', (data) => {
        executionLog += `Error: ${data}`;
      });

      task.on('close', (code) => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        executionLog += `Task finished with exit code ${code}, duration: ${duration}ms`;
        console.log(executionLog);
        resolve(executionLog);
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pipeline`;
  }

  update(id: number, updatePipelineDto: UpdatePipelineDto) {
    return `This action updates a #${id} pipeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipeline`;
  }
}

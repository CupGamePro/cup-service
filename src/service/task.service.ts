import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateTaskDto: UpdateTaskDto) {
    throw new Error('Method not implemented.');
  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
}

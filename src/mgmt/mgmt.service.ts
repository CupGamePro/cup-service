import { Injectable } from '@nestjs/common';
import { CreateMgmtDto } from './dto/create-mgmt.dto';
import { UpdateMgmtDto } from './dto/update-mgmt.dto';

@Injectable()
export class MgmtService {
  create(createMgmtDto: CreateMgmtDto) {
    return 'This action adds a new mgmt';
  }

  findAll() {
    return `This action returns all mgmt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mgmt`;
  }

  update(id: number, updateMgmtDto: UpdateMgmtDto) {
    return `This action updates a #${id} mgmt`;
  }

  remove(id: number) {
    return `This action removes a #${id} mgmt`;
  }
}

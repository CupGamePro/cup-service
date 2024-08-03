import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Pipeline extends CommonEntity {
  @Column()
  name: string;

  @Column()
  serviceId: string;

  @Column()
  status: string;

  @Column()
  execUser: string;

  @Column()
  execTime: string;
}

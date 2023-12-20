import { Entity, Column } from 'typeorm';
import { CommonEntity } from 'src/entities/common.entity';

@Entity()
export class Auth extends CommonEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}

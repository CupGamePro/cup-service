import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class Family extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  serve: string;

  @Column()
  status: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  icon: string;

  @Column()
  path: string;

  @Column()
  level: string;

  @Column()
  type: string;

  @Column()
  sort: number;

  @Column()
  describe: string;

  @Column()
  status: string;
}

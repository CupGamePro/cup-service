import { Entity, Column } from 'typeorm';
import { CommonEntity } from 'src/entities/common.entity';

@Entity()
export class Menu extends CommonEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  icon: string;

  @Column()
  path: string;

  @Column()
  parentId: string;

  @Column()
  level: number;

  @Column()
  type: number;

  @Column()
  sort: number;

  @Column()
  describe: string;

  @Column()
  status: number;
}

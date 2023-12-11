import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  updateTime: Date;

  @Column({ type: 'int', default: 0 })
  isDelete: number;
}

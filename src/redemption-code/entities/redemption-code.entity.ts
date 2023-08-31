import { CommonEntity } from 'src/common/entities/common.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class RedemptionCode extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  familyId: string;

  @Column()
  status: string;
}

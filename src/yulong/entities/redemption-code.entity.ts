import { Family } from 'src/yulong/entities/family.entity';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity()
export class RedemptionCode extends CommonEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  familyId: string;

  @Column()
  status: string;

  @ManyToOne(() => Family, (famliy) => famliy.redemp)
  family: Family;
}

import { RedemptionCode } from 'src/yulong/entities/redemption-code.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
@Entity()
export class Family extends CommonEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  serve: string;

  @Column()
  status: string;

  @OneToMany(() => RedemptionCode, (redemp) => redemp.family)
  redemp: RedemptionCode[];
}

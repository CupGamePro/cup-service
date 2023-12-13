import { CommonEntity } from 'src/entities/common.entity';
import { UserRole } from './user-role.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  // 用户和角色之间的关系
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}

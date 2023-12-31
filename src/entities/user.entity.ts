import { CommonEntity } from 'src/entities/common.entity';
import { UserRole } from './user-role.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  reallyName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'male',
  })
  gender: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  // 用户和角色之间的关系
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}

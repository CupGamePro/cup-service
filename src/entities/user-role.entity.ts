import { CommonEntity } from 'src/entities/common.entity';

import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole extends CommonEntity {
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}

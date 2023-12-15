import { CreateUserDto } from './create-user.dto';

export class UserBodyParamsDto {
  user: CreateUserDto;
  roleIds: string[];
}

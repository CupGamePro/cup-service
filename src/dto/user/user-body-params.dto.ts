import { UpdateUserDto } from './update-user.dto';

export class UserBodyParamsDto {
  user: UpdateUserDto;
  roleIds: string[];
}

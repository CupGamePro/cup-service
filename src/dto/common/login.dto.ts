import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({
    description: '账号',
    type: String,
  })
  username: string;
  @ApiPropertyOptional({
    description: '密码',
    type: String,
  })
  password: string;
}

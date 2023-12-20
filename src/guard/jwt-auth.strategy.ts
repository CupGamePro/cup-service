import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../utill/config';

export interface JwtPayload {
  username: string;
  uuid: string;
}

@Injectable()
// 验证请求头中的token
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: JwtPayload) {
    const { username, uuid } = payload;
    return {
      username,
      uuid,
    };
  }
}

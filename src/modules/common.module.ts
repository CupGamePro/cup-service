import { Global, Module } from '@nestjs/common';
import { CommonService } from '../service/common.service';
import { CommonController } from '../controller/common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utill/constants';
import { JwtAuthStrategy } from '../guard/jwt-auth.strategy';
import { UserRole } from 'src/entities/user-role.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService, JwtAuthStrategy],
})
export class CommonModule {}

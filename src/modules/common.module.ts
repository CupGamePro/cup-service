import { Global, Module } from '@nestjs/common';
import { CommonService } from '../service/common.service';
import { CommonController } from '../controller/common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from '../config';
import { JwtAuthStrategy } from '../guard/jwt-auth.strategy';
import { UserRole } from 'src/entities/user-role.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: JWT_CONSTANTS.expiresIn },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService, JwtAuthStrategy],
})
export class CommonModule {}

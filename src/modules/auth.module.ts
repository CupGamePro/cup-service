import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth.entity';
import { AuthService } from 'src/service/auth.service';
import { AuthController } from 'src/controller/auth.controller';
import { Menu } from 'src/entities/menu.entity';
import { MenuService } from 'src/service/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Menu])],
  controllers: [AuthController],
  providers: [AuthService, MenuService],
})
export class AuthModule {}

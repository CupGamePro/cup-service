import { Module } from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { MenuController } from '../controller/menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

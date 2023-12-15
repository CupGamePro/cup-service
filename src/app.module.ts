import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './modules/menu.module';
import { CommonModule } from './modules/common.module';
import { UsersModule } from './modules/users.module';
import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '119728@zcw', //密码
      host: '1.12.181.98', //host
      port: 13306, //
      database: 'games', //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 10, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      dateStrings: true,
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      extra: {
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        connectTimeout: 10000, // 连接超时时间（毫秒）
        acquireTimeout: 10000, // 获取连接超时时间（毫秒）
      },
    }),
    MenuModule,
    CommonModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

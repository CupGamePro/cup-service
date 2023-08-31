/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-10 15:53:20
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-02 15:26:00
 * @Description: 项目入口
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { ValidationPipe } from '@nestjs/common';
import {
  GlobalResponseInterceptor,
  GlobalExceptionFilter,
} from './utill/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  generateDocument(app);

  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 将全局的 ValidationPipe 应用于应用程序
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();

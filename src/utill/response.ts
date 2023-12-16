/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:43:55
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-02 15:35:12
 * @Description: 统一处理返回值
 */
import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((e) => {
        const res = context.switchToHttp().getResponse();
        console.log(res);

        if (res.statusCode <= 201) {
          return {
            data: e,
            code: 200,
            timestamp: new Date().getTime(),
            message: 'success',
            success: true,
          };
        } else {
          console.log(e);

          throw e;
        }
      }),
    );
  }
}

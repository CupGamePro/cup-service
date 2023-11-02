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
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((e) => {
        const res = context.switchToHttp().getResponse();
        if (res.statusCode !== 200 && e.code === undefined) {
          throw e;
        } else {
          return {
            data: e,
            code: 200,
            timestamp: new Date().getTime(),
            message: 'success',
          };
        }
      }),
    );
  }
}

@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);

    const { message, errors } = exception.getResponse();

    if (message) {
      response.status(500).json({
        code: 500,
        message: message || message[0],
        errors: errors || 'Internal server error',
      });
    } else {
      response.status(500).json({
        code: 500,
        message: exception.getResponse(),
        errors: 'Internal server error',
      });
    }
  }
}

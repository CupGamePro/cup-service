import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取 response 对象
    const status = exception.getStatus(); // 获取异常的状态码
    console.log('响应异常' + exception.getResponse());
    console.log('真实异常' + exception);
    response.status(status).json({
      code: status,
      timestamp: new Date().getTime(),
      message: exception.getResponse()['message'] || exception.message,
      success: false,
    });
  }
}

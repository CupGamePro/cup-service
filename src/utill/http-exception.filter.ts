import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('异常信息=====================》', exception);

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      message:
        exception instanceof HttpException
          ? exception.getResponse()['message']
          : 'Internal Server Error',
      success: false,
    });
  }
}

import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import dotenv from 'dotenv';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    
    constructor(
        private logger: Logger
    ) {}

    catch(exception: Error, host: ArgumentsHost): void {

        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception instanceof HttpException ?  exception.message : 'Internal server error'
        
        const devErrorResponse: any = {
            path: req.url,
            method: req.method,
            statusCode: statusCode,
            message: message,
            timestamp: new Date().toISOString()
        }

        const prodErrorResponse: any = {
            statusCode: statusCode,
            message: message
        };

        this.logger.log(`${req.method} ${req.url}`, JSON.stringify(devErrorResponse));
        res.status(statusCode).json(process.env.NODE_ENV === 'development'? devErrorResponse : prodErrorResponse);

    }

}

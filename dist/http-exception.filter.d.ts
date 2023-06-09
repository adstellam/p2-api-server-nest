import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    constructor(logger: Logger);
    catch(exception: Error, host: ArgumentsHost): void;
}

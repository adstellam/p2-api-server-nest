import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
export declare class AuthorizationGuard implements CanActivate {
    private configService;
    private reflector;
    pgPool: Pool;
    cognitoJwtVerifier: any;
    constructor(configService: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

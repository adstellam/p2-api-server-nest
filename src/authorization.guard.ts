import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { JwtExpiredError, JwtInvalidClaimError } from 'aws-jwt-verify/error';
import { User, Permissions } from 'src/users/users.entity';
import { HttpMethodEnum } from 'src/enums';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    pgPool: Pool;
    cognitoJwtVerifier: any;

    constructor(
        private configService: ConfigService, 
        private reflector: Reflector
    ) {
        this.pgPool = new Pool({
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: parseInt(this.configService.get<string>('POSTGRES_PORT')),
            database: this.configService.get<string>('POSTGRES_DATABASE'),
            user: this.configService.get<string>('POSTGRES_USER'),
            password:this.configService.get<string>('POSTGRES_PASSWORD')
        });
        this.cognitoJwtVerifier  = CognitoJwtVerifier.create({
            userPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
            clientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
            tokenUse: "id",
            includeRawJwtInErrors: true
        });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const resource: string = this.reflector.get<string>('ApiResource', context.getHandler());
        const req: Request = context.switchToHttp().getRequest();
        const auth_header: string = req.headers['authorization'] || req.headers['Authorization'];
        const jwt: string = (auth_header?.startsWith('bearer') || auth_header?.startsWith('Bearer')) ? auth_header.substring(7, auth_header.length) : '';
        try {
            const payload = await this.cognitoJwtVerifier.verify(jwt);
            const sql: string = 'SELECT * FROM stout.users WHERE username = $1';
            const val: string[] = [payload["cognito:username"]];
            try {
                const result: QueryResult<User> = await this.pgPool.query(sql, val);
                if (result.rows[0]) {
                    const permissions_list: Permissions[] = result.rows[0].permissions_list;
                    console.log('Requested resource: ', resource);
                    permissions_list.forEach((permissions) => {
                        console.log('User permissions for the requested resource: ', permissions[resource]);
                        console.log('Request method: ', HttpMethodEnum[req.method]);
                        if (permissions[resource].includes(HttpMethodEnum[req.method])) {
                            console.log('CanActivate: true');
                            return true;
                        }
                    });
                } else {
                    return false;
                }
            } catch(err) {
                throw err;
            }
        } catch(err) {
                if (err instanceof DatabaseError)
                    throw new HttpException(`DatabaseError: ${err.message}`, 403);
                else if (err instanceof JwtExpiredError)
                    throw new HttpException(`JwtExpiredError: ${err.message}`, 403);
                else if (err instanceof JwtInvalidClaimError) {
                    console.error(`JwtInvalidClaimError: ${err.message} JWT Payload: err.rawJwt.payload`);
                    throw new HttpException(`JwtInvalidClaimError: ${err.message}`, 403);
                } else
                    throw new HttpException(`JWT Verification Failed: ${err.mesage}`, 403);
        };
    }

}
import { Controller, Get, Query, Headers, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryResult, DatabaseError } from 'pg';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { JwtExpiredError, JwtInvalidClaimError } from 'aws-jwt-verify/error';
import { UserInfoService } from 'src/user-info/user-info.service';
import { UserInfo } from 'src/user-info/user-info.enity';

@Controller('user-info')
export class UserInfoController {

    cognitoJwtVerifier: any

    constructor(
        private configService: ConfigService, 
        private userInfoService: UserInfoService
    ) {
        this.cognitoJwtVerifier  = CognitoJwtVerifier.create({
            userPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
            clientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
            tokenUse: "id",
            includeRawJwtInErrors: true
        });
    }

    @Get()
    async get_user_info(
        @Headers('authorization') auth_header: string,
        @Query('username') username: string
    ): Promise<UserInfo> {
        const jwt: string = (auth_header?.startsWith('bearer') || auth_header?.startsWith('Bearer')) ? auth_header.substring(7, auth_header.length) : "";
        try {
            const payload = await this.cognitoJwtVerifier.verify(jwt)
            try {
                const result: QueryResult<UserInfo> = await this.userInfoService.get_user_info(payload["cognito:username"]);
                console.log(result.rows[0]);
                return result.rows[0];
            } catch(err) {
                throw err;
            }
        } catch(err) {
            if (err instanceof DatabaseError)
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
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

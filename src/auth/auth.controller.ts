import { Controller, Post, Body, BadRequestException, HttpException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CognitoUserCredentials, CognitoUserAttributes, CognitoJwtObject } from 'src/auth/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('signin')
    async signin(
        @Body() cognitoUserCredentials: CognitoUserCredentials
    ): Promise<CognitoJwtObject> {
        try {
            const jwt: string = await this.authService.signin(cognitoUserCredentials);
            return { jwt: jwt };
        } catch(err) {
            if (err instanceof BadRequestException) 
                throw new HttpException(`BadRequestException: ${err.message}`, 401);
            else 
                throw new HttpException(err.message, 500);
        }
    }

    @Post('signup')
    async signup(
        @Body() cognitoUserAttributes: CognitoUserAttributes
    ): Promise<string | BadRequestException> {
        try {
            return await this.authService.signup(cognitoUserAttributes);
        } catch(err) {
            if (err instanceof BadRequestException) 
                throw new HttpException(`BadRequestException: ${err.message}`, 401);
            else 
                throw new HttpException(err.message, 500);
        }
    }

    @Post('signout')
    async signout(): Promise<void> {
        try {
            await this.authService.signout();
        } catch(err) {
            if (err instanceof BadRequestException) 
                throw new HttpException(`BadRequestException: ${err.message}`, 401);
            else 
                throw new HttpException(err.message, 500);
        }
    }

}

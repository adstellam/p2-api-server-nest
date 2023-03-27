import { BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CognitoUserCredentials, CognitoUserAttributes, CognitoJwtObject } from 'src/auth/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(cognitoUserCredentials: CognitoUserCredentials): Promise<CognitoJwtObject>;
    signup(cognitoUserAttributes: CognitoUserAttributes): Promise<string | BadRequestException>;
    signout(): Promise<void>;
}

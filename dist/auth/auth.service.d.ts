import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private cognitoUserPool;
    constructor(configService: ConfigService);
    signin(userCredentials: {
        username: string;
        password: string;
    }): Promise<string>;
    signup(userAttributes: {
        username: string;
        password: string;
        email: string;
    }): Promise<string>;
    signout(): Promise<void>;
}

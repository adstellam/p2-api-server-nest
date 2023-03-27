import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {

    private cognitoUserPool: CognitoUserPool;

    constructor(
        private configService: ConfigService
    ) {
        this.cognitoUserPool = new CognitoUserPool({
            UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
            ClientId: this.configService.get<string>('COGNITO_CLIENT_ID')
        });
    }

    async signin(
        userCredentials: { username: string, password: string }
    ): Promise<string> {
        const cognitoUser: CognitoUser = new CognitoUser({
            Username: userCredentials.username,
            Pool: this.cognitoUserPool
        });
        const authenticationDetails: AuthenticationDetails = new AuthenticationDetails({
            Username: userCredentials.username,
            Password: userCredentials.password
        });
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (cognitoUserSession: CognitoUserSession) => { 
                    resolve(cognitoUserSession.getIdToken().getJwtToken());
                },
                onFailure: (err: BadRequestException) => { 
                    reject(err); 
                }
            });
        });
    }

    async signup(
        userAttributes: { username: string, password: string, email: string }
    ): Promise<string> {
        const cognitoUserAttributes: CognitoUserAttribute[] = [];
        cognitoUserAttributes.push(new CognitoUserAttribute({ Name: 'email', Value: userAttributes.email }));
        return new Promise((resolve, reject) => {
            this.cognitoUserPool.signUp(userAttributes.username, userAttributes.password, cognitoUserAttributes, null, (err, result) => {
                if (err)
                    reject(new BadRequestException(err));
                else
                    resolve(result.user.getUsername());
            });
        });
    }

    async signout(): Promise<void> {
        const cognitoUser: CognitoUser = this.cognitoUserPool.getCurrentUser();
        if (cognitoUser)
            cognitoUser.signOut();
        else
            throw new BadRequestException();          
    }

}

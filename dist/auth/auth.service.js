"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
let AuthService = class AuthService {
    constructor(configService) {
        this.configService = configService;
        this.cognitoUserPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
            ClientId: this.configService.get('COGNITO_CLIENT_ID')
        });
    }
    async signin(userCredentials) {
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
            Username: userCredentials.username,
            Pool: this.cognitoUserPool
        });
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: userCredentials.username,
            Password: userCredentials.password
        });
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (cognitoUserSession) => {
                    resolve(cognitoUserSession.getIdToken().getJwtToken());
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    }
    async signup(userAttributes) {
        const cognitoUserAttributes = [];
        cognitoUserAttributes.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'email', Value: userAttributes.email }));
        return new Promise((resolve, reject) => {
            this.cognitoUserPool.signUp(userAttributes.username, userAttributes.password, cognitoUserAttributes, null, (err, result) => {
                if (err)
                    reject(new common_1.BadRequestException(err));
                else
                    resolve(result.user.getUsername());
            });
        });
    }
    async signout() {
        const cognitoUser = this.cognitoUserPool.getCurrentUser();
        if (cognitoUser)
            cognitoUser.signOut();
        else
            throw new common_1.BadRequestException();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
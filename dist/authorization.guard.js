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
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const aws_jwt_verify_1 = require("aws-jwt-verify");
const error_1 = require("aws-jwt-verify/error");
const enums_1 = require("./enums");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(configService, reflector) {
        this.configService = configService;
        this.reflector = reflector;
        this.pgPool = new pg_1.Pool({
            host: this.configService.get('POSTGRES_HOST'),
            port: parseInt(this.configService.get('POSTGRES_PORT')),
            database: this.configService.get('POSTGRES_DATABASE'),
            user: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD')
        });
        this.cognitoJwtVerifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
            userPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
            clientId: this.configService.get('COGNITO_CLIENT_ID'),
            tokenUse: "id",
            includeRawJwtInErrors: true
        });
    }
    async canActivate(context) {
        const resource = this.reflector.get('ApiResource', context.getHandler());
        const req = context.switchToHttp().getRequest();
        const auth_header = req.headers['authorization'] || req.headers['Authorization'];
        const jwt = ((auth_header === null || auth_header === void 0 ? void 0 : auth_header.startsWith('bearer')) || (auth_header === null || auth_header === void 0 ? void 0 : auth_header.startsWith('Bearer'))) ? auth_header.substring(7, auth_header.length) : '';
        try {
            const payload = await this.cognitoJwtVerifier.verify(jwt);
            const sql = 'SELECT * FROM stout.users WHERE username = $1';
            const val = [payload["cognito:username"]];
            try {
                const result = await this.pgPool.query(sql, val);
                if (result.rows[0]) {
                    const permissions_list = result.rows[0].permissions_list;
                    console.log('Requested resource: ', resource);
                    permissions_list.forEach((permissions) => {
                        console.log('User permissions for the requested resource: ', permissions[resource]);
                        console.log('Request method: ', enums_1.HttpMethodEnum[req.method]);
                        if (permissions[resource].includes(enums_1.HttpMethodEnum[req.method])) {
                            console.log('CanActivate: true');
                            return true;
                        }
                    });
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw err;
            }
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 403);
            else if (err instanceof error_1.JwtExpiredError)
                throw new common_1.HttpException(`JwtExpiredError: ${err.message}`, 403);
            else if (err instanceof error_1.JwtInvalidClaimError) {
                console.error(`JwtInvalidClaimError: ${err.message} JWT Payload: err.rawJwt.payload`);
                throw new common_1.HttpException(`JwtInvalidClaimError: ${err.message}`, 403);
            }
            else
                throw new common_1.HttpException(`JWT Verification Failed: ${err.mesage}`, 403);
        }
        ;
    }
};
AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        core_1.Reflector])
], AuthorizationGuard);
exports.AuthorizationGuard = AuthorizationGuard;
//# sourceMappingURL=authorization.guard.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const aws_jwt_verify_1 = require("aws-jwt-verify");
const error_1 = require("aws-jwt-verify/error");
const user_info_service_1 = require("./user-info.service");
let UserInfoController = class UserInfoController {
    constructor(configService, userInfoService) {
        this.configService = configService;
        this.userInfoService = userInfoService;
        this.cognitoJwtVerifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
            userPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
            clientId: this.configService.get('COGNITO_CLIENT_ID'),
            tokenUse: "id",
            includeRawJwtInErrors: true
        });
    }
    async get_user_info(auth_header, username) {
        const jwt = ((auth_header === null || auth_header === void 0 ? void 0 : auth_header.startsWith('bearer')) || (auth_header === null || auth_header === void 0 ? void 0 : auth_header.startsWith('Bearer'))) ? auth_header.substring(7, auth_header.length) : "";
        try {
            const payload = await this.cognitoJwtVerifier.verify(jwt);
            try {
                const result = await this.userInfoService.get_user_info(payload["cognito:username"]);
                console.log(result.rows[0]);
                return result.rows[0];
            }
            catch (err) {
                throw err;
            }
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
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
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./user-info.enity").UserInfo }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "get_user_info", null);
UserInfoController = __decorate([
    (0, common_1.Controller)('user-info'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_info_service_1.UserInfoService])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=user-info.controller.js.map
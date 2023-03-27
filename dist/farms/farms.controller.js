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
exports.FarmsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const farms_service_1 = require("./farms.service");
const farms_dto_1 = require("./farms.dto");
let FarmsController = class FarmsController {
    constructor(farmsService) {
        this.farmsService = farmsService;
    }
    async get_all_farms(auth_header, organization_id) {
        try {
            const result = await this.farmsService.get_all_farms(organization_id);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_farm(auth_header, organization_id, farm_dto) {
        try {
            const result = await this.farmsService.insert_farm(organization_id, farm_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_farm_by_id(auth_header, farm_id) {
        try {
            const result = await this.farmsService.get_farm_by_id(farm_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_farm(auth_header, farm_id, farm_dto) {
        try {
            const result = await this.farmsService.update_farm(farm_id, farm_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_farm(auth_header, farm_id) {
        try {
            const result = await this.farmsService.delete_farm(farm_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('ApiResource', 'Farm'),
    openapi.ApiResponse({ status: 200, type: [require("./farms.entity").Farm] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FarmsController.prototype, "get_all_farms", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'FarmDTO'),
    openapi.ApiResponse({ status: 201, type: require("./farms.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, farms_dto_1.FarmDTO]),
    __metadata("design:returntype", Promise)
], FarmsController.prototype, "insert_farm", null);
__decorate([
    (0, common_1.Get)(':farmId'),
    (0, common_1.SetMetadata)('ApiResource', 'Farm'),
    openapi.ApiResponse({ status: 200, type: require("./farms.entity").Farm }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('farmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FarmsController.prototype, "get_farm_by_id", null);
__decorate([
    (0, common_1.Put)(':farmId'),
    (0, common_1.SetMetadata)('ApiResource', 'FarmDTO'),
    openapi.ApiResponse({ status: 200, type: require("./farms.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('farmId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, farms_dto_1.FarmDTO]),
    __metadata("design:returntype", Promise)
], FarmsController.prototype, "update_farm", null);
__decorate([
    (0, common_1.Delete)(':farmId'),
    (0, common_1.SetMetadata)('ApiResource', 'FarmDTO'),
    openapi.ApiResponse({ status: 200, type: require("./farms.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('farmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FarmsController.prototype, "delete_farm", null);
FarmsController = __decorate([
    (0, common_1.Controller)(':organizationId/farms'),
    __metadata("design:paramtypes", [farms_service_1.FarmsService])
], FarmsController);
exports.FarmsController = FarmsController;
//# sourceMappingURL=farms.controller.js.map
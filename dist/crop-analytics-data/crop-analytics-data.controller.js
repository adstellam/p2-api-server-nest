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
exports.CropAnalyticsDataController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const crop_analytics_data_service_1 = require("./crop-analytics-data.service");
const crop_analytics_data_dto_1 = require("./crop-analytics-data.dto");
const enums_1 = require("../enums");
let CropAnalyticsDataController = class CropAnalyticsDataController {
    constructor(cropAnalyticsDataService) {
        this.cropAnalyticsDataService = cropAnalyticsDataService;
    }
    async get_crop_analytics_data_by_query_parameters(auth_header, organization_id, grower_id, crop_season, crop_zone_id, crop_name, field_id, seed_type, wet_date) {
        try {
            const result = await this.cropAnalyticsDataService.get_crop_analytics_data_by_query_parameters(organization_id, grower_id, crop_season, crop_zone_id, crop_name, field_id, seed_type, wet_date ? new Date(wet_date) : null);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_crop_analytics_data_by_crop_id(auth_header, organization_id, crop_id) {
        try {
            const result = await this.cropAnalyticsDataService.get_crop_analytics_data_by_crop_id(crop_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_crop_analytics_data(auth_header, crop_id, crop_analytics_data_dto) {
        try {
            const result = await this.cropAnalyticsDataService.update_crop_analytics_data(crop_id, crop_analytics_data_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_crop_analytics_data(auth_header, crop_id) {
        try {
            const result = await this.cropAnalyticsDataService.delete_crop_analytics_data(crop_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('ApiResource', 'CropAnalyticsData'),
    openapi.ApiResponse({ status: 200, type: [require("./crop-analytics-data.entity").CropAnalyticsData] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('cropSeason')),
    __param(4, (0, common_1.Query)('cropZoneId')),
    __param(5, (0, common_1.Query)('cropName')),
    __param(6, (0, common_1.Query)('fieldId')),
    __param(7, (0, common_1.Query)('seedType')),
    __param(8, (0, common_1.Query)('wetDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], CropAnalyticsDataController.prototype, "get_crop_analytics_data_by_query_parameters", null);
__decorate([
    (0, common_1.Get)(':cropId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropAnalyticsData'),
    openapi.ApiResponse({ status: 200, type: require("./crop-analytics-data.entity").CropAnalyticsData }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('cropId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CropAnalyticsDataController.prototype, "get_crop_analytics_data_by_crop_id", null);
__decorate([
    (0, common_1.Put)(':cropId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropAnalyticsDataDTO'),
    openapi.ApiResponse({ status: 200, type: require("./crop-analytics-data.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, crop_analytics_data_dto_1.CropAnalyticsDataDTO]),
    __metadata("design:returntype", Promise)
], CropAnalyticsDataController.prototype, "update_crop_analytics_data", null);
__decorate([
    (0, common_1.Delete)(':cropId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropAnalyticsDataDTO'),
    openapi.ApiResponse({ status: 200, type: require("./crop-analytics-data.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CropAnalyticsDataController.prototype, "delete_crop_analytics_data", null);
CropAnalyticsDataController = __decorate([
    (0, common_1.Controller)(':organizationId/cropAnalyticsData'),
    __metadata("design:paramtypes", [crop_analytics_data_service_1.CropAnalyticsDataService])
], CropAnalyticsDataController);
exports.CropAnalyticsDataController = CropAnalyticsDataController;
//# sourceMappingURL=crop-analytics-data.controller.js.map
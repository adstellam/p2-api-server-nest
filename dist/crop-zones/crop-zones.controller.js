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
exports.CropZonesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const crop_zones_service_1 = require("./crop-zones.service");
const crop_zones_dto_1 = require("./crop-zones.dto");
let CropZonesController = class CropZonesController {
    constructor(cropZonesService) {
        this.cropZonesService = cropZonesService;
    }
    async get_crop_zones_by_query_parameters(auth_header, organization_id, grower_name, crop_season, farm_name, field_name, crop_name, show_archived, wet_date) {
        try {
            const result = await this.cropZonesService.get_crop_zones_by_query_parameters(organization_id, grower_name, crop_season, farm_name, field_name, crop_name, show_archived && show_archived.toLowerCase() == 'true' ? true : false, wet_date);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_crop_zone(auth_header, crop_zone_dto) {
        try {
            const result = await this.cropZonesService.insert_crop_zone(crop_zone_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_crop_zone_by_id(auth_header, crop_zone_id) {
        try {
            const result = await this.cropZonesService.get_crop_zone_by_id(crop_zone_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_crop_zone(auth_header, crop_zone_id, crop_zone_dto) {
        try {
            const result = await this.cropZonesService.update_crop_zone(crop_zone_id, crop_zone_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_crop_zone(auth_header, crop_zone_id) {
        try {
            const result = await this.cropZonesService.delete_crop_zone(crop_zone_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'CropZone'),
    openapi.ApiResponse({ status: 200, type: [require("./crop-zones.entity").CropZone] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('cropSeason')),
    __param(4, (0, common_1.Query)('farmName')),
    __param(5, (0, common_1.Query)('fieldName')),
    __param(6, (0, common_1.Query)('cropName')),
    __param(7, (0, common_1.Query)('show_archived')),
    __param(8, (0, common_1.Query)('wetDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CropZonesController.prototype, "get_crop_zones_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'CropZoneDTO'),
    openapi.ApiResponse({ status: 201, type: require("./crop-zones.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, crop_zones_dto_1.CropZoneDTO]),
    __metadata("design:returntype", Promise)
], CropZonesController.prototype, "insert_crop_zone", null);
__decorate([
    (0, common_1.Get)(':cropZoneId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropZone'),
    openapi.ApiResponse({ status: 200, type: require("./crop-zones.entity").CropZone }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropZoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CropZonesController.prototype, "get_crop_zone_by_id", null);
__decorate([
    (0, common_1.Put)(':cropZoneId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropZoneDTO'),
    openapi.ApiResponse({ status: 200, type: require("./crop-zones.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropZoneId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, crop_zones_dto_1.CropZoneDTO]),
    __metadata("design:returntype", Promise)
], CropZonesController.prototype, "update_crop_zone", null);
__decorate([
    (0, common_1.Delete)(':cropZoneId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropZoneDTO'),
    openapi.ApiResponse({ status: 200, type: require("./crop-zones.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropZoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CropZonesController.prototype, "delete_crop_zone", null);
CropZonesController = __decorate([
    (0, common_1.Controller)(':organizationId/cropZones'),
    __metadata("design:paramtypes", [crop_zones_service_1.CropZonesService])
], CropZonesController);
exports.CropZonesController = CropZonesController;
//# sourceMappingURL=crop-zones.controller.js.map
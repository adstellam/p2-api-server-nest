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
exports.MapLayersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const map_layers_service_1 = require("./map-layers.service");
const map_layers_dto_1 = require("./map-layers.dto");
const enums_1 = require("../enums");
let MapLayersController = class MapLayersController {
    constructor(mapLayersService) {
        this.mapLayersService = mapLayersService;
    }
    async get_map_layers_by_query_parameters(auth_header, organization_id, map_layer_type, from_date, to_date) {
        try {
            const result = await this.mapLayersService.get_map_layers_by_query_parameters(organization_id, map_layer_type, from_date ? new Date(from_date) : new Date('2000-01-01 00:00:00z'), to_date ? new Date(to_date) : new Date());
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_map_layer(auth_header, organization_id, map_layer_dto) {
        try {
            const result = await this.mapLayersService.insert_map_layer(organization_id, map_layer_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_map_layer_by_id(auth_header, organization_id, map_layer_id) {
        try {
            const result = await this.mapLayersService.get_map_layer_by_id(map_layer_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_map_layer(auth_header, map_layer_id, map_layer_dto) {
        try {
            const result = await this.mapLayersService.update_map_layer(map_layer_id, map_layer_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_map_layer(auth_header, map_layer_id) {
        try {
            const result = await this.mapLayersService.delete_map_layer(map_layer_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'MapLayer'),
    openapi.ApiResponse({ status: 200, type: [require("./map-layers.entity").MapLayer] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('mapLayerType')),
    __param(3, (0, common_1.Query)('from_date')),
    __param(4, (0, common_1.Query)('to_date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MapLayersController.prototype, "get_map_layers_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'MapLayerDTO'),
    openapi.ApiResponse({ status: 201, type: require("./map-layers.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, map_layers_dto_1.MapLayerDTO]),
    __metadata("design:returntype", Promise)
], MapLayersController.prototype, "insert_map_layer", null);
__decorate([
    (0, common_1.Get)(':mapLayerId'),
    (0, common_1.SetMetadata)('ApiResource', 'MapLayer'),
    openapi.ApiResponse({ status: 200, type: require("./map-layers.entity").MapLayer }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('mapLayerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MapLayersController.prototype, "get_map_layer_by_id", null);
__decorate([
    (0, common_1.Put)(':mapLayerId'),
    (0, common_1.SetMetadata)('ApiResource', 'MapLayerDTO'),
    openapi.ApiResponse({ status: 200, type: require("./map-layers.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('mapLayerId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, map_layers_dto_1.MapLayerDTO]),
    __metadata("design:returntype", Promise)
], MapLayersController.prototype, "update_map_layer", null);
__decorate([
    (0, common_1.Delete)(':mapLayerId'),
    (0, common_1.SetMetadata)('ApiResource', 'MapLayerDTO'),
    openapi.ApiResponse({ status: 200, type: require("./map-layers.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('mapLayerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MapLayersController.prototype, "delete_map_layer", null);
MapLayersController = __decorate([
    (0, common_1.Controller)(':organizationId/mapLayers'),
    __metadata("design:paramtypes", [map_layers_service_1.MapLayersService])
], MapLayersController);
exports.MapLayersController = MapLayersController;
//# sourceMappingURL=map-layers.controller.js.map
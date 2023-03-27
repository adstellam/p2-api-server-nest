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
exports.FieldBoundariesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const field_boundaries_service_1 = require("./field-boundaries.service");
const field_boundaries_dto_1 = require("./field-boundaries.dto");
let FieldBoundariesController = class FieldBoundariesController {
    constructor(fieldBoundariesService) {
        this.fieldBoundariesService = fieldBoundariesService;
    }
    async get_field_boundaries_by_query_parameters(auth_header, organization_id, field_id, field_name, show_archived) {
        try {
            const result = await this.fieldBoundariesService.get_field_boundaries_by_query_parameters(organization_id, field_id, field_name, show_archived && show_archived.toLowerCase() == "true" ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_field_boundary(auth_header, field_boundary_dto) {
        try {
            const result = await this.fieldBoundariesService.insert_field_boundary(field_boundary_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_field_boundary_by_id(auth_header, field_boundary_id) {
        try {
            const result = await this.fieldBoundariesService.get_field_boundary_by_id(field_boundary_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_field_boundary(auth_header, field_boundary_id, field_boundary_dto) {
        try {
            const result = await this.fieldBoundariesService.update_field_boundary(field_boundary_id, field_boundary_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_field_boundary(auth_header, field_boundary_id) {
        try {
            const result = await this.fieldBoundariesService.delete_field_boundary(field_boundary_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'FieldBoundary'),
    openapi.ApiResponse({ status: 200, type: [require("./field-boundaries.entity").FieldBoundary] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('fieldId')),
    __param(3, (0, common_1.Param)('fieldName')),
    __param(4, (0, common_1.Query)('showAchived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FieldBoundariesController.prototype, "get_field_boundaries_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'FieldBoundaryDTO'),
    openapi.ApiResponse({ status: 201, type: require("./field-boundaries.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, field_boundaries_dto_1.FieldBoundaryDTO]),
    __metadata("design:returntype", Promise)
], FieldBoundariesController.prototype, "insert_field_boundary", null);
__decorate([
    (0, common_1.Get)(':fieldBoundaryId'),
    (0, common_1.SetMetadata)('ApiResource', 'FieldBoundary'),
    openapi.ApiResponse({ status: 200, type: require("./field-boundaries.entity").FieldBoundary }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldBoundaryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FieldBoundariesController.prototype, "get_field_boundary_by_id", null);
__decorate([
    (0, common_1.Put)(':fieldBoundaryId'),
    (0, common_1.SetMetadata)('ApiResource', 'FieldBoundaryDTO'),
    openapi.ApiResponse({ status: 200, type: require("./field-boundaries.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldBoundaryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, field_boundaries_dto_1.FieldBoundaryDTO]),
    __metadata("design:returntype", Promise)
], FieldBoundariesController.prototype, "update_field_boundary", null);
__decorate([
    (0, common_1.Delete)(':fieldBoundaryId'),
    (0, common_1.SetMetadata)('ApiResource', 'FieldBoundaryDTO'),
    openapi.ApiResponse({ status: 200, type: require("./field-boundaries.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldBoundaryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FieldBoundariesController.prototype, "delete_field_boundary", null);
FieldBoundariesController = __decorate([
    (0, common_1.Controller)(':organizationId/fieldBoundaries'),
    __metadata("design:paramtypes", [field_boundaries_service_1.FieldBoundariesService])
], FieldBoundariesController);
exports.FieldBoundariesController = FieldBoundariesController;
//# sourceMappingURL=field-boundaries.controller.js.map
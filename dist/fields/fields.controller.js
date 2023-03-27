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
exports.FieldsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const fields_service_1 = require("./fields.service");
const fields_dto_1 = require("./fields.dto");
let FieldsController = class FieldsController {
    constructor(fieldsService) {
        this.fieldsService = fieldsService;
    }
    async get_fields_by_query_parameters(auth_header, organization_id, grower_name, field_name, crop_name, show_archived) {
        try {
            const result = await this.fieldsService.get_fields_by_query_parameters(organization_id, grower_name, field_name, crop_name, show_archived && show_archived.toLowerCase() == 'true' ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_field(auth_header, field_dto) {
        try {
            const result = await this.fieldsService.insert_field(field_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_field_by_id(auth_header, field_id) {
        try {
            const result = await this.fieldsService.get_field_by_id(field_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_field(auth_header, field_id, field_dto) {
        try {
            const result = await this.fieldsService.update_field(field_id, field_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_field(auth_header, field_id) {
        try {
            const result = await this.fieldsService.delete_field(field_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'Field'),
    openapi.ApiResponse({ status: 200, type: [require("./fields.entity").Field] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('farmName')),
    __param(4, (0, common_1.Query)('cropName')),
    __param(5, (0, common_1.Query)('show_archived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "get_fields_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'FieldDTO'),
    openapi.ApiResponse({ status: 201, type: require("./fields.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fields_dto_1.FieldDTO]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "insert_field", null);
__decorate([
    (0, common_1.Get)(':fieldId'),
    (0, common_1.SetMetadata)('ApiResource', 'Field'),
    openapi.ApiResponse({ status: 200, type: require("./fields.entity").Field }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "get_field_by_id", null);
__decorate([
    (0, common_1.Put)(':fieldId'),
    (0, common_1.SetMetadata)('ApiResource', 'FieldDTO'),
    openapi.ApiResponse({ status: 200, type: require("./fields.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, fields_dto_1.FieldDTO]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "update_field", null);
__decorate([
    (0, common_1.Delete)(':fieldId'),
    (0, common_1.SetMetadata)('ApiResource', 'FieldDTO'),
    openapi.ApiResponse({ status: 200, type: require("./fields.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fieldId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "delete_field", null);
FieldsController = __decorate([
    (0, common_1.Controller)(':organizationId/fields'),
    __metadata("design:paramtypes", [fields_service_1.FieldsService])
], FieldsController);
exports.FieldsController = FieldsController;
//# sourceMappingURL=fields.controller.js.map
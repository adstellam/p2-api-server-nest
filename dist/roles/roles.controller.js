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
exports.RolesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const roles_service_1 = require("./roles.service");
const roles_dto_1 = require("./roles.dto");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async get_roles_by_organization_id(auth_header, organization_id) {
        try {
            const result = await this.rolesService.get_roles_by_organization_id(organization_id);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_role(auth_header, organization_id, role_dto) {
        try {
            const result = await this.rolesService.insert_role(organization_id, role_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_role_by_rolename(auth_header, organization_id, rolename) {
        try {
            const result = await this.rolesService.get_role_by_rolename(organization_id, rolename);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_role(auth_header, role_id, role_dto) {
        try {
            const result = await this.rolesService.update_role(role_id, role_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_role(auth_header, role_id) {
        try {
            const result = await this.rolesService.delete_role(role_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'Role'),
    openapi.ApiResponse({ status: 200, type: [require("./roles.entity").Role] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "get_roles_by_organization_id", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'RoleDTO'),
    openapi.ApiResponse({ status: 201, type: require("./roles.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, roles_dto_1.RoleDTO]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "insert_role", null);
__decorate([
    (0, common_1.Get)(':rolename'),
    (0, common_1.SetMetadata)('ApiResource', 'Role'),
    openapi.ApiResponse({ status: 200, type: require("./roles.entity").Role }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('rolename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "get_role_by_rolename", null);
__decorate([
    (0, common_1.Put)(':roleId'),
    (0, common_1.SetMetadata)('ApiResource', 'RoleDTO'),
    openapi.ApiResponse({ status: 200, type: require("./roles.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('roleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, roles_dto_1.RoleDTO]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update_role", null);
__decorate([
    (0, common_1.Delete)(':roleId'),
    (0, common_1.SetMetadata)('ApiResource', 'RoleDTO'),
    openapi.ApiResponse({ status: 200, type: require("./roles.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete_role", null);
RolesController = __decorate([
    (0, common_1.Controller)(':organizationId/roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map
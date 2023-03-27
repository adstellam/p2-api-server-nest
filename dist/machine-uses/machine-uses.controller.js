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
exports.MachineUsesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const machine_uses_service_1 = require("./machine-uses.service");
let MachineUsesController = class MachineUsesController {
    constructor(machineUsesService) {
        this.machineUsesService = machineUsesService;
    }
    async get_machine_uses_by_query_parameters(auth_header, organization_id, machine_id, machine_name, from_time, to_time) {
        try {
            const result = await this.machineUsesService.get_machine_uses_by_query_parameters(organization_id, machine_id, machine_name, from_time ? new Date(from_time) : new Date('2000-01-01 00:00:00z'), to_time ? new Date(to_time) : new Date());
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_machine_uses_by_id(auth_header, organization_id, machine_use_id) {
        try {
            const result = await this.machineUsesService.get_machine_uses_by_id(organization_id, machine_use_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'MachineUse'),
    openapi.ApiResponse({ status: 200, type: [require("./machine-uses.entity").MachineUse] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('machineId')),
    __param(3, (0, common_1.Param)('machineName')),
    __param(4, (0, common_1.Query)('from')),
    __param(5, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MachineUsesController.prototype, "get_machine_uses_by_query_parameters", null);
__decorate([
    (0, common_1.Get)(':machineUseId'),
    (0, common_1.SetMetadata)('ApiResource', 'MachineUse'),
    openapi.ApiResponse({ status: 200, type: require("./machine-uses.entity").MachineUse }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('machineUseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MachineUsesController.prototype, "get_machine_uses_by_id", null);
MachineUsesController = __decorate([
    (0, common_1.Controller)(':organizationId/machineUses'),
    __metadata("design:paramtypes", [machine_uses_service_1.MachineUsesService])
], MachineUsesController);
exports.MachineUsesController = MachineUsesController;
//# sourceMappingURL=machine-uses.controller.js.map
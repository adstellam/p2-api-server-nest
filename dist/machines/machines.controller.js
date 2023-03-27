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
exports.MachinesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const machines_service_1 = require("./machines.service");
const machines_dto_1 = require("./machines.dto");
let MachinesController = class MachinesController {
    constructor(machinesService) {
        this.machinesService = machinesService;
    }
    async get_machines_by_query_parameters(auth_header, organization_id, machine_classification, machine_model, machine_series, show_archived) {
        try {
            const result = await this.machinesService.get_machines_by_query_parameters(organization_id, machine_classification, machine_model, machine_series, show_archived && show_archived.toLowerCase() == "true" ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_machine(auth_header, organization_id, machine_dto) {
        try {
            const result = await this.machinesService.insert_machine(organization_id, machine_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_machine_by_id(auth_header, organization_id, machine_id) {
        try {
            const result = await this.machinesService.get_machine_by_id(machine_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_machine(auth_header, machine_id, machine_dto) {
        try {
            const result = await this.machinesService.update_machine(machine_id, machine_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_machine(auth_header, machine_id) {
        try {
            const result = await this.machinesService.delete_machine(machine_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'Machine'),
    openapi.ApiResponse({ status: 200, type: [require("./machines.entity").Machine] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('machineClassification')),
    __param(3, (0, common_1.Query)('machineModel')),
    __param(4, (0, common_1.Query)('machineSeries')),
    __param(5, (0, common_1.Query)('show_archived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "get_machines_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'MachineDTO'),
    openapi.ApiResponse({ status: 201, type: require("./machines.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, machines_dto_1.MachineDTO]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "insert_machine", null);
__decorate([
    (0, common_1.Get)(':machineId'),
    (0, common_1.SetMetadata)('ApiResource', 'Machine'),
    openapi.ApiResponse({ status: 200, type: require("./machines.entity").Machine }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('machineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "get_machine_by_id", null);
__decorate([
    (0, common_1.Put)(':machineId'),
    (0, common_1.SetMetadata)('ApiResource', 'MachineDTO'),
    openapi.ApiResponse({ status: 200, type: require("./machines.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('machineId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, machines_dto_1.MachineDTO]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "update_machine", null);
__decorate([
    (0, common_1.Delete)(':machineId'),
    (0, common_1.SetMetadata)('ApiResource', 'MachineDTO'),
    openapi.ApiResponse({ status: 200, type: require("./machines.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('machineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "delete_machine", null);
MachinesController = __decorate([
    (0, common_1.Controller)(':organizationId/machines'),
    __metadata("design:paramtypes", [machines_service_1.MachinesService])
], MachinesController);
exports.MachinesController = MachinesController;
//# sourceMappingURL=machines.controller.js.map
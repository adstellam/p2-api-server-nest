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
exports.TaskOperationsDataController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const task_operations_data_service_1 = require("./task-operations-data.service");
const task_operations_data_dto_1 = require("./task-operations-data.dto");
let TaskOperationsDataController = class TaskOperationsDataController {
    constructor(taskOperationsDataService) {
        this.taskOperationsDataService = taskOperationsDataService;
    }
    async get_task_operations_data_by_query_parameters(auth_header, organization_id, job_id, job_name, task_id, task_name, crop_season, field_name, machine_name) {
        try {
            const result = await this.taskOperationsDataService.get_task_operations_data_by_query_parameters(organization_id, job_id, job_name, task_id, task_name, crop_season, field_name, machine_name);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_task_operations_data_by_id(auth_header, task_operations_data_id) {
        try {
            const result = await this.taskOperationsDataService.get_task_operations_data_by_id(task_operations_data_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async patch_task_opereations_data(auth_header, task_operations_data_id, task_operations_data_dto) {
        try {
            const result = await this.taskOperationsDataService.patch_task_operations_data(task_operations_data_id, task_operations_data_dto);
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
    (0, common_1.SetMetadata)('ApiResource', 'TaskOperationsData'),
    openapi.ApiResponse({ status: 200, type: [require("./task-operations-data.entity").TaskOperationsData] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('jobId')),
    __param(3, (0, common_1.Query)('jobName')),
    __param(4, (0, common_1.Query)('taskId')),
    __param(5, (0, common_1.Query)('taskName')),
    __param(6, (0, common_1.Query)('cropSeason')),
    __param(7, (0, common_1.Query)('fieldName')),
    __param(8, (0, common_1.Query)('machineName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TaskOperationsDataController.prototype, "get_task_operations_data_by_query_parameters", null);
__decorate([
    (0, common_1.Get)(':taskOperationsDataId'),
    (0, common_1.SetMetadata)('ApiResource', 'TaskOperationsData'),
    openapi.ApiResponse({ status: 200, type: require("./task-operations-data.entity").TaskOperationsData }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('taskOperationsDataId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskOperationsDataController.prototype, "get_task_operations_data_by_id", null);
__decorate([
    (0, common_1.Patch)(':taskOperationsDataId'),
    (0, common_1.SetMetadata)('ApiResource', 'TaskOperationsDataDTO'),
    openapi.ApiResponse({ status: 200, type: require("./task-operations-data.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('taskOperationsDataId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, task_operations_data_dto_1.TaskOperationsDataDTO]),
    __metadata("design:returntype", Promise)
], TaskOperationsDataController.prototype, "patch_task_opereations_data", null);
TaskOperationsDataController = __decorate([
    (0, common_1.Controller)(':organizationId/taskOperationsData'),
    __metadata("design:paramtypes", [task_operations_data_service_1.TaskOperationsDataService])
], TaskOperationsDataController);
exports.TaskOperationsDataController = TaskOperationsDataController;
//# sourceMappingURL=task-operations-data.controller.js.map
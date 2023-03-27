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
exports.TasksController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const tasks_service_1 = require("./tasks.service");
const tasks_dto_1 = require("./tasks.dto");
const enums_1 = require("../enums");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async get_tasks_by_query_parameters(auth_header, organization_id, grower_name, crop_season, field_name, job_name, operation_type, machine_name, task_status, start_date, show_archived) {
        try {
            const result = await this.tasksService.get_tasks_by_query_parameters(organization_id, grower_name, crop_season, field_name, job_name, operation_type, machine_name, task_status, start_date ? new Date(start_date) : null, show_archived && show_archived.toLowerCase() == "true" ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_task(auth_header, task_dto) {
        try {
            const result = await this.tasksService.insert_task(task_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_task_by_id(auth_header, task_id) {
        try {
            const result = await this.tasksService.get_task_by_id(task_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_task(auth_header, task_id, task_dto) {
        try {
            const result = await this.tasksService.update_task(task_id, task_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_task(auth_header, task_id) {
        try {
            const result = await this.tasksService.delete_task(task_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'Task'),
    openapi.ApiResponse({ status: 200, type: [require("./tasks.entity").Task] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('cropSeason')),
    __param(4, (0, common_1.Query)('fieldName')),
    __param(5, (0, common_1.Query)('jobName')),
    __param(6, (0, common_1.Query)('operationType')),
    __param(7, (0, common_1.Query)('machineName')),
    __param(8, (0, common_1.Query)('taskStatus')),
    __param(9, (0, common_1.Query)('startDate')),
    __param(10, (0, common_1.Query)('showArchived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "get_tasks_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'TaskDTO'),
    openapi.ApiResponse({ status: 201, type: require("./tasks.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tasks_dto_1.TaskDTO]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "insert_task", null);
__decorate([
    (0, common_1.Get)(':taskId'),
    (0, common_1.SetMetadata)('ApiResource', 'Task'),
    openapi.ApiResponse({ status: 200, type: require("./tasks.entity").Task }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "get_task_by_id", null);
__decorate([
    (0, common_1.Put)(':taskId'),
    (0, common_1.SetMetadata)('ApiResource', 'TaskDTO'),
    openapi.ApiResponse({ status: 200, type: require("./tasks.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, tasks_dto_1.TaskDTO]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update_task", null);
__decorate([
    (0, common_1.Delete)(':taskId'),
    (0, common_1.SetMetadata)('ApiResource', 'TaskDTO'),
    openapi.ApiResponse({ status: 200, type: require("./tasks.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "delete_task", null);
TasksController = __decorate([
    (0, common_1.Controller)(':organizationId/tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map
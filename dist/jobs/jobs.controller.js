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
exports.JobsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const jobs_service_1 = require("./jobs.service");
const jobs_dto_1 = require("./jobs.dto");
const enums_1 = require("../enums");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async get_jobs_by_query_parameters(auth_header, organization_id, grower_name, crop_season, field_name, crop_name, work_order_name, operation_type, job_status, planned_start_date, show_archived) {
        try {
            const result = await this.jobsService.get_jobs_by_query_parameters(organization_id, grower_name, crop_season, field_name, crop_name, work_order_name, operation_type, job_status, planned_start_date ? new Date(planned_start_date) : null, show_archived && show_archived.toLowerCase() == "true" ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_job(auth_header, organization_id, job_dto) {
        try {
            const result = await this.jobsService.insert_job(organization_id, job_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_job_by_id(auth_header, job_id) {
        try {
            const result = await this.jobsService.get_job_by_id(job_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_job(auth_header, job_id, job_dto) {
        try {
            const result = await this.jobsService.update_job(job_id, job_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_job(auth_header, job_id) {
        try {
            const result = await this.jobsService.delete_job(job_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'Job'),
    openapi.ApiResponse({ status: 200, type: [require("./jobs.entity").Job] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('cropSeason')),
    __param(4, (0, common_1.Query)('fieldName')),
    __param(5, (0, common_1.Query)('cropName')),
    __param(6, (0, common_1.Query)('workOrderName')),
    __param(7, (0, common_1.Query)('operationType')),
    __param(8, (0, common_1.Query)('jobStatus')),
    __param(9, (0, common_1.Query)('plannedStartDate')),
    __param(10, (0, common_1.Query)('showArchived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "get_jobs_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'JobDTO'),
    openapi.ApiResponse({ status: 201, type: require("./jobs.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, jobs_dto_1.JobDTO]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "insert_job", null);
__decorate([
    (0, common_1.Get)(':jobId'),
    (0, common_1.SetMetadata)('ApiResource', 'Job'),
    openapi.ApiResponse({ status: 200, type: require("./jobs.entity").Job }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "get_job_by_id", null);
__decorate([
    (0, common_1.Put)(':jobId'),
    (0, common_1.SetMetadata)('ApiResource', 'JobDTO'),
    openapi.ApiResponse({ status: 200, type: require("./jobs.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('jobId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, jobs_dto_1.JobDTO]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "update_job", null);
__decorate([
    (0, common_1.Delete)(':jobId'),
    (0, common_1.SetMetadata)('ApiResource', 'JobDTO'),
    openapi.ApiResponse({ status: 200, type: require("./jobs.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "delete_job", null);
JobsController = __decorate([
    (0, common_1.Controller)(':organizationId/jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
exports.JobsController = JobsController;
//# sourceMappingURL=jobs.controller.js.map
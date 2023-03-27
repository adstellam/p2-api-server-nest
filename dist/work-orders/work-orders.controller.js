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
exports.WorkOrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const work_orders_service_1 = require("./work-orders.service");
const work_orders_dto_1 = require("./work-orders.dto");
let WorkOrdersController = class WorkOrdersController {
    constructor(workOrdersService) {
        this.workOrdersService = workOrdersService;
    }
    async get_work_orders_by_query_parameters(auth_header, organization_id, grower_name, crop_season, field_name, crop_name, show_archived) {
        try {
            const result = await this.workOrdersService.get_work_orders_by_query_parameters(organization_id, grower_name, crop_season, field_name, crop_name, show_archived && show_archived.toLowerCase() == "true" ? true : false);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async insert_work_order(auth_header, organization_id, work_order_dto) {
        try {
            const result = await this.workOrdersService.insert_work_order(organization_id, work_order_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_work_order_by_id(auth_header, work_order_id) {
        try {
            const result = await this.workOrdersService.get_work_order_by_id(work_order_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async update_work_order(auth_header, organization_id, work_order_id, work_order_dto) {
        try {
            const result = await this.workOrdersService.update_work_order(organization_id, work_order_id, work_order_dto);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_work_order(auth_header, work_order_id) {
        try {
            const result = await this.workOrdersService.delete_work_order(work_order_id);
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
    (0, common_1.SetMetadata)('ApiResource', 'WorkOrder'),
    openapi.ApiResponse({ status: 200, type: [require("./work-orders.entity").WorkOrder] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('growerName')),
    __param(3, (0, common_1.Query)('cropSeason')),
    __param(4, (0, common_1.Query)('fieldName')),
    __param(5, (0, common_1.Query)('cropName')),
    __param(6, (0, common_1.Query)('showArchived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "get_work_orders_by_query_parameters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('ApiResource', 'WorkOrderDTO'),
    openapi.ApiResponse({ status: 201, type: require("./work-orders.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, work_orders_dto_1.WorkOrderDTO]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "insert_work_order", null);
__decorate([
    (0, common_1.Get)(':workOrderId'),
    (0, common_1.SetMetadata)('ApiResource', 'WorkOrder'),
    openapi.ApiResponse({ status: 200, type: require("./work-orders.entity").WorkOrder }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('workOrderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "get_work_order_by_id", null);
__decorate([
    (0, common_1.Put)(':workOrderId'),
    (0, common_1.SetMetadata)('ApiResource', 'WorkOrderDTO'),
    openapi.ApiResponse({ status: 200, type: require("./work-orders.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('workOrderId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, work_orders_dto_1.WorkOrderDTO]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "update_work_order", null);
__decorate([
    (0, common_1.Delete)(':workOrderId'),
    (0, common_1.SetMetadata)('ApiResource', 'WorkOrderDTO'),
    openapi.ApiResponse({ status: 200, type: require("./work-orders.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('workOrderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "delete_work_order", null);
WorkOrdersController = __decorate([
    (0, common_1.Controller)(':organizationId/workOrders'),
    __metadata("design:paramtypes", [work_orders_service_1.WorkOrdersService])
], WorkOrdersController);
exports.WorkOrdersController = WorkOrdersController;
//# sourceMappingURL=work-orders.controller.js.map
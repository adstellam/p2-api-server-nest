"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const openapi = require("@nestjs/swagger");
class Job {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, job_name: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, farm_name: { required: true, type: () => String }, field_name: { required: true, type: () => String }, crop_zone_id: { required: true, type: () => String }, crop_zone_name: { required: true, type: () => String }, crop_name: { required: true, type: () => String }, work_order_id: { required: true, type: () => String }, work_order_name: { required: true, type: () => String }, operation_types: { required: true, enum: require("../enums").OperationTypeEnum, isArray: true }, task_names: { required: true, type: () => [String] }, job_priority: { required: true, enum: require("../enums").JobPriorityEnum }, job_supervisor_name: { required: true, type: () => String }, job_status: { required: true, enum: require("../enums").WorkStatusEnum }, planned_start_date: { required: true, type: () => Date }, planned_end_date: { required: true, type: () => Date }, actual_start_date: { required: true, type: () => Date }, actual_end_date: { required: true, type: () => Date }, notes: { required: true, type: () => [String] }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.Job = Job;
;
//# sourceMappingURL=jobs.entity.js.map
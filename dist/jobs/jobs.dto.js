"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class JobDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { job_name: { required: true, type: () => String }, work_order_id: { required: true, type: () => String }, crop_zone_id: { required: true, type: () => String }, job_supervisor_id: { required: false, type: () => String }, operation_types: { required: true, enum: require("../enums").OperationTypeEnum, isArray: true }, job_status: { required: false, enum: require("../enums").WorkStatusEnum }, job_priority: { required: false, enum: require("../enums").JobPriorityEnum }, proposed_start_date: { required: true, type: () => Date }, proposed_end_date: { required: true, type: () => Date }, actual_start_date: { required: false, type: () => Date }, actual_end_date: { required: false, type: () => Date }, notes: { required: false, type: () => [String] }, archived: { required: false, type: () => Boolean } };
    }
}
exports.JobDTO = JobDTO;
//# sourceMappingURL=jobs.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const openapi = require("@nestjs/swagger");
class Task {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, task_name: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, farm_name: { required: true, type: () => String }, field_name: { required: true, type: () => String }, crop_zone_name: { required: true, type: () => String }, work_order_name: { required: true, type: () => String }, job_name: { required: true, type: () => String }, operation_types: { required: true, enum: require("../enums").OperationTypeEnum, isArray: true }, machine_name: { required: true, type: () => String }, prescription_name: { required: true, type: () => String }, task_operator_name: { required: true, type: () => String }, task_status: { required: true, enum: require("../enums").WorkStatusEnum }, start_time: { required: true, type: () => Date }, end_time: { required: true, type: () => Date }, notes: { required: true, type: () => [String] }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.Task = Task;
;
//# sourceMappingURL=tasks.entity.js.map
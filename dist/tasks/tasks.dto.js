"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class TaskDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { task_name: { required: true, type: () => String }, job_id: { required: true, type: () => String }, machine_id: { required: true, type: () => String }, task_operator_id: { required: false, type: () => String }, operation_type: { required: true, enum: require("../enums").OperationTypeEnum }, task_status: { required: false, enum: require("../enums").WorkStatusEnum }, start_time: { required: false, type: () => Date }, end_time: { required: false, type: () => Date }, notes: { required: false, type: () => [String] }, archived: { required: false, type: () => Boolean } };
    }
}
exports.TaskDTO = TaskDTO;
//# sourceMappingURL=tasks.dto.js.map
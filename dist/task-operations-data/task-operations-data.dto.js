"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskOperationsDataDTO = exports.IdObject = exports.ContextItemRecord = exports.DataLogTriggerRecord = exports.SpatialRecord = void 0;
const openapi = require("@nestjs/swagger");
class SpatialRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { representation: { required: true, type: () => String }, shape: { required: true, type: () => Object }, ts: { required: true, type: () => Date } };
    }
}
exports.SpatialRecord = SpatialRecord;
;
class DataLogTriggerRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { logging_level: { required: true, enum: require("../enums").LoggingLevelEnum }, data_log_method: { required: true, enum: require("../enums").LoggingMethodEnum }, data_log_time_interval: { required: true, type: () => Number }, data_log_distance_interval: { required: true, type: () => Number }, data_log_threshold_change: { required: true, type: () => Number }, data_log_threshold_maximum: { required: true, type: () => Number }, data_log_threshold_minimum: { required: true, type: () => Number }, representation: { required: true, type: () => String } };
    }
}
exports.DataLogTriggerRecord = DataLogTriggerRecord;
;
class ContextItemRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { context_key: { required: true, type: () => String }, context_value: { required: true, type: () => String } };
    }
}
exports.ContextItemRecord = ContextItemRecord;
;
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class TaskOperationsDataDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { task_id: { required: true, type: () => String }, spatial_record: { required: false, type: () => require("./task-operations-data.dto").SpatialRecord }, data_log_trigger_record: { required: false, type: () => require("./task-operations-data.dto").DataLogTriggerRecord }, coincident_task_operations_data_ids: { required: false, type: () => [String] }, max_depth: { required: false, type: () => Number }, variety_locator_id: { required: false, type: () => String }, context_item: { required: false, type: () => require("./task-operations-data.dto").ContextItemRecord } };
    }
}
exports.TaskOperationsDataDTO = TaskOperationsDataDTO;
//# sourceMappingURL=task-operations-data.dto.js.map
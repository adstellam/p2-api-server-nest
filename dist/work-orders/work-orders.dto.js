"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderDTO = exports.IdObject = exports.StatusUpdateRecord = void 0;
const openapi = require("@nestjs/swagger");
class StatusUpdateRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { representation: { required: true, type: () => String }, ts: { required: true, type: () => Date } };
    }
}
exports.StatusUpdateRecord = StatusUpdateRecord;
;
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class WorkOrderDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { work_order_name: { required: true, type: () => String }, work_order_version: { required: false, type: () => String }, grower_id: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, crop_code: { required: true, type: () => String }, field_id: { required: true, type: () => String }, work_order_manager_id: { required: false, type: () => String }, status_update: { required: false, type: () => require("./work-orders.dto").StatusUpdateRecord }, archived: { required: false, type: () => Boolean } };
    }
}
exports.WorkOrderDTO = WorkOrderDTO;
;
//# sourceMappingURL=work-orders.dto.js.map
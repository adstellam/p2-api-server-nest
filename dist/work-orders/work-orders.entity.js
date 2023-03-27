"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrder = void 0;
const openapi = require("@nestjs/swagger");
class WorkOrder {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, work_order_name: { required: true, type: () => String }, work_order_version: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, farm_manager_name: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, crop_name: { required: true, type: () => String }, field_name: { required: true, type: () => String }, job_names: { required: true, type: () => [String] }, status_updates_json: { required: true, type: () => [String] }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.WorkOrder = WorkOrder;
;
//# sourceMappingURL=work-orders.entity.js.map
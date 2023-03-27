"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineUse = void 0;
const openapi = require("@nestjs/swagger");
class MachineUse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, machine_id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, task_operations_data_id: { required: true, type: () => String }, task_id: { required: true, type: () => String }, task_name: { required: true, type: () => String }, travel_distance_meter: { required: true, type: () => Number }, work_distance_meter: { required: true, type: () => Number }, elapsed_time_seconds: { required: true, type: () => Number }, work_time_seconds: { required: true, type: () => Number }, crop_count: { required: true, type: () => Number }, crop_counts_by_diameter: { required: true, type: () => [Number] }, crop_counts_by_score: { required: true, type: () => [Number] }, lens_working_dist_meter: { required: true, type: () => Number }, plant_line_count: { required: true, type: () => Number }, width_meter: { required: true, type: () => Number }, line_spacing_meter: { required: true, type: () => Number }, plant_spacing_meter: { required: true, type: () => Number }, max_side_shift_travel_meter: { required: true, type: () => Number }, start_time: { required: true, type: () => Date }, end_time: { required: true, type: () => Date } };
    }
}
exports.MachineUse = MachineUse;
;
//# sourceMappingURL=machine-uses.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const openapi = require("@nestjs/swagger");
class Field {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, field_name: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, farm_name: { required: true, type: () => String }, crop_name: { required: true, type: () => String }, active_boundary_geom: { required: true, type: () => Object }, area_in_sq_meters_calculated: { required: true, type: () => Number }, area_in_sq_meters_given: { required: true, type: () => Number }, aspect: { required: true, type: () => Number }, slope: { required: true, type: () => Number }, slope_length: { required: true, type: () => Number }, guidance_group_names: { required: true, type: () => [String] }, relevant_map_names: { required: true, type: () => [String] }, wet_date: { required: true, type: () => Date }, calculated_harvest_date: { required: true, type: () => Date }, estimated_harvest_date: { required: true, type: () => Date }, harvest_date: { required: true, type: () => Date }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.Field = Field;
;
//# sourceMappingURL=fields.entity.js.map
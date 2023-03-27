"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropAnalyticsData = void 0;
const openapi = require("@nestjs/swagger");
;
;
;
;
;
;
;
class CropAnalyticsData {
    static _OPENAPI_METADATA_FACTORY() {
        return { crop_id: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, crop_zone_id: { required: true, type: () => String }, crop_zone_name: { required: true, type: () => String }, crop_name: { required: true, type: () => String }, field_name: { required: true, type: () => String }, seed_type: { required: true, enum: require("../enums").SeedTypeEnum }, wet_date: { required: true, type: () => Date }, crop_position: { required: true, type: () => [Number] }, irrigation_records_json: { required: true, type: () => String }, cultivation_records_json: { required: true, type: () => String }, application_records_json: { required: true, type: () => String }, crop_measure_records_json: { required: true, type: () => String }, insect_infestation_records_json: { required: true, type: () => String }, fungal_infestation_records_json: { required: true, type: () => String }, viral_infestation_records_json: { required: true, type: () => String }, reject_date: { required: true, type: () => Date }, harvest_date: { required: true, type: () => Date } };
    }
}
exports.CropAnalyticsData = CropAnalyticsData;
;
//# sourceMappingURL=crop-analytics-data.entity.js.map
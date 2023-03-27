"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropAnalyticsDataDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class CropAnalyticsDataDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { crop_id: { required: true, type: () => String }, grower_id: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, crop_zone_id: { required: true, type: () => String }, crop_code: { required: true, type: () => String }, crop_position: { required: true, type: () => Object }, irrigation_record: { required: false, type: () => Object }, cultivation_record: { required: false, type: () => Object }, application_record: { required: false, type: () => Object }, crop_measure_record: { required: false, type: () => Object }, insect_infestation_record: { required: false, type: () => Object }, fungal_infestation_record: { required: false, type: () => Object }, viral_infestation_record: { required: false, type: () => Object }, reject_date: { required: false, type: () => Date }, harvest_date: { required: false, type: () => Date } };
    }
}
exports.CropAnalyticsDataDTO = CropAnalyticsDataDTO;
;
//# sourceMappingURL=crop-analytics-data.dto.js.map
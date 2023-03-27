"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropZoneDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class CropZoneDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { crop_zone_name: { required: true, type: () => String }, field_id: { required: true, type: () => String }, crop_season: { required: true, type: () => String }, crop_code: { required: true, type: () => String }, bounding_region: { required: false, type: () => Object }, area_in_sq_meters: { required: false, type: () => Number }, seed_type: { required: false, type: () => String }, wet_date: { required: false, type: () => Date }, calculated_harvest_date: { required: false, type: () => Date }, estimated_harvest_date: { required: false, type: () => Date }, harvest_date: { required: false, type: () => Date }, notes: { required: false, type: () => [String] }, archived: { required: true, type: () => Boolean } };
    }
}
exports.CropZoneDTO = CropZoneDTO;
;
//# sourceMappingURL=crop-zones.dto.js.map
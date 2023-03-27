"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropImage = void 0;
const openapi = require("@nestjs/swagger");
class CropImage {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, crop_id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, camera_id: { required: false, type: () => Number }, crop_zone_id: { required: true, type: () => String }, crop_zone_name: { required: true, type: () => String }, field_id: { required: true, type: () => String }, crop_code: { required: true, type: () => String }, wet_date: { required: true, type: () => Date }, image_binary: { required: false, type: () => String }, image_annotations: { required: false, type: () => String }, image_ts: { required: true, type: () => Date } };
    }
}
exports.CropImage = CropImage;
//# sourceMappingURL=crop-images.entity.js.map
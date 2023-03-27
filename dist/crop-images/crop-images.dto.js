"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropImageDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
class CropImageDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { organization_id: { required: true, type: () => String }, crop_id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, camera_id: { required: false, type: () => Number }, image_binary: { required: false, type: () => String }, image_annotations: { required: false, type: () => String }, image_ts: { required: true, type: () => Date } };
    }
}
exports.CropImageDTO = CropImageDTO;
//# sourceMappingURL=crop-images.dto.js.map
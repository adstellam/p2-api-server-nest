"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmDTO = exports.IdObject = exports.ContextItemRecord = void 0;
const openapi = require("@nestjs/swagger");
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
class FarmDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { farm_name: { required: true, type: () => String }, grower_id: { required: false, type: () => String }, permitee: { required: false, type: () => String }, permit_number: { required: false, type: () => String }, bounding_region: { required: true, type: () => Object } };
    }
}
exports.FarmDTO = FarmDTO;
;
//# sourceMappingURL=farms.dto.js.map
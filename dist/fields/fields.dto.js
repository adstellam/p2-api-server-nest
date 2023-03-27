"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldDTO = exports.IdObject = exports.ContextItemRecord = void 0;
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
class FieldDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { field_name: { required: true, type: () => String }, farm_id: { required: true, type: () => String }, active_boundary_id: { required: true, type: () => String }, area_in_sq_meters: { required: false, type: () => Number }, aspect: { required: false, type: () => Number }, slope: { required: false, type: () => Number }, slope_length: { required: false, type: () => Number }, archived: { required: false, type: () => Boolean }, context_item: { required: false, type: () => require("./fields.dto").ContextItemRecord } };
    }
}
exports.FieldDTO = FieldDTO;
;
//# sourceMappingURL=fields.dto.js.map
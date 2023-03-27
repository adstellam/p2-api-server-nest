"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldBoundaryDTO = exports.IdObject = exports.ContextItemRecord = exports.HeadlandRecord = exports.InteriorBoundaryAttributeRecord = void 0;
const openapi = require("@nestjs/swagger");
class InteriorBoundaryAttributeRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { attribute_key: { required: true, type: () => String }, attribute_value: { required: true, type: () => String } };
    }
}
exports.InteriorBoundaryAttributeRecord = InteriorBoundaryAttributeRecord;
;
class HeadlandRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { headland_key: { required: true, type: () => String }, headland_value: { required: true, type: () => String } };
    }
}
exports.HeadlandRecord = HeadlandRecord;
;
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
class FieldBoundaryDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { field_id: { required: true, type: () => String }, geom: { required: true, type: () => Object }, original_epsg_code: { required: false, type: () => String }, interior_boundary_attribute: { required: false, type: () => require("./field-boundaries.dto").InteriorBoundaryAttributeRecord }, headland: { required: false, type: () => require("./field-boundaries.dto").HeadlandRecord }, archived: { required: false, type: () => Boolean }, context_item: { required: false, type: () => require("./field-boundaries.dto").ContextItemRecord } };
    }
}
exports.FieldBoundaryDTO = FieldBoundaryDTO;
;
//# sourceMappingURL=field-boundaries.dto.js.map
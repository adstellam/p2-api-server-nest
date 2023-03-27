"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldBoundary = void 0;
const openapi = require("@nestjs/swagger");
class FieldBoundary {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, field_id: { required: true, type: () => String }, field_name: { required: true, type: () => String }, geom: { required: true, type: () => Object }, interior_boundary_attributes_json: { required: true, type: () => String }, headlands_json: { required: true, type: () => String }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.FieldBoundary = FieldBoundary;
//# sourceMappingURL=field-boundaries.entity.js.map
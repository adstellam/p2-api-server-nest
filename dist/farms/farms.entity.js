"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farm = void 0;
const openapi = require("@nestjs/swagger");
class Farm {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, farm_name: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, grower_name: { required: true, type: () => String }, permitee: { required: true, type: () => String }, permit_number: { required: true, type: () => String }, bounding_region: { required: true, type: () => Object }, field_names: { required: true, type: () => [String] } };
    }
}
exports.Farm = Farm;
;
//# sourceMappingURL=farms.entity.js.map
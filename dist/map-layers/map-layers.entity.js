"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapLayer = void 0;
const openapi = require("@nestjs/swagger");
class MapLayer {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, map_layer_name: { required: true, type: () => String }, map_layer_notes: { required: true, type: () => [String] }, organization_id: { required: true, type: () => String }, map_layer_type: { required: true, enum: require("../enums").ReferenceLayerTypeEnum }, map_layer_source_format: { required: true, enum: require("../enums").ReferenceLayerSourceFormatEnum }, map_layer_source_date: { required: true, type: () => Date }, map_layer_source: { required: true, type: () => String }, bounding_polygon: { required: true, type: () => Object }, contained_field_names: { required: true, type: () => [String] } };
    }
}
exports.MapLayer = MapLayer;
//# sourceMappingURL=map-layers.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapLayerDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
class MapLayerDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { map_layer_name: { required: true, type: () => String }, notes: { required: true, type: () => [String] }, map_layer_type: { required: true, enum: require("../enums").ReferenceLayerTypeEnum }, map_layer_source_format: { required: true, enum: require("../enums").ReferenceLayerSourceFormatEnum }, map_layer_source_date: { required: false, type: () => Date }, vector_source: { required: false, type: () => String }, raster_source: { required: false, type: () => String }, bounding_polygon: { required: false, type: () => Object } };
    }
}
exports.MapLayerDTO = MapLayerDTO;
//# sourceMappingURL=map-layers.dto.js.map
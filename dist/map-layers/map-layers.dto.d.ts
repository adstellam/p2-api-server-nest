import { Polygon } from 'geojson';
import { ReferenceLayerTypeEnum, ReferenceLayerSourceFormatEnum } from 'src/enums';
export declare class IdObject {
    id: string;
}
export declare class MapLayerDTO {
    map_layer_name: string;
    notes: string[];
    map_layer_type: ReferenceLayerTypeEnum;
    map_layer_source_format: ReferenceLayerSourceFormatEnum;
    map_layer_source_date?: Date;
    vector_source?: string;
    raster_source?: string;
    bounding_polygon?: Polygon;
}

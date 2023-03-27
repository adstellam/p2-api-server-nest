import { FeatureCollection, Polygon } from 'geojson';
import { ReferenceLayerTypeEnum, ReferenceLayerSourceFormatEnum } from 'src/enums';

export class IdObject {
    id: string;
}

export class MapLayerDTO {
    map_layer_name: string;
    notes: string[];
    map_layer_type: ReferenceLayerTypeEnum;
    map_layer_source_format: ReferenceLayerSourceFormatEnum;
    map_layer_source_date?: Date;
    vector_source?: string;
    raster_source?: string;
    bounding_polygon?: Polygon;
}

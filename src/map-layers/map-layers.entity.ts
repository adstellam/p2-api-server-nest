import { Polygon } from 'geojson';
import { ReferenceLayerTypeEnum, ReferenceLayerSourceFormatEnum } from 'src/enums';

export class MapLayer {
    id: string;
    map_layer_name: string;
    map_layer_notes: string[];
    organization_id: string;
    map_layer_type: ReferenceLayerTypeEnum;
    map_layer_source_format: ReferenceLayerSourceFormatEnum;
    map_layer_source_date: Date;
    map_layer_source: string;
    bounding_polygon: Polygon;
    contained_field_names: string[];
}
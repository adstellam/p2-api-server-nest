import { MapLayersService } from 'src/map-layers/map-layers.service';
import { MapLayer } from 'src/map-layers/map-layers.entity';
import { MapLayerDTO, IdObject } from 'src/map-layers/map-layers.dto';
import { ReferenceLayerTypeEnum } from 'src/enums';
export declare class MapLayersController {
    private mapLayersService;
    constructor(mapLayersService: MapLayersService);
    get_map_layers_by_query_parameters(auth_header: string, organization_id: string, map_layer_type?: ReferenceLayerTypeEnum, from_date?: string, to_date?: string): Promise<MapLayer[]>;
    insert_map_layer(auth_header: string, organization_id: string, map_layer_dto: MapLayerDTO): Promise<IdObject>;
    get_map_layer_by_id(auth_header: string, organization_id: string, map_layer_id: string): Promise<MapLayer>;
    update_map_layer(auth_header: string, map_layer_id: string, map_layer_dto: MapLayerDTO): Promise<IdObject>;
    delete_map_layer(auth_header: string, map_layer_id: string): Promise<IdObject>;
}

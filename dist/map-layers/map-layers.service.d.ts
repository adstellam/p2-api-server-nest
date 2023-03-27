import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { MapLayerDTO } from 'src/map-layers/map-layers.dto';
import { ReferenceLayerTypeEnum } from 'src/enums';
export declare class MapLayersService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_map_layers_by_query_parameters(organization_id: string, map_layer_type: ReferenceLayerTypeEnum, from_date: Date, to_date: Date): Promise<QueryResult>;
    insert_map_layer(organization_id: string, map_layer_dto: MapLayerDTO): Promise<QueryResult>;
    get_map_layer_by_id(map_layer_id: string): Promise<QueryResult>;
    update_map_layer(map_layer_id: string, map_layer_dto: MapLayerDTO): Promise<QueryResult>;
    delete_map_layer(map_layer_id: string): Promise<QueryResult>;
}

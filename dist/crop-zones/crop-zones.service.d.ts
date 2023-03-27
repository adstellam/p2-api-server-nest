import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { CropZoneDTO } from 'src/crop-zones/crop-zones.dto';
export declare class CropZonesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_crop_zones_by_query_parameters(organization_id: string, grower_name: string, crop_season: string, farm_name: string, field_name: string, crop_name: string, show_archived: boolean, wet_date: string): Promise<QueryResult>;
    insert_crop_zone(crop_zone_dto: CropZoneDTO): Promise<QueryResult>;
    get_crop_zone_by_id(crop_zone_id: string): Promise<QueryResult>;
    update_crop_zone(crop_zone_id: string, crop_zone_dto: CropZoneDTO): Promise<QueryResult>;
    delete_crop_zone(crop_zone_id: string): Promise<QueryResult>;
}

import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { CropAnalyticsDataDTO } from 'src/crop-analytics-data/crop-analytics-data.dto';
import { SeedTypeEnum } from 'src/enums';
export declare class CropAnalyticsDataService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_crop_analytics_data_by_query_parameters(organization_id: string, grower_id: string, crop_season: string, crop_zone_id: string, crop_name: string, field_id: string, seed_type: SeedTypeEnum, wet_date: Date): Promise<QueryResult>;
    get_crop_analytics_data_by_crop_id(crop_id: string): Promise<QueryResult>;
    update_crop_analytics_data(crop_id: string, crop_analytics_data_dto: CropAnalyticsDataDTO): Promise<QueryResult>;
    delete_crop_analytics_data(crop_id: string): Promise<QueryResult>;
}

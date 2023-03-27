import { CropAnalyticsDataService } from 'src/crop-analytics-data/crop-analytics-data.service';
import { CropAnalyticsData } from 'src/crop-analytics-data/crop-analytics-data.entity';
import { CropAnalyticsDataDTO, IdObject } from 'src/crop-analytics-data/crop-analytics-data.dto';
import { SeedTypeEnum } from 'src/enums';
export declare class CropAnalyticsDataController {
    private cropAnalyticsDataService;
    constructor(cropAnalyticsDataService: CropAnalyticsDataService);
    get_crop_analytics_data_by_query_parameters(auth_header: string, organization_id: string, grower_id?: string, crop_season?: string, crop_zone_id?: string, crop_name?: string, field_id?: string, seed_type?: SeedTypeEnum, wet_date?: string): Promise<CropAnalyticsData[]>;
    get_crop_analytics_data_by_crop_id(auth_header: string, organization_id: string, crop_id: string): Promise<CropAnalyticsData>;
    update_crop_analytics_data(auth_header: string, crop_id: string, crop_analytics_data_dto: CropAnalyticsDataDTO): Promise<IdObject>;
    delete_crop_analytics_data(auth_header: string, crop_id: string): Promise<IdObject>;
}

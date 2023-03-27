import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
export declare class CropImagesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_crop_images_by_query_parameters(organization_id: string, machine_name: string, crop_zone_id: string, field_id: string, crop_code: string, image_capture_date: Date): Promise<QueryResult>;
    get_crop_image_by_id(crop_image_id: string): Promise<QueryResult>;
    get_crop_image_blob(crop_image_id: string): Promise<QueryResult>;
    get_crop_image_annotations(crop_image_id: string): Promise<QueryResult>;
    delete_crop_image(crop_image_id: string): Promise<QueryResult>;
}

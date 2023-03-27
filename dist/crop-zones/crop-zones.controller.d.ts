import { CropZonesService } from 'src/crop-zones/crop-zones.service';
import { CropZone } from 'src/crop-zones/crop-zones.entity';
import { CropZoneDTO, IdObject } from 'src/crop-zones/crop-zones.dto';
export declare class CropZonesController {
    private cropZonesService;
    constructor(cropZonesService: CropZonesService);
    get_crop_zones_by_query_parameters(auth_header: string, organization_id: string, grower_name?: string, crop_season?: string, farm_name?: string, field_name?: string, crop_name?: string, show_archived?: string, wet_date?: string): Promise<CropZone[]>;
    insert_crop_zone(auth_header: string, crop_zone_dto: CropZoneDTO): Promise<IdObject>;
    get_crop_zone_by_id(auth_header: string, crop_zone_id: string): Promise<CropZone>;
    update_crop_zone(auth_header: string, crop_zone_id: string, crop_zone_dto: CropZoneDTO): Promise<IdObject>;
    delete_crop_zone(auth_header: string, crop_zone_id: string): Promise<IdObject>;
}

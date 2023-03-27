import { MultiPolygon } from "geojson";

export class IdObject {
    id: string;
};

export class CropZoneDTO {
    crop_zone_name: string;
    field_id: string;
    crop_season: string;
    crop_code: string;
    bounding_region?: MultiPolygon;
    area_in_sq_meters?: number;
    seed_type?: string;
    wet_date?: Date;
    calculated_harvest_date?: Date;
    estimated_harvest_date?: Date;
    harvest_date?: Date;
    notes?: string[];
    archived: boolean;
};
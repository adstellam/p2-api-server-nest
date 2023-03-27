import { MultiPolygon } from "geojson";
export declare class CropZone {
    id: string;
    crop_zone_name: string;
    organization_id: string;
    grower_name: string;
    crop_season: string;
    farm_name: string;
    field_name: string;
    crop_name: string;
    bounding_region: MultiPolygon;
    area_in_sq_meters_calculated: number;
    area_in_sq_meters_given: number;
    guidance_group_names: string[];
    seed_type: string;
    wet_date: Date;
    calculated_harvest_date: Date;
    estimated_harvest_date: Date;
    harvest_date: Date;
    archived: boolean;
    created: Date;
    updated: Date;
}

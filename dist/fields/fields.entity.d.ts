import { MultiPolygon } from "geojson";
export declare class Field {
    id: string;
    field_name: string;
    organization_id: string;
    grower_name: string;
    farm_name: string;
    crop_name: string;
    active_boundary_geom: MultiPolygon;
    area_in_sq_meters_calculated: number;
    area_in_sq_meters_given: number;
    aspect: number;
    slope: number;
    slope_length: number;
    guidance_group_names: string[];
    relevant_map_names: string[];
    wet_date: Date;
    calculated_harvest_date: Date;
    estimated_harvest_date: Date;
    harvest_date: Date;
    archived: boolean;
    created: Date;
    updated: Date;
}

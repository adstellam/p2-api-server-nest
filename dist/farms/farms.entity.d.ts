import { MultiPolygon } from "geojson";
export declare class Farm {
    id: string;
    farm_name: string;
    organization_id: string;
    grower_name: string;
    permitee: string;
    permit_number: string;
    bounding_region: MultiPolygon;
    field_names: string[];
}

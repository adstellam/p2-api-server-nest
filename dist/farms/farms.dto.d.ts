import { MultiPolygon } from "geojson";
export declare class ContextItemRecord {
    context_key: string;
    context_value: string;
}
export declare class IdObject {
    id: string;
}
export declare class FarmDTO {
    farm_name: string;
    grower_id?: string;
    permitee?: string;
    permit_number?: string;
    bounding_region: MultiPolygon;
}

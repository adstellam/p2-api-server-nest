import { MultiPolygon } from "geojson";

export class ContextItemRecord {
    context_key: string;
    context_value: string;
};

export class IdObject {
    id: string;
};

export class FarmDTO {
    farm_name: string;
    grower_id?: string;
    permitee?: string;
    permit_number?: string;
    bounding_region: MultiPolygon;
};
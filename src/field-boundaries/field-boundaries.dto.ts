import { MultiPolygon } from "geojson";

export class InteriorBoundaryAttributeRecord {
    attribute_key: string;
    attribute_value: string;
};

export class HeadlandRecord {
    headland_key: string;
    headland_value: string;
};

export class ContextItemRecord {
    context_key: string;
    context_value: string;
};

export class IdObject {
    id: string;
};

export class FieldBoundaryDTO {
    field_id: string;
    geom: MultiPolygon;
    original_epsg_code?: string;
    interior_boundary_attribute?: InteriorBoundaryAttributeRecord;
    headland?: HeadlandRecord;
    archived?: boolean;
    context_item?: ContextItemRecord;
};
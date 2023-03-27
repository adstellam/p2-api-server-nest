import { MultiPolygon } from "geojson";

export class FieldBoundary {
    id: string;
    organization_id: string;
    field_id: string;
    field_name: string;
    geom: MultiPolygon;
    interior_boundary_attributes_json: string;
    headlands_json: string;
    archived: boolean;
    created: Date;
    updated: Date;
}
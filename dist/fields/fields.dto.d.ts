export declare class ContextItemRecord {
    context_key: string;
    context_value: string;
}
export declare class IdObject {
    id: string;
}
export declare class FieldDTO {
    field_name: string;
    farm_id: string;
    active_boundary_id: string;
    area_in_sq_meters?: number;
    aspect?: number;
    slope?: number;
    slope_length?: number;
    archived?: boolean;
    context_item?: ContextItemRecord;
}

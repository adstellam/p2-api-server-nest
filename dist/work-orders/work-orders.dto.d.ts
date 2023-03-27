export declare class StatusUpdateRecord {
    representation: string;
    ts: Date;
}
export declare class IdObject {
    id: string;
}
export declare class WorkOrderDTO {
    work_order_name: string;
    work_order_version?: string;
    grower_id: string;
    crop_season: string;
    crop_code: string;
    field_id: string;
    work_order_manager_id?: string;
    status_update?: StatusUpdateRecord;
    archived?: boolean;
}

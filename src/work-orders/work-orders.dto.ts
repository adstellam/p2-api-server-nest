export class StatusUpdateRecord {
    representation: string;
    ts: Date;
};

export class IdObject {
    id: string;
};

export class WorkOrderDTO {
    work_order_name: string;
    work_order_version?: string;
    grower_id: string;
    crop_season: string;
    crop_code: string;
    field_id: string;
    work_order_manager_id?: string;
    status_update?: StatusUpdateRecord;
    archived?: boolean;
};
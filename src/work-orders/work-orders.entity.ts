export class WorkOrder {
    id: string;
    work_order_name: string;
    work_order_version: string;
    organization_id: string;
    grower_name: string;
    farm_manager_name: string;
    crop_season: string;
    crop_name: string;
    field_name: string;
    job_names: string[];
    status_updates_json: string[];
    archived: boolean;
    created: Date;
    updated: Date;
};
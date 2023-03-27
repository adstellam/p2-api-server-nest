import { OperationTypeEnum, JobPriorityEnum, WorkStatusEnum } from 'src/enums';
export declare class Job {
    id: string;
    job_name: string;
    organization_id: string;
    grower_name: string;
    crop_season: string;
    farm_name: string;
    field_name: string;
    crop_zone_id: string;
    crop_zone_name: string;
    crop_name: string;
    work_order_id: string;
    work_order_name: string;
    operation_types: OperationTypeEnum[];
    task_names: string[];
    job_priority: JobPriorityEnum;
    job_supervisor_name: string;
    job_status: WorkStatusEnum;
    planned_start_date: Date;
    planned_end_date: Date;
    actual_start_date: Date;
    actual_end_date: Date;
    notes: string[];
    archived: boolean;
    created: Date;
    updated: Date;
}

import { OperationTypeEnum, WorkStatusEnum } from 'src/enums'; 

export class Task {
    id: string;
    task_name: string;
    organization_id: string;
    grower_name: string;
    crop_season: string;
    farm_name: string;
    field_name: string;
    crop_zone_name: string;
    work_order_name: string;
    job_name: string;
    operation_types: OperationTypeEnum[];
    machine_name: string;
    prescription_name: string;
    task_operator_name: string;
    task_status: WorkStatusEnum;
    start_time: Date;
    end_time: Date;
    notes: string[];
    archived: boolean;
    created: Date;
    updated: Date;
};

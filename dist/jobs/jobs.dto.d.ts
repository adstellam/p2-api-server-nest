import { OperationTypeEnum, JobPriorityEnum, WorkStatusEnum } from 'src/enums';
export declare class IdObject {
    id: string;
}
export declare class JobDTO {
    job_name: string;
    work_order_id: string;
    crop_zone_id: string;
    job_supervisor_id?: string;
    operation_types: OperationTypeEnum[];
    job_status?: WorkStatusEnum;
    job_priority?: JobPriorityEnum;
    proposed_start_date: Date;
    proposed_end_date: Date;
    actual_start_date?: Date;
    actual_end_date?: Date;
    notes?: string[];
    archived?: boolean;
}

import { OperationTypeEnum, WorkStatusEnum } from 'src/enums'; 

export class IdObject {
    id: string;
};

export class TaskDTO {
    task_name: string;
    job_id: string;
    machine_id: string;
    task_operator_id?: string;
    operation_type: OperationTypeEnum;
    task_status?: WorkStatusEnum;
    start_time?: Date;
    end_time?: Date;
    notes?: string[];
    archived?: boolean;
}
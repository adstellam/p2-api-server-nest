import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { TaskDTO } from 'src/tasks/tasks.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
export declare class TasksService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_tasks_by_query_parameters(organization_id: string, grower_name: string, crop_season: string, field_name: string, job_name: string, operation_type: OperationTypeEnum, machine_name: string, task_status: WorkStatusEnum, start_date: Date, show_archived: boolean): Promise<QueryResult>;
    insert_task(task_dto: TaskDTO): Promise<QueryResult>;
    get_task_by_id(task_id: string): Promise<QueryResult>;
    update_task(task_id: string, task_dto: TaskDTO): Promise<QueryResult>;
    delete_task(task_id: string): Promise<QueryResult>;
}

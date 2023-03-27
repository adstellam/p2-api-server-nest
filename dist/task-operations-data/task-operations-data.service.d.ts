import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { TaskOperationsDataDTO } from 'src/task-operations-data/task-operations-data.dto';
export declare class TaskOperationsDataService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_task_operations_data_by_query_parameters(organization_id: string, job_id: string, job_name: string, task_id: string, task_name: string, crop_season: string, field_name: string, machine_name: string): Promise<QueryResult>;
    get_task_operations_data_by_id(task_operations_data_id: string): Promise<QueryResult>;
    patch_task_operations_data(task_operations_data_id: string, task_operations_data_dto: TaskOperationsDataDTO): Promise<QueryResult>;
}

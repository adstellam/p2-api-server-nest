import { TaskOperationsDataService } from 'src/task-operations-data/task-operations-data.service';
import { TaskOperationsData } from 'src/task-operations-data/task-operations-data.entity';
import { TaskOperationsDataDTO, IdObject } from 'src/task-operations-data/task-operations-data.dto';
export declare class TaskOperationsDataController {
    private taskOperationsDataService;
    constructor(taskOperationsDataService: TaskOperationsDataService);
    get_task_operations_data_by_query_parameters(auth_header: string, organization_id: string, job_id?: string, job_name?: string, task_id?: string, task_name?: string, crop_season?: string, field_name?: string, machine_name?: string): Promise<TaskOperationsData[]>;
    get_task_operations_data_by_id(auth_header: string, task_operations_data_id: string): Promise<TaskOperationsData>;
    patch_task_opereations_data(auth_header: string, task_operations_data_id: string, task_operations_data_dto: TaskOperationsDataDTO): Promise<IdObject>;
}

import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/tasks.entity';
import { TaskDTO, IdObject } from 'src/tasks/tasks.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    get_tasks_by_query_parameters(auth_header: string, organization_id: string, grower_name?: string, crop_season?: string, field_name?: string, job_name?: string, operation_type?: OperationTypeEnum, machine_name?: string, task_status?: WorkStatusEnum, start_date?: string, show_archived?: string): Promise<Task[]>;
    insert_task(auth_header: string, task_dto: TaskDTO): Promise<IdObject>;
    get_task_by_id(auth_header: string, task_id: string): Promise<Task>;
    update_task(auth_header: string, task_id: string, task_dto: TaskDTO): Promise<IdObject>;
    delete_task(auth_header: string, task_id: string): Promise<IdObject>;
}

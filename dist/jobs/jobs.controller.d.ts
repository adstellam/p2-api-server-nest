import { JobsService } from 'src/jobs/jobs.service';
import { Job } from 'src/jobs/jobs.entity';
import { JobDTO, IdObject } from 'src/jobs/jobs.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
export declare class JobsController {
    private jobsService;
    constructor(jobsService: JobsService);
    get_jobs_by_query_parameters(auth_header: string, organization_id: string, grower_name?: string, crop_season?: string, field_name?: string, crop_name?: string, work_order_name?: string, operation_type?: OperationTypeEnum, job_status?: WorkStatusEnum, planned_start_date?: string, show_archived?: string): Promise<Job[]>;
    insert_job(auth_header: string, organization_id: string, job_dto: JobDTO): Promise<IdObject>;
    get_job_by_id(auth_header: string, job_id: string): Promise<Job>;
    update_job(auth_header: string, job_id: string, job_dto: JobDTO): Promise<IdObject>;
    delete_job(auth_header: string, job_id: string): Promise<IdObject>;
}

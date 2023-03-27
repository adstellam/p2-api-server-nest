import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { JobDTO } from 'src/jobs/jobs.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
export declare class JobsService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_jobs_by_query_parameters(organization_id: string, grower_name: any, crop_season: string, field_name: string, crop_name: string, work_order_name: string, operation_type: OperationTypeEnum, job_status: WorkStatusEnum, planned_start_date: Date, show_archived: boolean): Promise<QueryResult>;
    insert_job(organization_id: string, job_dto: JobDTO): Promise<QueryResult>;
    get_job_by_id(job_id: string): Promise<QueryResult>;
    update_job(job_id: string, job_dto: JobDTO): Promise<QueryResult>;
    delete_job(job_id: string): Promise<QueryResult>;
}

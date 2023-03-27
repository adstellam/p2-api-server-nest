import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { JobsService } from 'src/jobs/jobs.service';
import { Job } from 'src/jobs/jobs.entity';
import { JobDTO, IdObject } from 'src/jobs/jobs.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/jobs')
//@UseGuards(AuthorizationGuard)
export class JobsController {

    constructor(
        private jobsService: JobsService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Job')
    async get_jobs_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_name?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('fieldName') field_name?: string,
        @Query('cropName') crop_name?: string,
        @Query('workOrderName') work_order_name?: string,
        @Query('operationType') operation_type?: OperationTypeEnum,
        @Query('jobStatus') job_status?: WorkStatusEnum,
        @Query('plannedStartDate') planned_start_date?: string,
        @Query('showArchived') show_archived?: string
    ): Promise<Job[]> {
        try {
            const result: QueryResult<Job> = await this.jobsService.get_jobs_by_query_parameters(
                organization_id, 
                grower_name, 
                crop_season, 
                field_name, 
                crop_name, 
                work_order_name, 
                operation_type, 
                job_status,
                planned_start_date ? new Date(planned_start_date) : null, 
                show_archived && show_archived.toLowerCase() == "true" ? true : false
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Post()
    @SetMetadata('ApiResource', 'JobDTO')
    async insert_job(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() job_dto: JobDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.jobsService.insert_job(
                organization_id, 
                job_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':jobId')
    @SetMetadata('ApiResource', 'Job')
    async get_job_by_id(
        @Headers('authorization') auth_header: string,
        @Param('jobId') job_id: string
    ): Promise<Job> {
        try {
            const result: QueryResult<Job> = await this.jobsService.get_job_by_id(
                job_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':jobId')
    @SetMetadata('ApiResource', 'JobDTO') 
    async update_job(
        @Headers('authorization') auth_header: string,
        @Param('jobId') job_id: string,
        @Body() job_dto: JobDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.jobsService.update_job(
                job_id, 
                job_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':jobId')
    @SetMetadata('ApiResource', 'JobDTO')
    async delete_job(
        @Headers('authorization') auth_header: string,
        @Param('jobId') job_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.jobsService.delete_job(
                job_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

}

import { Controller, Param, Query, Body, Headers, Get, Patch, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { TaskOperationsDataService } from 'src/task-operations-data/task-operations-data.service';
import { TaskOperationsData } from 'src/task-operations-data/task-operations-data.entity';
import { TaskOperationsDataDTO, IdObject } from 'src/task-operations-data/task-operations-data.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/taskOperationsData')
//@UseGuards(AuthorizationGuard)
export class TaskOperationsDataController {

    constructor(
        private taskOperationsDataService: TaskOperationsDataService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'TaskOperationsData')
    async get_task_operations_data_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('jobId') job_id?: string,
        @Query('jobName') job_name?: string,
        @Query('taskId') task_id?: string,
        @Query('taskName') task_name?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('fieldName') field_name?: string,
        @Query('machineName') machine_name?: string
    ): Promise<TaskOperationsData[]> {
        try {
            const result: QueryResult<TaskOperationsData> = await this.taskOperationsDataService.get_task_operations_data_by_query_parameters(
                organization_id,
                job_id,
                job_name, 
                task_id,
                task_name,
                crop_season, 
                field_name, 
                machine_name
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':taskOperationsDataId')
    @SetMetadata('ApiResource', 'TaskOperationsData')
    async get_task_operations_data_by_id(
        @Headers('authorization') auth_header: string,
        @Param('taskOperationsDataId') task_operations_data_id: string
    ): Promise<TaskOperationsData> {
        try {
            const result: QueryResult<TaskOperationsData> = await this.taskOperationsDataService.get_task_operations_data_by_id(
                task_operations_data_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Patch(':taskOperationsDataId')
    @SetMetadata('ApiResource', 'TaskOperationsDataDTO')
    async patch_task_opereations_data(
        @Headers('authorization') auth_header: string,
        @Param('taskOperationsDataId') task_operations_data_id: string,
        @Body() task_operations_data_dto: TaskOperationsDataDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.taskOperationsDataService.patch_task_operations_data(
                task_operations_data_id, 
                task_operations_data_dto
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

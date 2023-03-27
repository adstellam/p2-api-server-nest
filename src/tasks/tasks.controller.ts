import { Controller, Get, Param, Query, Body, Headers, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/tasks.entity';
import { TaskDTO, IdObject } from 'src/tasks/tasks.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/tasks')
//@UseGuards(AuthorizationGuard)
export class TasksController {

    constructor(
        private tasksService: TasksService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Task')
    async get_tasks_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_name?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('fieldName') field_name?: string,
        @Query('jobName') job_name?: string,
        @Query('operationType') operation_type?: OperationTypeEnum,
        @Query('machineName') machine_name?: string,
        @Query('taskStatus') task_status?: WorkStatusEnum, 
        @Query('startDate') start_date?: string,
        @Query('showArchived') show_archived?: string
    ): Promise<Task[]> {
        try {
            const result: QueryResult<Task> = await this.tasksService.get_tasks_by_query_parameters(
                organization_id, 
                grower_name, 
                crop_season, 
                field_name, 
                job_name, 
                operation_type, 
                machine_name,
                task_status,
                start_date ? new Date(start_date) : null, 
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
    @SetMetadata('ApiResource', 'TaskDTO')
    async insert_task(
        @Headers('authorization') auth_header: string,
        @Body() task_dto: TaskDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.tasksService.insert_task(
                task_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':taskId')
    @SetMetadata('ApiResource', 'Task')
    async get_task_by_id(
        @Headers('authorization') auth_header: string,
        @Param('taskId') task_id: string
    ): Promise<Task> {
        try {
            const result: QueryResult<Task> = await this.tasksService.get_task_by_id(
                task_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':taskId')
    @SetMetadata('ApiResource', 'TaskDTO')
    async update_task(
        @Headers('authorization') auth_header: string,
        @Param('taskId') task_id: string,
        @Body() task_dto: TaskDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.tasksService.update_task(
                task_id, 
                task_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':taskId')
    @SetMetadata('ApiResource', 'TaskDTO')
    async delete_task(
        @Headers('authorization') auth_header: string,
        @Param('taskId') task_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.tasksService.delete_task(
                task_id
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
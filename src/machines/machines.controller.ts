import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { MachinesService } from 'src/machines/machines.service';
import { Machine } from 'src/machines/machines.entity';
import { MachineDTO, IdObject } from 'src/machines/machines.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/machines')
//@UseGuards(AuthorizationGuard)
export class MachinesController {

    constructor(
        private machinesService: MachinesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Machine')
    async get_machines_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('machineClassification') machine_classification?: "cultivator" | "Sprayer",
        @Query('machineModel') machine_model?: string,
        @Query('machineSeries') machine_series?: string,
        @Query('show_archived') show_archived?: string
    ): Promise<Machine[]> {
        try {
            const result: QueryResult<Machine> = await this.machinesService.get_machines_by_query_parameters(
                organization_id, 
                machine_classification, 
                machine_model, 
                machine_series, 
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
    @SetMetadata('ApiResource', 'MachineDTO')
    async insert_machine(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() machine_dto: MachineDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.machinesService.insert_machine(
                organization_id, 
                machine_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':machineId')
    @SetMetadata('ApiResource', 'Machine')
    async get_machine_by_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('machineId') machine_id: string
    ): Promise<Machine> {
        try {
            const result: QueryResult<Machine> = await this.machinesService.get_machine_by_id(
                machine_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':machineId')
    @SetMetadata('ApiResource', 'MachineDTO')
    async update_machine(
        @Headers('authorization') auth_header: string,
        @Param('machineId') machine_id: string,
        @Body() machine_dto: MachineDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.machinesService.update_machine(
                machine_id, 
                machine_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':machineId')
    @SetMetadata('ApiResource', 'MachineDTO')
    async delete_machine(
        @Headers('authorization') auth_header: string,
        @Param('machineId') machine_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.machinesService.delete_machine(
                machine_id
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

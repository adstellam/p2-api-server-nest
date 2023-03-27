import { Controller, Param, Query, Headers, Get, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { MachineUsesService } from 'src/machine-uses/machine-uses.service';
import { MachineUse } from './machine-uses.entity';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/machineUses')
//@UseGuards(AuthorizationGuard)
export class MachineUsesController {

    constructor(
        private machineUsesService: MachineUsesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'MachineUse')
    async get_machine_uses_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('machineId') machine_id: string,
        @Param('machineName') machine_name: string,
        @Query('from') from_time: string,
        @Query('to') to_time?: string,
    ): Promise<MachineUse[]> {
        try {
            const result: QueryResult<MachineUse> = await this.machineUsesService.get_machine_uses_by_query_parameters(
                organization_id, 
                machine_id,
                machine_name, 
                from_time ? new Date(from_time) : new Date('2000-01-01 00:00:00z'), 
                to_time ? new Date(to_time) : new Date() 
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':machineUseId')
    @SetMetadata('ApiResource', 'MachineUse')
    async get_machine_uses_by_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('machineUseId') machine_use_id: string
    ): Promise<MachineUse> {
        try {
            const result: QueryResult<MachineUse> = await this.machineUsesService.get_machine_uses_by_id(
                organization_id, 
                machine_use_id
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

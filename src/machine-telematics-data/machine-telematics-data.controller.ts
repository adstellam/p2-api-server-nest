import { Controller, Param, Query, Headers, Get, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { MachineTelematicsDataService } from 'src/machine-telematics-data/machine-telematics-data.service';
import { MachineTelematicsData } from './machine-telematics-data.entity';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/machineTelematicsData')
//@UseGuards(AuthorizationGuard)
export class MachineTelematicsDataController {

    constructor(
        private machineTelematicsDataService: MachineTelematicsDataService
    ) {}

    @Get(':machineId')
    @SetMetadata('ApiResource', 'MachineTelematicsData')
    async get_machine_telematics_data_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('machineId') machine_id: string,
        @Query('from') from_time: string,
        @Query('to') to_time?: string,
    ): Promise<MachineTelematicsData[]> {
        try {
            const result: QueryResult<MachineTelematicsData> = await this.machineTelematicsDataService.get_machine_telematics_data(
                organization_id, 
                machine_id, 
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
}
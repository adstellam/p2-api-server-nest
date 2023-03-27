import { Controller, Param, Query, Body, Headers, Post, Get, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { FarmsService } from 'src/farms/farms.service';
import { Farm } from 'src/farms/farms.entity';
import { FarmDTO, IdObject } from 'src/farms/farms.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/farms')
//@UseGuards(AuthorizationGuard)
export class FarmsController {

    constructor(
        private farmsService: FarmsService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Farm')
    async get_all_farms(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string
    ): Promise<Farm[]> {
        try {
            const result: QueryResult<Farm> = await this.farmsService.get_all_farms(
                organization_id, 
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
    @SetMetadata('ApiResource', 'FarmDTO')
    async insert_farm(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() farm_dto: FarmDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.farmsService.insert_farm(
                organization_id,
                farm_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':farmId')
    @SetMetadata('ApiResource', 'Farm')
    async get_farm_by_id(
        @Headers('authorization') auth_header: string,
        @Param('farmId') farm_id: string
    ): Promise<Farm> {
        try {
            const result: QueryResult<Farm> = await this.farmsService.get_farm_by_id(
                farm_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':farmId')
    @SetMetadata('ApiResource', 'FarmDTO')
    async update_farm(
        @Headers('authorization') auth_header: string,
        @Param('farmId') farm_id: string,
        @Body() farm_dto: FarmDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.farmsService.update_farm(
                farm_id, 
                farm_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':farmId')
    @SetMetadata('ApiResource', 'FarmDTO')
    async delete_farm(
        @Headers('authorization') auth_header: string,
        @Param('farmId') farm_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.farmsService.delete_farm(
                farm_id
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

import { Controller, Param, Query, Body, Headers, Post, Get, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { FieldBoundariesService } from 'src/field-boundaries/field-boundaries.service';
import { FieldBoundary } from 'src/field-boundaries/field-boundaries.entity';
import { FieldBoundaryDTO, IdObject } from 'src/field-boundaries/field-boundaries.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/fieldBoundaries')
//@UseGuards(AuthorizationGuard)
export class FieldBoundariesController {

    constructor(
        private fieldBoundariesService: FieldBoundariesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'FieldBoundary')
    async get_field_boundaries_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('fieldId') field_id: string,
        @Param('fieldName') field_name: string,
        @Query('showAchived') show_archived?: string
    ): Promise<FieldBoundary[]> {
        try {
            const result: QueryResult<FieldBoundary> = await this.fieldBoundariesService.get_field_boundaries_by_query_parameters(
                organization_id, 
                field_id,
                field_name,
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
    @SetMetadata('ApiResource', 'FieldBoundaryDTO')
    async insert_field_boundary(
        @Headers('authorization') auth_header: string,
        @Body() field_boundary_dto: FieldBoundaryDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldBoundariesService.insert_field_boundary(
                field_boundary_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':fieldBoundaryId')
    @SetMetadata('ApiResource', 'FieldBoundary')
    async get_field_boundary_by_id(
        @Headers('authorization') auth_header: string,
        @Param('fieldBoundaryId') field_boundary_id: string
    ): Promise<FieldBoundary> {
        try {
            const result: QueryResult<FieldBoundary> = await this.fieldBoundariesService.get_field_boundary_by_id(
                field_boundary_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':fieldBoundaryId')
    @SetMetadata('ApiResource', 'FieldBoundaryDTO')
    async update_field_boundary(
        @Headers('authorization') auth_header: string,
        @Param('fieldBoundaryId') field_boundary_id: string,
        @Body() field_boundary_dto: FieldBoundaryDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldBoundariesService.update_field_boundary(
                field_boundary_id,
                field_boundary_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':fieldBoundaryId')
    @SetMetadata('ApiResource', 'FieldBoundaryDTO')
    async delete_field_boundary(
        @Headers('authorization') auth_header: string,
        @Param('fieldBoundaryId') field_boundary_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldBoundariesService.delete_field_boundary(
                field_boundary_id
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

import { Controller, Param, Query, Body, Headers, Post, Get, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { FieldsService } from 'src/fields/fields.service';
import { Field } from 'src/fields/fields.entity';
import { FieldDTO, IdObject } from 'src/fields/fields.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/fields')
//@UseGuards(AuthorizationGuard)
export class FieldsController {

    constructor(
        private fieldsService: FieldsService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Field')
    async get_fields_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_name?: string,
        @Query('farmName') field_name?: string,
        @Query('cropName') crop_name?: string,
        @Query('show_archived') show_archived?: string
    ): Promise<Field[]> {
        try {
            const result: QueryResult<Field> = await this.fieldsService.get_fields_by_query_parameters(
                organization_id, 
                grower_name, 
                field_name, 
                crop_name, 
                show_archived && show_archived.toLowerCase() == 'true' ? true : false
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
    @SetMetadata('ApiResource', 'FieldDTO')
    async insert_field(
        @Headers('authorization') auth_header: string,
        @Body() field_dto: FieldDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldsService.insert_field(
                field_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':fieldId')
    @SetMetadata('ApiResource', 'Field')
    async get_field_by_id(
        @Headers('authorization') auth_header: string,
        @Param('fieldId') field_id: string
    ): Promise<Field> {
        try {
            const result: QueryResult<Field> = await this.fieldsService.get_field_by_id(
                field_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':fieldId')
    @SetMetadata('ApiResource', 'FieldDTO')
    async update_field(
        @Headers('authorization') auth_header: string,
        @Param('fieldId') field_id: string,
        @Body() field_dto: FieldDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldsService.update_field(
                field_id, 
                field_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':fieldId')
    @SetMetadata('ApiResource', 'FieldDTO')
    async delete_field(
        @Headers('authorization') auth_header: string,
        @Param('fieldId') field_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.fieldsService.delete_field(
                field_id
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

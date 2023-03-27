import { Controller, Param, Query, Body, Headers, Post, Get, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { CropZonesService } from 'src/crop-zones/crop-zones.service';
import { CropZone } from 'src/crop-zones/crop-zones.entity';
import { CropZoneDTO, IdObject } from 'src/crop-zones/crop-zones.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/cropZones')
//@UseGuards(AuthorizationGuard)
export class CropZonesController {

    constructor(
        private cropZonesService: CropZonesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'CropZone')
    async get_crop_zones_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_name?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('farmName') farm_name?: string,
        @Query('fieldName') field_name?: string,
        @Query('cropName') crop_name?: string,
        @Query('show_archived') show_archived?: string,
        @Query('wetDate') wet_date?: string
    ): Promise<CropZone[]> {
        try {
            const result: QueryResult<CropZone> = await this.cropZonesService.get_crop_zones_by_query_parameters(
                organization_id, 
                grower_name, 
                crop_season,
                farm_name,
                field_name,
                crop_name, 
                show_archived && show_archived.toLowerCase() == 'true' ? true : false,
                wet_date
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
    @SetMetadata('ApiResource', 'CropZoneDTO')
    async insert_crop_zone(
        @Headers('authorization') auth_header: string,
        @Body() crop_zone_dto: CropZoneDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropZonesService.insert_crop_zone(
                crop_zone_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':cropZoneId')
    @SetMetadata('ApiResource', 'CropZone')
    async get_crop_zone_by_id(
        @Headers('authorization') auth_header: string,
        @Param('cropZoneId') crop_zone_id: string
    ): Promise<CropZone> {
        try {
            const result: QueryResult<CropZone> = await this.cropZonesService.get_crop_zone_by_id(
                crop_zone_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':cropZoneId')
    @SetMetadata('ApiResource', 'CropZoneDTO')
    async update_crop_zone(
        @Headers('authorization') auth_header: string,
        @Param('cropZoneId') crop_zone_id: string,
        @Body() crop_zone_dto: CropZoneDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropZonesService.update_crop_zone(
                crop_zone_id, 
                crop_zone_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':cropZoneId')
    @SetMetadata('ApiResource', 'CropZoneDTO')
    async delete_crop_zone(
        @Headers('authorization') auth_header: string,
        @Param('cropZoneId') crop_zone_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropZonesService.delete_crop_zone(
                crop_zone_id
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

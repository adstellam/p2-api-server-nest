import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { CropAnalyticsDataService } from 'src/crop-analytics-data/crop-analytics-data.service';
import { CropAnalyticsData } from 'src/crop-analytics-data/crop-analytics-data.entity';
import { CropAnalyticsDataDTO, IdObject } from 'src/crop-analytics-data/crop-analytics-data.dto';
import { SeedTypeEnum } from 'src/enums';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/cropAnalyticsData')
//@UseGuards(AuthorizationGuard)
export class CropAnalyticsDataController {

    constructor(
        private cropAnalyticsDataService: CropAnalyticsDataService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'CropAnalyticsData')
    async get_crop_analytics_data_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_id?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('cropZoneId') crop_zone_id?: string,
        @Query('cropName') crop_name?: string,
        @Query('fieldId') field_id?: string,
        @Query('seedType') seed_type?: SeedTypeEnum,
        @Query('wetDate') wet_date?: string,
    ): Promise<CropAnalyticsData[]> {
        try {
            const result: QueryResult<CropAnalyticsData> = await this.cropAnalyticsDataService.get_crop_analytics_data_by_query_parameters(
                organization_id, 
                grower_id, 
                crop_season, 
                crop_zone_id,
                crop_name,
                field_id, 
                seed_type, 
                wet_date ? new Date(wet_date) : null
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':cropId')
    @SetMetadata('ApiResource', 'CropAnalyticsData')
    async get_crop_analytics_data_by_crop_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('cropId') crop_id: string
    ): Promise<CropAnalyticsData> {
        try {
            const result: QueryResult<CropAnalyticsData> = await this.cropAnalyticsDataService.get_crop_analytics_data_by_crop_id(
                crop_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':cropId')
    @SetMetadata('ApiResource', 'CropAnalyticsDataDTO')
    async update_crop_analytics_data(
        @Headers('authorization') auth_header: string,
        @Param('cropId') crop_id: string,
        @Body() crop_analytics_data_dto: CropAnalyticsDataDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropAnalyticsDataService.update_crop_analytics_data(
                crop_id, 
                crop_analytics_data_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':cropId')
    @SetMetadata('ApiResource', 'CropAnalyticsDataDTO')
    async delete_crop_analytics_data(
        @Headers('authorization') auth_header: string,
        @Param('cropId') crop_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropAnalyticsDataService.delete_crop_analytics_data(
                crop_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

}
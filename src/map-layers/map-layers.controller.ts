import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { MapLayersService } from 'src/map-layers/map-layers.service';
import { MapLayer } from 'src/map-layers/map-layers.entity';
import { MapLayerDTO, IdObject } from 'src/map-layers/map-layers.dto';
import { ReferenceLayerTypeEnum } from 'src/enums';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/mapLayers')
//@UseGuards(AuthorizationGuard)
export class MapLayersController {

    constructor(
        private mapLayersService: MapLayersService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'MapLayer')
    async get_map_layers_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('mapLayerType') map_layer_type?: ReferenceLayerTypeEnum,
        @Query('from_date') from_date?: string,
        @Query('to_date') to_date?: string
    ): Promise<MapLayer[]> {
        try {
            const result: QueryResult<MapLayer> = await this.mapLayersService.get_map_layers_by_query_parameters(
                organization_id, 
                map_layer_type, 
                from_date ? new Date(from_date) : new Date('2000-01-01 00:00:00z'), 
                to_date ? new Date(to_date) : new Date() 
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
    @SetMetadata('ApiResource', 'MapLayerDTO')
    async insert_map_layer(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() map_layer_dto: MapLayerDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.mapLayersService.insert_map_layer(
                organization_id, 
                map_layer_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':mapLayerId')
    @SetMetadata('ApiResource', 'MapLayer')
    async get_map_layer_by_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('mapLayerId') map_layer_id: string
    ): Promise<MapLayer> {
        try {
            const result: QueryResult<MapLayer> = await this.mapLayersService.get_map_layer_by_id(
                map_layer_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':mapLayerId')
    @SetMetadata('ApiResource', 'MapLayerDTO')
    async update_map_layer(
        @Headers('authorization') auth_header: string,
        @Param('mapLayerId') map_layer_id: string,
        @Body() map_layer_dto: MapLayerDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.mapLayersService.update_map_layer(
                map_layer_id, 
                map_layer_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':mapLayerId')
    @SetMetadata('ApiResource', 'MapLayerDTO')
    async delete_map_layer(
        @Headers('authorization') auth_header: string,
        @Param('mapLayerId') map_layer_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.mapLayersService.delete_map_layer(
                map_layer_id
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
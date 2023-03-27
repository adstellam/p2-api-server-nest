import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { MapLayerDTO } from 'src/map-layers/map-layers.dto';
import { ReferenceLayerTypeEnum, ReferenceLayerSourceFormatEnum } from 'src/enums';
import { Polygon } from 'geojson';

@Injectable()
export class MapLayersService {

    pgPool: Pool;

    constructor(
        private configService: ConfigService
    ) {
        this.pgPool = new Pool({
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: parseInt(this.configService.get<string>('POSTGRES_PORT')),
            database: this.configService.get<string>('POSTGRES_DATABASE'),
            user: this.configService.get<string>('POSTGRES_USER'),
            password:this.configService.get<string>('POSTGRES_PASSWORD')
        });
    }

    async get_map_layers_by_query_parameters(
        organization_id: string,
        map_layer_type: ReferenceLayerTypeEnum,
        from_date: Date, 
        to_date: Date
    ): Promise<QueryResult> {
        try {
            if (from_date) {
                const sql: string = 
                    "SELECT id, map_layer_name, map_layer_notes, organization_id, map_layer_type, map_layer_source_format, map_layer_source_date, map_layer_source, ST_AsGeojson(bounding_polygon), contained_field_names " +
                    "FROM stout.map_layers " +
                    "WHERE organization_id = $1 " +
                        "AND COALESCE(map_layer_type::text,'') LIKE $2 " +
                        "AND COALESCE(map_layer_source_date::timestamptz, current_timestamp) >= $3::timestamptz " +
                        "AND COALESCE(map_layer_source_date::timestamptz, current_timestamp) < $4::timestamptz";
                const val: (string | Date)[] = [
                    organization_id, 
                    map_layer_type ? ReferenceLayerTypeEnum[map_layer_type] : '%',
                    from_date,
                    to_date
                ];
                return await this.pgPool.query(sql, val);
            } else {
                const sql: string = 
                "SELECT * FROM stout.map_layers " +
                "WHERE organization_id = $1 " +
                    "AND COALESCE(map_layer_type::text,'') LIKE $2;";
                const val: (string | Date | boolean)[] = [
                    organization_id, 
                    map_layer_type ? ReferenceLayerTypeEnum[map_layer_type] : '%'
                ];
                return await this.pgPool.query(sql, val);
            }
        } catch(err) {
            if (err.code == '02000' || err.code == '02001') {
                const no_data_result: QueryResult = {
                    rows: [],
                    fields: [],
                    rowCount: null,
                    command: null,
                    oid: null
                };
                return no_data_result;
            } else {
                throw new DatabaseError(err.message, err.length, err.name);
            }
        }
    }
    
    async insert_map_layer(
        organization_id: string, 
        map_layer_dto: MapLayerDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.reference_layers ' +
                    '(cname, notes, organization_id, layer_type, source_format, source_date, vector_source, raster_source, bounding_polygon) ' +
                'VALUES ' +
                    "($1, $2::text[], $3::uuid, $4::adapt.reference_layer_type_enum, $5::adapt.reference_layer_source_format_enum, $6::date, $7::json, decode($8,'base64'), ST_GeomFromGeojson($9)) " +
                'RETURNING id';
            const val: (string | string[] | Date | ReferenceLayerTypeEnum | ReferenceLayerSourceFormatEnum | Blob)[] = [
                map_layer_dto.map_layer_name,
                map_layer_dto.notes,
                organization_id,
                map_layer_dto.map_layer_type,
                map_layer_dto.map_layer_source_format,
                map_layer_dto.map_layer_source_date, 
                map_layer_dto.vector_source,
                map_layer_dto.raster_source, 
                JSON.stringify(map_layer_dto.bounding_polygon)
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_map_layer_by_id(
        map_layer_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, map_layer_name, map_layer_notes, organization_id, map_layer_type, map_layer_source_format, map_layer_source_date, map_layer_source, ST_AsGeojson(bounding_polygon),  ' +
                'FROM stout.map_layers WHERE id = $1';
            const val: string[] = [
                map_layer_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_map_layer(
        map_layer_id: string, 
        map_layer_dto: MapLayerDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.reference_layers SET ' +
                    'cname = $2,' +
                    'notes = $3::text[],' +
                    'layer_type = $4::adapt.reference_layer_type_enum' +
                    'source_format = $5::adapt.reference_layer_source_format_enum,' +
                    'source_date = $6::date,' +
                    'vector_source = $7::json,' +
                    "raster_source = decode($8,'base64')" +
                    'bounding_polygon = ST_GeomFromGeojson($9) ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val: (string | string[] | Date)[] = [
                map_layer_id,
                map_layer_dto.map_layer_name,
                map_layer_dto.notes,
                map_layer_dto.map_layer_type,
                map_layer_dto.map_layer_source_format,
                map_layer_dto.map_layer_source_date, 
                map_layer_dto.vector_source,
                map_layer_dto.raster_source, 
                JSON.stringify(map_layer_dto.bounding_polygon)
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_map_layer(
        map_layer_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.reference_layers ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val: string[] = [
                map_layer_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { FieldBoundaryDTO, InteriorBoundaryAttributeRecord, HeadlandRecord, ContextItemRecord } from 'src/field-boundaries/field-boundaries.dto';

@Injectable()
export class FieldBoundariesService {

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

    async get_field_boundaries_by_query_parameters(
        organization_id: string, 
        field_id: string,
        field_name: string, 
        show_archived: boolean
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, organization_id, field_id, field_name, ST_AsGeojson(geom) AS geom, interior_boundary_attributes_json, headlands_json, archived, created, updated ' +
                'FROM stout.field_boundaries ' +
                'WHERE organization_id = $1 ' +
                    'AND field_id::text LIKE $2 ' +
                    'AND field_name LIKE $3 ' +
                    'AND (archived = $4::boolean OR archived = false)';
            const val: (string | Date | boolean)[] = [
                organization_id, 
                field_id ? field_id : '%',
                field_name ? field_name : '%',
                show_archived
            ];
            return await this.pgPool.query(sql, val);
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
    
    async insert_field_boundary(
        field_boundary_dto: FieldBoundaryDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.field_boundaries ' +
                    '(field_id, geom, original_epsg_code, archived, created) ' +
                'VALUES ' +
                    '($1::uuid, ST_GeomFromGeojson($2), $3, $4::boolean, $5::date) ' +
                'RETURNING id';
            const val: (string | number | boolean | Date)[] = [
                field_boundary_dto.field_id,
                JSON.stringify(field_boundary_dto.geom),
                field_boundary_dto.original_epsg_code,
                field_boundary_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_field_boundary_by_id(
        field_boundary_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, organization_id, field_id, field_name, ST_AsGeojson(geom) AS geom, interior_boundary_attributes_json, headlands_json, archived, created, updated ' +
                'FROM stout.field_boundaries ' +
                'WHERE id = $1:uuid';
            const val: string[] = [
                field_boundary_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_field_boundary(
        field_boundary_id: string, 
        field_boundary_dto: FieldBoundaryDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.field_boundaries SET ' +
                    'field_id = $2::uuid,' +
                    'geom = ST_GeomFromGeojson($3),' +
                    'original_epsg_code = $4,' +
                    'interior_boundary_attributes = array_append(interior_boundary_attributes, row($5, $6)),' +
                    'headlands = array_append(headlands, row($7, $8)),' +
                    'archived = $9::boolean,' +
                    'updated = $10::date ' +
                    'context_items = array_append(context_items, row($11, $12)) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | number | boolean | Date)[] = [
                field_boundary_id,
                field_boundary_dto.field_id,
                JSON.stringify(field_boundary_dto.geom),
                field_boundary_dto.original_epsg_code,
                field_boundary_dto.interior_boundary_attribute.attribute_key,
                field_boundary_dto.interior_boundary_attribute.attribute_value,
                field_boundary_dto.headland.headland_key,
                field_boundary_dto.headland.headland_value,
                field_boundary_dto.archived,
                new Date(),
                field_boundary_dto.context_item.context_key,
                field_boundary_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_field_boundary(
        field_boundary_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.field_boundaries ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                field_boundary_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}
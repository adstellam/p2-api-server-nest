import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { Field } from 'src/fields/fields.entity';
import { FieldDTO, ContextItemRecord } from 'src/fields/fields.dto';

@Injectable()
export class FieldsService {

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

    async get_fields_by_query_parameters(
        organization_id: string, 
        grower_name, 
        farm_name: string, 
        crop_name: string, 
        show_archived: boolean
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "SELECT * FROM stout.fields " +
                "WHERE organization_id = $1 " +
                    "AND COALESCE(grower_name, '') LIKE $2 " +
                    "AND COALESCE(farm_name, '') LIKE $3 " +
                    "AND COALESCE(crop_name, '') LIKE $4 " +
                    "AND (archived::boolean = $5 OR archived = false)";
            const val: (string | Date | boolean)[] = [
                organization_id, 
                grower_name ? grower_name : '%',
                farm_name ? farm_name : '%',
                crop_name ? crop_name : '%',
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
    
    async insert_field(
        field_dto: FieldDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.fields ' +
                    '(cname, farm_id, active_boundary_id, area_in_sq_meters, aspect, slope, slope_length, archived, created) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::uuid, $4::real, $5::real, $6::real, $7::real, $8::boolean, $9::date) ' +
                'RETURNING id';
            const val: (string | string[] | number | boolean | Date)[] = [
                field_dto.field_name,
                field_dto.farm_id,
                field_dto.active_boundary_id,
                field_dto.area_in_sq_meters,
                field_dto.aspect,
                field_dto.slope,
                field_dto.slope_length,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_field_by_id(
        field_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.fields WHERE id = $1::uuid';
            const val: string[] = [
                field_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_field(
        field_id: string, 
        field_dto: FieldDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.fields SET ' +
                    'cname = $2,' +
                    'farm_id = $3::uuid,' +
                    'active_boundary_id = $4::uuid,' +
                    'area_in_sq_meters = $5::real,' +
                    'aspect = $6::real,' +
                    'slope = $7::real,' +
                    'slope_length = $8::real,' +
                    'archived = $9::real,' +
                    'updated = $10::date,' +
                    'context_items = array_append(context_items, row($11, $12)) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | string[] | number | boolean | Date)[] = [
                field_id,
                field_dto.field_name,
                field_dto.farm_id,
                field_dto.active_boundary_id,
                field_dto.area_in_sq_meters,
                field_dto.aspect, 
                field_dto.slope,
                field_dto.slope_length,
                field_dto.archived,
                new Date(),
                field_dto.context_item.context_key,
                field_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_field(
        field_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.fields ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                field_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


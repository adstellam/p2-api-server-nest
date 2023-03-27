import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { StatusUpdateRecord, WorkOrderDTO } from 'src/work-orders/work-orders.dto';

@Injectable()
export class WorkOrdersService {

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

    async get_work_orders_by_query_parameters(
        organization_id: string, 
        grower_name, 
        crop_season: string, 
        field_name: string, 
        crop_name: string, 
        show_archived: boolean
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "SELECT * FROM stout.work_orders "+
                "WHERE organization_id = $1::uuid "+
                    "AND COALESCE(grower_name,'') LIKE $2 "+
                    "AND COALESCE(crop_season,'') LIKE $3 "+
                    "AND COALESCE(field_name,'') LIKE $4 "+
                    "AND COALESCE(crop_name,'') LIKE $5 "+
                    "AND (archived = $6::boolean OR archived = false)";
            const val: (string | boolean)[] = [
                organization_id, 
                grower_name ? grower_name : '%',
                crop_season ? crop_season : '%',
                field_name ? field_name : '%',
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
    
    async insert_work_order(
        organization_id: string, 
        work_order_dto: WorkOrderDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "INSERT INTO norma.work_orders " +
                    "(cname, work_order_version, organization_id, grower_id, crop_season, crop_code, field_id, archived, created) " +
                "VALUES " +
                    "($1, $2, $3::uuid, $4::uuid, $5, $6, $7::uuid, $8::boolean, $9::timestamptz) " +
                "RETURNING id";
            const val: (string | string[] | boolean | Date | StatusUpdateRecord[])[] = [
                work_order_dto.work_order_name,
                work_order_dto.work_order_version,
                organization_id,
                work_order_dto.grower_id,
                work_order_dto.crop_season,
                work_order_dto.crop_code, 
                work_order_dto.field_id, 
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_work_order_by_id(
        work_order_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "SELECT * FROM stout.work_orders WHERE id = $1::uuid";
            const val: string[] = [
                work_order_id
            ];
            return this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_work_order(
        organization_id: string,
        work_order_id: string, 
        work_order_dto: WorkOrderDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "UPDATE norma.work_orders SET "+
                    "cname = $2,"+
                    "work_order_version = $3,"+
                    "organization_id = $4::uuid,"+
                    "grower_id = $5::uuid,"+
                    "crop_season = $6,"+
                    "crop_code = $7,"+
                    "field_id = $8::uuid,"+
                    "status_updates = array_append(status_updates, row($9, $10::timestamptz)),"+
                    "archived = $11::boolean,"+
                    "updated = $12::timestamptz "+
                "WHERE id = $1::uuid "+
                "RETURNING id";
            const val: (string | string[] | boolean | Date)[] = [
                work_order_id,
                work_order_dto.work_order_name,
                work_order_dto.work_order_version,
                organization_id,
                work_order_dto.grower_id,
                work_order_dto.crop_season, 
                work_order_dto.crop_code, 
                work_order_dto.field_id,
                work_order_dto.status_update.representation,
                work_order_dto.status_update.ts,
                work_order_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_work_order(
        work_order_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "DELETE FROM norma.work_orders WHERE id = $1::uuid " +
                "RETURNING id";
            const val: string[] = [
                work_order_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}
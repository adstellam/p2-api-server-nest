import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';

@Injectable()
export class CropImagesService {

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

    async get_crop_images_by_query_parameters(
        organization_id: string, 
        machine_name: string,
        crop_zone_id: string, 
        field_id: string, 
        crop_code: string,
        image_capture_date: Date
    ): Promise<QueryResult> {
        try {
            if (image_capture_date) {
                const sql: string = 
                    "SELECT * FROM stout.crop_images " +
                    "WHERE organization_id = $1::uuid " +
                        "AND machine_name LIKE $2 " +
                        "AND COALESCE(crop_zone_id::text,'') LIKE $3 " +
                        "AND COALESCE(field_id::text,'') LIKE $4 " +
                        "AND COALESCE(crop_code,'') LIKE $5 " +
                        "AND image_ts >= $6::timestamptz AND image_ts < $7::timestamptz " +
                    "ORDER BY machine_id, field_id, image_ts";
                const val: (string | Date)[] = [
                    organization_id,
                    machine_name ? machine_name : '%', 
                    crop_zone_id ? crop_zone_id : '%',
                    field_id ? field_id : '%',
                    crop_code ? crop_code : '%',
                    image_capture_date,
                    new Date(image_capture_date.setDate(image_capture_date.getDate() + 1))
                ];
                return await this.pgPool.query(sql, val);
            } else {
                const sql: string = 
                    "SELECT * FROM stout.crop_images " +
                    "WHERE organization_id = $1::uuid " +
                        "AND machine_name LIKE $2 " +
                        "AND COALESCE(crop_zone_id::text,'') LIKE $3 " +
                        "AND COALESCE(field_id::text,'') LIKE $4 " +
                        "AND COALESCE(crop_code,'') LIKE $5";
                const val: string[] = [
                    organization_id,
                    machine_name ? machine_name : '%', 
                    crop_zone_id ? crop_zone_id : '%',
                    field_id ? field_id : '%',
                    crop_code ? crop_code : '%'
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

    async get_crop_image_by_id(crop_image_id: string): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.crop_images WHERE id = $1::uuid';
            const val: string[] = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_crop_image_blob(crop_image_id: string): Promise<QueryResult> {
        try {
            const sql: string = 
                `SELECT image_binary FROM stout.crop_images WHERE id = $1::uuid`;
            const val: string[] = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_crop_image_annotations(crop_image_id: string): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT image_annotations FROM stout.crop_images WHERE id = $1::uuid';
            const val: string[] = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_crop_image(crop_image_id: string): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.crop_images ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                crop_image_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { Farm } from 'src/farms/farms.entity';
import { FarmDTO, ContextItemRecord } from 'src/farms/farms.dto';

@Injectable()
export class FarmsService {

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

    async get_all_farms(
        organization_id: string, 
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, farm_name, organization_id, grower_name, permitee, permit_number, ST_AsGeojson(bounding_region) AS bounding_region, field_names ' +
                'FROM stout.farms ' +
                'WHERE organization_id = $1';
            const val: string[] = [
                organization_id
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
    
    async insert_farm(
        organization_id: string,
        farm_dto: FarmDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.farms ' +
                    '(cname, organization_id, grower_id, permitee, permit_number, bounding_region) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::uuid, $4, $5, ST_GeomFromGeojson($6)) ' +
                'RETURNING id';
            const val: (string | ContextItemRecord[])[] = [
                farm_dto.farm_name,
                organization_id,
                farm_dto.grower_id,
                farm_dto.permitee,
                farm_dto.permit_number,
                JSON.stringify(farm_dto.bounding_region)
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_farm_by_id(
        farm_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, farm_name, organization_id, grower_name, permitee, permit_number, ST_AsGeojson(bounding_region) AS bounding_region, field_names ' +
                'FROM stout.farms WHERE id = $1::uuid';
            const val: string[] = [
                farm_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_farm(
        farm_id: string, 
        farm_dto: FarmDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.farms SET ' +
                    'cname = $2,' +
                    'grower_id = $3,' +
                    'permitee = $4,' +
                    'permit_number = $5,' +
                    'bounding_region = ST_GeomFromGeojson($6) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | ContextItemRecord[])[] = [
                farm_id,
                farm_dto.farm_name,
                farm_dto.grower_id,
                farm_dto.permitee,
                farm_dto.permit_number,
                JSON.stringify(farm_dto.bounding_region)
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_farm(
        farm_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.farms ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                farm_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }    

}

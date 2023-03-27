import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { CropAnalyticsDataDTO } from 'src/crop-analytics-data/crop-analytics-data.dto';
import { SeedTypeEnum } from 'src/enums';
import { IrrigationRecord, CultivationRecord, ApplicationRecord, CropMeasureRecord } from "./crop-analytics-data.entity";

@Injectable()
export class CropAnalyticsDataService {

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

    async get_crop_analytics_data_by_query_parameters(
        organization_id: string, 
        grower_id: string, 
        crop_season: string, 
        crop_zone_id: string,
        crop_name: string,
        field_id: string, 
        seed_type: SeedTypeEnum,
        wet_date: Date
    ): Promise<QueryResult> {
        try {
            if (wet_date) {
                const sql: string = 
                    "SELECT * FROM stout.crop_analytics_data " +
                    "WHERE organization_id = $1::uuid " +
                        "AND COALESCE(grower_id::text,'') LIKE $2 " +
                        "AND COALESCE(crop_season,'') LIKE $3 " +
                        "AND COALESCE(crop_zone_id::text,'') LIKE $4 " +
                        "AND COALESCE(crop_name,'') LIKE $5 " +
                        "AND COALESCE(seed_type::text,'') LIKE $6 " +
                        "AND COALESCE(wet_date,'') = $7::date";
                const val: (string | Date)[] = [
                    organization_id, 
                    grower_id ? grower_id : '%',
                    crop_season ? crop_season : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    crop_name ? crop_name : '%',
                    seed_type ? SeedTypeEnum[seed_type] : '%',
                    wet_date
                ];
                return await this.pgPool.query(sql, val);
            } else {
                const sql: string = 
                "SELECT * FROM stout.crop_analytics_data " +
                "WHERE organization_id = $1 " +
                    "AND COALESCE(grower_id::text,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(crop_zone_id::text,'') LIKE $4 " +
                    "AND COALESCE(crop_name,'') LIKE $5 " +
                    "AND COALESCE(seed_type::text,'') LIKE $6";
                const val: string[] = [
                    organization_id, 
                    grower_id ? grower_id : '%',
                    crop_season ? crop_season : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    crop_name ? crop_name : '%',
                    seed_type ? SeedTypeEnum[seed_type] : '%'
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

    async get_crop_analytics_data_by_crop_id(
        crop_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.crop_analytics_data WHERE id = $1';
            const val: string[] = [
                crop_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_crop_analytics_data(
        crop_id: string, 
        crop_analytics_data_dto: CropAnalyticsDataDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.crop_analytics_data SET ' +
                    'crop_id = $2'
                    'grower_id = $3::uuid,' +
                    'crop_season = $4,' +
                    'crop_zone_id = $5::uuid,' +
                    'crop_code = $6,' +
                    'crop_position = ST_GeomFromGeojson($7),' +
                    'irrigation_records = array_append(irrigation_records, row($8, $9::int, $10::real, $11::timestamptz)),' +
                    'cultivation_records = array_append(cultivation_records, row($12, $13::int, $14::timestamptz)),' +
                    'application_records = array_append(application_records, row($15, $16::uuid, $17::timestamptz)),' +
                    'crop_measure_records = array_append(crop_measure_records, row($18::int, $19::int, $20::timestamptz)),' +
                    'insect_infestation_records = array_append(insect_infestation_records, row($21, $22, $23::int, $24::timestamptz)),' +
                    'fungal_infestation_records = array_append(fungal_infestation_records, row($25, $26, $27::int, $28::timestamptz)),' +
                    'viral_infestation_records = array_append(viral_infestation_records, row($29, $30, $31::int, $32::timestamptz)),' +
                    'reject_date = $33::date,' +
                    'harvest_date = $34::date' +
                'WHERE crop_id = $1 ' +
                'RETURNING id';
            const val: (string | string[] | Date | SeedTypeEnum)[] = [
                crop_id,
                crop_analytics_data_dto.crop_id,
                crop_analytics_data_dto.grower_id,
                crop_analytics_data_dto.crop_season,
                crop_analytics_data_dto.crop_zone_id,
                crop_analytics_data_dto.crop_code,
                JSON.stringify(crop_analytics_data_dto.crop_position),
                crop_analytics_data_dto.irrigation_record.method,
                crop_analytics_data_dto.irrigation_record.duration_in_seconds,
                crop_analytics_data_dto.irrigation_record.flow_rate,
                crop_analytics_data_dto.irrigation_record.ts,
                crop_analytics_data_dto.cultivation_record.method,
                crop_analytics_data_dto.cultivation_record.depth_in_cm,
                crop_analytics_data_dto.cultivation_record.ts,
                crop_analytics_data_dto.application_record.method,
                crop_analytics_data_dto.application_record.prescription_id,
                crop_analytics_data_dto.application_record.ts,
                crop_analytics_data_dto.crop_measure_record.diameter_in_cm,
                crop_analytics_data_dto.crop_measure_record.height_in_cm,
                crop_analytics_data_dto.crop_measure_record.ts,
                crop_analytics_data_dto.insect_infestation_record.insect_type,
                crop_analytics_data_dto.insect_infestation_record.severity,
                crop_analytics_data_dto.insect_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.insect_infestation_record.ts,
                crop_analytics_data_dto.fungal_infestation_record.fungus_type,
                crop_analytics_data_dto.fungal_infestation_record.severity,
                crop_analytics_data_dto.fungal_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.viral_infestation_record.virus_type,
                crop_analytics_data_dto.viral_infestation_record.severity,
                crop_analytics_data_dto.viral_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.viral_infestation_record.ts,
                crop_analytics_data_dto.reject_date,
                crop_analytics_data_dto.harvest_date
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_crop_analytics_data(crop_id: string): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.crop_analytics_data ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val: string[] = [
                crop_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


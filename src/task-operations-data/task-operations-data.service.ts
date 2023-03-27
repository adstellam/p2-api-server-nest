import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { Point, LineString, Polygon, MultiPolygon } from 'geojson';
import { TaskOperationsData } from 'src/task-operations-data/task-operations-data.entity';
import { TaskOperationsDataDTO, SpatialRecord, DataLogTriggerRecord, ContextItemRecord } from 'src/task-operations-data/task-operations-data.dto';
import { LoggingLevelEnum, LoggingMethodEnum } from 'src/enums';

@Injectable()
export class TaskOperationsDataService {

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

    async get_task_operations_data_by_query_parameters(
        organization_id: string,
        job_id: string,
        job_name: string, 
        task_id: string,
        task_name: string,
        crop_season: string, 
        field_name: string, 
        machine_name: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "SELECT * FROM stout.task_operations_data " +
                "WHERE organization_id = $1 " +
                    "AND COALESCE(job_id::text,'') LIKE $2 " +
                    "AND COALESCE(job_name,'') LIKE $3 " +
                    "AND task_id::text LIKE $4 " +
                    "AND COALESCE(task_name,'') LIKE $5 " +
                    "AND COALESCE(crop_season,'') LIKE $6 " +
                    "AND COALESCE(field_name,'') LIKE $7 " +
                    "AND COALESCE(machine_name,'') LIKE $8";
            const val: (string | Date | boolean)[] = [
                organization_id,
                job_id ? job_id : '%',
                job_name ? job_name : '%',
                task_id ? task_id : '%',
                task_name ? task_name : '%',
                crop_season ? crop_season : '%',
                field_name ? field_name : '%',
                machine_name ? machine_name : '%'
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_task_operations_data_by_id(
        task_operations_data_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.task_operations_data ' +
                'WHERE id = $1::uuid';
            const val: string[] = [
                task_operations_data_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async patch_task_operations_data(
        task_operations_data_id: string, 
        task_operations_data_dto: TaskOperationsDataDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.operation_data SET ' +
                    'work_item_operation_id = $2::uuid' +
                    'spatial_records = array_apend(spatial_records, row($3, st_geomfromgeojson($4), $5::timestamptz)),' +
                    'data_log_trigger_record = row($6::adapt.logging_level_enum, $7::adapt.logging_method_enum, $8::real, $9::real, $10::real, $11::real, $12::real, $13),' +
                    'coincident_operation_data_id::uuid = $14,' +
                    'max_depth = $15::real,' +
                    'variety_locator_id = $16,' +
                    'context_items = array_append(context_items, row($17, $18))' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | string[] | number | Point | LineString | Polygon | MultiPolygon | Date | LoggingLevelEnum | LoggingMethodEnum )[] = [
                task_operations_data_id,
                task_operations_data_dto.task_id,
                task_operations_data_dto.spatial_record.representation,
                JSON.stringify(task_operations_data_dto.spatial_record.shape),
                task_operations_data_dto.spatial_record.ts,
                task_operations_data_dto.data_log_trigger_record.logging_level,
                task_operations_data_dto.data_log_trigger_record.data_log_method,
                task_operations_data_dto.data_log_trigger_record.data_log_time_interval,
                task_operations_data_dto.data_log_trigger_record.data_log_distance_interval,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_change,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_maximum,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_minimum,
                task_operations_data_dto.data_log_trigger_record.representation,
                task_operations_data_dto.coincident_task_operations_data_ids,
                task_operations_data_dto.max_depth,
                task_operations_data_dto.variety_locator_id,
                task_operations_data_dto.context_item.context_key,
                task_operations_data_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';

@Injectable()
export class MachineUsesService {

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

    async get_machine_uses_by_query_parameters(
        organization_id: string, 
        machine_id: string,
        machine_name: string, 
        from_time: Date, 
        to_time: Date
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, task_operations_data_id, task_id, task_name, machine_id, machine_name, travel_distance_meter, work_distance_meter, elapsed_time_seconds, work_time_seconds, crop_count, crop_counts_by_diameter, crop_counts_by_score, lens_working_dist_meter, plant_line_count, width_meter, line_spacing_meter, plant_spacing_meter, max_side_shift_travel_meter, start_time, end_time ' +
                'FROM stout.machine_uses ' +
                'WHERE organization_id = $1 ' +
                    'AND machine_id::text LIKE $2 ' +
                    'AND machine_name LIKE $3 ' +
                'ORDER BY machine_name, start_time';
            const val: (string | Date)[] = [
                organization_id, 
                machine_id ? machine_id : '%',
                machine_name ? machine_name : '%'
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

    async get_machine_uses_by_id(
        organization_id: string, 
        machine_use_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT id, task_operations_data_id, task_id, task_name, machine_id, machine_name, travel_distance_meter, work_distance_meter, elapsed_time_seconds, work_time_seconds, crop_count, crop_counts_by_diameter, crop_counts_by_score, lens_working_dist_meter, plant_line_count, width_meter, line_spacing_meter, plant_spacing_meter, max_side_shift_travel_meter, start_time, end_time ' +
                'FROM stout.machine_uses ' +
                'WHERE organization_id = $1::uuid AND id = $2::uuid ';
            const val: string[] = [
                organization_id, 
                machine_use_id
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
    
}
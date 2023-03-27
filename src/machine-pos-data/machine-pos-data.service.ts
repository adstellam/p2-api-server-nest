import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';

@Injectable()
export class MachinePosDataService {

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

    async get_machine_pos_data(
        organization_id: string, 
        machine_id: string, 
        from_time: Date, 
        to_time: Date
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT machine_id, machine_name, ts, st_asgeojson(position) FROM stout.machine_pos_data ' +
                'WHERE organization_id = $1 ' +
                    'AND machine_id = $2 ' +
                    'AND ts > $3::timestamptz ' +
                    'AND ts < $4::timestamptz ' +
                'ORDER BY ts';
            const val: (string | Date | boolean)[] = [
                organization_id, 
                machine_id,
                from_time,
                to_time
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
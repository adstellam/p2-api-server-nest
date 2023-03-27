import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
export declare class MachinePosDataService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_machine_pos_data(organization_id: string, machine_id: string, from_time: Date, to_time: Date): Promise<QueryResult>;
}

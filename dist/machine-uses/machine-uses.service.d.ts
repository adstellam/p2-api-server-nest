import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
export declare class MachineUsesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_machine_uses_by_query_parameters(organization_id: string, machine_id: string, machine_name: string, from_time: Date, to_time: Date): Promise<QueryResult>;
    get_machine_uses_by_id(organization_id: string, machine_use_id: string): Promise<QueryResult>;
}

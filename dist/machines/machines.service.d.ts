import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { MachineDTO } from 'src/machines/machines.dto';
export declare class MachinesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_machines_by_query_parameters(organization_id: string, machine_classification: string, machine_model: string, machine_series: string, show_archived: boolean): Promise<QueryResult>;
    insert_machine(organization_id: string, machine_dto: MachineDTO): Promise<QueryResult>;
    get_machine_by_id(machine_id: string): Promise<QueryResult>;
    update_machine(machine_id: string, machine_dto: MachineDTO): Promise<QueryResult>;
    delete_machine(machine_id: string): Promise<QueryResult>;
}

import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { FarmDTO } from 'src/farms/farms.dto';
export declare class FarmsService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_all_farms(organization_id: string): Promise<QueryResult>;
    insert_farm(organization_id: string, farm_dto: FarmDTO): Promise<QueryResult>;
    get_farm_by_id(farm_id: string): Promise<QueryResult>;
    update_farm(farm_id: string, farm_dto: FarmDTO): Promise<QueryResult>;
    delete_farm(farm_id: string): Promise<QueryResult>;
}

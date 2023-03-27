import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
export declare class UserInfoService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_user_info(username: string): Promise<QueryResult>;
}

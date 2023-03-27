import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { UserDTO } from 'src/users/users.dto';
export declare class UsersService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_users_by_query_parameters(organization_id: string, role: string, affiliated_entity: string): Promise<QueryResult>;
    insert_user(organization_id: string, user_dto: UserDTO): Promise<QueryResult>;
    get_user_by_username(organization_id: string, username: string): Promise<QueryResult>;
    update_user(user_id: string, user_dto: UserDTO): Promise<QueryResult>;
    delete_user(user_id: string): Promise<QueryResult>;
}

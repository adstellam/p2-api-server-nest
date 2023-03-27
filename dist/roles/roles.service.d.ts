import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { RoleDTO } from 'src/roles/roles.dto';
export declare class RolesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_roles_by_organization_id(organization_id: string): Promise<QueryResult>;
    insert_role(organization_id: string, role_dto: RoleDTO): Promise<QueryResult>;
    get_role_by_rolename(organization_id: string, rolename: string): Promise<QueryResult>;
    update_role(role_id: string, role_dto: RoleDTO): Promise<QueryResult>;
    delete_role(role_id: string): Promise<QueryResult>;
}

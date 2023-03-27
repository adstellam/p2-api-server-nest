import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.entity';
import { RoleDTO, IdObject } from 'src/roles/roles.dto';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    get_roles_by_organization_id(auth_header: string, organization_id: string): Promise<Role[]>;
    insert_role(auth_header: string, organization_id: string, role_dto: RoleDTO): Promise<IdObject>;
    get_role_by_rolename(auth_header: string, organization_id: string, rolename: string): Promise<Role>;
    update_role(auth_header: string, role_id: string, role_dto: RoleDTO): Promise<IdObject>;
    delete_role(auth_header: string, role_id: string): Promise<IdObject>;
}

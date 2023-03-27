import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { UserDTO, IdObject } from 'src/users/users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    get_users_by_query_parameters(auth_header: string, organization_id: string, role?: string, affiliated_entity?: string): Promise<User[]>;
    insert_user(auth_header: string, organization_id: string, user_dto: UserDTO): Promise<IdObject>;
    get_user_by_username(auth_header: string, organization_id: string, username: string): Promise<User>;
    update_user(auth_header: string, user_id: string, user_dto: UserDTO): Promise<IdObject>;
    delete_user(auth_header: string, user_id: string): Promise<IdObject>;
}

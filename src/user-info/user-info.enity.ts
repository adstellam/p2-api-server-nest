import { Permissions } from 'src/users/users.entity';

export class UserInfo {
    username: string;
    organization_id: string;
    role_names: string[];
    user_permissions_list: Permissions[];
};
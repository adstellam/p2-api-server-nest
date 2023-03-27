import { HttpMethodEnum } from 'src/enums';

export type Permissions = {
    [index: string]: HttpMethodEnum[]
};

export class User {
    id: string;
    username: string;
    organization_id: string;
    role_ids: string[];
    role_names: string[];
    permissions_list: Permissions[];
    last_name: string;
    first_name: string;
    affiliated_entity: string;
    job_title: string;
    created: Date;
    updated: Date;
}

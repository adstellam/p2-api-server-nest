import { HttpMethodEnum } from 'src/enums';

export class Role {
    id: string;
    rolename: string;
    organization_name: string;
    permissions: { [index: string]: HttpMethodEnum[] };
    created: Date;
    updated: Date;
}; 
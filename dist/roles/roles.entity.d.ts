import { HttpMethodEnum } from 'src/enums';
export declare class Role {
    id: string;
    rolename: string;
    organization_name: string;
    permissions: {
        [index: string]: HttpMethodEnum[];
    };
    created: Date;
    updated: Date;
}

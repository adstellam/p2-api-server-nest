import { HttpMethodEnum } from 'src/enums';
export declare class IdObject {
    id: string;
}
export declare class RoleDTO {
    rolename: string;
    permissions: {
        [index: string]: HttpMethodEnum[];
    };
}

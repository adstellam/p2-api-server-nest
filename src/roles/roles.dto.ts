import { HttpMethodEnum, ApiResourceEnum } from 'src/enums';

export class IdObject {
    id: string;
};

export class RoleDTO {
    rolename: string;
    permissions: { [index: string]: HttpMethodEnum[] };
}; 
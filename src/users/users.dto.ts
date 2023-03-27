export class IdObject {
    id: string;
};

export class UserDTO {
    username: string;
    role_ids: string[];
    affiliated_entity: string;
    last_name?: string;
    first_name?: string;
    job_title?: string;
};

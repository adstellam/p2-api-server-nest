import { FieldsService } from 'src/fields/fields.service';
import { Field } from 'src/fields/fields.entity';
import { FieldDTO, IdObject } from 'src/fields/fields.dto';
export declare class FieldsController {
    private fieldsService;
    constructor(fieldsService: FieldsService);
    get_fields_by_query_parameters(auth_header: string, organization_id: string, grower_name?: string, field_name?: string, crop_name?: string, show_archived?: string): Promise<Field[]>;
    insert_field(auth_header: string, field_dto: FieldDTO): Promise<IdObject>;
    get_field_by_id(auth_header: string, field_id: string): Promise<Field>;
    update_field(auth_header: string, field_id: string, field_dto: FieldDTO): Promise<IdObject>;
    delete_field(auth_header: string, field_id: string): Promise<IdObject>;
}

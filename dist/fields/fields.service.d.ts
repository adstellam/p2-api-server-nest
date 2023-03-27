import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { FieldDTO } from 'src/fields/fields.dto';
export declare class FieldsService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_fields_by_query_parameters(organization_id: string, grower_name: any, farm_name: string, crop_name: string, show_archived: boolean): Promise<QueryResult>;
    insert_field(field_dto: FieldDTO): Promise<QueryResult>;
    get_field_by_id(field_id: string): Promise<QueryResult>;
    update_field(field_id: string, field_dto: FieldDTO): Promise<QueryResult>;
    delete_field(field_id: string): Promise<QueryResult>;
}

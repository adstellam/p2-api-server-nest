import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { FieldBoundaryDTO } from 'src/field-boundaries/field-boundaries.dto';
export declare class FieldBoundariesService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_field_boundaries_by_query_parameters(organization_id: string, field_id: string, field_name: string, show_archived: boolean): Promise<QueryResult>;
    insert_field_boundary(field_boundary_dto: FieldBoundaryDTO): Promise<QueryResult>;
    get_field_boundary_by_id(field_boundary_id: string): Promise<QueryResult>;
    update_field_boundary(field_boundary_id: string, field_boundary_dto: FieldBoundaryDTO): Promise<QueryResult>;
    delete_field_boundary(field_boundary_id: string): Promise<QueryResult>;
}

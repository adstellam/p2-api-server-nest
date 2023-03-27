import { FieldBoundariesService } from 'src/field-boundaries/field-boundaries.service';
import { FieldBoundary } from 'src/field-boundaries/field-boundaries.entity';
import { FieldBoundaryDTO, IdObject } from 'src/field-boundaries/field-boundaries.dto';
export declare class FieldBoundariesController {
    private fieldBoundariesService;
    constructor(fieldBoundariesService: FieldBoundariesService);
    get_field_boundaries_by_query_parameters(auth_header: string, organization_id: string, field_id: string, field_name: string, show_archived?: string): Promise<FieldBoundary[]>;
    insert_field_boundary(auth_header: string, field_boundary_dto: FieldBoundaryDTO): Promise<IdObject>;
    get_field_boundary_by_id(auth_header: string, field_boundary_id: string): Promise<FieldBoundary>;
    update_field_boundary(auth_header: string, field_boundary_id: string, field_boundary_dto: FieldBoundaryDTO): Promise<IdObject>;
    delete_field_boundary(auth_header: string, field_boundary_id: string): Promise<IdObject>;
}

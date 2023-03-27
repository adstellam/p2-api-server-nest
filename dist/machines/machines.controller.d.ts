import { MachinesService } from 'src/machines/machines.service';
import { Machine } from 'src/machines/machines.entity';
import { MachineDTO, IdObject } from 'src/machines/machines.dto';
export declare class MachinesController {
    private machinesService;
    constructor(machinesService: MachinesService);
    get_machines_by_query_parameters(auth_header: string, organization_id: string, machine_classification?: "cultivator" | "Sprayer", machine_model?: string, machine_series?: string, show_archived?: string): Promise<Machine[]>;
    insert_machine(auth_header: string, organization_id: string, machine_dto: MachineDTO): Promise<IdObject>;
    get_machine_by_id(auth_header: string, organization_id: string, machine_id: string): Promise<Machine>;
    update_machine(auth_header: string, machine_id: string, machine_dto: MachineDTO): Promise<IdObject>;
    delete_machine(auth_header: string, machine_id: string): Promise<IdObject>;
}

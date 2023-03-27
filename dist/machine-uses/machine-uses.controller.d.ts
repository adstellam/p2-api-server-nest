import { MachineUsesService } from 'src/machine-uses/machine-uses.service';
import { MachineUse } from './machine-uses.entity';
export declare class MachineUsesController {
    private machineUsesService;
    constructor(machineUsesService: MachineUsesService);
    get_machine_uses_by_query_parameters(auth_header: string, organization_id: string, machine_id: string, machine_name: string, from_time: string, to_time?: string): Promise<MachineUse[]>;
    get_machine_uses_by_id(auth_header: string, organization_id: string, machine_use_id: string): Promise<MachineUse>;
}

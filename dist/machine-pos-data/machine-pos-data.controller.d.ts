import { MachinePosDataService } from 'src/machine-pos-data/machine-pos-data.service';
import { MachinePosData } from './machine-pos-data.entity';
export declare class MachinePosDataController {
    private machinePosDataService;
    constructor(machinePosDataService: MachinePosDataService);
    get_machine_pos_data_by_query_parameters(auth_header: string, organization_id: string, machine_id: string, from_time: string, to_time?: string): Promise<MachinePosData[]>;
}

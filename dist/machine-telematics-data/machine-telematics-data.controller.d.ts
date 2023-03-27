import { MachineTelematicsDataService } from 'src/machine-telematics-data/machine-telematics-data.service';
import { MachineTelematicsData } from './machine-telematics-data.entity';
export declare class MachineTelematicsDataController {
    private machineTelematicsDataService;
    constructor(machineTelematicsDataService: MachineTelematicsDataService);
    get_machine_telematics_data_by_query_parameters(auth_header: string, organization_id: string, machine_id: string, from_time: string, to_time?: string): Promise<MachineTelematicsData[]>;
}

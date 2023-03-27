import { DeviceElementTypeEnum } from "src/enums";
export declare class ContextItemRecord {
    context_key: string;
    context_value: string;
}
export declare class IdObject {
    id: string;
}
export declare class MachineDTO {
    machine_name: string;
    brand_id: string;
    machine_type: DeviceElementTypeEnum;
    machine_classification?: string;
    machine_model?: string;
    series?: number;
    serial_number?: string;
    active_configuration_id?: string;
    inet_domain_name?: string;
    parent_device_id?: string;
    archived: boolean;
}

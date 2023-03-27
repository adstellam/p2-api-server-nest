export declare class Machine {
    id: string;
    machine_name: string;
    organization_id: string;
    machine_classification: "Cultivator" | "Sprayer";
    machine_model: string;
    machine_series: number;
    machine_serial_number: string;
    active_configuration_json: string;
    inet_domain_name: string;
    archived: boolean;
    created: Date;
    updated: Date;
}

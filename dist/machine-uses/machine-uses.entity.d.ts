export declare class MachineUse {
    id: string;
    machine_id: string;
    machine_name: string;
    task_operations_data_id: string;
    task_id: string;
    task_name: string;
    travel_distance_meter: number;
    work_distance_meter: number;
    elapsed_time_seconds: number;
    work_time_seconds: number;
    crop_count: number;
    crop_counts_by_diameter: number[];
    crop_counts_by_score: number[];
    lens_working_dist_meter: number;
    plant_line_count: number;
    width_meter: number;
    line_spacing_meter: number;
    plant_spacing_meter: number;
    max_side_shift_travel_meter: number;
    start_time: Date;
    end_time: Date;
}

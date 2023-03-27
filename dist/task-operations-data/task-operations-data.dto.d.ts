import { Point, LineString, Polygon, MultiPolygon } from 'geojson';
import { LoggingLevelEnum, LoggingMethodEnum } from 'src/enums';
export declare class SpatialRecord {
    representation: string;
    shape: Point | LineString | Polygon | MultiPolygon;
    ts: Date;
}
export declare class DataLogTriggerRecord {
    logging_level: LoggingLevelEnum;
    data_log_method: LoggingMethodEnum;
    data_log_time_interval: number;
    data_log_distance_interval: number;
    data_log_threshold_change: number;
    data_log_threshold_maximum: number;
    data_log_threshold_minimum: number;
    representation: string;
}
export declare class ContextItemRecord {
    context_key: string;
    context_value: string;
}
export declare class IdObject {
    id: string;
}
export declare class TaskOperationsDataDTO {
    task_id: string;
    spatial_record?: SpatialRecord;
    data_log_trigger_record?: DataLogTriggerRecord;
    coincident_task_operations_data_ids?: string[];
    max_depth?: number;
    variety_locator_id?: string;
    context_item?: ContextItemRecord;
}

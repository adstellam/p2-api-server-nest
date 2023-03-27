import { Point } from "geojson";
import { SeedTypeEnum } from "src/enums";
import { IrrigationRecord, CultivationRecord, ApplicationRecord, CropMeasureRecord, InsectInfestationRecord, FungalInfestationRecord, ViralInfestationRecord } from "./crop-analytics-data.entity";

export class IdObject {
    id: string;
}; 

export class CropAnalyticsDataDTO {
    crop_id: string;
    grower_id: string;
    crop_season: string;
    crop_zone_id: string;
    crop_code: string;
    crop_position: Point;
    irrigation_record?: IrrigationRecord;
    cultivation_record?: CultivationRecord;
    application_record?: ApplicationRecord;
    crop_measure_record?: CropMeasureRecord;
    insect_infestation_record?: InsectInfestationRecord;
    fungal_infestation_record?: FungalInfestationRecord;
    viral_infestation_record?: ViralInfestationRecord;
    reject_date?: Date;
    harvest_date?: Date;
};
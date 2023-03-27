import { Position } from "geojson";
import { SeedTypeEnum } from "src/enums";

export interface IrrigationRecord {
    method: string;
    duration_in_seconds: number;
    flow_rate: number;
    ts: Date;
};

export interface CultivationRecord {
    method: string;
    depth_in_cm: number;
    ts: Date;
};

export interface ApplicationRecord {
    method: string;
    prescription_id: string;
    ts: Date;
};

export interface CropMeasureRecord {
    diameter_in_cm: number;
    height_in_cm: number;
    ts: Date;
};

export interface InsectInfestationRecord {
    insect_type: string;
    severity: string;
    infected_area_percentage: number;
    ts: Date;
};

export interface FungalInfestationRecord {
    fungus_type: string;
    severity: string;
    infected_area_percentage: number;
    ts: Date;
};

export interface ViralInfestationRecord {
    virus_type: string;
    severity: string;
    infected_area_percentage: number;
    ts: Date;
};

export class CropAnalyticsData {
    crop_id: string;
    organization_id: string;
    grower_id: string;
    grower_name: string;
    crop_season: string;
    crop_zone_id: string;
    crop_zone_name: string;
    crop_name: string;
    field_name: string;
    seed_type: SeedTypeEnum;
    wet_date: Date;
    crop_position: Position;
    irrigation_records_json: string;
    cultivation_records_json: string;
    application_records_json: string;
    crop_measure_records_json: string;
    insect_infestation_records_json: string;
    fungal_infestation_records_json: string;
    viral_infestation_records_json: string;
    reject_date: Date;
    harvest_date: Date;
};
export class CropImage {
    id: string;
    organization_id: string;
    crop_id: string;
    machine_name: string;
    camera_id?: number;
    crop_zone_id: string;
    crop_zone_name: string;
    field_id: string;
    crop_code: string;
    wet_date: Date;
    image_binary?: string; 
    image_annotations?: string;
    image_ts: Date;
}

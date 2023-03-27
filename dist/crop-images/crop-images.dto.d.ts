export declare class IdObject {
    id: string;
}
export declare class CropImageDTO {
    organization_id: string;
    crop_id: string;
    machine_name: string;
    camera_id?: number;
    image_binary?: string;
    image_annotations?: string;
    image_ts: Date;
}

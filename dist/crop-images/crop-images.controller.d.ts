import { CropImagesService } from 'src/crop-images/crop-images.service';
import { CropImage } from 'src/crop-images/crop-images.entity';
import { IdObject } from 'src/crop-images/crop-images.dto';
export declare class CropImagesController {
    private cropImagesService;
    constructor(cropImagesService: CropImagesService);
    get_crop_images_by_query_parameters(auth_header: string, organization_id: string, machine_id?: string, crop_zone_id?: string, field_id?: string, crop_code?: string, image_capture_date?: string): Promise<CropImage[]>;
    get_crop_image_by_id(auth_header: string, organization_id: string, crop_image_id: string): Promise<CropImage>;
    get_crop_image_blob(auth_header: string, organization_id: string, crop_image_id: string): Promise<string>;
    get_crop_image_annotations(auth_header: string, organization_id: string, crop_image_id: string): Promise<string>;
    delete_crop_image(auth_header: string, crop_image_id: string): Promise<IdObject>;
}

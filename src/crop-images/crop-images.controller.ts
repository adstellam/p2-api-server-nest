import { Controller, Param, Query, Headers, Get, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { CropImagesService } from 'src/crop-images/crop-images.service';
import { CropImage } from 'src/crop-images/crop-images.entity';
import { CropImageDTO, IdObject } from 'src/crop-images/crop-images.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/cropImages')
//@UseGuards(AuthorizationGuard)
export class CropImagesController {

    constructor(
        private cropImagesService: CropImagesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'CropImage')
    async get_crop_images_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('machineId') machine_id?: string,
        @Query('cropZoneId') crop_zone_id?: string,
        @Query('fieldId') field_id?: string,
        @Query('cropCode') crop_code?: string,
        @Query('imageCaptureDate') image_capture_date?: string
    ): Promise<CropImage[]> {
        try {
            const result: QueryResult<CropImage> = await this.cropImagesService.get_crop_images_by_query_parameters(
                organization_id, 
                machine_id,
                crop_zone_id, 
                field_id, 
                crop_code,
                image_capture_date ? new Date(image_capture_date) : null, 
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':cropImageId')
    @SetMetadata('ApiResource', 'CropImage')
    async get_crop_image_by_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('cropImageId') crop_image_id: string
    ): Promise<CropImage> {
        try {
            const result: QueryResult<CropImage> = await this.cropImagesService.get_crop_image_by_id(
                crop_image_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }    

    @Get(':cropImageId/blob')
    @SetMetadata('ApiResource', 'CropImage')
    async get_crop_image_blob (
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('cropImageId') crop_image_id: string
    ): Promise<string> {
        try {
            const result: QueryResult<CropImage> = await this.cropImagesService.get_crop_image_blob(
                crop_image_id
            );
            return result.rows[0].image_binary;
            //const buff: Buffer = Buffer.from(result.rows[0].image_binary, "base64");
            //return new Blob([buff]);
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':cropImageId/annotations')
    @SetMetadata('ApiResource', 'CropImage')
    async get_crop_image_annotations (
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('cropImageId') crop_image_id: string
    ): Promise<string> {
        try {
            const result: QueryResult<CropImage> = await this.cropImagesService.get_crop_image_annotations(
                crop_image_id
            );
            return result.rows[0].image_annotations;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':cropImageId')
    @SetMetadata('ApiResource', 'CropImageDTO')
    async delete_crop_image(
        @Headers('authorization') auth_header: string,
        @Param('cropImageId') crop_image_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.cropImagesService.delete_crop_image(
                crop_image_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

}

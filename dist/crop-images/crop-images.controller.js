"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropImagesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const crop_images_service_1 = require("./crop-images.service");
let CropImagesController = class CropImagesController {
    constructor(cropImagesService) {
        this.cropImagesService = cropImagesService;
    }
    async get_crop_images_by_query_parameters(auth_header, organization_id, machine_id, crop_zone_id, field_id, crop_code, image_capture_date) {
        try {
            const result = await this.cropImagesService.get_crop_images_by_query_parameters(organization_id, machine_id, crop_zone_id, field_id, crop_code, image_capture_date ? new Date(image_capture_date) : null);
            return result.rows;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_crop_image_by_id(auth_header, organization_id, crop_image_id) {
        try {
            const result = await this.cropImagesService.get_crop_image_by_id(crop_image_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_crop_image_blob(auth_header, organization_id, crop_image_id) {
        try {
            const result = await this.cropImagesService.get_crop_image_blob(crop_image_id);
            return result.rows[0].image_binary;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async get_crop_image_annotations(auth_header, organization_id, crop_image_id) {
        try {
            const result = await this.cropImagesService.get_crop_image_annotations(crop_image_id);
            return result.rows[0].image_annotations;
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
    async delete_crop_image(auth_header, crop_image_id) {
        try {
            const result = await this.cropImagesService.delete_crop_image(crop_image_id);
            return result.rows[0];
        }
        catch (err) {
            if (err instanceof pg_1.DatabaseError)
                throw new common_1.HttpException(`DatabaseException: ${err.message}`, 500);
            else
                throw new common_1.HttpException(err.message, 500);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('ApiResource', 'CropImage'),
    openapi.ApiResponse({ status: 200, type: [require("./crop-images.entity").CropImage] }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Query)('machineId')),
    __param(3, (0, common_1.Query)('cropZoneId')),
    __param(4, (0, common_1.Query)('fieldId')),
    __param(5, (0, common_1.Query)('cropCode')),
    __param(6, (0, common_1.Query)('imageCaptureDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CropImagesController.prototype, "get_crop_images_by_query_parameters", null);
__decorate([
    (0, common_1.Get)(':cropImageId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropImage'),
    openapi.ApiResponse({ status: 200, type: require("./crop-images.entity").CropImage }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('cropImageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CropImagesController.prototype, "get_crop_image_by_id", null);
__decorate([
    (0, common_1.Get)(':cropImageId/blob'),
    (0, common_1.SetMetadata)('ApiResource', 'CropImage'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('cropImageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CropImagesController.prototype, "get_crop_image_blob", null);
__decorate([
    (0, common_1.Get)(':cropImageId/annotations'),
    (0, common_1.SetMetadata)('ApiResource', 'CropImage'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId')),
    __param(2, (0, common_1.Param)('cropImageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CropImagesController.prototype, "get_crop_image_annotations", null);
__decorate([
    (0, common_1.Delete)(':cropImageId'),
    (0, common_1.SetMetadata)('ApiResource', 'CropImageDTO'),
    openapi.ApiResponse({ status: 200, type: require("./crop-images.dto").IdObject }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cropImageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CropImagesController.prototype, "delete_crop_image", null);
CropImagesController = __decorate([
    (0, common_1.Controller)(':organizationId/cropImages'),
    __metadata("design:paramtypes", [crop_images_service_1.CropImagesService])
], CropImagesController);
exports.CropImagesController = CropImagesController;
//# sourceMappingURL=crop-images.controller.js.map
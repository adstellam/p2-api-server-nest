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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropImagesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let CropImagesService = class CropImagesService {
    constructor(configService) {
        this.configService = configService;
        this.pgPool = new pg_1.Pool({
            host: this.configService.get('POSTGRES_HOST'),
            port: parseInt(this.configService.get('POSTGRES_PORT')),
            database: this.configService.get('POSTGRES_DATABASE'),
            user: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD')
        });
    }
    async get_crop_images_by_query_parameters(organization_id, machine_name, crop_zone_id, field_id, crop_code, image_capture_date) {
        try {
            if (image_capture_date) {
                const sql = "SELECT * FROM stout.crop_images " +
                    "WHERE organization_id = $1::uuid " +
                    "AND machine_name LIKE $2 " +
                    "AND COALESCE(crop_zone_id::text,'') LIKE $3 " +
                    "AND COALESCE(field_id::text,'') LIKE $4 " +
                    "AND COALESCE(crop_code,'') LIKE $5 " +
                    "AND image_ts >= $6::timestamptz AND image_ts < $7::timestamptz " +
                    "ORDER BY machine_id, field_id, image_ts";
                const val = [
                    organization_id,
                    machine_name ? machine_name : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    field_id ? field_id : '%',
                    crop_code ? crop_code : '%',
                    image_capture_date,
                    new Date(image_capture_date.setDate(image_capture_date.getDate() + 1))
                ];
                return await this.pgPool.query(sql, val);
            }
            else {
                const sql = "SELECT * FROM stout.crop_images " +
                    "WHERE organization_id = $1::uuid " +
                    "AND machine_name LIKE $2 " +
                    "AND COALESCE(crop_zone_id::text,'') LIKE $3 " +
                    "AND COALESCE(field_id::text,'') LIKE $4 " +
                    "AND COALESCE(crop_code,'') LIKE $5";
                const val = [
                    organization_id,
                    machine_name ? machine_name : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    field_id ? field_id : '%',
                    crop_code ? crop_code : '%'
                ];
                return await this.pgPool.query(sql, val);
            }
        }
        catch (err) {
            if (err.code == '02000' || err.code == '02001') {
                const no_data_result = {
                    rows: [],
                    fields: [],
                    rowCount: null,
                    command: null,
                    oid: null
                };
                return no_data_result;
            }
            else {
                throw new pg_1.DatabaseError(err.message, err.length, err.name);
            }
        }
    }
    async get_crop_image_by_id(crop_image_id) {
        try {
            const sql = 'SELECT * FROM stout.crop_images WHERE id = $1::uuid';
            const val = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_crop_image_blob(crop_image_id) {
        try {
            const sql = `SELECT image_binary FROM stout.crop_images WHERE id = $1::uuid`;
            const val = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_crop_image_annotations(crop_image_id) {
        try {
            const sql = 'SELECT image_annotations FROM stout.crop_images WHERE id = $1::uuid';
            const val = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_crop_image(crop_image_id) {
        try {
            const sql = 'DELETE FROM norma.crop_images ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                crop_image_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
CropImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CropImagesService);
exports.CropImagesService = CropImagesService;
//# sourceMappingURL=crop-images.service.js.map
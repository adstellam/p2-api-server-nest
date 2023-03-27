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
exports.CropZonesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let CropZonesService = class CropZonesService {
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
    async get_crop_zones_by_query_parameters(organization_id, grower_name, crop_season, farm_name, field_name, crop_name, show_archived, wet_date) {
        try {
            const sql = "SELECT id, crop_zone_name, organization_id, grower_name, crop_season, farm_name, field_name, crop_name, ST_AsGeojson(bounding_region) AS bounding_region, area_in_sq_meters_calculated, area_in_sq_meters_given, guidance_group_names, wet_date, calculated_harvest_date, estimated_harvest_date, harvest_date, archived, created, updated " +
                "FROM stout.crop_zones " +
                "WHERE organization_id = $1 " +
                "AND COALESCE(grower_name,'') LIKE $2 " +
                "AND COALESCE(crop_season,'') LIKE $3 " +
                "AND COALESCE(farm_name,'') LIKE $4 " +
                "AND COALESCE(field_name,'') LIKE $5 " +
                "AND COALESCE(crop_name,'') LIKE $6 " +
                "AND (archived = $7 OR archived = false) " +
                "AND wet_date::text LIKE $8;";
            const val = [
                organization_id,
                grower_name ? grower_name : '%',
                crop_season ? crop_season : '%',
                farm_name ? farm_name : '%',
                field_name ? field_name : '%',
                crop_name ? crop_name : '%',
                show_archived,
                wet_date ? wet_date : '%'
            ];
            return await this.pgPool.query(sql, val);
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
    async insert_crop_zone(crop_zone_dto) {
        try {
            const sql = 'INSERT INTO norma.crop_zones ' +
                '(cname, field_id, crop_season, crop_code, bounding_region, area_in_sq_meters, wet_date, calculated_harvest_date, estimated_harvest_date, harvest_date, notes, archived, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3, $4, ST_GeomFromGeojson($5), $6::real, $7, $8::date, $9::date, $10::date, $11::date, $12::text[], $13::boolean, $14::timestamptz) ' +
                'RETURNING id;';
            const val = [
                crop_zone_dto.crop_zone_name,
                crop_zone_dto.field_id,
                crop_zone_dto.crop_season,
                crop_zone_dto.crop_code,
                JSON.stringify(crop_zone_dto.bounding_region),
                crop_zone_dto.area_in_sq_meters,
                crop_zone_dto.seed_type,
                crop_zone_dto.wet_date,
                crop_zone_dto.calculated_harvest_date,
                crop_zone_dto.estimated_harvest_date,
                crop_zone_dto.harvest_date,
                crop_zone_dto.notes,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_crop_zone_by_id(crop_zone_id) {
        try {
            const sql = 'SELECT id, crop_zone_name, organization_id, grower_name, crop_season, farm_name, field_name, crop_name, ST_AsGeojson(bounding_region) AS bounding_region, area_in_sq_meters_calculated, area_in_sq_meters_given, guidance_group_names, wet_date, calculated_harvest_date, estimated_harvest_date, harvest_date, archived, created, updated ' +
                'FROM stout.crop_zones ' +
                'WHERE id = $1::uuid';
            const val = [
                crop_zone_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_crop_zone(crop_zone_id, crop_zone_dto) {
        try {
            const sql = 'UPDATE norma.crop_zones SET ' +
                'cname = $2,' +
                'field_id = $3::uuid,' +
                'crop_season = $4,' +
                'crop_code = $5,' +
                'bounding_region = ST_GeomFromGeojson($6),' +
                'area_in_sq_meters = $7::real,' +
                'seed_type = $8,' +
                'wet_date = $9::date,' +
                'calculated_harvest_date = $10::date,' +
                'estimated_harvest_date = $11::date,' +
                'harvest_date = $12::date,' +
                'notes = $13::text[],' +
                'archived = $14::boolean,' +
                'updated = $15::timestamptz ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id;';
            const val = [
                crop_zone_id,
                crop_zone_dto.crop_zone_name,
                crop_zone_dto.field_id,
                crop_zone_dto.crop_season,
                crop_zone_dto.crop_code,
                JSON.stringify(crop_zone_dto.bounding_region),
                crop_zone_dto.area_in_sq_meters,
                crop_zone_dto.seed_type,
                crop_zone_dto.wet_date,
                crop_zone_dto.calculated_harvest_date,
                crop_zone_dto.estimated_harvest_date,
                crop_zone_dto.harvest_date,
                crop_zone_dto.notes,
                crop_zone_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_crop_zone(crop_zone_id) {
        try {
            const sql = 'DELETE FROM norma.crop_zones ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id;';
            const val = [
                crop_zone_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
CropZonesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CropZonesService);
exports.CropZonesService = CropZonesService;
//# sourceMappingURL=crop-zones.service.js.map
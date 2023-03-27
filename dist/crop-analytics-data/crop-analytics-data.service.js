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
exports.CropAnalyticsDataService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const enums_1 = require("../enums");
let CropAnalyticsDataService = class CropAnalyticsDataService {
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
    async get_crop_analytics_data_by_query_parameters(organization_id, grower_id, crop_season, crop_zone_id, crop_name, field_id, seed_type, wet_date) {
        try {
            if (wet_date) {
                const sql = "SELECT * FROM stout.crop_analytics_data " +
                    "WHERE organization_id = $1::uuid " +
                    "AND COALESCE(grower_id::text,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(crop_zone_id::text,'') LIKE $4 " +
                    "AND COALESCE(crop_name,'') LIKE $5 " +
                    "AND COALESCE(seed_type::text,'') LIKE $6 " +
                    "AND COALESCE(wet_date,'') = $7::date";
                const val = [
                    organization_id,
                    grower_id ? grower_id : '%',
                    crop_season ? crop_season : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    crop_name ? crop_name : '%',
                    seed_type ? enums_1.SeedTypeEnum[seed_type] : '%',
                    wet_date
                ];
                return await this.pgPool.query(sql, val);
            }
            else {
                const sql = "SELECT * FROM stout.crop_analytics_data " +
                    "WHERE organization_id = $1 " +
                    "AND COALESCE(grower_id::text,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(crop_zone_id::text,'') LIKE $4 " +
                    "AND COALESCE(crop_name,'') LIKE $5 " +
                    "AND COALESCE(seed_type::text,'') LIKE $6";
                const val = [
                    organization_id,
                    grower_id ? grower_id : '%',
                    crop_season ? crop_season : '%',
                    crop_zone_id ? crop_zone_id : '%',
                    crop_name ? crop_name : '%',
                    seed_type ? enums_1.SeedTypeEnum[seed_type] : '%'
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
    async get_crop_analytics_data_by_crop_id(crop_id) {
        try {
            const sql = 'SELECT * FROM stout.crop_analytics_data WHERE id = $1';
            const val = [
                crop_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_crop_analytics_data(crop_id, crop_analytics_data_dto) {
        try {
            const sql = 'UPDATE norma.crop_analytics_data SET ' +
                'crop_id = $2';
            'grower_id = $3::uuid,' +
                'crop_season = $4,' +
                'crop_zone_id = $5::uuid,' +
                'crop_code = $6,' +
                'crop_position = ST_GeomFromGeojson($7),' +
                'irrigation_records = array_append(irrigation_records, row($8, $9::int, $10::real, $11::timestamptz)),' +
                'cultivation_records = array_append(cultivation_records, row($12, $13::int, $14::timestamptz)),' +
                'application_records = array_append(application_records, row($15, $16::uuid, $17::timestamptz)),' +
                'crop_measure_records = array_append(crop_measure_records, row($18::int, $19::int, $20::timestamptz)),' +
                'insect_infestation_records = array_append(insect_infestation_records, row($21, $22, $23::int, $24::timestamptz)),' +
                'fungal_infestation_records = array_append(fungal_infestation_records, row($25, $26, $27::int, $28::timestamptz)),' +
                'viral_infestation_records = array_append(viral_infestation_records, row($29, $30, $31::int, $32::timestamptz)),' +
                'reject_date = $33::date,' +
                'harvest_date = $34::date' +
                'WHERE crop_id = $1 ' +
                'RETURNING id';
            const val = [
                crop_id,
                crop_analytics_data_dto.crop_id,
                crop_analytics_data_dto.grower_id,
                crop_analytics_data_dto.crop_season,
                crop_analytics_data_dto.crop_zone_id,
                crop_analytics_data_dto.crop_code,
                JSON.stringify(crop_analytics_data_dto.crop_position),
                crop_analytics_data_dto.irrigation_record.method,
                crop_analytics_data_dto.irrigation_record.duration_in_seconds,
                crop_analytics_data_dto.irrigation_record.flow_rate,
                crop_analytics_data_dto.irrigation_record.ts,
                crop_analytics_data_dto.cultivation_record.method,
                crop_analytics_data_dto.cultivation_record.depth_in_cm,
                crop_analytics_data_dto.cultivation_record.ts,
                crop_analytics_data_dto.application_record.method,
                crop_analytics_data_dto.application_record.prescription_id,
                crop_analytics_data_dto.application_record.ts,
                crop_analytics_data_dto.crop_measure_record.diameter_in_cm,
                crop_analytics_data_dto.crop_measure_record.height_in_cm,
                crop_analytics_data_dto.crop_measure_record.ts,
                crop_analytics_data_dto.insect_infestation_record.insect_type,
                crop_analytics_data_dto.insect_infestation_record.severity,
                crop_analytics_data_dto.insect_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.insect_infestation_record.ts,
                crop_analytics_data_dto.fungal_infestation_record.fungus_type,
                crop_analytics_data_dto.fungal_infestation_record.severity,
                crop_analytics_data_dto.fungal_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.viral_infestation_record.virus_type,
                crop_analytics_data_dto.viral_infestation_record.severity,
                crop_analytics_data_dto.viral_infestation_record.infected_area_percentage,
                crop_analytics_data_dto.viral_infestation_record.ts,
                crop_analytics_data_dto.reject_date,
                crop_analytics_data_dto.harvest_date
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_crop_analytics_data(crop_id) {
        try {
            const sql = 'DELETE FROM norma.crop_analytics_data ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val = [
                crop_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
CropAnalyticsDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CropAnalyticsDataService);
exports.CropAnalyticsDataService = CropAnalyticsDataService;
//# sourceMappingURL=crop-analytics-data.service.js.map
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
exports.FieldsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let FieldsService = class FieldsService {
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
    async get_fields_by_query_parameters(organization_id, grower_name, farm_name, crop_name, show_archived) {
        try {
            const sql = "SELECT * FROM stout.fields " +
                "WHERE organization_id = $1 " +
                "AND COALESCE(grower_name, '') LIKE $2 " +
                "AND COALESCE(farm_name, '') LIKE $3 " +
                "AND COALESCE(crop_name, '') LIKE $4 " +
                "AND (archived::boolean = $5 OR archived = false)";
            const val = [
                organization_id,
                grower_name ? grower_name : '%',
                farm_name ? farm_name : '%',
                crop_name ? crop_name : '%',
                show_archived
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
    async insert_field(field_dto) {
        try {
            const sql = 'INSERT INTO norma.fields ' +
                '(cname, farm_id, active_boundary_id, area_in_sq_meters, aspect, slope, slope_length, archived, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::uuid, $4::real, $5::real, $6::real, $7::real, $8::boolean, $9::date) ' +
                'RETURNING id';
            const val = [
                field_dto.field_name,
                field_dto.farm_id,
                field_dto.active_boundary_id,
                field_dto.area_in_sq_meters,
                field_dto.aspect,
                field_dto.slope,
                field_dto.slope_length,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_field_by_id(field_id) {
        try {
            const sql = 'SELECT * FROM stout.fields WHERE id = $1::uuid';
            const val = [
                field_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_field(field_id, field_dto) {
        try {
            const sql = 'UPDATE norma.fields SET ' +
                'cname = $2,' +
                'farm_id = $3::uuid,' +
                'active_boundary_id = $4::uuid,' +
                'area_in_sq_meters = $5::real,' +
                'aspect = $6::real,' +
                'slope = $7::real,' +
                'slope_length = $8::real,' +
                'archived = $9::real,' +
                'updated = $10::date,' +
                'context_items = array_append(context_items, row($11, $12)) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                field_id,
                field_dto.field_name,
                field_dto.farm_id,
                field_dto.active_boundary_id,
                field_dto.area_in_sq_meters,
                field_dto.aspect,
                field_dto.slope,
                field_dto.slope_length,
                field_dto.archived,
                new Date(),
                field_dto.context_item.context_key,
                field_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_field(field_id) {
        try {
            const sql = 'DELETE FROM norma.fields ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                field_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
FieldsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FieldsService);
exports.FieldsService = FieldsService;
//# sourceMappingURL=fields.service.js.map
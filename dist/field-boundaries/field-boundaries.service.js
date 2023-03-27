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
exports.FieldBoundariesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let FieldBoundariesService = class FieldBoundariesService {
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
    async get_field_boundaries_by_query_parameters(organization_id, field_id, field_name, show_archived) {
        try {
            const sql = 'SELECT id, organization_id, field_id, field_name, ST_AsGeojson(geom) AS geom, interior_boundary_attributes_json, headlands_json, archived, created, updated ' +
                'FROM stout.field_boundaries ' +
                'WHERE organization_id = $1 ' +
                'AND field_id::text LIKE $2 ' +
                'AND field_name LIKE $3 ' +
                'AND (archived = $4::boolean OR archived = false)';
            const val = [
                organization_id,
                field_id ? field_id : '%',
                field_name ? field_name : '%',
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
    async insert_field_boundary(field_boundary_dto) {
        try {
            const sql = 'INSERT INTO norma.field_boundaries ' +
                '(field_id, geom, original_epsg_code, archived, created) ' +
                'VALUES ' +
                '($1::uuid, ST_GeomFromGeojson($2), $3, $4::boolean, $5::date) ' +
                'RETURNING id';
            const val = [
                field_boundary_dto.field_id,
                JSON.stringify(field_boundary_dto.geom),
                field_boundary_dto.original_epsg_code,
                field_boundary_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_field_boundary_by_id(field_boundary_id) {
        try {
            const sql = 'SELECT id, organization_id, field_id, field_name, ST_AsGeojson(geom) AS geom, interior_boundary_attributes_json, headlands_json, archived, created, updated ' +
                'FROM stout.field_boundaries ' +
                'WHERE id = $1:uuid';
            const val = [
                field_boundary_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_field_boundary(field_boundary_id, field_boundary_dto) {
        try {
            const sql = 'UPDATE norma.field_boundaries SET ' +
                'field_id = $2::uuid,' +
                'geom = ST_GeomFromGeojson($3),' +
                'original_epsg_code = $4,' +
                'interior_boundary_attributes = array_append(interior_boundary_attributes, row($5, $6)),' +
                'headlands = array_append(headlands, row($7, $8)),' +
                'archived = $9::boolean,' +
                'updated = $10::date ' +
                'context_items = array_append(context_items, row($11, $12)) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                field_boundary_id,
                field_boundary_dto.field_id,
                JSON.stringify(field_boundary_dto.geom),
                field_boundary_dto.original_epsg_code,
                field_boundary_dto.interior_boundary_attribute.attribute_key,
                field_boundary_dto.interior_boundary_attribute.attribute_value,
                field_boundary_dto.headland.headland_key,
                field_boundary_dto.headland.headland_value,
                field_boundary_dto.archived,
                new Date(),
                field_boundary_dto.context_item.context_key,
                field_boundary_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_field_boundary(field_boundary_id) {
        try {
            const sql = 'DELETE FROM norma.field_boundaries ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                field_boundary_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
FieldBoundariesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FieldBoundariesService);
exports.FieldBoundariesService = FieldBoundariesService;
//# sourceMappingURL=field-boundaries.service.js.map
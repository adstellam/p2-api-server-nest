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
exports.MapLayersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const enums_1 = require("../enums");
let MapLayersService = class MapLayersService {
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
    async get_map_layers_by_query_parameters(organization_id, map_layer_type, from_date, to_date) {
        try {
            if (from_date) {
                const sql = "SELECT id, map_layer_name, map_layer_notes, organization_id, map_layer_type, map_layer_source_format, map_layer_source_date, map_layer_source, ST_AsGeojson(bounding_polygon), contained_field_names " +
                    "FROM stout.map_layers " +
                    "WHERE organization_id = $1 " +
                    "AND COALESCE(map_layer_type::text,'') LIKE $2 " +
                    "AND COALESCE(map_layer_source_date::timestamptz, current_timestamp) >= $3::timestamptz " +
                    "AND COALESCE(map_layer_source_date::timestamptz, current_timestamp) < $4::timestamptz";
                const val = [
                    organization_id,
                    map_layer_type ? enums_1.ReferenceLayerTypeEnum[map_layer_type] : '%',
                    from_date,
                    to_date
                ];
                return await this.pgPool.query(sql, val);
            }
            else {
                const sql = "SELECT * FROM stout.map_layers " +
                    "WHERE organization_id = $1 " +
                    "AND COALESCE(map_layer_type::text,'') LIKE $2;";
                const val = [
                    organization_id,
                    map_layer_type ? enums_1.ReferenceLayerTypeEnum[map_layer_type] : '%'
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
    async insert_map_layer(organization_id, map_layer_dto) {
        try {
            const sql = 'INSERT INTO norma.reference_layers ' +
                '(cname, notes, organization_id, layer_type, source_format, source_date, vector_source, raster_source, bounding_polygon) ' +
                'VALUES ' +
                "($1, $2::text[], $3::uuid, $4::adapt.reference_layer_type_enum, $5::adapt.reference_layer_source_format_enum, $6::date, $7::json, decode($8,'base64'), ST_GeomFromGeojson($9)) " +
                'RETURNING id';
            const val = [
                map_layer_dto.map_layer_name,
                map_layer_dto.notes,
                organization_id,
                map_layer_dto.map_layer_type,
                map_layer_dto.map_layer_source_format,
                map_layer_dto.map_layer_source_date,
                map_layer_dto.vector_source,
                map_layer_dto.raster_source,
                JSON.stringify(map_layer_dto.bounding_polygon)
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_map_layer_by_id(map_layer_id) {
        try {
            const sql = 'SELECT id, map_layer_name, map_layer_notes, organization_id, map_layer_type, map_layer_source_format, map_layer_source_date, map_layer_source, ST_AsGeojson(bounding_polygon),  ' +
                'FROM stout.map_layers WHERE id = $1';
            const val = [
                map_layer_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_map_layer(map_layer_id, map_layer_dto) {
        try {
            const sql = 'UPDATE norma.reference_layers SET ' +
                'cname = $2,' +
                'notes = $3::text[],' +
                'layer_type = $4::adapt.reference_layer_type_enum' +
                'source_format = $5::adapt.reference_layer_source_format_enum,' +
                'source_date = $6::date,' +
                'vector_source = $7::json,' +
                "raster_source = decode($8,'base64')" +
                'bounding_polygon = ST_GeomFromGeojson($9) ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val = [
                map_layer_id,
                map_layer_dto.map_layer_name,
                map_layer_dto.notes,
                map_layer_dto.map_layer_type,
                map_layer_dto.map_layer_source_format,
                map_layer_dto.map_layer_source_date,
                map_layer_dto.vector_source,
                map_layer_dto.raster_source,
                JSON.stringify(map_layer_dto.bounding_polygon)
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_map_layer(map_layer_id) {
        try {
            const sql = 'DELETE FROM norma.reference_layers ' +
                'WHERE id = $1 ' +
                'RETURNING id';
            const val = [
                map_layer_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
MapLayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MapLayersService);
exports.MapLayersService = MapLayersService;
//# sourceMappingURL=map-layers.service.js.map
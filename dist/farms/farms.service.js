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
exports.FarmsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let FarmsService = class FarmsService {
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
    async get_all_farms(organization_id) {
        try {
            const sql = 'SELECT id, farm_name, organization_id, grower_name, permitee, permit_number, ST_AsGeojson(bounding_region) AS bounding_region, field_names ' +
                'FROM stout.farms ' +
                'WHERE organization_id = $1';
            const val = [
                organization_id
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
    async insert_farm(organization_id, farm_dto) {
        try {
            const sql = 'INSERT INTO norma.farms ' +
                '(cname, organization_id, grower_id, permitee, permit_number, bounding_region) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::uuid, $4, $5, ST_GeomFromGeojson($6)) ' +
                'RETURNING id';
            const val = [
                farm_dto.farm_name,
                organization_id,
                farm_dto.grower_id,
                farm_dto.permitee,
                farm_dto.permit_number,
                JSON.stringify(farm_dto.bounding_region)
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_farm_by_id(farm_id) {
        try {
            const sql = 'SELECT id, farm_name, organization_id, grower_name, permitee, permit_number, ST_AsGeojson(bounding_region) AS bounding_region, field_names ' +
                'FROM stout.farms WHERE id = $1::uuid';
            const val = [
                farm_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_farm(farm_id, farm_dto) {
        try {
            const sql = 'UPDATE norma.farms SET ' +
                'cname = $2,' +
                'grower_id = $3,' +
                'permitee = $4,' +
                'permit_number = $5,' +
                'bounding_region = ST_GeomFromGeojson($6) ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                farm_id,
                farm_dto.farm_name,
                farm_dto.grower_id,
                farm_dto.permitee,
                farm_dto.permit_number,
                JSON.stringify(farm_dto.bounding_region)
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_farm(farm_id) {
        try {
            const sql = 'DELETE FROM norma.farms ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                farm_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
FarmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FarmsService);
exports.FarmsService = FarmsService;
//# sourceMappingURL=farms.service.js.map
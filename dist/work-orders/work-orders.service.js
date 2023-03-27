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
exports.WorkOrdersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let WorkOrdersService = class WorkOrdersService {
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
    async get_work_orders_by_query_parameters(organization_id, grower_name, crop_season, field_name, crop_name, show_archived) {
        try {
            const sql = "SELECT * FROM stout.work_orders " +
                "WHERE organization_id = $1::uuid " +
                "AND COALESCE(grower_name,'') LIKE $2 " +
                "AND COALESCE(crop_season,'') LIKE $3 " +
                "AND COALESCE(field_name,'') LIKE $4 " +
                "AND COALESCE(crop_name,'') LIKE $5 " +
                "AND (archived = $6::boolean OR archived = false)";
            const val = [
                organization_id,
                grower_name ? grower_name : '%',
                crop_season ? crop_season : '%',
                field_name ? field_name : '%',
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
    async insert_work_order(organization_id, work_order_dto) {
        try {
            const sql = "INSERT INTO norma.work_orders " +
                "(cname, work_order_version, organization_id, grower_id, crop_season, crop_code, field_id, archived, created) " +
                "VALUES " +
                "($1, $2, $3::uuid, $4::uuid, $5, $6, $7::uuid, $8::boolean, $9::timestamptz) " +
                "RETURNING id";
            const val = [
                work_order_dto.work_order_name,
                work_order_dto.work_order_version,
                organization_id,
                work_order_dto.grower_id,
                work_order_dto.crop_season,
                work_order_dto.crop_code,
                work_order_dto.field_id,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_work_order_by_id(work_order_id) {
        try {
            const sql = "SELECT * FROM stout.work_orders WHERE id = $1::uuid";
            const val = [
                work_order_id
            ];
            return this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_work_order(organization_id, work_order_id, work_order_dto) {
        try {
            const sql = "UPDATE norma.work_orders SET " +
                "cname = $2," +
                "work_order_version = $3," +
                "organization_id = $4::uuid," +
                "grower_id = $5::uuid," +
                "crop_season = $6," +
                "crop_code = $7," +
                "field_id = $8::uuid," +
                "status_updates = array_append(status_updates, row($9, $10::timestamptz))," +
                "archived = $11::boolean," +
                "updated = $12::timestamptz " +
                "WHERE id = $1::uuid " +
                "RETURNING id";
            const val = [
                work_order_id,
                work_order_dto.work_order_name,
                work_order_dto.work_order_version,
                organization_id,
                work_order_dto.grower_id,
                work_order_dto.crop_season,
                work_order_dto.crop_code,
                work_order_dto.field_id,
                work_order_dto.status_update.representation,
                work_order_dto.status_update.ts,
                work_order_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_work_order(work_order_id) {
        try {
            const sql = "DELETE FROM norma.work_orders WHERE id = $1::uuid " +
                "RETURNING id";
            const val = [
                work_order_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
WorkOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WorkOrdersService);
exports.WorkOrdersService = WorkOrdersService;
//# sourceMappingURL=work-orders.service.js.map
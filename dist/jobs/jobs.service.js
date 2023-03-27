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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const enums_1 = require("../enums");
let JobsService = class JobsService {
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
    async get_jobs_by_query_parameters(organization_id, grower_name, crop_season, field_name, crop_name, work_order_name, operation_type, job_status, planned_start_date, show_archived) {
        try {
            if (planned_start_date) {
                const sql = "SELECT * FROM stout.jobs " +
                    "WHERE organization_id = $1::uuid " +
                    "AND COALESCE(grower_name,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(field_name,'') LIKE $4 " +
                    "AND COALESCE(crop_name,'') LIKE $5 " +
                    "AND COALESCE(work_order_name,'') LIKE $6 " +
                    "AND ($7 = 'unspecified' OR operation_types @> array[$7::adapt.operation_type_enum]) " +
                    "AND COALESCE(job_status::text,'') LIKE $8 " +
                    "AND planned_start_date = $9::date " +
                    "AND (archived = $10::boolean OR archived = false)";
                const val = [
                    organization_id,
                    grower_name ? grower_name : '%',
                    crop_season ? crop_season : '%',
                    field_name ? field_name : '%',
                    crop_name ? crop_name : '%',
                    work_order_name ? work_order_name : '%',
                    operation_type ? enums_1.OperationTypeEnum[operation_type] : 'unspecified',
                    job_status ? enums_1.WorkStatusEnum[job_status] : '%',
                    planned_start_date,
                    show_archived
                ];
                return await this.pgPool.query(sql, val);
            }
            else {
                const sql = "SELECT * FROM stout.jobs " +
                    "WHERE organization_id = $1::uuid " +
                    "AND COALESCE(grower_name,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(field_name,'') LIKE $4 " +
                    "AND COALESCE(crop_name,'') LIKE $5 " +
                    "AND COALESCE(work_order_name,'') LIKE $6 " +
                    "AND ($7 = 'nil' OR operation_types @> array[$7::adapt.operation_type_enum]) " +
                    "AND COALESCE(job_status::text,'') LIKE $8 " +
                    "AND (archived = $9::boolean OR archived = false)";
                const val = [
                    organization_id,
                    grower_name ? grower_name : '%',
                    crop_season ? crop_season : '%',
                    field_name ? field_name : '%',
                    crop_name ? crop_name : '%',
                    work_order_name ? work_order_name : '%',
                    operation_type ? enums_1.OperationTypeEnum[operation_type] : 'nil',
                    job_status ? enums_1.WorkStatusEnum[job_status] : '%',
                    show_archived
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
    async insert_job(organization_id, job_dto) {
        try {
            const sql = "INSERT INTO norma.work_items " +
                "(cname, organization_id, work_order_id, crop_zone_id, work_item_supervisor_id, operation_types, work_item_priority, work_item_status, proposed_start_date, proposed_end_date, actual_start_date, actual_end_date, notes, archived, created) " +
                "VALUES " +
                "($1, $2::uuid, $3::uuid, $4::uuid, $5::uuid, $6::adapt.operation_type_enum[], $7::adapt.work_item_priority_enum, $8::adapt.work_status_enum, $9::date, $10::date, $11::date, $12::date, $13::text[], $14::boolean, $15::timestamptz) " +
                "RETURNING id";
            const val = [
                job_dto.job_name,
                organization_id,
                job_dto.work_order_id,
                job_dto.crop_zone_id,
                job_dto.job_supervisor_id,
                job_dto.operation_types,
                job_dto.job_priority,
                enums_1.WorkStatusEnum.Scheduled,
                job_dto.proposed_start_date,
                job_dto.proposed_end_date,
                null,
                null,
                job_dto.notes,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_job_by_id(job_id) {
        try {
            const sql = "SELECT * FROM stout.jobs WHERE id = $1::uuid";
            const val = [
                job_id
            ];
            return this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_job(job_id, job_dto) {
        try {
            const sql = "UPDATE norma.work_items SET " +
                "cname = $2," +
                "work_order_id = $3::uuid," +
                "crop_zone_id = $4::uuid," +
                "work_item_supervisor_id = $5::uuid," +
                "operation_types = $6::adapt.operation_type_enum[]," +
                "work_item_priority = $7::adapt.work_item_priority_enum," +
                "work_item_status = $8::adapt.work_status_enum," +
                "proposed_start_date = $9::date," +
                "propsed_end_date = $10::date," +
                "actual_start_date = $11::date," +
                "actual_end_date = $12::date," +
                "notes = $13::text[]," +
                "archived = $14::boolean," +
                "updated = $15::timestamptz " +
                "WHERE id = $1::uuid " +
                "RETURNING id";
            const val = [
                job_id,
                job_dto.job_name,
                job_dto.work_order_id,
                job_dto.crop_zone_id,
                job_dto.job_supervisor_id,
                job_dto.operation_types,
                job_dto.job_priority,
                job_dto.job_status,
                job_dto.proposed_start_date,
                job_dto.proposed_end_date,
                job_dto.actual_start_date,
                job_dto.actual_end_date,
                job_dto.notes,
                job_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_job(job_id) {
        try {
            const sql = "DELETE FROM norma.work_items WHERE id = $1::uuid " +
                "RETURNING id";
            const val = [
                job_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map
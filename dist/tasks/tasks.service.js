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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const enums_1 = require("../enums");
let TasksService = class TasksService {
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
    async get_tasks_by_query_parameters(organization_id, grower_name, crop_season, field_name, job_name, operation_type, machine_name, task_status, start_date, show_archived) {
        try {
            if (start_date) {
                const sql = "SELECT * FROM stout.tasks " +
                    "WHERE organization_id = $1::uuid " +
                    "AND COALESCE(grower_name,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(field_name,'') LIKE $4 " +
                    "AND COALESCE(job_name,'') LIKE $5 " +
                    "AND COALESCE(operation_type::text,'') LIKE $6 " +
                    "AND COALESCE(machine_name,'') LIKE $7 " +
                    "AND COALESCE(task_status::text,'') LIKE $8 " +
                    "AND COALESCE(start_time, '2000-01-01'::timestamptz) >= $9::timestamptz " +
                    "AND COALESCE(start_time, '2000-01-01'::timestamptz) < $10::timestamptz) " +
                    "AND (archived = $11 OR archived = false)";
                const val = [
                    organization_id,
                    grower_name ? grower_name : '%',
                    crop_season ? crop_season : '%',
                    field_name ? field_name : '%',
                    job_name ? job_name : '%',
                    operation_type ? enums_1.OperationTypeEnum[operation_type] : '%',
                    machine_name ? machine_name : '%',
                    task_status ? enums_1.WorkStatusEnum[task_status] : '%',
                    start_date,
                    new Date(start_date.setDate(start_date.getDate() + 1)),
                    show_archived
                ];
                return await this.pgPool.query(sql, val);
            }
            else {
                const sql = "SELECT * FROM stout.tasks " +
                    "WHERE organization_id = $1::uuid " +
                    "AND COALESCE(grower_name,'') LIKE $2 " +
                    "AND COALESCE(crop_season,'') LIKE $3 " +
                    "AND COALESCE(field_name,'') LIKE $4 " +
                    "AND COALESCE(job_name,'') LIKE $5 " +
                    "AND COALESCE(operation_type::text,'') LIKE $6 " +
                    "AND COALESCE(machine_name,'') LIKE $7 " +
                    "AND COALESCE(task_status::text,'') LIKE $8 " +
                    "AND (archived = $9::boolean OR archived = false)";
                const val = [
                    organization_id,
                    grower_name ? grower_name : '%',
                    crop_season ? crop_season : '%',
                    field_name ? field_name : '%',
                    job_name ? job_name : '%',
                    operation_type ? operation_type : '%',
                    machine_name ? machine_name : '%',
                    task_status ? task_status : '%',
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
    async insert_task(task_dto) {
        try {
            const sql = 'INSERT INTO norma.work_element_operations ' +
                '(cname, work_item_id, device_element_id, operator_id, operation_type, work_item_operation_status, start_time, end_time, notes, archived, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::uuid, $4::uuid, $5::adapt.operation_type_enum, $6::adapt.work_status_enum, $7::timestamptz, $8::timestamptz, $9::text[], $10::boolean, $11::timestamptz) ' +
                'RETURNING id';
            const val = [
                task_dto.task_name,
                task_dto.job_id,
                task_dto.machine_id,
                task_dto.task_operator_id,
                task_dto.operation_type,
                enums_1.WorkStatusEnum.Scheduled,
                task_dto.start_time,
                task_dto.end_time,
                task_dto.notes,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_task_by_id(task_id) {
        try {
            const sql = 'SELECT * FROM stout.tasks WHERE id = $1::uuid';
            const val = [
                task_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_task(task_id, task_dto) {
        try {
            const sql = 'UPDATE norma.work_element_operations SET ' +
                'cname = $2,' +
                'work_item_id = $3::uuid,' +
                'device_element_id = $4::uuid,' +
                'operator_id = $5:uuid, ' +
                'operation_type = $6::adapt.operation_type_enum,' +
                'work_item_operation_status = $7::adapt.work_status_enum, ' +
                'start_time = $8::date, ' +
                'end_time = $9::date, ' +
                'notes = $10::text[], ' +
                'archived = $11::boolean, ' +
                'updated = $12::timestamptz ' +
                'WHERE id = $1::uuid ';
            'RETURNING id';
            const val = [
                task_id,
                task_dto.task_name,
                task_dto.job_id,
                task_dto.machine_id,
                task_dto.task_operator_id,
                task_dto.operation_type,
                task_dto.task_status,
                task_dto.start_time,
                task_dto.end_time,
                task_dto.notes,
                task_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_task(task_id) {
        try {
            const sql = 'DELETE FROM norma.work_element_operations WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                task_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map
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
exports.TaskOperationsDataService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let TaskOperationsDataService = class TaskOperationsDataService {
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
    async get_task_operations_data_by_query_parameters(organization_id, job_id, job_name, task_id, task_name, crop_season, field_name, machine_name) {
        try {
            const sql = "SELECT * FROM stout.task_operations_data " +
                "WHERE organization_id = $1 " +
                "AND COALESCE(job_id::text,'') LIKE $2 " +
                "AND COALESCE(job_name,'') LIKE $3 " +
                "AND task_id::text LIKE $4 " +
                "AND COALESCE(task_name,'') LIKE $5 " +
                "AND COALESCE(crop_season,'') LIKE $6 " +
                "AND COALESCE(field_name,'') LIKE $7 " +
                "AND COALESCE(machine_name,'') LIKE $8";
            const val = [
                organization_id,
                job_id ? job_id : '%',
                job_name ? job_name : '%',
                task_id ? task_id : '%',
                task_name ? task_name : '%',
                crop_season ? crop_season : '%',
                field_name ? field_name : '%',
                machine_name ? machine_name : '%'
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_task_operations_data_by_id(task_operations_data_id) {
        try {
            const sql = 'SELECT * FROM stout.task_operations_data ' +
                'WHERE id = $1::uuid';
            const val = [
                task_operations_data_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async patch_task_operations_data(task_operations_data_id, task_operations_data_dto) {
        try {
            const sql = 'UPDATE norma.operation_data SET ' +
                'work_item_operation_id = $2::uuid' +
                'spatial_records = array_apend(spatial_records, row($3, st_geomfromgeojson($4), $5::timestamptz)),' +
                'data_log_trigger_record = row($6::adapt.logging_level_enum, $7::adapt.logging_method_enum, $8::real, $9::real, $10::real, $11::real, $12::real, $13),' +
                'coincident_operation_data_id::uuid = $14,' +
                'max_depth = $15::real,' +
                'variety_locator_id = $16,' +
                'context_items = array_append(context_items, row($17, $18))' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                task_operations_data_id,
                task_operations_data_dto.task_id,
                task_operations_data_dto.spatial_record.representation,
                JSON.stringify(task_operations_data_dto.spatial_record.shape),
                task_operations_data_dto.spatial_record.ts,
                task_operations_data_dto.data_log_trigger_record.logging_level,
                task_operations_data_dto.data_log_trigger_record.data_log_method,
                task_operations_data_dto.data_log_trigger_record.data_log_time_interval,
                task_operations_data_dto.data_log_trigger_record.data_log_distance_interval,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_change,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_maximum,
                task_operations_data_dto.data_log_trigger_record.data_log_threshold_minimum,
                task_operations_data_dto.data_log_trigger_record.representation,
                task_operations_data_dto.coincident_task_operations_data_ids,
                task_operations_data_dto.max_depth,
                task_operations_data_dto.variety_locator_id,
                task_operations_data_dto.context_item.context_key,
                task_operations_data_dto.context_item.context_value
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
TaskOperationsDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TaskOperationsDataService);
exports.TaskOperationsDataService = TaskOperationsDataService;
//# sourceMappingURL=task-operations-data.service.js.map
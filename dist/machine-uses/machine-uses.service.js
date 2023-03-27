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
exports.MachineUsesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let MachineUsesService = class MachineUsesService {
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
    async get_machine_uses_by_query_parameters(organization_id, machine_id, machine_name, from_time, to_time) {
        try {
            const sql = 'SELECT id, task_operations_data_id, task_id, task_name, machine_id, machine_name, travel_distance_meter, work_distance_meter, elapsed_time_seconds, work_time_seconds, crop_count, crop_counts_by_diameter, crop_counts_by_score, lens_working_dist_meter, plant_line_count, width_meter, line_spacing_meter, plant_spacing_meter, max_side_shift_travel_meter, start_time, end_time ' +
                'FROM stout.machine_uses ' +
                'WHERE organization_id = $1 ' +
                'AND machine_id::text LIKE $2 ' +
                'AND machine_name LIKE $3 ' +
                'ORDER BY machine_name, start_time';
            const val = [
                organization_id,
                machine_id ? machine_id : '%',
                machine_name ? machine_name : '%'
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
    async get_machine_uses_by_id(organization_id, machine_use_id) {
        try {
            const sql = 'SELECT id, task_operations_data_id, task_id, task_name, machine_id, machine_name, travel_distance_meter, work_distance_meter, elapsed_time_seconds, work_time_seconds, crop_count, crop_counts_by_diameter, crop_counts_by_score, lens_working_dist_meter, plant_line_count, width_meter, line_spacing_meter, plant_spacing_meter, max_side_shift_travel_meter, start_time, end_time ' +
                'FROM stout.machine_uses ' +
                'WHERE organization_id = $1::uuid AND id = $2::uuid ';
            const val = [
                organization_id,
                machine_use_id
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
};
MachineUsesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MachineUsesService);
exports.MachineUsesService = MachineUsesService;
//# sourceMappingURL=machine-uses.service.js.map
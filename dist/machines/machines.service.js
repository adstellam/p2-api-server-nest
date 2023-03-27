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
exports.MachinesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const enums_1 = require("../enums");
let MachinesService = class MachinesService {
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
    async get_machines_by_query_parameters(organization_id, machine_classification, machine_model, machine_series, show_archived) {
        try {
            const sql = "SELECT * FROM stout.machines " +
                "WHERE organization_id = $1::uuid " +
                "AND machine_classification LIKE $2 " +
                "AND COALESCE(machine_model, '') LIKE $3 " +
                "AND (archived = $4 OR archived = false)";
            const val = [
                organization_id,
                machine_classification ? machine_classification : '%',
                machine_model ? machine_model : '%',
                show_archived
            ];
            const result = await this.pgPool.query(sql, val);
            return result;
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
    async insert_machine(organization_id, machine_dto) {
        try {
            const sql = 'INSERT INTO norma.device_elements ' +
                '(cname, organization_id, brand_id, device_element_type, device_classification, device_model, series, serial_number, active_configuration_id, inet_domain_name, parent_device_id, archived, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::uuid, $4::adapt.device_element_type_enum, $5, $6, $7::int, $8, $9::uuid, $10, $11::uuid, $12::boolean, $13::date) ' +
                'RETURNING id';
            const val = [
                machine_dto.machine_name,
                organization_id,
                "e1bcd474-8ec8-4774-9a97-c277b6797129",
                enums_1.DeviceElementTypeEnum.Implement,
                machine_dto.machine_classification,
                machine_dto.machine_model,
                machine_dto.series,
                machine_dto.serial_number,
                machine_dto.active_configuration_id,
                machine_dto.inet_domain_name,
                machine_dto.parent_device_id,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_machine_by_id(machine_id) {
        try {
            const sql = 'SELECT * FROM stout.machines WHERE id = $1::uuid';
            const val = [
                machine_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_machine(machine_id, machine_dto) {
        try {
            const sql = 'UPDATE norma.device_elements SET ' +
                'cname = $2,' +
                'brand_id = $3::uuid,' +
                'device_element_type = $4::adapt.device_element_type_enum,' +
                'device_classification = $5,' +
                'device_model = $6,' +
                'series = $7::int,' +
                'serial_number = $8,' +
                'active_configuration_id = $9::uuid,' +
                'inet_domain_name = $10,' +
                'parent_device_id = $11::uuid,' +
                'archived = $12::boolean,' +
                'updated = $13::date' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                machine_id,
                machine_dto.machine_name,
                "e1bcd474-8ec8-4774-9a97-c277b6797129",
                enums_1.DeviceElementTypeEnum.Implement,
                machine_dto.machine_classification,
                machine_dto.machine_model,
                machine_dto.series,
                machine_dto.serial_number,
                machine_dto.active_configuration_id,
                machine_dto.inet_domain_name,
                machine_dto.parent_device_id,
                machine_dto.archived,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_machine(machine_id) {
        try {
            const sql = 'DELETE FROM norma.device_elements ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                machine_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
MachinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MachinesService);
exports.MachinesService = MachinesService;
//# sourceMappingURL=machines.service.js.map
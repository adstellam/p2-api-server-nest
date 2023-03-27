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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let RolesService = class RolesService {
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
    async get_roles_by_organization_id(organization_id) {
        try {
            const sql = 'SELECT * FROM stout.roles ' +
                'WHERE organization_id = $1::uuid';
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
    async insert_role(organization_id, role_dto) {
        try {
            const sql = 'INSERT INTO norma.roles ' +
                '(rolename, organization_id, role_permissions, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::json, $4::timestamptz) ' +
                'RETURNING id';
            const val = [
                role_dto.rolename,
                organization_id,
                role_dto.permissions,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_role_by_rolename(organization_id, rolename) {
        try {
            const sql = 'SELECT * FROM stout.roles WHERE organization_id = $1::uuid AND rolename = $2';
            const val = [
                organization_id,
                rolename
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_role(role_id, role_dto) {
        try {
            const sql = 'UPDATE norma.roles SET ' +
                'role_name = $2,' +
                'role_permissions = $3::json,' +
                'updated = $4::timestamptz ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                role_id,
                role_dto.rolename,
                JSON.stringify(role_dto.permissions),
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_role(role_id) {
        try {
            const sql = 'DELETE FROM norma.roles ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                role_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map
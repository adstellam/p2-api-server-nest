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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let UsersService = class UsersService {
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
    async get_users_by_query_parameters(organization_id, role, affiliated_entity) {
        try {
            const sql = 'SELECT * FROM stout.users ' +
                "WHERE organization_id = $1::uuid " +
                "AND array_append(role_names, 'any') @> ARRAY[$2] " +
                "AND affiliated_entity::text LIKE $3";
            const val = [
                organization_id,
                role ? role : 'any',
                affiliated_entity ? affiliated_entity : '%'
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
    async insert_user(organization_id, user_dto) {
        try {
            const sql = 'INSERT INTO norma.users ' +
                '(username, organization_id, role_ids, affiliated_entity, last_name, first_name, job_title, created) ' +
                'VALUES ' +
                '($1, $2::uuid, $3::uuid[], $4, $5, $6, $7, $8::timestamptz) ' +
                'RETURNING id';
            const val = [
                user_dto.username,
                organization_id,
                user_dto.role_ids,
                user_dto.affiliated_entity,
                user_dto.last_name,
                user_dto.first_name,
                user_dto.job_title,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async get_user_by_username(organization_id, username) {
        try {
            const sql = 'SELECT * FROM stout.users WHERE organization_id = $1::uuid AND username = $2';
            const val = [
                organization_id,
                username
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async update_user(user_id, user_dto) {
        try {
            const sql = 'UPDATE norma.users SET ' +
                'username = $2,' +
                'role_ids = $3,' +
                'affiliated_entity = $4,' +
                'last_name = $5,' +
                'first_name = $6,' +
                'job_title = $7,' +
                'updated = $8::timestamptz ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                user_id,
                user_dto.username,
                user_dto.role_ids,
                user_dto.affiliated_entity,
                user_dto.last_name,
                user_dto.first_name,
                user_dto.job_title,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
    async delete_user(user_id) {
        try {
            const sql = 'DELETE FROM norma.users ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val = [
                user_id
            ];
            return await this.pgPool.query(sql, val);
        }
        catch (err) {
            throw new pg_1.DatabaseError(err.message, err.length, err.name);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
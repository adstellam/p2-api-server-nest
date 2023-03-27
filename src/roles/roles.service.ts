import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { RoleDTO } from 'src/roles/roles.dto';
import { HttpMethodEnum } from 'src/enums';

@Injectable()
export class RolesService {

    pgPool: Pool;

    constructor(
        private configService: ConfigService
    ) {
        this.pgPool = new Pool({
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: parseInt(this.configService.get<string>('POSTGRES_PORT')),
            database: this.configService.get<string>('POSTGRES_DATABASE'),
            user: this.configService.get<string>('POSTGRES_USER'),
            password:this.configService.get<string>('POSTGRES_PASSWORD')
        });
    }

    async get_roles_by_organization_id(
        organization_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.roles ' +
                'WHERE organization_id = $1::uuid'; 
            const val: string[] = [
                organization_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            if (err.code == '02000' || err.code == '02001') {
                const no_data_result: QueryResult = {
                    rows: [],
                    fields: [],
                    rowCount: null,
                    command: null,
                    oid: null
                };
                return no_data_result;
            } else {
                throw new DatabaseError(err.message, err.length, err.name);
            }
        }
    }

    async insert_role(
        organization_id: string, 
        role_dto: RoleDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.roles ' +
                    '(rolename, organization_id, role_permissions, created) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::json, $4::timestamptz) ' +
                'RETURNING id';
            const val: (string | Date | { [index: string]: HttpMethodEnum[] })[] = [
                role_dto.rolename,
                organization_id,
                role_dto.permissions,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_role_by_rolename(
        organization_id: string, 
        rolename: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.roles WHERE organization_id = $1::uuid AND rolename = $2';
            const val: string[] = [
                organization_id,
                rolename
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_role(
        role_id: string, 
        role_dto: RoleDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.roles SET ' +
                    'role_name = $2,' +
                    'role_permissions = $3::json,' +
                    'updated = $4::timestamptz ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | Date | { [index: string]: HttpMethodEnum[] })[] = [
                role_id,
                role_dto.rolename,
                JSON.stringify(role_dto.permissions),
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_role(
        role_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.roles ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                role_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


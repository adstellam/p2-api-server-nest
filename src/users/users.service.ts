import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { UserDTO } from 'src/users/users.dto';

@Injectable()
export class UsersService {

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

    async get_users_by_query_parameters(
        organization_id: string, 
        role: string,
        affiliated_entity: string
    ): Promise<QueryResult> {
        try {
                const sql: string = 
                    'SELECT * FROM stout.users ' +
                    "WHERE organization_id = $1::uuid " +
                        "AND array_append(role_names, 'any') @> ARRAY[$2] " +
                        "AND affiliated_entity::text LIKE $3"; 
                const val: (string | Date | boolean)[] = [
                    organization_id, 
                    role ? role : 'any',
                    affiliated_entity ? affiliated_entity : '%'
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
    
    async insert_user(
        organization_id: string, 
        user_dto: UserDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.users ' +
                    '(username, organization_id, role_ids, affiliated_entity, last_name, first_name, job_title, created) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::uuid[], $4, $5, $6, $7, $8::timestamptz) ' +
                'RETURNING id';
            const val: (string | string[] | Date)[] = [
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
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_user_by_username(
        organization_id: string, 
        username: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.users WHERE organization_id = $1::uuid AND username = $2';
            const val: string[] = [
                organization_id,
                username
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_user(
        user_id: string, 
        user_dto: UserDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.users SET ' +
                    'username = $2,' +
                    'role_ids = $3,' +
                    'affiliated_entity = $4,' +
                    'last_name = $5,' +
                    'first_name = $6,' +
                    'job_title = $7,' +
                    'updated = $8::timestamptz ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: (string | string[] | Date)[] = [
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
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_user(
        user_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.users ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                user_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


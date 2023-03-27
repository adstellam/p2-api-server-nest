import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { TaskDTO } from 'src/tasks/tasks.dto';
import { OperationTypeEnum, WorkStatusEnum } from 'src/enums';

@Injectable()
export class TasksService {

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

    async get_tasks_by_query_parameters(
        organization_id: string, 
        grower_name: string, 
        crop_season: string, 
        field_name: string, 
        job_name: string, 
        operation_type: OperationTypeEnum, 
        machine_name: string,
        task_status: WorkStatusEnum,
        start_date: Date, 
        show_archived: boolean
    ): Promise<QueryResult> {
        try {
            if (start_date) {
                const sql: string = 
                    "SELECT * FROM stout.tasks " +
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
                const val: (string | Date | boolean)[] = [
                    organization_id, 
                    grower_name ? grower_name : '%',
                    crop_season ? crop_season : '%',
                    field_name ? field_name : '%',
                    job_name ? job_name : '%',
                    operation_type ? OperationTypeEnum[operation_type] : '%',
                    machine_name ? machine_name : '%',
                    task_status ? WorkStatusEnum[task_status] : '%',
                    start_date,
                    new Date(start_date.setDate(start_date.getDate() + 1)),
                    show_archived
                ];
                return await this.pgPool.query(sql, val);
            } else {
                const sql: string = 
                    "SELECT * FROM stout.tasks " +
                    "WHERE organization_id = $1::uuid " +
                        "AND COALESCE(grower_name,'') LIKE $2 " +
                        "AND COALESCE(crop_season,'') LIKE $3 " +
                        "AND COALESCE(field_name,'') LIKE $4 " +
                        "AND COALESCE(job_name,'') LIKE $5 " +
                        "AND COALESCE(operation_type::text,'') LIKE $6 " +
                        "AND COALESCE(machine_name,'') LIKE $7 " +
                        "AND COALESCE(task_status::text,'') LIKE $8 " +
                        "AND (archived = $9::boolean OR archived = false)";
                const val: (string | boolean | OperationTypeEnum)[] = [
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

    async insert_task(
        task_dto: TaskDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.work_element_operations ' +
                    '(cname, work_item_id, device_element_id, operator_id, operation_type, work_item_operation_status, start_time, end_time, notes, archived, created) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::uuid, $4::uuid, $5::adapt.operation_type_enum, $6::adapt.work_status_enum, $7::timestamptz, $8::timestamptz, $9::text[], $10::boolean, $11::timestamptz) ' +
                'RETURNING id';
            const val: (string | string[] | boolean | Date | OperationTypeEnum | WorkStatusEnum)[] = [
                task_dto.task_name,
                task_dto.job_id,
                task_dto.machine_id,
                task_dto.task_operator_id,
                task_dto.operation_type, 
                WorkStatusEnum.Scheduled,
                task_dto.start_time,
                task_dto.end_time,
                task_dto.notes,
                false,
                new Date()
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }
    
    async get_task_by_id(
        task_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.tasks WHERE id = $1::uuid';
            const val: string[] = [
                task_id
            ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_task(
        task_id: string, 
        task_dto: TaskDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.work_element_operations SET ' +
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
                'WHERE id = $1::uuid '
                'RETURNING id';
            const val: (string | string[] | boolean | Date | OperationTypeEnum | WorkStatusEnum)[] = [
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
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_task(
        task_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.work_element_operations WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                task_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


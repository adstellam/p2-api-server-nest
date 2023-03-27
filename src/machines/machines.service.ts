import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, DatabaseError } from 'pg';
import { MachineDTO, ContextItemRecord } from 'src/machines/machines.dto';
import { DeviceElementTypeEnum } from 'src/enums';

@Injectable()
export class MachinesService {

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

    async get_machines_by_query_parameters(
        organization_id: string, 
        machine_classification: string, 
        machine_model: string, 
        machine_series: string, 
        show_archived: boolean
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                "SELECT * FROM stout.machines " +
                "WHERE organization_id = $1::uuid " +
                    "AND machine_classification LIKE $2 " +
                    "AND COALESCE(machine_model, '') LIKE $3 " +
                    "AND (archived = $4 OR archived = false)";
            const val: (string | Date | boolean)[] = [
                organization_id, 
                machine_classification ? machine_classification : '%',
                machine_model ? machine_model : '%',
                show_archived
            ];
            const result: QueryResult = await this.pgPool.query(sql, val);
            return result;
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
    
    async insert_machine(
        organization_id: string, 
        machine_dto: MachineDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'INSERT INTO norma.device_elements ' +
                    '(cname, organization_id, brand_id, device_element_type, device_classification, device_model, series, serial_number, active_configuration_id, inet_domain_name, parent_device_id, archived, created) ' +
                'VALUES ' +
                    '($1, $2::uuid, $3::uuid, $4::adapt.device_element_type_enum, $5, $6, $7::int, $8, $9::uuid, $10, $11::uuid, $12::boolean, $13::date) ' +
                'RETURNING id';
            const val: (string | number | boolean | Date | DeviceElementTypeEnum)[] = [
                machine_dto.machine_name,
                organization_id,
                "e1bcd474-8ec8-4774-9a97-c277b6797129",
                DeviceElementTypeEnum.Implement,
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
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async get_machine_by_id(
        machine_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'SELECT * FROM stout.machines WHERE id = $1::uuid';
            const val: string[] = [
                    machine_id
                ];
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async update_machine(
        machine_id: string, 
        machine_dto: MachineDTO
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'UPDATE norma.device_elements SET ' +
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
            const val: (string | number | boolean | Date | DeviceElementTypeEnum | ContextItemRecord[])[] = [
                machine_id,
                machine_dto.machine_name,
                "e1bcd474-8ec8-4774-9a97-c277b6797129",
                DeviceElementTypeEnum.Implement,
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
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

    async delete_machine(
        machine_id: string
    ): Promise<QueryResult> {
        try {
            const sql: string = 
                'DELETE FROM norma.device_elements ' +
                'WHERE id = $1::uuid ' +
                'RETURNING id';
            const val: string[] = [
                machine_id
            ]
            return await this.pgPool.query(sql, val);
        } catch(err) {
            throw new DatabaseError(err.message, err.length, err.name);
        }
    }

}


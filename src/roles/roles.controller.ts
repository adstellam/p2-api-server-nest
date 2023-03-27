import { Controller, Param, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.entity';
import { RoleDTO, IdObject } from 'src/roles/roles.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/roles')
//@UseGuards(AuthorizationGuard)
export class RolesController {

    constructor(
        private rolesService: RolesService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'Role')
    async get_roles_by_organization_id(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
    ): Promise<Role[]> {
        try {
            const result: QueryResult<Role> = await this.rolesService.get_roles_by_organization_id(
                organization_id
            );
            return result.rows;
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Post()
    @SetMetadata('ApiResource', 'RoleDTO')
    async insert_role(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() role_dto: RoleDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.rolesService.insert_role(
                organization_id, 
                role_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':rolename')
    @SetMetadata('ApiResource', 'Role')
    async get_role_by_rolename(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('rolename') rolename: string
    ): Promise<Role> {
        try {
            const result: QueryResult<Role> = await this.rolesService.get_role_by_rolename(
                organization_id,
                rolename
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':roleId')
    @SetMetadata('ApiResource', 'RoleDTO')
    async update_role(
        @Headers('authorization') auth_header: string,
        @Param('roleId') role_id: string,
        @Body() role_dto: RoleDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.rolesService.update_role(
                role_id, 
                role_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':roleId')
    @SetMetadata('ApiResource', 'RoleDTO')
    async delete_role(
        @Headers('authorization') auth_header: string,
        @Param('roleId') role_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.rolesService.delete_role(
                role_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

}

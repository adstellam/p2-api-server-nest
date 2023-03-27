import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { UserDTO, IdObject } from 'src/users/users.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/users')
//@UseGuards(AuthorizationGuard)
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'User')
    async get_users_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('role') role?: string,
        @Query('affiliatedEntity') affiliated_entity?: string
    ): Promise<User[]> {
        try {
            const result: QueryResult<User> = await this.usersService.get_users_by_query_parameters(
                organization_id, 
                role, 
                affiliated_entity
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
    @SetMetadata('ApiResource', 'UserDTO')
    async insert_user(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() user_dto: UserDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.usersService.insert_user(
                organization_id, 
                user_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':username')
    @SetMetadata('ApiResource', 'User')
    async get_user_by_username(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('username') username: string
    ): Promise<User> {
        try {
            const result: QueryResult<User> = await this.usersService.get_user_by_username(
                organization_id,
                username
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':userId')
    @SetMetadata('ApiResource', 'UserDTO')
    async update_user(
        @Headers('authorization') auth_header: string,
        @Param('userId') user_id: string,
        @Body() user_dto: UserDTO 
    ): Promise<IdObject> {
        try {
            const result:QueryResult<IdObject> = await this.usersService.update_user(
                user_id, 
                user_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':userId')
    @SetMetadata('ApiResource', 'UserDTO')
    async delete_user(
        @Headers('authorization') auth_header: string,
        @Param('userId') user_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.usersService.delete_user(
                user_id
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

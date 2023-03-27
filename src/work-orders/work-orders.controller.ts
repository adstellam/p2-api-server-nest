import { Controller, Param, Query, Body, Headers, Get, Post, Put, Delete, HttpException, UseGuards, SetMetadata } from '@nestjs/common';
import { QueryResult, DatabaseError } from 'pg';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { WorkOrder } from 'src/work-orders/work-orders.entity';
import { WorkOrderDTO, IdObject } from 'src/work-orders/work-orders.dto';
import { AuthorizationGuard } from 'src/authorization.guard';

@Controller(':organizationId/workOrders')
//@UseGuards(AuthorizationGuard)
export class WorkOrdersController {

    constructor(
        private workOrdersService: WorkOrdersService
    ) {}

    @Get()
    @SetMetadata('ApiResource', 'WorkOrder')
    async get_work_orders_by_query_parameters(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Query('growerName') grower_name?: string,
        @Query('cropSeason') crop_season?: string,
        @Query('fieldName') field_name?: string,
        @Query('cropName') crop_name?: string,
        @Query('showArchived') show_archived?: string
    ): Promise<WorkOrder[]> {
        try {
            const result: QueryResult<WorkOrder> = await this.workOrdersService.get_work_orders_by_query_parameters(
                organization_id, 
                grower_name, 
                crop_season, 
                field_name, 
                crop_name, 
                show_archived && show_archived.toLowerCase() == "true" ? true : false
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
    @SetMetadata('ApiResource', 'WorkOrderDTO')
    async insert_work_order(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Body() work_order_dto: WorkOrderDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.workOrdersService.insert_work_order(
                organization_id, 
                work_order_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Get(':workOrderId')
    @SetMetadata('ApiResource', 'WorkOrder')
    async get_work_order_by_id(
        @Headers('authorization') auth_header: string,
        @Param('workOrderId') work_order_id: string
    ): Promise<WorkOrder> {
        try {
            const result: QueryResult<WorkOrder> = await this.workOrdersService.get_work_order_by_id(
                work_order_id
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Put(':workOrderId')
    @SetMetadata('ApiResource', 'WorkOrderDTO') 
    async update_work_order(
        @Headers('authorization') auth_header: string,
        @Param('organizationId') organization_id: string,
        @Param('workOrderId') work_order_id: string,
        @Body() work_order_dto: WorkOrderDTO 
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.workOrdersService.update_work_order(
                organization_id,
                work_order_id, 
                work_order_dto
            );
            return result.rows[0];
        } catch(err) {
            if (err instanceof DatabaseError) 
                throw new HttpException(`DatabaseError: ${err.message}`, 500);
            else
                throw new HttpException(err.message, 500);
        }
    }

    @Delete(':workOrderId')
    @SetMetadata('ApiResource', 'WorkOrderDTO')
    async delete_work_order(
        @Headers('authorization') auth_header: string,
        @Param('workOrderId') work_order_id: string
    ): Promise<IdObject> {
        try {
            const result: QueryResult<IdObject> = await this.workOrdersService.delete_work_order(
                work_order_id
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
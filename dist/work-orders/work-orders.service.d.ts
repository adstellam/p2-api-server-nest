import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';
import { WorkOrderDTO } from 'src/work-orders/work-orders.dto';
export declare class WorkOrdersService {
    private configService;
    pgPool: Pool;
    constructor(configService: ConfigService);
    get_work_orders_by_query_parameters(organization_id: string, grower_name: any, crop_season: string, field_name: string, crop_name: string, show_archived: boolean): Promise<QueryResult>;
    insert_work_order(organization_id: string, work_order_dto: WorkOrderDTO): Promise<QueryResult>;
    get_work_order_by_id(work_order_id: string): Promise<QueryResult>;
    update_work_order(organization_id: string, work_order_id: string, work_order_dto: WorkOrderDTO): Promise<QueryResult>;
    delete_work_order(work_order_id: string): Promise<QueryResult>;
}

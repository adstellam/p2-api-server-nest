import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { WorkOrder } from 'src/work-orders/work-orders.entity';
import { WorkOrderDTO, IdObject } from 'src/work-orders/work-orders.dto';
export declare class WorkOrdersController {
    private workOrdersService;
    constructor(workOrdersService: WorkOrdersService);
    get_work_orders_by_query_parameters(auth_header: string, organization_id: string, grower_name?: string, crop_season?: string, field_name?: string, crop_name?: string, show_archived?: string): Promise<WorkOrder[]>;
    insert_work_order(auth_header: string, organization_id: string, work_order_dto: WorkOrderDTO): Promise<IdObject>;
    get_work_order_by_id(auth_header: string, work_order_id: string): Promise<WorkOrder>;
    update_work_order(auth_header: string, organization_id: string, work_order_id: string, work_order_dto: WorkOrderDTO): Promise<IdObject>;
    delete_work_order(auth_header: string, work_order_id: string): Promise<IdObject>;
}

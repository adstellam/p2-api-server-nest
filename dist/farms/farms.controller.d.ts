import { FarmsService } from 'src/farms/farms.service';
import { Farm } from 'src/farms/farms.entity';
import { FarmDTO, IdObject } from 'src/farms/farms.dto';
export declare class FarmsController {
    private farmsService;
    constructor(farmsService: FarmsService);
    get_all_farms(auth_header: string, organization_id: string): Promise<Farm[]>;
    insert_farm(auth_header: string, organization_id: string, farm_dto: FarmDTO): Promise<IdObject>;
    get_farm_by_id(auth_header: string, farm_id: string): Promise<Farm>;
    update_farm(auth_header: string, farm_id: string, farm_dto: FarmDTO): Promise<IdObject>;
    delete_farm(auth_header: string, farm_id: string): Promise<IdObject>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const jobs_module_1 = require("./jobs/jobs.module");
const tasks_module_1 = require("./tasks/tasks.module");
const task_operations_data_module_1 = require("./task-operations-data/task-operations-data.module");
const fields_module_1 = require("./fields/fields.module");
const field_boundaries_module_1 = require("./field-boundaries/field-boundaries.module");
const crop_zones_module_1 = require("./crop-zones/crop-zones.module");
const crop_analytics_data_module_1 = require("./crop-analytics-data/crop-analytics-data.module");
const crop_images_module_1 = require("./crop-images/crop-images.module");
const machines_module_1 = require("./machines/machines.module");
const machine_telematics_data_module_1 = require("./machine-telematics-data/machine-telematics-data.module");
const map_layers_module_1 = require("./map-layers/map-layers.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const user_info_module_1 = require("./user-info/user-info.module");
const farms_module_1 = require("./farms/farms.module");
const work_orders_module_1 = require("./work-orders/work-orders.module");
const machine_pos_data_module_1 = require("./machine-pos-data/machine-pos-data.module");
const machine_uses_module_1 = require("./machine-uses/machine-uses.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.development.env', '.production.env'],
                isGlobal: true
            }),
            jobs_module_1.JobsModule,
            tasks_module_1.TasksModule,
            task_operations_data_module_1.TaskOperationsDataModule,
            fields_module_1.FieldsModule,
            field_boundaries_module_1.FieldBoundariesModule,
            crop_zones_module_1.CropZonesModule,
            crop_analytics_data_module_1.CropAnalyticsDataModule,
            crop_images_module_1.CropImagesModule,
            machines_module_1.MachinesModule,
            machine_telematics_data_module_1.MachineTelematicsDataModule,
            map_layers_module_1.MapLayersModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            user_info_module_1.UserInfoModule,
            farms_module_1.FarmsModule,
            work_orders_module_1.WorkOrdersModule,
            machine_pos_data_module_1.MachinePosDataModule,
            machine_uses_module_1.MachineUsesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
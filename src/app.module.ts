import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskOperationsDataModule } from './task-operations-data/task-operations-data.module';
import { FieldsModule } from './fields/fields.module';
import { FieldBoundariesModule } from './field-boundaries/field-boundaries.module';
import { CropZonesModule } from './crop-zones/crop-zones.module';
import { CropAnalyticsDataModule } from './crop-analytics-data/crop-analytics-data.module';
import { CropImagesModule } from './crop-images/crop-images.module';
import { MachinesModule } from './machines/machines.module';
import { MachineTelematicsDataModule } from './machine-telematics-data/machine-telematics-data.module';
import { MapLayersModule } from './map-layers/map-layers.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { UserInfoModule } from './user-info/user-info.module';
import { FarmsModule } from './farms/farms.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { MachinePosDataModule } from './machine-pos-data/machine-pos-data.module';
import { MachineUsesModule } from './machine-uses/machine-uses.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.development.env', '.production.env'],
            isGlobal: true
        }), 
        JobsModule, 
        TasksModule, 
        TaskOperationsDataModule,
        FieldsModule,
        FieldBoundariesModule,
        CropZonesModule,
        CropAnalyticsDataModule,
        CropImagesModule,
        MachinesModule,
        MachineTelematicsDataModule,
        MapLayersModule,
        UsersModule,
        RolesModule,
        AuthModule,
        UserInfoModule,
        FarmsModule,
        WorkOrdersModule,
        MachinePosDataModule,
        MachineUsesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

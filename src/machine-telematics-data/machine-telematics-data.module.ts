import { Module } from '@nestjs/common';
import { MachineTelematicsDataController } from './machine-telematics-data.controller';
import { MachineTelematicsDataService } from './machine-telematics-data.service';

@Module({
    controllers: [MachineTelematicsDataController],
    providers: [MachineTelematicsDataService]
})
export class MachineTelematicsDataModule {}

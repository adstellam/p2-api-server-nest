import { Module } from '@nestjs/common';
import { MachinePosDataController } from './machine-pos-data.controller';
import { MachinePosDataService } from './machine-pos-data.service';

@Module({
  controllers: [MachinePosDataController],
  providers: [MachinePosDataService]
})
export class MachinePosDataModule {}

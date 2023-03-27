import { Module } from '@nestjs/common';
import { CropAnalyticsDataController } from './crop-analytics-data.controller';
import { CropAnalyticsDataService } from './crop-analytics-data.service';

@Module({
  controllers: [CropAnalyticsDataController],
  providers: [CropAnalyticsDataService]
})
export class CropAnalyticsDataModule {}

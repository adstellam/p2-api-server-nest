import { Module } from '@nestjs/common';
import { CropZonesController } from './crop-zones.controller';
import { CropZonesService } from './crop-zones.service';

@Module({
  controllers: [CropZonesController],
  providers: [CropZonesService]
})
export class CropZonesModule {}

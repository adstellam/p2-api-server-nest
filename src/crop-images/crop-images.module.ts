import { Module } from '@nestjs/common';
import { CropImagesController } from './crop-images.controller';
import { CropImagesService } from './crop-images.service';

@Module({
  controllers: [CropImagesController],
  providers: [CropImagesService]
})
export class CropImagesModule {}

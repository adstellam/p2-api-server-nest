import { Test, TestingModule } from '@nestjs/testing';
import { CropImagesController } from './crop-images.controller';

describe('CropImagesController', () => {
  let controller: CropImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropImagesController],
    }).compile();

    controller = module.get<CropImagesController>(CropImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

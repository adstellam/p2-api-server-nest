import { Test, TestingModule } from '@nestjs/testing';
import { CropZonesController } from './crop-zones.controller';

describe('CropZonesController', () => {
  let controller: CropZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropZonesController],
    }).compile();

    controller = module.get<CropZonesController>(CropZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

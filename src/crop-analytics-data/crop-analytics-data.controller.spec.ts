import { Test, TestingModule } from '@nestjs/testing';
import { CropAnalyticsDataController } from './crop-analytics-data.controller';

describe('CropAnalyticsDataController', () => {
  let controller: CropAnalyticsDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropAnalyticsDataController],
    }).compile();

    controller = module.get<CropAnalyticsDataController>(CropAnalyticsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

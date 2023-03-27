import { Test, TestingModule } from '@nestjs/testing';
import { CropAnalyticsDataService } from './crop-analytics-data.service';

describe('CropAnalyticsDataService', () => {
  let service: CropAnalyticsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropAnalyticsDataService],
    }).compile();

    service = module.get<CropAnalyticsDataService>(CropAnalyticsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

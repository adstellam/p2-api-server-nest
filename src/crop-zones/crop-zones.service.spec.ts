import { Test, TestingModule } from '@nestjs/testing';
import { CropZonesService } from './crop-zones.service';

describe('CropZonesService', () => {
  let service: CropZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropZonesService],
    }).compile();

    service = module.get<CropZonesService>(CropZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

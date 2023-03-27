import { Test, TestingModule } from '@nestjs/testing';
import { MachineTelematicsDataService } from './machine-telematics-data.service';

describe('MachineTelematicsDataService', () => {
  let service: MachineTelematicsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineTelematicsDataService],
    }).compile();

    service = module.get<MachineTelematicsDataService>(MachineTelematicsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

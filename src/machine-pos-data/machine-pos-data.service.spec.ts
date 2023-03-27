import { Test, TestingModule } from '@nestjs/testing';
import { MachinePosDataService } from './machine-pos-data.service';

describe('MachinePosDataService', () => {
  let service: MachinePosDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachinePosDataService],
    }).compile();

    service = module.get<MachinePosDataService>(MachinePosDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

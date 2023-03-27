import { Test, TestingModule } from '@nestjs/testing';
import { MachineUsesService } from './machine-uses.service';

describe('MachineUsesService', () => {
  let service: MachineUsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineUsesService],
    }).compile();

    service = module.get<MachineUsesService>(MachineUsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FieldBoundariesService } from './field-boundaries.service';

describe('FieldBoundariesService', () => {
  let service: FieldBoundariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldBoundariesService],
    }).compile();

    service = module.get<FieldBoundariesService>(FieldBoundariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

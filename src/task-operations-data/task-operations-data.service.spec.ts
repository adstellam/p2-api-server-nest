import { Test, TestingModule } from '@nestjs/testing';
import { TaskOperationsDataService } from './task-operations-data.service';

describe('TaskOperationsDataService', () => {
  let service: TaskOperationsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskOperationsDataService],
    }).compile();

    service = module.get<TaskOperationsDataService>(TaskOperationsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

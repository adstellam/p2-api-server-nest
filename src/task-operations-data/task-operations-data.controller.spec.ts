import { Test, TestingModule } from '@nestjs/testing';
import { TaskOperationsDataController } from './task-operations-data.controller';

describe('TaskOperationsDataController', () => {
  let controller: TaskOperationsDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskOperationsDataController],
    }).compile();

    controller = module.get<TaskOperationsDataController>(TaskOperationsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

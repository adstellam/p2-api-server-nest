import { Test, TestingModule } from '@nestjs/testing';
import { MachinePosDataController } from './machine-pos-data.controller';

describe('MachinePosDataController', () => {
  let controller: MachinePosDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachinePosDataController],
    }).compile();

    controller = module.get<MachinePosDataController>(MachinePosDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

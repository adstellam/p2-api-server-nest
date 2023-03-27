import { Test, TestingModule } from '@nestjs/testing';
import { MachineTelematicsDataController } from './machine-telematics-data.controller';

describe('MachineTelematicsDataController', () => {
  let controller: MachineTelematicsDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineTelematicsDataController],
    }).compile();

    controller = module.get<MachineTelematicsDataController>(MachineTelematicsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

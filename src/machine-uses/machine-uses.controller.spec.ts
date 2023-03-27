import { Test, TestingModule } from '@nestjs/testing';
import { MachineUsesController } from './machine-uses.controller';

describe('MachineUsesController', () => {
  let controller: MachineUsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineUsesController],
    }).compile();

    controller = module.get<MachineUsesController>(MachineUsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

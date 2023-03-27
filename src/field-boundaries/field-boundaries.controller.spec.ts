import { Test, TestingModule } from '@nestjs/testing';
import { FieldBoundariesController } from './field-boundaries.controller';

describe('FieldBoundariesController', () => {
  let controller: FieldBoundariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldBoundariesController],
    }).compile();

    controller = module.get<FieldBoundariesController>(FieldBoundariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MapLayersController } from './map-layers.controller';

describe('MapLayersController', () => {
  let controller: MapLayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapLayersController],
    }).compile();

    controller = module.get<MapLayersController>(MapLayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

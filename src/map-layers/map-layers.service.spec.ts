import { Test, TestingModule } from '@nestjs/testing';
import { MapLayersService } from './map-layers.service';

describe('MapLayersService', () => {
  let service: MapLayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapLayersService],
    }).compile();

    service = module.get<MapLayersService>(MapLayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CropImagesService } from './crop-images.service';

describe('CropImagesService', () => {
  let service: CropImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropImagesService],
    }).compile();

    service = module.get<CropImagesService>(CropImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

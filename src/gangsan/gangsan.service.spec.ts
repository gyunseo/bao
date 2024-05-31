import { Test, TestingModule } from '@nestjs/testing';
import { GangsanService } from './gangsan.service';

describe('GangsanService', () => {
  let service: GangsanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GangsanService],
    }).compile();

    service = module.get<GangsanService>(GangsanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

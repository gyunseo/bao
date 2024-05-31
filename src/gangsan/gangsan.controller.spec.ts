import { Test, TestingModule } from '@nestjs/testing';
import { GangsanController } from './gangsan.controller';
import { GangsanService } from './gangsan.service';

describe('GangsanController', () => {
  let controller: GangsanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GangsanController],
      providers: [GangsanService],
    }).compile();

    controller = module.get<GangsanController>(GangsanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

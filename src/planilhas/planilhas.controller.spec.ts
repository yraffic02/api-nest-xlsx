import { Test, TestingModule } from '@nestjs/testing';
import { PlanilhasController } from './planilhas.controller';
import { PlanilhasService } from './planilhas.service';

describe('PlanilhasController', () => {
  let controller: PlanilhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanilhasController],
      providers: [PlanilhasService],
    }).compile();

    controller = module.get<PlanilhasController>(PlanilhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

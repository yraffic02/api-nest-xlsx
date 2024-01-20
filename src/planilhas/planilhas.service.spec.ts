import { Test, TestingModule } from '@nestjs/testing';
import { PlanilhasService } from './planilhas.service';

describe('PlanilhasService', () => {
  let service: PlanilhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanilhasService],
    }).compile();

    service = module.get<PlanilhasService>(PlanilhasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

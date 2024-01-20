import { Module } from '@nestjs/common';
import { PlanilhasService } from './planilhas.service';
import { PlanilhasController } from './planilhas.controller';

@Module({
  controllers: [PlanilhasController],
  providers: [PlanilhasService],
})
export class PlanilhasModule {}

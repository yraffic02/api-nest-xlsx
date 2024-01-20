import { Module } from '@nestjs/common';
import { PlanilhasModule } from './planilhas/planilhas.module';

@Module({
  imports: [PlanilhasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

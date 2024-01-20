import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanilhasService } from './planilhas.service';
import { CreatePlanilhaDto } from './dto/create-planilha.dto';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';

@Controller('planilhas')
export class PlanilhasController {
  constructor(private readonly planilhasService: PlanilhasService) {}

  @Post()
  create(@Body() createPlanilhaDto: CreatePlanilhaDto) {
    return this.planilhasService.create(createPlanilhaDto);
  }

  @Get()
  findAll() {
    return this.planilhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planilhasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanilhaDto: UpdatePlanilhaDto) {
    return this.planilhasService.update(+id, updatePlanilhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planilhasService.remove(+id);
  }
}

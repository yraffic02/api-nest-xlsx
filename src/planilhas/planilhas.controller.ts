import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import { PlanilhasService } from './planilhas.service';

@Controller('planilhas')
export class PlanilhasController {
  constructor(private readonly planilhasService: PlanilhasService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('arquivo', { storage: multer.memoryStorage() }))
  uploadPlanilha(@UploadedFile() arquivo: Express.Multer.File): any {
    const dados = this.planilhasService.processarPlanilha(arquivo.buffer);

    return { dados };
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

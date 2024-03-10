import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import { PlanilhasService } from './planilhas.service';

@Controller('planilhas')
export class PlanilhasController {
  constructor(private readonly planilhasService: PlanilhasService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('arquivo'))
  uploadPlanilha(
    @UploadedFile() arquivo: Express.Multer.File,
    @Body('parametros') parametros: string,
    @Body('vcf') gerarVcf?: boolean,
  ): any {
    let dados;
    if (parametros) {
      const paramsObj = JSON.parse(parametros);
      dados = this.planilhasService.processarPlanilha(
        arquivo.buffer,
        paramsObj,
      );
    } else {
      dados = this.planilhasService.processarPlanilha(arquivo.buffer);
    }

    if (gerarVcf) {
      const vcf = this.planilhasService.gerarArquivoVCF(dados);

      return {
        vcf,
        filename: 'contatos.vcf',
      };
    }

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
  update(
    @Param('id') id: string,
    @Body() updatePlanilhaDto: UpdatePlanilhaDto,
  ) {
    return this.planilhasService.update(+id, updatePlanilhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planilhasService.remove(+id);
  }
}

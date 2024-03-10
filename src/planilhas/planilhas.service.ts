import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreatePlanilhaDto } from './dto/create-planilha.dto';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';

@Injectable()
export class PlanilhasService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createPlanilhaDto: CreatePlanilhaDto) {
    return 'This action adds a new planilha';
  }

  findAll() {
    return `This action returns all planilhas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planilha`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePlanilhaDto: UpdatePlanilhaDto) {
    return `This action updates a #${id} planilha`;
  }

  remove(id: number) {
    return `This action removes a #${id} planilha`;
  }

  processarPlanilha = (buffer, parametros?: string[]) => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const primeiraFolha = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[primeiraFolha];

    let dados = xlsx.utils.sheet_to_json(worksheet, { header: 'A' });

    if (parametros && parametros.length > 0) {
      const colunasFiltradas = parametros.map((parametro) =>
        parametro.toUpperCase(),
      );
      dados = dados.map((linha) => {
        const linhaFiltrada = {};
        colunasFiltradas.forEach((coluna) => {
          if (linha[coluna]) {
            linhaFiltrada[coluna] = linha[coluna];
          }
        });
        return linhaFiltrada;
      });
    }

    return dados;
  };
}

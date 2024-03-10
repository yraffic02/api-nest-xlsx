import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as xlsx from 'xlsx';
import { CreatePlanilhaDto } from './dto/create-planilha.dto';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import * as path from 'path';

type pramsType = {
  coluna: string;
  ref: string;
};

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

  processarPlanilha = (buffer, parametros?: pramsType[]) => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const primeiraFolha = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[primeiraFolha];

    let dados = xlsx.utils.sheet_to_json(worksheet, { header: 'A' });

    if (parametros && parametros.length > 0) {
      const colunasFiltradas = parametros.map((parametro) =>
        parametro.coluna.toUpperCase(),
      );
      dados = dados.map((linha) => {
        const linhaFiltrada = {};
        colunasFiltradas.forEach((coluna, index) => {
          if (linha[coluna]) {
            const nomeColuna = parametros[index].ref;
            linhaFiltrada[nomeColuna] = linha[coluna];
          }
        });
        return linhaFiltrada;
      });
    }

    return dados;
  };

  gerarArquivoVCF(dados: any[]) {
    let vcfData = '';

    dados.forEach((contato) => {
      vcfData += `BEGIN:VCARD\n`;
      vcfData += `VERSION:3.0\n`;
      vcfData += `FN:${contato.nome}\n`;
      vcfData += `TEL:${contato.telefone}\n`;
      vcfData += `END:VCARD\n\n`;
    });

    const directory = path.join(__dirname, 'arquivos');
    const filePath = path.join(directory, 'contatos.vcf');

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(filePath, vcfData);
    return vcfData;
  }
}

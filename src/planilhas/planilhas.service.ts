import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreatePlanilhaDto } from './dto/create-planilha.dto';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';

@Injectable()
export class PlanilhasService {
  create(createPlanilhaDto: CreatePlanilhaDto) {
    return 'This action adds a new planilha';
  }

  findAll() {
    return `This action returns all planilhas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planilha`;
  }

  update(id: number, updatePlanilhaDto: UpdatePlanilhaDto) {
    return `This action updates a #${id} planilha`;
  }

  remove(id: number) {
    return `This action removes a #${id} planilha`;
  }

  processarPlanilha(buffer: Buffer): any[] {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
  
    const primeiraFolha = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[primeiraFolha];
  
    const dados = xlsx.utils.sheet_to_json(worksheet, { header: 'A' });
  
    return dados;
  }
}

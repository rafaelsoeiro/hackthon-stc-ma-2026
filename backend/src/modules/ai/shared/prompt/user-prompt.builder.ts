import { Injectable } from '@nestjs/common';
import { BuscaDto } from '../../dto/Busca.dto';

@Injectable()
export class UserPromptBuilder {
  build(buscaDto: BuscaDto, contexto: unknown): string {
    return `
Pergunta do Cidadao: "${buscaDto.pergunta}"
Assunto: ${buscaDto.assunto || 'Nao especificado'}

DADOS OBTIDOS DO PORTAL DA TRANSPARENCIA:
${JSON.stringify(contexto, null, 2)}

Por favor, responda estritamente no formato JSON solicitado nas normas.
    `.trim();
  }
}

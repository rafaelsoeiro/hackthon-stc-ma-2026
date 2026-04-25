import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TransparencyService } from './transparency/transparency.service';
import { buildSystemPrompt } from './prompts/system.prompt';
import { BuscaDto } from './dto/Busca.dto';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private transparencyService: TransparencyService) {
    // IMPORTANTE: Em produção, o ideal é ter a chave no .env e pegar via ConfigService
    const apiKey = process.env.GEMINI_API_KEY || 'COLOQUE_SUA_CHAVE_GEMINI_AQUI';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async processarBusca(buscaDto: BuscaDto): Promise<any> {
    try {
      // 1. Busca os dados de contexto no portal da transparência (nosso serviço mock)
      const contexto = await this.transparencyService.getContextoParaIA(
        buscaDto.pergunta,
        buscaDto.assunto,
      );

      // 2. Constrói o Prompt de Sistema com as regras da IN nº 001/2025
      const systemInstruction = buildSystemPrompt();

      // 3. Constrói o Prompt do Usuário (Pergunta + Contexto)
      const userPrompt = `
Pergunta do Cidadão: "${buscaDto.pergunta}"
Assunto: ${buscaDto.assunto || 'Não especificado'}

DADOS OBTIDOS DO PORTAL DA TRANSPARÊNCIA:
${JSON.stringify(contexto, null, 2)}

Por favor, responda estritamente no formato JSON solicitado nas normas.
      `;

      // 4. Configura o modelo
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction,
        generationConfig: {
          responseMimeType: 'application/json', // Garante que a saída será JSON
        },
      });

      // 5. Chama o Gemini
      const result = await model.generateContent(userPrompt);
      const responseText = result.response.text();

      // 6. Retorna o JSON parseado
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Erro na chamada do Gemini:', error);
      throw new InternalServerErrorException('Não foi possível gerar a resposta com a IA. Verifique sua chave de API.');
    }
  }
}

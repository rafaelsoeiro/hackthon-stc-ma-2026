import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TransparencyService } from './transparency/transparency.service';
import { buildSystemPrompt } from './prompts/system.prompt';
import { BuscaDto } from './dto/Busca.dto';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private transparencyService: TransparencyService) {
    // IMPORTANTE: Em produção, o ideal é ter a chave no .env e pegar via ConfigService
    const apiKey =
      process.env.GEMINI_API_KEY || 'COLOQUE_SUA_CHAVE_GEMINI_AQUI';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async processarBusca(buscaDto: BuscaDto): Promise<unknown> {
    try {
      // 1. Busca os dados de contexto no portal da transparência (nosso serviço mock)
      const contexto = this.transparencyService.getContextoParaIA(
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

      // 6. Retorna o JSON parseado com tratamento robusto de formato
      return this.parseModelJsonResponse(responseText);
    } catch (error) {
      console.error('Erro na chamada do Gemini:', error);
      throw new InternalServerErrorException(
        'Não foi possível gerar a resposta com a IA. Verifique sua chave de API.',
      );
    }
  }

  private parseModelJsonResponse(rawResponse: string): unknown {
    const normalized = this.normalizeJsonCandidate(rawResponse);

    try {
      return JSON.parse(normalized);
    } catch (error) {
      console.error(
        'Resposta da IA não veio em JSON válido:',
        rawResponse,
        error,
      );
      throw new BadGatewayException(
        'A IA retornou uma resposta em formato inválido. Tente novamente em instantes.',
      );
    }
  }

  private normalizeJsonCandidate(rawResponse: string): string {
    const trimmed = rawResponse.trim();
    const codeFenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

    if (codeFenceMatch?.[1]) {
      return codeFenceMatch[1].trim();
    }

    return trimmed;
  }
}

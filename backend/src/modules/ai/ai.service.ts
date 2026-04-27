import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { buildSystemPrompt } from './prompts/system.prompt';
import { BuscaDto } from './dto/Busca.dto';
import { TransparencyService } from './transparency/transparency.service';
import { LLM_PROVIDER_TOKEN } from './core/constants/provider.tokens';
import { LlmProviderPort } from './core/ports/llm-provider.port';
import { ModelJsonParserService } from './shared/parser/model-json-parser.service';
import { UserPromptBuilder } from './shared/prompt/user-prompt.builder';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly transparencyService: TransparencyService,
    private readonly parser: ModelJsonParserService,
    private readonly userPromptBuilder: UserPromptBuilder,
    @Inject(LLM_PROVIDER_TOKEN)
    private readonly llmProvider: LlmProviderPort,
  ) {}

  async processarBusca(buscaDto: BuscaDto): Promise<unknown> {
    const provider = process.env.AI_PROVIDER?.toLowerCase() || 'openai';

    this.logger.log(
      `ai:busca:start provider=${provider} assunto=${buscaDto.assunto ?? 'auto'} perguntaChars=${buscaDto.pergunta.length}`,
    );

    try {
      const contexto = this.transparencyService.getContextoParaIA(
        buscaDto.pergunta,
        buscaDto.assunto,
      );

      const systemInstruction = buildSystemPrompt();
      const userPrompt = this.userPromptBuilder.build(buscaDto, contexto);

      const responseText = await this.llmProvider.generateJson({
        systemInstruction,
        userPrompt,
      });

      const parsed = this.parser.parse(responseText);
      this.logger.log(`ai:busca:success provider=${provider}`);
      return parsed;
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.warn(
          `ai:busca:http_error provider=${provider} status=${error.getStatus()} message=${error.message}`,
        );
        throw error;
      }

      this.logger.error(
        `ai:busca:failure provider=${provider}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException(
        'Nao foi possivel gerar a resposta com a IA. Verifique a configuracao do provider.',
      );
    }
  }

  async gerarAudioDaResposta(text: string): Promise<{
    buffer: Buffer;
    contentType: string;
    voice: string;
    model: string;
  }> {
    const provider = process.env.AI_PROVIDER?.toLowerCase() || 'openai';

    if (provider !== 'openai') {
      throw new InternalServerErrorException(
        'Sintese de audio disponivel apenas com provider OpenAI.',
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        'OPENAI_API_KEY nao configurada para sintese de audio.',
      );
    }

    const model = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
    const voice = process.env.OPENAI_TTS_VOICE || 'shimmer';

    this.logger.log(
      `ai:speech:start provider=${provider} voice=${voice} model=${model} textChars=${text.length}`,
    );

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorText = await response
        .text()
        .catch(() => 'Sem detalhes da API OpenAI para TTS.');
      this.logger.error(
        `ai:speech:failure provider=${provider} status=${response.status} detail=${errorText}`,
      );
      throw new InternalServerErrorException(
        `Falha na sintese de audio (${response.status}).`,
      );
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(audioArrayBuffer);
    const contentType = response.headers.get('content-type') ?? 'audio/mpeg';

    this.logger.log(
      `ai:speech:success provider=${provider} voice=${voice} bytes=${buffer.length}`,
    );

    return {
      buffer,
      contentType,
      voice,
      model,
    };
  }
}

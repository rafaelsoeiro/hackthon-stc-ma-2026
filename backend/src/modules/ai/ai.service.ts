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
}

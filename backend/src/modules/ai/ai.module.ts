import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TransparencyService } from './transparency/transparency.service';
import { GeminiProvider } from './providers/gemini/gemini.provider';
import { OpenAiProvider } from './providers/openai/openai.provider';
import { LLM_PROVIDER_TOKEN } from './core/constants/provider.tokens';
import { ModelJsonParserService } from './shared/parser/model-json-parser.service';
import { UserPromptBuilder } from './shared/prompt/user-prompt.builder';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    TransparencyService,
    GeminiProvider,
    OpenAiProvider,
    ModelJsonParserService,
    UserPromptBuilder,
    {
      provide: LLM_PROVIDER_TOKEN,
      useFactory: (
        geminiProvider: GeminiProvider,
        openAiProvider: OpenAiProvider,
      ) => {
        const provider = process.env.AI_PROVIDER?.toLowerCase() || 'openai';

        if (provider === 'gemini') {
          return geminiProvider;
        }

        return openAiProvider;
      },
      inject: [GeminiProvider, OpenAiProvider],
    },
  ],
  exports: [AiService],
})
export class AiModule {}

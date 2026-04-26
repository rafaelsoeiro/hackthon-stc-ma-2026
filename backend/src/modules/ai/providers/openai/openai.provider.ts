import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LlmProviderPort } from '../../core/ports/llm-provider.port';
import { GenerateJsonRequest } from '../../core/types/llm.types';

type OpenAiChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

@Injectable()
export class OpenAiProvider implements LlmProviderPort {
  async generateJson(request: GenerateJsonRequest): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException(
        'OPENAI_API_KEY nao configurada para o provider OpenAI.',
      );
    }

    const model = request.model || process.env.OPENAI_MODEL || 'gpt-4.1-mini';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: request.systemInstruction,
          },
          {
            role: 'user',
            content: request.userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response
        .text()
        .catch(() => 'Sem detalhes da API OpenAI.');
      throw new InternalServerErrorException(
        `Falha na chamada OpenAI (${response.status}). ${errorText}`,
      );
    }

    const payload = (await response.json()) as OpenAiChatResponse;
    const content = payload.choices?.[0]?.message?.content;

    if (!content) {
      throw new InternalServerErrorException(
        'OpenAI retornou resposta vazia para a consulta de IA.',
      );
    }

    return content;
  }
}

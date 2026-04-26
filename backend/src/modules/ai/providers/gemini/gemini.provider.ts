import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LlmProviderPort } from '../../core/ports/llm-provider.port';
import { GenerateJsonRequest } from '../../core/types/llm.types';

@Injectable()
export class GeminiProvider implements LlmProviderPort {
  async generateJson(request: GenerateJsonRequest): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException(
        'GEMINI_API_KEY nao configurada para o provider Gemini.',
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: request.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      systemInstruction: request.systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(request.userPrompt);
    return result.response.text();
  }
}

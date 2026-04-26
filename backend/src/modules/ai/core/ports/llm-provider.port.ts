import { GenerateJsonRequest } from '../types/llm.types';

export abstract class LlmProviderPort {
  abstract generateJson(request: GenerateJsonRequest): Promise<string>;
}

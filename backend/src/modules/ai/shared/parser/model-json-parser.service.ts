import { BadGatewayException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ModelJsonParserService {
  private readonly logger = new Logger(ModelJsonParserService.name);

  parse(rawResponse: string): unknown {
    const normalized = this.normalizeJsonCandidate(rawResponse);

    try {
      return JSON.parse(normalized);
    } catch (error) {
      this.logger.error(
        `ai:parse:invalid_json rawSize=${rawResponse.length}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new BadGatewayException(
        'A IA retornou uma resposta em formato invalido. Tente novamente em instantes.',
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

import { Body, Controller, Header, Post, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { BuscaDto } from './dto/Busca.dto';
import { SpeechDto } from './dto/speech.dto';

@ApiTags('Inteligência Artificial')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('busca')
  @ApiOperation({
    summary: 'Faz uma pergunta para a IA sobre transparência pública.',
    description:
      'Recebe uma pergunta em linguagem natural e retorna os dados do portal da transparência traduzidos para uma linguagem simples e acessível.',
  })
  @ApiResponse({
    status: 201,
    description: 'Resposta gerada com sucesso pela IA.',
  })
  @ApiResponse({
    status: 400,
    description: 'A pergunta ou os parâmetros enviados são inválidos.',
  })
  async buscarComIA(@Body() buscaDto: BuscaDto) {
    return this.aiService.processarBusca(buscaDto);
  }

  @Post('speech')
  @Header('Cache-Control', 'no-store')
  @ApiOperation({
    summary: 'Converte texto da resposta da IA em audio.',
    description:
      'Gera audio MP3 para leitura de respostas da IA usando provider configurado (OpenAI).',
  })
  @ApiResponse({
    status: 201,
    description: 'Audio gerado com sucesso.',
  })
  async gerarSpeech(@Body() speechDto: SpeechDto) {
    const result = await this.aiService.gerarAudioDaResposta(
      speechDto.text.trim(),
    );

    return new StreamableFile(result.buffer, {
      type: result.contentType,
      disposition: 'inline; filename="resposta-ia.mp3"',
    });
  }
}

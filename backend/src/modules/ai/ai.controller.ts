import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { BuscaDto } from './dto/Busca.dto';

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
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServidoresService } from './servidores.service';
import { ServidoresQueryDto } from './dto/servidores-query.dto';

@ApiTags('Dados Publicos - Servidores')
@Controller('public/servidores')
export class ServidoresController {
  constructor(private readonly servidoresService: ServidoresService) {}

  @Get()
  @ApiOperation({ summary: 'Lista servidores com recortes de remuneracao.' })
  list(@Query() query: ServidoresQueryDto) {
    return this.servidoresService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo de servidores e folha.' })
  summary(@Query() query: ServidoresQueryDto) {
    return this.servidoresService.summary(query);
  }
}

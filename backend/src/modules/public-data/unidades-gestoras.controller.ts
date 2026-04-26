import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UnidadesGestorasQueryDto } from './dto/unidades-gestoras-query.dto';
import { UnidadesGestorasService } from './unidades-gestoras.service';

@ApiTags('Dados Publicos - Unidades Gestoras')
@Controller('public/unidades-gestoras')
export class UnidadesGestorasController {
  constructor(
    private readonly unidadesGestorasService: UnidadesGestorasService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lista/sugere unidades gestoras para filtros de interface.',
  })
  list(@Query() query: UnidadesGestorasQueryDto) {
    return this.unidadesGestorasService.list(query);
  }
}

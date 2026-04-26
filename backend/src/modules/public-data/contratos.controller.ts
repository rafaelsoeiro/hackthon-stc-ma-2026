import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContratosService } from './contratos.service';
import { ContratosQueryDto } from './dto/contratos-query.dto';

@ApiTags('Dados Publicos - Contratos')
@Controller('public/contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista contratos com filtros e paginacao.' })
  list(@Query() query: ContratosQueryDto) {
    return this.contratosService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo de contratos para KPIs da pagina.' })
  summary() {
    return this.contratosService.summary();
  }

  @Get('guided-search')
  @ApiOperation({
    summary: 'Busca guiada de contratos para wizard do frontend.',
  })
  guidedSearch(@Query() query: ContratosQueryDto) {
    return this.contratosService.guidedSearch(query);
  }
}

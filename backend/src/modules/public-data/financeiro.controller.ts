import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FinanceiroService } from './financeiro.service';
import { DespesasQueryDto } from './dto/despesas-query.dto';
import { ReceitasQueryDto } from './dto/receitas-query.dto';

@ApiTags('Dados Publicos - Financeiro')
@Controller('public')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Get('despesas')
  @ApiOperation({ summary: 'Lista despesas publicas com filtros e paginacao.' })
  listDespesas(@Query() query: DespesasQueryDto) {
    return this.financeiroService.listDespesas(query);
  }

  @Get('despesas/summary')
  @ApiOperation({ summary: 'Resumo de despesas para cards/KPIs.' })
  despesasSummary(@Query() query: DespesasQueryDto) {
    return this.financeiroService.despesasSummary(query);
  }

  @Get('receitas')
  @ApiOperation({ summary: 'Lista receitas publicas com filtros e paginacao.' })
  listReceitas(@Query() query: ReceitasQueryDto) {
    return this.financeiroService.listReceitas(query);
  }

  @Get('receitas/summary')
  @ApiOperation({ summary: 'Resumo de receitas para cards/KPIs.' })
  receitasSummary(@Query() query: ReceitasQueryDto) {
    return this.financeiroService.receitasSummary(query);
  }
}

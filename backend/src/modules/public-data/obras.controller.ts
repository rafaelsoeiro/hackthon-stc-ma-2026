import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObrasService } from './obras.service';
import { ObrasQueryDto } from './dto/obras-query.dto';

@ApiTags('Dados Publicos - Obras')
@Controller('public/obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista obras com filtros e paginacao.' })
  list(@Query() query: ObrasQueryDto) {
    return this.obrasService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo geral de obras para cards/KPIs.' })
  summary() {
    return this.obrasService.summary();
  }
}

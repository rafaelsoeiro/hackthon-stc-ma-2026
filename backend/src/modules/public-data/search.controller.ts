import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('Dados Publicos - Busca')
@Controller('public/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Busca unificada de dados publicos (sem IA).' })
  search(@Query() query: SearchQueryDto) {
    return this.searchService.search(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo agregador da busca para graficos/cards.' })
  summary(@Query() query: SearchQueryDto) {
    return this.searchService.summary(query);
  }
}

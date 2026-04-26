import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Dados Publicos - Analytics')
@Controller('public/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':domain/summary')
  @ApiOperation({
    summary: 'Resumo de analytics por dominio (dados, pessoas, governo).',
  })
  summary(@Param('domain') domain: string, @Query('ano') ano?: string) {
    const parsedYear = ano ? Number(ano) : undefined;
    if (ano && Number.isNaN(parsedYear)) {
      throw new BadRequestException('Parametro ano invalido.');
    }
    return this.analyticsService.summary(domain, parsedYear);
  }
}

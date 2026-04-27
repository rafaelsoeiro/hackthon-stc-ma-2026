import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmendasService } from './emendas.service';
import { EmendasQueryDto } from './dto/emendas-query.dto';

@ApiTags('Dados Publicos - Emendas')
@Controller('public/emendas')
export class EmendasController {
  constructor(private readonly emendasService: EmendasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista emendas parlamentares com filtros.' })
  list(@Query() query: EmendasQueryDto) {
    return this.emendasService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo de emendas para cards/KPIs.' })
  summary(@Query() query: EmendasQueryDto) {
    return this.emendasService.summary(query);
  }
}

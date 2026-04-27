import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransferenciasService } from './transferencias.service';
import { TransferenciasQueryDto } from './dto/transferencias-query.dto';

@ApiTags('Dados Publicos - Transferencias')
@Controller('public/transferencias')
export class TransferenciasController {
  constructor(private readonly transferenciasService: TransferenciasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista transferencias com filtros e paginacao.' })
  list(@Query() query: TransferenciasQueryDto) {
    return this.transferenciasService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo de transferencias para KPI.' })
  summary(@Query() query: TransferenciasQueryDto) {
    return this.transferenciasService.summary(query);
  }
}

import { Module } from '@nestjs/common';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ServidoresController } from './servidores.controller';
import { ServidoresService } from './servidores.service';
import { TransferenciasController } from './transferencias.controller';
import { TransferenciasService } from './transferencias.service';
import { EmendasController } from './emendas.controller';
import { EmendasService } from './emendas.service';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { UnidadesGestorasController } from './unidades-gestoras.controller';
import { UnidadesGestorasService } from './unidades-gestoras.service';

@Module({
  controllers: [
    ObrasController,
    ContratosController,
    FinanceiroController,
    SearchController,
    ServidoresController,
    TransferenciasController,
    EmendasController,
    ProgramasController,
    AnalyticsController,
    UnidadesGestorasController,
  ],
  providers: [
    ObrasService,
    ContratosService,
    FinanceiroService,
    SearchService,
    ServidoresService,
    TransferenciasService,
    EmendasService,
    ProgramasService,
    AnalyticsService,
    UnidadesGestorasService,
  ],
})
export class PublicDataModule {}

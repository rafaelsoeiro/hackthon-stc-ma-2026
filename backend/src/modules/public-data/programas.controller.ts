import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProgramasService } from './programas.service';
import { ProgramasQueryDto } from './dto/programas-query.dto';

@ApiTags('Dados Publicos - Programas')
@Controller('public/programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista programas sociais derivados das bases atuais.',
  })
  list(@Query() query: ProgramasQueryDto) {
    return this.programasService.list(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo de programas sociais (MVP derivado).' })
  summary(@Query() query: ProgramasQueryDto) {
    return this.programasService.summary(query);
  }
}

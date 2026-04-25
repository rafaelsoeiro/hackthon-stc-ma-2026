import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';

// ── Assuntos disponíveis no tesauro ──────────────────────────────────────────
export const ASSUNTOS_VALIDOS = [
  'Institucional',
  'Gestão Fiscal',
  'Obras e Infraestrutura',
  'Pessoal',
  'Licitações e Contratos',
  'Planejamento e Resultados',
  'Transparência Passiva',
  'Emendas Parlamentares',
  'Controle e Integridade',
  'Convênios e Transferências',
  'Dados Abertos',
] as const;

// ── Request ──────────────────────────────────────────────────────────────────
export class BuscaDto {
  @ApiProperty({
    description: 'Pergunta do cidadão em linguagem natural',
    example: 'Quanto o governo gastou com empenhos na saúde em 2024?',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'A pergunta não pode estar vazia.' })
  @MaxLength(500, { message: 'A pergunta deve ter no máximo 500 caracteres.' })
  pergunta!: string;

  @ApiPropertyOptional({
    description: 'Assunto/categoria do tesauro para filtrar a busca',
    enum: ASSUNTOS_VALIDOS,
    example: 'Gestão Fiscal',
  })
  @IsOptional()
  @IsIn(ASSUNTOS_VALIDOS, {
    message: `O assunto deve ser um dos valores: ${ASSUNTOS_VALIDOS.join(', ')}`,
  })
  assunto?: string;

  @ApiPropertyOptional({
    description: 'Ano de referência para filtrar os dados (padrão: ano atual)',
    example: 2024,
  })
  @IsOptional()
  exercicio?: number;

  @ApiPropertyOptional({
    description: 'Órgão/unidade gestora específica',
    example: 'Secretaria de Saúde',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  orgao?: string;
}

// ── Response ─────────────────────────────────────────────────────────────────
export class TermoExplicadoDto {
  @ApiProperty({ example: 'EMPENHO' })
  termo: string;

  @ApiProperty({ example: 'Dinheiro Reservado' })
  traducao: string;

  @ApiProperty({
    example: 'O governo reserva o dinheiro para garantir o pagamento ao fornecedor.',
  })
  definicao: string;
}

export class ValorDto {
  @ApiProperty({ example: 'Total Empenhado' })
  rotulo: string;

  @ApiProperty({ example: 'R$ 420.000,00' })
  valor_formatado: string;

  @ApiProperty({ example: 'Equivale a 100.000 passagens de ônibus em São Luís' })
  comparativo_local: string;
}

export class BuscaResponseDto {
  @ApiProperty({
    description: 'Resposta em linguagem acessível ao cidadão',
    example: 'Em 2024, o governo reservou R$ 420.000,00 para serviços de saúde...',
  })
  resposta_cidada: string;

  @ApiProperty({ type: [TermoExplicadoDto] })
  termos_explicados: TermoExplicadoDto[];

  @ApiProperty({ type: [ValorDto] })
  valores: ValorDto[];

  @ApiProperty({
    type: [String],
    example: ['LC nº 131/2009', 'Lei nº 12.527/2011'],
  })
  fontes: string[];

  @ApiProperty({
    nullable: true,
    example: null,
    description: 'Aviso importante ao cidadão, se houver',
  })
  alerta: string | null;

  @ApiProperty({
    description: 'Metadados da consulta',
  })
  meta: {
    pergunta_original: string;
    assunto_detectado?: string;
    exercicio?: number;
    orgao?: string;
    timestamp: string;
  };
}

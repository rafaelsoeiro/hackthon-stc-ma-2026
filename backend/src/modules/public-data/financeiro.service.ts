import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DespesasQueryDto } from './dto/despesas-query.dto';
import { ReceitasQueryDto } from './dto/receitas-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class FinanceiroService {
  constructor(private readonly prisma: PrismaService) {}

  async listDespesas(query: DespesasQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.ano
        ? {
            dataEmissao: {
              gte: new Date(`${query.ano}-01-01`),
              lte: new Date(`${query.ano}-12-31`),
            },
          }
        : {}),
      ...(query.unidadeGestoraId
        ? { unidadeGestoraId: query.unidadeGestoraId }
        : {}),
      ...(query.categoria
        ? {
            categoria: {
              contains: query.categoria,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.funcao
        ? { funcao: { contains: query.funcao, mode: 'insensitive' as const } }
        : {}),
      ...(query.programa
        ? {
            programa: {
              contains: query.programa,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.fonte
        ? { fonte: { contains: query.fonte, mode: 'insensitive' as const } }
        : {}),
      ...(query.q
        ? {
            OR: [
              {
                descricao: { contains: query.q, mode: 'insensitive' as const },
              },
              {
                codigoEmpenho: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
              {
                credor: {
                  nome: { contains: query.q, mode: 'insensitive' as const },
                },
              },
            ],
          }
        : {}),
    };

    const [itemsRaw, total, agg] = await this.prisma.$transaction([
      this.prisma.despesa.findMany({
        where,
        include: {
          unidadeGestora: { select: { nome: true, sigla: true } },
          credor: { select: { nome: true } },
        },
        orderBy: { dataEmissao: 'desc' },
        skip,
        take,
      }),
      this.prisma.despesa.count({ where }),
      this.prisma.despesa.aggregate({
        where,
        _sum: {
          valorEmpenhado: true,
          valorLiquidado: true,
          valorPago: true,
        },
      }),
    ]);

    return {
      items: itemsRaw.map((d) => ({
        id: d.id,
        codigoEmpenho: d.codigoEmpenho,
        descricao: d.descricao,
        dataEmissao: d.dataEmissao,
        valorEmpenhado: decimalToNumber(d.valorEmpenhado),
        valorLiquidado: decimalToNumber(d.valorLiquidado),
        valorPago: decimalToNumber(d.valorPago),
        naturezaDespesa: d.naturezaDespesa,
        funcao: d.funcao,
        subfuncao: d.subfuncao,
        programa: d.programa,
        fonte: d.fonte,
        categoria: d.categoria,
        unidadeGestora: {
          nome: d.unidadeGestora.nome,
          sigla: d.unidadeGestora.sigla,
        },
        credorNome: d.credor?.nome ?? null,
      })),
      meta: toMeta(total, page, pageSize),
      totals: {
        valorEmpenhado: decimalToNumber(agg._sum.valorEmpenhado),
        valorLiquidado: decimalToNumber(agg._sum.valorLiquidado),
        valorPago: decimalToNumber(agg._sum.valorPago),
      },
    };
  }

  async despesasSummary(query: DespesasQueryDto) {
    const where = {
      ...(query.ano
        ? {
            dataEmissao: {
              gte: new Date(`${query.ano}-01-01`),
              lte: new Date(`${query.ano}-12-31`),
            },
          }
        : {}),
    };

    const [agg, count] = await this.prisma.$transaction([
      this.prisma.despesa.aggregate({
        where,
        _sum: {
          valorEmpenhado: true,
          valorLiquidado: true,
          valorPago: true,
        },
      }),
      this.prisma.despesa.count({ where }),
    ]);

    return {
      totalRegistros: count,
      valorEmpenhado: decimalToNumber(agg._sum.valorEmpenhado),
      valorLiquidado: decimalToNumber(agg._sum.valorLiquidado),
      valorPago: decimalToNumber(agg._sum.valorPago),
    };
  }

  async listReceitas(query: ReceitasQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.ano ? { ano: query.ano } : {}),
      ...(query.mes ? { mes: query.mes } : {}),
      ...(query.unidadeGestoraId
        ? { unidadeGestoraId: query.unidadeGestoraId }
        : {}),
      ...(query.categoria
        ? {
            categoria: {
              contains: query.categoria,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.naturezaReceita
        ? {
            naturezaReceita: {
              contains: query.naturezaReceita,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.fonte
        ? { fonte: { contains: query.fonte, mode: 'insensitive' as const } }
        : {}),
      ...(query.q
        ? {
            OR: [
              {
                descricao: { contains: query.q, mode: 'insensitive' as const },
              },
              { codigo: { contains: query.q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [itemsRaw, total, agg] = await this.prisma.$transaction([
      this.prisma.receita.findMany({
        where,
        include: {
          unidadeGestora: { select: { nome: true, sigla: true } },
        },
        orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
        skip,
        take,
      }),
      this.prisma.receita.count({ where }),
      this.prisma.receita.aggregate({
        where,
        _sum: {
          valorPrevisto: true,
          valorRealizado: true,
        },
      }),
    ]);

    return {
      items: itemsRaw.map((r) => ({
        id: r.id,
        codigo: r.codigo,
        descricao: r.descricao,
        valorPrevisto: decimalToNumber(r.valorPrevisto),
        valorRealizado: decimalToNumber(r.valorRealizado),
        ano: r.ano,
        mes: r.mes,
        naturezaReceita: r.naturezaReceita,
        fonte: r.fonte,
        categoria: r.categoria,
        unidadeGestora: {
          nome: r.unidadeGestora.nome,
          sigla: r.unidadeGestora.sigla,
        },
      })),
      meta: toMeta(total, page, pageSize),
      totals: {
        valorPrevisto: decimalToNumber(agg._sum.valorPrevisto),
        valorRealizado: decimalToNumber(agg._sum.valorRealizado),
      },
    };
  }

  async receitasSummary(query: ReceitasQueryDto) {
    const where = {
      ...(query.ano ? { ano: query.ano } : {}),
      ...(query.mes ? { mes: query.mes } : {}),
    };

    const [agg, count] = await this.prisma.$transaction([
      this.prisma.receita.aggregate({
        where,
        _sum: {
          valorPrevisto: true,
          valorRealizado: true,
        },
      }),
      this.prisma.receita.count({ where }),
    ]);

    return {
      totalRegistros: count,
      valorPrevisto: decimalToNumber(agg._sum.valorPrevisto),
      valorRealizado: decimalToNumber(agg._sum.valorRealizado),
    };
  }
}

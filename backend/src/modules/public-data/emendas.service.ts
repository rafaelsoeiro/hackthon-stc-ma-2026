import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmendasQueryDto } from './dto/emendas-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class EmendasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: EmendasQueryDto) {
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
      ...(query.programa
        ? {
            programa: {
              contains: query.programa,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.naturezaDespesa
        ? {
            naturezaDespesa: {
              contains: query.naturezaDespesa,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.q
        ? {
            OR: [
              {
                descricao: { contains: query.q, mode: 'insensitive' as const },
              },
              {
                numeroEmpenho: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
              { programa: { contains: query.q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [itemsRaw, total, agg] = await this.prisma.$transaction([
      this.prisma.emendaParlamentar.findMany({
        where,
        include: {
          unidadeGestora: { select: { nome: true, sigla: true } },
          credor: { select: { nome: true } },
        },
        orderBy: { dataEmissao: 'desc' },
        skip,
        take,
      }),
      this.prisma.emendaParlamentar.count({ where }),
      this.prisma.emendaParlamentar.aggregate({
        where,
        _sum: {
          valorEmpenhado: true,
          valorLiquidado: true,
          valorPago: true,
        },
      }),
    ]);

    return {
      items: itemsRaw.map((e) => ({
        id: e.id,
        numeroEmpenho: e.numeroEmpenho,
        tipo: e.tipo,
        descricao: e.descricao,
        dataEmissao: e.dataEmissao,
        valorEmpenhado: decimalToNumber(e.valorEmpenhado),
        valorLiquidado: decimalToNumber(e.valorLiquidado),
        valorPago: decimalToNumber(e.valorPago),
        funcao: e.funcao,
        subfuncao: e.subfuncao,
        programa: e.programa,
        acao: e.acao,
        fonte: e.fonte,
        naturezaDespesa: e.naturezaDespesa,
        processo: e.processo,
        categoria: e.categoria,
        unidadeGestora: {
          nome: e.unidadeGestora.nome,
          sigla: e.unidadeGestora.sigla,
        },
        credorNome: e.credor?.nome ?? null,
      })),
      meta: toMeta(total, page, pageSize),
      totals: {
        valorEmpenhado: decimalToNumber(agg._sum.valorEmpenhado),
        valorLiquidado: decimalToNumber(agg._sum.valorLiquidado),
        valorPago: decimalToNumber(agg._sum.valorPago),
      },
    };
  }

  async summary(query: EmendasQueryDto) {
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

    const [count, agg] = await this.prisma.$transaction([
      this.prisma.emendaParlamentar.count({ where }),
      this.prisma.emendaParlamentar.aggregate({
        where,
        _sum: {
          valorEmpenhado: true,
          valorLiquidado: true,
          valorPago: true,
        },
      }),
    ]);

    return {
      totalRegistros: count,
      valorEmpenhado: decimalToNumber(agg._sum.valorEmpenhado),
      valorLiquidado: decimalToNumber(agg._sum.valorLiquidado),
      valorPago: decimalToNumber(agg._sum.valorPago),
    };
  }
}

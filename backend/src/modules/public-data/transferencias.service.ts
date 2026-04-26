import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TransferenciasQueryDto } from './dto/transferencias-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class TransferenciasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: TransferenciasQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.tipo ? { tipo: query.tipo } : {}),
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
      ...(query.programa
        ? {
            programa: {
              contains: query.programa,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.natureza
        ? {
            natureza: {
              contains: query.natureza,
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
              { programa: { contains: query.q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [itemsRaw, total, agg] = await this.prisma.$transaction([
      this.prisma.transferencia.findMany({
        where,
        include: {
          unidadeGestora: { select: { nome: true, sigla: true } },
        },
        orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
        skip,
        take,
      }),
      this.prisma.transferencia.count({ where }),
      this.prisma.transferencia.aggregate({
        where,
        _sum: {
          valorPrevisto: true,
          valorRealizado: true,
          valorEmpenhado: true,
          valorLiquidado: true,
          valorPago: true,
        },
      }),
    ]);

    return {
      items: itemsRaw.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        ano: t.ano,
        mes: t.mes,
        descricao: t.descricao,
        valorPrevisto: decimalToNumber(t.valorPrevisto),
        valorRealizado: decimalToNumber(t.valorRealizado),
        valorEmpenhado: decimalToNumber(t.valorEmpenhado),
        valorLiquidado: decimalToNumber(t.valorLiquidado),
        valorPago: decimalToNumber(t.valorPago),
        natureza: t.natureza,
        fonte: t.fonte,
        funcao: t.funcao,
        programa: t.programa,
        categoria: t.categoria,
        unidadeGestora: {
          nome: t.unidadeGestora.nome,
          sigla: t.unidadeGestora.sigla,
        },
      })),
      meta: toMeta(total, page, pageSize),
      totals: {
        valorPrevisto: decimalToNumber(agg._sum.valorPrevisto),
        valorRealizado: decimalToNumber(agg._sum.valorRealizado),
        valorEmpenhado: decimalToNumber(agg._sum.valorEmpenhado),
        valorLiquidado: decimalToNumber(agg._sum.valorLiquidado),
        valorPago: decimalToNumber(agg._sum.valorPago),
      },
    };
  }

  async summary(query: TransferenciasQueryDto) {
    const where = {
      ...(query.tipo ? { tipo: query.tipo } : {}),
      ...(query.ano ? { ano: query.ano } : {}),
      ...(query.mes ? { mes: query.mes } : {}),
    };

    const [count, agg] = await this.prisma.$transaction([
      this.prisma.transferencia.count({ where }),
      this.prisma.transferencia.aggregate({
        where,
        _sum: {
          valorPrevisto: true,
          valorRealizado: true,
          valorPago: true,
        },
      }),
    ]);

    return {
      totalRegistros: count,
      valorPrevisto: decimalToNumber(agg._sum.valorPrevisto),
      valorRealizado: decimalToNumber(agg._sum.valorRealizado),
      valorPago: decimalToNumber(agg._sum.valorPago),
    };
  }
}

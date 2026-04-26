import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ObrasQueryDto } from './dto/obras-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class ObrasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ObrasQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.status && query.status !== 'todas'
        ? { status: query.status }
        : {}),
      ...(query.municipio
        ? {
            municipio: {
              contains: query.municipio,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(query.categoria
        ? {
            categoria: {
              contains: query.categoria,
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
                municipio: { contains: query.q, mode: 'insensitive' as const },
              },
            ],
          }
        : {}),
    };

    const orderByMap: Record<string, object> = {
      valorTotal: { valorTotal: query.sortOrder ?? 'desc' },
      percentualExecucao: { percentualExecucao: query.sortOrder ?? 'desc' },
      dataPrevisaoFim: { dataPrevisaoFim: query.sortOrder ?? 'asc' },
      createdAt: { createdAt: query.sortOrder ?? 'desc' },
    };

    const orderBy = orderByMap[query.sortBy ?? 'createdAt'] ?? {
      createdAt: 'desc' as const,
    };

    const [itemsRaw, total, stats] = await this.prisma.$transaction([
      this.prisma.obra.findMany({
        where,
        include: {
          credor: { select: { nome: true } },
          unidadeGestora: { select: { nome: true, sigla: true } },
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.obra.count({ where }),
      this.prisma.obra.findMany({
        where,
        select: {
          status: true,
          valorTotal: true,
        },
      }),
    ]);

    const items = itemsRaw.map((obra) => ({
      id: obra.id,
      descricao: obra.descricao,
      categoria: obra.categoria,
      status: obra.status,
      percentualExecucao: obra.percentualExecucao ?? 0,
      valorTotal: decimalToNumber(obra.valorTotal),
      municipio: obra.municipio,
      dataPrevisaoFim: obra.dataPrevisaoFim,
      credorNome: obra.credor?.nome ?? null,
      unidadeGestora: {
        nome: obra.unidadeGestora.nome,
        sigla: obra.unidadeGestora.sigla,
      },
    }));

    const emAndamento = stats.filter((o) => o.status === 'em_andamento').length;
    const concluidas = stats.filter((o) => o.status === 'concluida').length;
    const atrasadas = stats.filter((o) => o.status === 'paralisada').length;
    const investimentoTotal = stats.reduce(
      (acc, curr) => acc + decimalToNumber(curr.valorTotal),
      0,
    );
    const totalObras = stats.length || 1;
    const pctNoPrazo = Math.round(
      ((emAndamento + concluidas) / totalObras) * 100,
    );

    return {
      items,
      meta: toMeta(total, page, pageSize),
      totals: {
        obrasAtivas: emAndamento,
        investimentoTotal,
        pctNoPrazo,
        atrasadas,
      },
    };
  }

  async summary() {
    const stats = await this.prisma.obra.findMany({
      select: {
        status: true,
        valorTotal: true,
      },
    });

    const obrasAtivas = stats.filter((o) => o.status === 'em_andamento').length;
    const concluidas = stats.filter((o) => o.status === 'concluida').length;
    const atrasadas = stats.filter((o) => o.status === 'paralisada').length;

    const investimentoAtivo = stats
      .filter((o) => o.status !== 'concluida')
      .reduce((acc, curr) => acc + decimalToNumber(curr.valorTotal), 0);

    const total = stats.length || 1;
    const pctNoPrazo = Math.round(((obrasAtivas + concluidas) / total) * 100);

    return {
      obrasAtivas,
      investimentoAtivo,
      pctNoPrazo,
      atrasadas,
    };
  }
}

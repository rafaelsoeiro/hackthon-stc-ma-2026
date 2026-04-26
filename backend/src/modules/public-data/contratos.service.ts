import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContratosQueryDto } from './dto/contratos-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class ContratosService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ContratosQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.ano ? { ano: query.ano } : {}),
      ...(query.status
        ? { status: { equals: query.status, mode: 'insensitive' as const } }
        : {}),
      ...(query.tipo && query.tipo !== 'Todos'
        ? {
            tipoContratacao: {
              nome: { equals: query.tipo, mode: 'insensitive' as const },
            },
          }
        : {}),
      ...(query.valorMin !== undefined || query.valorMax !== undefined
        ? {
            valorGlobal: {
              ...(query.valorMin !== undefined ? { gte: query.valorMin } : {}),
              ...(query.valorMax !== undefined ? { lte: query.valorMax } : {}),
            },
          }
        : {}),
      ...(query.area
        ? { categoria: { contains: query.area, mode: 'insensitive' as const } }
        : {}),
      ...(query.q
        ? {
            OR: [
              { objeto: { contains: query.q, mode: 'insensitive' as const } },
              { numero: { contains: query.q, mode: 'insensitive' as const } },
              {
                credor: {
                  nome: { contains: query.q, mode: 'insensitive' as const },
                },
              },
            ],
          }
        : {}),
    };

    const orderByMap: Record<string, object> = {
      valorGlobal: { valorGlobal: query.sortOrder ?? 'desc' },
      dataAssinatura: { dataAssinatura: query.sortOrder ?? 'desc' },
      ano: { ano: query.sortOrder ?? 'desc' },
      createdAt: { createdAt: query.sortOrder ?? 'desc' },
    };
    const orderBy = orderByMap[query.sortBy ?? 'createdAt'] ?? {
      createdAt: 'desc' as const,
    };

    const [itemsRaw, total, stats] = await this.prisma.$transaction([
      this.prisma.contrato.findMany({
        where,
        include: {
          unidadeGestora: { select: { nome: true, sigla: true } },
          credor: { select: { nome: true } },
          tipoContratacao: { select: { nome: true } },
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.contrato.count({ where }),
      this.prisma.contrato.findMany({
        where,
        select: {
          valorGlobal: true,
          status: true,
          credorId: true,
          tipoContratacao: { select: { nome: true } },
        },
      }),
    ]);

    const items = itemsRaw.map((c) => ({
      id: c.id,
      numero: c.numero,
      ano: c.ano,
      objeto: c.objeto,
      dataAssinatura: c.dataAssinatura,
      valorGlobal: decimalToNumber(c.valorGlobal),
      inicioVigencia: c.inicioVigencia,
      fimVigencia: c.fimVigencia,
      status: c.status,
      categoria: c.categoria,
      orgao: c.unidadeGestora.sigla ?? c.unidadeGestora.nome,
      fornecedor: c.credor?.nome ?? null,
      tipo: c.tipoContratacao?.nome ?? c.origem ?? 'Nao informado',
      modalidade: c.tipoContratacao?.nome ?? null,
    }));

    const valorTotalContratado = stats.reduce(
      (acc, item) => acc + decimalToNumber(item.valorGlobal),
      0,
    );
    const contratosAtivos = stats.filter(
      (c) => (c.status ?? '').toLowerCase() === 'ativo',
    ).length;
    const fornecedoresUnicos = new Set(
      stats.map((c) => c.credorId).filter(Boolean),
    ).size;
    const comLicitacao = stats.filter(
      (c) => c.tipoContratacao?.nome === 'Licitacao',
    ).length;
    const percentualComLicitacao = stats.length
      ? Math.round((comLicitacao / stats.length) * 100)
      : 0;

    const distribuicaoPorTipoMap = new Map<string, number>();
    for (const item of stats) {
      const key = item.tipoContratacao?.nome ?? 'Nao informado';
      distribuicaoPorTipoMap.set(
        key,
        (distribuicaoPorTipoMap.get(key) ?? 0) + 1,
      );
    }

    const distribuicaoPorTipo = Array.from(
      distribuicaoPorTipoMap.entries(),
    ).map(([tipo, quantidade]) => ({
      tipo,
      quantidade,
    }));

    return {
      items,
      meta: toMeta(total, page, pageSize),
      totals: {
        valorTotalContratado,
        contratosAtivos,
        percentualComLicitacao,
        fornecedoresUnicos,
        distribuicaoPorTipo,
      },
    };
  }

  async summary() {
    const stats = await this.prisma.contrato.findMany({
      select: {
        valorGlobal: true,
        status: true,
        credorId: true,
        tipoContratacao: { select: { nome: true } },
      },
    });

    const valorTotalContratado = stats.reduce(
      (acc, item) => acc + decimalToNumber(item.valorGlobal),
      0,
    );
    const contratosAtivos = stats.filter(
      (c) => (c.status ?? '').toLowerCase() === 'ativo',
    ).length;
    const fornecedoresUnicos = new Set(
      stats.map((c) => c.credorId).filter(Boolean),
    ).size;
    const comLicitacao = stats.filter(
      (c) => c.tipoContratacao?.nome === 'Licitacao',
    ).length;

    const percentualComLicitacao = stats.length
      ? Math.round((comLicitacao / stats.length) * 100)
      : 0;

    const distribuicaoPorTipoMap = new Map<string, number>();
    for (const item of stats) {
      const key = item.tipoContratacao?.nome ?? 'Nao informado';
      distribuicaoPorTipoMap.set(
        key,
        (distribuicaoPorTipoMap.get(key) ?? 0) + 1,
      );
    }

    const distribuicaoPorTipo = Array.from(
      distribuicaoPorTipoMap.entries(),
    ).map(([tipo, quantidade]) => ({
      tipo,
      quantidade,
    }));

    return {
      valorTotalContratado,
      contratosAtivos,
      percentualComLicitacao,
      fornecedoresUnicos,
      distribuicaoPorTipo,
    };
  }

  async guidedSearch(query: ContratosQueryDto) {
    return this.list(query);
  }
}

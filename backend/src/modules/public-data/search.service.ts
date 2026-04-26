import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

type SearchType =
  | 'despesas'
  | 'receitas'
  | 'obras'
  | 'contratos'
  | 'servidores'
  | 'programas'
  | 'transferencias'
  | 'emendas';

type SearchItem = {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  route: string;
  tags: string[];
  score: number;
  date?: Date | null;
};

type DespesaSearchRow = Prisma.DespesaGetPayload<{
  select: {
    id: true;
    descricao: true;
    codigoEmpenho: true;
    categoria: true;
    programa: true;
    dataEmissao: true;
    valorPago: true;
    valorLiquidado: true;
  };
}>;

type ReceitaSearchRow = Prisma.ReceitaGetPayload<{
  select: {
    id: true;
    descricao: true;
    codigo: true;
    categoria: true;
    naturezaReceita: true;
  };
}>;

type ObraSearchRow = Prisma.ObraGetPayload<{
  select: {
    id: true;
    descricao: true;
    municipio: true;
    status: true;
    categoria: true;
    dataAtualizacao: true;
  };
}>;

type ContratoSearchRow = Prisma.ContratoGetPayload<{
  select: {
    id: true;
    objeto: true;
    numero: true;
    categoria: true;
    ano: true;
    dataAssinatura: true;
  };
}>;

type ServidorSearchRow = Prisma.ServidorGetPayload<{
  select: {
    id: true;
    nome: true;
    matricula: true;
  };
}>;

type TransferenciaSearchRow = Prisma.TransferenciaGetPayload<{
  select: {
    id: true;
    descricao: true;
    tipo: true;
    ano: true;
    mes: true;
    categoria: true;
    programa: true;
    valorRealizado: true;
    valorPago: true;
  };
}>;

type EmendaSearchRow = Prisma.EmendaParlamentarGetPayload<{
  select: {
    id: true;
    descricao: true;
    numeroEmpenho: true;
    categoria: true;
    programa: true;
    dataEmissao: true;
    valorPago: true;
    valorLiquidado: true;
  };
}>;

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: SearchQueryDto) {
    const { page, pageSize } = getPagination(query.page, query.pageSize);
    const normalizedQ = (query.q ?? '').trim();

    const selectedTypes = this.parseTypes(query.types);
    const requiresProgramInputs = selectedTypes.has('programas');
    const rawLimit = Math.min(pageSize * 3, 100);

    const loadDespesas = (): Promise<DespesaSearchRow[]> => {
      if (!(selectedTypes.has('despesas') || requiresProgramInputs)) {
        return Promise.resolve([]);
      }
      return this.prisma.despesa.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ descricao: true }, { codigoEmpenho: true }],
          query.ano
            ? {
                dataEmissao: {
                  gte: new Date(`${query.ano}-01-01`),
                  lte: new Date(`${query.ano}-12-31`),
                },
              }
            : undefined,
        ),
        select: {
          id: true,
          descricao: true,
          codigoEmpenho: true,
          categoria: true,
          programa: true,
          dataEmissao: true,
          valorPago: true,
          valorLiquidado: true,
        },
        take: rawLimit,
        orderBy: { dataEmissao: 'desc' },
      });
    };

    const loadReceitas = (): Promise<ReceitaSearchRow[]> => {
      if (!selectedTypes.has('receitas')) return Promise.resolve([]);
      return this.prisma.receita.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ descricao: true }, { codigo: true }],
          query.ano ? { ano: query.ano } : undefined,
        ),
        select: {
          id: true,
          descricao: true,
          codigo: true,
          categoria: true,
          naturezaReceita: true,
        },
        take: rawLimit,
        orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
      });
    };

    const loadObras = (): Promise<ObraSearchRow[]> => {
      if (!selectedTypes.has('obras')) return Promise.resolve([]);
      return this.prisma.obra.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ descricao: true }, { municipio: true }],
          query.municipio
            ? {
                municipio: {
                  contains: query.municipio,
                  mode: 'insensitive' as const,
                },
              }
            : undefined,
        ),
        select: {
          id: true,
          descricao: true,
          municipio: true,
          status: true,
          categoria: true,
          dataAtualizacao: true,
        },
        take: rawLimit,
        orderBy: { createdAt: 'desc' },
      });
    };

    const loadContratos = (): Promise<ContratoSearchRow[]> => {
      if (!selectedTypes.has('contratos')) return Promise.resolve([]);
      return this.prisma.contrato.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ objeto: true }, { numero: true }],
          query.ano ? { ano: query.ano } : undefined,
        ),
        select: {
          id: true,
          objeto: true,
          numero: true,
          categoria: true,
          ano: true,
          dataAssinatura: true,
        },
        take: rawLimit,
        orderBy: { createdAt: 'desc' },
      });
    };

    const loadServidores = (): Promise<ServidorSearchRow[]> => {
      if (!selectedTypes.has('servidores')) return Promise.resolve([]);
      return this.prisma.servidor.findMany({
        where: this.buildTextWhere(normalizedQ, [
          { nome: true },
          { matricula: true },
        ]),
        select: {
          id: true,
          nome: true,
          matricula: true,
        },
        take: rawLimit,
        orderBy: { id: 'desc' },
      });
    };

    const loadTransferencias = (): Promise<TransferenciaSearchRow[]> => {
      if (!(selectedTypes.has('transferencias') || requiresProgramInputs)) {
        return Promise.resolve([]);
      }
      return this.prisma.transferencia.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ descricao: true }, { programa: true }],
          query.ano ? { ano: query.ano } : undefined,
        ),
        select: {
          id: true,
          descricao: true,
          tipo: true,
          ano: true,
          mes: true,
          categoria: true,
          programa: true,
          valorRealizado: true,
          valorPago: true,
        },
        take: rawLimit,
        orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
      });
    };

    const loadEmendas = (): Promise<EmendaSearchRow[]> => {
      if (!(selectedTypes.has('emendas') || requiresProgramInputs)) {
        return Promise.resolve([]);
      }
      return this.prisma.emendaParlamentar.findMany({
        where: this.buildTextWhere(
          normalizedQ,
          [{ descricao: true }, { programa: true }, { numeroEmpenho: true }],
          query.ano
            ? {
                dataEmissao: {
                  gte: new Date(`${query.ano}-01-01`),
                  lte: new Date(`${query.ano}-12-31`),
                },
              }
            : undefined,
        ),
        select: {
          id: true,
          descricao: true,
          numeroEmpenho: true,
          categoria: true,
          programa: true,
          dataEmissao: true,
          valorPago: true,
          valorLiquidado: true,
        },
        take: rawLimit,
        orderBy: { dataEmissao: 'desc' },
      });
    };

    const [
      despesas,
      receitas,
      obras,
      contratos,
      servidores,
      transferencias,
      emendas,
    ] = await Promise.all([
      loadDespesas(),
      loadReceitas(),
      loadObras(),
      loadContratos(),
      loadServidores(),
      loadTransferencias(),
      loadEmendas(),
    ]);

    const programaMap = new Map<string, number>();
    for (const d of despesas) {
      if (!d.programa) continue;
      programaMap.set(
        d.programa,
        (programaMap.get(d.programa) ?? 0) +
          decimalToNumber(d.valorPago ?? d.valorLiquidado),
      );
    }
    for (const t of transferencias) {
      if (!t.programa) continue;
      programaMap.set(
        t.programa,
        (programaMap.get(t.programa) ?? 0) +
          decimalToNumber(t.valorRealizado ?? t.valorPago),
      );
    }
    for (const e of emendas) {
      if (!e.programa) continue;
      programaMap.set(
        e.programa,
        (programaMap.get(e.programa) ?? 0) +
          decimalToNumber(e.valorPago ?? e.valorLiquidado),
      );
    }

    const merged: SearchItem[] = [
      ...(selectedTypes.has('despesas')
        ? despesas.map((d) =>
            this.toItem(
              'despesas',
              String(d.id),
              d.descricao,
              `Empenho ${d.codigoEmpenho ?? 'N/A'}`,
              '/dados',
              [d.categoria ?? 'despesa', d.programa ?? 'programa'],
              normalizedQ,
              d.dataEmissao,
            ),
          )
        : []),
      ...(selectedTypes.has('receitas')
        ? receitas.map((r) =>
            this.toItem(
              'receitas',
              String(r.id),
              r.descricao,
              `Receita ${r.codigo ?? 'N/A'}`,
              '/dados',
              [r.categoria ?? 'receita', r.naturezaReceita],
              normalizedQ,
            ),
          )
        : []),
      ...(selectedTypes.has('obras')
        ? obras.map((o) =>
            this.toItem(
              'obras',
              String(o.id),
              o.descricao,
              `${o.municipio} · ${o.status}`,
              '/obras',
              [o.categoria ?? 'obra', o.municipio],
              normalizedQ,
              o.dataAtualizacao,
            ),
          )
        : []),
      ...(selectedTypes.has('contratos')
        ? contratos.map((c) =>
            this.toItem(
              'contratos',
              String(c.id),
              c.objeto,
              `Contrato ${c.numero}`,
              '/contratos',
              [c.categoria ?? 'contrato', String(c.ano)],
              normalizedQ,
              c.dataAssinatura,
            ),
          )
        : []),
      ...(selectedTypes.has('servidores')
        ? servidores.map((s) =>
            this.toItem(
              'servidores',
              String(s.id),
              s.nome,
              `Matricula: ${s.matricula ?? 'N/A'}`,
              '/pessoas',
              ['servidor', 'remuneracao'],
              normalizedQ,
            ),
          )
        : []),
      ...(selectedTypes.has('programas')
        ? Array.from(programaMap.entries()).map(([nome, valor], idx) =>
            this.toItem(
              'programas',
              `programa-${idx}`,
              nome,
              `Investimento aproximado: R$ ${valor.toFixed(2)}`,
              '/programas',
              ['programa', 'social'],
              normalizedQ,
            ),
          )
        : []),
      ...(selectedTypes.has('transferencias')
        ? transferencias.map((t) =>
            this.toItem(
              'transferencias',
              String(t.id),
              t.descricao ?? 'Transferencia',
              `${t.tipo} · ${t.ano}/${t.mes ?? '-'}`,
              '/dados',
              [t.categoria ?? 'transferencia', t.programa ?? 'programa'],
              normalizedQ,
            ),
          )
        : []),
      ...(selectedTypes.has('emendas')
        ? emendas.map((e) =>
            this.toItem(
              'emendas',
              String(e.id),
              e.descricao ?? 'Emenda parlamentar',
              `Empenho ${e.numeroEmpenho}`,
              '/dados',
              [e.categoria ?? 'emenda', e.programa ?? 'programa'],
              normalizedQ,
              e.dataEmissao,
            ),
          )
        : []),
    ];

    const sorted = merged.sort((a, b) => b.score - a.score);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = sorted.slice(start, end);

    const byTypeMap = new Map<string, number>();
    for (const item of sorted) {
      byTypeMap.set(item.type, (byTypeMap.get(item.type) ?? 0) + 1);
    }

    return {
      items,
      meta: toMeta(sorted.length, page, pageSize),
      aggregations: {
        byType: Array.from(byTypeMap.entries()).map(([type, count]) => ({
          type,
          count,
        })),
      },
    };
  }

  async summary(query: SearchQueryDto) {
    const result = await this.search(query);

    const distribution = result.aggregations.byType.map((item) => ({
      category: item.type,
      value: item.count,
      percent: result.meta.total
        ? Math.round((item.count / result.meta.total) * 100)
        : 0,
    }));

    return {
      distribution,
      monthlySeries: [],
      highlights: result.items.slice(0, 5).map((item) => ({
        title: item.title,
        type: item.type,
        score: item.score,
      })),
    };
  }

  private parseTypes(rawTypes?: string): Set<SearchType> {
    const allTypes: SearchType[] = [
      'despesas',
      'receitas',
      'obras',
      'contratos',
      'servidores',
      'programas',
      'transferencias',
      'emendas',
    ];

    if (!rawTypes) return new Set(allTypes);

    const selected = rawTypes
      .split(',')
      .map((type) => type.trim().toLowerCase())
      .filter((type): type is SearchType =>
        allTypes.includes(type as SearchType),
      );

    return new Set(selected.length > 0 ? selected : allTypes);
  }

  private buildTextWhere(
    q: string,
    fields: Array<Record<string, boolean>>,
    extraWhere?: Record<string, unknown>,
  ): Record<string, unknown> {
    const base: Record<string, unknown> = {
      ...(extraWhere ?? {}),
    };

    if (!q) return base;

    const or = fields.map((field) => {
      const fieldName = Object.keys(field)[0];
      return {
        [fieldName]: { contains: q, mode: 'insensitive' },
      };
    });

    return {
      ...base,
      OR: or,
    };
  }

  private toItem(
    type: SearchType,
    id: string,
    title: string,
    description: string,
    route: string,
    tags: string[],
    q: string,
    date?: Date | null,
  ): SearchItem {
    const score = this.scoreText(
      `${title} ${description} ${tags.join(' ')}`,
      q,
    );

    return {
      id,
      type,
      title,
      description,
      route,
      tags: tags.filter(Boolean),
      score,
      date,
    };
  }

  private scoreText(text: string, query: string): number {
    if (!query) return 1;

    const normalizedText = this.normalize(text);
    const normalizedQuery = this.normalize(query);

    if (normalizedText === normalizedQuery) return 100;
    if (normalizedText.startsWith(normalizedQuery)) return 80;
    if (normalizedText.includes(normalizedQuery)) return 60;

    const tokens = normalizedQuery.split(' ').filter(Boolean);
    const matchedTokens = tokens.filter((token) =>
      normalizedText.includes(token),
    ).length;

    return matchedTokens > 0 ? 20 + matchedTokens * 10 : 0;
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProgramasQueryDto } from './dto/programas-query.dto';
import { getPagination, toMeta } from './utils/pagination.util';

type ProgramaDerivado = {
  nome: string;
  investimentoTotal: number;
  fontes: Set<'Emenda' | 'Transferencia' | 'RecursoProprio'>;
  secretarias: Set<string>;
  status: 'ativo';
};

type ProgramaMeta = {
  nome: string;
  descricao: string | null;
  detalhe: string | null;
  secretaria: string | null;
  status: string;
  beneficiados: number | null;
  municipiosCobertos: number | null;
};

@Injectable()
export class ProgramasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProgramasQueryDto) {
    const { page, pageSize } = getPagination(query.page, query.pageSize);

    const [despesas, transferencias, emendas, catalogo] = await Promise.all([
      this.prisma.despesa.findMany({
        where: {
          ...(query.ano
            ? {
                dataEmissao: {
                  gte: new Date(`${query.ano}-01-01`),
                  lte: new Date(`${query.ano}-12-31`),
                },
              }
            : {}),
          ...(query.q
            ? { programa: { contains: query.q, mode: 'insensitive' as const } }
            : {}),
        },
        select: {
          programa: true,
          valorPago: true,
          valorLiquidado: true,
          unidadeGestora: { select: { sigla: true, nome: true } },
        },
      }),
      this.prisma.transferencia.findMany({
        where: {
          ...(query.ano ? { ano: query.ano } : {}),
          ...(query.q
            ? { programa: { contains: query.q, mode: 'insensitive' as const } }
            : {}),
        },
        select: {
          programa: true,
          valorPago: true,
          valorRealizado: true,
          unidadeGestora: { select: { sigla: true, nome: true } },
        },
      }),
      this.prisma.emendaParlamentar.findMany({
        where: {
          ...(query.ano
            ? {
                dataEmissao: {
                  gte: new Date(`${query.ano}-01-01`),
                  lte: new Date(`${query.ano}-12-31`),
                },
              }
            : {}),
          ...(query.q
            ? { programa: { contains: query.q, mode: 'insensitive' as const } }
            : {}),
        },
        select: {
          programa: true,
          valorPago: true,
          valorLiquidado: true,
          unidadeGestora: { select: { sigla: true, nome: true } },
        },
      }),
      this.prisma.programaSocial.findMany({
        select: {
          nome: true,
          descricao: true,
          detalhe: true,
          secretaria: true,
          status: true,
          beneficiados: true,
          municipiosCobertos: true,
        },
      }),
    ]);

    const map = new Map<string, ProgramaDerivado>();

    const ensure = (programa: string) => {
      if (!map.has(programa)) {
        map.set(programa, {
          nome: programa,
          investimentoTotal: 0,
          fontes: new Set(),
          secretarias: new Set(),
          status: 'ativo',
        });
      }
      return map.get(programa)!;
    };

    for (const d of despesas) {
      if (!d.programa) continue;
      const item = ensure(d.programa);
      item.investimentoTotal += Number(d.valorPago ?? d.valorLiquidado ?? 0);
      item.fontes.add('RecursoProprio');
      item.secretarias.add(d.unidadeGestora.sigla ?? d.unidadeGestora.nome);
    }

    for (const t of transferencias) {
      if (!t.programa) continue;
      const item = ensure(t.programa);
      item.investimentoTotal += Number(t.valorRealizado ?? t.valorPago ?? 0);
      item.fontes.add('Transferencia');
      item.secretarias.add(t.unidadeGestora.sigla ?? t.unidadeGestora.nome);
    }

    for (const e of emendas) {
      if (!e.programa) continue;
      const item = ensure(e.programa);
      item.investimentoTotal += Number(e.valorPago ?? e.valorLiquidado ?? 0);
      item.fontes.add('Emenda');
      item.secretarias.add(e.unidadeGestora.sigla ?? e.unidadeGestora.nome);
    }

    let derived = Array.from(map.values());

    const catalogoMap = new Map<string, ProgramaMeta>();
    for (const item of catalogo) {
      catalogoMap.set(this.normalizeKey(item.nome), item);
    }

    if (query.origem) {
      derived = derived.filter((p) =>
        p.fontes.has(this.normalizeOrigem(query.origem)),
      );
    }

    if (query.status) {
      const normalizedStatus = query.status.toLowerCase();
      derived = derived.filter((p) => {
        const catalogItem = catalogoMap.get(this.normalizeKey(p.nome));
        const status = (catalogItem?.status ?? p.status).toLowerCase();
        return status === normalizedStatus;
      });
    }

    derived.sort((a, b) => b.investimentoTotal - a.investimentoTotal);

    const total = derived.length;
    const start = (page - 1) * pageSize;
    const items = derived.slice(start, start + pageSize).map((p, idx) => {
      const catalogItem = catalogoMap.get(this.normalizeKey(p.nome));
      const secretariaDerivada =
        Array.from(p.secretarias)[0] ?? 'Nao informado';
      return {
        id: `${p.nome.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
        nome: p.nome,
        secretaria: catalogItem?.secretaria ?? secretariaDerivada,
        beneficiados: catalogItem?.beneficiados ?? null,
        investimento: p.investimentoTotal,
        origens: Array.from(p.fontes),
        municipios: catalogItem?.municipiosCobertos ?? null,
        status: (catalogItem?.status ?? p.status).toLowerCase(),
        descricao: catalogItem?.descricao ?? null,
        detalhe: catalogItem?.detalhe ?? null,
      };
    });

    const investimentoTotal = derived.reduce(
      (acc, p) => acc + p.investimentoTotal,
      0,
    );
    const beneficiadosTotal = items.reduce(
      (acc, item) => acc + (item.beneficiados ?? 0),
      0,
    );
    const municipiosCobertos = Math.max(
      0,
      ...items.map((item) => item.municipios ?? 0),
    );

    return {
      items,
      meta: toMeta(total, page, pageSize),
      totals: {
        programasAtivos: total,
        investimentoTotal,
        beneficiadosTotal,
        municipiosCobertos,
      },
    };
  }

  async summary(query: ProgramasQueryDto) {
    const list = await this.list({ ...query, page: 1, pageSize: 1000 });

    return {
      programasAtivos: list.totals.programasAtivos,
      investimentoTotal: list.totals.investimentoTotal,
      beneficiadosTotal: list.totals.beneficiadosTotal,
      municipiosCobertos: list.totals.municipiosCobertos,
    };
  }

  private normalizeOrigem(origem: ProgramasQueryDto['origem']) {
    if (origem === 'Transferencia') return 'Transferencia';
    if (origem === 'Emenda') return 'Emenda';
    return 'RecursoProprio';
  }

  private normalizeKey(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}

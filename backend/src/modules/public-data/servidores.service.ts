import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ServidoresQueryDto } from './dto/servidores-query.dto';
import {
  decimalToNumber,
  getPagination,
  toMeta,
} from './utils/pagination.util';

@Injectable()
export class ServidoresService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ServidoresQueryDto) {
    const { page, pageSize, skip, take } = getPagination(
      query.page,
      query.pageSize,
    );

    const where = {
      ...(query.q
        ? {
            OR: [
              { nome: { contains: query.q, mode: 'insensitive' as const } },
              { cpf: { contains: query.q, mode: 'insensitive' as const } },
              {
                matricula: { contains: query.q, mode: 'insensitive' as const },
              },
            ],
          }
        : {}),
      ...(query.unidadeGestoraId ||
      query.ano ||
      query.mes ||
      query.cargo ||
      query.naturezaCargo
        ? {
            remuneracoes: {
              some: {
                ...(query.unidadeGestoraId
                  ? { unidadeGestoraId: query.unidadeGestoraId }
                  : {}),
                ...(query.ano ? { ano: query.ano } : {}),
                ...(query.mes ? { mes: query.mes } : {}),
                ...(query.cargo
                  ? {
                      cargo: {
                        contains: query.cargo,
                        mode: 'insensitive' as const,
                      },
                    }
                  : {}),
                ...(query.naturezaCargo
                  ? {
                      naturezaCargo: {
                        contains: query.naturezaCargo,
                        mode: 'insensitive' as const,
                      },
                    }
                  : {}),
              },
            },
          }
        : {}),
    };

    const [itemsRaw, total] = await this.prisma.$transaction([
      this.prisma.servidor.findMany({
        where,
        include: {
          remuneracoes: {
            where: {
              ...(query.ano ? { ano: query.ano } : {}),
              ...(query.mes ? { mes: query.mes } : {}),
              ...(query.unidadeGestoraId
                ? { unidadeGestoraId: query.unidadeGestoraId }
                : {}),
            },
            include: {
              unidadeGestora: { select: { nome: true, sigla: true } },
            },
            orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
          },
        },
        orderBy: { nome: 'asc' },
        skip,
        take,
      }),
      this.prisma.servidor.count({ where }),
    ]);

    const items = itemsRaw.map((servidor) => {
      const remuneracaoAtual = servidor.remuneracoes[0] ?? null;
      const remuneracaoMedia =
        servidor.remuneracoes.length > 0
          ? servidor.remuneracoes.reduce(
              (acc, r) => acc + decimalToNumber(r.valor),
              0,
            ) / servidor.remuneracoes.length
          : 0;

      return {
        id: servidor.id,
        nome: servidor.nome,
        cpf: servidor.cpf,
        matricula: servidor.matricula,
        remuneracaoAtual: remuneracaoAtual
          ? {
              ano: remuneracaoAtual.ano,
              mes: remuneracaoAtual.mes,
              valor: decimalToNumber(remuneracaoAtual.valor),
              cargo: remuneracaoAtual.cargo,
              naturezaCargo: remuneracaoAtual.naturezaCargo,
              categoria: remuneracaoAtual.categoria,
              unidadeGestora: {
                nome: remuneracaoAtual.unidadeGestora.nome,
                sigla: remuneracaoAtual.unidadeGestora.sigla,
              },
            }
          : null,
        remuneracaoMedia,
      };
    });

    return {
      items,
      meta: toMeta(total, page, pageSize),
    };
  }

  async summary(query: ServidoresQueryDto) {
    const remuneracoesWhere = {
      ...(query.ano ? { ano: query.ano } : {}),
      ...(query.mes ? { mes: query.mes } : {}),
      ...(query.unidadeGestoraId
        ? { unidadeGestoraId: query.unidadeGestoraId }
        : {}),
    };

    const [totalServidores, remuneracaoAgg, categoriasRows] =
      await this.prisma.$transaction([
        this.prisma.servidor.count({
          where: {
            ...(Object.keys(remuneracoesWhere).length > 0
              ? {
                  remuneracoes: {
                    some: remuneracoesWhere,
                  },
                }
              : {}),
          },
        }),
        this.prisma.remuneracao.aggregate({
          where: remuneracoesWhere,
          _sum: { valor: true },
          _avg: { valor: true },
        }),
        this.prisma.remuneracao.findMany({
          where: remuneracoesWhere,
          select: { categoria: true },
        }),
      ]);

    const categoriaMap = new Map<string, number>();
    for (const row of categoriasRows) {
      const categoria = row.categoria ?? 'Nao informado';
      categoriaMap.set(categoria, (categoriaMap.get(categoria) ?? 0) + 1);
    }

    return {
      totalServidores,
      folhaTotal: decimalToNumber(remuneracaoAgg._sum.valor),
      remuneracaoMedia: decimalToNumber(remuneracaoAgg._avg.valor),
      distribuicaoCategoria: Array.from(categoriaMap.entries()).map(
        ([categoria, quantidade]) => ({
          categoria,
          quantidade,
        }),
      ),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UnidadesGestorasQueryDto } from './dto/unidades-gestoras-query.dto';

@Injectable()
export class UnidadesGestorasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: UnidadesGestorasQueryDto) {
    const limit = query.limit ?? 12;

    const items = await this.prisma.unidadeGestora.findMany({
      where: {
        ...(query.q
          ? {
              OR: [
                { nome: { contains: query.q, mode: 'insensitive' as const } },
                { sigla: { contains: query.q, mode: 'insensitive' as const } },
                { codigo: { contains: query.q, mode: 'insensitive' as const } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        codigo: true,
        nome: true,
        sigla: true,
      },
      orderBy: [{ nome: 'asc' }],
      take: limit,
    });

    return {
      items,
      meta: {
        total: items.length,
        limit,
        query: query.q ?? '',
      },
    };
  }
}

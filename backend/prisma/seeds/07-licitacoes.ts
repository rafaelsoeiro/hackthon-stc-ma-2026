import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedLicitacoes(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true, codigo: true } });
  const tipos = await prisma.tipoContratacao.findMany({ select: { id: true } });
  if (unidades.length === 0 || tipos.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora/tipoContratacao vazios.');

  const licitacoes: Prisma.LicitacaoCreateManyInput[] = [];
  for (const unidade of unidades) {
    for (let j = 0; j < 12; j++) {
      const ano = 2020 + (j % 6);
      licitacoes.push({
        numeroProcesso: `${unidade.codigo}-${String(j + 1).padStart(4, '0')}/${ano}`,
        descricao: pick(['Aquisicao de medicamentos', 'Contratacao de limpeza urbana', 'Material didatico escolar', 'Reforma de unidade de saude']),
        ano,
        dataPublicacao: new Date(`${ano}-02-10`),
        dataAbertura: new Date(`${ano}-03-10`),
        status: pick(['aberta', 'homologada', 'fracassada']),
        valorEstimado: new Prisma.Decimal(rand(30_000, 3_500_000).toFixed(2)),
        valorHomologado: new Prisma.Decimal(rand(25_000, 3_000_000).toFixed(2)),
        prazoEntrega: pick(['30 dias', '60 dias', '90 dias']),
        localEntrega: pick(['Sao Luis', 'Imperatriz', 'Caxias', 'Bacabal']),
        categoria: pick(['Saude', 'Educacao', 'Infraestrutura']),
        unidadeGestoraId: unidade.id,
        tipoContratacaoId: pick(tipos).id,
        createdAt: new Date(),
      });
    }
  }
  await prisma.licitacao.createMany({ data: licitacoes });
}

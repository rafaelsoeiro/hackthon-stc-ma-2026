import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedServidoresRemuneracoes(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const servidores: Prisma.ServidorCreateManyInput[] = [];
  for (let i = 0; i < 1200; i++) {
    servidores.push({ nome: `Servidor ${String(i + 1).padStart(4, '0')}`, cpf: `${20000000000 + i}`, matricula: `MAT-${String(i + 1).padStart(6, '0')}` });
  }
  await prisma.servidor.createMany({ data: servidores });

  const servidoresDb = await prisma.servidor.findMany({ select: { id: true } });
  const remuneracoes: Prisma.RemuneracaoCreateManyInput[] = [];
  for (const [index, servidor] of servidoresDb.entries()) {
    const unidade = unidades[index % unidades.length];
    for (const ano of [2025, 2026]) {
      for (let mes = 1; mes <= 12; mes++) {
        remuneracoes.push({
          ano,
          mes,
          valor: new Prisma.Decimal(rand(2_200, 18_000).toFixed(2)),
          cargo: pick(['Analista', 'Tecnico', 'Professor', 'Enfermeiro', 'Assistente']),
          naturezaCargo: pick(['Efetivo', 'Comissionado', 'Temporario']),
          categoria: pick(['Saude', 'Educacao', 'Administrativo']),
          unidadeGestoraId: unidade.id,
          servidorId: servidor.id,
          createdAt: new Date(),
        });
      }
    }
    if (remuneracoes.length >= 1000) {
      await prisma.remuneracao.createMany({ data: remuneracoes });
      remuneracoes.length = 0;
    }
  }
  if (remuneracoes.length > 0) await prisma.remuneracao.createMany({ data: remuneracoes });
}

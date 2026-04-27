import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedReceitas(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const batch: Prisma.ReceitaCreateManyInput[] = [];
  for (const [uIndex, unidade] of unidades.entries()) {
    for (let j = 0; j < 72; j++) {
      const ano = 2020 + ((j + uIndex) % 7);
      const mes = 1 + ((j + uIndex) % 12);
      const previsto = new Prisma.Decimal(rand(5_000, 1_500_000).toFixed(2));
      const realizado = new Prisma.Decimal(previsto.mul(new Prisma.Decimal(rand(0.6, 1.3).toFixed(4))).toFixed(2));
      batch.push({
        codigo: `R-${ano}-${uIndex + 1}-${String(j + 1).padStart(3, '0')}`,
        descricao: `Receita UG ${uIndex + 1}-${j + 1}`,
        valorPrevisto: previsto,
        valorRealizado: realizado,
        ano,
        mes,
        naturezaReceita: pick(['Receita Corrente', 'Receita de Capital', 'Transferencias Correntes']),
        fonte: pick(['Tesouro', 'Transferencias da Uniao', 'Transferencias do Estado']),
        categoria: pick(['Tributaria', 'Patrimonial', 'Transferencias']),
        unidadeGestoraId: unidade.id,
        createdAt: new Date(),
      });
      if (batch.length >= 500) {
        await prisma.receita.createMany({ data: batch });
        batch.length = 0;
      }
    }
  }
  if (batch.length > 0) await prisma.receita.createMany({ data: batch });
}

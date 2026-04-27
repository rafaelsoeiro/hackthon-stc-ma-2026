import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedTransferencias(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const batch: Prisma.TransferenciaCreateManyInput[] = [];
  for (const unidade of unidades) {
    for (let j = 0; j < 36; j++) {
      const ano = 2020 + (j % 7);
      const mes = 1 + (j % 12);
      const previsto = new Prisma.Decimal(rand(10_000, 2_000_000).toFixed(2));
      const realizado = new Prisma.Decimal(previsto.mul(new Prisma.Decimal(rand(0.6, 1.2).toFixed(4))).toFixed(2));
      batch.push({
        tipo: pick(['recebida', 'realizada']),
        ano,
        mes,
        descricao: pick(['Transferencia constitucional', 'Convenio estadual', 'Apoio financeiro']),
        valorPrevisto: previsto,
        valorRealizado: realizado,
        valorEmpenhado: new Prisma.Decimal(rand(5_000, 800_000).toFixed(2)),
        valorLiquidado: new Prisma.Decimal(rand(5_000, 700_000).toFixed(2)),
        valorPago: new Prisma.Decimal(rand(5_000, 650_000).toFixed(2)),
        natureza: pick(['Corrente', 'Capital']),
        fonte: pick(['Uniao', 'Estado', 'Tesouro']),
        funcao: pick(['Saude', 'Educacao', 'Infraestrutura']),
        programa: pick(['Cidade Melhor', 'Escola Viva', 'Saude em Rede']),
        categoria: pick(['Obrigatoria', 'Voluntaria']),
        unidadeGestoraId: unidade.id,
        createdAt: new Date(),
      });
      if (batch.length >= 500) {
        await prisma.transferencia.createMany({ data: batch });
        batch.length = 0;
      }
    }
  }
  if (batch.length > 0) await prisma.transferencia.createMany({ data: batch });
}

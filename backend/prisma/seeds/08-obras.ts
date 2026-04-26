import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedObras(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true } });
  const credores = await prisma.credor.findMany({ select: { id: true } });
  const contratos = await prisma.contrato.findMany({ select: { id: true, unidadeGestoraId: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const obras: Prisma.ObraCreateManyInput[] = [];
  for (const unidade of unidades) {
    const contratosDaUg = contratos.filter((c) => c.unidadeGestoraId === unidade.id);
    for (let j = 0; j < 8; j++) {
      const valorContrato = new Prisma.Decimal(rand(50_000, 8_000_000).toFixed(2));
      const valorAditivo = new Prisma.Decimal(rand(0, 800_000).toFixed(2));
      const valorTotal = valorContrato.add(valorAditivo);
      obras.push({
        descricao: pick(['Pavimentacao de vias urbanas', 'Construcao de unidade escolar', 'Reforma de hospital municipal', 'Implantacao de drenagem pluvial']),
        status: pick(['em_andamento', 'concluida', 'paralisada']),
        percentualExecucao: Number(rand(5, 100).toFixed(2)),
        dataInicio: new Date(`202${Math.floor(Math.random() * 6)}-01-15`),
        dataPrevisaoFim: new Date(`202${Math.floor(Math.random() * 6)}-12-20`),
        dataAtualizacao: new Date(),
        valorContrato,
        valorAditivo,
        valorTotal,
        saldo: new Prisma.Decimal(valorTotal.mul(new Prisma.Decimal(rand(0.05, 0.5).toFixed(4))).toFixed(2)),
        municipio: pick(['Sao Luis', 'Imperatriz', 'Caxias', 'Timon', 'Balsas']),
        localidade: pick(['Zona Urbana', 'Zona Rural', 'Centro', 'Bairro Novo']),
        categoria: pick(['Mobilidade', 'Saude', 'Educacao', 'Saneamento']),
        unidadeGestoraId: unidade.id,
        credorId: credores.length > 0 ? pick(credores).id : null,
        contratoId: contratosDaUg.length > 0 ? pick(contratosDaUg).id : null,
        createdAt: new Date(),
      });
    }
  }
  await prisma.obra.createMany({ data: obras });
}

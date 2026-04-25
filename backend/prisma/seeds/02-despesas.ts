import { Prisma, PrismaClient } from '../../generated/prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedDespesas(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true } });
  const credores = await prisma.credor.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const batch: Prisma.DespesaCreateManyInput[] = [];
  for (const [uIndex, unidade] of unidades.entries()) {
    for (let j = 0; j < 80; j++) {
      const ano = 2020 + ((j + uIndex) % 6);
      const mes = 1 + ((j + uIndex) % 12);
      const dia = 1 + (j % 28);
      const empenhado = new Prisma.Decimal(rand(1_000, 800_000).toFixed(2));
      const liquidado = new Prisma.Decimal(empenhado.mul(new Prisma.Decimal(rand(0.7, 1).toFixed(4))).toFixed(2));
      const pago = new Prisma.Decimal(liquidado.mul(new Prisma.Decimal(rand(0.7, 1).toFixed(4))).toFixed(2));
      batch.push({
        descricao: `Despesa UG ${uIndex + 1}-${j + 1}`,
        dataEmissao: new Date(`${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        valorEmpenhado: empenhado,
        valorLiquidado: liquidado,
        valorPago: pago,
        naturezaDespesa: pick(['339030', '339039', '449052', '319011']),
        funcao: pick(['Saude', 'Educacao', 'Urbanismo', 'Administracao']),
        subfuncao: pick(['Atencao Basica', 'Ensino Fundamental', 'Infraestrutura', 'Gestao']),
        programa: pick(['Programa Cidade Melhor', 'Saude em Rede', 'Escola Viva']),
        acao: pick(['Aquisicao de insumos', 'Manutencao predial', 'Obras viarias']),
        fonte: pick(['Tesouro', 'Transferencias', 'Convenio']),
        tipoDespesa: pick(['Custeio', 'Investimento', 'Pessoal']),
        categoria: pick(['Saude', 'Educacao', 'Infraestrutura']),
        unidadeGestoraId: unidade.id,
        credorId: credores.length > 0 ? pick(credores).id : null,
        createdAt: new Date(),
      });
      if (batch.length >= 500) {
        await prisma.despesa.createMany({ data: batch });
        batch.length = 0;
      }
    }
  }
  if (batch.length > 0) await prisma.despesa.createMany({ data: batch });
}

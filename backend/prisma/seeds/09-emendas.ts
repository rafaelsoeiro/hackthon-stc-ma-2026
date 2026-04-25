import { Prisma, PrismaClient } from '../../generated/prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.random() * (max - min) + min; }

export async function seedEmendas(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true, codigo: true } });
  const credores = await prisma.credor.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const emendas: Prisma.EmendaParlamentarCreateManyInput[] = [];
  for (const unidade of unidades) {
    for (let j = 0; j < 15; j++) {
      const ano = 2020 + (j % 6);
      const mes = 1 + (j % 12);
      const dia = 1 + (j % 28);
      emendas.push({
        numeroEmpenho: `EMP-${unidade.codigo}-${String(j + 1).padStart(4, '0')}`,
        tipo: pick(['individual', 'bancada', 'comissao']),
        descricao: pick(['Apoio a rede de saude', 'Melhoria de infraestrutura escolar', 'Aquisicao de equipamentos urbanos']),
        dataEmissao: new Date(`${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        valorEmpenhado: new Prisma.Decimal(rand(10_000, 1_200_000).toFixed(2)),
        valorLiquidado: new Prisma.Decimal(rand(8_000, 1_000_000).toFixed(2)),
        valorPago: new Prisma.Decimal(rand(5_000, 900_000).toFixed(2)),
        funcao: pick(['Saude', 'Educacao', 'Urbanismo']),
        subfuncao: pick(['Atencao Basica', 'Ensino Fundamental', 'Infraestrutura Urbana']),
        programa: pick(['Cuidar', 'Escola Viva', 'Cidade Melhor']),
        acao: pick(['Aquisicao de equipamentos', 'Reforma', 'Manutencao']),
        fonte: pick(['Transferencia Especial', 'Tesouro', 'Convenio']),
        naturezaDespesa: pick(['339030', '339039', '449051']),
        processo: `PROC-${unidade.codigo}-${String(j + 1).padStart(4, '0')}`,
        categoria: pick(['Saude', 'Educacao', 'Infraestrutura']),
        unidadeGestoraId: unidade.id,
        credorId: credores.length > 0 ? pick(credores).id : null,
        createdAt: new Date(),
      });
    }
  }
  await prisma.emendaParlamentar.createMany({ data: emendas });
}

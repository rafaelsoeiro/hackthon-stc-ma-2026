import { Prisma, PrismaClient } from '@prisma/client';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export async function seedContratos(prisma: PrismaClient): Promise<void> {
  const unidades = await prisma.unidadeGestora.findMany({ select: { id: true, codigo: true } });
  const credores = await prisma.credor.findMany({ select: { id: true } });
  const tipos = await prisma.tipoContratacao.findMany({ select: { id: true } });
  if (unidades.length === 0) throw new Error('Seed base nao encontrado: unidadeGestora vazia.');

  const contratos: Prisma.ContratoCreateManyInput[] = [];
  for (const [uIndex, unidade] of unidades.entries()) {
    for (let j = 0; j < 12; j++) {
      const ano = 2020 + ((j + uIndex) % 7);
      contratos.push({
        numero: `${unidade.codigo}-${String(j + 1).padStart(3, '0')}/${ano}`,
        ano,
        objeto: pick([
          'Contrato de execucao de obras de infraestrutura urbana',
          'Contrato de aquisicao de equipamentos de informatica',
          'Contrato de prestacao de servicos de limpeza e conservacao',
          'Contrato de fornecimento de medicamentos hospitalares',
          'Contrato de implantacao de sistema educacional digital',
        ]),
        dataAssinatura: new Date(`${ano}-03-15`),
        valorGlobal: new Prisma.Decimal((Math.random() * 5_000_000 + 50_000).toFixed(2)),
        inicioVigencia: new Date(`${ano}-01-01`),
        fimVigencia: new Date(`${ano + 1}-12-31`),
        status: pick(['Ativo', 'Encerrado', 'Suspenso']),
        origem: pick(['Licitacao', 'Dispensa', 'Inexigibilidade']),
        categoria: pick(['Saude', 'Educacao', 'Infraestrutura']),
        unidadeGestoraId: unidade.id,
        credorId: credores.length > 0 ? pick(credores).id : null,
        tipoContratacaoId: tipos.length > 0 ? pick(tipos).id : null,
        createdAt: new Date(),
      });
    }
  }
  await prisma.contrato.createMany({ data: contratos });
}

import { PrismaClient } from '@prisma/client';

export async function seedProgramasSociais(prisma: PrismaClient): Promise<void> {
  await prisma.programaSocial.createMany({
    data: [
      {
        nome: 'Programa Cidade Melhor',
        descricao:
          'Iniciativa de urbanizacao e melhoria de infraestrutura urbana com foco em mobilidade e saneamento.',
        detalhe:
          'Concentra investimentos em obras de pavimentacao, drenagem, iluminacao e requalificacao de espacos urbanos.',
        secretaria: 'SECID',
        status: 'ativo',
        beneficiados: 183420,
        municipiosCobertos: 47,
      },
      {
        nome: 'Saude em Rede',
        descricao:
          'Expansao da rede de atendimento e fortalecimento da atencao basica e especializada no estado.',
        detalhe:
          'Inclui custeio de unidades de saude, aquisicao de insumos e apoio a servicos estrategicos.',
        secretaria: 'SES',
        status: 'ativo',
        beneficiados: 295870,
        municipiosCobertos: 89,
      },
      {
        nome: 'Escola Viva',
        descricao:
          'Programa voltado para permanencia escolar, infraestrutura educacional e melhoria da aprendizagem.',
        detalhe:
          'Contempla manutencao de escolas, apoio pedagogico e acoes de inclusao educacional.',
        secretaria: 'SEDUC',
        status: 'ativo',
        beneficiados: 221540,
        municipiosCobertos: 73,
      },
      {
        nome: 'Cidade Melhor',
        descricao:
          'Frente complementar para qualificacao urbana e servicos essenciais em municipios prioritarios.',
        detalhe:
          'Apoia manutencao urbana e servicos locais em parceria com unidades executoras regionais.',
        secretaria: 'SECID',
        status: 'ativo',
        beneficiados: 90210,
        municipiosCobertos: 32,
      },
      {
        nome: 'Cuidar',
        descricao:
          'Programa social de apoio a familias em vulnerabilidade, com foco em cuidado integral.',
        detalhe:
          'Integra acoes de assistencia social, seguranca alimentar e acompanhamento territorial.',
        secretaria: 'SEDES',
        status: 'ativo',
        beneficiados: 146780,
        municipiosCobertos: 61,
      },
    ],
    skipDuplicates: true,
  });
}

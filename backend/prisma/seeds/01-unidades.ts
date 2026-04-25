import { PrismaClient } from '../../generated/prisma/client';

export async function seedBase(prisma: PrismaClient): Promise<void> {
  await prisma.unidadeGestora.createMany({
    data: [
      { codigo: '000102', nome: 'Companhia Maranhense de Gas', sigla: 'GASMAR' },
      { codigo: '000104', nome: 'Secretaria Extraordinaria da Igualdade Racial', sigla: 'SEIR' },
      { codigo: '000108', nome: 'Secretaria de Politicas para as Comunidades', sigla: 'SEC' },
      { codigo: '010101', nome: 'Assembleia Legislativa do Maranhao', sigla: 'ALEMA' },
      { codigo: '020101', nome: 'Tribunal de Contas do Estado', sigla: 'TCE' },
      { codigo: '040101', nome: 'Tribunal de Justica do Estado', sigla: 'TJMA' },
      { codigo: '070101', nome: 'Procuradoria Geral da Justica', sigla: 'PGJ' },
      { codigo: '080101', nome: 'Defensoria Publica do Estado do Maranhao', sigla: 'DPEMA' },
      { codigo: '110103', nome: 'Procuradoria Geral do Estado', sigla: 'PGE' },
      { codigo: '110105', nome: 'Secretaria de Representacao Institucional no DF', sigla: 'SERIDF' },
      { codigo: '110109', nome: 'Casa Civil', sigla: 'CC' },
      { codigo: '110111', nome: 'Fundacao Escola de Governo do Maranhao', sigla: 'EGMA' },
      { codigo: '110113', nome: 'Comissao Central Permanente de Licitacao', sigla: 'CCL' },
      { codigo: '110121', nome: 'Secretaria de Comunicacao Social', sigla: 'SECOM' },
      { codigo: '110122', nome: 'Secretaria de Transparencia e Controle', sigla: 'STC' },
      { codigo: '110123', nome: 'Chefia de Gabinete do Governador', sigla: 'GAB GOV' },
      { codigo: '110124', nome: 'Secretaria de Governo', sigla: 'SEGOV' },
      { codigo: '110125', nome: 'Secretaria de Articulacao Politica', sigla: 'SECAP' },
      { codigo: '110209', nome: 'Agencia Reguladora de Servicos Publicos', sigla: 'ARSEP' },
      { codigo: '110210', nome: 'Agencia Estadual de Mobilidade Urbana', sigla: 'MOB' },
      { codigo: '110211', nome: 'Agencia Executiva Metropolitana', sigla: 'AGEM' },
      { codigo: '110212', nome: 'Agencia Executiva Metropolitana do Sudoeste', sigla: 'AGEMSUL' },
      { codigo: '110213', nome: 'Maranhao Parcerias', sigla: 'MAPA' },
      { codigo: '110901', nome: 'Fundo Estadual de Transporte e Mobilidade', sigla: 'FTMU' },
      { codigo: '120101', nome: 'Secretaria das Cidades e Desenvolvimento Urbano', sigla: 'SECID' },
      { codigo: '120206', nome: 'Companhia de Saneamento Ambiental do Maranhao', sigla: 'CAEMA' },
      { codigo: '120207', nome: 'Agencia Executiva Metropolitana (2019+)', sigla: 'AGEM' },
      { codigo: '120208', nome: 'Agencia Executiva Metropolitana Sudoeste (2019+)', sigla: 'AGEMSUL' },
      { codigo: '120210', nome: 'Agencia de Mobilidade Urbana (2023+)', sigla: 'MOB' },
      { codigo: '130101', nome: 'Secretaria da Agricultura e Pecuaria', sigla: 'SAGRIMA' },
      { codigo: '130202', nome: 'Agencia Estadual de Defesa Agropecuaria', sigla: 'AGED' },
      { codigo: '130901', nome: 'Fundo de Desenvolvimento Agropecuario', sigla: 'FDA' },
      { codigo: '140101', nome: 'Secretaria da Cultura', sigla: 'SECMA' },
      { codigo: '140201', nome: 'Fundacao da Memoria Republicana Brasileira', sigla: 'FMRB' },
      { codigo: '140901', nome: 'Fundo de Desenvolvimento da Cultura Maranhense', sigla: 'FUNDECMA' },
      { codigo: '150101', nome: 'Secretaria de Desenvolvimento Social', sigla: 'SEDES' },
      { codigo: '150112', nome: 'Gerencia de Inclusao Socioprodutiva', sigla: 'GISP' },
      { codigo: '150903', nome: 'Fundo Estadual de Assistencia Social', sigla: 'FEAS' },
      { codigo: '160101', nome: 'Secretaria da Fazenda', sigla: 'SEFAZ' },
      { codigo: '160901', nome: 'Fundo de Fortalecimento da Administracao Tributaria', sigla: 'FUNAT' },
      { codigo: '170101', nome: 'Secretaria de Educacao', sigla: 'SEDUC' },
      { codigo: '170203', nome: 'Fundacao Nice Lobao', sigla: 'CINTRA' },
      { codigo: '170204', nome: 'Instituto Estadual de Educacao Ciencia e Tecnologia', sigla: 'IEMA' },
      { codigo: '190101', nome: 'Secretaria da Seguranca Publica', sigla: 'SSP' },
      { codigo: '190102', nome: 'Policia Civil', sigla: 'PCMA' },
      { codigo: '190110', nome: 'Policia Militar do Estado', sigla: 'PMMA' },
      { codigo: '190111', nome: 'Corpo de Bombeiros Militar', sigla: 'CBMMA' },
      { codigo: '190201', nome: 'Departamento Estadual de Transito', sigla: 'DETRAN' },
      { codigo: '190902', nome: 'Fundo Especial de Seguranca Publica', sigla: 'FESP' },
      { codigo: '200101', nome: 'Secretaria de Meio Ambiente e Recursos Naturais', sigla: 'SEMA' },
    ],
    skipDuplicates: true,
  });

  const credores = Array.from({ length: 120 }).map((_, index) => {
    const n = String(index + 1).padStart(3, '0');
    return {
      nome: `Credor Fornecedor ${n}`,
      cnpj: `99${String(index + 1).padStart(12, '0')}`,
    };
  });

  await prisma.credor.createMany({ data: credores });

  await prisma.tipoContratacao.createMany({
    data: [
      { nome: 'Licitacao' },
      { nome: 'Dispensa' },
      { nome: 'Inexigibilidade' },
      { nome: 'AdesaoAta' },
    ],
    skipDuplicates: true,
  });
}

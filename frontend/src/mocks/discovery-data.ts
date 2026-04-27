import type { DatasetEntry, GlossaryEntry, SearchEntry } from '@/src/features/discovery/types';

export const searchEntries: SearchEntry[] = [
  {
    id: 's1',
    title: 'Execucao da merenda escolar',
    description: 'Detalhamento por programa, orgao e periodo de empenho.',
    route: '/dados',
    domain: 'dados',
    tags: ['educacao', 'despesa', 'merenda'],
  },
  {
    id: 's2',
    title: 'Folha de pagamento da educacao',
    description: 'Visao por vinculo, cargo e faixa salarial.',
    route: '/pessoas',
    domain: 'pessoas',
    tags: ['servidores', 'salario', 'educacao'],
  },
  {
    id: 's3',
    title: 'Hospital Regional de Imperatriz',
    description: 'Status fisico-financeiro e historico de medicao da obra.',
    route: '/obras',
    domain: 'obras',
    tags: ['hospital', 'imperatriz', 'obra'],
  },
  {
    id: 's4',
    title: 'Contratos sem licitacao acima de R$ 1 mi',
    description: 'Contratos por modalidade e faixa de valor.',
    route: '/contratos',
    domain: 'contratos',
    tags: ['contratos', 'dispensa', 'licitacao'],
  },
  {
    id: 's5',
    title: 'Cobertura do Maranhao Livre da Fome',
    description: 'Beneficiados por municipio e repasses por ciclo.',
    route: '/programas',
    domain: 'programas',
    tags: ['programas', 'beneficiados', 'social'],
  },
  {
    id: 's6',
    title: 'Orcamento por unidade gestora',
    description: 'Distribuicao institucional por secretaria e vinculadas.',
    route: '/governo',
    domain: 'governo',
    tags: ['governo', 'estrutura', 'orcamento'],
  },
];

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: 'Empenho',
    definition: 'Reserva de dotacao orcamentaria para assumir uma despesa.',
    category: 'Orcamento',
  },
  {
    term: 'Liquidacao',
    definition: 'Etapa em que se verifica o direito adquirido pelo credor.',
    category: 'Orcamento',
  },
  {
    term: 'Dispensa de Licitacao',
    definition: 'Contratacao permitida por lei sem processo licitatorio completo.',
    category: 'Contratacoes',
  },
  {
    term: 'Unidade Gestora',
    definition: 'Unidade com competencia para executar atos de gestao orcamentaria.',
    category: 'Governanca',
  },
  {
    term: 'RPPS',
    definition: 'Regime proprio de previdencia social dos servidores publicos.',
    category: 'Pessoal',
  },
];

export const datasetEntries: DatasetEntry[] = [
  { name: 'Despesas por empenho', domain: 'Financeiro', cadence: 'Diaria (D-1)', format: 'CSV', status: 'Ativo' },
  { name: 'Receitas por fonte', domain: 'Financeiro', cadence: 'Diaria (D-1)', format: 'API', status: 'Ativo' },
  { name: 'Folha de pagamento', domain: 'Pessoal', cadence: 'Mensal', format: 'CSV', status: 'Ativo' },
  { name: 'Obras e medicao', domain: 'Infraestrutura', cadence: 'Semanal', format: 'JSON', status: 'Em revisao' },
  { name: 'Contratos e aditivos', domain: 'Compras', cadence: 'Diaria (D-1)', format: 'API', status: 'Ativo' },
];

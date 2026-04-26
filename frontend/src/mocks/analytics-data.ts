import type { AnalyticsPageData } from '@/src/features/analytics/types';

export const analyticsDataByRoute: Record<string, AnalyticsPageData> = {
  dados: {
    title: 'Painel Financeiro',
    subtitle: 'Execucao de receitas e despesas por orgao e periodo.',
    filters: [
      { key: 'periodo', label: 'Periodo', options: [{ label: '2026', value: '2026' }, { label: '2025', value: '2025' }] },
      { key: 'orgao', label: 'Orgao', options: [{ label: 'Todos', value: 'todos' }, { label: 'Educacao', value: 'educacao' }, { label: 'Saude', value: 'saude' }] },
      { key: 'categoria', label: 'Categoria', options: [{ label: 'Despesas', value: 'despesas' }, { label: 'Receitas', value: 'receitas' }] },
    ],
    kpis: [
      { label: 'Orcamento Atual', value: 'R$ 18,4 bi', trend: '+4,8% vs 2025' },
      { label: 'Execucao', value: '62%', trend: '+3,1 pp' },
      { label: 'Receita Liquida', value: 'R$ 11,2 bi' },
      { label: 'Despesas Liquidadas', value: 'R$ 10,7 bi' },
    ],
    distributionTitle: 'Distribuicao por Funcao',
    distribution: [
      { label: 'Educacao', value: 'R$ 3,9 bi', percentage: 34 },
      { label: 'Saude', value: 'R$ 2,8 bi', percentage: 25 },
      { label: 'Seguranca', value: 'R$ 1,7 bi', percentage: 15 },
      { label: 'Outras', value: 'R$ 3,2 bi', percentage: 26 },
    ],
    tableTitle: 'Maiores Programas por Empenho',
    tableColumns: [
      { key: 'programa', label: 'Programa' },
      { key: 'orgao', label: 'Orgao' },
      { key: 'empenhado', label: 'Empenhado' },
      { key: 'executado', label: 'Executado' },
    ],
    tableRows: [
      { programa: 'Merenda Escolar', orgao: 'SEDUC', empenhado: 'R$ 740 mi', executado: 'R$ 501 mi' },
      { programa: 'Atenção Hospitalar', orgao: 'SES', empenhado: 'R$ 1,1 bi', executado: 'R$ 760 mi' },
      { programa: 'Pavimentacao Estadual', orgao: 'SINFRA', empenhado: 'R$ 640 mi', executado: 'R$ 402 mi' },
    ],
  },
  pessoas: {
    title: 'Servidores Publicos',
    subtitle: 'Quadro funcional e remuneracao por poder e orgao.',
    filters: [
      { key: 'periodo', label: 'Competencia', options: [{ label: 'Abr/2026', value: '2026-04' }, { label: 'Mar/2026', value: '2026-03' }] },
      { key: 'orgao', label: 'Orgao', options: [{ label: 'Todos', value: 'todos' }, { label: 'SEDUC', value: 'seduc' }, { label: 'SES', value: 'ses' }] },
      { key: 'vinculo', label: 'Vinculo', options: [{ label: 'Efetivo', value: 'efetivo' }, { label: 'Comissionado', value: 'comissionado' }] },
    ],
    kpis: [
      { label: 'Servidores Ativos', value: '147.328', trend: '+1,2% no ano' },
      { label: 'Folha Mensal', value: 'R$ 1,2 bi' },
      { label: 'Remuneracao Media', value: 'R$ 8.145' },
      { label: 'Orgaos com Quadro', value: '102' },
    ],
    distributionTitle: 'Distribuicao por Area',
    distribution: [
      { label: 'Educacao', value: '55.884', percentage: 38 },
      { label: 'Saude', value: '29.465', percentage: 20 },
      { label: 'Seguranca', value: '22.099', percentage: 15 },
      { label: 'Outras', value: '39.880', percentage: 27 },
    ],
    tableTitle: 'Faixas de Remuneracao',
    tableColumns: [
      { key: 'faixa', label: 'Faixa' },
      { key: 'qtd', label: 'Quantidade' },
      { key: 'percentual', label: 'Percentual' },
    ],
    tableRows: [
      { faixa: 'Ate R$ 4 mil', qtd: '41.502', percentual: '28,2%' },
      { faixa: 'R$ 4 mil a R$ 10 mil', qtd: '67.014', percentual: '45,5%' },
      { faixa: 'Acima de R$ 10 mil', qtd: '38.812', percentual: '26,3%' },
    ],
  },
  governo: {
    title: 'Estrutura de Governo',
    subtitle: 'Organizacao administrativa e unidades gestoras.',
    filters: [
      { key: 'tipo', label: 'Tipo', options: [{ label: 'Secretarias', value: 'secretarias' }, { label: 'Autarquias', value: 'autarquias' }] },
      { key: 'regiao', label: 'Regiao', options: [{ label: 'Todas', value: 'todas' }, { label: 'Metropolitana', value: 'metropolitana' }, { label: 'Interior', value: 'interior' }] },
    ],
    kpis: [
      { label: 'Secretarias', value: '28' },
      { label: 'Unidades Gestoras', value: '102' },
      { label: 'Autarquias/Fundacoes', value: '19' },
      { label: 'Empresas Publicas', value: '7' },
    ],
    distributionTitle: 'Composicao Institucional',
    distribution: [
      { label: 'Administracao Direta', value: '28', percentage: 52 },
      { label: 'Autarquias e Fundacoes', value: '19', percentage: 35 },
      { label: 'Empresas Publicas', value: '7', percentage: 13 },
    ],
    tableTitle: 'Unidades com Maior Orcamento',
    tableColumns: [
      { key: 'unidade', label: 'Unidade' },
      { key: 'tipo', label: 'Tipo' },
      { key: 'orcamento', label: 'Orcamento' },
    ],
    tableRows: [
      { unidade: 'SEDUC', tipo: 'Secretaria', orcamento: 'R$ 9,8 bi' },
      { unidade: 'SES', tipo: 'Secretaria', orcamento: 'R$ 7,2 bi' },
      { unidade: 'SINFRA', tipo: 'Secretaria', orcamento: 'R$ 2,6 bi' },
    ],
  },
  obras: {
    title: 'Obras Publicas',
    subtitle: 'Monitoramento fisico-financeiro de obras em execucao.',
    filters: [
      { key: 'status', label: 'Status', options: [{ label: 'Todas', value: 'todas' }, { label: 'Em andamento', value: 'andamento' }, { label: 'Atrasadas', value: 'atrasadas' }] },
      { key: 'regiao', label: 'Regiao', options: [{ label: 'Todas', value: 'todas' }, { label: 'Sao Luis', value: 'sao-luis' }, { label: 'Imperatriz', value: 'imperatriz' }] },
    ],
    kpis: [
      { label: 'Obras em Andamento', value: '847' },
      { label: 'Concluidas no Ano', value: '119', trend: '+18 vs 2025' },
      { label: 'Com Atraso', value: '23' },
      { label: 'Investimento Ativo', value: 'R$ 3,4 bi' },
    ],
    distributionTitle: 'Status das Obras',
    distribution: [
      { label: 'Em dia', value: '702', percentage: 83 },
      { label: 'Atrasadas', value: '23', percentage: 3 },
      { label: 'Concluidas', value: '122', percentage: 14 },
    ],
    tableTitle: 'Obras em Destaque',
    tableColumns: [
      { key: 'obra', label: 'Obra' },
      { key: 'municipio', label: 'Municipio' },
      { key: 'status', label: 'Status' },
      { key: 'execucao', label: 'Execucao' },
    ],
    tableRows: [
      { obra: 'Hospital Regional de Imperatriz', municipio: 'Imperatriz', status: 'Em andamento', execucao: '78%' },
      { obra: 'Ponte MA-106', municipio: 'Bacabal', status: 'Atrasada', execucao: '62%' },
      { obra: 'UPA Turu', municipio: 'Sao Luis', status: 'Concluida', execucao: '100%' },
    ],
  },
  contratos: {
    title: 'Contratos',
    subtitle: 'Analise de contratos, fornecedores e modalidades de compra.',
    filters: [
      { key: 'modalidade', label: 'Modalidade', options: [{ label: 'Todas', value: 'todas' }, { label: 'Licitacao', value: 'licitacao' }, { label: 'Dispensa', value: 'dispensa' }] },
      { key: 'orgao', label: 'Orgao', options: [{ label: 'Todos', value: 'todos' }, { label: 'SEDUC', value: 'seduc' }, { label: 'SES', value: 'ses' }] },
    ],
    kpis: [
      { label: 'Contratos Ativos', value: '12.430' },
      { label: 'Valor Global', value: 'R$ 8,6 bi' },
      { label: 'Com Licitacao', value: '89%' },
      { label: 'Aditivos no Ano', value: '1.204' },
    ],
    distributionTitle: 'Distribuicao por Modalidade',
    distribution: [
      { label: 'Licitacao', value: '11.062', percentage: 89 },
      { label: 'Dispensa', value: '868', percentage: 7 },
      { label: 'Inexigivel', value: '500', percentage: 4 },
    ],
    tableTitle: 'Contratos com Maior Valor',
    tableColumns: [
      { key: 'objeto', label: 'Objeto' },
      { key: 'fornecedor', label: 'Fornecedor' },
      { key: 'valor', label: 'Valor' },
      { key: 'vigencia', label: 'Vigencia' },
    ],
    tableRows: [
      { objeto: 'Gestao hospitalar regional', fornecedor: 'Instituto Saude MA', valor: 'R$ 420 mi', vigencia: '2026-2028' },
      { objeto: 'Alimentacao escolar', fornecedor: 'Nutrimaranhao', valor: 'R$ 310 mi', vigencia: '2026-2027' },
      { objeto: 'Pavimentacao rodoviaria', fornecedor: 'Via Norte Engenharia', valor: 'R$ 295 mi', vigencia: '2026-2028' },
    ],
  },
  programas: {
    title: 'Programas Sociais',
    subtitle: 'Indicadores de cobertura e impacto por programa social.',
    filters: [
      { key: 'programa', label: 'Programa', options: [{ label: 'Todos', value: 'todos' }, { label: 'Maranhao Livre da Fome', value: 'mlf' }, { label: 'Merenda Escolar', value: 'merenda' }] },
      { key: 'regiao', label: 'Regiao', options: [{ label: 'Todas', value: 'todas' }, { label: 'Norte', value: 'norte' }, { label: 'Sul', value: 'sul' }] },
    ],
    kpis: [
      { label: 'Beneficiados Diretos', value: '680 mil' },
      { label: 'Programas Ativos', value: '15' },
      { label: 'Repasse Acumulado', value: 'R$ 1,2 bi' },
      { label: 'Municipios Cobertos', value: '217' },
    ],
    distributionTitle: 'Cobertura por Programa',
    distribution: [
      { label: 'Maranhao Livre da Fome', value: '340 mil', percentage: 50 },
      { label: 'Merenda Escolar', value: '190 mil', percentage: 28 },
      { label: 'Outros', value: '150 mil', percentage: 22 },
    ],
    tableTitle: 'Programas com Maior Alcance',
    tableColumns: [
      { key: 'programa', label: 'Programa' },
      { key: 'beneficiados', label: 'Beneficiados' },
      { key: 'repasse', label: 'Repasse' },
      { key: 'status', label: 'Status' },
    ],
    tableRows: [
      { programa: 'Maranhao Livre da Fome', beneficiados: '340 mil', repasse: 'R$ 480 mi', status: 'Ativo' },
      { programa: 'Merenda Escolar', beneficiados: '190 mil', repasse: 'R$ 320 mi', status: 'Ativo' },
      { programa: 'Agua para Todos', beneficiados: '72 mil', repasse: 'R$ 115 mi', status: 'Ativo' },
    ],
  },
};

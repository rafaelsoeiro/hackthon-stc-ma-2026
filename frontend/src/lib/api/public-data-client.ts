import { fetchJson } from './fetch-json';

type Meta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ObrasItem = {
  id: number;
  descricao: string;
  categoria: string | null;
  status: string;
  percentualExecucao: number;
  valorTotal: number;
  municipio: string;
  dataPrevisaoFim: string | null;
  credorNome: string | null;
};

export type ObrasListResponse = {
  items: ObrasItem[];
  meta: Meta;
  totals: {
    obrasAtivas: number;
    investimentoTotal: number;
    pctNoPrazo: number;
    atrasadas: number;
  };
};

export type ObrasSummaryResponse = {
  obrasAtivas: number;
  investimentoAtivo: number;
  pctNoPrazo: number;
  atrasadas: number;
};

export type ContratoItem = {
  id: number;
  numero: string;
  ano: number;
  objeto: string;
  dataAssinatura: string | null;
  valorGlobal: number;
  inicioVigencia: string | null;
  fimVigencia: string | null;
  status: string | null;
  categoria: string | null;
  orgao: string;
  fornecedor: string | null;
  tipo: string;
  modalidade: string | null;
};

export type ContratosListResponse = {
  items: ContratoItem[];
  meta: Meta;
  totals: {
    valorTotalContratado: number;
    contratosAtivos: number;
    percentualComLicitacao: number;
    fornecedoresUnicos: number;
    distribuicaoPorTipo: Array<{ tipo: string; quantidade: number }>;
  };
};

export type ContratosSummaryResponse = {
  valorTotalContratado: number;
  contratosAtivos: number;
  percentualComLicitacao: number;
  fornecedoresUnicos: number;
  distribuicaoPorTipo: Array<{ tipo: string; quantidade: number }>;
};

export type SearchItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  route: string;
  tags: string[];
  score: number;
  date?: string | null;
};

export type SearchResponse = {
  items: SearchItem[];
  meta: Meta;
  aggregations: {
    byType: Array<{ type: string; count: number }>;
  };
};

export type SearchSummaryResponse = {
  distribution: Array<{ category: string; value: number; percent: number }>;
  monthlySeries: Array<{ month: string; value: number }>;
  highlights: Array<{ title: string; type: string; score: number }>;
};

export type AnalyticsSummaryResponse = {
  kpis: Array<{ label: string; value: number; change: string | null; trend: 'up' | 'down' }>;
  distribution: Array<{ name: string; value: number; percent: number }>;
  timeseries: Array<{ month: string; receita: number; despesa: number }>;
  execution: Array<{ area: string; planejado: number; executado: number; percent: number }>;
  insights: string[];
  context: { year: number };
};

export type ProgramaItem = {
  id: string;
  nome: string;
  secretaria: string;
  beneficiados: number | null;
  investimento: number;
  origens: string[];
  municipios: number | null;
  status: string;
  descricao: string | null;
  detalhe: string | null;
};

export type ProgramasListResponse = {
  items: ProgramaItem[];
  meta: Meta;
  totals: {
    programasAtivos: number;
    investimentoTotal: number;
  };
};

export type ProgramasSummaryResponse = {
  programasAtivos: number;
  investimentoTotal: number;
  beneficiadosTotal: number | null;
  municipiosCobertos: number | null;
};

export type UnidadeGestoraRef = {
  nome: string;
  sigla: string | null;
};

export type DespesaItem = {
  id: number;
  codigoEmpenho: string | null;
  descricao: string;
  dataEmissao: string;
  valorEmpenhado: number;
  valorLiquidado: number;
  valorPago: number;
  funcao: string | null;
  programa: string | null;
  categoria: string | null;
  credorNome: string | null;
  unidadeGestora: UnidadeGestoraRef;
};

export type DespesasListResponse = {
  items: DespesaItem[];
  meta: Meta;
  totals: {
    valorEmpenhado: number;
    valorLiquidado: number;
    valorPago: number;
  };
};

export type ReceitaItem = {
  id: number;
  codigo: string | null;
  descricao: string;
  valorPrevisto: number;
  valorRealizado: number;
  ano: number;
  mes: number | null;
  naturezaReceita: string;
  categoria: string | null;
  unidadeGestora: UnidadeGestoraRef;
};

export type ReceitasListResponse = {
  items: ReceitaItem[];
  meta: Meta;
  totals: {
    valorPrevisto: number;
    valorRealizado: number;
  };
};

export type ServidorItem = {
  id: number;
  nome: string;
  cpf: string | null;
  matricula: string | null;
  remuneracaoMedia: number;
  remuneracaoAtual: {
    ano: number;
    mes: number;
    valor: number;
    cargo: string;
    naturezaCargo: string;
    categoria: string | null;
    unidadeGestora: UnidadeGestoraRef;
  } | null;
};

export type ServidoresListResponse = {
  items: ServidorItem[];
  meta: Meta;
};

export type TransferenciaItem = {
  id: number;
  tipo: string;
  ano: number;
  mes: number | null;
  descricao: string | null;
  valorPrevisto: number;
  valorRealizado: number;
  valorEmpenhado: number;
  valorLiquidado: number;
  valorPago: number;
  categoria: string | null;
  programa: string | null;
  unidadeGestora: UnidadeGestoraRef;
};

export type TransferenciasListResponse = {
  items: TransferenciaItem[];
  meta: Meta;
  totals: {
    valorPrevisto: number;
    valorRealizado: number;
    valorEmpenhado: number;
    valorLiquidado: number;
    valorPago: number;
  };
};

export type EmendaItem = {
  id: number;
  numeroEmpenho: string;
  descricao: string | null;
  dataEmissao: string;
  valorEmpenhado: number;
  valorLiquidado: number;
  valorPago: number;
  programa: string | null;
  categoria: string | null;
  credorNome: string | null;
  unidadeGestora: UnidadeGestoraRef;
};

export type EmendasListResponse = {
  items: EmendaItem[];
  meta: Meta;
  totals: {
    valorEmpenhado: number;
    valorLiquidado: number;
    valorPago: number;
  };
};

export async function getObras(params?: {
  q?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();

  if (params?.q) search.set('q', params.q);
  if (params?.status) search.set('status', params.status);
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ObrasListResponse>(`/api/public/obras${suffix ? `?${suffix}` : ''}`);
}

export async function getObrasSummary() {
  return fetchJson<ObrasSummaryResponse>('/api/public/obras/summary');
}

export async function getDespesas(params?: {
  q?: string;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<DespesasListResponse>(`/api/public/despesas${suffix ? `?${suffix}` : ''}`);
}

export async function getReceitas(params?: {
  q?: string;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ReceitasListResponse>(`/api/public/receitas${suffix ? `?${suffix}` : ''}`);
}

export async function getContratos(params?: {
  q?: string;
  tipo?: string;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();

  if (params?.q) search.set('q', params.q);
  if (params?.tipo) search.set('tipo', params.tipo);
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ContratosListResponse>(`/api/public/contratos${suffix ? `?${suffix}` : ''}`);
}

export async function getContratosSummary() {
  return fetchJson<ContratosSummaryResponse>('/api/public/contratos/summary');
}

export async function getContratosGuidedSearch(params?: {
  q?: string;
  area?: string;
  tipo?: string;
  valorMax?: number;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();

  if (params?.q) search.set('q', params.q);
  if (params?.area) search.set('area', params.area);
  if (params?.tipo) search.set('tipo', params.tipo);
  if (params?.valorMax !== undefined) search.set('valorMax', String(params.valorMax));
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ContratosListResponse>(`/api/public/contratos/guided-search${suffix ? `?${suffix}` : ''}`);
}

export async function getSearch(params?: {
  q?: string;
  types?: string;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();

  if (params?.q) search.set('q', params.q);
  if (params?.types) search.set('types', params.types);
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<SearchResponse>(`/api/public/search${suffix ? `?${suffix}` : ''}`);
}

export async function getSearchSummary(params?: {
  q?: string;
  types?: string;
}) {
  const search = new URLSearchParams();

  if (params?.q) search.set('q', params.q);
  if (params?.types) search.set('types', params.types);

  const suffix = search.toString();
  return fetchJson<SearchSummaryResponse>(`/api/public/search/summary${suffix ? `?${suffix}` : ''}`);
}

export async function getAnalyticsSummary(params: {
  domain: 'dados' | 'pessoas' | 'governo';
  ano?: number;
}) {
  const search = new URLSearchParams();
  if (params.ano) search.set('ano', String(params.ano));
  const suffix = search.toString();
  return fetchJson<AnalyticsSummaryResponse>(
    `/api/public/analytics/${params.domain}/summary${suffix ? `?${suffix}` : ''}`,
  );
}

export async function getProgramas(params?: {
  q?: string;
  origem?: string;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.origem) search.set('origem', params.origem);
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ProgramasListResponse>(`/api/public/programas${suffix ? `?${suffix}` : ''}`);
}

export async function getServidores(params?: {
  q?: string;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<ServidoresListResponse>(`/api/public/servidores${suffix ? `?${suffix}` : ''}`);
}

export async function getTransferencias(params?: {
  q?: string;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<TransferenciasListResponse>(`/api/public/transferencias${suffix ? `?${suffix}` : ''}`);
}

export async function getEmendas(params?: {
  q?: string;
  ano?: number;
  page?: number;
  pageSize?: number;
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.ano) search.set('ano', String(params.ano));
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const suffix = search.toString();
  return fetchJson<EmendasListResponse>(`/api/public/emendas${suffix ? `?${suffix}` : ''}`);
}

export async function getProgramasSummary(params?: { q?: string; origem?: string }) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.origem) search.set('origem', params.origem);

  const suffix = search.toString();
  return fetchJson<ProgramasSummaryResponse>(`/api/public/programas/summary${suffix ? `?${suffix}` : ''}`);
}

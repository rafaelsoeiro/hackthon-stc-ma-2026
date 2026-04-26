'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  Building2,
  Heart,
  ArrowLeftRight,
  Landmark,
  Globe,
  MapPin,
  Map as MapIcon,
  Search,
  BarChart2,
  FileSpreadsheet,
  Braces,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Sparkles,
  Check,
  Trophy,
  Calendar,
  ArrowDownToLine,
  Table2,
  Copy,
} from 'lucide-react';
import { DataSearchIcon } from './icons/DataSearchIcon';
import {
  getContratosGuidedSearch,
  getDespesas,
  getEmendas,
  getObras,
  getProgramas,
  getReceitas,
  getServidores,
  getTransferencias,
  getUnidadesGestoras,
  type UnidadeGestoraSuggestion,
} from '@/src/lib/api/public-data-client';
import { generateTechnicalNarrative } from '@/src/lib/api/ai-client';

interface TecnicoWizardProps {
  onNavigate: (page: string) => void;
}

type DataTypeId =
  | 'despesas'
  | 'receitas'
  | 'contratos'
  | 'servidores'
  | 'obras'
  | 'programas'
  | 'transferencias'
  | 'emendas';
type DetailLevelId = 'resumido' | 'completo' | 'bruto';
type ResumoChartKind = 'bar' | 'line' | 'pie';
type AiNarrativeStatus = 'idle' | 'loading' | 'success' | 'error';

type ReportRow = Record<string, string | number>;

type ReportData = {
  title: string;
  headers: string[];
  rows: ReportRow[];
  total: number;
  totals: Array<{ label: string; value: string }>;
  generatedAt: string;
};

function selectRowsByDetail(
  detailLevel: DetailLevelId,
  rowsByLevel: Record<DetailLevelId, ReportRow[]>,
  fallbackHeaders: Record<DetailLevelId, string[]>,
): { headers: string[]; rows: ReportRow[] } {
  const selectedRows = rowsByLevel[detailLevel] ?? rowsByLevel.completo;
  const rows = detailLevel === 'resumido' ? selectedRows.slice(0, 25) : selectedRows;
  const headers = rows[0] ? Object.keys(rows[0]) : fallbackHeaders[detailLevel];
  return { headers, rows };
}

function buildResumoChartData(report: ReportData): Array<{ name: string; value: number }> {
  if (!report.headers.length || report.rows.length === 0) {
    return [{ name: 'Sem dados', value: 0 }];
  }

  const categoryKey = report.headers[0];
  const counter = new Map<string, number>();

  for (const row of report.rows) {
    const rawValue = row[categoryKey];
    const name = String(rawValue ?? 'N/D').trim() || 'N/D';
    counter.set(name, (counter.get(name) ?? 0) + 1);
  }

  return Array.from(counter.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function buildResumoChartInsight(
  report: ReportData,
  chartData: Array<{ name: string; value: number }>,
): string {
  if (!report.rows.length || chartData.length === 0 || chartData[0]?.value === 0) {
    return 'Nao houve registros para montar distribuicao no recorte selecionado.';
  }

  const top = chartData[0];
  const percent = Math.round((top.value / report.rows.length) * 100);
  return `O maior grupo no recorte resumido e "${top.name}", com ${top.value.toLocaleString('pt-BR')} registro(s), representando cerca de ${percent}% da amostra exibida.`;
}

function renderNarrativeWithBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`narrative-bold-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`narrative-part-${index}`}>{part}</span>;
  });
}

const DATA_TYPES: Array<{
  id: DataTypeId;
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}> = [
  { id: 'despesas', label: 'Despesas Públicas', desc: 'Empenhos, liquidações e pagamentos', icon: DollarSign, color: '#3B82F6', gradient: 'from-blue-500 to-blue-700' },
  { id: 'receitas', label: 'Receitas Tributárias', desc: 'ICMS, FPM e arrecadação geral', icon: TrendingUp, color: '#10B981', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'contratos', label: 'Contratos', desc: 'Licitações, dispensas e fornecedores', icon: FileText, color: '#F59E0B', gradient: 'from-amber-500 to-orange-600' },
  { id: 'servidores', label: 'Servidores', desc: 'Folha de pagamento e remunerações', icon: Users, color: '#8B5CF6', gradient: 'from-violet-500 to-violet-700' },
  { id: 'obras', label: 'Obras Públicas', desc: 'Andamento físico-financeiro', icon: Building2, color: '#10B981', gradient: 'from-green-500 to-emerald-600' },
  { id: 'programas', label: 'Programas Sociais', desc: 'Beneficiários e repasses', icon: Heart, color: '#EC4899', gradient: 'from-pink-500 to-rose-600' },
  { id: 'transferencias', label: 'Transferências', desc: 'Repasses a municípios e convênios', icon: ArrowLeftRight, color: '#00D4FF', gradient: 'from-cyan-400 to-cyan-600' },
  { id: 'emendas', label: 'Emendas Parlamentares', desc: 'Execução por parlamentar e obra', icon: Landmark, color: '#F97316', gradient: 'from-orange-500 to-orange-700' },
];

const PERIODS = [
  { id: 'mes_atual', label: 'Abril 2026', sub: 'Mês atual' },
  { id: 'trim1_2026', label: '1º Trim. 2026', sub: 'Jan · Fev · Mar' },
  { id: 'sem1_2026', label: '1º Sem. 2026', sub: 'Jan a Jun 2026' },
  { id: 'ano_2026', label: 'Ano 2026', sub: 'Completo (em aberto)' },
  { id: 'ano_2025', label: 'Ano 2025', sub: 'Exercício encerrado' },
  { id: 'personalizado', label: 'Personalizado', sub: 'Escolha as datas' },
] as const;

const REGIONS = [
  { id: 'estado', label: 'Todo o Maranhão', sub: '217 municípios', icon: Globe, color: '#3B82F6', hasSubOptions: false },
  { id: 'capital', label: 'Capital — São Luís', sub: 'Região metropolitana', icon: MapPin, color: '#EC4899', hasSubOptions: false },
  { id: 'macro', label: 'Por Macrorregião', sub: '6 macrorregiões', icon: MapIcon, color: '#10B981', hasSubOptions: true },
  { id: 'municipio', label: 'Por Município', sub: 'Busca direta', icon: Search, color: '#F59E0B', hasSubOptions: true },
] as const;

const MACROS = [
  { id: 'grande_slz', label: 'Grande São Luís' },
  { id: 'tocantins', label: 'Tocantins' },
  { id: 'mearim', label: 'Mearim' },
  { id: 'pindare', label: 'Pindaré' },
  { id: 'leste', label: 'Leste Maranhense' },
  { id: 'cerrado', label: 'Cerrado Maranhense' },
] as const;

const DETAIL_LEVELS = [
  { id: 'resumido', label: 'Resumido', badge: 'Mais popular', icon: BarChart2, color: '#3B82F6', formats: ['CSV', 'JSON'], desc: 'Visão gerencial com totais e indicadores.' },
  { id: 'completo', label: 'Completo', badge: 'Recomendado', icon: FileSpreadsheet, color: '#10B981', formats: ['CSV', 'JSON'], desc: 'Registros linha a linha com filtros aplicados.' },
  { id: 'bruto', label: 'Dados Brutos', badge: 'Para desenvolvedores', icon: Braces, color: '#8B5CF6', formats: ['JSON', 'CSV'], desc: 'Dados para integração com sistemas.' },
] as const;

const STEPS = [
  { label: 'Tema', question: 'Que tipo de dado você procura?' },
  { label: 'Período', question: 'Qual período você quer analisar?' },
  { label: 'Região', question: 'Qual região te interessa?' },
  { label: 'Detalhe', question: 'Qual nível de detalhe?' },
] as const;

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(2)} bi`;
  if (Math.abs(value) >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(2)} mi`;
  return `R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`;
}

function yearFromPeriod(periodId: string): number | undefined {
  if (periodId === 'ano_2025') return 2025;
  if (periodId === 'ano_2026' || periodId === 'mes_atual' || periodId === 'trim1_2026' || periodId === 'sem1_2026') return 2026;
  return undefined;
}

function toCsv(headers: string[], rows: ReportRow[]): string {
  const escapeCell = (value: string | number): string => {
    const text = String(value ?? '');
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => escapeCell(row[header] ?? '')).join(','));
  }
  return lines.join('\n');
}

const WIZARD_PAGE_SIZE = 100;
const MAX_WIZARD_PAGES = 200;
const RESUMO_CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#14B8A6'];

function getResumoChartKind(dataType: DataTypeId | ''): ResumoChartKind {
  switch (dataType) {
    case 'receitas':
    case 'transferencias':
      return 'line';
    case 'contratos':
    case 'obras':
    case 'programas':
      return 'pie';
    case 'despesas':
    case 'servidores':
    case 'emendas':
    default:
      return 'bar';
  }
}

function getResumoChartTitle(dataType: DataTypeId | '', kind: ResumoChartKind): string {
  if (kind === 'line') return 'Evolução resumida por grupo (Top 8)';
  if (kind === 'pie') return 'Composição percentual por grupo (Top 8)';
  if (dataType === 'servidores') return 'Distribuição de servidores por grupo (Top 8)';
  return 'Distribuição resumida por grupo (Top 8)';
}

type PagedResponse = {
  items: unknown[];
  meta: {
    total: number;
    totalPages: number;
  };
};

async function fetchAllPages<TResponse extends PagedResponse>(
  fetchPage: (page: number, pageSize: number) => Promise<TResponse>,
): Promise<{ first: TResponse; items: TResponse['items'] }> {
  const first = await fetchPage(1, WIZARD_PAGE_SIZE);
  const items = [...first.items];
  const totalPages = Math.min(first.meta.totalPages, MAX_WIZARD_PAGES);

  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetchPage(page, WIZARD_PAGE_SIZE);
    items.push(...response.items);
  }

  return { first, items };
}

async function fetchAllPagesWithFallback<TResponse extends PagedResponse>(
  fetchPage: (
    queryText: string | undefined,
    page: number,
    pageSize: number,
  ) => Promise<TResponse>,
  queryText?: string,
): Promise<{ first: TResponse; items: TResponse['items'] }> {
  const candidates = queryText ? [queryText, undefined] : [undefined];
  let lastResult: { first: TResponse; items: TResponse['items'] } | null = null;

  for (const candidate of candidates) {
    const result = await fetchAllPages((page, pageSize) =>
      fetchPage(candidate, page, pageSize),
    );
    lastResult = result;

    if (result.first.meta.total > 0 || candidate === undefined) {
      return result;
    }
  }

  if (!lastResult) {
    throw new Error('Nao foi possivel carregar dados para o relatorio.');
  }

  return lastResult;
}

export default function TecnicoWizard({ onNavigate }: TecnicoWizardProps) {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [selectedUnidadeGestora, setSelectedUnidadeGestora] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [ugSuggestions, setUgSuggestions] = useState<UnidadeGestoraSuggestion[]>(
    [],
  );
  const [isLoadingUgSuggestions, setIsLoadingUgSuggestions] = useState(false);
  const [ugSuggestionsError, setUgSuggestionsError] = useState<string | null>(
    null,
  );
  const [report, setReport] = useState<ReportData | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [aiResumoNarrative, setAiResumoNarrative] = useState<string | null>(null);
  const [aiResumoNarrativeStatus, setAiResumoNarrativeStatus] =
    useState<AiNarrativeStatus>('idle');

  const [sel, setSel] = useState({
    dataType: '' as DataTypeId | '',
    period: '',
    periodStart: '',
    periodEnd: '',
    region: '',
    subRegion: '',
    detailLevel: '' as DetailLevelId | '',
  });

  const dt = useMemo(() => DATA_TYPES.find((d) => d.id === sel.dataType), [sel.dataType]);
  const period = useMemo(() => PERIODS.find((p) => p.id === sel.period), [sel.period]);
  const region = useMemo(() => REGIONS.find((r) => r.id === sel.region), [sel.region]);
  const detail = useMemo(
    () => DETAIL_LEVELS.find((item) => item.id === sel.detailLevel),
    [sel.detailLevel],
  );
  const resumoChartData = useMemo(
    () =>
      report && sel.detailLevel === 'resumido'
        ? buildResumoChartData(report)
        : [],
    [report, sel.detailLevel],
  );
  const resumoChartInsight = useMemo(
    () =>
      report && sel.detailLevel === 'resumido'
        ? buildResumoChartInsight(report, resumoChartData)
        : '',
    [report, resumoChartData, sel.detailLevel],
  );
  const resumoChartKind = useMemo(() => getResumoChartKind(sel.dataType), [sel.dataType]);
  const resumoChartTitle = useMemo(
    () => getResumoChartTitle(sel.dataType, resumoChartKind),
    [sel.dataType, resumoChartKind],
  );
  const resumoNarrativeText = aiResumoNarrative || '';

  useEffect(() => {
    if (!report || sel.detailLevel !== 'resumido') return;

    let active = true;
    const topGroup = resumoChartData[0];

    void generateTechnicalNarrative(
      {
        dataTypeLabel: dt?.label ?? report.title,
        periodLabel: period?.label ?? 'Nao informado',
        regionLabel: region?.label ?? 'Nao informado',
        total: report.total,
        totals: report.totals,
        topGroupName: topGroup?.name,
        topGroupValue: topGroup?.value,
        sampleSize: report.rows.length,
      },
      sel.dataType,
    )
      .then((narrative) => {
        if (!active) return;
        setAiResumoNarrative(narrative);
        setAiResumoNarrativeStatus('success');
      })
      .catch(() => {
        if (!active) return;
        setAiResumoNarrative(null);
        setAiResumoNarrativeStatus('error');
      });

    return () => {
      active = false;
    };
  }, [
    dt?.label,
    period?.label,
    region?.label,
    report,
    resumoChartData,
    sel.dataType,
    sel.detailLevel,
  ]);

  useEffect(() => {
    if (sel.region !== 'municipio') return;

    let active = true;
    const search = municipio.trim();
    const timeout = setTimeout(() => {
      setIsLoadingUgSuggestions(true);
      setUgSuggestionsError(null);

      void getUnidadesGestoras({
        q: search.length > 0 ? search : undefined,
        limit: 12,
      })
        .then((response) => {
          if (!active) return;
          setUgSuggestions(response.items);
        })
        .catch(() => {
          if (!active) return;
          setUgSuggestions([]);
          setUgSuggestionsError('Nao foi possivel carregar a lista de UGs.');
        })
        .finally(() => {
          if (!active) return;
          setIsLoadingUgSuggestions(false);
        });
    }, 220);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [municipio, sel.region]);

  const canAdvance = () => {
    if (step === 0) return !!sel.dataType;
    if (step === 1) {
      if (sel.period !== 'personalizado') return !!sel.period;
      if (!(sel.periodStart && sel.periodEnd)) return false;
      return sel.periodStart <= sel.periodEnd;
    }
    if (step === 2) {
      if (sel.region === 'macro') return !!sel.subRegion;
      if (sel.region === 'municipio') return municipio.trim().length > 1;
      return !!sel.region;
    }
    if (step === 3) return !!sel.detailLevel;
    return false;
  };

  const showNoUgCompatibility =
    sel.region === 'municipio' &&
    municipio.trim().length >= 2 &&
    !isLoadingUgSuggestions &&
    !ugSuggestionsError &&
    ugSuggestions.length === 0;

  const selectUnidadeGestoraSuggestion = (item: UnidadeGestoraSuggestion) => {
    const label = item.sigla
      ? `${item.sigla} - ${item.nome}`
      : `${item.codigo} - ${item.nome}`;
    setMunicipio(label);
    setSelectedUnidadeGestora({ id: item.id, label });
  };

  const buildQueryText = (): string | undefined => {
    if (sel.region === 'municipio' && municipio.trim()) return municipio.trim();
    if (sel.region === 'macro' && sel.subRegion) {
      return MACROS.find((macro) => macro.id === sel.subRegion)?.label;
    }
    if (sel.region === 'capital') return 'São Luís';
    return undefined;
  };

  const queryForDataType = (): string | undefined => {
    const regionQuery = buildQueryText();
    if (!regionQuery) return undefined;
    return regionQuery;
  };

  const fetchReport = async (): Promise<ReportData> => {
    if (!sel.dataType) {
      throw new Error('Tipo de dado não selecionado.');
    }
    if (!sel.detailLevel) {
      throw new Error('Nível de detalhe não selecionado.');
    }

    const selectedDataType = sel.dataType;
    const detailLevel = sel.detailLevel;
    const ano = sel.period === 'personalizado' && sel.periodStart
      ? new Date(sel.periodStart).getFullYear()
      : yearFromPeriod(sel.period);
    const q = queryForDataType();
    const unidadeGestoraId = selectedUnidadeGestora?.id;
    const generatedAt = new Date().toLocaleString('pt-BR');

    switch (selectedDataType) {
      case 'despesas': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getDespesas({ ano, q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            Programa: item.programa ?? 'N/D',
            Pago: formatCurrency(item.valorPago),
          })),
          completo: items.map((item) => ({
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            Descrição: item.descricao,
            Programa: item.programa ?? 'N/D',
            Empenhado: formatCurrency(item.valorEmpenhado),
            Liquidado: formatCurrency(item.valorLiquidado),
            Pago: formatCurrency(item.valorPago),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            DataEmissão: item.dataEmissao,
            CódigoEmpenho: item.codigoEmpenho ?? 'N/D',
            Descrição: item.descricao,
            Função: item.funcao ?? 'N/D',
            Programa: item.programa ?? 'N/D',
            Categoria: item.categoria ?? 'N/D',
            Credor: item.credorNome ?? 'N/D',
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            ValorEmpenhado: item.valorEmpenhado,
            ValorLiquidado: item.valorLiquidado,
            ValorPago: item.valorPago,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Órgão', 'Programa', 'Pago'],
            completo: ['Órgão', 'Descrição', 'Programa', 'Empenhado', 'Liquidado', 'Pago'],
            bruto: ['Id', 'DataEmissão', 'CódigoEmpenho', 'Descrição', 'Função', 'Programa', 'Categoria', 'Credor', 'Órgão', 'ValorEmpenhado', 'ValorLiquidado', 'ValorPago'],
          },
        );

        return {
          title: 'Despesas Públicas',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Total Empenhado', value: formatCurrency(response.totals.valorEmpenhado) },
            { label: 'Total Liquidado', value: formatCurrency(response.totals.valorLiquidado) },
            { label: 'Total Pago', value: formatCurrency(response.totals.valorPago) },
          ],
          generatedAt,
        };
      }
      case 'receitas': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getReceitas({ ano, q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Código: item.codigo ?? 'N/D',
            Descrição: item.descricao,
            Realizado: formatCurrency(item.valorRealizado),
          })),
          completo: items.map((item) => ({
            Código: item.codigo ?? 'N/D',
            Descrição: item.descricao,
            Categoria: item.categoria ?? 'N/D',
            Previsto: formatCurrency(item.valorPrevisto),
            Realizado: formatCurrency(item.valorRealizado),
            Ano: item.ano,
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Código: item.codigo ?? 'N/D',
            Descrição: item.descricao,
            Natureza: item.naturezaReceita,
            Categoria: item.categoria ?? 'N/D',
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            Ano: item.ano,
            Mês: item.mes ?? 'N/D',
            ValorPrevisto: item.valorPrevisto,
            ValorRealizado: item.valorRealizado,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Código', 'Descrição', 'Realizado'],
            completo: ['Código', 'Descrição', 'Categoria', 'Previsto', 'Realizado', 'Ano'],
            bruto: ['Id', 'Código', 'Descrição', 'Natureza', 'Categoria', 'Órgão', 'Ano', 'Mês', 'ValorPrevisto', 'ValorRealizado'],
          },
        );

        return {
          title: 'Receitas Públicas',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Total Previsto', value: formatCurrency(response.totals.valorPrevisto) },
            { label: 'Total Realizado', value: formatCurrency(response.totals.valorRealizado) },
          ],
          generatedAt,
        };
      }
      case 'contratos': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getContratosGuidedSearch({
            q: queryText,
            ano,
            tipo: 'Todos',
            unidadeGestoraId,
            page,
            pageSize,
          }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Número: item.numero,
            Objeto: item.objeto,
            Valor: formatCurrency(item.valorGlobal),
          })),
          completo: items.map((item) => ({
            Número: item.numero,
            Objeto: item.objeto,
            Órgão: item.orgao,
            Fornecedor: item.fornecedor ?? 'N/D',
            Tipo: item.tipo,
            Valor: formatCurrency(item.valorGlobal),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Número: item.numero,
            Ano: item.ano,
            Objeto: item.objeto,
            Órgão: item.orgao,
            Fornecedor: item.fornecedor ?? 'N/D',
            Tipo: item.tipo,
            Modalidade: item.modalidade ?? 'N/D',
            Categoria: item.categoria ?? 'N/D',
            Status: item.status ?? 'N/D',
            DataAssinatura: item.dataAssinatura ?? 'N/D',
            InícioVigência: item.inicioVigencia ?? 'N/D',
            FimVigência: item.fimVigencia ?? 'N/D',
            ValorGlobal: item.valorGlobal,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Número', 'Objeto', 'Valor'],
            completo: ['Número', 'Objeto', 'Órgão', 'Fornecedor', 'Tipo', 'Valor'],
            bruto: ['Id', 'Número', 'Ano', 'Objeto', 'Órgão', 'Fornecedor', 'Tipo', 'Modalidade', 'Categoria', 'Status', 'DataAssinatura', 'InícioVigência', 'FimVigência', 'ValorGlobal'],
          },
        );

        return {
          title: 'Contratos Públicos',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Total Contratado', value: formatCurrency(response.totals.valorTotalContratado) },
            { label: 'Contratos Ativos', value: response.totals.contratosAtivos.toLocaleString('pt-BR') },
            { label: 'Com Licitação', value: `${response.totals.percentualComLicitacao}%` },
          ],
          generatedAt,
        };
      }
      case 'servidores': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getServidores({ ano, q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Nome: item.nome,
            Cargo: item.remuneracaoAtual?.cargo ?? 'N/D',
            'Remuneração Atual': item.remuneracaoAtual ? formatCurrency(item.remuneracaoAtual.valor) : 'N/D',
          })),
          completo: items.map((item) => ({
            Nome: item.nome,
            Matrícula: item.matricula ?? 'N/D',
            Cargo: item.remuneracaoAtual?.cargo ?? 'N/D',
            Órgão: item.remuneracaoAtual?.unidadeGestora.sigla ?? item.remuneracaoAtual?.unidadeGestora.nome ?? 'N/D',
            'Remuneração Atual': item.remuneracaoAtual ? formatCurrency(item.remuneracaoAtual.valor) : 'N/D',
            Média: formatCurrency(item.remuneracaoMedia),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Nome: item.nome,
            CPF: item.cpf ?? 'N/D',
            Matrícula: item.matricula ?? 'N/D',
            Cargo: item.remuneracaoAtual?.cargo ?? 'N/D',
            NaturezaCargo: item.remuneracaoAtual?.naturezaCargo ?? 'N/D',
            Categoria: item.remuneracaoAtual?.categoria ?? 'N/D',
            Órgão: item.remuneracaoAtual?.unidadeGestora.sigla ?? item.remuneracaoAtual?.unidadeGestora.nome ?? 'N/D',
            Ano: item.remuneracaoAtual?.ano ?? 'N/D',
            Mês: item.remuneracaoAtual?.mes ?? 'N/D',
            RemuneraçãoAtual: item.remuneracaoAtual?.valor ?? 'N/D',
            RemuneraçãoMédia: item.remuneracaoMedia,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Nome', 'Cargo', 'Remuneração Atual'],
            completo: ['Nome', 'Matrícula', 'Cargo', 'Órgão', 'Remuneração Atual', 'Média'],
            bruto: ['Id', 'Nome', 'CPF', 'Matrícula', 'Cargo', 'NaturezaCargo', 'Categoria', 'Órgão', 'Ano', 'Mês', 'RemuneraçãoAtual', 'RemuneraçãoMédia'],
          },
        );

        return {
          title: 'Servidores Públicos',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Servidores Encontrados', value: response.meta.total.toLocaleString('pt-BR') },
          ],
          generatedAt,
        };
      }
      case 'obras': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getObras({
            q: queryText,
            status: 'todas',
            unidadeGestoraId,
            page,
            pageSize,
          }),
          q,
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Obra: item.descricao,
            Município: item.municipio,
            Status: item.status,
          })),
          completo: items.map((item) => ({
            Obra: item.descricao,
            Município: item.municipio,
            Categoria: item.categoria ?? 'N/D',
            Progresso: `${item.percentualExecucao}%`,
            Valor: formatCurrency(item.valorTotal),
            Status: item.status,
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Obra: item.descricao,
            Município: item.municipio,
            Categoria: item.categoria ?? 'N/D',
            Status: item.status,
            PercentualExecução: item.percentualExecucao,
            ValorTotal: item.valorTotal,
            DataPrevisãoFim: item.dataPrevisaoFim ?? 'N/D',
            Credor: item.credorNome ?? 'N/D',
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Obra', 'Município', 'Status'],
            completo: ['Obra', 'Município', 'Categoria', 'Progresso', 'Valor', 'Status'],
            bruto: ['Id', 'Obra', 'Município', 'Categoria', 'Status', 'PercentualExecução', 'ValorTotal', 'DataPrevisãoFim', 'Credor'],
          },
        );

        return {
          title: 'Obras Públicas',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Obras Ativas', value: response.totals.obrasAtivas.toLocaleString('pt-BR') },
            { label: 'Investimento Total', value: formatCurrency(response.totals.investimentoTotal) },
            { label: 'No Prazo', value: `${response.totals.pctNoPrazo}%` },
          ],
          generatedAt,
        };
      }
      case 'programas': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getProgramas({ q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Programa: item.nome,
            Investimento: formatCurrency(item.investimento),
            Status: item.status,
          })),
          completo: items.map((item) => ({
            Programa: item.nome,
            Secretaria: item.secretaria,
            Investimento: formatCurrency(item.investimento),
            Status: item.status,
            Origens: item.origens.join(', '),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Programa: item.nome,
            Secretaria: item.secretaria,
            Beneficiados: item.beneficiados ?? 'N/D',
            Municípios: item.municipios ?? 'N/D',
            Investimento: item.investimento,
            Status: item.status,
            Descrição: item.descricao ?? 'N/D',
            Detalhe: item.detalhe ?? 'N/D',
            Origens: item.origens.join(', '),
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Programa', 'Investimento', 'Status'],
            completo: ['Programa', 'Secretaria', 'Investimento', 'Status', 'Origens'],
            bruto: ['Id', 'Programa', 'Secretaria', 'Beneficiados', 'Municípios', 'Investimento', 'Status', 'Descrição', 'Detalhe', 'Origens'],
          },
        );

        return {
          title: 'Programas Sociais',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Programas Ativos', value: response.totals.programasAtivos.toLocaleString('pt-BR') },
            { label: 'Investimento Total', value: formatCurrency(response.totals.investimentoTotal) },
          ],
          generatedAt,
        };
      }
      case 'transferencias': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getTransferencias({ ano, q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Tipo: item.tipo,
            Ano: item.ano,
            Realizado: formatCurrency(item.valorRealizado),
          })),
          completo: items.map((item) => ({
            Tipo: item.tipo,
            Ano: item.ano,
            Descrição: item.descricao ?? 'N/D',
            Programa: item.programa ?? 'N/D',
            Realizado: formatCurrency(item.valorRealizado),
            Pago: formatCurrency(item.valorPago),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            Tipo: item.tipo,
            Ano: item.ano,
            Mês: item.mes ?? 'N/D',
            Descrição: item.descricao ?? 'N/D',
            Categoria: item.categoria ?? 'N/D',
            Programa: item.programa ?? 'N/D',
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            ValorPrevisto: item.valorPrevisto,
            ValorRealizado: item.valorRealizado,
            ValorEmpenhado: item.valorEmpenhado,
            ValorLiquidado: item.valorLiquidado,
            ValorPago: item.valorPago,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Tipo', 'Ano', 'Realizado'],
            completo: ['Tipo', 'Ano', 'Descrição', 'Programa', 'Realizado', 'Pago'],
            bruto: ['Id', 'Tipo', 'Ano', 'Mês', 'Descrição', 'Categoria', 'Programa', 'Órgão', 'ValorPrevisto', 'ValorRealizado', 'ValorEmpenhado', 'ValorLiquidado', 'ValorPago'],
          },
        );

        return {
          title: 'Transferências',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Previsto', value: formatCurrency(response.totals.valorPrevisto) },
            { label: 'Realizado', value: formatCurrency(response.totals.valorRealizado) },
            { label: 'Pago', value: formatCurrency(response.totals.valorPago) },
          ],
          generatedAt,
        };
      }
      case 'emendas': {
        const { first: response, items } = await fetchAllPagesWithFallback((queryText, page, pageSize) =>
          getEmendas({ ano, q: queryText, unidadeGestoraId, page, pageSize }),
        );
        const rowsByLevel: Record<DetailLevelId, ReportRow[]> = {
          resumido: items.map((item) => ({
            Empenho: item.numeroEmpenho,
            Programa: item.programa ?? 'N/D',
            Pago: formatCurrency(item.valorPago),
          })),
          completo: items.map((item) => ({
            Empenho: item.numeroEmpenho,
            Descrição: item.descricao ?? 'N/D',
            Programa: item.programa ?? 'N/D',
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            Pago: formatCurrency(item.valorPago),
          })),
          bruto: items.map((item) => ({
            Id: item.id,
            DataEmissão: item.dataEmissao,
            Empenho: item.numeroEmpenho,
            Descrição: item.descricao ?? 'N/D',
            Programa: item.programa ?? 'N/D',
            Categoria: item.categoria ?? 'N/D',
            Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
            Credor: item.credorNome ?? 'N/D',
            ValorEmpenhado: item.valorEmpenhado,
            ValorLiquidado: item.valorLiquidado,
            ValorPago: item.valorPago,
          })),
        };
        const { headers, rows } = selectRowsByDetail(
          detailLevel,
          rowsByLevel,
          {
            resumido: ['Empenho', 'Programa', 'Pago'],
            completo: ['Empenho', 'Descrição', 'Programa', 'Órgão', 'Pago'],
            bruto: ['Id', 'DataEmissão', 'Empenho', 'Descrição', 'Programa', 'Categoria', 'Órgão', 'Credor', 'ValorEmpenhado', 'ValorLiquidado', 'ValorPago'],
          },
        );

        return {
          title: 'Emendas Parlamentares',
          headers,
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Empenhado', value: formatCurrency(response.totals.valorEmpenhado) },
            { label: 'Liquidado', value: formatCurrency(response.totals.valorLiquidado) },
            { label: 'Pago', value: formatCurrency(response.totals.valorPago) },
          ],
          generatedAt,
        };
      }
      default:
        throw new Error('Tipo de dado não selecionado.');
    }
  };

  const startGenerate = async () => {
    try {
      setGenerateError(null);
      setAiResumoNarrative(null);
      setAiResumoNarrativeStatus(
        sel.detailLevel === 'resumido' ? 'loading' : 'idle',
      );
      setIsGenerating(true);
      setGenProgress(15);
      await new Promise((resolve) => setTimeout(resolve, 180));
      setGenProgress(35);

      const reportData = await fetchReport();

      setGenProgress(78);
      await new Promise((resolve) => setTimeout(resolve, 180));
      setGenProgress(100);
      setReport(reportData);
      setIsGenerated(true);
    } catch (error) {
      setGenerateError(error instanceof Error ? error.message : 'Falha ao gerar relatório com dados reais.');
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 220);
    }
  };

  const goNext = () => {
    if (!canAdvance()) return;
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    void startGenerate();
  };

  const goBack = () => {
    if (step > 0) setStep((current) => current - 1);
  };

  const reset = () => {
    setSel({ dataType: '', period: '', periodStart: '', periodEnd: '', region: '', subRegion: '', detailLevel: '' });
    setMunicipio('');
    setSelectedUnidadeGestora(null);
    setUgSuggestions([]);
    setIsLoadingUgSuggestions(false);
    setUgSuggestionsError(null);
    setStep(0);
    setIsGenerated(false);
    setIsGenerating(false);
    setReport(null);
    setAiResumoNarrative(null);
    setAiResumoNarrativeStatus('idle');
    setGenerateError(null);
    setGenProgress(0);
  };

  const downloadJson = () => {
    if (!report) return;
    const payload = {
      filters: {
        dataType: sel.dataType,
        period: sel.period,
        region: sel.region,
        subRegion: sel.subRegion,
        municipio,
        unidadeGestoraId: selectedUnidadeGestora?.id,
        detailLevel: sel.detailLevel,
      },
      report,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${sel.dataType}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    if (!report) return;
    const csv = toCsv(report.headers, report.rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${sel.dataType}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = async () => {
    const params = new URLSearchParams({
      tipo: sel.dataType,
      periodo: sel.period,
      regiao: sel.region,
      sub: sel.subRegion,
      municipio,
      unidadeGestoraId: String(selectedUnidadeGestora?.id ?? ''),
      detalhe: sel.detailLevel,
    });

    const url = `${window.location.origin}/tecnico?${params.toString()}`;
    await navigator.clipboard.writeText(url);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--tp-page)' }}>
        <div className="w-full max-w-md text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} className="inline-flex size-20 items-center justify-center rounded-full mb-6" style={{ background: 'linear-gradient(135deg,#FFB800,#FF8C00)' }}>
            <DataSearchIcon size={40} className="text-white" style={{ color: 'white' }} />
          </motion.div>
          <h2 className="text-2xl mb-2" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>Gerando relatório com dados reais…</h2>
          <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--tp-surface-2)' }}>
            <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#FFB800,#FF8C00)' }} animate={{ width: `${genProgress}%` }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--tp-text-3)' }}>{genProgress}% concluído</p>
        </div>
      </div>
    );
  }

  if (isGenerated && report) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--tp-page)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex size-16 items-center justify-center rounded-full mb-3" style={{ backgroundColor: '#D1FAE5' }}>
                <Trophy className="size-9" style={{ color: '#10B981' }} />
              </div>
              <h1 className="text-3xl" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>Relatório Gerado</h1>
              <p className="text-sm" style={{ color: 'var(--tp-text-3)' }}>
                {report.total.toLocaleString('pt-BR')} registros reais encontrados · Atualizado em {report.generatedAt}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {dt && <span className="rounded-full px-3 py-1.5 text-sm" style={{ backgroundColor: `${dt.color}18`, color: dt.color }}>{dt.label}</span>}
              {period && <span className="rounded-full px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)', border: '1px solid var(--tp-border-subtle)' }}>{period.label}</span>}
              {region && <span className="rounded-full px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)', border: '1px solid var(--tp-border-subtle)' }}>{region.label}</span>}
              {detail && <span className="rounded-full px-3 py-1.5 text-sm" style={{ backgroundColor: `${detail.color}15`, color: detail.color, border: `1px solid ${detail.color}33` }}>{detail.label}</span>}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 mb-6">
              {report.totals.map((item) => (
                <div key={item.label} className="rounded-[14px] p-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                  <div className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{item.label}</div>
                  <div className="text-base" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {sel.detailLevel === 'resumido' && (
              <div className="rounded-[20px] p-5 mb-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 className="size-4" style={{ color: 'var(--tp-text-3)' }} />
                  <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
                    {resumoChartTitle}
                  </span>
                </div>
                <div className="h-64">
                  {resumoChartKind === 'pie' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resumoChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={52}
                          outerRadius={96}
                          paddingAngle={2}
                        >
                          {resumoChartData.map((entry, index) => (
                            <Cell
                              key={`${entry.name}-${index}`}
                              fill={RESUMO_CHART_COLORS[index % RESUMO_CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tp-surface)',
                            border: '1px solid var(--tp-border)',
                            color: 'var(--tp-text-1)',
                          }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          iconType="circle"
                          formatter={(value) => (
                            <span style={{ display: 'inline-block', padding: '6px 0' }}>{value}</span>
                          )}
                          wrapperStyle={{ fontSize: '12px', paddingLeft: '10px', lineHeight: 1.9 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : resumoChartKind === 'line' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={resumoChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--tp-border-subtle)" />
                        <XAxis dataKey="name" tick={{ fill: 'var(--tp-text-4)', fontSize: 11 }} />
                        <YAxis tick={{ fill: 'var(--tp-text-4)', fontSize: 11 }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tp-surface)',
                            border: '1px solid var(--tp-border)',
                            color: 'var(--tp-text-1)',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resumoChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--tp-border-subtle)" />
                        <XAxis dataKey="name" tick={{ fill: 'var(--tp-text-4)', fontSize: 11 }} />
                        <YAxis tick={{ fill: 'var(--tp-text-4)', fontSize: 11 }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tp-surface)',
                            border: '1px solid var(--tp-border)',
                            color: 'var(--tp-text-1)',
                          }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {resumoChartData.map((entry, index) => (
                            <Cell
                              key={`${entry.name}-${index}`}
                              fill={RESUMO_CHART_COLORS[index % RESUMO_CHART_COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            )}

            {sel.detailLevel === 'resumido' && (
              <div className="rounded-[16px] p-4 mb-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                {aiResumoNarrativeStatus === 'loading' ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 rounded-full" style={{ backgroundColor: 'var(--tp-surface-2)' }} />
                    <div className="h-3 rounded-full" style={{ backgroundColor: 'var(--tp-surface-2)' }} />
                    <div className="h-3 w-11/12 rounded-full" style={{ backgroundColor: 'var(--tp-surface-2)' }} />
                    <div className="h-3 w-10/12 rounded-full" style={{ backgroundColor: 'var(--tp-surface-2)' }} />
                    <div className="h-3 w-9/12 rounded-full" style={{ backgroundColor: 'var(--tp-surface-2)' }} />
                  </div>
                ) : aiResumoNarrativeStatus === 'success' && resumoNarrativeText ? (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>
                    <span style={{ display: 'block', textAlign: 'justify' }}>
                      {renderNarrativeWithBold(resumoNarrativeText)}
                    </span>
                  </p>
                ) : aiResumoNarrativeStatus === 'error' ? (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>
                    {resumoChartInsight}
                  </p>
                ) : null}
              </div>
            )}

            <div className="rounded-[20px] overflow-hidden mb-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--tp-border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Table2 className="size-4" style={{ color: 'var(--tp-text-3)' }} />
                  <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{report.title}</span>
                  <span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: 'var(--tp-surface-2)', color: 'var(--tp-text-3)' }}>
                    {Math.min(5, report.rows.length)} de {report.total.toLocaleString('pt-BR')} registros
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--tp-page)' }}>
                      {report.headers.map((header) => (
                        <th key={header} className="px-4 py-3 text-left text-xs uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--tp-text-4)' }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.rows.slice(0, 5).map((row, index) => (
                      <tr key={index} style={{ borderTop: '1px solid var(--tp-border-subtle)' }}>
                        {report.headers.map((header) => (
                          <td key={`${index}-${header}`} className="px-4 py-3 text-sm whitespace-nowrap" style={{ color: 'var(--tp-text-2)' }}>
                            {String(row[header] ?? '-')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 mb-8">
              <button onClick={downloadCsv} className="flex items-center gap-3 rounded-[16px] p-4 text-left" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <ArrowDownToLine className="size-5" style={{ color: '#3B82F6' }} />
                <div className="flex-1">
                  <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Baixar CSV</div>
                  <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Exportação real para planilhas</div>
                </div>
                <Download className="size-4" style={{ color: 'var(--tp-text-4)' }} />
              </button>

              <button onClick={downloadJson} className="flex items-center gap-3 rounded-[16px] p-4 text-left" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <ArrowDownToLine className="size-5" style={{ color: '#8B5CF6' }} />
                <div className="flex-1">
                  <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Baixar JSON</div>
                  <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Estrutura pronta para integração</div>
                </div>
                <Download className="size-4" style={{ color: 'var(--tp-text-4)' }} />
              </button>

              <button onClick={() => void copyShareLink()} className="flex items-center gap-3 rounded-[16px] p-4 text-left sm:col-span-2" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <Copy className="size-5" style={{ color: 'var(--tp-text-3)' }} />
                <div className="flex-1">
                  <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Copiar link da consulta</div>
                  <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Link com os filtros aplicados</div>
                </div>
              </button>
            </div>

            <div className="text-center">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm" style={{ backgroundColor: 'var(--tp-dark)', color: '#fff', fontWeight: 500 }}>
                <RefreshCw className="size-4" />
                Iniciar nova consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tp-page)' }}>
      <div style={{ backgroundColor: 'var(--tp-surface)', borderBottom: '1px solid var(--tp-border-subtle)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-2)' }}>
              ← Voltar
            </button>
            <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>/</span>
            <span className="text-xs" style={{ color: 'var(--tp-text-1)' }}>Explorar Dados</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl mb-2" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{STEPS[step].question}</h2>
            {generateError && (
              <p className="text-sm mt-2" style={{ color: '#DC2626' }}>{generateError}</p>
            )}
          </div>

          <div className="mb-6 flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-full" style={{ width: i === step ? 22 : 8, height: 8, backgroundColor: i <= step ? '#FFB800' : 'var(--tp-surface-2)' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              {step === 0 && (
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                  {DATA_TYPES.map((item) => {
                    const Icon = item.icon;
                    const selected = sel.dataType === item.id;
                    return (
                      <button key={item.id} onClick={() => setSel((current) => ({ ...current, dataType: item.id }))} className="relative flex flex-col items-center text-center rounded-[16px] p-4" style={{ backgroundColor: selected ? `${item.color}12` : 'var(--tp-surface)', border: selected ? `2px solid ${item.color}` : '2px solid var(--tp-border-subtle)' }}>
                        {selected && <div className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full" style={{ backgroundColor: item.color }}><Check className="size-3 text-white" /></div>}
                        <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-2`}>
                          <Icon className="size-6" />
                        </div>
                        <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{item.label}</div>
                        <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {PERIODS.map((item) => {
                      const selected = sel.period === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            setSel((current) => ({
                              ...current,
                              period: item.id,
                              periodStart: item.id === 'personalizado' ? current.periodStart : '',
                              periodEnd: item.id === 'personalizado' ? current.periodEnd : '',
                            }))
                          }
                          className="rounded-[16px] p-4 text-left"
                          style={{ backgroundColor: selected ? 'rgba(255,184,0,.10)' : 'var(--tp-surface)', border: selected ? '2px solid #FFB800' : '2px solid var(--tp-border-subtle)' }}
                        >
                          <Calendar className="size-5 mb-2" style={{ color: selected ? '#FFB800' : 'var(--tp-text-3)' }} />
                          <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{item.label}</div>
                          <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>{item.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                  {sel.period === 'personalizado' && (
                    <div className="grid gap-3 sm:grid-cols-2 rounded-[16px] p-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                      <label className="text-sm" style={{ color: 'var(--tp-text-2)' }}>
                        Data inicial
                        <input
                          type="date"
                          value={sel.periodStart}
                          onChange={(event) =>
                            setSel((current) => ({ ...current, periodStart: event.target.value }))
                          }
                          className="mt-1 w-full rounded-xl px-3 py-2.5 text-sm"
                          style={{ backgroundColor: 'var(--tp-page)', border: '1px solid var(--tp-border)', color: 'var(--tp-text-1)' }}
                        />
                      </label>
                      <label className="text-sm" style={{ color: 'var(--tp-text-2)' }}>
                        Data final
                        <input
                          type="date"
                          value={sel.periodEnd}
                          onChange={(event) =>
                            setSel((current) => ({ ...current, periodEnd: event.target.value }))
                          }
                          className="mt-1 w-full rounded-xl px-3 py-2.5 text-sm"
                          style={{ backgroundColor: 'var(--tp-page)', border: '1px solid var(--tp-border)', color: 'var(--tp-text-1)' }}
                        />
                      </label>
                      {sel.periodStart && sel.periodEnd && sel.periodStart > sel.periodEnd && (
                        <p className="sm:col-span-2 text-xs" style={{ color: '#DC2626' }}>
                          A data final deve ser igual ou posterior à data inicial.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="grid gap-3 grid-cols-2">
                    {REGIONS.map((item) => {
                      const Icon = item.icon;
                      const selected = sel.region === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSel((current) => ({
                              ...current,
                              region: item.id,
                              subRegion: '',
                            }));
                            if (item.id !== 'municipio') {
                              setMunicipio('');
                              setSelectedUnidadeGestora(null);
                            }
                          }}
                          className="rounded-[16px] p-4 text-left"
                          style={{ backgroundColor: selected ? `${item.color}12` : 'var(--tp-surface)', border: selected ? `2px solid ${item.color}` : '2px solid var(--tp-border-subtle)' }}
                        >
                          <Icon className="size-5 mb-2" style={{ color: item.color }} />
                          <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{item.label}</div>
                          <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>{item.sub}</div>
                        </button>
                      );
                    })}
                  </div>

                  {sel.region === 'macro' && (
                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 rounded-[16px] p-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                      {MACROS.map((macro) => (
                        <button key={macro.id} onClick={() => setSel((current) => ({ ...current, subRegion: macro.id }))} className="rounded-xl px-3 py-2 text-sm text-left" style={{ backgroundColor: sel.subRegion === macro.id ? 'rgba(16,185,129,.12)' : 'var(--tp-page)', border: sel.subRegion === macro.id ? '1.5px solid #10B981' : '1px solid var(--tp-border-subtle)' }}>
                          {macro.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {sel.region === 'municipio' && (
                    <div
                      className="rounded-[16px] p-4 space-y-2"
                      style={{
                        backgroundColor: 'var(--tp-surface)',
                        border: '1px solid var(--tp-border-subtle)',
                      }}
                    >
                      <input
                        value={municipio}
                        onChange={(event) => {
                          setMunicipio(event.target.value);
                          setSelectedUnidadeGestora(null);
                        }}
                        placeholder="Digite município ou UG"
                        className="w-full rounded-xl px-3 py-2.5 text-sm"
                        style={{
                          backgroundColor: 'var(--tp-page)',
                          border: '1px solid var(--tp-border)',
                          color: 'var(--tp-text-1)',
                        }}
                      />
                      <p
                        className="text-xs"
                        style={{ color: 'var(--tp-text-3)' }}
                      >
                        Sugestoes de UGs cadastradas no banco. Selecione uma
                        opcao para filtrar por unidade gestora.
                      </p>
                      {isLoadingUgSuggestions ? (
                        <p className="text-xs" style={{ color: 'var(--tp-text-3)' }}>
                          Buscando sugestoes...
                        </p>
                      ) : ugSuggestionsError ? (
                        <p className="text-xs" style={{ color: '#DC2626' }}>
                          {ugSuggestionsError}
                        </p>
                      ) : showNoUgCompatibility ? (
                        <p className="text-xs" style={{ color: '#DC2626' }}>
                          Nenhuma compatibilidade encontrada para o termo
                          informado.
                        </p>
                      ) : ugSuggestions.length > 0 ? (
                        <div
                          className="max-h-40 overflow-auto rounded-xl"
                          style={{
                            border: '1px solid var(--tp-border-subtle)',
                            backgroundColor: 'var(--tp-page)',
                          }}
                        >
                          {ugSuggestions.map((item) => {
                            const label = item.sigla
                              ? `${item.sigla} - ${item.nome}`
                              : `${item.codigo} - ${item.nome}`;
                            const selected =
                              selectedUnidadeGestora?.id === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                  selectUnidadeGestoraSuggestion(item)
                                }
                                className="w-full px-3 py-2 text-left text-sm"
                                style={{
                                  color: 'var(--tp-text-1)',
                                  backgroundColor: selected
                                    ? 'rgba(16,185,129,.12)'
                                    : 'transparent',
                                  borderBottom:
                                    '1px solid var(--tp-border-subtle)',
                                }}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                      {selectedUnidadeGestora && (
                        <p className="text-xs" style={{ color: '#10B981' }}>
                          UG selecionada: {selectedUnidadeGestora.label}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  {DETAIL_LEVELS.map((item) => {
                    const Icon = item.icon;
                    const selected = sel.detailLevel === item.id;
                    return (
                      <button key={item.id} onClick={() => setSel((current) => ({ ...current, detailLevel: item.id }))} className="w-full rounded-[16px] p-4 text-left" style={{ backgroundColor: selected ? `${item.color}10` : 'var(--tp-surface)', border: selected ? `2px solid ${item.color}` : '2px solid var(--tp-border-subtle)' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}18` }}>
                            <Icon className="size-5" style={{ color: item.color }} />
                          </div>
                          <div>
                            <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{item.label}</div>
                            <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>{item.badge}</div>
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--tp-text-2)' }}>{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button onClick={goBack} disabled={step === 0} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm" style={{ color: step === 0 ? 'var(--tp-text-4)' : 'var(--tp-text-2)', backgroundColor: step === 0 ? 'transparent' : 'var(--tp-surface)', border: `1px solid ${step === 0 ? 'transparent' : 'var(--tp-border-subtle)'}` }}>
              <ChevronLeft className="size-4" />
              Voltar
            </button>

            <button onClick={goNext} disabled={!canAdvance()} className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm" style={{ backgroundColor: canAdvance() ? (step === 3 ? '#FFB800' : '#0A1128') : 'var(--tp-surface-2)', color: canAdvance() ? (step === 3 ? '#0A1128' : '#fff') : 'var(--tp-text-4)', fontWeight: 600 }}>
              {step === 3 ? (<><Sparkles className="size-4" /> Gerar Relatório</>) : (<>Próximo <ChevronRight className="size-4" /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

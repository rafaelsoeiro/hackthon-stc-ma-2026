'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Map,
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
} from '@/src/lib/api/public-data-client';

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

type ReportRow = Record<string, string | number>;

type ReportData = {
  title: string;
  headers: string[];
  rows: ReportRow[];
  total: number;
  totals: Array<{ label: string; value: string }>;
  generatedAt: string;
};

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
  { id: 'macro', label: 'Por Macrorregião', sub: '6 macrorregiões', icon: Map, color: '#10B981', hasSubOptions: true },
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

type PagedResponse = {
  items: unknown[];
  meta: {
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

export default function TecnicoWizard({ onNavigate }: TecnicoWizardProps) {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [report, setReport] = useState<ReportData | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const [sel, setSel] = useState({
    dataType: '' as DataTypeId | '',
    period: '',
    periodStart: '',
    periodEnd: '',
    region: '',
    subRegion: '',
    detailLevel: '',
  });

  const dt = useMemo(() => DATA_TYPES.find((d) => d.id === sel.dataType), [sel.dataType]);
  const period = useMemo(() => PERIODS.find((p) => p.id === sel.period), [sel.period]);
  const region = useMemo(() => REGIONS.find((r) => r.id === sel.region), [sel.region]);
  const canAdvance = () => {
    if (step === 0) return !!sel.dataType;
    if (step === 1) return sel.period === 'personalizado' ? !!(sel.periodStart && sel.periodEnd) : !!sel.period;
    if (step === 2) {
      if (sel.region === 'macro') return !!sel.subRegion;
      if (sel.region === 'municipio') return municipio.trim().length > 1;
      return !!sel.region;
    }
    if (step === 3) return !!sel.detailLevel;
    return false;
  };

  const buildQueryText = (): string | undefined => {
    if (sel.region === 'municipio' && municipio.trim()) return municipio.trim();
    if (sel.region === 'macro' && sel.subRegion) return sel.subRegion;
    if (sel.region === 'capital') return 'São Luís';
    return undefined;
  };

  const fetchReport = async (): Promise<ReportData> => {
    const ano = yearFromPeriod(sel.period);
    const q = buildQueryText();
    const generatedAt = new Date().toLocaleString('pt-BR');

    switch (sel.dataType) {
      case 'despesas': {
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getDespesas({ ano, q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
          Descrição: item.descricao,
          Programa: item.programa ?? 'N/D',
          Empenhado: formatCurrency(item.valorEmpenhado),
          Liquidado: formatCurrency(item.valorLiquidado),
          Pago: formatCurrency(item.valorPago),
        }));

        return {
          title: 'Despesas Públicas',
          headers: ['Órgão', 'Descrição', 'Programa', 'Empenhado', 'Liquidado', 'Pago'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getReceitas({ ano, q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Código: item.codigo ?? 'N/D',
          Descrição: item.descricao,
          Categoria: item.categoria ?? 'N/D',
          Previsto: formatCurrency(item.valorPrevisto),
          Realizado: formatCurrency(item.valorRealizado),
          Ano: item.ano,
        }));

        return {
          title: 'Receitas Públicas',
          headers: ['Código', 'Descrição', 'Categoria', 'Previsto', 'Realizado', 'Ano'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getContratosGuidedSearch({
            q,
            ano,
            tipo: 'Todos',
            page,
            pageSize,
          }),
        );
        const rows = items.map((item) => ({
          Número: item.numero,
          Objeto: item.objeto,
          Órgão: item.orgao,
          Fornecedor: item.fornecedor ?? 'N/D',
          Tipo: item.tipo,
          Valor: formatCurrency(item.valorGlobal),
        }));

        return {
          title: 'Contratos Públicos',
          headers: ['Número', 'Objeto', 'Órgão', 'Fornecedor', 'Tipo', 'Valor'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getServidores({ ano, q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Nome: item.nome,
          Matrícula: item.matricula ?? 'N/D',
          Cargo: item.remuneracaoAtual?.cargo ?? 'N/D',
          Órgão: item.remuneracaoAtual?.unidadeGestora.sigla ?? item.remuneracaoAtual?.unidadeGestora.nome ?? 'N/D',
          'Remuneração Atual': item.remuneracaoAtual ? formatCurrency(item.remuneracaoAtual.valor) : 'N/D',
          'Média': formatCurrency(item.remuneracaoMedia),
        }));

        return {
          title: 'Servidores Públicos',
          headers: ['Nome', 'Matrícula', 'Cargo', 'Órgão', 'Remuneração Atual', 'Média'],
          rows,
          total: response.meta.total,
          totals: [
            { label: 'Servidores Encontrados', value: response.meta.total.toLocaleString('pt-BR') },
          ],
          generatedAt,
        };
      }
      case 'obras': {
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getObras({
            q,
            status: 'todas',
            page,
            pageSize,
          }),
        );
        const rows = items.map((item) => ({
          Obra: item.descricao,
          Município: item.municipio,
          Categoria: item.categoria ?? 'N/D',
          Progresso: `${item.percentualExecucao}%`,
          Valor: formatCurrency(item.valorTotal),
          Status: item.status,
        }));

        return {
          title: 'Obras Públicas',
          headers: ['Obra', 'Município', 'Categoria', 'Progresso', 'Valor', 'Status'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getProgramas({ q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Programa: item.nome,
          Secretaria: item.secretaria,
          Investimento: formatCurrency(item.investimento),
          Status: item.status,
          Origens: item.origens.join(', '),
        }));

        return {
          title: 'Programas Sociais',
          headers: ['Programa', 'Secretaria', 'Investimento', 'Status', 'Origens'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getTransferencias({ ano, q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Tipo: item.tipo,
          Ano: item.ano,
          Descrição: item.descricao ?? 'N/D',
          Programa: item.programa ?? 'N/D',
          Realizado: formatCurrency(item.valorRealizado),
          Pago: formatCurrency(item.valorPago),
        }));

        return {
          title: 'Transferências',
          headers: ['Tipo', 'Ano', 'Descrição', 'Programa', 'Realizado', 'Pago'],
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
        const { first: response, items } = await fetchAllPages((page, pageSize) =>
          getEmendas({ ano, q, page, pageSize }),
        );
        const rows = items.map((item) => ({
          Empenho: item.numeroEmpenho,
          Descrição: item.descricao ?? 'N/D',
          Programa: item.programa ?? 'N/D',
          Órgão: item.unidadeGestora.sigla ?? item.unidadeGestora.nome,
          Pago: formatCurrency(item.valorPago),
        }));

        return {
          title: 'Emendas Parlamentares',
          headers: ['Empenho', 'Descrição', 'Programa', 'Órgão', 'Pago'],
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
    setStep(0);
    setIsGenerated(false);
    setIsGenerating(false);
    setReport(null);
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
            </div>

            <div className="grid gap-3 sm:grid-cols-3 mb-6">
              {report.totals.map((item) => (
                <div key={item.label} className="rounded-[14px] p-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                  <div className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{item.label}</div>
                  <div className="text-base" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{item.value}</div>
                </div>
              ))}
            </div>

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
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {PERIODS.map((item) => {
                    const selected = sel.period === item.id;
                    return (
                      <button key={item.id} onClick={() => setSel((current) => ({ ...current, period: item.id }))} className="rounded-[16px] p-4 text-left" style={{ backgroundColor: selected ? 'rgba(255,184,0,.10)' : 'var(--tp-surface)', border: selected ? '2px solid #FFB800' : '2px solid var(--tp-border-subtle)' }}>
                        <Calendar className="size-5 mb-2" style={{ color: selected ? '#FFB800' : 'var(--tp-text-3)' }} />
                        <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{item.label}</div>
                        <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>{item.sub}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="grid gap-3 grid-cols-2">
                    {REGIONS.map((item) => {
                      const Icon = item.icon;
                      const selected = sel.region === item.id;
                      return (
                        <button key={item.id} onClick={() => setSel((current) => ({ ...current, region: item.id, subRegion: '' }))} className="rounded-[16px] p-4 text-left" style={{ backgroundColor: selected ? `${item.color}12` : 'var(--tp-surface)', border: selected ? `2px solid ${item.color}` : '2px solid var(--tp-border-subtle)' }}>
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
                        <button key={macro.id} onClick={() => setSel((current) => ({ ...current, subRegion: macro.label }))} className="rounded-xl px-3 py-2 text-sm text-left" style={{ backgroundColor: sel.subRegion === macro.label ? 'rgba(16,185,129,.12)' : 'var(--tp-page)', border: sel.subRegion === macro.label ? '1.5px solid #10B981' : '1px solid var(--tp-border-subtle)' }}>
                          {macro.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {sel.region === 'municipio' && (
                    <div className="rounded-[16px] p-4" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                      <input value={municipio} onChange={(event) => setMunicipio(event.target.value)} placeholder="Digite o município" className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: 'var(--tp-page)', border: '1px solid var(--tp-border)', color: 'var(--tp-text-1)' }} />
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

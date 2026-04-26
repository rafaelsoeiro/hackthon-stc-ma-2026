'use client';

import { useEffect, useState } from 'react';
import { FileText, Search, Filter, ChevronRight, X, CheckCircle, Building2, DollarSign, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageHeader from './PageHeader';
import { useDebouncedValue } from '@/src/lib/hooks/use-debounced-value';
import {
  getContratos,
  getContratosGuidedSearch,
  getContratosSummary,
  type ContratoItem,
  type ContratosSummaryResponse,
} from '@/src/lib/api/public-data-client';

interface ContractsPageProps {
  onNavigate?: (page: string) => void;
}

const AREAS = ['Saúde', 'Educação', 'Infraestrutura', 'Segurança Pública', 'Administração', 'Tecnologia'];
const TIPOS = ['Todos', 'Licitação', 'Dispensa', 'Inexigibilidade'];

type WizardStep = 'area' | 'periodo' | 'valor' | 'tipo';
type PeriodOption = '2026' | '2025' | '2024' | 'ultimos_6_meses' | 'ultimos_30_dias' | 'personalizado';

function normalizeTipoToApi(tipo: string): 'Todos' | 'Licitacao' | 'Dispensa' | 'Inexigibilidade' {
  if (tipo === 'Licitação') return 'Licitacao';
  if (tipo === 'Dispensa') return 'Dispensa';
  if (tipo === 'Inexigibilidade') return 'Inexigibilidade';
  return 'Todos';
}

export default function ContractsPage({ onNavigate }: ContractsPageProps) {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>('area');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('Todos');
  const [selectedPeriodo, setSelectedPeriodo] = useState<PeriodOption>('2026');
  const [valorMax, setValorMax] = useState(50);
  const [searchText, setSearchText] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [contracts, setContracts] = useState<ContratoItem[]>([]);
  const [summary, setSummary] = useState<ContratosSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guidedMode, setGuidedMode] = useState(false);
  const debouncedSearch = useDebouncedValue(searchText, 300);

  const wizardSteps: WizardStep[] = ['area', 'periodo', 'valor', 'tipo'];
  const currentStepIdx = wizardSteps.indexOf(wizardStep);

  const handleWizardClose = () => {
    setShowWizard(false);
    setWizardStep('area');
    setSelectedArea('');
    setSelectedPeriodo('2026');
  };

  const clearGuidedMode = () => {
    setGuidedMode(false);
    setSelectedArea('');
    setSelectedPeriodo('2026');
    setValorMax(50);
  };

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const tipoForApi = normalizeTipoToApi(selectedTipo);
        const anoForApi =
          selectedPeriodo === '2026' || selectedPeriodo === '2025' || selectedPeriodo === '2024'
            ? Number(selectedPeriodo)
            : undefined;
        const valorMaxForApi = valorMax >= 50 ? undefined : valorMax * 1_000_000;

        const [contractsResponse, summaryResponse] = await Promise.all([
          guidedMode
            ? getContratosGuidedSearch({
                q: debouncedSearch.trim() || undefined,
                tipo: tipoForApi,
                area: selectedArea || undefined,
                ano: anoForApi,
                valorMax: valorMaxForApi,
                pageSize: 50,
              })
            : getContratos({
                q: debouncedSearch.trim() || undefined,
                tipo: tipoForApi,
                pageSize: 50,
              }),
          getContratosSummary(),
        ]);

        if (!active) return;
        setContracts(contractsResponse.items);
        setSummary(summaryResponse);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar contratos.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [guidedMode, debouncedSearch, selectedTipo, selectedArea, selectedPeriodo, valorMax]);

  const filtered = contracts;

  const formatTipo = (tipo: string) =>
    tipo
      .replace('Licitacao', 'Licitação')
      .replace('Inexigibilidade', 'Inexigibilidade')
      .replace('Dispensa', 'Dispensa');

  const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : 'Não informado';

  const getTipoStyle = (tipo: string) => {
    switch (tipo) {
      case 'Licitação': return 'bg-[#D1FAE5] text-[#065F46]';
      case 'Dispensa': return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Inexigibilidade': return 'bg-[#FEE2E2] text-[#991B1B]';
      default: return 'bg-[#F1F5F9] text-[#475569]';
    }
  };

  return (
    <div className="min-h-[60vh] bg-[#F8FAFC]">
      {onNavigate && (
        <PageHeader
          title="Contratos Públicos"
          subtitle={
            summary
              ? `${summary.contratosAtivos} contratos ativos · R$ ${(summary.valorTotalContratado / 1_000_000_000).toFixed(1)} bi contratados · ${summary.percentualComLicitacao}% com licitação`
              : 'Carregando resumo de contratos...'
          }
          breadcrumbs={[{ label: 'Contratos Públicos' }]}
          onNavigate={onNavigate}
          actions={
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-1.5 rounded-full bg-[#FFB800] px-4 py-2 text-xs text-[#0A1128] hover:shadow-[0_4px_20px_rgba(255,184,0,0.3)] transition-all"
            >
              <Filter className="size-3.5" />
              Busca Guiada
            </button>
          }
        />
      )}

      <div className="py-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-[#0A1128] text-3xl mb-1">Contratos Públicos</h2>
            <p className="text-[#64748B]">
              <span className="text-[#0A1128]" style={{ fontWeight: 700 }}>
                {summary ? `${summary.contratosAtivos.toLocaleString('pt-BR')} contratos` : 'Carregando...'}
              </span>{' '}
              ativos ·{' '}
              {summary ? `R$ ${(summary.valorTotalContratado / 1_000_000_000).toFixed(1)} bi` : 'R$ --'} · Atualizado automaticamente
            </p>
          </div>

          {/* Botão gamificado */}
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 rounded-full bg-[#FFB800] px-5 py-3 text-sm text-[#0A1128] hover:shadow-[0_8px_30px_rgba(255,184,0,0.35)] hover:-translate-y-0.5 transition-all shrink-0"
          >
            <Filter className="size-4" />
            Busca Guiada — Passo a Passo
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total contratado', value: summary ? `R$ ${(summary.valorTotalContratado / 1_000_000_000).toFixed(1)} bi` : 'R$ --', icon: DollarSign, color: '#3B82F6' },
            { label: 'Com licitação', value: summary ? `${summary.percentualComLicitacao}%` : '--', icon: CheckCircle, color: '#10B981' },
            { label: 'Contratos ativos', value: summary ? summary.contratosAtivos.toLocaleString('pt-BR') : '--', icon: FileText, color: '#8B5CF6' },
            { label: 'Fornecedores', value: summary ? summary.fornecedoresUnicos.toLocaleString('pt-BR') : '--', icon: Building2, color: '#F59E0B' },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(10,17,40,0.08)]">
                <div className="flex size-10 items-center justify-center rounded-xl mb-3" style={{ backgroundColor: `${kpi.color}15` }}>
                  <Icon className="size-5" style={{ color: kpi.color }} />
                </div>
                <div className="text-xl text-[#0A1128]" style={{ fontWeight: 700 }}>{kpi.value}</div>
                <div className="text-xs text-[#64748B]">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Carregando contratos...
          </div>
        )}

        {/* Busca simples + filtros */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Buscar por objeto ou fornecedor..."
              className="w-full rounded-full border border-[rgba(10,17,40,0.10)] bg-white pl-11 pr-4 py-3 text-sm focus:border-[#0A1128] focus:outline-none focus:ring-2 focus:ring-[rgba(10,17,40,0.08)]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {TIPOS.map(tipo => (
              <button
                key={tipo}
                onClick={() => setSelectedTipo(tipo)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  selectedTipo === tipo
                    ? 'bg-[#0A1128] text-white'
                    : 'bg-white border border-[rgba(10,17,40,0.10)] text-[#475569] hover:border-[#0A1128]/30'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {guidedMode && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Busca guiada ativa:
            <span style={{ fontWeight: 700 }}> {selectedArea || 'Sem área'}</span>
            {' · '}
            <span style={{ fontWeight: 700 }}>{selectedPeriodo.replace(/_/g, ' ')}</span>
            {' · '}
            <span style={{ fontWeight: 700 }}>
              {valorMax >= 50 ? 'Sem limite de valor' : `Até R$ ${valorMax} milhões`}
            </span>
            <button
              onClick={clearGuidedMode}
              className="ml-3 rounded-full border border-amber-300 px-3 py-1 text-xs hover:bg-amber-100"
            >
              Limpar busca guiada
            </button>
          </div>
        )}

        {/* Lista de contratos */}
        <div className="space-y-3">
          {filtered.map((contract) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[20px] bg-white shadow-[0_4px_20px_-4px_rgba(10,17,40,0.08)] overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === contract.id ? null : contract.id)}
                className="flex w-full items-center gap-4 p-5 text-left hover:bg-[#F8FAFC]/50 transition-colors"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC]">
                  <FileText className="size-5 text-[#64748B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <span className={`rounded-full px-2 py-0.5 text-xs shrink-0 ${getTipoStyle(formatTipo(contract.tipo))}`}>
                      {formatTipo(contract.tipo)}
                    </span>
                    <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs text-[#64748B] shrink-0">
                      {contract.orgao}
                    </span>
                    <span className="text-xs text-[#94A3B8] shrink-0">{contract.numero}</span>
                  </div>
                  <h4 className="text-[#0A1128] truncate">{contract.objeto}</h4>
                  <p className="text-sm text-[#64748B]">{contract.fornecedor ?? 'Fornecedor não informado'}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[#0A1128]" style={{ fontWeight: 700 }}>
                    R$ {(contract.valorGlobal / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    {formatDate(contract.inicioVigencia)} → {formatDate(contract.fimVigencia)}
                  </div>
                </div>
                <ChevronRight className={`size-4 text-[#94A3B8] shrink-0 transition-transform ${expandedId === contract.id ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {expandedId === contract.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[rgba(10,17,40,0.06)] px-5 py-4 bg-[#F8FAFC]">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-xs text-[#94A3B8] mb-1">Modalidade</div>
                          <div className="text-[#0A1128]">{contract.modalidade ?? 'Não informado'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#94A3B8] mb-1">Início</div>
                          <div className="text-[#0A1128]">{formatDate(contract.inicioVigencia)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#94A3B8] mb-1">Término</div>
                          <div className="text-[#0A1128]">{formatDate(contract.fimVigencia)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#94A3B8] mb-1">Status</div>
                          <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-xs text-[#065F46]">
                            {contract.status ?? 'Não informado'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button className="rounded-full border border-[rgba(10,17,40,0.10)] bg-white px-4 py-2 text-xs text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                          📄 Ver contrato completo
                        </button>
                        <button className="rounded-full border border-[rgba(10,17,40,0.10)] bg-white px-4 py-2 text-xs text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                          📊 Histórico de pagamentos
                        </button>
                        <button className="rounded-full border border-[rgba(10,17,40,0.10)] bg-white px-4 py-2 text-xs text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                          🔍 Dados do fornecedor
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── WIZARD MODAL ── */}
      <AnimatePresence>
        {showWizard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleWizardClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 mx-auto max-w-lg rounded-[20px] bg-white shadow-2xl overflow-hidden"
            >
              {/* Wizard Header */}
              <div className="bg-[#0A1128] px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="size-4 text-[#FFB800]" />
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>Busca Guiada de Contratos</span>
                  </div>
                  <button onClick={handleWizardClose} className="flex size-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <X className="size-4 text-white/70" />
                  </button>
                </div>
                {/* Progress */}
                <div className="flex gap-1.5">
                  {wizardSteps.map((step, i) => (
                    <div
                      key={step}
                      className="h-1 flex-1 rounded-full transition-all"
                      style={{ backgroundColor: i <= currentStepIdx ? '#FFB800' : 'rgba(255,255,255,0.2)' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white/50">
                    Passo {currentStepIdx + 1} de {wizardSteps.length}
                  </span>
                  <span className="text-xs text-white/50">
                    {wizardStep === 'area' ? 'Área' : wizardStep === 'periodo' ? 'Período' : wizardStep === 'valor' ? 'Valor' : wizardStep === 'tipo' ? 'Tipo' : 'Resultados'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Área */}
                {wizardStep === 'area' && (
                  <div>
                    <h3 className="text-[#0A1128] text-xl mb-1">Qual área te interessa?</h3>
                    <p className="text-sm text-[#64748B] mb-5">Escolha a secretaria ou área de atuação do contrato</p>
                    <div className="grid grid-cols-2 gap-2">
                      {AREAS.map(area => (
                        <button
                          key={area}
                          onClick={() => setSelectedArea(area)}
                          className={`flex items-center gap-2 rounded-2xl border p-3 text-sm text-left transition-all ${
                            selectedArea === area
                              ? 'border-[#FFB800] bg-[#FFB800]/10 text-[#0A1128]'
                              : 'border-[rgba(10,17,40,0.10)] text-[#475569] hover:border-[#0A1128]/20'
                          }`}
                        >
                          {selectedArea === area && <CheckCircle className="size-4 text-[#FFB800] shrink-0" />}
                          {area}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button onClick={handleWizardClose} className="text-sm text-[#64748B] hover:text-[#0A1128] transition-colors">Cancelar</button>
                      <button
                        disabled={!selectedArea}
                        onClick={() => setWizardStep('periodo')}
                        className="flex items-center gap-2 rounded-full bg-[#0A1128] px-5 py-2.5 text-sm text-white disabled:opacity-40 hover:-translate-y-0.5 transition-all"
                      >
                        Próximo <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Período */}
                {wizardStep === 'periodo' && (
                  <div>
                    <h3 className="text-[#0A1128] text-xl mb-1">Qual período?</h3>
                    <p className="text-sm text-[#64748B] mb-5">Selecione o intervalo de tempo dos contratos</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: '2026 (até agora)', value: '2026' as const },
                        { label: '2025', value: '2025' as const },
                        { label: '2024', value: '2024' as const },
                        { label: 'Últimos 6 meses', value: 'ultimos_6_meses' as const },
                        { label: 'Últimos 30 dias', value: 'ultimos_30_dias' as const },
                        { label: 'Personalizado', value: 'personalizado' as const },
                      ].map((periodo) => (
                        <button
                          key={periodo.value}
                          onClick={() => setSelectedPeriodo(periodo.value)}
                          className={`rounded-2xl border p-3 text-sm text-left transition-all ${
                            selectedPeriodo === periodo.value
                              ? 'border-[#FFB800] bg-[#FFB800]/10 text-[#0A1128]'
                              : 'border-[rgba(10,17,40,0.10)] text-[#475569] hover:border-[#0A1128]/30'
                          }`}
                        >
                          <Calendar className="size-3.5 text-[#94A3B8] mb-1" />
                          {periodo.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button onClick={() => setWizardStep('area')} className="text-sm text-[#64748B] hover:text-[#0A1128] transition-colors">← Voltar</button>
                      <button onClick={() => setWizardStep('valor')} className="flex items-center gap-2 rounded-full bg-[#0A1128] px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 transition-all">
                        Próximo <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Valor */}
                {wizardStep === 'valor' && (
                  <div>
                    <h3 className="text-[#0A1128] text-xl mb-1">Faixa de valor</h3>
                    <p className="text-sm text-[#64748B] mb-5">Defina o valor máximo do contrato</p>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#64748B]">Até:</span>
                        <span className="text-[#0A1128]" style={{ fontWeight: 700 }}>
                          {valorMax >= 50 ? 'Sem limite' : `R$ ${valorMax} milhões`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={valorMax}
                        onChange={e => setValorMax(Number(e.target.value))}
                        className="w-full accent-[#FFB800]"
                      />
                      <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
                        <span>R$ 1M</span>
                        <span>Sem limite</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button onClick={() => setWizardStep('periodo')} className="text-sm text-[#64748B] hover:text-[#0A1128] transition-colors">← Voltar</button>
                      <button onClick={() => setWizardStep('tipo')} className="flex items-center gap-2 rounded-full bg-[#0A1128] px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 transition-all">
                        Próximo <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Tipo */}
                {wizardStep === 'tipo' && (
                  <div>
                    <h3 className="text-[#0A1128] text-xl mb-1">Tipo de contratação</h3>
                    <p className="text-sm text-[#64748B] mb-5">Como o contrato foi formalizado?</p>
                    <div className="space-y-2">
                      {[
                        { tipo: 'Todos', desc: 'Mostrar todos os tipos' },
                        { tipo: 'Licitação', desc: 'Contratos com processo licitatório — mais transparentes' },
                        { tipo: 'Dispensa', desc: 'Dispensas de licitação — casos previstos em lei' },
                        { tipo: 'Inexigibilidade', desc: 'Inexigibilidade — fornecedor único ou exclusivo' },
                      ].map(({ tipo, desc }) => (
                        <button
                          key={tipo}
                          onClick={() => setSelectedTipo(tipo)}
                          className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                            selectedTipo === tipo
                              ? 'border-[#FFB800] bg-[#FFB800]/08'
                              : 'border-[rgba(10,17,40,0.10)] hover:border-[#0A1128]/20'
                          }`}
                        >
                          {selectedTipo === tipo
                            ? <CheckCircle className="size-4 text-[#FFB800] shrink-0 mt-0.5" />
                            : <div className="size-4 rounded-full border-2 border-[#CBD5E1] shrink-0 mt-0.5" />
                          }
                          <div>
                            <div className="text-sm text-[#0A1128]" style={{ fontWeight: 600 }}>{tipo}</div>
                            <div className="text-xs text-[#64748B]">{desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button onClick={() => setWizardStep('valor')} className="text-sm text-[#64748B] hover:text-[#0A1128] transition-colors">← Voltar</button>
                      <button
                        onClick={() => {
                          setGuidedMode(true);
                          setShowWizard(false);
                        }}
                        className="flex items-center gap-2 rounded-full bg-[#FFB800] px-5 py-2.5 text-sm text-[#0A1128] hover:shadow-[0_4px_20px_rgba(255,184,0,0.3)] hover:-translate-y-0.5 transition-all"
                      >
                        <Sparkles className="size-4" />
                        Ver Resultados
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

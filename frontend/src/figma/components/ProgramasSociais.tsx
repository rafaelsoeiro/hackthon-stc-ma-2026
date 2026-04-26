'use client';

import { Heart, Users, DollarSign, ArrowRight, Search, Tag, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import { useDebouncedValue } from '@/src/lib/hooks/use-debounced-value';
import {
  getProgramas,
  getProgramasSummary,
  type ProgramaItem,
  type ProgramasSummaryResponse,
} from '@/src/lib/api/public-data-client';

interface ProgramasSociaisProps {
  onNavigate?: (page: string) => void;
}

type Origem = 'Licitacao' | 'Emenda' | 'Transferencia' | 'RecursoProprio';

const ORIGEM_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  Licitacao: { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0', label: 'Licitação' },
  Emenda: { bg: '#EDE9FE', text: '#5B21B6', border: '#DDD6FE', label: 'Emenda Parlamentar' },
  Transferencia: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE', label: 'Transferência Federal' },
  RecursoProprio: { bg: '#FEF9C3', text: '#854D0E', border: '#FEF08A', label: 'Recurso Próprio' },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ativo: { bg: '#D1FAE5', text: '#065F46', label: 'Ativo' },
  encerrado: { bg: '#F1F5F9', text: '#475569', label: 'Encerrado' },
  em_implantacao: { bg: '#FEF3C7', text: '#92400E', label: 'Em implantação' },
};

function formatCurrency(value: number) {
  if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(2)} bi`;
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(2)} mi`;
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

export default function ProgramasSociais({ onNavigate }: ProgramasSociaisProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterOrigem, setFilterOrigem] = useState<Origem | ''>('');
  const [items, setItems] = useState<ProgramaItem[]>([]);
  const [summary, setSummary] = useState<ProgramasSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebouncedValue(search, 300);

  const origens = useMemo(() => Object.keys(ORIGEM_STYLES) as Origem[], []);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const [programasResponse, summaryResponse] = await Promise.all([
          getProgramas({
            q: debouncedSearch.trim() || undefined,
            origem: filterOrigem || undefined,
            pageSize: 100,
          }),
          getProgramasSummary({
            q: debouncedSearch.trim() || undefined,
            origem: filterOrigem || undefined,
          }),
        ]);

        if (!active) return;

        setItems(programasResponse.items);
        setSummary(summaryResponse);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar programas sociais.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [debouncedSearch, filterOrigem]);

  return (
    <div className="min-h-[60vh] bg-[#F8FAFC]">
      {onNavigate && (
        <PageHeader
          title="Programas Sociais"
          subtitle={
            summary
              ? `${summary.programasAtivos} programas ativos · ${formatCurrency(summary.investimentoTotal)} investidos`
              : 'Carregando programas sociais...'
          }
          breadcrumbs={[{ label: 'Programas Sociais' }]}
          onNavigate={onNavigate}
        />
      )}

      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Beneficiados totais', value: summary?.beneficiadosTotal ? summary.beneficiadosTotal.toLocaleString('pt-BR') : 'N/D', icon: Users, color: '#EC4899' },
              { label: 'Investimento', value: summary ? formatCurrency(summary.investimentoTotal) : 'R$ --', icon: DollarSign, color: '#8B5CF6' },
              { label: 'Programas ativos', value: summary ? String(summary.programasAtivos) : '--', icon: Heart, color: '#10B981' },
              { label: 'Municípios', value: summary?.municipiosCobertos ? String(summary.municipiosCobertos) : 'N/D', icon: FileText, color: '#3B82F6' },
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

          <div className="mb-6 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(10,17,40,0.08)]">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="size-4 text-[#64748B]" />
              <span className="text-sm text-[#64748B]">Filtre por origem dos recursos:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {origens.map((o) => {
                const style = ORIGEM_STYLES[o];
                return (
                  <button
                    key={o}
                    onClick={() => setFilterOrigem(filterOrigem === o ? '' : o)}
                    className="rounded-full border px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5"
                    style={{
                      backgroundColor: filterOrigem === o ? style.text : style.bg,
                      color: filterOrigem === o ? '#FFF' : style.text,
                      borderColor: style.border,
                    }}
                  >
                    {style.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar programa por nome..."
              className="w-full rounded-full border border-[rgba(10,17,40,0.10)] bg-white pl-11 pr-4 py-3 text-sm focus:border-[#0A1128] focus:outline-none focus:ring-2 focus:ring-[rgba(10,17,40,0.08)]"
            />
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Carregando programas...
            </div>
          )}

          <div className="space-y-4">
            {items.map((prog, idx) => {
              const statusStyle = STATUS_STYLES[prog.status] ?? STATUS_STYLES.ativo;
              const isOpen = expanded === prog.id;

              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="rounded-[20px] bg-white shadow-[0_4px_20px_-4px_rgba(10,17,40,0.08)] overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F8FAFC]">
                        <Heart className="size-5 text-[#EC4899]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-[#0A1128] text-base">{prog.nome}</h3>
                          <span className="rounded-full px-2 py-0.5 text-xs shrink-0" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                            {statusStyle.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#64748B] mb-2">Secretaria: {prog.secretaria}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {prog.origens.map((origem) => {
                            const style = ORIGEM_STYLES[origem] ?? ORIGEM_STYLES.RecursoProprio;
                            return (
                              <span key={origem} className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs" style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}>
                                <Tag className="size-3" />
                                {style.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        { label: 'Beneficiados', value: prog.beneficiados ? prog.beneficiados.toLocaleString('pt-BR') : 'N/D' },
                        { label: 'Investimento', value: formatCurrency(prog.investimento) },
                        { label: 'Municípios', value: prog.municipios ? String(prog.municipios) : 'N/D' },
                      ].map((m, i) => (
                        <div key={i} className="rounded-xl bg-[#F8FAFC] p-3 text-center">
                          <div className="text-sm text-[#0A1128]" style={{ fontWeight: 700 }}>{m.value}</div>
                          <div className="text-xs text-[#94A3B8]">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpanded(isOpen ? null : prog.id)}
                      className="flex w-full items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
                    >
                      <span>Detalhes do programa</span>
                      {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="border-t border-[rgba(10,17,40,0.06)] px-5 py-4 bg-[#F8FAFC]">
                          <div className="rounded-2xl bg-white border border-[rgba(10,17,40,0.06)] p-4 mb-3">
                            <p className="text-sm text-[#0A1128] mb-1" style={{ fontWeight: 600 }}>
                              Resumo do programa:
                            </p>
                            <p className="text-sm text-[#475569] leading-relaxed">
                              {prog.detalhe ?? prog.descricao ?? 'Dados derivados das bases públicas do portal.'}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button className="flex items-center gap-1.5 rounded-full border border-[rgba(10,17,40,0.10)] bg-white px-3 py-2 text-xs text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                              <ArrowRight className="size-3" /> Ver dados detalhados
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

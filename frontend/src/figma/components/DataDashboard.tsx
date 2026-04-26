'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Download, Share2, TrendingUp, DollarSign, Users, Building } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'motion/react';
import JargonTooltip from './JargonTooltip';
import PageHeader from './PageHeader';
import { getAnalyticsSummary, type AnalyticsSummaryResponse } from '@/src/lib/api/public-data-client';

interface DataDashboardProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
  pageLabel?: string;
}

function toDomain(currentPage?: string): 'dados' | 'pessoas' | 'governo' {
  if (currentPage === 'pessoas') return 'pessoas';
  if (currentPage === 'governo') return 'governo';
  return 'dados';
}

function formatValue(value: number, label: string): string {
  if (label.toLowerCase().includes('percentual') || label.toLowerCase().includes('execucao')) {
    return `${Math.round(value)}%`;
  }
  if (label.toLowerCase().includes('contratos') || label.toLowerCase().includes('servidores') || label.toLowerCase().includes('unidades')) {
    return Math.round(value).toLocaleString('pt-BR');
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `R$ ${(value / 1_000_000_000).toFixed(2)} bi`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(2)} mi`;
  }
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

export default function DataDashboard({ onNavigate, currentPage, pageLabel = 'Painel' }: DataDashboardProps) {
  const [timeframe, setTimeframe] = useState('2025');
  const [data, setData] = useState<AnalyticsSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const domain = toDomain(currentPage);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAnalyticsSummary({ domain, ano: Number(timeframe) });
        if (!active) return;
        setData(response);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar painel.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [domain, timeframe]);

  const budgetData = data?.distribution ?? [];
  const monthlyData = data?.timeseries ?? [];
  const executionData = data?.execution ?? [];
  const kpis = data?.kpis ?? [];

  const colors = useMemo(
    () => ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
    [],
  );

  return (
    <div className="min-h-[60vh]" style={{ backgroundColor: 'var(--tp-page)' }}>
      {onNavigate && (
        <PageHeader
          title={pageLabel}
          subtitle="Acompanhe em tempo real a gestão dos recursos públicos do Maranhão"
          breadcrumbs={[{ label: pageLabel }]}
          onNavigate={onNavigate}
          actions={
            <div className="flex gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="rounded-full border px-3 py-1.5 text-xs focus:outline-none"
                style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-1)' }}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors" style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)' }}>
                <Download className="size-3" />
                Exportar
              </button>
            </div>
          }
        />
      )}

      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="mb-2" style={{ color: 'var(--tp-text-1)' }}>Painel Financeiro do Maranhão</h2>
                <p style={{ color: 'var(--tp-text-3)' }}>
                  {data ? `Base de ${data.context.year} atualizada com dados reais.` : 'Carregando dados...'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors" style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)' }}>
                  <Download className="size-4" />
                  Exportar
                </button>

                <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors" style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)' }}>
                  <Share2 className="size-4" />
                  Compartilhar
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Carregando analytics...
            </div>
          )}

          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, idx) => {
              const icon = idx === 0 ? DollarSign : idx === 1 ? TrendingUp : idx === 2 ? Building : Users;
              const Icon = icon;
              const color = idx === 0 ? 'from-green-500 to-green-600' : idx === 1 ? 'from-blue-500 to-blue-600' : idx === 2 ? 'from-purple-500 to-purple-600' : 'from-orange-500 to-orange-600';

              return (
                <motion.div
                  key={`${kpi.label}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl p-6 transition-shadow"
                  style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 2px 8px var(--tp-shadow)' }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <div className="mb-1 text-sm" style={{ color: 'var(--tp-text-3)' }}>{kpi.label}</div>
                  <div style={{ color: 'var(--tp-text-1)' }}>{formatValue(kpi.value, kpi.label)}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 2px 8px var(--tp-shadow)' }}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 style={{ color: 'var(--tp-text-1)' }}>Distribuição por Área</h3>
                  <p className="text-sm" style={{ color: 'var(--tp-text-3)' }}>Composição dos principais grupos</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={budgetData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                      {budgetData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)', borderRadius: '8px', color: 'var(--tp-text-1)' }} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-2">
                  {budgetData.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                        <span className="text-sm" style={{ color: 'var(--tp-text-2)' }}>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: 'var(--tp-text-1)' }}>{formatValue(item.value, 'valor')}</span>
                        <span className="text-xs w-10 text-right" style={{ color: 'var(--tp-text-3)' }}>{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 2px 8px var(--tp-shadow)' }}>
              <div className="mb-6">
                <h3 style={{ color: 'var(--tp-text-1)' }}>Série Temporal</h3>
                <p className="text-sm" style={{ color: 'var(--tp-text-3)' }}>Evolução mensal consolidada</p>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--tp-border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--tp-text-3)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--tp-text-3)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)', borderRadius: '8px', color: 'var(--tp-text-1)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="receita" stroke="#10b981" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} />
                  <Area type="monotone" dataKey="despesa" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDespesa)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8 rounded-2xl p-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 2px 8px var(--tp-shadow)' }}>
            <div className="mb-6">
              <h3 style={{ color: 'var(--tp-text-1)' }}>
                <JargonTooltip term="Execução" definition="Comparação entre valor planejado e valor executado no período.">
                  Execução
                </JargonTooltip>{' '}
                por Área
              </h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={executionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--tp-border-subtle)" />
                <XAxis dataKey="area" tick={{ fontSize: 12, fill: 'var(--tp-text-3)' }} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--tp-text-3)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)', borderRadius: '8px', color: 'var(--tp-text-1)' }} />
                <Legend />
                <Bar dataKey="planejado" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="executado" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <Sparkles className="size-6" />
              </div>
              <div>
                <h3>Insights automáticos</h3>
                <p className="text-sm text-white/80">Resumo analítico do período</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(data?.insights ?? ['Sem insights disponíveis no momento.']).map((insight, idx) => (
                <div key={`${insight}-${idx}`} className="rounded-xl bg-white/10 backdrop-blur p-4">
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

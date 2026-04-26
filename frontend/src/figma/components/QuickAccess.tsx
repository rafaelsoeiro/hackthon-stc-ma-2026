'use client';

import { DollarSign, Users, Building2, FileText, Heart, BarChart3, ArrowRight, TrendingUp, Clock, CheckCircle, AlertCircle, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { DataSearchIcon } from './icons/DataSearchIcon';

interface QuickAccessProps {
  onNavigate: (page: string) => void;
}

export default function QuickAccess({ onNavigate }: QuickAccessProps) {
  const thematicPanels = [
    {
      id: 'dados',
      title: 'Dinheiro Público',
      icon: DollarSign,
      anchor: 'R$ 18,4 bi',
      anchorLabel: 'Orçamento 2026',
      narrative: '62% executado · Jan–Abr/2026',
      description: 'Acompanhe o ciclo completo do dinheiro público: arrecadação de tributos, execução de despesas e transferências entre esferas de governo — com rastreabilidade por empenho.',
      databases: 12,
      tags: ['Receitas', 'Despesas', 'Empenhos', 'LRF'],
      update: 'D-1',
      color: '#3B82F6',
      gradient: 'from-blue-500 to-blue-700',
      preview: [
        { label: 'Educação', value: 'R$ 9,8 bi', pct: 34, color: '#3B82F6' },
        { label: 'Saúde', value: 'R$ 7,2 bi', pct: 25, color: '#10B981' },
        { label: 'Segurança Pública', value: 'R$ 4,3 bi', pct: 15, color: '#F59E0B' },
      ],
      cta: 'Ver execução orçamentária',
    },
    {
      id: 'pessoas',
      title: 'Servidores Públicos',
      icon: Users,
      anchor: '147.328',
      anchorLabel: 'servidores ativos',
      narrative: 'Folha mensal de R$ 1,2 bi',
      description: 'Consulte o quadro completo de pessoal do Estado: nome, cargo, órgão de lotação, remuneração bruta, descontos previdenciários e histórico funcional.',
      databases: 8,
      tags: ['Folha de Pagamento', 'Cargos', 'Órgãos', 'RPPS'],
      update: 'Abr/2026',
      color: '#8B5CF6',
      gradient: 'from-violet-500 to-violet-700',
      preview: [
        { label: 'Educação', value: '55.884', pct: 38, color: '#8B5CF6' },
        { label: 'Saúde', value: '29.465', pct: 20, color: '#EC4899' },
        { label: 'Segurança', value: '22.099', pct: 15, color: '#F59E0B' },
      ],
      cta: 'Consultar servidores',
    },
    {
      id: 'obras',
      title: 'Obras Públicas',
      icon: Building2,
      anchor: '847',
      anchorLabel: 'obras em andamento',
      narrative: '78% no prazo · 23 com atraso',
      description: 'Monitore obras em todos os 217 municípios — cronograma físico-financeiro, percentual executado, recursos contratados e responsáveis técnicos.',
      databases: 6,
      tags: ['Cronograma', 'Municípios', 'Recursos', 'Fiscalização'],
      update: 'D-1',
      color: '#10B981',
      gradient: 'from-emerald-500 to-emerald-700',
      obras: [
        { nome: 'Hospital Regional de Imperatriz', status: 'em_andamento', pct: 78 },
        { nome: 'Ponte sobre Rio Mearim — MA-106', status: 'atrasada', pct: 62 },
        { nome: 'UPA 24h Turu — São Luís', status: 'concluida', pct: 100 },
      ],
      cta: 'Ver mapa de obras',
    },
    {
      id: 'contratos',
      title: 'Contratos',
      icon: FileText,
      anchor: '12.430',
      anchorLabel: 'contratos ativos',
      narrative: 'R$ 8,6 bi · 89% com licitação',
      description: 'Acesse todos os contratos firmados pelo Estado: licitações, dispensas, inexigibilidades, fornecedores, vigência, aditivos e histórico de pagamentos.',
      databases: 9,
      tags: ['Licitações', 'Fornecedores', 'Aditivos', 'Dispensas'],
      update: 'D-1',
      color: '#F59E0B',
      gradient: 'from-amber-500 to-orange-600',
      preview: [
        { label: 'Com licitação', value: '11.062', pct: 89, color: '#10B981' },
        { label: 'Dispensas', value: '868', pct: 7, color: '#F59E0B' },
        { label: 'Inexigíveis', value: '500', pct: 4, color: '#EF4444' },
      ],
      cta: 'Buscar contratos',
    },
    {
      id: 'programas',
      title: 'Programas Sociais',
      icon: Heart,
      anchor: '680 mil',
      anchorLabel: 'beneficiados diretos',
      narrative: '15 programas ativos · R$ 1,2 bi',
      description: 'Veja os programas de proteção social em execução: critérios de elegibilidade, número de beneficiados por município, repasses e indicadores de impacto.',
      databases: 5,
      tags: ['Beneficiados', 'Municípios', 'Transferências', 'Impacto Social'],
      update: 'Abr/2026',
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-600',
      preview: [
        { label: 'Maranhão Livre da Fome', value: '340 mil', pct: 50, color: '#EC4899' },
        { label: 'Merenda Escolar', value: '190 mil', pct: 28, color: '#8B5CF6' },
        { label: 'Outros programas', value: '150 mil', pct: 22, color: '#3B82F6' },
      ],
      cta: 'Ver programas sociais',
    },
    {
      id: 'governo',
      title: 'Estrutura de Governo',
      icon: BarChart3,
      anchor: '28',
      anchorLabel: 'secretarias de estado',
      narrative: '102 unidades gestoras · 217 municípios',
      description: 'Explore o organograma completo do governo estadual: secretarias, autarquias, fundações, empresas públicas e respectivas unidades orçamentárias.',
      databases: 4,
      tags: ['Secretarias', 'Autarquias', 'Fundações', 'Organograma'],
      update: 'Jan/2026',
      color: '#00D4FF',
      gradient: 'from-cyan-400 to-cyan-600',
      preview: [
        { label: 'Administração Direta', value: '28', pct: 60, color: '#00D4FF' },
        { label: 'Autarquias e Fundações', value: '19', pct: 25, color: '#3B82F6' },
        { label: 'Empresas Públicas', value: '7', pct: 15, color: '#8B5CF6' },
      ],
      cta: 'Ver organograma',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'em_andamento': return <Clock className="size-3" />;
      case 'concluida': return <CheckCircle className="size-3" />;
      case 'atrasada': return <AlertCircle className="size-3" />;
      default: return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'em_andamento': return { bg: '#DBEAFE', text: '#1D4ED8', bar: '#3B82F6' };
      case 'concluida': return { bg: '#D1FAE5', text: '#065F46', bar: '#10B981' };
      case 'atrasada': return { bg: '#FEF3C7', text: '#92400E', bar: '#F59E0B' };
      default: return { bg: '#F1F5F9', text: '#475569', bar: '#94A3B8' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em_andamento': return 'Em andamento';
      case 'concluida': return 'Concluída';
      case 'atrasada': return 'Atrasada';
      default: return status;
    }
  };

  return (
    <div className="py-16" style={{ backgroundColor: 'var(--tp-page)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl" style={{ color: 'var(--tp-text-1)' }}>Eixos Temáticos</h2>
          <p className="text-lg" style={{ color: 'var(--tp-text-3)' }}>
            Explore cada área do governo com dados em tempo real
          </p>
        </div>

        {/* 2-column grid */}
        <div className="grid gap-7 md:grid-cols-2">
          {thematicPanels.map((panel, idx) => {
            const Icon = panel.icon;
            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="group relative flex flex-col overflow-hidden rounded-[20px] transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--tp-surface)',
                  boxShadow: '0 4px 24px -6px var(--tp-shadow)',
                  border: '1px solid var(--tp-border-subtle)',
                }}
              >
                {/* ── Cabeçalho do card ── */}
                <div className="p-6 pb-5">
                  <div className="flex items-start gap-5">

                    {/* Ícone grande com gradiente */}
                    <div
                      className={`relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${panel.gradient} text-white shadow-lg`}
                    >
                      <Icon className="size-8" />
                      {/* Reflexo sutil */}
                      <div className="absolute inset-0 rounded-2xl bg-white/10" />
                    </div>

                    {/* Título + número âncora */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xl leading-tight" style={{ color: 'var(--tp-text-1)' }}>
                          {panel.title}
                        </h3>
                        {/* Badge D-1 */}
                        <span className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs shrink-0"
                          style={{ backgroundColor: 'var(--tp-page)', borderColor: 'var(--tp-border)', color: 'var(--tp-text-3)' }}>
                          <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />
                          {panel.update}
                        </span>
                      </div>

                      {/* Número-âncora de destaque */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl leading-none" style={{ color: panel.color, fontWeight: 700 }}>
                          {panel.anchor}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--tp-text-4)' }}>
                          {panel.anchorLabel}
                        </span>
                      </div>

                      <p className="text-sm" style={{ color: 'var(--tp-text-3)' }}>{panel.narrative}</p>
                    </div>
                  </div>

                  {/* Descrição do eixo */}
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>
                    {panel.description}
                  </p>
                </div>

                {/* ── Metadados: bases de dados + tags ── */}
                <div className="px-6 pb-4 flex flex-wrap items-center gap-2">
                  {/* Indicador de bases */}
                  <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                    style={{ backgroundColor: `${panel.color}15`, color: panel.color }}>
                    <Layers className="size-3" />
                    {panel.databases} bases de dados
                  </span>
                  {/* Tags do eixo */}
                  {panel.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-1 text-xs border"
                      style={{ backgroundColor: 'var(--tp-page)', borderColor: 'var(--tp-border-subtle)', color: 'var(--tp-text-3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divisor */}
                <div className="mx-6" style={{ borderTop: '1px solid var(--tp-border-subtle)' }} />

                {/* ── Prévia de dados ── */}
                <div className="px-6 py-4 flex-1">
                  {panel.id === 'obras' && panel.obras ? (
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--tp-text-4)' }}>
                        Destaques em andamento
                      </p>
                      {panel.obras.map((obra, i) => {
                        const style = getStatusStyle(obra.status);
                        return (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm truncate max-w-[200px]" style={{ color: 'var(--tp-text-1)', fontWeight: 500 }}>{obra.nome}</span>
                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{obra.pct}%</span>
                                <span
                                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                                  style={{ backgroundColor: style.bg, color: style.text }}
                                >
                                  {getStatusIcon(obra.status)}
                                  {getStatusLabel(obra.status)}
                                </span>
                              </div>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--tp-surface-2)' }}>
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${obra.pct}%`, backgroundColor: style.bar }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--tp-text-4)' }}>
                        Distribuição por área
                      </p>
                      {panel.preview?.map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 500 }}>{item.label}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{item.value}</span>
                              <span className="text-xs w-8 text-right" style={{ color: 'var(--tp-text-4)' }}>{item.pct}%</span>
                            </div>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--tp-surface-2)' }}>
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── CTA ── */}
                <div className="px-6 py-4" style={{ borderTop: '1px solid var(--tp-border-subtle)' }}>
                  <button
                    onClick={() => onNavigate(panel.id)}
                    className="flex w-full items-center justify-between rounded-full py-3 px-5 text-sm transition-all group-hover:shadow-md"
                    style={{
                      backgroundColor: `${panel.color}18`,
                      color: panel.color,
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{panel.cta}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Modo Técnico */}
        <div className="mt-12 rounded-[20px] p-8 text-white" style={{ backgroundColor: 'var(--tp-dark)', boxShadow: '0 10px 40px -10px var(--tp-shadow-heavy)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <DataSearchIcon size={16} className="text-[#FFB800]" style={{ color: '#FFB800' }} />
                Para auditores e fiscalizadores
              </div>
              <h3 className="mb-2 text-2xl">Precisa dos dados técnicos completos?</h3>
              <p className="text-white/70">
                Acesse as 115 informações do Selo Diamante em CSV, JSON e XML para análise avançada
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onNavigate('tecnico')}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-sm hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}
              >
                <DataSearchIcon size={16} />
                Explorar Dados
              </button>
              <button
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10 transition-all"
              >
                <TrendingUp className="size-4" />
                API Pública
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

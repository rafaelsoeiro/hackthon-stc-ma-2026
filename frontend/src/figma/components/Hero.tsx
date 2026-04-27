'use client';

import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const dynamicShortcuts = [
    { text: 'Quanto o Maranhão gastou com saúde em 2026?', tag: 'Despesas' },
    { text: 'Obras paradas no meu município', tag: 'Obras' },
    { text: 'Salário dos servidores da educação', tag: 'Servidores' },
    { text: 'Contratos sem licitação acima de R$ 1 milhão', tag: 'Contratos' },
    { text: 'Programas sociais ativos no MA', tag: 'Social' },
    { text: 'Hospital Regional de Imperatriz: situação atual', tag: 'Obras' },
  ];

  const tagColors: Record<string, string> = {
    Despesas: 'bg-blue-500/20 text-blue-200',
    Obras: 'bg-green-500/20 text-green-200',
    Servidores: 'bg-purple-500/20 text-purple-200',
    Contratos: 'bg-orange-500/20 text-orange-200',
    Social: 'bg-pink-500/20 text-pink-200',
  };

  const kpis = [
    { value: 'R$ 18,4 bi', label: 'Orçamento 2026' },
    { value: '847', label: 'Obras ativas' },
    { value: '147k', label: 'Servidores' },
    { value: '680k', label: 'Beneficiados' },
  ];

  return (
    <div className="relative overflow-hidden bg-[#0A1128]">
      {/* Halo Âmbar Radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#FFB800] rounded-full blur-[140px] opacity-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00D4FF] rounded-full blur-[120px] opacity-05" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,184,0,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,184,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0 sm:pt-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge de atualização — Destaque D-1 */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/10 px-4 py-1.5 text-sm text-white/90">
              <Sparkles className="size-3.5 text-[#FFB800]" />
              IA conectada ao Tesauro Institucional · MT-0001 a MT-0049
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 px-3 py-1.5 text-xs text-[#10B981]">
              <RefreshCw className="size-3" />
              Atualizado em: 24/04/2026 (D-1)
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-5 text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Pergunte o que você quer saber
            <br />
            <span className="text-[#FFB800]">sobre o Maranhão</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-8 text-white/60 text-base max-w-2xl mx-auto"
          >
            Dados reais de despesas, obras, contratos e servidores — explicados de forma simples
            pela nossa IA integrada ao Tesauro Institucional.
          </motion.p>

          {/* Campo de busca IA — click leva à tela dedicada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <button
              onClick={() => onNavigate('ia')}
              className="group relative mx-auto block w-full max-w-3xl text-left"
              aria-label="Abrir conversa com a IA"
            >
              <div className="flex items-center rounded-full py-4 pl-6 pr-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-2 ring-transparent group-hover:ring-[rgba(255,184,0,0.5)] transition-all" style={{ backgroundColor: 'var(--tp-surface)' }}>
                {/* IA avatar */}
                <div className="mr-4 flex size-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--tp-dark)' }}>
                  <Sparkles className="size-4 text-[#FFB800]" />
                </div>
                <div className="flex-1">
                  <p className="text-base" style={{ color: 'var(--tp-text-1)' }}>
                    Ex: Quanto gastamos com merenda escolar em 2025?
                  </p>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--tp-text-4)' }}>
                    <ArrowRight className="size-3" />
                    Clique para abrir a conversa com a IA
                  </p>
                </div>
                <div className="ml-4 shrink-0 rounded-full px-5 py-2.5 text-sm group-hover:shadow-[0_4px_20px_rgba(255,184,0,0.4)] group-hover:-translate-y-0.5 transition-all" style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}>
                  Perguntar à IA
                </div>
              </div>
            </button>
          </motion.div>

          {/* Atalhos dinâmicos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <p className="mb-3 text-xs text-white/50 uppercase tracking-widest">
              Perguntas mais buscadas esta semana
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {dynamicShortcuts.map((shortcut, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate('ia')}
                  className="group flex items-center gap-2 rounded-full bg-white/08 backdrop-blur border border-white/10 px-4 py-2 text-left text-sm text-white/80 hover:bg-white/15 hover:border-white/25 hover:text-white transition-all"
                >
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs ${tagColors[shortcut.tag] || 'bg-white/20 text-white/60'}`}>
                    {shortcut.tag}
                  </span>
                  <span className="truncate max-w-[200px]">{shortcut.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* KPIs flutuantes */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="container relative mx-auto px-4 sm:px-6 lg:px-8 mt-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-t-[20px] overflow-hidden">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-[#0A1128]/60 backdrop-blur py-5 text-center">
              <div className="text-[#FFB800] text-xl sm:text-2xl" style={{ fontWeight: 700 }}>
                {kpi.value}
              </div>
              <div className="text-white/50 text-xs mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Wave Divider */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 52C840 56 960 56 1080 52C1200 48 1320 44 1380 42L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            style={{ fill: 'var(--tp-page)' }}
          />
        </svg>
      </div>
    </div>
  );
}

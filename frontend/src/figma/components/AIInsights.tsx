'use client';

import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Info, Bell, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import JargonTooltip from './JargonTooltip';

interface AIInsightsProps {
  onNavigate?: (page: string) => void;
}

export default function AIInsights({ onNavigate }: AIInsightsProps) {
  const insights = [
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Execução Orçamentária em dia',
      description: (
        <>
          A Secretaria de Educação{' '}
          <JargonTooltip
            term="Executou"
            definition="Gastou ou está em processo de pagar o valor previsto no orçamento."
          >
            executou
          </JargonTooltip>
          {' '}92% do orçamento planejado para o trimestre, superando a meta de 85%.
        </>
      ),
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      borderColor: '#A7F3D0',
      tag: 'Saúde fiscal',
    },
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Investimento em Saúde cresceu 15%',
      description: 'Comparado ao mesmo período de 2025, houve aumento significativo em medicamentos de alto custo e hospitais regionais.',
      iconBg: '#DBEAFE',
      iconColor: '#2563EB',
      borderColor: '#BFDBFE',
      tag: 'Tendência',
    },
    {
      type: 'alert',
      icon: AlertCircle,
      title: '23 obras com atraso de cronograma',
      description: 'Principais causas: condições climáticas e reajuste de contratos. Acompanhe o status de cada uma.',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      borderColor: '#FDE68A',
      tag: 'Atenção',
    },
    {
      type: 'info',
      icon: Info,
      title: 'Nova licitação de merenda escolar',
      description: (
        <>
          Processo de{' '}
          <JargonTooltip
            term="Licitação"
            definition="Processo pelo qual o governo escolhe qual empresa vai fornecer um produto ou serviço. É obrigatório por lei para garantir transparência e melhor preço."
          >
            licitação
          </JargonTooltip>
          {' '}em andamento para atender 680 mil alunos com investimento de R$ 450 milhões.
        </>
      ),
      iconBg: '#F3E8FF',
      iconColor: '#7C3AED',
      borderColor: '#DDD6FE',
      tag: 'Novidade',
    },
  ];

  return (
    <div className="py-16" style={{ backgroundColor: 'var(--tp-surface)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm" style={{ backgroundColor: 'var(--tp-dark)' }}>
            <Sparkles className="size-4 text-[#FFB800]" />
            Insights gerados por IA · Tesauro MT-0001 a MT-0049
          </div>
          <h2 className="mb-2" style={{ color: 'var(--tp-text-1)' }}>O que está acontecendo agora</h2>
          <p style={{ color: 'var(--tp-text-3)' }}>
            Nossa inteligência artificial analisa os dados e destaca as informações mais relevantes
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[20px] border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--tp-surface)',
                  borderColor: 'var(--tp-border)',
                  boxShadow: 'none',
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: insight.iconBg }}
                    >
                      <Icon className="size-5" style={{ color: insight.iconColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-base" style={{ color: 'var(--tp-text-1)' }}>{insight.title}</h3>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs shrink-0"
                          style={{ backgroundColor: insight.iconBg, color: insight.iconColor }}
                        >
                          {insight.tag}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>{insight.description}</div>

                      <button
                        className="mt-4 flex items-center gap-1 text-sm transition-colors hover:gap-2"
                        style={{ color: insight.iconColor }}
                        onClick={() => onNavigate?.('ia')}
                      >
                        Ver análise completa <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Alertas Personalizados */}
        <div className="mt-12 rounded-[20px] p-8 text-white" style={{ backgroundColor: 'var(--tp-dark)' }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFB800]/20">
              <Bell className="size-8 text-[#FFB800]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-1 text-xl">Quer análises personalizadas?</h3>
              <p className="text-white/70 text-sm">
                Configure alertas e receba notificações por e-mail sobre temas do seu interesse — contratos, obras, despesas e mais.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button className="flex items-center gap-2 rounded-full bg-[#FFB800] px-6 py-3 text-sm text-[#0A1128] hover:shadow-[0_4px_20px_rgba(255,184,0,0.3)] hover:-translate-y-0.5 transition-all">
                <Bell className="size-4" />
                Criar alerta
              </button>
              <button
                onClick={() => onNavigate?.('ia')}
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10 transition-all"
              >
                <Sparkles className="size-4" />
                Perguntar à IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
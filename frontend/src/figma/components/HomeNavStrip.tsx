'use client';

import { DollarSign, Building2, FileText, Heart, BarChart3, Users, Sparkles, MessageSquareWarning, FileSearch } from 'lucide-react';
import { DataSearchIcon } from './icons/DataSearchIcon';
import { motion } from 'motion/react';

interface HomeNavStripProps {
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  {
    id: 'ia',
    label: 'Perguntar à IA',
    icon: Sparkles,
    color: '#FFB800',
    bg: '#FFF7E0',
    border: '#FFB800',
    highlight: true,
  },
  {
    id: 'dados',
    label: 'Dinheiro Público',
    icon: DollarSign,
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    id: 'obras',
    label: 'Obras',
    icon: Building2,
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  {
    id: 'contratos',
    label: 'Contratos',
    icon: FileText,
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  {
    id: 'programas',
    label: 'Programas Sociais',
    icon: Heart,
    color: '#DB2777',
    bg: '#FDF2F8',
    border: '#FBCFE8',
  },
  {
    id: 'pessoas',
    label: 'Servidores',
    icon: Users,
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
  },
  {
    id: 'governo',
    label: 'Estrutura de Governo',
    icon: BarChart3,
    color: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
  },
  {
    id: 'tecnico',
    label: 'Explorar Dados',
    icon: DataSearchIcon,
    color: '#0A1128',
    bg: '#F8FAFC',
    border: '#CBD5E1',
  },
];

const PRIORITY_LINKS = [
  {
    label: 'Ouvidoria',
    icon: MessageSquareWarning,
    href: 'https://ouvidoria.ma.gov.br',
    color: '#92400E',
    bg: '#FEF3C7',
    border: '#FDE68A',
  },
  {
    label: 'e-SIC (LAI)',
    icon: FileSearch,
    href: 'https://esic.ma.gov.br',
    color: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
  },
];

export default function HomeNavStrip({ onNavigate }: HomeNavStripProps) {
  return (
    <div style={{ backgroundColor: 'var(--tp-surface)', borderBottom: '1px solid var(--tp-border-subtle)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Linha de prioridade: Ouvidoria + e-SIC */}
        <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="text-xs hidden sm:inline shrink-0" style={{ color: 'var(--tp-text-4)' }}>Acesso prioritário:</span>
          <div
            className="flex w-full min-w-0 items-center gap-2 overflow-x-auto sm:w-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRIORITY_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-sm shrink-0"
                  style={{ backgroundColor: link.bg, color: link.color, borderColor: link.border }}
                >
                  <Icon className="size-3" />
                  {link.label}
                </a>
              );
            })}
            <span style={{ color: 'var(--tp-border-sep)' }} className="hidden sm:inline">|</span>
            <a href="tel:08005550001" className="text-xs whitespace-nowrap shrink-0 hidden sm:inline transition-colors" style={{ color: 'var(--tp-text-4)' }}>
              0800 555 0001 · Gratuito
            </a>
          </div>
        </div>

        {/* Linha de navegação principal */}
        <div
          className="flex items-center gap-1.5 py-2.5 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <span className="text-xs mr-1 hidden md:inline shrink-0" style={{ color: 'var(--tp-text-4)' }}>Navegar:</span>
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-sm shrink-0"
                style={{
                  backgroundColor: item.highlight ? item.bg : item.bg,
                  color: item.color,
                  borderColor: item.border,
                  fontWeight: item.highlight ? 600 : 500,
                  boxShadow: item.highlight ? `0 0 0 1px ${item.border}` : undefined,
                }}
                aria-label={`Ir para ${item.label}`}
              >
                <Icon className="size-3.5 shrink-0" />
                {item.label}
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

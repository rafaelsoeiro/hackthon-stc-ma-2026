'use client';

import { Moon, Sun, Menu, User, Contrast, MessageSquareWarning, FileSearch } from 'lucide-react';
const logoReserva = '/logoreservamini.png';

interface HeaderProps {
  onMenuToggle: () => void;
  darkMode: boolean;
  highContrast: boolean;
  onToggleDarkMode: () => void;
  onToggleHighContrast: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({
  onMenuToggle,
  darkMode,
  highContrast,
  onToggleDarkMode,
  onToggleHighContrast,
  onNavigate,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'var(--tp-surface)',
        borderBottom: '1px solid var(--tp-border-subtle)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 1px 0 var(--tp-border-subtle)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 h-16 items-center">

          {/* ── Coluna esquerda: Menu + Prioridades ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onMenuToggle}
              className="flex size-10 items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--tp-text-1)' }}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-5" />
            </button>

            {/* Ouvidoria — prioridade máxima */}
            <button
              onClick={() => window.open('https://ouvidoria.ma.gov.br', '_blank')}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#FFB800]/60 bg-[#FFB800]/10 px-3 py-1.5 text-xs transition-all hover:bg-[#FFB800]/20 hover:border-[#FFB800] text-[#92600A]"
              aria-label="Acessar Ouvidoria"
              title="Ouvidoria do Estado do Maranhão"
            >
              <MessageSquareWarning className="size-3.5" />
              <span>Ouvidoria</span>
            </button>

            {/* e-SIC — prioridade máxima */}
            <button
              onClick={() => window.open('https://esic.ma.gov.br', '_blank')}
              className="hidden md:flex items-center gap-1.5 rounded-full border border-[#00D4FF]/50 bg-[#00D4FF]/08 px-3 py-1.5 text-xs transition-all hover:bg-[#00D4FF]/15 hover:border-[#00D4FF] text-[#0A6E87]"
              aria-label="Acessar e-SIC"
              title="Sistema de Informação ao Cidadão"
            >
              <FileSearch className="size-3.5" />
              <span>e-SIC</span>
            </button>
          </div>

          {/* ── Coluna central: Logo centralizado ── */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group"
              aria-label="Ir para página inicial"
            >
              {/* Logo institucional */}
              <div className="relative flex size-9 shrink-0 items-center justify-center">
                <img
                  src={logoReserva}
                  alt="Logo Portal Transparência"
                  className="size-9 object-contain"
                />
              </div>

              <div className="text-left">
                <div
                  className="leading-tight tracking-tight text-sm"
                  style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}
                >
                  Portal da Transparência
                </div>
                <div
                  className="text-xs leading-tight"
                  style={{ color: 'var(--tp-text-3)' }}
                >
                  Governo do Maranhão
                </div>
              </div>
            </button>
          </div>

          {/* ── Coluna direita: Acessibilidade + Login ── */}
          <div className="flex items-center justify-end gap-1.5">

            {/* Toggle Alto Contraste */}
            <button
              onClick={onToggleHighContrast}
              title={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
              aria-pressed={highContrast}
              aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
              className={`
                hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs
                transition-all duration-200 cursor-pointer select-none
                ${highContrast
                  ? 'border-[#FFB800] bg-[#FFB800] text-[#0A1128] shadow-[0_0_12px_rgba(255,184,0,0.4)]'
                  : ''
                }
              `}
              style={!highContrast ? { borderColor: 'var(--tp-border)', color: 'var(--tp-text-3)' } : {}}
            >
              <Contrast className="size-3.5" />
              <span className="hidden lg:inline">
                {highContrast ? 'Contraste: On' : 'Alto Contraste'}
              </span>
              <span className="lg:hidden">{highContrast ? 'On' : 'AA'}</span>
            </button>

            {/* Toggle Modo Noturno */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? 'Ativar modo claro' : 'Ativar modo noturno'}
              aria-pressed={darkMode}
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo noturno'}
              className={`
                hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs
                transition-all duration-200 cursor-pointer select-none
                ${darkMode
                  ? 'border-[#FFB800] bg-[#FFB800] text-[#0A1128] shadow-[0_0_12px_rgba(255,184,0,0.4)]'
                  : ''
                }
              `}
              style={!darkMode ? { borderColor: 'var(--tp-border)', color: 'var(--tp-text-3)' } : {}}
            >
              {darkMode ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              <span className="hidden lg:inline">
                {darkMode ? 'Modo Claro' : 'Modo Noturno'}
              </span>
              <span className="lg:hidden">{darkMode ? '☀' : '🌙'}</span>
            </button>

            {/* Botão Acessar */}
            <button
              className="flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}
              aria-label="Acessar área restrita"
            >
              <User className="size-4" />
              <span className="hidden sm:inline">Acessar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
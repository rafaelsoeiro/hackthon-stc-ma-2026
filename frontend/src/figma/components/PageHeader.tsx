'use client';

import { ChevronLeft, Home, RefreshCw } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  page?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (page: string) => void;
  updatedAt?: string;
  badge?: string;
  badgeColor?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  onNavigate,
  updatedAt = '24/04/2026 (D-1)',
  badge,
  badgeColor = '#10B981',
  actions,
}: PageHeaderProps) {
  return (
    <div style={{ backgroundColor: 'var(--tp-surface)', borderBottom: '1px solid var(--tp-border-subtle)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Breadcrumb + Back */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all"
            style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-2)' }}
            aria-label="Voltar ao Início"
          >
            <ChevronLeft className="size-3.5" />
            Voltar
          </button>

          <div className="h-4 w-px" style={{ backgroundColor: 'var(--tp-border-sep)' }} />

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 transition-colors shrink-0"
              style={{ color: 'var(--tp-text-4)' }}
            >
              <Home className="size-3" />
              <span>Início</span>
            </button>

            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 shrink-0">
                <span style={{ color: 'var(--tp-border-sep)' }}>/</span>
                {crumb.page ? (
                  <button
                    onClick={() => onNavigate(crumb.page!)}
                    className="transition-colors"
                    style={{ color: 'var(--tp-text-4)' }}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span style={{ color: 'var(--tp-text-1)', fontWeight: 500 }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Título + Meta */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl" style={{ color: 'var(--tp-text-1)' }}>{title}</h1>
              {badge && (
                <span
                  className="rounded-full px-2.5 py-1 text-xs text-white shrink-0"
                  style={{ backgroundColor: badge ? badgeColor : '#10B981' }}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-0.5 text-sm" style={{ color: 'var(--tp-text-3)' }}>{subtitle}</p>
            )}
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:justify-end">
            <div className="flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1.5 text-[11px] text-[#065F46] sm:text-xs shrink-0">
              <RefreshCw className="size-3" />
              Atualizado: {updatedAt}
            </div>
            {actions && (
              <div className="w-full min-w-0 overflow-x-auto sm:w-auto hide-scrollbar">
                <div className="flex items-center gap-2">{actions}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/src/lib/navigation';
import { useThemeSettings } from '@/src/providers/theme-provider';

type HeaderProps = {
  onMenuToggle: () => void;
};

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const { theme, highContrast, toggleTheme, toggleHighContrast } = useThemeSettings();

  const isActiveRoute = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--tp-border-subtle)] bg-[var(--tp-surface)]/95 backdrop-blur">
      <div className="mx-auto h-18 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onMenuToggle}
              className="inline-flex size-10 items-center justify-center rounded-full text-[var(--tp-text-1)] hover:bg-[var(--tp-surface-2)]"
              aria-label="Abrir menu"
            >
              <span className="text-xl leading-none">≡</span>
            </button>

            <a
              href="https://ouvidoria.ma.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm text-amber-700 md:inline-flex"
            >
              Ouvidoria
            </a>

            <a
              href="https://esic.ma.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-sm text-cyan-700 lg:inline-flex"
            >
              e-SIC
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--tp-border)]">
                <span className="text-sm font-semibold text-[var(--tp-text-1)]">PT</span>
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-base font-semibold text-[var(--tp-text-1)]">Portal da Transparencia</span>
                <span className="block text-sm text-[var(--tp-text-3)]">Governo do Maranhao</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleHighContrast}
              className="hidden rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-sm text-[var(--tp-text-2)] sm:inline-flex"
              aria-pressed={highContrast}
            >
              Alto Contraste
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden items-center gap-1 rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-sm text-[var(--tp-text-2)] sm:inline-flex"
              aria-pressed={theme === 'dark'}
            >
              <span aria-hidden>◐</span>
              {theme === 'dark' ? 'Modo Claro' : 'Modo Noturno'}
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full bg-[var(--tp-cta)] px-4 py-2 text-sm font-medium text-[var(--tp-cta-fg)]"
              aria-label="Acessar"
            >
              <span aria-hidden>•</span>
              <span className="hidden sm:inline">Acessar</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-t border-[var(--tp-border-subtle)] md:block">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-6 px-4 py-2 text-sm sm:px-6 lg:px-8">
          {NAV_ITEMS.slice(0, 6).map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'font-medium text-[var(--tp-text-1)]'
                    : 'text-[var(--tp-text-3)] hover:text-[var(--tp-text-1)]'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

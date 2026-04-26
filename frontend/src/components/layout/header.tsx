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
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-sm text-[var(--tp-text-1)] md:hidden"
            aria-label="Abrir menu"
          >
            Menu
          </button>
          <Link href="/" className="font-semibold tracking-tight text-[var(--tp-text-1)]">
            Portal da Transparencia
          </Link>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.slice(0, 6).map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'text-sm font-medium text-[var(--tp-text-1)]'
                    : 'text-sm text-[var(--tp-text-3)] hover:text-[var(--tp-text-1)]'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleHighContrast}
            className="rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-xs text-[var(--tp-text-2)]"
            aria-pressed={highContrast}
          >
            Contraste {highContrast ? 'On' : 'Off'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-xs text-[var(--tp-text-2)]"
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? 'Modo Claro' : 'Modo Noturno'}
          </button>
        </div>
      </div>
    </header>
  );
}

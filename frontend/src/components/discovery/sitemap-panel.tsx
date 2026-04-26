import Link from 'next/link';

import { NAV_ITEMS } from '@/src/lib/navigation';

export function SitemapPanel() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Mapa do site</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--tp-text-1)]">Estrutura de navegacao</h1>
        <p className="mt-2 text-sm text-[var(--tp-text-2)]">Visao consolidada das paginas publicas do portal.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4 text-sm text-[var(--tp-text-2)] hover:text-[var(--tp-text-1)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from 'next/link';

import { NAV_ITEMS } from '@/src/lib/navigation';

export function HomeNavStrip() {
  return (
    <section className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--tp-text-3)]">
        <span className="font-medium">Acesso prioritario:</span>
        <a
          href="https://ouvidoria.ma.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700"
        >
          Ouvidoria
        </a>
        <a
          href="https://esic.ma.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-cyan-700"
        >
          e-SIC
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {NAV_ITEMS.filter((item) => item.href !== '/').map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-[var(--tp-border)] bg-[var(--tp-page)] px-3 py-1.5 text-xs text-[var(--tp-text-2)] transition hover:border-[var(--tp-cta)] hover:text-[var(--tp-text-1)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

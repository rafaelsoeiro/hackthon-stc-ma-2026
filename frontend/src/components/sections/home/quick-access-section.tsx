import Link from 'next/link';

import { quickAccessCards } from '@/src/lib/home-content';

export function QuickAccessSection() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--tp-text-3)]">Eixos tematicos</p>
        <h2 className="text-2xl font-semibold text-[var(--tp-text-1)]">Acesso rapido por area</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickAccessCards.map((card) => (
          <article
            key={card.href}
            className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5 shadow-[var(--shadow-card)]"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--tp-text-3)]">{card.highlight}</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--tp-text-1)]">{card.title}</h3>
            <p className="mt-2 text-sm text-[var(--tp-text-2)]">{card.description}</p>
            <Link
              href={card.href}
              className="mt-4 inline-flex rounded-full border border-[var(--tp-border)] px-3 py-1.5 text-xs text-[var(--tp-text-1)] transition hover:bg-[var(--tp-surface-2)]"
            >
              Abrir painel
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

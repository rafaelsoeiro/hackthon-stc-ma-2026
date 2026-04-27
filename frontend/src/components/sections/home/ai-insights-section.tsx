import Link from 'next/link';

import { aiInsights } from '@/src/lib/home-content';

export function AIInsightsSection() {
  return (
    <section className="space-y-5 rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--tp-text-3)]">Insights IA</p>
        <h2 className="text-2xl font-semibold text-[var(--tp-text-1)]">O que esta acontecendo agora</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((insight) => (
          <article
            key={insight.title}
            className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-page)] p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-[var(--tp-surface-2)] px-2 py-0.5 text-xs text-[var(--tp-text-3)]">
                {insight.tag}
              </span>
            </div>
            <h3 className="text-base font-semibold text-[var(--tp-text-1)]">{insight.title}</h3>
            <p className="mt-2 text-sm text-[var(--tp-text-2)]">{insight.description}</p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/ia"
          className="inline-flex rounded-full bg-[var(--tp-cta)] px-4 py-2 text-sm font-medium text-[var(--tp-cta-fg)]"
        >
          Ver analise completa
        </Link>
        <Link
          href="/ia"
          className="inline-flex rounded-full border border-[var(--tp-border)] px-4 py-2 text-sm text-[var(--tp-text-1)]"
        >
          Configurar alertas
        </Link>
      </div>
    </section>
  );
}

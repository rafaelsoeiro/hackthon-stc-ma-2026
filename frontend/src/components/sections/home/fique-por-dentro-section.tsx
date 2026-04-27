import Link from 'next/link';

import { updates } from '@/src/lib/home-content';

export function FiquePorDentroSection() {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--tp-text-3)]">Atualizacoes em tempo real</p>
          <h2 className="text-2xl font-semibold text-[var(--tp-text-1)]">Fique por dentro</h2>
        </div>
        <Link href="/sitemap" className="text-sm text-[var(--tp-text-2)] underline-offset-4 hover:underline">
          Ver todas as secoes
        </Link>
      </div>

      <div className="grid gap-3">
        {updates.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-2 rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="rounded-full bg-[var(--tp-surface-2)] px-2 py-0.5 text-xs text-[var(--tp-text-3)]">
                {item.type}
              </span>
              <h3 className="mt-2 text-sm font-medium text-[var(--tp-text-1)]">{item.title}</h3>
            </div>
            <p className="text-xs text-[var(--tp-text-3)]">{item.date}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
        <h3 className="text-base font-semibold text-[var(--tp-text-1)]">Receba atualizacoes por e-mail</h3>
        <p className="mt-1 text-sm text-[var(--tp-text-2)]">
          Na Fase 5, esta area sera conectada com notificacoes personalizadas por tema.
        </p>
      </div>
    </section>
  );
}

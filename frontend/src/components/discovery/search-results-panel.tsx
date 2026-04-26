import Link from 'next/link';

import type { SearchEntry } from '@/src/features/discovery/types';

type SearchResultsPanelProps = {
  query: string;
  entries: SearchEntry[];
};

export function SearchResultsPanel({ query, entries }: SearchResultsPanelProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Busca</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--tp-text-1)]">
          Resultados para &quot;{query}&quot;
        </h1>
        <p className="mt-2 text-sm text-[var(--tp-text-2)]">{entries.length} resultado(s) encontrado(s).</p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6 text-sm text-[var(--tp-text-2)]">
          Nenhum resultado encontrado. Tente termos como &quot;contratos&quot;, &quot;educacao&quot; ou
          &quot;hospital&quot;.
        </div>
      ) : (
        <div className="grid gap-3">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-[var(--tp-surface-2)] px-2 py-0.5 text-xs text-[var(--tp-text-3)]">
                  {entry.domain}
                </span>
                <span className="text-xs text-[var(--tp-text-3)]">{entry.tags.join(' · ')}</span>
              </div>
              <h2 className="text-lg font-semibold text-[var(--tp-text-1)]">{entry.title}</h2>
              <p className="mt-1 text-sm text-[var(--tp-text-2)]">{entry.description}</p>
              <Link href={entry.route} className="mt-3 inline-flex text-sm text-[var(--tp-text-1)] underline">
                Abrir pagina
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

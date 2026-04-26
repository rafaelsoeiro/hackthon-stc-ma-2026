import type { GlossaryEntry } from '@/src/features/discovery/types';

type GlossaryPanelProps = {
  filter: string;
  entries: GlossaryEntry[];
};

export function GlossaryPanel({ filter, entries }: GlossaryPanelProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Glossario</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--tp-text-1)]">Termos de transparencia</h1>
        <p className="mt-2 text-sm text-[var(--tp-text-2)]">
          {filter ? `Filtro ativo: "${filter}".` : 'Use o parametro ?q= para filtrar termos por palavra-chave.'}
        </p>
      </div>

      <div className="grid gap-3">
        {entries.map((entry) => (
          <article key={entry.term} className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--tp-text-1)]">{entry.term}</h2>
              <span className="rounded-full bg-[var(--tp-surface-2)] px-2 py-0.5 text-xs text-[var(--tp-text-3)]">
                {entry.category}
              </span>
            </div>
            <p className="text-sm text-[var(--tp-text-2)]">{entry.definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

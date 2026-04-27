import type { KpiItem } from '@/src/features/analytics/types';

type KpiGridProps = {
  items: KpiItem[];
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5 shadow-[var(--shadow-card)]"
        >
          <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--tp-text-1)]">{item.value}</p>
          {item.trend ? <p className="mt-1 text-xs text-[var(--tp-text-3)]">{item.trend}</p> : null}
        </article>
      ))}
    </section>
  );
}

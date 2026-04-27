import type { DistributionItem } from '@/src/features/analytics/types';

type DistributionBarsProps = {
  title: string;
  items: DistributionItem[];
};

export function DistributionBars({ title, items }: DistributionBarsProps) {
  return (
    <section className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
      <h2 className="text-lg font-semibold text-[var(--tp-text-1)]">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm">
              <span className="text-[var(--tp-text-2)]">{item.label}</span>
              <span className="text-[var(--tp-text-1)]">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--tp-surface-2)]">
              <div
                className="h-2 rounded-full bg-[var(--tp-cta)]"
                style={{ width: `${Math.max(4, item.percentage)}%` }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

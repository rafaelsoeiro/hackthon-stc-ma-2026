import Link from 'next/link';

import type { FilterField } from '@/src/features/analytics/types';

type FilterBarProps = {
  fields: FilterField[];
  pathname: string;
  selected: Record<string, string>;
};

function buildHref(pathname: string, selected: Record<string, string>, key: string, value: string) {
  const params = new URLSearchParams(selected);
  params.set(key, value);
  return `${pathname}?${params.toString()}`;
}

export function FilterBar({ fields, pathname, selected }: FilterBarProps) {
  return (
    <section className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
      <p className="mb-3 text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Filtros</p>
      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[var(--tp-text-2)]">{field.label}:</span>
            {field.options.map((option) => {
              const current = selected[field.key] ?? field.options[0]?.value;
              const active = current === option.value;

              return (
                <Link
                  key={option.value}
                  href={buildHref(pathname, selected, field.key, option.value)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? 'border-[var(--tp-cta)] bg-[var(--tp-cta)] text-[var(--tp-cta-fg)]'
                      : 'border-[var(--tp-border)] bg-[var(--tp-page)] text-[var(--tp-text-2)] hover:text-[var(--tp-text-1)]'
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

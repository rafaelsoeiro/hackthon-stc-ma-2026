import { DataTable } from '@/src/components/analytics/data-table';
import { DistributionBars } from '@/src/components/analytics/distribution-bars';
import { FilterBar } from '@/src/components/analytics/filter-bar';
import { KpiGrid } from '@/src/components/analytics/kpi-grid';
import type { AnalyticsPageData } from '@/src/features/analytics/types';

type AnalyticsPageProps = {
  pathname: string;
  selected: Record<string, string>;
  data: AnalyticsPageData;
};

export function AnalyticsPage({ pathname, selected, data }: AnalyticsPageProps) {
  return (
    <div className="space-y-5 pb-4">
      <section className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Fase 4</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--tp-text-1)]">{data.title}</h1>
        <p className="mt-2 text-[var(--tp-text-2)]">{data.subtitle}</p>
      </section>

      <FilterBar fields={data.filters} pathname={pathname} selected={selected} />
      <KpiGrid items={data.kpis} />
      <DistributionBars title={data.distributionTitle} items={data.distribution} />
      <DataTable title={data.tableTitle} columns={data.tableColumns} rows={data.tableRows} />
    </div>
  );
}

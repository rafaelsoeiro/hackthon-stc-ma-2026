import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Estrutura de Governo | Portal da Transparencia MA',
  description: 'Visao institucional da estrutura administrativa do governo.',
};

type GovernoPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GovernoPage({ searchParams }: GovernoPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.governo;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/governo' selected={selected} data={data} />;
}

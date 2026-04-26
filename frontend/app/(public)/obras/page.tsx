import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Obras Publicas | Portal da Transparencia MA',
  description: 'Acompanhamento de obras publicas com filtros e detalhes.',
};

type ObrasPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ObrasPage({ searchParams }: ObrasPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.obras;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/obras' selected={selected} data={data} />;
}

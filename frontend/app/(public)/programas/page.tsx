import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Programas Sociais | Portal da Transparencia MA',
  description: 'Visualizacao de programas sociais e indicadores.',
};

type ProgramasPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProgramasPage({ searchParams }: ProgramasPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.programas;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/programas' selected={selected} data={data} />;
}

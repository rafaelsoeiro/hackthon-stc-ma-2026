import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Contratos | Portal da Transparencia MA',
  description: 'Consulta e analise de contratos governamentais.',
};

type ContratosPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContratosPage({ searchParams }: ContratosPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.contratos;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/contratos' selected={selected} data={data} />;
}

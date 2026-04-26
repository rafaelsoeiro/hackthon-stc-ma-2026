import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Servidores Publicos | Portal da Transparencia MA',
  description: 'Consulta de informacoes de servidores publicos.',
};

type PessoasPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PessoasPage({ searchParams }: PessoasPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.pessoas;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/pessoas' selected={selected} data={data} />;
}

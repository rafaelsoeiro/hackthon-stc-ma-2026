import type { Metadata } from 'next';

import { AnalyticsPage } from '@/src/components/analytics/analytics-page';
import { buildSelectedFilters } from '@/src/features/analytics/build-selected-filters';
import { analyticsDataByRoute } from '@/src/mocks/analytics-data';

export const metadata: Metadata = {
  title: 'Dinheiro Publico | Portal da Transparencia MA',
  description: 'Painel de dados financeiros da transparencia publica.',
};

type DadosPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DadosPage({ searchParams }: DadosPageProps) {
  const params = await searchParams;
  const data = analyticsDataByRoute.dados;
  const selected = buildSelectedFilters(data.filters, params);

  return <AnalyticsPage pathname='/dados' selected={selected} data={data} />;
}

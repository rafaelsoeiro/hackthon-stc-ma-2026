import type { Metadata } from 'next';

import { SearchResultsPanel } from '@/src/components/discovery';
import { searchEntries } from '@/src/mocks/discovery-data';

export const metadata: Metadata = {
  title: 'Busca | Portal da Transparencia MA',
  description: 'Resultados de busca com base nos parametros informados.',
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BuscaPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const qParam = params.q;
  const query = (Array.isArray(qParam) ? qParam[0] : qParam ?? '').trim();

  const normalized = query.toLowerCase();
  const filtered = normalized
    ? searchEntries.filter((entry) =>
        `${entry.title} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase().includes(normalized),
      )
    : searchEntries;

  return <SearchResultsPanel query={query || 'todos os temas'} entries={filtered} />;
}

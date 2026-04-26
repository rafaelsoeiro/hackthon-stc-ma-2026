import type { Metadata } from 'next';

import { GlossaryPanel } from '@/src/components/discovery';
import { glossaryEntries } from '@/src/mocks/discovery-data';

export const metadata: Metadata = {
  title: 'Glossario | Portal da Transparencia MA',
  description: 'Definicoes de termos tecnicos e de transparencia publica.',
};

type GlossarioPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GlossarioPage({ searchParams }: GlossarioPageProps) {
  const params = await searchParams;
  const qParam = params.q;
  const query = (Array.isArray(qParam) ? qParam[0] : qParam ?? '').trim().toLowerCase();

  const filtered = query
    ? glossaryEntries.filter((entry) =>
        `${entry.term} ${entry.definition} ${entry.category}`.toLowerCase().includes(query),
      )
    : glossaryEntries;

  return <GlossaryPanel filter={query} entries={filtered} />;
}

import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

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
  const query = Array.isArray(qParam) ? qParam[0] : qParam;

  return (
    <PageSkeleton
      phase="Fase 2"
      title="Resultados da Busca"
      description={
        query
          ? `Termo atual: "${query}". Esta rota ja esta preparada para URL state via searchParams.`
          : 'Use o parametro ?q= para compartilhar pesquisas. Exemplo: /busca?q=contratos.'
      }
    />
  );
}

import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Obras Publicas | Portal da Transparencia MA',
  description: 'Acompanhamento de obras publicas com filtros e detalhes.',
};

export default function ObrasPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Obras Publicas"
      description="Acompanhamento de obras publicas com filtros e detalhes."
    />
  );
}

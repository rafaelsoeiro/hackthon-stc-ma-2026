import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Explorar Dados | Portal da Transparencia MA',
  description: 'Area tecnica para exploracao orientada de dados.',
};

export default function TecnicoPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Explorar Dados"
      description="Area tecnica para exploracao orientada de dados."
    />
  );
}

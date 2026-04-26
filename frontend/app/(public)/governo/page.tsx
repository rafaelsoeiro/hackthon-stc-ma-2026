import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Estrutura de Governo | Portal da Transparencia MA',
  description: 'Visao institucional da estrutura administrativa do governo.',
};

export default function GovernoPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Estrutura de Governo"
      description="Visao institucional da estrutura administrativa do governo."
    />
  );
}

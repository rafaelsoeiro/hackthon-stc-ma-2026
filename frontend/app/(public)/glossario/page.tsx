import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Glossario | Portal da Transparencia MA',
  description: 'Definicoes de termos tecnicos e de transparencia publica.',
};

export default function GlossarioPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Glossario"
      description="Definicoes de termos tecnicos e de transparencia publica."
    />
  );
}

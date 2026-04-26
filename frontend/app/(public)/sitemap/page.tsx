import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Mapa do Site | Portal da Transparencia MA',
  description: 'Mapa navegavel das paginas e secoes do portal.',
};

export default function SitemapPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Mapa do Site"
      description="Mapa navegavel das paginas e secoes do portal."
    />
  );
}

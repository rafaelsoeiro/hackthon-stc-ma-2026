import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Institucional | Portal da Transparencia MA',
  description: 'Informacoes institucionais sobre o portal e o orgao responsavel.',
};

export default function InstitucionalPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Institucional"
      description="Informacoes institucionais sobre o portal e o orgao responsavel."
    />
  );
}

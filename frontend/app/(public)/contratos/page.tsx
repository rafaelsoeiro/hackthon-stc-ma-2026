import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Contratos | Portal da Transparencia MA',
  description: 'Consulta e analise de contratos governamentais.',
};

export default function ContratosPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Contratos"
      description="Consulta e analise de contratos governamentais."
    />
  );
}

import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Servidores Publicos | Portal da Transparencia MA',
  description: 'Consulta de informacoes de servidores publicos.',
};

export default function PessoasPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Servidores Publicos"
      description="Consulta de informacoes de servidores publicos."
    />
  );
}

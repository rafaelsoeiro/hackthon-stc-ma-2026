import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Programas Sociais | Portal da Transparencia MA',
  description: 'Visualizacao de programas sociais e indicadores.',
};

export default function ProgramasPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Programas Sociais"
      description="Visualizacao de programas sociais e indicadores."
    />
  );
}

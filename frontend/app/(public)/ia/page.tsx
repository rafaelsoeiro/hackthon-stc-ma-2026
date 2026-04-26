import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Assistente IA | Portal da Transparencia MA',
  description: 'Espaco de assistencia para consultas em linguagem natural.',
};

export default function IaPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Assistente IA"
      description="Espaco de assistencia para consultas em linguagem natural."
    />
  );
}

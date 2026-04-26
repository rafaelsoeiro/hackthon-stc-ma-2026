import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Dinheiro Publico | Portal da Transparencia MA',
  description: 'Painel de dados financeiros da transparencia publica.',
};

export default function DadosPage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Dinheiro Publico"
      description="Painel de dados financeiros da transparencia publica."
    />
  );
}

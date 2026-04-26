import type { Metadata } from 'next';

import { PageSkeleton } from '@/src/components/shared/page-skeleton';

export const metadata: Metadata = {
  title: 'Inicio | Portal da Transparencia MA',
  description: 'Pagina inicial do Portal da Transparencia do Governo do Maranhao.',
};

export default function HomePage() {
  return (
    <PageSkeleton
      phase="Fase 2"
      title="Pagina inicial estruturada por rota"
      description="A home agora esta no grupo publico de rotas e pronta para receber a migracao das secoes do mock na Fase 3."
    />
  );
}

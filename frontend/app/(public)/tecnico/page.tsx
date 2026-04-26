import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Explorar Dados | Portal da Transparencia MA',
  description: 'Area tecnica para exploracao orientada de dados.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="tecnico" />;
}

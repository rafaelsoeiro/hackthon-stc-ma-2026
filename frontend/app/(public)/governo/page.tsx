import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Estrutura de Governo | Portal da Transparencia MA',
  description: 'Visao institucional da estrutura administrativa do governo.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="governo" />;
}

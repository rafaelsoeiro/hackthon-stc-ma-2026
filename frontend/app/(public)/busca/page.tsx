import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Busca | Portal da Transparencia MA',
  description: 'Resultados de busca com base nos parametros informados.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="busca" />;
}

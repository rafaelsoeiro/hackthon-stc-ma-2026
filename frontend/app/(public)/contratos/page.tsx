import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Contratos | Portal da Transparencia MA',
  description: 'Consulta e analise de contratos governamentais.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="contratos" />;
}

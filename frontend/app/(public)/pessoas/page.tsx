import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Servidores Publicos | Portal da Transparencia MA',
  description: 'Consulta de informacoes de servidores publicos.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="pessoas" />;
}

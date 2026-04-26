import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Programas Sociais | Portal da Transparencia MA',
  description: 'Visualizacao de programas sociais e indicadores.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="programas" />;
}

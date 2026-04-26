import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Mapa do Site | Portal da Transparencia MA',
  description: 'Mapa navegavel das paginas e secoes do portal.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="sitemap" />;
}

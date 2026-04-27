import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Glossario | Portal da Transparencia MA',
  description: 'Definicoes de termos tecnicos e de transparencia publica.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="glossario" />;
}

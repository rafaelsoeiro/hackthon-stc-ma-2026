import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Institucional | Portal da Transparencia MA',
  description: 'Informacoes institucionais sobre o portal e o orgao responsavel.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="institucional" />;
}

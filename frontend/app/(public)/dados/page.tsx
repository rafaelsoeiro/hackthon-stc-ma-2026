import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Dinheiro Publico | Portal da Transparencia MA',
  description: 'Painel de dados financeiros da transparencia publica.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="dados" />;
}

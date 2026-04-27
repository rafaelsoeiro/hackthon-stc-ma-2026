import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Obras Publicas | Portal da Transparencia MA',
  description: 'Acompanhamento de obras publicas com filtros e detalhes.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="obras" />;
}

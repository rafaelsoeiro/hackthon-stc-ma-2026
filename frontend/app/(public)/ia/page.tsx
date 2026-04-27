import type { Metadata } from 'next';

import { FigmaRouteRenderer } from '@/src/components/figma/route-renderer';

export const metadata: Metadata = {
  title: 'Assistente IA | Portal da Transparencia MA',
  description: 'Espaco de assistencia para consultas em linguagem natural.',
};

export default function Page() {
  return <FigmaRouteRenderer kind="ia" />;
}

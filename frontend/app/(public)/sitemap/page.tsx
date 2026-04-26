import type { Metadata } from 'next';

import { SitemapPanel } from '@/src/components/discovery';

export const metadata: Metadata = {
  title: 'Mapa do Site | Portal da Transparencia MA',
  description: 'Mapa navegavel das paginas e secoes do portal.',
};

export default function SitemapPage() {
  return <SitemapPanel />;
}

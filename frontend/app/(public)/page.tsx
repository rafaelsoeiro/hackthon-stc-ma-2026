import type { Metadata } from 'next';

import { FigmaHomePage } from '@/src/components/figma/home-page';

export const metadata: Metadata = {
  title: 'Inicio | Portal da Transparencia MA',
  description: 'Pagina inicial com descoberta por IA, acessos rapidos e atualizacoes do portal.',
};

export default function HomePage() {
  return <FigmaHomePage />;
}

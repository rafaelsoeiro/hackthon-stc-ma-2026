import type { Metadata } from 'next';

import {
  AIInsightsSection,
  FiquePorDentroSection,
  HeroSection,
  HomeNavStrip,
  QuickAccessSection,
} from '@/src/components/sections/home';

export const metadata: Metadata = {
  title: 'Inicio | Portal da Transparencia MA',
  description: 'Pagina inicial com descoberta por IA, acessos rapidos e atualizacoes do portal.',
};

export default function HomePage() {
  return (
    <div className="space-y-6 pb-4">
      <HeroSection />
      <HomeNavStrip />
      <QuickAccessSection />
      <AIInsightsSection />
      <FiquePorDentroSection />
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { pageIdToPath } from '@/src/lib/figma-route-map';

const Hero = dynamic(() => import('@/src/figma/components/Hero'));
const HomeNavStrip = dynamic(() => import('@/src/figma/components/HomeNavStrip'));
const QuickAccess = dynamic(() => import('@/src/figma/components/QuickAccess'));
const AIInsights = dynamic(() => import('@/src/figma/components/AIInsights'));
const FiquePorDentro = dynamic(() => import('@/src/figma/components/FiquePorDentro'));

export function FigmaHomePage() {
  const router = useRouter();

  const handleNavigate = useCallback((page: string) => {
    const target = pageIdToPath[page] ?? '/';
    router.push(target);
  }, [router]);

  return (
    <div className="overflow-x-hidden">
      <Hero onNavigate={handleNavigate} />
      <HomeNavStrip onNavigate={handleNavigate} />
      <QuickAccess onNavigate={handleNavigate} />
      <AIInsights onNavigate={handleNavigate} />
      <FiquePorDentro onNavigate={handleNavigate} />
    </div>
  );
}

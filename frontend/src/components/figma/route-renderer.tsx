'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { pageIdToPath } from '@/src/lib/figma-route-map';

const DataDashboard = dynamic(() => import('@/src/figma/components/DataDashboard'));
const ObrasMap = dynamic(() => import('@/src/figma/components/ObrasMap'));
const ContractsPage = dynamic(() => import('@/src/figma/components/ContractsPage'));
const ProgramasSociais = dynamic(() => import('@/src/figma/components/ProgramasSociais'));
const AIChat = dynamic(() => import('@/src/figma/components/AIChat'));
const TecnicoWizard = dynamic(() => import('@/src/figma/components/TecnicoWizard'));
const InstitucionalPage = dynamic(() => import('@/src/figma/components/InstitucionalPage'));
const SitemapPage = dynamic(() => import('@/src/figma/components/SitemapPage'));
const GlossarioPage = dynamic(() => import('@/src/figma/components/GlossarioPage'));
const SearchResults = dynamic(() => import('@/src/figma/components/SearchResults'));

type FigmaRouteKind =
  | 'dados'
  | 'pessoas'
  | 'governo'
  | 'obras'
  | 'contratos'
  | 'programas'
  | 'ia'
  | 'tecnico'
  | 'institucional'
  | 'sitemap'
  | 'glossario'
  | 'busca';

export function FigmaRouteRenderer({ kind }: { kind: FigmaRouteKind }) {
  const router = useRouter();
  const navigate = useCallback((page: string) => router.push(pageIdToPath[page] ?? '/'), [router]);

  if (kind === 'dados') {
    return <DataDashboard onNavigate={navigate} currentPage="dados" pageLabel="Dinheiro Público" />;
  }

  if (kind === 'pessoas') {
    return <DataDashboard onNavigate={navigate} currentPage="pessoas" pageLabel="Servidores Públicos" />;
  }

  if (kind === 'governo') {
    return <DataDashboard onNavigate={navigate} currentPage="governo" pageLabel="Estrutura de Governo" />;
  }

  if (kind === 'obras') {
    return <ObrasMap onNavigate={navigate} />;
  }

  if (kind === 'contratos') {
    return <ContractsPage onNavigate={navigate} />;
  }

  if (kind === 'programas') {
    return <ProgramasSociais onNavigate={navigate} />;
  }

  if (kind === 'ia') {
    return <AIChat onNavigate={navigate} />;
  }

  if (kind === 'tecnico') {
    return <TecnicoWizard onNavigate={navigate} />;
  }

  if (kind === 'institucional') {
    return <InstitucionalPage onNavigate={navigate} />;
  }

  if (kind === 'sitemap') {
    return <SitemapPage onNavigate={navigate} />;
  }

  if (kind === 'glossario') {
    return <GlossarioPage onNavigate={navigate} />;
  }

  return <SearchResults />;
}

import type { Metadata } from 'next';

import { InstitutionalPanel } from '@/src/components/discovery';

export const metadata: Metadata = {
  title: 'Institucional | Portal da Transparencia MA',
  description: 'Informacoes institucionais sobre o portal e o orgao responsavel.',
};

export default function InstitucionalPage() {
  return <InstitutionalPanel />;
}

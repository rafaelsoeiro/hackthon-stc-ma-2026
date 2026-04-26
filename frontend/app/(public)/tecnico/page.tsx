import type { Metadata } from 'next';

import { TechnicalCatalogPanel } from '@/src/components/discovery';
import { datasetEntries } from '@/src/mocks/discovery-data';

export const metadata: Metadata = {
  title: 'Explorar Dados | Portal da Transparencia MA',
  description: 'Area tecnica para exploracao orientada de dados.',
};

export default function TecnicoPage() {
  return <TechnicalCatalogPanel items={datasetEntries} />;
}

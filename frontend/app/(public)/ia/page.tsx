import type { Metadata } from 'next';

import { AiAssistantPanel } from '@/src/components/discovery';

export const metadata: Metadata = {
  title: 'Assistente IA | Portal da Transparencia MA',
  description: 'Espaco de assistencia para consultas em linguagem natural.',
};

export default function IaPage() {
  return <AiAssistantPanel />;
}

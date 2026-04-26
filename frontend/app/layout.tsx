import type { Metadata } from 'next';

import { AppShell } from '@/src/components/layout/app-shell';
import { ThemeProvider } from '@/src/providers/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Portal da Transparencia MA',
  description: 'Frontend do Portal da Transparencia com navegacao modular e acessivel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <a href="#main-content" className="skip-link">
          Pular para o conteudo principal
        </a>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import { useState, type ReactNode } from 'react';

import { Footer } from '@/src/components/layout/footer';
import { Header } from '@/src/components/layout/header';
import { Sidebar } from '@/src/components/layout/sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--tp-page)] text-[var(--tp-text-1)]">
      <Header onMenuToggle={() => setIsSidebarOpen(true)} />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-6 sm:px-6 md:grid-cols-[16rem_1fr] lg:px-8">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main id="main-content">{children}</main>
      </div>

      <Footer />
    </div>
  );
}

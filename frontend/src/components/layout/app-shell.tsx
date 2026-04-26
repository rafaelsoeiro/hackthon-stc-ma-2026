'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Footer from '@/src/figma/components/Footer';
import Header from '@/src/figma/components/Header';
import Sidebar from '@/src/figma/components/Sidebar';
import ChatBot from '@/src/figma/components/ChatBot';
import AccessibilityWidget from '@/src/figma/components/AccessibilityWidget';
import { pageIdToPath, pathToPageId } from '@/src/lib/figma-route-map';
import { useThemeSettings } from '@/src/providers/theme-provider';

export function AppShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, highContrast, toggleTheme, toggleHighContrast } = useThemeSettings();
  const currentPage = pathToPageId(pathname);

  const navigate = useCallback((page: string) => {
    const target = pageIdToPath[page] ?? '/';
    router.push(target);
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--tp-page)] text-[var(--tp-text-1)]">
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        darkMode={theme === 'dark'}
        highContrast={highContrast}
        onToggleDarkMode={toggleTheme}
        onToggleHighContrast={toggleHighContrast}
        onNavigate={navigate}
        currentPage={currentPage}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={navigate}
      />

      <main id="main-content" className="w-full">
        {children}
      </main>

      <Footer onNavigate={navigate} />
      {currentPage !== 'ia' && <ChatBot onOpenFullChat={() => navigate('ia')} />}
      <AccessibilityWidget />
    </div>
  );
}

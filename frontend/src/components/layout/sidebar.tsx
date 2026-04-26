'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/src/lib/navigation';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4 shadow-xl transition-transform md:static md:z-0 md:h-auto md:w-64 md:translate-x-0 md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <strong className="text-[var(--tp-text-1)]">Navegacao</strong>
          <button
            type="button"
            className="rounded border border-[var(--tp-border)] px-2 py-1 text-sm"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--tp-surface-2)] text-[var(--tp-text-1)]'
                    : 'text-[var(--tp-text-2)] hover:bg-[var(--tp-surface-2)] hover:text-[var(--tp-text-1)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

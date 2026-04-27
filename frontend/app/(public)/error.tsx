'use client';

import { useEffect } from 'react';

import { reportClientError } from '@/src/lib/observability/report-error';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    reportClientError(error, 'public-route-error');
  }, [error]);

  return (
    <section className="space-y-4 rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-8">
      <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Falha temporaria</p>
      <h1 className="text-2xl font-semibold text-[var(--tp-text-1)]">Nao foi possivel carregar esta pagina</h1>
      <p className="text-sm text-[var(--tp-text-2)]">
        O erro foi registrado para analise. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-[var(--tp-border)] px-4 py-2 text-sm text-[var(--tp-text-1)]"
      >
        Tentar novamente
      </button>
    </section>
  );
}

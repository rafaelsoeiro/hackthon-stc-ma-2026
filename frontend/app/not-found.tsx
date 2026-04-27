import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="space-y-4 rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-8">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--tp-text-3)]">404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--tp-text-1)]">Pagina nao encontrada</h1>
      <p className="text-[var(--tp-text-2)]">A rota informada nao existe no portal.</p>
      <Link
        href="/"
        className="inline-flex rounded-full border border-[var(--tp-border)] px-4 py-2 text-sm text-[var(--tp-text-1)] hover:bg-[var(--tp-surface-2)]"
      >
        Voltar para o inicio
      </Link>
    </section>
  );
}

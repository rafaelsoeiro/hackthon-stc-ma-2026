export default function PublicLoading() {
  return (
    <section className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-28 animate-pulse rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)]" />
      <div className="h-56 animate-pulse rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)]" />
      <p className="text-sm text-[var(--tp-text-3)]">Carregando conteudo...</p>
    </section>
  );
}

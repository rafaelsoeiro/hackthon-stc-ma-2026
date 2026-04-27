export function InstitutionalPanel() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Institucional</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--tp-text-1)]">Sobre o portal</h1>
        <p className="mt-2 text-sm text-[var(--tp-text-2)]">
          O Portal da Transparencia do Maranhao publica dados orcamentarios, administrativos e sociais para controle cidadao.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--tp-text-1)]">Missao</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">Ampliar a transparencia ativa e facilitar o acesso da populacao aos dados publicos.</p>
        </article>
        <article className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--tp-text-1)]">Base legal</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">Lei de Acesso a Informacao, LRF e normativos estaduais de governanca digital.</p>
        </article>
        <article className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--tp-text-1)]">Governanca</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">Gestao da STC com apoio de areas setoriais para qualidade e atualizacao das bases.</p>
        </article>
      </div>
    </section>
  );
}

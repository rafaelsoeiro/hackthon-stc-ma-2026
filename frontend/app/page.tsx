export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-8 shadow-[var(--shadow-card)]">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--tp-text-3)]">
          Fase 1 Concluida
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--tp-text-1)]">
          Fundacao do Frontend pronta para migracao do mock
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--tp-text-2)]">
          Esta base ja possui shell global, tema claro/escuro, alto contraste e estrutura para evoluir as
          paginas do Portal da Transparencia com componentizacao.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
          <h2 className="font-medium text-[var(--tp-text-1)]">Layout Global</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">
            Header, sidebar responsiva e footer compartilhados em todo o app.
          </p>
        </article>
        <article className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
          <h2 className="font-medium text-[var(--tp-text-1)]">Acessibilidade</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">
            Toggle de alto contraste e foco visivel com classes globais de tema.
          </p>
        </article>
        <article className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
          <h2 className="font-medium text-[var(--tp-text-1)]">Escalabilidade</h2>
          <p className="mt-2 text-sm text-[var(--tp-text-2)]">
            Base preparada para rotas por dominio na Fase 2 e migracao de secoes.
          </p>
        </article>
      </div>
    </section>
  );
}

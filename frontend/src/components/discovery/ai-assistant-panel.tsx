import Link from 'next/link';

const prompts = [
  'Quanto foi gasto com saude em 2026?',
  'Quais obras estao atrasadas no meu municipio?',
  'Qual a evolucao da folha da educacao?',
  'Mostre contratos sem licitacao acima de R$ 1 milhao.',
];

export function AiAssistantPanel() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#1f2b4d] bg-[#0a1128] p-6 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">Assistente IA</p>
        <h1 className="mt-2 text-3xl font-semibold">Consulta em linguagem natural</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/75">
          Use perguntas em linguagem simples para navegar pelos dados de transparencia e ir direto para os paineis.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {prompts.map((prompt) => (
          <Link
            key={prompt}
            href={`/busca?q=${encodeURIComponent(prompt)}`}
            className="rounded-xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4 text-sm text-[var(--tp-text-2)] hover:text-[var(--tp-text-1)]"
          >
            {prompt}
          </Link>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useMemo, useState } from 'react';

import { ASSUNTOS_VALIDOS } from '@/src/features/ai/assuntos';
import type { BuscaResponse } from '@/src/features/ai/types';
import { fetchJson } from '@/src/lib/api/fetch-json';

const prompts = [
  'Quanto foi gasto com saude em 2026?',
  'Quais obras estao atrasadas no meu municipio?',
  'Qual a evolucao da folha da educacao?',
  'Mostre contratos sem licitacao acima de R$ 1 milhao.',
];

export function AiAssistantPanel() {
  const [pergunta, setPergunta] = useState('');
  const [assunto, setAssunto] = useState<string>('');
  const [resposta, setResposta] = useState<BuscaResponse | null>(null);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const submitDisabled = loading || !pergunta.trim();

  const fontes = useMemo(() => resposta?.fontes ?? [], [resposta]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!pergunta.trim()) {
      setErro('Digite uma pergunta para consultar a IA.');
      return;
    }

    setErro('');
    setLoading(true);

    try {
      const data = await fetchJson<BuscaResponse>('/api/ai/busca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pergunta: pergunta.trim(),
          assunto: assunto || undefined,
        }),
      });

      setResposta(data);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Falha ao consultar IA.';
      setErro(message);
      setResposta(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#1f2b4d] bg-[#0a1128] p-6 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">Assistente IA</p>
        <h1 className="mt-2 text-3xl font-semibold">Consulta em linguagem natural</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/75">
          Pergunte com linguagem simples e receba resposta cidada baseada no backend de IA.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
        <label className="block text-sm text-[var(--tp-text-2)]" htmlFor="pergunta-ia">
          Pergunta
        </label>
        <textarea
          id="pergunta-ia"
          value={pergunta}
          onChange={(event) => setPergunta(event.target.value)}
          rows={4}
          className="w-full rounded-xl border border-[var(--tp-border)] bg-[var(--tp-page)] p-3 text-sm text-[var(--tp-text-1)]"
          placeholder="Ex: Quanto foi empenhado em saude em 2026?"
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-[var(--tp-text-2)]" htmlFor="assunto-ia">
              Assunto (opcional)
            </label>
            <select
              id="assunto-ia"
              value={assunto}
              onChange={(event) => setAssunto(event.target.value)}
              className="w-full rounded-xl border border-[var(--tp-border)] bg-[var(--tp-page)] p-2.5 text-sm text-[var(--tp-text-1)]"
            >
              <option value="">Detectar automaticamente</option>
              {ASSUNTOS_VALIDOS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitDisabled}
            className="rounded-full bg-[var(--tp-cta)] px-5 py-2.5 text-sm font-medium text-[var(--tp-cta-fg)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Consultando...' : 'Perguntar a IA'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {prompts.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => setPergunta(prompt)}
              className="rounded-full border border-[var(--tp-border)] bg-[var(--tp-page)] px-3 py-1.5 text-xs text-[var(--tp-text-2)]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </form>

      {erro ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {erro}
        </div>
      ) : null}

      {resposta ? (
        <article className="space-y-4 rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
          <h2 className="text-xl font-semibold text-[var(--tp-text-1)]">Resposta da IA</h2>
          <p className="text-sm leading-relaxed text-[var(--tp-text-2)]">{resposta.resposta_cidada ?? 'Sem resposta textual.'}</p>

          {resposta.alerta ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{resposta.alerta}</div>
          ) : null}

          {resposta.valores?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {resposta.valores.map((valor) => (
                <div key={valor.rotulo} className="rounded-lg border border-[var(--tp-border-subtle)] bg-[var(--tp-page)] p-3">
                  <p className="text-xs text-[var(--tp-text-3)]">{valor.rotulo}</p>
                  <p className="mt-1 text-base font-semibold text-[var(--tp-text-1)]">{valor.valor_formatado}</p>
                  <p className="mt-1 text-xs text-[var(--tp-text-2)]">{valor.comparativo_local}</p>
                </div>
              ))}
            </div>
          ) : null}

          {resposta.termos_explicados?.length ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--tp-text-1)]">Termos explicados</h3>
              <div className="grid gap-2">
                {resposta.termos_explicados.map((termo) => (
                  <div key={termo.termo} className="rounded-lg border border-[var(--tp-border-subtle)] bg-[var(--tp-page)] p-3">
                    <p className="text-sm font-medium text-[var(--tp-text-1)]">{termo.termo} - {termo.traducao}</p>
                    <p className="mt-1 text-xs text-[var(--tp-text-2)]">{termo.definicao}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {fontes.length ? (
            <div>
              <h3 className="text-sm font-semibold text-[var(--tp-text-1)]">Fontes</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-[var(--tp-text-2)]">
                {fontes.map((fonte) => (
                  <li key={fonte}>{fonte}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}

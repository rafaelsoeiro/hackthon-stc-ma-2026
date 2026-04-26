import Link from 'next/link';

import { heroPrompts, kpis } from '@/src/lib/home-content';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#1f2b4d] bg-[#0a1128] px-6 py-10 text-white shadow-[0_30px_80px_-30px_rgba(10,17,40,0.9)] sm:px-10">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ffb800]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-[#00d4ff]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-white/80">
          IA conectada ao tesauro institucional
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
          Pergunte o que voce quer saber sobre o Maranhao
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
          Dados reais de despesas, obras, contratos e servidores apresentados com linguagem simples.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/ia"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#ffb800] px-6 py-3 text-sm font-medium text-[#0a1128] transition hover:brightness-105 sm:w-auto"
          >
            Perguntar a IA
          </Link>
          <Link
            href="/busca?q=educacao"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10 sm:w-auto"
          >
            Buscar por tema
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {heroPrompts.map((prompt) => (
            <Link
              key={prompt}
              href={`/busca?q=${encodeURIComponent(prompt)}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
            >
              {prompt}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="border-white/10 p-4 text-center odd:border-r even:border-r-0 sm:border-r [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:last:border-r-0">
            <p className="text-xl font-semibold text-[#ffb800]">{kpi.value}</p>
            <p className="text-xs text-white/70">{kpi.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

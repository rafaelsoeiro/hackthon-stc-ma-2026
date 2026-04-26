'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, Share2, Bell, Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

import {
  getSearch,
  getSearchSummary,
  type SearchItem,
  type SearchSummaryResponse,
} from '@/src/lib/api/public-data-client';

const PAGE_SIZE = 10;

function mapTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    despesas: 'Despesas',
    receitas: 'Receitas',
    obras: 'Obras',
    contratos: 'Contratos',
    servidores: 'Servidores',
    programas: 'Programas',
    transferencias: 'Transferências',
    emendas: 'Emendas',
  };

  return labels[type] ?? type;
}

const SearchResultCard = memo(function SearchResultCard({ item }: { item: SearchItem }) {
  return (
    <article className="rounded-xl border p-4 hover:border-blue-500 transition-colors">
      <div className="mb-2 flex items-center gap-2 flex-wrap">
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
          {mapTypeLabel(item.type)}
        </span>
        <span className="text-xs text-gray-500">Relevância: {item.score}</span>
      </div>
      <h4 className="text-gray-900">{item.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      <a href={item.route} className="mt-2 inline-flex text-sm text-blue-700 hover:text-blue-800">
        Abrir página
      </a>
    </article>
  );
});

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [summary, setSummary] = useState<SearchSummaryResponse | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const [searchResponse, summaryResponse] = await Promise.all([
          getSearch({ q, page, pageSize: PAGE_SIZE }),
          getSearchSummary({ q }),
        ]);

        if (!active) return;

        setItems(searchResponse.items);
        setTotal(searchResponse.meta.total);
        setTotalPages(searchResponse.meta.totalPages);
        setSummary(summaryResponse);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar resultados da busca.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [q, page, reloadKey]);

  const barData = useMemo(
    () =>
      (summary?.distribution ?? []).map((item) => ({
        name: mapTypeLabel(item.category),
        value: item.value,
        percent: item.percent,
      })),
    [summary],
  );

  const lineData = useMemo(() => {
    if (summary?.monthlySeries && summary.monthlySeries.length > 0) {
      return summary.monthlySeries;
    }

    return (summary?.distribution ?? []).map((item, index) => ({
      month: `S${index + 1}`,
      value: item.value,
    }));
  }, [summary]);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <span>Início</span>
          <span>/</span>
          <span className="text-gray-900">{q || 'Busca geral'}</span>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-8 border shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
              <SearchIcon className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">Resultados da busca pública</h2>
              <p className="text-gray-700">
                Consulta: <span className="font-semibold">{q || 'todos os dados'}</span>
              </p>
              <p className="text-gray-600 mt-1">
                {isLoading ? 'Carregando...' : `${total.toLocaleString('pt-BR')} resultado(s) encontrado(s).`}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-3">
              <span>{error}</span>
              <button
                onClick={() => setReloadKey((prev) => prev + 1)}
                className="rounded-lg border border-red-300 px-3 py-1 text-xs hover:bg-red-100"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-gray-900 mb-4">Distribuição por tipo</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-gray-900 mb-4">Tendência da consulta</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border mb-8">
          <h3 className="mb-4 text-gray-900">Resultados</h3>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl border p-4">
                  <div className="h-4 w-24 rounded bg-gray-200 animate-pulse mb-3" />
                  <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mb-2" />
                  <div className="h-3 w-full rounded bg-gray-100 animate-pulse mb-2" />
                  <div className="h-3 w-2/3 rounded bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-600">Nenhum resultado encontrado para esta consulta.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => <SearchResultCard key={`${item.type}-${item.id}`} item={item} />)}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1 || isLoading}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Anterior
            </button>
            <span className="text-sm text-gray-600">
              Página {page} de {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages || isLoading}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm disabled:opacity-40"
            >
              Próxima
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors">
            <Download className="size-4" />
            Baixar dados
          </button>
          <button className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
            <Share2 className="size-4" />
            Compartilhar
          </button>
          <button className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
            <Bell className="size-4" />
            Criar alerta
          </button>
        </div>
      </div>
    </div>
  );
}

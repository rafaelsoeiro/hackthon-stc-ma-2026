'use client';

import { MapPin, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import { getObras, getObrasSummary, type ObrasItem, type ObrasSummaryResponse } from '@/src/lib/api/public-data-client';
import { useDebouncedValue } from '@/src/lib/hooks/use-debounced-value';

interface ObrasMapProps {
  onNavigate?: (page: string) => void;
}

export default function ObrasMap({ onNavigate }: ObrasMapProps) {
  const [selectedObra, setSelectedObra] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('todas');
  const [searchText, setSearchText] = useState('');
  const [obras, setObras] = useState<ObrasItem[]>([]);
  const [summary, setSummary] = useState<ObrasSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearchText = useDebouncedValue(searchText, 300);

  useEffect(() => {
    let active = true;

    async function loadObras() {
      setIsLoading(true);
      setError(null);

      try {
        const normalizedStatus = filterStatus === 'atrasada' ? 'paralisada' : filterStatus;
        const obrasResponse = await getObras({
          q: debouncedSearchText.trim() || undefined,
          status: normalizedStatus,
          pageSize: 50,
        });

        if (!active) return;

        setObras(obrasResponse.items);
        setSelectedObra((current) => current ?? obrasResponse.items[0]?.id ?? null);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar obras.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadObras();
    return () => {
      active = false;
    };
  }, [filterStatus, debouncedSearchText]);

  useEffect(() => {
    let active = true;
    async function loadSummary() {
      try {
        const summaryResponse = await getObrasSummary();
        if (!active) return;
        setSummary(summaryResponse);
      } catch {
        if (!active) return;
        setSummary(null);
      }
    }

    loadSummary();
    return () => {
      active = false;
    };
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return { label: 'Em andamento', color: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'concluida':
        return { label: 'Concluída', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'paralisada':
      case 'atrasada':
        return { label: 'Atrasada', color: 'bg-orange-100 text-orange-700', icon: AlertCircle };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Saude':
      case 'Saúde':
        return 'bg-red-500';
      case 'Educacao':
      case 'Educação':
        return 'bg-blue-500';
      case 'Infraestrutura':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const obrasFiltradas = obras;

  const obraSelecionada = obras.find(o => o.id === selectedObra);

  return (
    <div className="min-h-[60vh] bg-gray-50">
      {onNavigate && (
        <PageHeader
          title="Obras Públicas"
          subtitle={
            summary
              ? `${summary.obrasAtivas} obras ativas · R$ ${(summary.investimentoAtivo / 1_000_000_000).toFixed(1)} bi investidos · ${summary.pctNoPrazo}% no prazo`
              : 'Carregando resumo de obras...'
          }
          breadcrumbs={[{ label: 'Obras Públicas' }]}
          onNavigate={onNavigate}
        />
      )}
      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-gray-900">Obras e Serviços Públicos</h2>
            <p className="text-gray-600">Acompanhe em tempo real as obras em andamento no Maranhão</p>
          </div>

          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Buscar obra por nome ou município..."
                  className="w-full rounded-xl border bg-white pl-10 pr-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { value: 'todas', label: 'Todas' },
                { value: 'em_andamento', label: 'Em andamento' },
                { value: 'concluida', label: 'Concluídas' },
                { value: 'atrasada', label: 'Atrasadas' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`rounded-xl px-4 py-2 text-sm transition-all ${
                    filterStatus === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Carregando obras...
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista de Obras */}
            <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto">
              {obrasFiltradas.map((obra) => {
                const statusInfo = getStatusInfo(obra.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.button
                    key={obra.id}
                    onClick={() => setSelectedObra(obra.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full rounded-xl bg-white p-4 text-left transition-all border-2 ${
                      selectedObra === obra.id
                        ? 'border-blue-600 shadow-lg'
                        : 'border-transparent hover:border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`size-3 rounded-full ${getTipoColor(obra.categoria ?? '')}`} />
                        <span className="text-xs text-gray-600">{obra.categoria ?? 'Sem categoria'}</span>
                      </div>
                      <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${statusInfo.color}`}>
                        <StatusIcon className="size-3" />
                        {statusInfo.label}
                      </div>
                    </div>

                    <h4 className="mb-2 text-gray-900">{obra.descricao}</h4>
                    <p className="mb-3 text-sm text-gray-600">{obra.municipio}</p>

                    {/* Progresso */}
                    <div className="mb-2">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-gray-600">Progresso</span>
                        <span className="text-gray-900">{obra.percentualExecucao}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all ${
                            obra.status === 'concluida' ? 'bg-green-500' :
                            obra.status === 'paralisada' ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${obra.percentualExecucao}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      R$ {(obra.valorTotal / 1000000).toFixed(1)}M • {obra.dataPrevisaoFim ? new Date(obra.dataPrevisaoFim).toLocaleDateString('pt-BR') : 'Sem previsão'}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mapa e Detalhes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mapa Placeholder */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
                  {/* Simulação de mapa */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 800 450">
                      <path
                        d="M100,200 Q150,150 200,180 T300,200 Q350,220 400,190 T500,200 Q550,180 600,210 T700,200"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>

                  {/* Pins no mapa */}
                  {obrasFiltradas.map((obra, idx) => (
                    <motion.div
                      key={obra.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="absolute"
                      style={{
                        left: `${20 + idx * 18}%`,
                        top: `${30 + (idx % 2) * 20}%`,
                      }}
                    >
                      <button
                        onClick={() => setSelectedObra(obra.id)}
                        className={`flex size-10 items-center justify-center rounded-full ${getTipoColor(obra.categoria ?? '')} text-white shadow-lg hover:scale-110 transition-transform ${
                          selectedObra === obra.id ? 'ring-4 ring-white' : ''
                        }`}
                      >
                        <MapPin className="size-5" />
                      </button>
                    </motion.div>
                  ))}

                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="rounded-lg bg-white px-3 py-2 text-sm shadow-md hover:shadow-lg transition-shadow">
                      🔍 Zoom +
                    </button>
                    <button className="rounded-lg bg-white px-3 py-2 text-sm shadow-md hover:shadow-lg transition-shadow">
                      📍 Minha localização
                    </button>
                  </div>
                </div>
              </div>

              {/* Detalhes da Obra Selecionada */}
              {obraSelecionada && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white p-6 shadow-sm border"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className={`size-3 rounded-full ${getTipoColor(obraSelecionada.categoria ?? '')}`} />
                        <span className="text-sm text-gray-600">{obraSelecionada.categoria ?? 'Sem categoria'}</span>
                      </div>
                      <h3 className="text-gray-900">{obraSelecionada.descricao}</h3>
                      <p className="text-gray-600">{obraSelecionada.municipio}</p>
                    </div>

                    {(() => {
                      const statusInfo = getStatusInfo(obraSelecionada.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${statusInfo.color}`}>
                          <StatusIcon className="size-4" />
                          {statusInfo.label}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Progresso */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-gray-700">Progresso da obra</span>
                      <span className="text-gray-900">{obraSelecionada.percentualExecucao}% concluído</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all ${
                          obraSelecionada.status === 'concluida' ? 'bg-green-500' :
                          obraSelecionada.status === 'paralisada' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${obraSelecionada.percentualExecucao}%` }}
                      />
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="mb-1 text-sm text-gray-600">Valor da obra</div>
                      <div className="text-gray-900">
                        R$ {(obraSelecionada.valorTotal / 1000000).toFixed(1)} milhões
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="mb-1 text-sm text-gray-600">Previsão de conclusão</div>
                      <div className="text-gray-900">
                        {obraSelecionada.dataPrevisaoFim
                          ? new Date(obraSelecionada.dataPrevisaoFim).toLocaleDateString('pt-BR')
                          : 'Sem previsão'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="mb-1 text-sm text-gray-600">Beneficiados</div>
                      <div className="text-gray-900">
                        N/D
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="mb-1 text-sm text-gray-600">Empresa responsável</div>
                      <div className="text-gray-900">{obraSelecionada.credorNome ?? 'Não informado'}</div>
                    </div>
                  </div>

                  {/* Análise da IA */}
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 border border-blue-100">
                    <div className="mb-2 flex items-center gap-2 text-blue-700">
                      <div className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        ✨
                      </div>
                      <span className="text-sm">Análise da IA</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {obraSelecionada.status === 'paralisada'
                        ? 'Esta obra está atrasada em relação ao cronograma. Principais causas: condições climáticas.'
                        : obraSelecionada.status === 'concluida'
                        ? 'Obra concluída conforme o cronograma. Já está em pleno funcionamento.'
                        : `Esta obra está ${obraSelecionada.percentualExecucao > 75 ? 'adiantada' : 'no prazo'} em relação ao cronograma inicial.`
                      }
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors">
                      📸 Galeria de fotos
                    </button>
                    <button className="rounded-xl border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      📄 Ver contrato
                    </button>
                    <button className="rounded-xl border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      📊 Histórico de medições
                    </button>
                    <button className="rounded-xl border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      🔔 Receber atualizações
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

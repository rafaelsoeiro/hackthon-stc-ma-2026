import type { BuscaPayload, BuscaResponse } from '@/src/features/ai/types';
import { fetchJson } from '@/src/lib/api/fetch-json';

type HealthResponse = {
  ok: boolean;
  message: string;
};

export async function getAiHealth(timeoutMs = 5000): Promise<HealthResponse> {
  return fetchJson<HealthResponse>('/api/ai/health', { timeoutMs });
}

export async function askAi(payload: BuscaPayload, timeoutMs = 30000): Promise<BuscaResponse> {
  return fetchJson<BuscaResponse>('/api/ai/busca', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    timeoutMs,
  });
}

export type TechnicalNarrativeInput = {
  dataTypeLabel: string;
  periodLabel: string;
  regionLabel: string;
  total: number;
  totals: Array<{ label: string; value: string }>;
  topGroupName?: string;
  topGroupValue?: number;
  sampleSize: number;
};

const ASSUNTO_BY_DATA_TYPE: Record<string, string> = {
  despesas: 'Gestao Fiscal',
  receitas: 'Gestao Fiscal',
  contratos: 'Licitacoes e Contratos',
  servidores: 'Pessoal',
  obras: 'Obras e Infraestrutura',
  programas: 'Planejamento e Resultados',
  transferencias: 'Convenios e Transferencias',
  emendas: 'Emendas Parlamentares',
};

export function resolveAiAssuntoByDataType(dataType?: string): string | undefined {
  if (!dataType) return undefined;
  return ASSUNTO_BY_DATA_TYPE[dataType];
}

export async function generateTechnicalNarrative(
  input: TechnicalNarrativeInput,
  dataType?: string,
): Promise<string | null> {
  const totalsText = input.totals
    .map((item) => `${item.label}: ${item.value}`)
    .join('; ');

  const topGroupText =
    input.topGroupName && typeof input.topGroupValue === 'number'
      ? `Grupo lider: ${input.topGroupName} (${input.topGroupValue.toLocaleString('pt-BR')} registros na amostra).`
      : 'Grupo lider: nao identificado para este recorte.';

  const pergunta = [
    `Gere um paragrafo explicativo unico (entre 500 e 800 caracteres) para um relatorio tecnico resumido de ${input.dataTypeLabel}.`,
    'Use linguagem objetiva, sem inventar dados, e destaque principal concentracao e leitura gerencial.',
    `Periodo: ${input.periodLabel}. Regiao: ${input.regionLabel}.`,
    `Total encontrado: ${input.total.toLocaleString('pt-BR')} registros. Amostra exibida: ${input.sampleSize.toLocaleString('pt-BR')} linhas.`,
    topGroupText,
    `Totais principais: ${totalsText || 'Sem totais disponiveis.'}`,
  ].join(' ');

  const response = await askAi(
    {
      pergunta,
      assunto: resolveAiAssuntoByDataType(dataType),
    },
    35000,
  );

  return response.resposta_cidada?.trim() || null;
}

function parseAiList(text?: string, maxItems = 6): string[] {
  if (!text) return [];

  const lines = text
    .split(/\n|;/g)
    .map((line) => line.replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((line) => line.length > 8);

  return Array.from(new Set(lines)).slice(0, maxItems);
}

export async function generateAiQuestionSuggestions(context: string): Promise<string[]> {
  const response = await askAi(
    {
      pergunta: [
        'Gere uma lista de 6 perguntas curtas e objetivas para um cidadao consultar dados publicos do Maranhao.',
        `Contexto da tela: ${context}.`,
        'Retorne em linhas separadas, sem explicacao adicional.',
      ].join(' '),
      assunto: 'Dados Abertos',
    },
    25000,
  );

  return parseAiList(response.resposta_cidada, 6);
}

export type HomeInsight = {
  title: string;
  description: string;
  tag: string;
};

function toInsight(text: string, fallbackIndex: number): HomeInsight {
  const normalized = text.trim().replace(/\s+/g, ' ');
  const [head, ...rest] = normalized.split(':');

  if (rest.length > 0 && head.length >= 8) {
    return {
      title: head.trim(),
      description: rest.join(':').trim(),
      tag: 'Insight IA',
    };
  }

  return {
    title: `Insight ${fallbackIndex + 1}`,
    description: normalized,
    tag: 'Insight IA',
  };
}

export async function generateHomeInsights(): Promise<HomeInsight[]> {
  const response = await askAi(
    {
      pergunta: [
        'Gere 4 insights curtos sobre transparencia publica do Maranhao com foco em despesas, obras, contratos e servidores.',
        'Formato obrigatorio por linha: TITULO: descricao curta.',
        'Nao invente numeros especificos se nao estiverem disponiveis.',
      ].join(' '),
      assunto: 'Planejamento e Resultados',
    },
    30000,
  );

  return parseAiList(response.resposta_cidada, 4).map((line, index) =>
    toInsight(line, index),
  );
}

export type ObraAnalysisInput = {
  descricao: string;
  municipio: string;
  status: string;
  percentualExecucao: number;
  valorTotal: number;
  dataPrevisaoFim: string | null;
  credorNome: string | null;
};

export async function generateObraAnalysis(input: ObraAnalysisInput): Promise<string | null> {
  const pergunta = [
    'Gere um paragrafo curto (maximo 450 caracteres) com analise cidada da obra publica abaixo.',
    `Obra: ${input.descricao}. Municipio: ${input.municipio}.`,
    `Status: ${input.status}. Execucao: ${input.percentualExecucao}%.`,
    `Valor total: R$ ${input.valorTotal.toLocaleString('pt-BR')}.`,
    `Previsao de fim: ${input.dataPrevisaoFim ?? 'nao informada'}.`,
    `Responsavel: ${input.credorNome ?? 'nao informado'}.`,
    'Explique em linguagem simples se ha risco de atraso e qual deve ser o foco de acompanhamento.',
  ].join(' ');

  const response = await askAi(
    {
      pergunta,
      assunto: 'Obras e Infraestrutura',
    },
    30000,
  );

  return response.resposta_cidada?.trim() || null;
}

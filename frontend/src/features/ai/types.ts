export type BuscaPayload = {
  pergunta: string;
  assunto?: string;
  exercicio?: number;
  orgao?: string;
};

export type BuscaResponse = {
  resposta_cidada?: string;
  termos_explicados?: Array<{
    termo: string;
    traducao: string;
    definicao: string;
  }>;
  valores?: Array<{
    rotulo: string;
    valor_formatado: string;
    comparativo_local: string;
  }>;
  fontes?: string[];
  alerta?: string | null;
  meta?: {
    pergunta_original: string;
    assunto_detectado?: string;
    exercicio?: number;
    orgao?: string;
    timestamp: string;
  };
  [key: string]: unknown;
};

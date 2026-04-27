export type FetchJsonOptions = RequestInit & {
  timeoutMs?: number;
};

export async function fetchJson<T>(input: RequestInfo | URL, init?: FetchJsonOptions): Promise<T> {
  const { timeoutMs = 15000, ...requestInit } = init ?? {};

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, { ...requestInit, signal: controller.signal });

    const data = (await response.json().catch(() => null)) as T | { message?: string } | null;

    if (!response.ok) {
      const message =
        (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string'
          ? data.message
          : 'Falha na requisicao da API.') || 'Falha na requisicao da API.';

      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Tempo limite excedido na requisicao. Tente novamente.');
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

import { NextResponse } from 'next/server';

import type { BuscaPayload } from '@/src/features/ai/types';

const BACKEND_BASE_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3333';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BuscaPayload;

    if (!body?.pergunta?.trim()) {
      return NextResponse.json({ message: 'A pergunta e obrigatoria.' }, { status: 400 });
    }

    const backendResponse = await fetch(`${BACKEND_BASE_URL}/ai/busca`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const responseBody = await backendResponse.json().catch(() => ({ message: 'Resposta invalida do backend.' }));

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message:
            (responseBody && typeof responseBody === 'object' && 'message' in responseBody
              ? String(responseBody.message)
              : 'Falha ao consultar o backend de IA.'),
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(responseBody);
  } catch {
    return NextResponse.json(
      {
        message:
          'Nao foi possivel conectar ao backend de IA. Verifique BACKEND_API_URL e se a API esta online.',
      },
      { status: 502 },
    );
  }
}

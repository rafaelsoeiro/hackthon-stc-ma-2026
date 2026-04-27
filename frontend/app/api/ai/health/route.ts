import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3333';

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ ok: false, message: 'Backend indisponivel no momento.' }, { status: 503 });
    }

    return NextResponse.json({ ok: true, message: 'Backend online.' });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ ok: false, message: 'Sem conexao com o backend.' }, { status: 503 });
  }
}

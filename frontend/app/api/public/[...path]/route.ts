import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3333';

function buildTargetUrl(path: string[], request: NextRequest): string {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const endpoint = `${BACKEND_BASE_URL}/public/${path.join('/')}`;
  return query ? `${endpoint}?${query}` : endpoint;
}

async function proxyRequest(method: 'GET' | 'POST', request: NextRequest, path: string[]) {
  try {
    const targetUrl = buildTargetUrl(path, request);

    const init: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    };

    if (method === 'POST') {
      const body = await request.json().catch(() => null);
      if (body !== null) {
        init.body = JSON.stringify(body);
      }
    }

    const backendResponse = await fetch(targetUrl, init);
    const responseBody = await backendResponse.json().catch(() => ({ message: 'Resposta invalida do backend.' }));

    if (!backendResponse.ok) {
      const message =
        responseBody && typeof responseBody === 'object' && 'message' in responseBody
          ? String(responseBody.message)
          : 'Falha ao consultar o backend.';

      return NextResponse.json({ message }, { status: backendResponse.status });
    }

    return NextResponse.json(responseBody);
  } catch {
    return NextResponse.json(
      {
        message: 'Nao foi possivel conectar ao backend. Verifique BACKEND_API_URL e se a API esta online.',
      },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest('GET', request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest('POST', request, path);
}

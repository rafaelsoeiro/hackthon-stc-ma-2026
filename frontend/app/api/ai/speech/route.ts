import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3333';

type SpeechPayload = {
  text: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SpeechPayload;
    const text = body?.text?.trim() ?? '';

    if (!text) {
      return NextResponse.json(
        { message: 'O texto para audio e obrigatorio.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(`${BACKEND_BASE_URL}/ai/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      cache: 'no-store',
    });

    if (!backendResponse.ok) {
      const responseBody = await backendResponse
        .json()
        .catch(() => ({ message: 'Falha ao gerar audio no backend.' }));
      return NextResponse.json(
        {
          message:
            (responseBody &&
            typeof responseBody === 'object' &&
            'message' in responseBody
              ? String(responseBody.message)
              : 'Falha ao gerar audio no backend de IA.'),
        },
        { status: backendResponse.status },
      );
    }

    const audioBuffer = await backendResponse.arrayBuffer();
    const contentType =
      backendResponse.headers.get('content-type') ?? 'audio/mpeg';

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          'Nao foi possivel conectar ao backend para gerar audio. Verifique BACKEND_API_URL.',
      },
      { status: 502 },
    );
  }
}


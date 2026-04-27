# Transparencia MA - Portal + API

Projeto full stack do portal de transparencia com:
- frontend em Next.js (app `frontend`)
- backend em NestJS + Prisma (app `backend`)
- banco PostgreSQL (local com Docker Compose)
- colecoes Postman para teste de API

A pasta `Frontendtranspa/` contem a base de referencia visual gerada a partir do design (fonte de comparacao de layout/componentes).

## Estrutura do repositorio

- `frontend/`: app web (Next.js 16, React 19)
- `backend/`: API (NestJS 11, Prisma, PostgreSQL)
- `docs/`: planos, arquitetura e review tecnico
- `postman/`: colecao e environment para validar endpoints
- `docker-compose.yml`: sobe PostgreSQL local
- `Frontendtranspa/`: referencia visual gerada a partir do design (nao e o app principal em producao)

## Arquitetura (resumo)

### Frontend
- Renderiza paginas publicas (`/`, `/dados`, `/obras`, `/contratos`, `/programas`, `/busca`, `/tecnico`, `/ia`, etc.)
- Consome dados reais via rotas internas de proxy:
  - `app/api/public/[...path]/route.ts`
  - `app/api/ai/busca/route.ts`
  - `app/api/ai/speech/route.ts`
- Componentizacao em `src/components` e `src/figma/components`
- App principal do MVP: `frontend/`

### Estrutura de pastas do frontend

```text
frontend/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx
│  │  ├─ dados/page.tsx
│  │  ├─ obras/page.tsx
│  │  ├─ contratos/page.tsx
│  │  ├─ programas/page.tsx
│  │  ├─ busca/page.tsx
│  │  ├─ tecnico/page.tsx
│  │  ├─ ia/page.tsx
│  │  └─ ...
│  ├─ api/
│  │  ├─ public/[...path]/route.ts
│  │  └─ ai/
│  │     ├─ busca/route.ts
│  │     ├─ health/route.ts
│  │     └─ speech/route.ts
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ not-found.tsx
├─ src/
│  ├─ components/
│  │  ├─ analytics/
│  │  ├─ discovery/
│  │  ├─ layout/
│  │  ├─ sections/home/
│  │  └─ shared/
│  ├─ figma/components/
│  ├─ features/
│  │  ├─ ai/
│  │  ├─ analytics/
│  │  └─ discovery/
│  ├─ lib/
│  │  ├─ api/
│  │  ├─ hooks/
│  │  └─ observability/
│  ├─ mocks/
│  └─ providers/
├─ public/
├─ package.json
└─ next.config.ts
```

Responsabilidades:
- `app/(public)`: roteamento das paginas públicas do portal.
- `app/api/*`: proxy server-side para backend (`/public/*` e `/ai/*`), isolando URL e tratamento HTTP.
- `src/components`: componentes reutilizáveis por domínio de UI (layout, analytics, discovery, seções da home).
- `src/figma/components`: componentes vindos da implementação visual baseada no design.
- `src/features`: tipos, mapeamentos e lógica por contexto de negócio.
- `src/lib/api`: clientes HTTP e funções de integração com backend.
- `src/lib/hooks`: hooks utilitários (ex.: debounce).
- `src/providers`: providers globais (tema, contexto de app).
- `public`: assets estáticos.

Observacao importante de configuracao:
- As rotas `app/api/*` do frontend usam `BACKEND_API_URL`.
- Se essa variavel nao estiver definida, o fallback no codigo e `http://localhost:3333`.
- Neste projeto, o backend local padrao esta em `3334`, entao configure `frontend/.env.local` para evitar inconsistencias.

### Backend
- Modulos principais:
  - `PublicDataModule`: endpoints de dados publicos (despesas, receitas, contratos, obras, servidores, transferencias, emendas, programas, busca, analytics)
  - `AiModule`: busca com IA (`/ai/busca`) e sintese de voz (`/ai/speech`)
- Provider de IA selecionado por `AI_PROVIDER` (`openai` ou `gemini`)
- Prisma como camada de acesso ao banco

### Estrutura de pastas do backend

```text
backend/
├─ src/
│  ├─ main.ts
│  ├─ app.module.ts
│  ├─ config/
│  │  └─ app.config.ts
│  ├─ database/
│  │  ├─ prisma.module.ts
│  │  └─ prisma.service.ts
│  └─ modules/
│     ├─ ai/
│     │  ├─ ai.controller.ts
│     │  ├─ ai.service.ts
│     │  ├─ ai.module.ts
│     │  ├─ dto/
│     │  ├─ prompts/
│     │  ├─ transparency/
│     │  │  └─ constants/
│     │  ├─ providers/
│     │  │  ├─ openai/
│     │  │  └─ gemini/
│     │  ├─ core/
│     │  │  ├─ constants/
│     │  │  ├─ ports/
│     │  │  └─ types/
│     │  └─ shared/
│     │     ├─ parser/
│     │     └─ prompt/
│     └─ public-data/
│        ├─ dto/
│        ├─ utils/
│        ├─ *.controller.ts
│        └─ *.service.ts
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.ts
│  ├─ seeds/
│  └─ migrations/
├─ test/
├─ package.json
└─ prisma.config.ts
```

Responsabilidades:
- `src/main.ts`: bootstrap da aplicacao, validacao global, CORS, Swagger e logs de request.
- `src/config`: leitura centralizada de variaveis de ambiente.
- `src/database`: integracao do Prisma com DI do Nest.
- `src/modules/ai`: pipeline de IA (prompt, provider, parser, transparencia e endpoints `/ai/*`).
- `src/modules/public-data`: endpoints REST de dados publicos e agregacoes.
- `prisma/schema.prisma`: modelo relacional.
- `prisma/migrations`: historico de evolucao do schema.
- `prisma/seeds`: massa de dados para desenvolvimento/QA.

## Estado atual dos dados (real x mock)

- Dados reais (backend + banco):
  - endpoints `GET /public/*` (despesas, receitas, contratos, obras, servidores, transferencias, emendas, programas, busca e analytics).
  - wizard tecnico (`/tecnico`) consumindo API real via proxy do frontend.
- IA com provider real:
  - `POST /ai/busca` usa provider configurado (`openai` ou `gemini`).
  - `POST /ai/speech` usa TTS da OpenAI (requer `AI_PROVIDER=openai`).
- Pontos ainda mockados/parciais:
  - `backend/src/modules/ai/transparency/transparency.service.ts` ainda retorna contexto mockado por palavras-chave para enriquecer o prompt.
  - `frontend/src/figma/components/FiquePorDentro.tsx` usa dados mockados de noticias/avisos/eventos.

### Banco
- PostgreSQL
- Schema Prisma em `backend/prisma/schema.prisma`
- Seeds com massa de dados em `backend/prisma/seeds/`

## Pre-requisitos

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## 1) Subir banco local

Na raiz do projeto:

```bash
cp .env.example .env
```

Depois:

```bash
docker compose up -d
```

## 2) Configurar backend

### Variaveis de ambiente (`backend/.env`)

Use o arquivo de exemplo como base:

```bash
cp backend/.env.example backend/.env
```

Exemplo minimo:

```env
NODE_ENV=development
PORT=3334

DATABASE_URL="postgresql://prisma:prisma321@localhost:5432/stc?schema=public"
CORS_ORIGIN=http://localhost:3000
THROTTLE_TTL=60
THROTTLE_LIMIT=40
PORTAL_BASE_URL=https://www.transparencia.ma.gov.br/api

AI_PROVIDER=openai
OPENAI_API_KEY=seu_token_aqui
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TTS_MODEL=gpt-4o-mini-tts
OPENAI_TTS_VOICE=shimmer

GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
```

### Instalar dependencias e preparar banco

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Rodar backend (desenvolvimento)

```bash
npm run start:dev
```

API local: `http://localhost:3334`
Swagger: `http://localhost:3334/api`

Observacao sobre scripts do backend:
- `npm run start:dev`: desenvolvimento com watch (nao executa migrate/seed automaticamente).
- `npm run start` e `npm run start:prod`: executam `prisma migrate deploy` + seed compilado antes de subir a API.

## 3) Configurar frontend

### Variaveis de ambiente (`frontend/.env.local`)

```env
BACKEND_API_URL=http://localhost:3334
```

### Instalar e rodar

```bash
cd frontend
npm install
npm run dev
```

Frontend local: `http://localhost:3000`

## Scripts principais

### Backend (`backend/package.json`)

- `npm run start:dev`: API com watch
- `npm run build`: build Nest
- `npm run lint`: lint
- `npm run test`: testes unitarios
- `npm run prisma:migrate`: migrations em dev
- `npm run prisma:seed`: popula base

### Frontend (`frontend/package.json`)

- `npm run dev`: dev server
- `npm run build`: build de producao
- `npm run start`: sobe build
- `npm run lint`: lint
- `npm run typecheck`: checagem TypeScript

## Endpoints principais

### IA
- `POST /ai/busca`
- `POST /ai/speech`

### Dados publicos
- `GET /public/despesas`
- `GET /public/despesas/summary`
- `GET /public/receitas`
- `GET /public/receitas/summary`
- `GET /public/contratos`
- `GET /public/contratos/summary`
- `GET /public/contratos/guided-search`
- `GET /public/obras`
- `GET /public/obras/summary`
- `GET /public/servidores`
- `GET /public/servidores/summary`
- `GET /public/transferencias`
- `GET /public/transferencias/summary`
- `GET /public/emendas`
- `GET /public/emendas/summary`
- `GET /public/programas`
- `GET /public/programas/summary`
- `GET /public/search`
- `GET /public/search/summary`
- `GET /public/analytics/:domain/summary`

## Testes via Postman

Importe:
- `postman/transparencia-api.postman_collection.json`
- `postman/transparencia-api.postman_environment.json`

Ajuste `baseUrl` para sua API local (`http://localhost:3334`) ou URL publicada.
No environment, a variavel `aiSpeechText` e usada no request `POST /ai/speech`.

## QA rapido (antes de commit/deploy)

### Backend

```bash
cd backend
npm run lint
npm run build
npm run test -- --runInBand
```

### Frontend

```bash
cd frontend
npm run lint
npm run typecheck
npm run build -- --webpack
```

## Deploy (resumo)

O projeto foi preparado para deploy simples em plataforma PaaS (ex.: Railway):
- backend + frontend como servicos separados
- postgres gerenciado
- frontend com `BACKEND_API_URL` apontando para backend publico
- backend com `CORS_ORIGIN` apontando para dominio publico do frontend

Variaveis criticas de producao:
- backend: `DATABASE_URL`, `AI_PROVIDER`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TTS_MODEL`, `OPENAI_TTS_VOICE`, `CORS_ORIGIN`, `PORT`, `NODE_ENV`, `THROTTLE_TTL`, `THROTTLE_LIMIT`, `PORTAL_BASE_URL` (e `GEMINI_API_KEY`/`GEMINI_MODEL` quando usar Gemini)
- frontend: `BACKEND_API_URL`

Checklist minimo de deploy:
1. Backend com build/start apontando para entrypoint correto (`dist/src/main.js` neste repositório).
2. Variaveis de ambiente configuradas no backend e frontend.
3. Banco acessivel pelo `DATABASE_URL` da plataforma.
4. CORS no backend apontando para dominio publico do frontend.
5. Smoke test:
   - `GET /api` (Swagger)
   - `GET /public/despesas/summary`
   - `POST /ai/busca`
   - `POST /ai/speech`

## Troubleshooting

### Erro `EADDRINUSE`
Porta em uso. Troque `PORT` no backend ou finalize o processo ocupando a porta.

### Erro `Cannot find module '/app/dist/main'` no deploy
Comando de start incorreto ou build nao gerou artefatos esperados. Neste repositório, o entrypoint correto compilado e `dist/src/main.js`. Verifique:
- comando de build
- caminho do entrypoint de runtime
- ordem de `npm ci`, `npm run build`, migracoes e start

### Frontend sem dados
Verifique:
- `frontend/.env.local` com `BACKEND_API_URL` correto
- backend ativo e acessivel
- CORS configurado no backend

## Observacoes importantes

- O seed atual apaga e recria massa de dados dos dominios publicos. Use em desenvolvimento/homologacao com cuidado.
- O backend exposto em `3334` pode divergir do fallback `3333` no frontend se `BACKEND_API_URL` nao for configurado.

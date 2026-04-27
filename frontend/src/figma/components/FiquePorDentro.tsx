'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Newspaper, Bell, Database, CalendarDays, Mail,
  ArrowRight, Clock, MapPin, Video, Users,
  ChevronRight, AlertTriangle, Info, CheckCircle,
  Wifi, TrendingUp, Zap,
} from 'lucide-react';

interface FiquePorDentroProps {
  onNavigate?: (page: string) => void;
}

type Tab = 'todos' | 'noticias' | 'avisos' | 'atualizacoes' | 'eventos';

/* ═══════════════════════════════════════
   DADOS MOCK
══════════════════════════════════════ */
const NOTICIAS = [
  {
    id: 'n1',
    destaque: true,
    titulo: 'Portal conquista 100% dos critérios do Selo Diamante de Transparência em 2026',
    resumo:
      'Pela primeira vez na história, o Portal do Maranhão atingiu pontuação máxima — 115 de 115 critérios — no ranking nacional da CGU. A conquista reflete investimentos em IA, acessibilidade WCAG AAA e qualidade dos dados publicados.',
    data: '23 abr. 2026',
    autor: 'Assessoria STC',
    tag: 'Premiação',
    tagCor: '#059669',
    tagBg: '#DCFCE7',
    leituraMins: 4,
  },
  {
    id: 'n2',
    destaque: false,
    titulo: 'IA integrada ao Tesauro permite consultas em linguagem natural sobre dados públicos',
    resumo:
      'Cidadãos já podem fazer perguntas como "quanto foi gasto em educação em 2025?" sem precisar dominar termos técnicos.',
    data: '18 abr. 2026',
    autor: 'Coord. de Sistemas',
    tag: 'Tecnologia',
    tagCor: '#2563EB',
    tagBg: '#DBEAFE',
    leituraMins: 3,
  },
  {
    id: 'n3',
    destaque: false,
    titulo: 'Emendas parlamentares passam a ser publicadas em tempo real',
    resumo:
      'A partir de abril de 2026, repasses individuais e de bancada estão disponíveis com atualização diária e rastreabilidade por parlamentar.',
    data: '12 abr. 2026',
    autor: 'Coord. de Transparência',
    tag: 'Dados Abertos',
    tagCor: '#7C3AED',
    tagBg: '#EDE9FE',
    leituraMins: 2,
  },
];

const AVISOS = [
  {
    id: 'av1',
    nivel: 'alta' as const,
    titulo: 'Manutenção programada do SIAF — 26/04/2026 (22h–6h)',
    resumo:
      'O sistema estará indisponível das 22h do sáb (26/04) às 6h do dom (27/04). Dados do dia 25/04 permanecem acessíveis durante o período.',
    data: '24 abr. 2026',
  },
  {
    id: 'av2',
    nivel: 'media' as const,
    titulo: 'Prazo RREO — 1º quadrimestre de 2026 encerra em 30/05',
    resumo:
      'Órgãos obrigados pela LRF devem enviar o Relatório Resumido da Execução Orçamentária via SICONFI até 30 de maio de 2026.',
    data: '20 abr. 2026',
  },
  {
    id: 'av3',
    nivel: 'info' as const,
    titulo: 'Novo layout CSV inclui colunas adicionais de classificação orçamentária',
    resumo:
      'Exportações dos painéis de despesas e receitas agora incluem código do favorecido, fonte de recursos e subfunção de governo.',
    data: '15 abr. 2026',
  },
];

const ATUALIZACOES = [
  {
    id: 'u1',
    modulo: 'Despesas',
    icone: TrendingUp,
    descricao: 'Empenhos de abril/2026 disponíveis',
    data: 'Hoje, 09h42',
    volume: '47.832 registros',
    cor: '#2563EB',
    bg: '#DBEAFE',
    pagina: 'dados',
  },
  {
    id: 'u2',
    modulo: 'Servidores',
    icone: Users,
    descricao: 'Folha de pagamento abril/2026',
    data: '24 abr. 2026',
    volume: '147.328 servidores',
    cor: '#7C3AED',
    bg: '#EDE9FE',
    pagina: 'pessoas',
  },
  {
    id: 'u3',
    modulo: 'Obras',
    icone: Zap,
    descricao: '1ª medição de maio/2026 publicada',
    data: '23 abr. 2026',
    volume: '847 obras atualizadas',
    cor: '#059669',
    bg: '#DCFCE7',
    pagina: 'obras',
  },
  {
    id: 'u4',
    modulo: 'Contratos',
    icone: CheckCircle,
    descricao: 'Contratos via Nova Lei de Licitações',
    data: '22 abr. 2026',
    volume: '328 novos contratos',
    cor: '#D97706',
    bg: '#FEF3C7',
    pagina: 'contratos',
  },
  {
    id: 'u5',
    modulo: 'Receitas',
    icone: Wifi,
    descricao: 'ICMS — fechamento março/2026',
    data: '21 abr. 2026',
    volume: 'R$ 1,4 bi arrecadados',
    cor: '#0891B2',
    bg: '#CFFAFE',
    pagina: 'dados',
  },
];

const EVENTOS = [
  {
    id: 'ev1',
    dia: '29',
    mes: 'ABR',
    titulo: 'Webinar: Transparência Pública e IA — Era da Gestão Digital',
    resumo:
      'Live aberta ao público com especialistas da CGU, TCE-MA e equipe do portal.',
    horario: '14h às 16h',
    local: 'Online — YouTube Portal MA',
    modalidade: 'online' as const,
    cor: '#7C3AED',
    bg: '#EDE9FE',
    inscritos: 312,
  },
  {
    id: 'ev2',
    dia: '08',
    mes: 'MAI',
    titulo: 'Capacitação LAI: Como solicitar informações públicas ao Estado',
    resumo:
      'Treinamento para servidores municipais, jornalistas e sociedade civil sobre o uso do e-SIC.',
    horario: '8h às 12h',
    local: 'Centro de Convenções — São Luís',
    modalidade: 'presencial' as const,
    cor: '#0891B2',
    bg: '#CFFAFE',
    inscritos: 87,
  },
  {
    id: 'ev3',
    dia: '15',
    mes: 'MAI',
    titulo: 'Hackathon Dados Abertos MA — 3ª Edição',
    resumo:
      'Competição de 48h com uso das APIs do Portal para desenvolver soluções de fiscalização cidadã.',
    horario: 'Sex 8h até Sáb 20h',
    local: 'UFMA — Campus São Luís',
    modalidade: 'presencial' as const,
    cor: '#DB2777',
    bg: '#FCE7F3',
    inscritos: 204,
  },
];

/* ─── Config de tabs ─── */
const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
  { id: 'todos',       label: 'Todos',          icon: Bell     },
  { id: 'noticias',    label: 'Notícias',        icon: Newspaper, count: NOTICIAS.length    },
  { id: 'avisos',      label: 'Avisos',          icon: AlertTriangle, count: AVISOS.length   },
  { id: 'atualizacoes',label: 'Atualizações',    icon: Database, count: ATUALIZACOES.length  },
  { id: 'eventos',     label: 'Eventos',         icon: CalendarDays, count: EVENTOS.length   },
];

const NIVEL_CONFIG = {
  alta:  { cor: '#DC2626', bg: '#FEF2F2', borda: '#FECACA', icon: AlertTriangle, label: 'Urgente'  },
  media: { cor: '#D97706', bg: '#FFFBEB', borda: '#FDE68A', icon: Bell,          label: 'Atenção'  },
  info:  { cor: '#0891B2', bg: '#ECFEFF', borda: '#A5F3FC', icon: Info,          label: 'Informação'},
};

/* ═══════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════ */
export default function FiquePorDentro({ onNavigate }: FiquePorDentroProps) {
  const [tabAtiva, setTabAtiva] = useState<Tab>('todos');
  const [email, setEmail] = useState('');
  const [inscrito, setInscrito] = useState(false);
  const [emailErro, setEmailErro] = useState('');

  const handleInscrever = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErro('Digite um e-mail válido.');
      return;
    }
    setEmailErro('');
    setInscrito(true);
  };

  return (
    <section
      style={{ backgroundColor: 'var(--tp-page)' }}
      aria-labelledby="fique-por-dentro-titulo"
    >
      {/* ── Separador superior com degradê ── */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--tp-border-sep), transparent)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Cabeçalho da seção ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex size-1.5 rounded-full bg-[#FFB800] animate-pulse" />
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>
                Atualizações em tempo real
              </span>
            </div>
            <h2 id="fique-por-dentro-titulo" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>
              Fique por Dentro
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--tp-text-3)' }}>
              Notícias, avisos, atualizações de dados e eventos do portal
            </p>
          </div>

          {/* Indicador de atualização */}
          <div className="flex items-center gap-2 text-xs shrink-0"
            style={{ color: 'var(--tp-text-4)' }}>
            <Wifi className="size-3.5 text-[#059669]" />
            <span>Atualizado hoje às 09h42</span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mb-7 flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const ativo = tabAtiva === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTabAtiva(tab.id)}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm shrink-0 transition-all duration-150"
                style={
                  ativo
                    ? { backgroundColor: 'var(--tp-dark)', color: '#ffffff', fontWeight: 600 }
                    : { backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-3)', border: '1px solid var(--tp-border-subtle)' }
                }
              >
                <Icon className="size-3.5" style={{ color: ativo ? '#FFB800' : 'var(--tp-text-4)' }} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="rounded-full px-1.5 py-0.5 text-xs leading-none"
                    style={{
                      backgroundColor: ativo ? 'rgba(255,184,0,0.25)' : 'var(--tp-surface-2)',
                      color: ativo ? '#FFB800' : 'var(--tp-text-4)',
                      fontWeight: 600,
                    }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Conteúdo com AnimatePresence ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tabAtiva}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {/* ════════ TODOS ════════ */}
            {tabAtiva === 'todos' && (
              <div className="space-y-6">

                {/* Linha 1 — Notícias: destaque + 2 menores */}
                <div>
                  <SectionLabel icon={Newspaper} label="Notícias" cor="#2563EB" onVerTodos={() => setTabAtiva('noticias')} />
                  <div className="grid md:grid-cols-5 gap-4">
                    {/* Destaque */}
                    <NoticiaDestaque n={NOTICIAS[0]} />
                    {/* 2 menores */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                      {NOTICIAS.slice(1).map(n => <NoticiaCard key={n.id} n={n} compact />)}
                    </div>
                  </div>
                </div>

                {/* Linha 2 — Avisos + Atualizações side-by-side */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Avisos */}
                  <div>
                    <SectionLabel icon={AlertTriangle} label="Avisos" cor="#D97706" onVerTodos={() => setTabAtiva('avisos')} />
                    <div className="space-y-2.5">
                      {AVISOS.map(av => <AvisoCard key={av.id} av={av} />)}
                    </div>
                  </div>

                  {/* Atualizações */}
                  <div>
                    <SectionLabel icon={Database} label="Atualizações de Dados" cor="#059669" onVerTodos={() => setTabAtiva('atualizacoes')} />
                    <div className="space-y-2.5">
                      {ATUALIZACOES.slice(0, 4).map(u => <AtualizacaoCard key={u.id} u={u} onNavigate={onNavigate} />)}
                    </div>
                  </div>
                </div>

                {/* Linha 3 — Eventos */}
                <div>
                  <SectionLabel icon={CalendarDays} label="Próximos Eventos" cor="#7C3AED" onVerTodos={() => setTabAtiva('eventos')} />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {EVENTOS.map(ev => <EventoCard key={ev.id} ev={ev} />)}
                  </div>
                </div>
              </div>
            )}

            {/* ════════ NOTÍCIAS ════════ */}
            {tabAtiva === 'noticias' && (
              <div className="space-y-4">
                <NoticiaDestaque n={NOTICIAS[0]} />
                <div className="grid sm:grid-cols-2 gap-4">
                  {NOTICIAS.slice(1).map(n => <NoticiaCard key={n.id} n={n} />)}
                </div>
              </div>
            )}

            {/* ════════ AVISOS ════════ */}
            {tabAtiva === 'avisos' && (
              <div className="space-y-3 max-w-3xl">
                {AVISOS.map(av => <AvisoCard key={av.id} av={av} expanded />)}
              </div>
            )}

            {/* ════════ ATUALIZAÇÕES ════════ */}
            {tabAtiva === 'atualizacoes' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ATUALIZACOES.map(u => <AtualizacaoCard key={u.id} u={u} onNavigate={onNavigate} expanded />)}
              </div>
            )}

            {/* ════════ EVENTOS ════════ */}
            {tabAtiva === 'eventos' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EVENTOS.map(ev => <EventoCard key={ev.id} ev={ev} />)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Newsletter ── */}
        <div className="mt-10">
          <div
            className="relative overflow-hidden rounded-[20px] p-8"
            style={{ backgroundColor: 'var(--tp-dark)' }}
          >
            {/* Brilho decorativo */}
            <div className="absolute -top-20 -right-20 size-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #FFB800 0%, transparent 70%)' }} />
            <div className="absolute -bottom-16 -left-16 size-48 rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }} />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Esquerda — texto */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFB800]/15">
                    <Mail className="size-4 text-[#FFB800]" />
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-widest">Newsletter</span>
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>
                  Receba as novidades no seu e-mail
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Notícias, avisos de manutenção, atualizações de dados e eventos do Portal da Transparência.
                  Semanal, gratuito, sem spam.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-3" />
                    5.243 assinantes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" />
                    Envios às sextas-feiras
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="size-3" />
                    Cancelamento a qualquer momento
                  </span>
                </div>
              </div>

              {/* Direita — formulário */}
              <div>
                <AnimatePresence mode="wait">
                  {inscrito ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl p-6 text-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      <div className="flex size-12 items-center justify-center rounded-full bg-[#059669]/20 mx-auto mb-3">
                        <CheckCircle className="size-6 text-[#4ADE80]" />
                      </div>
                      <p className="text-white" style={{ fontWeight: 700 }}>Inscrição confirmada!</p>
                      <p className="text-white/60 text-sm mt-1">
                        Você receberá nossa newsletter em <span className="text-white">{email}</span>
                      </p>
                      <button
                        onClick={() => { setInscrito(false); setEmail(''); }}
                        className="mt-4 text-xs text-white/40 hover:text-white transition-colors"
                      >
                        Alterar e-mail
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleInscrever}
                      className="space-y-3"
                    >
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setEmailErro(''); }}
                          placeholder="seu@email.com.br"
                          className="w-full rounded-full border pl-11 pr-4 py-3 text-sm outline-none transition-all"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderColor: emailErro ? '#EF4444' : 'rgba(255,255,255,0.15)',
                            color: '#ffffff',
                          }}
                        />
                      </div>
                      {emailErro && (
                        <p className="text-xs text-red-400 pl-2">{emailErro}</p>
                      )}
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                        style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)', fontWeight: 700 }}
                      >
                        <Mail className="size-4" />
                        Inscrever-se gratuitamente
                        <ArrowRight className="size-4" />
                      </button>
                      <p className="text-center text-xs text-white/30">
                        Protegido por LGPD · Lei 13.709/2018. Seus dados não serão compartilhados.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SUB-COMPONENTES
══════════════════════════════════════ */

function SectionLabel({
  icon: Icon, label, cor, onVerTodos,
}: { icon: React.ElementType; label: string; cor: string; onVerTodos: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="size-4" style={{ color: cor }} />
        <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{label}</span>
      </div>
      <button
        onClick={onVerTodos}
        className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
        style={{ color: cor }}
      >
        Ver todos <ChevronRight className="size-3.5" />
      </button>
    </div>
  );
}

/* ─── Notícia Destaque ─── */
function NoticiaDestaque({ n }: { n: typeof NOTICIAS[0] }) {
  return (
    <div
      className="md:col-span-3 flex flex-col rounded-[20px] overflow-hidden transition-all hover:-translate-y-1 cursor-pointer group"
      style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 1px 3px var(--tp-shadow)' }}
    >
      {/* Banner colorido */}
      <div className="h-40 relative flex items-end p-5"
        style={{ background: 'linear-gradient(135deg, #0A1128 0%, #1e3a5f 60%, #0A1128 100%)' }}>
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,184,0,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative">
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
            style={{ backgroundColor: n.tagBg, color: n.tagCor, fontWeight: 700 }}>
            {n.tag}
          </span>
        </div>
        {/* Badge destaque */}
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-[#FFB800] px-2.5 py-1 text-xs text-[#0A1128]" style={{ fontWeight: 700 }}>
          <span className="size-1.5 rounded-full bg-[#0A1128] animate-pulse" />
          Destaque
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'var(--tp-text-4)' }}>
          <span className="flex items-center gap-1"><Clock className="size-3" /> {n.data}</span>
          <span>·</span>
          <span>{n.leituraMins} min de leitura</span>
          <span>·</span>
          <span>{n.autor}</span>
        </div>
        <h3 className="text-base leading-snug mb-2 group-hover:text-[#2563EB] transition-colors" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>
          {n.titulo}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--tp-text-3)' }}>
          {n.resumo}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm" style={{ color: '#2563EB', fontWeight: 600 }}>
          Ler notícia completa <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}

/* ─── Notícia Card Compacto ─── */
function NoticiaCard({ n, compact }: { n: typeof NOTICIAS[0]; compact?: boolean }) {
  return (
    <div
      className="flex flex-col rounded-[20px] overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5"
      style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', flex: compact ? '1 1 0' : 'none' }}
    >
      {/* Topo colorido compacto */}
      <div className="h-2 w-full" style={{ backgroundColor: n.tagCor }} />

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="rounded-full px-2 py-0.5 text-xs"
            style={{ backgroundColor: n.tagBg, color: n.tagCor, fontWeight: 600 }}>
            {n.tag}
          </span>
          <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>
            {n.leituraMins} min
          </span>
        </div>
        <h3 className="text-sm leading-snug mb-1.5 flex-1 group-hover:text-[#2563EB] transition-colors"
          style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
          {n.titulo}
        </h3>
        {!compact && (
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--tp-text-3)' }}>
            {n.resumo}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--tp-border-subtle)' }}>
          <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{n.data}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#2563EB', fontWeight: 600 }}>
            Ler <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Aviso Card ─── */
function AvisoCard({ av, expanded }: { av: typeof AVISOS[0]; expanded?: boolean }) {
  const cfg = NIVEL_CONFIG[av.nivel];
  const Icon = cfg.icon;
  return (
    <div
      className="flex gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer"
      style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.borda}` }}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${cfg.cor}15` }}>
        <Icon className="size-4" style={{ color: cfg.cor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <span className="inline-flex rounded-full px-2 py-0.5 text-xs mr-2"
              style={{ backgroundColor: `${cfg.cor}20`, color: cfg.cor, fontWeight: 700 }}>
              {cfg.label}
            </span>
          </div>
          <span className="text-xs shrink-0" style={{ color: cfg.cor, opacity: 0.7 }}>{av.data}</span>
        </div>
        <p className="text-sm leading-snug mb-1" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
          {av.titulo}
        </p>
        {(expanded || av.nivel === 'alta') && (
          <p className="text-xs leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>
            {av.resumo}
          </p>
        )}
        {!expanded && av.nivel !== 'alta' && (
          <p className="text-xs leading-relaxed truncate" style={{ color: 'var(--tp-text-3)' }}>
            {av.resumo}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Atualização Card ─── */
function AtualizacaoCard({
  u, onNavigate, expanded,
}: { u: typeof ATUALIZACOES[0]; onNavigate?: (p: string) => void; expanded?: boolean }) {
  const Icon = u.icone;
  return (
    <button
      onClick={() => onNavigate?.(u.pagina)}
      className="w-full flex items-center gap-3 rounded-2xl p-3.5 text-left group transition-all hover:-translate-y-0.5"
      style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: u.bg }}>
        <Icon className="size-4" style={{ color: u.cor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="text-xs rounded-full px-2 py-0.5"
            style={{ backgroundColor: u.bg, color: u.cor, fontWeight: 700 }}>
            {u.modulo}
          </span>
          <span className="text-xs shrink-0" style={{ color: 'var(--tp-text-4)' }}>{u.data}</span>
        </div>
        <p className="text-sm leading-tight" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
          {u.descricao}
        </p>
        {expanded && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--tp-text-4)' }}>{u.volume}</p>
        )}
        {!expanded && (
          <p className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{u.volume}</p>
        )}
      </div>
      <ChevronRight className="size-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
        style={{ color: u.cor }} />
    </button>
  );
}

/* ─── Evento Card ─── */
function EventoCard({ ev }: { ev: typeof EVENTOS[0] }) {
  const ModalIcon = ev.modalidade === 'online' ? Video : MapPin;
  const modalLabel = ev.modalidade === 'online' ? 'Online' : 'Presencial';
  return (
    <div
      className="flex flex-col rounded-[20px] overflow-hidden cursor-pointer group transition-all hover:-translate-y-1"
      style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 1px 3px var(--tp-shadow)' }}
    >
      {/* Topo com data em destaque */}
      <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid var(--tp-border-subtle)' }}>
        {/* Calendário */}
        <div className="flex flex-col items-center justify-center rounded-2xl p-3 shrink-0"
          style={{ backgroundColor: ev.bg, minWidth: 56 }}>
          <span className="text-2xl leading-none" style={{ color: ev.cor, fontWeight: 900 }}>
            {ev.dia}
          </span>
          <span className="text-xs uppercase tracking-wider" style={{ color: ev.cor, fontWeight: 700 }}>
            {ev.mes}
          </span>
        </div>
        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <ModalIcon className="size-3 shrink-0" style={{ color: ev.cor }} />
            <span className="text-xs" style={{ color: ev.cor, fontWeight: 600 }}>{modalLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--tp-text-4)' }}>
            <Clock className="size-3 shrink-0" />
            {ev.horario}
          </div>
          <div className="flex items-center gap-1.5 text-xs truncate mt-0.5" style={{ color: 'var(--tp-text-4)' }}>
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{ev.local}</span>
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm leading-snug mb-2 flex-1 group-hover:underline"
          style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>
          {ev.titulo}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>{ev.resumo}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--tp-text-4)' }}>
            <Users className="size-3" />
            {ev.inscritos} inscritos
          </div>
          <span className="flex items-center gap-1 text-xs" style={{ color: ev.cor, fontWeight: 600 }}>
            Inscrever-se <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

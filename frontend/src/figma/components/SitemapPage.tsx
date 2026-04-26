'use client';

import { motion } from 'motion/react';
import {
  Home, DollarSign, Users, Building2, FileText,
  Heart, BarChart3, Sparkles, Building, Map,
  BookOpen, Shield, Scale, MessageSquareWarning,
  FileSearch, Phone, ExternalLink, ChevronRight,
  Settings, HelpCircle, Info, Target, GitBranch,
  Clock, Gavel, Globe, Lock,
} from 'lucide-react';
import { DataSearchIcon } from './icons/DataSearchIcon';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

interface LinkItem {
  label: string;
  desc?: string;
  page?: string;
  anchor?: string;
  external?: string;
  badge?: string;
  badgeCor?: string;
}

interface SitemapGrupo {
  id: string;
  grupo: string;
  icon: React.ElementType;
  cor: string;
  bg: string;
  descricao: string;
  links: LinkItem[];
}

/* ─────────────────────────────────────────────
   Estrutura hierárquica do portal
───────────────────────────────────────────── */
const SITEMAP: SitemapGrupo[] = [
  {
    id: 'inicio',
    grupo: 'Início',
    icon: Home,
    cor: '#0A1128',
    bg: '#F1F5F9',
    descricao: 'Página principal com visão geral do portal',
    links: [
      { label: 'Hero — Boas-vindas e Busca Global', page: 'home' },
      { label: 'Barra de Navegação Rápida', page: 'home' },
      { label: 'Acesso Rápido — Atalhos Prioritários', page: 'home' },
      { label: 'Insights de IA em Destaque', page: 'home' },
      { label: 'ChatBot Flutuante', desc: 'Disponível em todas as páginas' },
    ],
  },
  {
    id: 'dados',
    grupo: 'Transparência Ativa',
    icon: DollarSign,
    cor: '#2563EB',
    bg: '#EFF6FF',
    descricao: 'Dados financeiros e orçamentários do estado',
    links: [
      { label: 'Dinheiro Público — Despesas e Receitas', page: 'dados', badge: 'R$ 18,4 bi', badgeCor: '#2563EB' },
      { label: 'Empenhos e Pagamentos', page: 'dados' },
      { label: 'Arrecadação e Receitas', page: 'dados' },
      { label: 'Transferências Federais (FPE/FPM)', page: 'dados' },
      { label: 'Gestão Fiscal — Relatórios LRF/RGF', page: 'dados' },
    ],
  },
  {
    id: 'pessoas',
    grupo: 'Servidores Públicos',
    icon: Users,
    cor: '#7C3AED',
    bg: '#F5F3FF',
    descricao: 'Remunerações e quadro de pessoal estadual',
    links: [
      { label: 'Servidores — Painel Geral', page: 'pessoas', badge: '147 mil', badgeCor: '#7C3AED' },
      { label: 'Remunerações e Vencimentos', page: 'pessoas' },
      { label: 'Cargos e Funções', page: 'pessoas' },
      { label: 'Diárias e Adiantamentos', page: 'pessoas' },
      { label: 'RPPS — Previdência Estadual', page: 'pessoas' },
    ],
  },
  {
    id: 'obras',
    grupo: 'Obras Públicas',
    icon: Building2,
    cor: '#059669',
    bg: '#ECFDF5',
    descricao: 'Obras em andamento, concluídas e paralisadas',
    links: [
      { label: 'Mapa Interativo de Obras', page: 'obras', badge: '847 obras', badgeCor: '#059669' },
      { label: 'Obras por Município', page: 'obras' },
      { label: 'Obras por Secretaria', page: 'obras' },
      { label: 'Histórico de Execução Física', page: 'obras' },
      { label: 'Fiscalização e Medições', page: 'obras' },
    ],
  },
  {
    id: 'contratos',
    grupo: 'Contratos e Licitações',
    icon: FileText,
    cor: '#D97706',
    bg: '#FFFBEB',
    descricao: 'Contratos firmados e processos licitatórios',
    links: [
      { label: 'Contratos Vigentes', page: 'contratos', badge: '12 mil', badgeCor: '#D97706' },
      { label: 'Processos Licitatórios', page: 'contratos' },
      { label: 'Pregões Eletrônicos', page: 'contratos' },
      { label: 'Dispensas e Inexigibilidades', page: 'contratos' },
      { label: 'Atas de Registro de Preços', page: 'contratos' },
      { label: 'Sanções Administrativas', page: 'contratos' },
    ],
  },
  {
    id: 'programas',
    grupo: 'Programas Sociais',
    icon: Heart,
    cor: '#DB2777',
    bg: '#FDF2F8',
    descricao: 'Benefícios, bolsas e ações sociais do governo',
    links: [
      { label: 'Painel de Programas Sociais', page: 'programas', badge: '680 mil benef.', badgeCor: '#DB2777' },
      { label: 'Bolsa Família / CadÚnico MA', page: 'programas' },
      { label: 'Benefícios por Município', page: 'programas' },
      { label: 'Habitação e Regularização Fundiária', page: 'programas' },
      { label: 'Saúde — Repasses e Programas', page: 'programas' },
      { label: 'Educação — Bolsas e Auxílios', page: 'programas' },
    ],
  },
  {
    id: 'governo',
    grupo: 'Estrutura de Governo',
    icon: BarChart3,
    cor: '#0891B2',
    bg: '#ECFEFF',
    descricao: 'Organização administrativa do estado',
    links: [
      { label: 'Organograma do Poder Executivo', page: 'governo' },
      { label: 'Secretarias de Estado', page: 'governo' },
      { label: 'Autarquias e Fundações', page: 'governo' },
      { label: 'Empresas Públicas e Mistas', page: 'governo' },
      { label: 'Gabinete do Governador', page: 'governo' },
    ],
  },
  {
    id: 'ferramentas',
    grupo: 'Ferramentas',
    icon: Sparkles,
    cor: '#FFB800',
    bg: '#FFF7E0',
    descricao: 'IA, busca avançada e exploração técnica',
    links: [
      { label: 'Assistente de IA — Pergunte à IA', page: 'ia', badge: 'Novo', badgeCor: '#FFB800', desc: 'Tesauro MT-0001 a MT-0049' },
      { label: 'Explorar Dados — Wizard Técnico', page: 'tecnico', badge: 'Diamante', badgeCor: '#92600A', desc: '115 critérios Selo Diamante' },
      { label: 'API de Dados Abertos', desc: 'REST/JSON · documentação completa' },
      { label: 'Download de Planilhas CSV/XLSX', desc: 'Disponível em cada painel' },
    ],
  },
  {
    id: 'institucional',
    grupo: 'Institucional',
    icon: Building,
    cor: '#4B5563',
    bg: '#F9FAFB',
    descricao: 'Informações sobre a Secretaria de Transparência',
    links: [
      { label: 'Sobre o Portal', page: 'institucional', anchor: 'sobre' },
      { label: 'Missão e Visão', page: 'institucional', anchor: 'missao' },
      { label: 'Estrutura Organizacional', page: 'institucional', anchor: 'estrutura' },
      { label: 'Equipe / Gestão', page: 'institucional', anchor: 'equipe' },
      { label: 'Legislação Aplicável', page: 'institucional', anchor: 'legislacao' },
      { label: 'Histórico do Portal', page: 'institucional', anchor: 'historico' },
    ],
  },
  {
    id: 'cidadao',
    grupo: 'Cidadão — Acesso Prioritário',
    icon: MessageSquareWarning,
    cor: '#BE123C',
    bg: '#FFF1F2',
    descricao: 'Canais de participação e acesso à informação',
    links: [
      { label: 'Ouvidoria do Estado', external: 'https://ouvidoria.ma.gov.br', desc: 'Denúncias, reclamações e elogios' },
      { label: 'e-SIC — Acesso à Informação (LAI)', external: 'https://esic.ma.gov.br', desc: 'Lei 12.527/2011' },
      { label: 'Central de Atendimento 0800 555 0001', external: 'tel:08005550001', desc: 'Ligação gratuita · Seg a Sex 8h–17h' },
      { label: 'Portal do Governo do MA', external: 'https://www.ma.gov.br' },
      { label: 'TCE-MA — Tribunal de Contas', external: 'https://tce.ma.gov.br' },
      { label: 'CGU — Transparência Federal', external: 'https://transparencia.gov.br' },
    ],
  },
  {
    id: 'informacoes',
    grupo: 'Informações do Portal',
    icon: Info,
    cor: '#6366F1',
    bg: '#EEF2FF',
    descricao: 'Documentação, políticas e navegação',
    links: [
      { label: 'Mapa do Site', page: 'sitemap', desc: 'Você está aqui' },
      { label: 'Glossário de Termos Técnicos', page: 'glossario', desc: '80+ termos · referências normativas' },
      { label: 'Política de Privacidade', desc: 'LGPD · Lei 13.709/2018' },
      { label: 'Termos de Uso', desc: 'Condições de utilização do portal' },
      { label: 'Acessibilidade (WCAG 2.2 AAA)', desc: 'Declaração de acessibilidade' },
      { label: 'Perguntas Frequentes (FAQ)', desc: 'Dúvidas sobre dados e funcionalidades' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
export default function SitemapPage({ onNavigate }: SitemapPageProps) {
  const total = SITEMAP.reduce((acc, g) => acc + g.links.length, 0);

  return (
    <div style={{ backgroundColor: 'var(--tp-page)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ backgroundColor: 'var(--tp-dark)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-1.5 text-sm mb-5">
            <button onClick={() => onNavigate('home')} className="text-white/50 hover:text-white transition-colors">Início</button>
            <ChevronRight className="size-3.5 text-white/30" />
            <span className="text-[#FFB800]">Mapa do Site</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex size-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.3)' }}>
                  <Map className="size-5 text-[#FFB800]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Navegação</div>
                  <h1 className="text-white" style={{ fontWeight: 700 }}>Mapa do Site</h1>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Visão hierárquica completa de todas as seções, páginas e funcionalidades do Portal da Transparência do Estado do Maranhão.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 text-sm">
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="text-white" style={{ fontWeight: 700 }}>{SITEMAP.length}</div>
                <div className="text-white/50 text-xs">seções</div>
              </div>
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="text-[#FFB800]" style={{ fontWeight: 700 }}>{total}</div>
                <div className="text-white/50 text-xs">páginas/links</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grade de grupos ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Índice rápido de seções */}
        <div className="rounded-[20px] p-5 mb-8"
          style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--tp-text-4)' }}>
            Índice rápido
          </p>
          <div className="flex flex-wrap gap-2">
            {SITEMAP.map(g => {
              const Icon = g.icon;
              return (
                <a
                  key={g.id}
                  href={`#grupo-${g.id}`}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5"
                  style={{ borderColor: `${g.cor}30`, backgroundColor: g.bg, color: g.cor }}
                >
                  <Icon className="size-3.5" />
                  {g.grupo}
                </a>
              );
            })}
          </div>
        </div>

        {/* Grid de grupos */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SITEMAP.map((grupo, idx) => (
            <motion.div
              key={grupo.id}
              id={`grupo-${grupo.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-[20px] overflow-hidden flex flex-col"
              style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}
            >
              {/* Cabeçalho do card */}
              <div className="px-5 py-4 flex items-start gap-3"
                style={{ borderBottom: '1px solid var(--tp-border-subtle)' }}>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: grupo.bg, border: `1px solid ${grupo.cor}20` }}>
                  <grupo.icon className="size-4" style={{ color: grupo.cor }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{grupo.grupo}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--tp-text-4)' }}>{grupo.descricao}</div>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5 shrink-0"
                  style={{ backgroundColor: grupo.bg, color: grupo.cor, fontWeight: 600 }}>
                  {grupo.links.length}
                </span>
              </div>

              {/* Lista de links */}
              <ul className="flex-1 divide-y" style={{ borderColor: 'var(--tp-border-subtle)' }}>
                {grupo.links.map((link, li) => (
                  <li key={li}>
                    <LinkRow link={link} grupoCor={grupo.cor} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Legenda de status */}
        <div className="mt-10 rounded-[20px] p-5"
          style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--tp-text-4)' }}>Legenda</p>
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--tp-text-3)' }}>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#059669]" />
              Página acessível via navegação interna
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="size-3 text-[#0891B2]" />
              Link externo — abre nova aba
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full" style={{ backgroundColor: 'var(--tp-border)' }} />
              Funcionalidade embutida na página
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Linha de link
───────────────────────────────────────────── */
function LinkRow({ link, grupoCor, onNavigate }: {
  link: LinkItem;
  grupoCor: string;
  onNavigate: (page: string) => void;
}) {
  const isExternal = !!link.external;
  const isInternal = !!link.page;

  const handleClick = () => {
    if (link.page) onNavigate(link.page);
    else if (link.external) window.open(link.external, '_blank');
  };

  const cursor = isExternal || isInternal ? 'pointer' : 'default';

  return (
    <button
      onClick={isExternal || isInternal ? handleClick : undefined}
      className="w-full flex items-center gap-3 px-5 py-3 text-left group transition-colors"
      style={{ cursor }}
    >
      {/* Indicador */}
      <div className="shrink-0">
        {isExternal ? (
          <ExternalLink className="size-3.5" style={{ color: '#0891B2' }} />
        ) : isInternal ? (
          <div className="size-2 rounded-full" style={{ backgroundColor: '#059669' }} />
        ) : (
          <div className="size-2 rounded-full" style={{ backgroundColor: 'var(--tp-border)' }} />
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <div
          className="text-sm truncate transition-colors"
          style={{
            color: isInternal || isExternal ? 'var(--tp-text-1)' : 'var(--tp-text-3)',
            fontWeight: isInternal || isExternal ? 500 : 400,
          }}
        >
          {link.label}
        </div>
        {link.desc && (
          <div className="text-xs truncate" style={{ color: 'var(--tp-text-4)' }}>{link.desc}</div>
        )}
      </div>

      {/* Badge */}
      {link.badge && (
        <span className="shrink-0 rounded-full px-2 py-0.5 text-xs"
          style={{ backgroundColor: `${link.badgeCor}15`, color: link.badgeCor, fontWeight: 600 }}>
          {link.badge}
        </span>
      )}

      {/* Seta no hover */}
      {(isInternal || isExternal) && (
        <ChevronRight
          className="size-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
          style={{ color: grupoCor }}
        />
      )}
    </button>
  );
}

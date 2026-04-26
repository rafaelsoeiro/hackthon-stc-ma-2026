'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Info, Target, GitBranch, Users, Scale, Clock,
  ChevronRight, ExternalLink, MapPin, Phone, Mail,
  CheckCircle, ArrowRight, Building, Shield, Layers,
  BookOpen, Gavel, FileText, Award, Star, Zap,
  ChevronDown, ChevronUp,
} from 'lucide-react';

interface InstitucionalPageProps {
  onNavigate: (page: string) => void;
}

/* ─────────────────────────────────────────────
   Dados de conteúdo
───────────────────────────────────────────── */
const SECTIONS = [
  { id: 'sobre',      label: 'Sobre o Portal',          icon: Info       },
  { id: 'missao',     label: 'Missão e Visão',           icon: Target     },
  { id: 'estrutura',  label: 'Estrutura Organizacional', icon: GitBranch  },
  { id: 'equipe',     label: 'Equipe / Gestão',          icon: Users      },
  { id: 'legislacao', label: 'Legislação Aplicável',     icon: Scale      },
  { id: 'historico',  label: 'Histórico',                icon: Clock      },
];

const VALORES = [
  { icon: Shield,   label: 'Transparência',    desc: 'Dados públicos acessíveis a todos, sem barreiras' },
  { icon: Star,     label: 'Integridade',      desc: 'Informações precisas, verificadas e confiáveis' },
  { icon: Zap,      label: 'Inovação',         desc: 'Tecnologia de ponta a serviço da cidadania' },
  { icon: Users,    label: 'Acessibilidade',   desc: 'WCAG 2.2 AAA — inclusão digital para todos' },
  { icon: CheckCircle, label: 'Responsabilidade', desc: 'Prestação de contas rigorosa e pontual' },
  { icon: Building, label: 'Participação',     desc: 'Cidadão como protagonista do controle social' },
];

const EQUIPE = [
  {
    nome: 'Dr. Ricardo Alves Santos',
    cargo: 'Secretário de Estado de Transparência e Controle',
    bio: 'Mestre em Administração Pública pela UFMA, com 18 anos de carreira no serviço público estadual. Idealizador do Portal de 3ª Geração e do Tesauro Institucional.',
    foto: 'https://images.unsplash.com/photo-1758599543242-31567fb8766e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    cor: '#0A1128',
    iniciais: 'RS',
  },
  {
    nome: 'Maria Cristina Fonseca',
    cargo: 'Coordenadora de Transparência Ativa',
    bio: 'Especialista em Dados Abertos e Governo Digital. Responsável pela implementação do Selo Diamante e pela curadoria das 115 informações publicadas.',
    foto: 'https://images.unsplash.com/photo-1758599543114-4eaf17a9ef64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    cor: '#7C3AED',
    iniciais: 'MF',
  },
  {
    nome: 'Paulo Eduardo Marques',
    cargo: 'Coordenador de Sistemas e Tecnologia',
    bio: 'Engenheiro de Software com pós-graduação em Segurança da Informação. Liderou a integração da IA ao Tesauro MT-0001 a MT-0049 e a conformidade WCAG AAA.',
    foto: 'https://images.unsplash.com/photo-1752952952773-80378cefc23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    cor: '#059669',
    iniciais: 'PM',
  },
  {
    nome: 'Ana Paula Guimarães',
    cargo: 'Ouvidora-Geral do Estado',
    bio: 'Bacharel em Direito e especialista em LAI. Coordena o e-SIC, a Ouvidoria e os canais de atendimento ao cidadão, garantindo respostas em prazo legal.',
    foto: 'https://images.unsplash.com/photo-1666867936058-de34bfd5b320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    cor: '#DB2777',
    iniciais: 'AG',
  },
];

const LEGISLACAO = [
  {
    sigla: 'LAI',
    numero: 'Lei nº 12.527/2011',
    titulo: 'Lei de Acesso à Informação',
    desc: 'Regula o acesso a informações previsto na Constituição Federal. Obriga o poder público a publicar informações de interesse coletivo.',
    cor: '#2563EB',
    bg: '#EFF6FF',
    href: 'http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm',
    abrangencia: 'Federal',
  },
  {
    sigla: 'LRF',
    numero: 'LC nº 101/2000',
    titulo: 'Lei de Responsabilidade Fiscal',
    desc: 'Estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal. Define transparência como pilar da gestão.',
    cor: '#059669',
    bg: '#ECFDF5',
    href: 'http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm',
    abrangencia: 'Federal',
  },
  {
    sigla: 'LGPD',
    numero: 'Lei nº 13.709/2018',
    titulo: 'Lei Geral de Proteção de Dados',
    desc: 'Regula o tratamento de dados pessoais. O portal segue todas as diretrizes da LGPD na coleta e armazenamento de dados de acesso.',
    cor: '#7C3AED',
    bg: '#F5F3FF',
    href: 'http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    abrangencia: 'Federal',
  },
  {
    sigla: 'D7724',
    numero: 'Decreto nº 7.724/2012',
    titulo: 'Regulamenta a LAI no Executivo Federal',
    desc: 'Dispõe sobre a divulgação de informações públicas pelos órgãos e entidades do Poder Executivo federal.',
    cor: '#D97706',
    bg: '#FFFBEB',
    href: 'http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/decreto/d7724.htm',
    abrangencia: 'Federal',
  },
  {
    sigla: 'LE-MA',
    numero: 'Lei Estadual nº 10.217/2015',
    titulo: 'Lei de Transparência do Maranhão',
    desc: 'Institui o Portal da Transparência do Estado do Maranhão e define as informações de divulgação obrigatória pelos órgãos estaduais.',
    cor: '#0891B2',
    bg: '#ECFEFF',
    href: '#',
    abrangencia: 'Estadual/MA',
  },
  {
    sigla: 'DE-MA',
    numero: 'Decreto Estadual nº 30.645/2015',
    titulo: 'Regulamenta a transparência estadual',
    desc: 'Define os prazos, formatos e padrões técnicos para publicação de dados no Portal da Transparência do Maranhão.',
    cor: '#DB2777',
    bg: '#FDF2F8',
    href: '#',
    abrangencia: 'Estadual/MA',
  },
  {
    sigla: 'IN01',
    numero: 'IN STC nº 01/2022',
    titulo: 'Padrões do Portal de Transparência',
    desc: 'Instrução Normativa que define os padrões de qualidade, acessibilidade e interoperabilidade das informações publicadas.',
    cor: '#4B5563',
    bg: '#F9FAFB',
    href: '#',
    abrangencia: 'Normativa Interna',
  },
  {
    sigla: 'SELO',
    numero: 'Portaria CGE nº 15/2024',
    titulo: 'Critérios do Selo Diamante',
    desc: 'Estabelece os 115 critérios de avaliação para obtenção do Selo Diamante de Transparência Pública.',
    cor: '#92400E',
    bg: '#FEF3C7',
    href: '#',
    abrangencia: 'Normativa Interna',
  },
];

const TIMELINE = [
  {
    ano: '2013',
    titulo: 'Portal lançado',
    desc: 'Primeira versão do Portal da Transparência do Maranhão, com dados básicos de receitas e despesas. Conformidade mínima com a LAI.',
    destaque: false,
  },
  {
    ano: '2015',
    titulo: 'Integração SEFAZ',
    desc: 'Integração em tempo real com os sistemas da Secretaria de Fazenda. Publicação automatizada de notas de empenho, liquidação e pagamento.',
    destaque: false,
  },
  {
    ano: '2017',
    titulo: '1º Selo Diamante',
    desc: 'Maranhão conquista pela primeira vez o Selo Diamante de Transparência da CGU, tornando-se referência regional com 98 de 115 critérios atendidos.',
    destaque: true,
  },
  {
    ano: '2019',
    titulo: 'Redesign mobile-first',
    desc: 'Redesign completo da plataforma com foco em acessibilidade (WCAG AA) e experiência mobile. Novo módulo de Obras Públicas com geolocalização.',
    destaque: false,
  },
  {
    ano: '2021',
    titulo: 'Módulos integrados',
    desc: 'Licitações, Contratos, Emendas Parlamentares e Servidores integrados em painel único. API de Dados Abertos publicada com documentação completa.',
    destaque: false,
  },
  {
    ano: '2023',
    titulo: 'Piloto de IA',
    desc: 'Projeto piloto de Inteligência Artificial para interpretação de consultas em linguagem natural sobre dados de despesas e receitas estaduais.',
    destaque: false,
  },
  {
    ano: '2025',
    titulo: 'Tesauro MT-0001/0049',
    desc: 'Publicação do Tesauro Institucional com 49 termos controlados (MT-0001 a MT-0049), mapeando vocabulário único para dados públicos do estado.',
    destaque: true,
  },
  {
    ano: '2026',
    titulo: 'Portal de 3ª Geração',
    desc: 'Lançamento da versão atual: IA integrada ao Tesauro, WCAG 2.2 AAA, Selo Diamante 100% (115/115), temas dark/high-contrast e wizard de consulta avançada.',
    destaque: true,
  },
];

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
export default function InstitucionalPage({ onNavigate }: InstitucionalPageProps) {
  const [activeSection, setActiveSection] = useState('sobre');
  const [mobileTOCOpen, setMobileTOCOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* IntersectionObserver — atualiza seção ativa ao rolar */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMobileTOCOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88; // header (64) + buffer (24)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--tp-page)', minHeight: '100vh' }}>

      {/* ── Hero interno ── */}
      <div style={{ backgroundColor: 'var(--tp-dark)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Navegação estrutural">
            <button onClick={() => onNavigate('home')} className="text-white/50 hover:text-white transition-colors">
              Início
            </button>
            <ChevronRight className="size-3.5 text-white/30" />
            <span className="text-[#FFB800]">Institucional</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'rgba(255,184,0,0.15)', border: '1px solid rgba(255,184,0,0.3)' }}>
                  <Building className="size-6 text-[#FFB800]" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Governo do Maranhão</div>
                  <h1 className="text-white leading-tight" style={{ fontWeight: 700 }}>
                    Institucional
                  </h1>
                </div>
              </div>
              <p className="text-white/60 max-w-2xl leading-relaxed">
                Conheça a Secretaria de Transparência e Controle do Estado do Maranhão — sua missão, equipe, estrutura organizacional, base legal e histórico do Portal da Transparência.
              </p>
            </div>

            {/* Selos rápidos */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {[
                { emoji: '💎', label: 'Selo Diamante', sub: '115/115' },
                { emoji: '♿', label: 'WCAG 2.2 AAA', sub: 'Certificado' },
                { emoji: '📅', label: 'Desde', sub: '2013' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span>{s.emoji}</span>
                  <div>
                    <div className="text-white text-xs" style={{ fontWeight: 600 }}>{s.label}</div>
                    <div className="text-white/50 text-xs">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOC Mobile: pill bar colapsável ── */}
      <div className="lg:hidden sticky z-30 shadow-sm" style={{ top: 64, backgroundColor: 'var(--tp-surface)', borderBottom: '1px solid var(--tp-border-subtle)' }}>
        <button
          onClick={() => setMobileTOCOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm"
          style={{ color: 'var(--tp-text-1)' }}
        >
          <span className="flex items-center gap-2">
            {(() => { const s = SECTIONS.find(s => s.id === activeSection); const Icon = s?.icon ?? Info; return <Icon className="size-4 text-[#FFB800]" />; })()}
            <span style={{ fontWeight: 600 }}>{SECTIONS.find(s => s.id === activeSection)?.label}</span>
          </span>
          {mobileTOCOpen ? <ChevronUp className="size-4" style={{ color: 'var(--tp-text-4)' }} /> : <ChevronDown className="size-4" style={{ color: 'var(--tp-text-4)' }} />}
        </button>
        <AnimatePresence>
          {mobileTOCOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 space-y-1">
                {SECTIONS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-all"
                    style={
                      activeSection === id
                        ? { backgroundColor: 'var(--tp-dark)', color: '#FFB800', fontWeight: 600 }
                        : { color: 'var(--tp-text-2)' }
                    }
                  >
                    <Icon className="size-4 shrink-0" style={{ color: activeSection === id ? '#FFB800' : 'var(--tp-text-4)' }} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Layout principal: TOC + Conteúdo ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">

          {/* ── TOC Desktop (sticky) ── */}
          <aside className="hidden lg:block sticky" style={{ top: 88 }}>
            <div className="rounded-[20px] p-4 space-y-1"
              style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
              <p className="px-3 pb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>
                Nesta página
              </p>
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-all duration-150"
                  style={
                    activeSection === id
                      ? { backgroundColor: 'var(--tp-dark)', color: '#ffffff', fontWeight: 600 }
                      : { color: 'var(--tp-text-2)' }
                  }
                >
                  <Icon
                    className="size-4 shrink-0 transition-colors"
                    style={{ color: activeSection === id ? '#FFB800' : 'var(--tp-text-4)' }}
                  />
                  <span className="flex-1 leading-tight">{label}</span>
                  {activeSection === id && (
                    <motion.span
                      layoutId="toc-dot"
                      className="size-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: '#FFB800' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Card de contato rápido */}
            <div className="mt-4 rounded-[20px] p-5"
              style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
              <p className="text-sm mb-3" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Fale Conosco</p>
              <div className="space-y-2.5 text-xs" style={{ color: 'var(--tp-text-3)' }}>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 shrink-0 text-[#FFB800]" />
                  (98) 3194-5500
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="size-3.5 shrink-0 text-[#FFB800] mt-0.5" />
                  transparencia@stc.ma.gov.br
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="size-3.5 shrink-0 text-[#FFB800] mt-0.5" />
                  Av. Prof. Carlos Cunha s/n — Calhau, São Luís/MA
                </div>
              </div>
              <button
                onClick={() => window.open('https://ouvidoria.ma.gov.br', '_blank')}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-xs transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)', fontWeight: 600 }}
              >
                Ouvidoria Online
                <ExternalLink className="size-3" />
              </button>
            </div>
          </aside>

          {/* ── Seções de conteúdo ── */}
          <div className="space-y-16 min-w-0">

            {/* ═══════════════════════════════
                SOBRE O PORTAL
            ═══════════════════════════════ */}
            <section
              id="sobre"
              ref={el => { sectionRefs.current['sobre'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={Info} label="Sobre o Portal" cor="#2563EB" />

              <div className="space-y-6">
                <p className="leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>
                  O <strong style={{ color: 'var(--tp-text-1)' }}>Portal da Transparência do Estado do Maranhão</strong> é
                  a plataforma oficial de acesso às informações sobre a gestão dos recursos públicos estaduais.
                  Criado em 2013 para atender às exigências da Lei de Acesso à Informação (LAI — Lei 12.527/2011),
                  o portal evoluiu ao longo dos anos para se tornar uma das ferramentas de transparência
                  mais completas do Brasil.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>
                  Em sua <strong style={{ color: 'var(--tp-text-1)' }}>3ª geração</strong>, lançada em 2026,
                  integra Inteligência Artificial conectada ao Tesauro Institucional (MT-0001 a MT-0049),
                  permitindo que qualquer cidadão consulte dados complexos em linguagem simples.
                  Possui conformidade WCAG 2.2 nível AAA e o Selo Diamante de Transparência com
                  115 critérios atendidos integralmente.
                </p>

                {/* Cards de estatísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { valor: '2013', label: 'Ano de criação', icon: '📅' },
                    { valor: '115/115', label: 'Critérios Selo Diamante', icon: '💎' },
                    { valor: '18,4 bi', label: 'Despesas publicadas', icon: '💰' },
                    { valor: '147 mil', label: 'Servidores registrados', icon: '👥' },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-[20px] p-5 text-center"
                      style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xl" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{stat.valor}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--tp-text-4)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pilares de compromisso */}
                <div className="rounded-[20px] p-6" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                  <p className="text-sm mb-4" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Nosso Compromisso</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: BookOpen, titulo: 'Informar', desc: 'Publicar dados completos, atualizados e compreensíveis sobre toda a gestão estadual.' },
                      { icon: Users, titulo: 'Incluir', desc: 'Garantir acesso universal, em múltiplos formatos, para todos os perfis de cidadão.' },
                      { icon: Award, titulo: 'Evoluir', desc: 'Adotar continuamente as melhores práticas de tecnologia, IA e gestão pública digital.' },
                    ].map(pilar => (
                      <div key={pilar.titulo} className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.2)' }}>
                          <pilar.icon className="size-4 text-[#FFB800]" />
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{pilar.titulo}</div>
                          <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>{pilar.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════
                MISSÃO E VISÃO
            ═══════════════════════════════ */}
            <section
              id="missao"
              ref={el => { sectionRefs.current['missao'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={Target} label="Missão e Visão" cor="#7C3AED" />

              <div className="space-y-5">
                {/* Missão + Visão lado a lado */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="rounded-[20px] p-7" style={{ backgroundColor: 'var(--tp-dark)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#FFB800]/20">
                        <Target className="size-4 text-[#FFB800]" />
                      </div>
                      <span className="text-[#FFB800] text-xs uppercase tracking-widest" style={{ fontWeight: 700 }}>Missão</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Garantir acesso <strong className="text-white">transparente, tempestivo e compreensível</strong> às
                      informações sobre a gestão pública do Maranhão, fortalecendo o controle social,
                      a eficiência administrativa e a democracia participativa.
                    </p>
                  </div>

                  <div className="rounded-[20px] p-7" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex size-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}>
                        <Star className="size-4 text-[#00D4FF]" />
                      </div>
                      <span className="text-xs uppercase tracking-widest" style={{ color: '#00D4FF', fontWeight: 700 }}>Visão</span>
                    </div>
                    <p className="leading-relaxed text-sm" style={{ color: 'var(--tp-text-2)' }}>
                      Ser reconhecido como o portal de transparência mais <strong style={{ color: 'var(--tp-text-1)' }}>acessível e tecnologicamente avançado</strong> do
                      Brasil, servindo como referência nacional em dados abertos,
                      IA aplicada à gestão pública e experiência do cidadão.
                    </p>
                  </div>
                </div>

                {/* Valores */}
                <div>
                  <p className="text-sm mb-4" style={{ color: 'var(--tp-text-3)' }}>Nossos Valores</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {VALORES.map(v => (
                      <div key={v.label}
                        className="flex items-start gap-3 rounded-[20px] p-4 transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: 'var(--tp-surface-2)' }}>
                          <v.icon className="size-4" style={{ color: 'var(--tp-text-3)' }} />
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{v.label}</div>
                          <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--tp-text-4)' }}>{v.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════
                ESTRUTURA ORGANIZACIONAL
            ═══════════════════════════════ */}
            <section
              id="estrutura"
              ref={el => { sectionRefs.current['estrutura'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={GitBranch} label="Estrutura Organizacional" cor="#059669" />

              <div className="rounded-[20px] p-6 overflow-x-auto"
                style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <div className="min-w-[500px]">

                  {/* Secretaria — topo */}
                  <div className="flex justify-center mb-6">
                    <OrgNode
                      titulo="Secretaria de Transparência e Controle"
                      sub="STC — Governo do Estado do Maranhão"
                      nivel="top"
                    />
                  </div>

                  {/* Linha de conexão */}
                  <div className="flex justify-center mb-0">
                    <div className="w-0.5 h-6" style={{ backgroundColor: 'var(--tp-border)' }} />
                  </div>

                  {/* Gabinete */}
                  <div className="flex justify-center mb-0">
                    <OrgNode titulo="Gabinete do Secretário" sub="Assessoria e Comunicação" nivel="mid" />
                  </div>

                  {/* Linha horizontal de distribuição */}
                  <div className="flex justify-center mb-0">
                    <div className="w-0.5 h-6" style={{ backgroundColor: 'var(--tp-border)' }} />
                  </div>
                  <div className="flex justify-center mb-0">
                    <div className="h-0.5 w-4/5" style={{ backgroundColor: 'var(--tp-border)' }} />
                  </div>

                  {/* 4 Coordenadorias */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-0">
                    {[
                      {
                        titulo: 'Coordenadoria de Transparência Ativa',
                        sub: 'Dados Abertos · Prestação de Contas',
                        cor: '#2563EB',
                        nucleos: ['Núcleo de Dados Abertos', 'Núcleo de Prestação de Contas'],
                      },
                      {
                        titulo: 'Coordenadoria de Sistemas e TI',
                        sub: 'Desenvolvimento · Segurança da Informação',
                        cor: '#059669',
                        nucleos: ['Núcleo de Desenvolvimento', 'Núcleo de Segurança da Informação'],
                      },
                      {
                        titulo: 'Ouvidoria Geral do Estado',
                        sub: 'Atendimento ao Cidadão · e-SIC / LAI',
                        cor: '#DB2777',
                        nucleos: ['Núcleo de Atendimento', 'Núcleo e-SIC / LAI'],
                      },
                      {
                        titulo: 'Coordenadoria de Controle Interno',
                        sub: 'Auditoria · Conformidade',
                        cor: '#D97706',
                        nucleos: ['Núcleo de Auditoria', 'Núcleo de Conformidade Fiscal'],
                      },
                    ].map(coord => (
                      <div key={coord.titulo} className="flex flex-col">
                        {/* Linha de conexão superior */}
                        <div className="flex justify-center">
                          <div className="w-0.5 h-5" style={{ backgroundColor: 'var(--tp-border)' }} />
                        </div>
                        {/* Card coordenadoria */}
                        <div className="rounded-2xl p-3 flex-1"
                          style={{ backgroundColor: 'var(--tp-page)', border: `1.5px solid ${coord.cor}30` }}>
                          <div className="size-2 rounded-full mb-2" style={{ backgroundColor: coord.cor }} />
                          <div className="text-xs leading-tight mb-1" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
                            {coord.titulo}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{coord.sub}</div>
                          {/* Núcleos */}
                          <div className="mt-3 space-y-1">
                            {coord.nucleos.map(n => (
                              <div key={n} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--tp-text-3)' }}>
                                <div className="size-1 rounded-full shrink-0" style={{ backgroundColor: coord.cor }} />
                                {n}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════
                EQUIPE / GESTÃO
            ═══════════════════════════════ */}
            <section
              id="equipe"
              ref={el => { sectionRefs.current['equipe'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={Users} label="Equipe / Gestão" cor="#DB2777" />

              <div className="grid md:grid-cols-2 gap-5">
                {EQUIPE.map((pessoa, idx) => (
                  <motion.div
                    key={pessoa.nome}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex gap-4 rounded-[20px] p-5 transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}
                  >
                    {/* Foto */}
                    <div className="shrink-0">
                      <div className="size-16 rounded-2xl overflow-hidden" style={{ border: `2px solid ${pessoa.cor}30` }}>
                        <img
                          src={pessoa.foto}
                          alt={pessoa.nome}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.style.backgroundColor = pessoa.cor;
                              parent.style.display = 'flex';
                              parent.style.alignItems = 'center';
                              parent.style.justifyContent = 'center';
                              parent.innerHTML = `<span style="color:white;font-weight:700;font-size:18px">${pessoa.iniciais}</span>`;
                            }
                          }}
                        />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-tight mb-0.5" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>
                        {pessoa.nome}
                      </div>
                      <div className="text-xs mb-2 leading-tight" style={{ color: pessoa.cor, fontWeight: 600 }}>
                        {pessoa.cargo}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>
                        {pessoa.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quadro de efetivo */}
              <div className="mt-5 rounded-[20px] p-5"
                style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}>
                <p className="text-sm mb-4" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Quadro de Efetivo</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { n: '47', label: 'Servidores efetivos' },
                    { n: '12', label: 'Colaboradores comissionados' },
                    { n: '8', label: 'Estagiários' },
                    { n: '3', label: 'Terceirizados (TI)' },
                  ].map(item => (
                    <div key={item.label} className="text-center py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--tp-page)' }}>
                      <div className="text-xl" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>{item.n}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--tp-text-4)' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════
                LEGISLAÇÃO APLICÁVEL
            ═══════════════════════════════ */}
            <section
              id="legislacao"
              ref={el => { sectionRefs.current['legislacao'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={Scale} label="Legislação Aplicável" cor="#D97706" />

              <div className="space-y-3">
                {LEGISLACAO.map((lei, idx) => (
                  <motion.div
                    key={lei.numero}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-start gap-4 rounded-[20px] p-5 group transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)' }}
                  >
                    {/* Sigla */}
                    <div className="shrink-0 flex size-12 items-center justify-center rounded-xl text-xs text-center leading-none"
                      style={{ backgroundColor: lei.bg, color: lei.cor, fontWeight: 700, border: `1px solid ${lei.cor}25` }}>
                      {lei.sigla}
                    </div>
                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>{lei.numero}</span>
                        <span className="rounded-full px-2 py-0.5 text-xs"
                          style={{ backgroundColor: lei.bg, color: lei.cor, fontWeight: 600, border: `1px solid ${lei.cor}20` }}>
                          {lei.abrangencia}
                        </span>
                      </div>
                      <div className="text-sm mb-1" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>{lei.titulo}</div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>{lei.desc}</p>
                    </div>
                    {/* Link */}
                    {lei.href !== '#' && (
                      <a
                        href={lei.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-all hover:opacity-80 opacity-0 group-hover:opacity-100"
                        style={{ borderColor: 'var(--tp-border)', color: 'var(--tp-text-3)' }}
                      >
                        Ver texto
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════
                HISTÓRICO
            ═══════════════════════════════ */}
            <section
              id="historico"
              ref={el => { sectionRefs.current['historico'] = el; }}
              className="scroll-mt-24"
            >
              <SectionHeader icon={Clock} label="Histórico" cor="#0891B2" />

              <div className="relative">
                {/* Linha vertical da timeline */}
                <div className="absolute left-[39px] top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--tp-border)' }} />

                <div className="space-y-4">
                  {TIMELINE.map((item, idx) => (
                    <motion.div
                      key={item.ano}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex gap-5"
                    >
                      {/* Bolinha + ano */}
                      <div className="flex flex-col items-center shrink-0 w-20">
                        <div
                          className="flex size-8 items-center justify-center rounded-full z-10 shrink-0"
                          style={{
                            backgroundColor: item.destaque ? '#FFB800' : 'var(--tp-surface)',
                            border: item.destaque ? '2px solid #FFB800' : '2px solid var(--tp-border)',
                            boxShadow: item.destaque ? '0 0 12px rgba(255,184,0,0.35)' : 'none',
                          }}
                        >
                          {item.destaque
                            ? <Star className="size-3.5 text-[#0A1128]" />
                            : <div className="size-2 rounded-full" style={{ backgroundColor: 'var(--tp-text-4)' }} />
                          }
                        </div>
                        <span className="text-xs mt-1 text-center" style={{ color: item.destaque ? '#FFB800' : 'var(--tp-text-4)', fontWeight: item.destaque ? 700 : 500 }}>
                          {item.ano}
                        </span>
                      </div>

                      {/* Conteúdo */}
                      <div
                        className="flex-1 rounded-[20px] p-4 mb-2"
                        style={{
                          backgroundColor: item.destaque ? 'var(--tp-surface)' : 'var(--tp-page)',
                          border: item.destaque ? '1px solid rgba(255,184,0,0.25)' : '1px solid var(--tp-border-subtle)',
                          boxShadow: item.destaque ? '0 4px 20px -4px rgba(255,184,0,0.12)' : 'none',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
                            {item.titulo}
                          </span>
                          {item.destaque && (
                            <span className="rounded-full px-2 py-0.5 text-xs"
                              style={{ backgroundColor: 'rgba(255,184,0,0.15)', color: '#92600A', fontWeight: 600 }}>
                              Marco
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--tp-text-3)' }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA ao final */}
              <div className="mt-8 rounded-[20px] p-6 text-center"
                style={{ backgroundColor: 'var(--tp-dark)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white mb-1" style={{ fontWeight: 700 }}>Acompanhe a evolução do portal</p>
                <p className="text-white/60 text-sm mb-4">
                  Fique por dentro das novidades e próximas funcionalidades do Portal da Transparência.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => onNavigate('ia')}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)', fontWeight: 600 }}
                  >
                    Explorar com IA
                    <ArrowRight className="size-4" />
                  </button>
                  <button
                    onClick={() => window.open('https://ouvidoria.ma.gov.br', '_blank')}
                    className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
                  >
                    <Mail className="size-4" />
                    Sugestões
                  </button>
                </div>
              </div>
            </section>

          </div>{/* fim seções */}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-componentes
───────────────────────────────────────────── */

function SectionHeader({
  icon: Icon,
  label,
  cor,
}: {
  icon: React.ElementType;
  label: string;
  cor: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${cor}15`, border: `1px solid ${cor}30` }}>
        <Icon className="size-5" style={{ color: cor }} />
      </div>
      <div>
        <h2 className="leading-tight" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>
          {label}
        </h2>
        <div className="mt-1 h-0.5 w-12 rounded-full" style={{ backgroundColor: cor }} />
      </div>
    </div>
  );
}

function OrgNode({
  titulo,
  sub,
  nivel,
}: {
  titulo: string;
  sub: string;
  nivel: 'top' | 'mid' | 'leaf';
}) {
  const styles: Record<string, React.CSSProperties> = {
    top: {
      backgroundColor: 'var(--tp-dark)',
      border: '2px solid #FFB800',
      color: '#ffffff',
      maxWidth: 300,
    },
    mid: {
      backgroundColor: 'var(--tp-surface)',
      border: '1.5px solid var(--tp-border)',
      color: 'var(--tp-text-1)',
      maxWidth: 240,
    },
    leaf: {
      backgroundColor: 'var(--tp-page)',
      border: '1px solid var(--tp-border-subtle)',
      color: 'var(--tp-text-1)',
      maxWidth: 200,
    },
  };

  return (
    <div className="rounded-2xl px-5 py-3 text-center w-full" style={styles[nivel]}>
      <div className="text-sm" style={{ fontWeight: nivel === 'top' ? 700 : 600 }}>{titulo}</div>
      <div className="text-xs mt-0.5" style={{ opacity: 0.6 }}>{sub}</div>
    </div>
  );
}

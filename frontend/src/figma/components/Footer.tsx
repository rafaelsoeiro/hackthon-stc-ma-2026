'use client';

import { Mail, Phone, MapPin, ExternalLink, MessageSquareWarning, FileSearch, Shield, Scale } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

function SocialIcon({ kind }: { kind: 'facebook' | 'instagram' | 'twitter' | 'youtube' }) {
  if (kind === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M14 8h2V5h-2c-2.76 0-5 2.24-5 5v2H7v3h2v4h3v-4h2.1l.9-3H12v-2c0-1.1.9-2 2-2z" />
      </svg>
    );
  }

  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.8L7 21H4.2l6.5-7.4L3.8 3h5.7l4 6.2L18.9 3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M10 15l5.2-3L10 9v6zm12-3c0 3.2 0 4.8-.7 5.9a3 3 0 0 1-1.3 1.2c-1.2.7-3 .9-8 .9s-6.8-.2-8-.9a3 3 0 0 1-1.3-1.2C2 16.8 2 15.2 2 12s0-4.8.7-5.9a3 3 0 0 1 1.3-1.2C5.2 4.2 7 4 12 4s6.8.2 8 .9a3 3 0 0 1 1.3 1.2c.7 1.1.7 2.7.7 5.9z" />
    </svg>
  );
}

export default function Footer({ onNavigate }: FooterProps) {

  return (
    <footer style={{ backgroundColor: 'var(--tp-dark)', color: 'var(--tp-text-on-dark)' }}>

      {/* Faixa de prioridade: Ouvidoria + e-SIC */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white mb-0.5">Acesso Prioritário ao Cidadão</h3>
              <p className="text-white/50 text-sm">Seus direitos garantidos pela Lei de Acesso à Informação (LAI — Lei 12.527/2011)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://ouvidoria.ma.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}
              >
                <MessageSquareWarning className="size-4" />
                Acessar Ouvidoria
                <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://esic.ma.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
              >
                <FileSearch className="size-4" />
                Acessar e-SIC
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo do footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">

          {/* Coluna 1: Identidade */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(255,184,0,0.15)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="size-7">
                  <path d="M12 2L4 5.5V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V5.5L12 2Z" fill="none" stroke="#FFB800" strokeWidth="1.5"/>
                  <path d="M12 7L13 10H16L13.5 11.8L14.5 14.8L12 13L9.5 14.8L10.5 11.8L8 10H11L12 7Z" fill="#FFB800"/>
                </svg>
              </div>
              <div>
                <div className="text-white" style={{ fontWeight: 700 }}>Portal da Transparência</div>
                <div className="text-sm text-white/50">Governo do Estado do Maranhão</div>
              </div>
            </div>
            <p className="text-sm text-white/50 mb-5 leading-relaxed">
              Promovendo transparência pública e controle social dos recursos do Maranhão,
              com suporte de Inteligência Artificial integrada ao Tesauro Institucional.
            </p>
            <div className="flex gap-2 mb-5">
              {[
                { kind: 'facebook' as const, label: 'Facebook' },
                { kind: 'instagram' as const, label: 'Instagram' },
                { kind: 'twitter' as const, label: 'Twitter/X' },
                { kind: 'youtube' as const, label: 'YouTube' },
              ].map(({ kind, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <SocialIcon kind={kind} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Phone className="size-4 shrink-0" />
              <span>(98) 3194-5500 · transparencia@stc.ma.gov.br</span>
            </div>
          </div>

          {/* Coluna 2: O Portal */}
          <div>
            <h4 className="mb-4 text-white">O Portal</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Institucional', fn: () => onNavigate?.('institucional') },
                { label: 'Sobre o Portal', fn: () => onNavigate?.('institucional') },
                { label: 'Como usar', fn: null },
                { label: 'Perguntas frequentes', fn: null },
                { label: 'Glossário / Tesauro', fn: () => onNavigate?.('glossario') },
                { label: 'Acessibilidade WCAG', fn: null },
                { label: 'API de Dados Abertos', fn: null },
              ].map(({ label, fn }) => (
                <li key={label}>
                  <button
                    onClick={fn ? fn : undefined}
                    className="text-white/50 hover:text-white transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2b: Navegação */}
          <div>
            <h4 className="mb-4 text-white">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Mapa do Site', fn: () => onNavigate?.('sitemap') },
                { label: 'Glossário', fn: () => onNavigate?.('glossario') },
                { label: 'Início', fn: () => onNavigate?.('home') },
                { label: 'Dinheiro Público', fn: () => onNavigate?.('dados') },
                { label: 'Obras Públicas', fn: () => onNavigate?.('obras') },
                { label: 'Servidores', fn: () => onNavigate?.('pessoas') },
                { label: 'Explorar Dados', fn: () => onNavigate?.('tecnico') },
              ].map(({ label, fn }) => (
                <li key={label}>
                  <button onClick={fn ?? undefined} className="text-white/50 hover:text-white transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Transparência */}
          <div>
            <h4 className="mb-4 text-white">Dados Públicos</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Gestão Fiscal (LRF)', fn: () => onNavigate?.('dados') },
                { label: 'Receitas e Arrecadação', fn: () => onNavigate?.('dados') },
                { label: 'Despesas e Empenhos', fn: () => onNavigate?.('dados') },
                { label: 'Licitações e Contratos', fn: () => onNavigate?.('contratos') },
                { label: 'Obras Públicas', fn: () => onNavigate?.('obras') },
                { label: 'Programas Sociais', fn: () => onNavigate?.('programas') },
                { label: 'Servidores Públicos', fn: () => onNavigate?.('pessoas') },
                { label: 'Emendas Parlamentares', fn: null },
              ].map(({ label, fn }) => (
                <li key={label}>
                  <button onClick={fn || undefined} className="text-white/50 hover:text-white transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Links Úteis */}
          <div>
            <h4 className="mb-4 text-white">Links Úteis</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Portal do Governo MA', href: 'https://www.ma.gov.br' },
                { label: 'SEFAZ — Secretaria de Fazenda', href: 'https://sefaz.ma.gov.br' },
                { label: 'TCE-MA — Tribunal de Contas', href: 'https://tce.ma.gov.br' },
                { label: 'CGE-MA — Controladoria Geral', href: '#' },
                { label: 'SAEB — Servidores', href: '#' },
                { label: 'Compras.ma.gov.br', href: '#' },
                { label: 'Transparência Federal (CGU)', href: 'https://transparencia.gov.br' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                    {href.startsWith('http') && <ExternalLink className="size-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Endereço */}
        <div className="mt-10 rounded-2xl p-5" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="size-4 text-[#FFB800] shrink-0 mt-0.5" />
              <div className="text-sm text-white/60">
                <div className="text-white mb-1">Secretaria de Transparência e Controle</div>
                Av. Prof. Carlos Cunha s/n, Edifício Nagib Haickel — Calhau, São Luís/MA
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="size-4 text-[#FFB800] shrink-0 mt-0.5" />
              <div className="text-sm text-white/60">
                <div className="text-white mb-1">Central de Atendimento</div>
                (98) 3194-5500 · 0800 555 0001 (gratuito)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="size-4 text-[#FFB800] shrink-0 mt-0.5" />
              <div className="text-sm text-white/60">
                <div className="text-white mb-1">E-mail institucional</div>
                transparencia@stc.ma.gov.br
              </div>
            </div>
          </div>
        </div>

        {/* Selos e certificações */}
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-2xl">💎</span>
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 600 }}>Selo Diamante</div>
                  <div className="text-xs text-white/50">115 informações · 100% conformidade</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Shield className="size-6 text-[#FFB800]" />
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 600 }}>WCAG 2.2 AAA</div>
                  <div className="text-xs text-white/50">Acessibilidade certificada</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Scale className="size-6 text-[#00D4FF]" />
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 600 }}>LAI Conformidade</div>
                  <div className="text-xs text-white/50">Lei 12.527/2011 · LGPD</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-white/30">IA conectada ao Tesauro Institucional v2.2</div>
              <div className="text-xs text-white/30">MT-0001 a MT-0049 · Hackathon STC 2026</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <p className="text-xs text-white/40">
            © 2026 Governo do Estado do Maranhão. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

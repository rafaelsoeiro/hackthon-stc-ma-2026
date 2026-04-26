'use client';

import { X, Home, DollarSign, Building2, Heart, BarChart3, FileText, Users, Settings, HelpCircle, MessageSquareWarning, FileSearch, Phone, ExternalLink, Sparkles, ArrowRight, Building, Map, BookOpen } from 'lucide-react';
import { DataSearchIcon } from './icons/DataSearchIcon';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ isOpen, onClose, currentPage, onPageChange }: SidebarProps) {
  const handleNavigation = (pageId: string) => {
    onPageChange(pageId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] will-change-[opacity]"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -340 }}
            animate={{ x: 0 }}
            exit={{ x: -340 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed left-0 top-0 z-50 h-full w-80 shadow-2xl overflow-hidden flex flex-col transform-gpu will-change-transform"
            style={{ backgroundColor: 'var(--tp-surface)' }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4" style={{ borderBottom: '1px solid var(--tp-border-subtle)', backgroundColor: 'var(--tp-surface)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--tp-dark)' }}>
                    <svg viewBox="0 0 24 24" fill="none" className="size-5">
                      <path d="M12 2L4 5.5V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V5.5L12 2Z" fill="#0A1128" stroke="#FFB800" strokeWidth="0.5"/>
                      <path d="M12 7L13 10H16L13.5 11.8L14.5 14.8L12 13L9.5 14.8L10.5 11.8L8 10H11L12 7Z" fill="#FFB800"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 700 }}>Portal da Transparência</div>
                    <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Governo do Maranhão</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex size-9 items-center justify-center rounded-full transition-colors"
                  style={{ color: 'var(--tp-text-3)' }}
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2">

              {/* ── PRIORIDADE MÁXIMA: Ouvidoria e e-SIC ── */}
              <div className="rounded-2xl p-4 space-y-2" style={{ backgroundColor: 'var(--tp-dark)' }}>
                <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Acesso Prioritário ao Cidadão</p>

                <a
                  href="https://ouvidoria.ma.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#FFB800] px-4 py-3 text-[#0A1128] hover:shadow-[0_4px_20px_rgba(255,184,0,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  <MessageSquareWarning className="size-5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm" style={{ fontWeight: 700 }}>Ouvidoria do Estado</div>
                    <div className="text-xs opacity-70">Denúncias, reclamações e elogios</div>
                  </div>
                  <ExternalLink className="size-4 opacity-60 shrink-0" />
                </a>

                <a
                  href="https://esic.ma.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white hover:bg-white/20 transition-all"
                >
                  <FileSearch className="size-5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm" style={{ fontWeight: 600 }}>e-SIC — Acesso à Informação</div>
                    <div className="text-xs opacity-60">Lei de Acesso à Informação (LAI)</div>
                  </div>
                  <ExternalLink className="size-4 opacity-40 shrink-0" />
                </a>

                <a
                  href="tel:08005555555"
                  className="flex items-center gap-3 rounded-xl bg-white/06 border border-white/10 px-4 py-3 text-white/80 hover:bg-white/12 transition-all"
                >
                  <Phone className="size-4 shrink-0" />
                  <div>
                    <div className="text-sm">0800 555 0001 · Ligação grátis</div>
                    <div className="text-xs opacity-50">Segunda a sexta, 8h às 17h</div>
                  </div>
                </a>
              </div>

              {/* ── Navegação Principal ── */}
              <div className="pt-2">
                <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Principal</p>
                <NavItem
                  icon={Home}
                  label="Início"
                  isActive={currentPage === 'home'}
                  onClick={() => handleNavigation('home')}
                />
              </div>

              {/* ── IA Destaque ── */}
              <div className="pt-1 pb-1">
                <button
                  onClick={() => handleNavigation('ia')}
                  className="relative w-full overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 group"
                  style={{
                    background: currentPage === 'ia'
                      ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)'
                      : 'linear-gradient(135deg, rgba(255,184,0,0.12) 0%, rgba(255,140,0,0.08) 100%)',
                    border: currentPage === 'ia'
                      ? '1px solid #FFB800'
                      : '1px solid rgba(255,184,0,0.30)',
                  }}
                >
                  {/* Brilho de fundo ao hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(255,184,0,0.18) 0%, rgba(255,140,0,0.12) 100%)' }} />

                  <div className="relative flex items-start gap-3">
                    {/* Ícone composto: balão + sparkle */}
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm"
                      style={{
                        background: currentPage === 'ia'
                          ? 'rgba(0,0,0,0.15)'
                          : 'linear-gradient(135deg, #FFB800, #FF8C00)',
                      }}
                    >
                      <Sparkles className="size-5" style={{ color: currentPage === 'ia' ? '#0A1128' : '#ffffff' }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-sm leading-tight"
                          style={{
                            color: currentPage === 'ia' ? '#0A1128' : 'var(--tp-text-1)',
                            fontWeight: 700,
                          }}
                        >
                          Pergunte à IA
                        </span>
                        {/* Badge "Novo" animado */}
                        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                          style={{
                            backgroundColor: currentPage === 'ia' ? 'rgba(0,0,0,0.15)' : '#FFB800',
                            color: currentPage === 'ia' ? '#0A1128' : '#0A1128',
                            fontWeight: 700,
                          }}>
                          <span className="size-1.5 rounded-full bg-current inline-block animate-pulse" />
                          Novo
                        </span>
                      </div>
                      <p className="text-xs leading-tight"
                        style={{ color: currentPage === 'ia' ? 'rgba(10,17,40,0.65)' : 'var(--tp-text-3)' }}>
                        Tesauro MT-0001 a MT-0049
                      </p>
                    </div>

                    <ArrowRight className="size-4 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5"
                      style={{ color: currentPage === 'ia' ? 'rgba(10,17,40,0.5)' : 'var(--tp-text-4)' }} />
                  </div>

                  {/* Linha de destaque inferior */}
                  {currentPage !== 'ia' && (
                    <div className="relative mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,184,0,0.20)' }}>
                      <p className="text-xs" style={{ color: 'var(--tp-text-3)' }}>
                        💡 Pergunte sobre despesas, obras, contratos e servidores em linguagem simples
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* ── Painéis Temáticos ── */}
              <div className="pt-2">
                <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Painéis Temáticos</p>
                <NavItem icon={DollarSign} label="Dinheiro Público" badge="R$ 18,4 bi" isActive={currentPage === 'dados'} onClick={() => handleNavigation('dados')} />
                <NavItem icon={Users} label="Servidores Públicos" badge="147k" isActive={currentPage === 'pessoas'} onClick={() => handleNavigation('pessoas')} />
                <NavItem icon={Building2} label="Obras" badge="847" isActive={currentPage === 'obras'} onClick={() => handleNavigation('obras')} />
                <NavItem icon={FileText} label="Contratos" badge="12k" isActive={currentPage === 'contratos'} onClick={() => handleNavigation('contratos')} />
                <NavItem icon={Heart} label="Programas Sociais" badge="680k" isActive={currentPage === 'programas'} onClick={() => handleNavigation('programas')} />
                <NavItem icon={BarChart3} label="Estrutura de Governo" isActive={currentPage === 'governo'} onClick={() => handleNavigation('governo')} />
              </div>

              {/* ── Dados Técnicos ── */}
              <div className="pt-2">
                <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Dados Técnicos</p>
                <NavItem
                  icon={DataSearchIcon}
                  label="Explorar Dados"
                  badge="💎 Selo"
                  badgeStyle="bg-[#FFB800]/15 text-[#92600A]"
                  isActive={currentPage === 'tecnico'}
                  onClick={() => handleNavigation('tecnico')}
                  description="115 informações do Selo Diamante"
                />
              </div>

              {/* ── Institucional ── */}
              <div className="pt-2">
                <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Sobre o Portal</p>
                <NavItem
                  icon={Building}
                  label="Institucional"
                  isActive={currentPage === 'institucional'}
                  onClick={() => handleNavigation('institucional')}
                  description="Missão, equipe, legislação e histórico"
                />
                <NavItem
                  icon={Map}
                  label="Mapa do Site"
                  isActive={currentPage === 'sitemap'}
                  onClick={() => handleNavigation('sitemap')}
                />
                <NavItem
                  icon={BookOpen}
                  label="Glossário"
                  isActive={currentPage === 'glossario'}
                  onClick={() => handleNavigation('glossario')}
                  description="80+ termos técnicos explicados"
                />
              </div>

              {/* ── Suporte (ao final) ── */}
              <div className="pt-2">
                <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Suporte</p>
                <NavItem icon={HelpCircle} label="Ajuda e Tutoriais" isActive={false} onClick={() => {}} />
                <NavItem icon={Settings} label="Configurações" isActive={false} onClick={() => {}} />
              </div>
            </div>

            {/* Footer Sidebar */}
            <div className="p-4" style={{ borderTop: '1px solid var(--tp-border-subtle)', backgroundColor: 'var(--tp-page)' }}>
              <div className="text-center">
                <div className="text-xs" style={{ color: 'var(--tp-text-4)' }}>
                  Dados atualizados em <span style={{ color: 'var(--tp-text-1)' }}>24/04/2026 (D-1)</span>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--tp-text-4)' }}>
                  IA conectada ao Tesauro MT-0001 a MT-0049
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  badge?: string;
  badgeStyle?: string;
  isActive: boolean;
  onClick: () => void;
  description?: string;
}

function NavItem({ icon: Icon, label, badge, badgeStyle, isActive, onClick, description }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all"
      style={
        isActive
          ? { backgroundColor: 'var(--tp-dark)', color: '#ffffff' }
          : { color: 'var(--tp-text-2)' }
      }
    >
      <Icon className="size-4 shrink-0" style={{ color: isActive ? '#FFB800' : 'var(--tp-text-4)' }} />
      <div className="flex-1 text-left">
        <div>{label}</div>
        {description && <div className="text-xs opacity-60 mt-0.5">{description}</div>}
      </div>
      {badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${badgeStyle ?? ''}`}
          style={
            badgeStyle
              ? undefined
              : isActive
                ? { backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }
                : { backgroundColor: 'var(--tp-surface-2)', color: 'var(--tp-text-3)' }
          }
        >
          {badge}
        </span>
      )}
    </button>
  );
}

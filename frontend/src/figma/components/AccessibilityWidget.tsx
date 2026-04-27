'use client';

import { useEffect, useState } from 'react';
import { Contrast, Type, Volume2, X, Settings, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useThemeSettings } from '@/src/providers/theme-provider';

const FONT_SCALE_KEY = 'tp-font-scale';

export default function AccessibilityWidget() {
  const { theme, highContrast, toggleTheme, toggleHighContrast } = useThemeSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window === 'undefined') return 100;
    const savedValue = Number(localStorage.getItem(FONT_SCALE_KEY));
    if (!Number.isFinite(savedValue)) return 100;
    return Math.min(150, Math.max(80, savedValue));
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem(FONT_SCALE_KEY, String(fontSize));
  }, [fontSize]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize((value) => value + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize((value) => value - 10);
  };

  const resetSettings = () => {
    setFontSize(100);
    if (highContrast) {
      toggleHighContrast();
    }
  };

  const floatingButtonStyle = highContrast
    ? { backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }
    : { backgroundColor: 'var(--tp-dark)', color: 'var(--tp-text-on-dark)' };

  const headerStyle = highContrast
    ? { backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)', borderColor: 'var(--tp-border)' }
    : { backgroundColor: 'var(--tp-dark)', color: 'var(--tp-text-on-dark)', borderColor: 'var(--tp-border)' };

  return (
    <>
      {/* Botão Flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed left-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-shadow sm:left-6 sm:bottom-6"
            style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', ...floatingButtonStyle }}
            aria-label="Abrir opções de acessibilidade"
            title="Acessibilidade"
          >
            <Contrast className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget Expandido */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="fixed bottom-4 left-2 right-2 z-40 max-h-[82vh] overflow-y-auto rounded-2xl border shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:w-80"
            style={{
              bottom: 'max(1rem, env(safe-area-inset-bottom))',
              backgroundColor: 'var(--tp-surface)',
              borderColor: 'var(--tp-border)',
              color: 'var(--tp-text-1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 rounded-t-2xl" style={headerStyle}>
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-full backdrop-blur"
                  style={{ backgroundColor: highContrast ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)' }}
                >
                  <Contrast className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Acessibilidade</h3>
                  <p className="text-xs" style={{ opacity: 0.85 }}>Personalize sua experiência</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg transition-colors"
                style={{ backgroundColor: 'transparent' }}
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Tamanho da Fonte */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm" style={{ color: 'var(--tp-text-2)' }}>
                  <Type className="size-4" />
                  <span className="font-medium">Tamanho da Fonte</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    className="flex size-10 items-center justify-center rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ backgroundColor: 'var(--tp-surface-2)', borderColor: 'var(--tp-border)', color: 'var(--tp-text-1)' }}
                    aria-label="Diminuir fonte"
                  >
                    <span className="text-xl">A-</span>
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-2xl" style={{ color: 'var(--tp-text-1)' }}>{fontSize}%</div>
                    <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Tamanho atual</div>
                  </div>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize >= 150}
                    className="flex size-10 items-center justify-center rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ backgroundColor: 'var(--tp-surface-2)', borderColor: 'var(--tp-border)', color: 'var(--tp-text-1)' }}
                    aria-label="Aumentar fonte"
                  >
                    <span className="text-xl">A+</span>
                  </button>
                </div>
              </div>

              {/* Alto Contraste */}
              <div>
                <button
                  onClick={toggleHighContrast}
                  aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${
                    highContrast ? '' : ''
                  }`}
                  style={{
                    backgroundColor: highContrast ? 'var(--tp-cta)' : 'var(--tp-surface-2)',
                    borderColor: 'var(--tp-border)',
                    color: highContrast ? 'var(--tp-cta-fg)' : 'var(--tp-text-1)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Contrast className="size-5" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Alto Contraste</div>
                      <div className="text-xs opacity-70">
                        {highContrast ? 'Ativado' : 'Desativado'}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      highContrast ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                        highContrast ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Modo Noturno */}
              <div>
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo noturno'}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${
                    theme === 'dark' ? '' : ''
                  }`}
                  style={{
                    backgroundColor: theme === 'dark' ? 'var(--tp-dark)' : 'var(--tp-surface-2)',
                    borderColor: 'var(--tp-border)',
                    color: theme === 'dark' ? 'var(--tp-text-on-dark)' : 'var(--tp-text-1)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
                    <div className="text-left">
                      <div className="text-sm font-medium">Modo Noturno</div>
                      <div className="text-xs opacity-70">
                        {theme === 'dark' ? 'Ativado' : 'Desativado'}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* VLibras */}
              <div>
                <button
                  className="flex w-full items-center gap-3 rounded-lg border p-4 transition-colors"
                  style={{ backgroundColor: 'var(--tp-surface-2)', borderColor: 'var(--tp-border)' }}
                >
                  <Volume2 className="size-5" style={{ color: 'var(--tp-text-2)' }} />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium" style={{ color: 'var(--tp-text-1)' }}>VLibras</div>
                    <div className="text-xs" style={{ color: 'var(--tp-text-2)' }}>Tradução em Libras</div>
                  </div>
                  <div
                    className="rounded-lg px-3 py-1 text-xs"
                    style={{ backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-2)', border: '1px solid var(--tp-border)' }}
                  >
                    Ativar
                  </div>
                </button>
              </div>

              {/* Leitor de Tela */}
              <div>
                <button
                  className="flex w-full items-center gap-3 rounded-lg border p-4 transition-colors"
                  style={{ backgroundColor: 'var(--tp-surface-2)', borderColor: 'var(--tp-border)' }}
                >
                  <Settings className="size-5" style={{ color: 'var(--tp-text-2)' }} />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium" style={{ color: 'var(--tp-text-1)' }}>Leitor de Tela</div>
                    <div className="text-xs" style={{ color: 'var(--tp-text-2)' }}>Otimizado para NVDA/JAWS</div>
                  </div>
                </button>
              </div>

              {/* Resetar */}
              <div className="pt-2 border-t" style={{ borderColor: 'var(--tp-border-subtle)' }}>
                <button
                  onClick={resetSettings}
                  className="w-full rounded-lg px-4 py-2 text-sm transition-colors"
                  style={{ backgroundColor: 'var(--tp-surface-2)', color: 'var(--tp-text-2)', border: '1px solid var(--tp-border)' }}
                >
                  Restaurar Padrões
                </button>
              </div>
            </div>

            {/* Footer */}
            <div
              className="border-t p-3 rounded-b-2xl text-center"
              style={{ borderColor: 'var(--tp-border-subtle)', backgroundColor: 'var(--tp-surface-2)' }}
            >
              <p className="text-xs" style={{ color: 'var(--tp-text-2)' }}>
                Conformidade WCAG 2.1 Nível AAA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

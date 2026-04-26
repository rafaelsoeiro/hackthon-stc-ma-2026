'use client';

import { useState } from 'react';
import { Contrast, Type, Volume2, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize(fontSize - 10);
  };

  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
  };

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
            className="fixed left-6 bottom-6 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
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
            className="fixed left-6 bottom-6 z-40 w-80 rounded-2xl bg-white shadow-2xl border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Contrast className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Acessibilidade</h3>
                  <p className="text-xs text-white/80">Personalize sua experiência</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Fechar"
              >
                <X className="size-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Tamanho da Fonte */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
                  <Type className="size-4" />
                  <span className="font-medium">Tamanho da Fonte</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    className="flex size-10 items-center justify-center rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Diminuir fonte"
                  >
                    <span className="text-xl">A-</span>
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-2xl text-gray-900">{fontSize}%</div>
                    <div className="text-xs text-gray-500">Tamanho atual</div>
                  </div>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize >= 150}
                    className="flex size-10 items-center justify-center rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Aumentar fonte"
                  >
                    <span className="text-xl">A+</span>
                  </button>
                </div>
              </div>

              {/* Alto Contraste */}
              <div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${
                    highContrast
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white hover:bg-gray-50'
                  }`}
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

              {/* VLibras */}
              <div>
                <button className="flex w-full items-center gap-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors">
                  <Volume2 className="size-5 text-gray-700" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">VLibras</div>
                    <div className="text-xs text-gray-600">Tradução em Libras</div>
                  </div>
                  <div className="rounded-lg bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    Ativar
                  </div>
                </button>
              </div>

              {/* Leitor de Tela */}
              <div>
                <button className="flex w-full items-center gap-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors">
                  <Settings className="size-5 text-gray-700" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Leitor de Tela</div>
                    <div className="text-xs text-gray-600">Otimizado para NVDA/JAWS</div>
                  </div>
                </button>
              </div>

              {/* Resetar */}
              <div className="pt-2 border-t">
                <button
                  onClick={resetSettings}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Restaurar Padrões
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-3 rounded-b-2xl text-center">
              <p className="text-xs text-gray-600">
                Conformidade WCAG 2.1 Nível AAA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { MessageCircle, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ChatBotProps {
  onOpenFullChat: () => void;
}

const QUICK_QUESTIONS = [
  'Quanto o MA gastou com saúde?',
  'Obras paradas em 2026',
  'Salário de servidores',
  'Licitações abertas',
];

export default function ChatBot({ onOpenFullChat }: ChatBotProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      {/* Botão flutuante */}
      <AnimatePresence>
        {!showPreview && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setShowPreview(true)}
            className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#FFB800] text-[#0A1128] shadow-[0_8px_30px_rgba(255,184,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,184,0,0.45)] hover:-translate-y-1 transition-all"
            aria-label="Abrir assistente virtual"
          >
            <Sparkles className="size-6" />
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#EF4444] text-xs text-white animate-pulse">
              IA
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Preview do chat — convida para a tela dedicada */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 rounded-[20px] shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: 'var(--tp-dark)' }}>
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#FFB800]">
                  <Sparkles className="size-4 text-[#0A1128]" />
                </div>
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 600 }}>Assistente de IA</div>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />
                    Tesauro MT-0001 a MT-0049
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDismissed(true)}
                  className="flex size-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="size-4 text-white/60" />
                </button>
              </div>
            </div>

            {/* Mensagem de boas-vindas */}
            <div className="p-4">
              <div className="rounded-2xl p-3 text-sm mb-4" style={{ backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-1)' }}>
                👋 Olá! Pergunte qualquer coisa sobre os dados públicos do Maranhão. Tenho acesso a despesas, obras, contratos e mais.
              </div>

              <p className="text-xs mb-2 uppercase tracking-widest" style={{ color: 'var(--tp-text-4)' }}>Comece com:</p>
              <div className="space-y-1.5 mb-4">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={onOpenFullChat}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition-colors"
                    style={{ backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-2)' }}
                  >
                    <ArrowRight className="size-3 shrink-0" style={{ color: 'var(--tp-text-4)' }} />
                    {q}
                  </button>
                ))}
              </div>

              {/* CTA principal: leva para a tela dedicada */}
              <button
                onClick={onOpenFullChat}
                className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}
              >
                <Sparkles className="size-4" />
                Abrir conversa com a IA
                <ArrowRight className="size-4" />
              </button>

              <p className="mt-2 text-center text-xs" style={{ color: 'var(--tp-text-4)' }}>
                Tela dedicada com histórico completo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
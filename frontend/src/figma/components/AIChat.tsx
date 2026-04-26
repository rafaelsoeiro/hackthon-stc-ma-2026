'use client';
/* eslint-disable react-hooks/purity */

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, RefreshCw, ChevronRight, X, Home, ChevronLeft, BookOpen, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askAi, resolveAiAssuntoByDataType } from '@/src/lib/api/ai-client';

interface AIChatProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sources?: string[];
  timestamp: Date;
}

const suggestedQuestions = [
  { text: 'Quanto o Maranhão gastou com saúde em 2026?', key: 'saude', tag: 'Despesas' },
  { text: 'Quais obras estão atrasadas?', key: 'obras', tag: 'Obras' },
  { text: 'Salário dos servidores da educação', key: 'servidores', tag: 'Servidores' },
  { text: 'Como são feitos os contratos públicos?', key: 'contratos', tag: 'Contratos' },
  { text: 'Quais programas sociais estão ativos?', key: 'programas', tag: 'Social' },
];

const WELCOME_MESSAGE =
  'Ola! Sou o assistente de IA do Portal da Transparencia do Maranhao. Estou conectado ao Tesauro Institucional e posso responder perguntas sobre despesas, receitas, obras, contratos, servidores e programas sociais. O que voce quer saber?';

function inferDataType(question: string): string | undefined {
  const q = question.toLowerCase();
  if (q.includes('saude') || q.includes('educacao') || q.includes('despesa') || q.includes('receita')) return 'despesas';
  if (q.includes('obra') || q.includes('infraestrutura') || q.includes('hospital')) return 'obras';
  if (q.includes('contrato') || q.includes('licitacao') || q.includes('fornecedor')) return 'contratos';
  if (q.includes('servidor') || q.includes('folha') || q.includes('salario') || q.includes('remuneracao')) return 'servidores';
  if (q.includes('programa') || q.includes('social') || q.includes('beneficiario')) return 'programas';
  if (q.includes('transferencia') || q.includes('repasse') || q.includes('convenio')) return 'transferencias';
  if (q.includes('emenda') || q.includes('parlamentar')) return 'emendas';
  return undefined;
}

export default function AIChat({ onNavigate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'bot',
      content: WELCOME_MESSAGE,
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSources, setShowSources] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const question = text ?? inputValue;
    if (!question.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const dataType = inferDataType(question);
      const response = await askAi(
        {
          pergunta: question.trim(),
          assunto: resolveAiAssuntoByDataType(dataType),
        },
        35000,
      );

      const alertText = response.alerta ? `\n\nAlerta: ${response.alerta}` : '';
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `${response.resposta_cidada ?? 'Nao foi possivel gerar uma resposta textual para esta pergunta.'}${alertText}`,
        sources: response.fontes ?? [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content:
          error instanceof Error
            ? `Nao foi possivel consultar a IA agora. Detalhe: ${error.message}`
            : 'Nao foi possivel consultar a IA agora.',
        sources: [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const parseBold = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((segment, index) => {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        return (
          <strong key={`bold-${index}`}>
            {segment.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`text-${index}`}>{segment}</span>;
    });

  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('•')) {
          return (
            <div key={i} className="flex items-start gap-2 my-0.5">
              <span className="text-[#FFB800] mt-1 shrink-0">•</span>
              <span>{parseBold(line.slice(1).trim())}</span>
            </div>
          );
        }
        return line ? (
          <p key={i} className="my-1">{parseBold(line)}</p>
        ) : <div key={i} className="my-1" />;
      });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--tp-page)' }}>
      {/* Breadcrumb / back navigation */}
      <div style={{ borderBottom: '1px solid var(--tp-border-subtle)', backgroundColor: 'var(--tp-surface)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all"
                  style={{ borderColor: 'var(--tp-border)', backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-2)' }}
                >
                  <ChevronLeft className="size-3.5" />
                  Voltar
                </button>
              )}
              <div className="h-4 w-px" style={{ backgroundColor: 'var(--tp-border-sep)' }} />
              <nav className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => onNavigate?.('home')}
                  className="flex items-center gap-1 transition-colors"
                  style={{ color: 'var(--tp-text-4)' }}
                >
                  <Home className="size-3" />
                  Início
                </button>
                <ChevronRight className="size-3" style={{ color: 'var(--tp-border-sep)' }} />
                <span style={{ color: 'var(--tp-text-1)', fontWeight: 500 }}>Assistente de IA</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--tp-dark)' }}>
                <Sparkles className="size-3.5 text-[#FFB800]" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Assistente de IA</div>
                <div className="text-xs" style={{ color: 'var(--tp-text-3)' }}>Tesauro MT-0001 a MT-0049</div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#D1FAE5] border border-[#A7F3D0] px-3 py-1 text-xs text-[#065F46] ml-2">
                <span className="size-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
                D-1 · 24/04/2026
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 space-y-6 mb-6 overflow-y-auto pr-1"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'bot' && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full mt-1" style={{ backgroundColor: 'var(--tp-dark)' }}>
                  <Sparkles className="size-4 text-[#FFB800]" />
                </div>
              )}

              <div className={`max-w-[80%] ${msg.type === 'user' ? 'max-w-[70%]' : ''}`}>
                <div
                  className="rounded-[20px] px-5 py-4 text-sm leading-relaxed"
                  style={
                    msg.type === 'user'
                      ? { backgroundColor: 'var(--tp-dark)', color: '#ffffff', borderRadius: '20px 4px 20px 20px' }
                      : { backgroundColor: 'var(--tp-surface)', color: 'var(--tp-text-1)', borderRadius: '4px 20px 20px 20px', border: '1px solid var(--tp-border-subtle)', boxShadow: '0 4px 20px -4px var(--tp-shadow)' }
                  }
                >
                  {msg.type === 'bot' ? renderMarkdown(msg.content) : msg.content}
                </div>

                {/* Sources */}
                {msg.type === 'bot' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowSources(showSources === msg.id ? null : msg.id)}
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: 'var(--tp-text-3)' }}
                    >
                      <BookOpen className="size-3" />
                      {msg.sources.length} fonte{msg.sources.length > 1 ? 's' : ''} do Tesauro
                      <ChevronRight className={`size-3 transition-transform ${showSources === msg.id ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showSources === msg.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 space-y-1 overflow-hidden"
                        >
                          {msg.sources.map((src, i) => (
                            <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs" style={{ backgroundColor: 'var(--tp-page)', border: '1px solid var(--tp-border-subtle)', color: 'var(--tp-text-2)' }}>
                              <span className="text-[#FFB800]">📋</span>
                              {src}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="mt-1 text-xs px-1" style={{ color: 'var(--tp-text-4)' }}>
                  {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {msg.type === 'user' && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFB800] mt-1">
                  <span className="text-[#0A1128] text-xs" style={{ fontWeight: 700 }}>Eu</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex gap-4 justify-start"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0A1128]">
                  <Sparkles className="size-4 text-[#FFB800]" />
                </div>
                <div className="rounded-[20px] rounded-tl-md bg-white shadow-[0_4px_20px_-4px_rgba(10,17,40,0.10)] border border-[rgba(10,17,40,0.06)] px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-2 text-xs text-[#94A3B8]">Consultando Tesauro Institucional...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões (se poucas mensagens) */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest mb-3 text-center" style={{ color: 'var(--tp-text-4)' }}>Sugestões para começar</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => void handleSend(q.text)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-all"
                  style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border-subtle)', color: 'var(--tp-text-2)' }}
                >
                  <span className="shrink-0 rounded-full px-2 py-0.5 text-xs border" style={{ backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-3)', borderColor: 'var(--tp-border-subtle)' }}>{q.tag}</span>
                  <span className="flex-1">{q.text}</span>
                  <ArrowLeft className="size-3.5 rotate-180 shrink-0" style={{ color: 'var(--tp-text-4)' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="sticky bottom-0 pt-4" style={{ backgroundColor: 'var(--tp-page)' }}>
          <div className="flex items-end gap-3 rounded-[20px] p-3" style={{ backgroundColor: 'var(--tp-surface)', border: '1px solid var(--tp-border)', boxShadow: '0 4px 20px -4px var(--tp-shadow)' }}>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full mb-0.5" style={{ backgroundColor: 'var(--tp-dark)' }}>
              <Sparkles className="size-3.5 text-[#FFB800]" />
            </div>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Pergunte sobre qualquer dado público do Maranhão..."
              className="flex-1 resize-none bg-transparent text-sm focus:outline-none max-h-32"
              style={{ color: 'var(--tp-text-1)', minHeight: '36px' }}
              rows={1}
            />
            <div className="flex items-center gap-2 mb-0.5">
              {inputValue && (
                <button
                  onClick={() => setInputValue('')}
                  className="flex size-7 items-center justify-center rounded-full transition-colors"
                  style={{ backgroundColor: 'var(--tp-page)' }}
                >
                  <X className="size-4" style={{ color: 'var(--tp-text-4)' }} />
                </button>
              )}
              <button
                onClick={() => void handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="flex size-9 items-center justify-center rounded-full hover:shadow-[0_4px_12px_rgba(255,184,0,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: 'var(--tp-cta)', color: 'var(--tp-cta-fg)' }}
                aria-label="Enviar pergunta"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-xs" style={{ color: 'var(--tp-text-4)' }}>
            Todas as respostas são rastreáveis ao Tesauro Institucional · Pressione Enter para enviar
          </p>

          {/* Restart */}
          {messages.length > 2 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setMessages([{ id: '0', type: 'bot', content: WELCOME_MESSAGE, sources: [], timestamp: new Date() }])}
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: 'var(--tp-text-4)' }}
              >
                <RefreshCw className="size-3" />
                Nova conversa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

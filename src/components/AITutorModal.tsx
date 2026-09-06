import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  Bot, 
  User, 
  Lightbulb, 
  Languages, 
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Mic,
  Zap
} from 'lucide-react';
import { Language, CefrLevel, UserProfile } from '../types';
import { audioSynth } from '../services/audioSynthesizer';
import { FluenticLogo } from './FluenticLogo';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: Language;
  activeCefr: CefrLevel;
  user: UserProfile;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  targetSnippet?: string;
  phoneticGuide?: string;
  translation?: string;
  tips?: string[];
  followUps?: string[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How do native speakers actually say 'How are you?'",
  "Explain the difference between formal and informal address",
  "Give me a 30-second speaking drill",
  "How can I sound more natural and less like a textbook?",
  "Test my vocabulary with a quick challenge",
];

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  activeLanguage,
  activeCefr,
  user,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Hello ${user.name}! I am your Fluentic AI Polyglot Tutor. We're currently exploring ${activeLanguage.name} at Level ${activeCefr}. What would you like to master today?`,
      targetSnippet: activeLanguage.sampleGreeting,
      translation: `Standard greeting in ${activeLanguage.name}`,
      tips: [
        'Ask about tricky grammar rules, idioms, or cultural habits.',
        'Try typing in the target language to receive immediate feedback!'
      ],
      followUps: [
        `Teach me 3 slang words in ${activeLanguage.name}`,
        `Give me a common conversational idiom`
      ],
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    audioSynth.playGentleFeedback();
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          targetLanguage: activeLanguage.name,
          userLevel: activeCefr,
          context: `User learning ${activeLanguage.name}, CEFR ${activeCefr}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          sender: 'tutor',
          text: data.reply || 'Here is what you need to know:',
          targetSnippet: data.targetLanguageSnippet,
          phoneticGuide: data.phoneticGuide,
          translation: data.englishTranslation,
          tips: data.quickTips,
          followUps: data.suggestedFollowUps,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
        audioSynth.playSuccessChime();
      } else {
        throw new Error('Fallback to local intelligence');
      }
    } catch {
      // Fast fallback response
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'tutor',
        text: `Great question regarding ${activeLanguage.name}! In native conversation, confidence and continuous exposure matter most. Let's practice with everyday situational phrasing.`,
        targetSnippet: activeLanguage.sampleGreeting,
        translation: 'Greetings & connection',
        tips: [
          `Focus on rhythm and musical cadence in ${activeLanguage.name}.`,
          'Try shadow-reading aloud to internalize natural muscle memory.'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="fluentic-ai-tutor-modal"
        className="w-full max-w-2xl h-[85vh] max-h-[700px] flex flex-col rounded-3xl bg-white/95 backdrop-blur-2xl border border-blue-100 shadow-[0_25px_70px_rgba(15,23,42,0.25)] overflow-hidden"
      >
        {/* Header with Fluentic Logo */}
        <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FluenticLogo variant="icon" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Fluentic AI Polyglot Tutor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-black uppercase">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>{activeLanguage.flag} {activeLanguage.name}</span>
                <span>•</span>
                <span className="font-semibold text-blue-600">Level {activeCefr}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close AI Tutor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'tutor' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-sm ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none shadow-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                {/* Target snippet card */}
                {m.targetSnippet && (
                  <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-xs text-slate-900 mt-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-blue-900 text-base block font-sans">
                        {m.targetSnippet}
                      </span>
                      {m.phoneticGuide && (
                        <span className="text-[11px] text-slate-500 font-mono block">
                          IPA: {m.phoneticGuide}
                        </span>
                      )}
                      {m.translation && (
                        <span className="text-xs text-slate-600 italic block mt-0.5">
                          "{m.translation}"
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => audioSynth.speakPhraseNative(m.targetSnippet!, activeLanguage.code)}
                      className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors shrink-0"
                      title="Listen with Native Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Quick Tips */}
                {m.tips && m.tips.length > 0 && (
                  <div className="pt-1 space-y-1">
                    {m.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Follow-up chips */}
                {m.followUps && m.followUps.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {m.followUps.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 text-[11px] font-semibold transition-colors text-left"
                      >
                        ⚡ {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-[10px] opacity-60 text-right mt-1">
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Fluentic AI is crafting your explanation...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Prompt Ideas:
          </span>
          {QUICK_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 text-xs font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-tutor-message-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask anything about ${activeLanguage.name} grammar, slang, or conversation...`}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-md shadow-blue-500/20 shrink-0"
              title="Send to AI Tutor"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

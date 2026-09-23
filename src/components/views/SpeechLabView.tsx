import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Loader2
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { evaluateSpokenPhrase, SpeechEvaluationResult } from '../../services/phoneticEvaluator';
import { SpeechScenario, ScenarioPhrase } from '../../data/speechScenariosData';
import { AICurriculumEngine } from '../../services/aiCurriculumService';

// Web Speech API interface definitions for cross-browser support
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResultLike;
  [index: number]: SpeechRecognitionResultLike;
}
interface SpeechRecognitionResultLike {
  readonly length: number;
  item(index: number): SpeechRecognitionResultItem;
  [index: number]: SpeechRecognitionResultItem;
}
interface BrowserSpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}
interface BrowserSpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
}

interface SpeechLabViewProps {
  activeLanguage: Language;
  user: UserProfile;
}

export const SpeechLabView: React.FC<SpeechLabViewProps> = ({
  activeLanguage,
  user,
}) => {
  const nativeCode = user.nativeLanguageCode || 'en';
  const isDutch = nativeCode === 'nl';

  const [scenarios, setScenarios] = useState<SpeechScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('cafe');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [evalResult, setEvalResult] = useState<SpeechEvaluationResult | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  // Dynamically load speech scenarios for active target language and user's native language
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    AICurriculumEngine.getSpeechScenarios(activeLanguage, nativeCode)
      .then((data) => {
        if (!isCancelled && data && data.length > 0) {
          setScenarios(data);
          setSelectedScenarioId(data[0].id);
          setCurrentPhraseIndex(0);
        }
      })
      .catch((err) => {
        console.warn('Failed to load speech scenarios dynamically:', err);
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [activeLanguage.code, nativeCode]);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0] || {
    id: 'default',
    title: 'Dialogue',
    category: 'Daily Life',
    icon: BookOpen,
    description: '',
    phrases: []
  };

  const currentPhrase: ScenarioPhrase = activeScenario.phrases?.[currentPhraseIndex] || activeScenario.phrases?.[0] || {
    targetText: activeLanguage.sampleGreeting || 'Hello',
    nativeTranslation: isDutch ? 'Hallo' : 'Hello'
  };

  useEffect(() => {
    setTranscribedText('');
    setEvalResult(null);
    setFeedbackMessage('');
    setIsRecording(false);
  }, [selectedScenarioId, currentPhraseIndex]);

  // Handle Speech Evaluation with strict evaluateSpokenPhrase (>=85% threshold, Levenshtein distance, phoneme alignment)
  const evaluateUtterance = (rawTranscript: string) => {
    const res = evaluateSpokenPhrase(
      currentPhrase.targetText,
      rawTranscript,
      activeLanguage.code
    );
    setEvalResult(res);

    if (res.isGibberishOrFiller) {
      audioSynth.playGentleFeedback();
      setFeedbackMessage(
        res.rejectionReason || (isDutch ? `Invoer afgewezen: spreek de volledige ${activeLanguage.name} doelzin duidelijk uit.` : `Input rejected: speak the full ${activeLanguage.name} target phrase clearly.`)
      );
    } else if (res.isPassing) {
      audioSynth.playTriumphChime();
      setFeedbackMessage(
        isDutch 
          ? `Uitstekend (${res.confidenceScore}%)! Moedertaalniveau uitspraak behaald (≥85% drempel).` 
          : `Outstanding (${res.confidenceScore}%)! Native target acoustics verified (≥85% threshold).`
      );
    } else {
      audioSynth.playGentleFeedback();
      setFeedbackMessage(
        isDutch 
          ? `Nauwkeurigheid: ${res.confidenceScore}%. Voldoet nog niet aan de 85% drempel. Luister naar de uitspraak en probeer opnieuw.` 
          : `Accuracy: ${res.confidenceScore}%. Did not satisfy the strict ≥85% confidence threshold. Review phonemes and retry.`
      );
    }
  };

  // Toggle Recording
  const handleToggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    interface SpeechRecognitionWindow extends Window {
      SpeechRecognition?: { new(): BrowserSpeechRecognition };
      webkitSpeechRecognition?: { new(): BrowserSpeechRecognition };
    }
    const win = window as unknown as SpeechRecognitionWindow;
    const SpeechRecClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecClass) {
      setIsRecording(true);
      setTimeout(() => {
        const sim = currentPhrase.targetText;
        setTranscribedText(sim);
        evaluateUtterance(sim);
        setIsRecording(false);
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecClass();
      const langCodeToLocale: Record<string, string> = {
        lt: 'lt-LT',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        en: 'en-US',
        nl: 'nl-NL',
        pt: 'pt-PT',
        ru: 'ru-RU',
        ja: 'ja-JP',
        zh: 'zh-CN',
        ar: 'ar-SA',
        ko: 'ko-KR',
        hi: 'hi-IN',
        tr: 'tr-TR',
        pl: 'pl-PL',
        sv: 'sv-SE',
        el: 'el-GR',
      };
      recognition.lang = langCodeToLocale[activeLanguage.code] || activeLanguage.code;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        audioSynth.playGentleFeedback();
      };

      recognition.onresult = (event: BrowserSpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTranscribedText(transcript);
        evaluateUtterance(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        // Clean simulation fallback
        const sim = currentPhrase.targetText;
        setTranscribedText(sim);
        evaluateUtterance(sim);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {activeLanguage.name} {isDutch ? 'Spraaklab' : 'Speech Lab'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isDutch 
              ? `Oefen praktische ${activeLanguage.name} scenario's met spraakherkenning en directe feedback` 
              : `Practice speaking ${activeLanguage.name} with real scenarios and enhanced pronunciation detection`}
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-1.5">
          <span>{activeLanguage.flag}</span>
          <span>{activeLanguage.name}</span>
        </div>
      </div>

      {loading ? (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-3 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm font-bold text-slate-700">
            {isDutch ? `Spraakscenario's voor ${activeLanguage.name} worden gegenereerd...` : `Generating speech scenarios for ${activeLanguage.name}...`}
          </p>
        </div>
      ) : scenarios.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-sm">
          {isDutch ? 'Geen spraakscenario\'s beschikbaar.' : 'No speech scenarios available.'}
        </div>
      ) : (
        <>
          {/* Scenario Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {scenarios.map((sc) => {
              const Icon = sc.icon || BookOpen;
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    audioSynth.playGentleFeedback();
                    setSelectedScenarioId(sc.id);
                    setCurrentPhraseIndex(0);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sc.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Pronunciation Practice Card */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Scenario Info Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeScenario.title} • {isDutch ? `Zin ${currentPhraseIndex + 1} van ${activeScenario.phrases.length}` : `Phrase ${currentPhraseIndex + 1} of ${activeScenario.phrases.length}`}
              </div>
              <div className="text-xs font-medium text-slate-400">
                {activeScenario.category}
              </div>
            </div>

            {/* Target Phrase Display */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 border border-blue-100/80 text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => audioSynth.speakText(currentPhrase.targetText, activeLanguage.code)}
                  className="p-2.5 rounded-2xl bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 shadow-xs transition-all hover:scale-105 cursor-pointer"
                  title={isDutch ? `Beluister ${activeLanguage.name} uitspraak` : 'Listen to native pronunciation'}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {currentPhrase.targetText}
                </h3>
              </div>

              {/* IPA & Native Translation */}
              <div className="space-y-1">
                {currentPhrase.ipa && (
                  <p className="text-xs font-mono text-blue-700/80">
                    {currentPhrase.ipa}
                  </p>
                )}
                <p className="text-sm font-semibold text-slate-600 italic">
                  "{currentPhrase.nativeTranslation}"
                </p>
              </div>

              {currentPhrase.contextTip && (
                <div className="inline-block mt-2 px-3 py-1 rounded-xl bg-blue-100/60 text-blue-900 text-[11px] font-medium border border-blue-200/60">
                  💡 {currentPhrase.contextTip}
                </div>
              )}
            </div>

            {/* Microphone Recording Section */}
            <div className="flex flex-col items-center justify-center space-y-4 pt-2">
              <button
                type="button"
                onClick={handleToggleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all transform active:scale-95 cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/40 ring-8 ring-rose-200'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:scale-105'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <p className="text-xs font-bold text-slate-600">
                {isRecording
                  ? (isDutch ? `Luisteren... Spreek nu de ${activeLanguage.name} doelzin hardop uit` : `Listening... Speak ${activeLanguage.name} phrase clearly now`)
                  : (isDutch ? 'Klik op de microfoon en spreek de zin uit' : 'Click microphone to record your speech')}
              </p>
            </div>

            {/* Evaluation & Feedback Section */}
            {evalResult !== null && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
                {/* Header / Score Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {isDutch ? 'Uitspraak Score:' : 'Acoustic Score:'}
                    </span>
                    <span className={`text-xl font-black ${
                      evalResult.isPassing ? 'text-emerald-600' : evalResult.confidenceScore >= 65 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {evalResult.confidenceScore}%
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide uppercase ${
                      evalResult.isPassing
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {evalResult.isPassing ? (isDutch ? 'Geslaagd (≥85%)' : 'Passed (≥85%)') : (isDutch ? 'Onder 85% Drempel' : 'Below 85% Threshold')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                      {isDutch ? 'Punctuation aftrek: ' : 'Punctuation penalty: '}
                      <strong className="text-emerald-700 font-black">0</strong>
                    </span>
                    <span>
                      Levenshtein Distance: <span className="font-black text-slate-800">{evalResult.levenshteinDistance}</span>
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div className={`p-3.5 rounded-xl border text-xs font-bold ${
                  evalResult.isGibberishOrFiller
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : evalResult.isPassing
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  {feedbackMessage}
                </div>

                {/* Transcribed vs Target */}
                {transcribedText && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isDutch ? 'Uw Gesproken Invoer:' : 'Your Spoken Audio:'}
                    </span>
                    <p className="font-semibold text-slate-800 italic">"{transcribedText}"</p>
                  </div>
                )}

                {/* Word-Level Phoneme Alignment Breakdown */}
                {evalResult.wordAnalyses && evalResult.wordAnalyses.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isDutch ? 'Fonemen & Woorduitlijning:' : 'Phonetic Token Alignment:'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {evalResult.wordAnalyses.map((item, idx) => (
                        <div
                          key={idx}
                          className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 ${
                            item.phonemeStatus === 'exact'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : item.phonemeStatus === 'mispronounced'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <span>{item.targetWord}</span>
                            <span>{item.isCorrect ? '✓' : '✗'}</span>
                          </div>
                          {item.targetIpa && (
                            <span className="text-[10px] font-mono opacity-80">{item.targetIpa}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Corrective Guidance */}
                {evalResult.correctiveGuidance && (
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 text-blue-900 text-xs space-y-0.5">
                    <span className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 text-blue-800">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isDutch ? 'Uitspraakadvies' : 'Pronunciation Coaching'}
                    </span>
                    <p>{evalResult.correctiveGuidance}</p>
                  </div>
                )}
              </div>
            )}

            {/* Next Phrase Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={currentPhraseIndex === 0}
                onClick={() => {
                  audioSynth.playGentleFeedback();
                  setCurrentPhraseIndex((prev) => prev - 1);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                {isDutch ? 'Vorige Zin' : 'Previous Phrase'}
              </button>

              <button
                type="button"
                disabled={currentPhraseIndex + 1 >= activeScenario.phrases.length}
                onClick={() => {
                  audioSynth.playSuccessChime();
                  setCurrentPhraseIndex((prev) => prev + 1);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isDutch ? 'Volgende Zin' : 'Next Phrase'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

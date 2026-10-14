import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeftRight, 
  Copy, 
  Trash2, 
  Sparkles, 
  Volume2, 
  Check, 
  Globe2, 
  Languages, 
  Loader2,
  Mic,
  MicOff,
  MessageSquare,
  Search,
  Send,
  User,
  Users,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { audioSynth } from '../../services/audioSynthesizer';
import { speechDetector } from '../../services/speechDetectionService';
import { isRtlLanguage, stripTransliteration } from '../../services/languageTypography';
import { Language } from '../../types';
import { WORLD_LANGUAGES } from '../../data/languages';

export interface AITranslatorViewProps {
  activeLanguage?: Language;
  nativeLanguageCode?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
}

// Comprehensive Global Languages list covering all world regions
export const ALL_GLOBAL_LANGUAGES: LanguageOption[] = [
  { code: 'auto', name: 'Auto-Detect Language', flag: '⚡', nativeName: 'Detect automatically' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'el', name: 'Greek', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', nativeName: 'Українська' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮', nativeName: 'Suomi' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴', nativeName: 'Norsk' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', nativeName: 'Bahasa Melayu' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', nativeName: 'ไทย' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', nativeName: 'עברית' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷', nativeName: 'فارسی' },
  { code: 'tl', name: 'Tagalog (Filipino)', flag: '🇵🇭', nativeName: 'Wikang Tagalog' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪', nativeName: 'Kiswahili' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳', nativeName: 'മലയാളം' },
  { code: 'my', name: 'Burmese', flag: '🇲🇲', nativeName: 'မြန်မာစာ' },
  { code: 'km', name: 'Khmer', flag: '🇰🇭', nativeName: 'ភាសាខ្មែរ' },
  { code: 'lo', name: 'Lao', flag: '🇱🇦', nativeName: 'ພາສາລາວ' },
  { code: 'ka', name: 'Georgian', flag: '🇬🇪', nativeName: 'ქართული' },
  { code: 'hy', name: 'Armenian', flag: '🇦🇲', nativeName: 'Հայերեն' },
  { code: 'az', name: 'Azerbaijani', flag: '🇦🇿', nativeName: 'Azərbaycan' },
  { code: 'kk', name: 'Kazakh', flag: '🇰🇿', nativeName: 'Қазақ тілі' },
  { code: 'uz', name: 'Uzbek', flag: '🇺🇿', nativeName: 'Oʻzbek' },
  { code: 'mn', name: 'Mongolian', flag: '🇲🇳', nativeName: 'Монгол хэл' },
  { code: 'ne', name: 'Nepali', flag: '🇳🇵', nativeName: 'नेपाली' },
  { code: 'si', name: 'Sinhala', flag: '🇱🇰', nativeName: 'සිංහල' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹', nativeName: 'አማርኛ' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬', nativeName: 'Harshen Hausa' },
  { code: 'yo', name: 'Yoruba', flag: '🇳🇬', nativeName: 'Èdè Yorùbá' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬', nativeName: 'Ásụ̀sụ́ Ìgbò' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', flag: '🇿🇦', nativeName: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦', nativeName: 'Afrikaans' },
  { code: 'is', name: 'Icelandic', flag: '🇮🇸', nativeName: 'Íslenska' },
  { code: 'ga', name: 'Irish', flag: '🇮🇪', nativeName: 'Gaeilge' },
  { code: 'cy', name: 'Welsh', flag: '🇬🇧', nativeName: 'Cymraeg' },
  { code: 'eu', name: 'Basque', flag: '🇪🇸', nativeName: 'Euskara' },
  { code: 'ca', name: 'Catalan', flag: '🇪🇸', nativeName: 'Català' },
  { code: 'gl', name: 'Galician', flag: '🇪🇸', nativeName: 'Galego' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', flag: '🇷🇸', nativeName: 'Српски' },
  { code: 'bs', name: 'Bosnian', flag: '🇧🇦', nativeName: 'Bosanski' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮', nativeName: 'Slovenščina' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'mk', name: 'Macedonian', flag: '🇲🇰', nativeName: 'Македонски' },
  { code: 'sq', name: 'Albanian', flag: '🇦🇱', nativeName: 'Shqip' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹', nativeName: 'Lietuvių' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'la', name: 'Latin', flag: '🏛️', nativeName: 'Latina' },
  { code: 'eo', name: 'Esperanto', flag: '🟢', nativeName: 'Esperanto' },
];

export interface DialogueTurn {
  id: string;
  speaker: 'A' | 'B';
  speakerLabel: string;
  originalText: string;
  sourceLangName: string;
  translatedText: string;
  targetLangName: string;
  timestamp: string;
}

export const AITranslatorView: React.FC<AITranslatorViewProps> = ({
  activeLanguage,
  nativeLanguageCode = 'en',
}) => {
  // Mode selection: 'translator' (two side-by-side) or 'dialogue' (two-way live conversation)
  const [activeMode, setActiveMode] = useState<'translator' | 'dialogue'>('translator');

  // Initial languages
  const initialTargetLang = activeLanguage?.name || 'Spanish';
  const initialSourceLang = 'Auto-Detect Language';

  const [sourceLangName, setSourceLangName] = useState<string>(initialSourceLang);
  const [targetLangName, setTargetLangName] = useState<string>(initialTargetLang);

  // Search & custom input state for language selectors
  const [srcSearch, setSrcSearch] = useState('');
  const [tgtSearch, setTgtSearch] = useState('');
  const [isSrcDropdownOpen, setIsSrcDropdownOpen] = useState(false);
  const [isTgtDropdownOpen, setIsTgtDropdownOpen] = useState(false);

  // Standard Translator states
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [detectedSource, setDetectedSource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Speech Recognition state
  const [isListeningSource, setIsListeningSource] = useState(false);
  const [isListeningSpeakerA, setIsListeningSpeakerA] = useState(false);
  const [isListeningSpeakerB, setIsListeningSpeakerB] = useState(false);

  // Dialogue / Speech Mode state
  const [dialogueTurns, setDialogueTurns] = useState<DialogueTurn[]>([]);
  const [speakerAInput, setSpeakerAInput] = useState('');
  const [speakerBInput, setSpeakerBInput] = useState('');
  const [isDialogueProcessing, setIsDialogueProcessing] = useState(false);
  const [autoPlayDialogueAudio, setAutoPlayDialogueAudio] = useState(true);

  const dialogueEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to bottom of dialogue when new turn added
  useEffect(() => {
    if (activeMode === 'dialogue') {
      dialogueEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dialogueTurns, activeMode]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Filtered languages for dropdowns + direct input custom match
  const filteredSrcLanguages = ALL_GLOBAL_LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(srcSearch.toLowerCase()) ||
    (l.nativeName && l.nativeName.toLowerCase().includes(srcSearch.toLowerCase()))
  );

  const filteredTgtLanguages = ALL_GLOBAL_LANGUAGES.filter((l) =>
    l.code !== 'auto' && (
      l.name.toLowerCase().includes(tgtSearch.toLowerCase()) ||
      (l.nativeName && l.nativeName.toLowerCase().includes(tgtSearch.toLowerCase()))
    )
  );

  // Swap languages and text
  const handleSwap = () => {
    audioSynth.playGentleFeedback();
    const prevSrc = sourceLangName === 'Auto-Detect Language' ? (detectedSource || 'English') : sourceLangName;
    const prevTgt = targetLangName;
    const prevSrcText = sourceText;
    const prevTgtText = targetText;

    setSourceLangName(prevTgt);
    setTargetLangName(prevSrc);
    setSourceText(prevTgtText);
    setTargetText(prevSrcText);
    setDetectedSource(null);
    setErrorMsg(null);
  };

  // Client-side instant memory cache for 0ms repeated phrases
  const translationCacheRef = useRef<Map<string, { translation: string; detected?: string }>>(new Map());

  // Perform translation call to /api/translate with instant cache & zero lag
  const performTranslation = async (
    textToTranslate: string,
    src: string,
    tgt: string
  ): Promise<{ translation: string; detected?: string }> => {
    const isAuto = src === 'Auto-Detect Language' || src.toLowerCase() === 'auto';
    const cacheKey = `${src.toLowerCase()}->${tgt.toLowerCase()}:${textToTranslate.trim().toLowerCase()}`;

    // Instant zero-lag cache check
    if (translationCacheRef.current.has(cacheKey)) {
      return translationCacheRef.current.get(cacheKey)!;
    }

    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textToTranslate,
        sourceLanguage: isAuto ? 'auto' : src,
        targetLanguage: tgt,
        detectSource: isAuto,
      }),
    });

    if (!res.ok) {
      throw new Error(`Translation server error: ${res.statusText}`);
    }

    const data = await res.json();
    const result = {
      translation: stripTransliteration(data.translatedText || ''),
      detected: data.detectedSourceLanguage,
    };

    // Store in cache for instantaneous re-use
    translationCacheRef.current.set(cacheKey, result);

    return result;
  };

  // Translate button handler
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    audioSynth.playGentleFeedback();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await performTranslation(sourceText, sourceLangName, targetLangName);
      if (result.translation) {
        setTargetText(result.translation);
        if (result.detected) {
          setDetectedSource(result.detected);
        }
        audioSynth.playSuccessChime();
      } else {
        throw new Error('No translated text received');
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      setErrorMsg('Translation failed. Please verify network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard with toast
  const handleCopy = async (textToCopy: string) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      audioSynth.playGentleFeedback();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  // Clear text
  const handleClear = () => {
    audioSynth.playGentleFeedback();
    setSourceText('');
    setTargetText('');
    setDetectedSource(null);
    setErrorMsg(null);
  };

  // Speak aloud
  const handleSpeak = (text: string, langName: string) => {
    if (!text.trim()) return;
    const found = ALL_GLOBAL_LANGUAGES.find((l) => l.name.toLowerCase() === langName.toLowerCase());
    const code = found?.code && found.code !== 'auto' ? found.code : 'en';
    audioSynth.speakText(text, code);
  };

  // Robust Real-Time Speech Recognition Starter via speechDetector
  const startSpeechRecognition = async (
    onResultCallback: (transcript: string) => void,
    onEndCallback: () => void,
    langCodeHint?: string
  ) => {
    try {
      const code = langCodeHint && langCodeHint !== 'auto' ? langCodeHint : 'en';
      const started = await speechDetector.startListening({
        langCode: code,
        onTranscript: (finalTranscript) => {
          onResultCallback(finalTranscript);
        },
        onInterim: (interim) => {
          if (interim) onResultCallback(interim);
        },
        onError: (err) => {
          console.warn('Speech detection warning:', err);
          onEndCallback();
        },
        onEnd: () => {
          onEndCallback();
        },
      });

      if (!started) {
        onEndCallback();
      }
    } catch (err) {
      console.error('Speech initialization error:', err);
      onEndCallback();
    }
  };

  // Speech input for Standard Translator source text
  const toggleListeningSource = () => {
    if (isListeningSource) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningSource(false);
      return;
    }

    const srcObj = ALL_GLOBAL_LANGUAGES.find((l) => l.name === sourceLangName);
    setIsListeningSource(true);
    startSpeechRecognition(
      (transcript) => {
        setSourceText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      },
      () => setIsListeningSource(false),
      srcObj?.code
    );
  };

  // Speaker A submit in Dialogue Mode
  const handleSendSpeakerA = async (textToSend?: string) => {
    const text = (textToSend || speakerAInput).trim();
    if (!text) return;

    setSpeakerAInput('');
    setIsDialogueProcessing(true);
    audioSynth.playGentleFeedback();

    try {
      const result = await performTranslation(text, sourceLangName, targetLangName);
      const newTurn: DialogueTurn = {
        id: `turn-${Date.now()}-A`,
        speaker: 'A',
        speakerLabel: sourceLangName === 'Auto-Detect Language' ? (result.detected || 'Speaker A') : sourceLangName,
        originalText: text,
        sourceLangName: result.detected || sourceLangName,
        translatedText: result.translation,
        targetLangName: targetLangName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setDialogueTurns((prev) => [...prev, newTurn]);
      audioSynth.playSuccessChime();

      if (autoPlayDialogueAudio && result.translation) {
        handleSpeak(result.translation, targetLangName);
      }
    } catch (e) {
      console.error('Dialogue translation error:', e);
    } finally {
      setIsDialogueProcessing(false);
    }
  };

  // Speaker B submit in Dialogue Mode
  const handleSendSpeakerB = async (textToSend?: string) => {
    const text = (textToSend || speakerBInput).trim();
    if (!text) return;

    setSpeakerBInput('');
    setIsDialogueProcessing(true);
    audioSynth.playGentleFeedback();

    try {
      // Speaker B translates from targetLangName into sourceLangName (or English if source is Auto)
      const returnTarget = sourceLangName === 'Auto-Detect Language' ? 'English' : sourceLangName;
      const result = await performTranslation(text, targetLangName, returnTarget);

      const newTurn: DialogueTurn = {
        id: `turn-${Date.now()}-B`,
        speaker: 'B',
        speakerLabel: targetLangName,
        originalText: text,
        sourceLangName: targetLangName,
        translatedText: result.translation,
        targetLangName: returnTarget,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setDialogueTurns((prev) => [...prev, newTurn]);
      audioSynth.playSuccessChime();

      if (autoPlayDialogueAudio && result.translation) {
        handleSpeak(result.translation, returnTarget);
      }
    } catch (e) {
      console.error('Dialogue translation error:', e);
    } finally {
      setIsDialogueProcessing(false);
    }
  };

  // Speaker A Mic
  const toggleListeningSpeakerA = () => {
    if (isListeningSpeakerA) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningSpeakerA(false);
      return;
    }

    const srcObj = ALL_GLOBAL_LANGUAGES.find((l) => l.name === sourceLangName);
    setIsListeningSpeakerA(true);
    startSpeechRecognition(
      (transcript) => {
        handleSendSpeakerA(transcript);
      },
      () => setIsListeningSpeakerA(false),
      srcObj?.code
    );
  };

  // Speaker B Mic
  const toggleListeningSpeakerB = () => {
    if (isListeningSpeakerB) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningSpeakerB(false);
      return;
    }

    const tgtObj = ALL_GLOBAL_LANGUAGES.find((l) => l.name === targetLangName);
    setIsListeningSpeakerB(true);
    startSpeechRecognition(
      (transcript) => {
        handleSendSpeakerB(transcript);
      },
      () => setIsListeningSpeakerB(false),
      tgtObj?.code
    );
  };

  const currentSrcOption = ALL_GLOBAL_LANGUAGES.find((l) => l.name === sourceLangName);
  const currentTgtOption = ALL_GLOBAL_LANGUAGES.find((l) => l.name === targetLangName);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 py-4 sm:py-6 space-y-4 pb-28">
      {/* Header Banner with Mode Switcher */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-5 shadow-lg shadow-blue-500/15">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-blue-100 text-[11px] font-extrabold w-fit border border-white/20">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Ultra-Fast Neural Engine • openrouter/free</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              AI Universal Translator
            </h1>
            <p className="text-xs text-blue-100/90 font-normal">
              High-speed neural translation supporting all global languages with auto-detection & live two-way dialogue.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
            <button
              type="button"
              id="translator-tab-direct-btn"
              onClick={() => {
                audioSynth.playGentleFeedback();
                setActiveMode('translator');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeMode === 'translator'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Text Translator</span>
            </button>

            <button
              type="button"
              id="translator-tab-dialogue-btn"
              onClick={() => {
                audioSynth.playGentleFeedback();
                setActiveMode('dialogue');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeMode === 'dialogue'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Dialogue & Speech Mode</span>
            </button>
          </div>
        </div>
      </section>

      {/* Language Selector Bar with Searchable Comboboxes & Central Swap Button */}
      <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative z-30">
        {/* Source Language Combobox */}
        <div className="flex-1 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              From:
            </span>
            {detectedSource && (
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Detected: {detectedSource}
              </span>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSrcDropdownOpen(!isSrcDropdownOpen);
                setIsTgtDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left font-bold text-xs sm:text-sm text-slate-900 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">{currentSrcOption?.flag || '🌐'}</span>
                <span className="truncate">{sourceLangName}</span>
                {currentSrcOption?.nativeName && (
                  <span className="text-xs text-slate-400 font-normal truncate">
                    ({currentSrcOption.nativeName})
                  </span>
                )}
              </div>
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {isSrcDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 max-h-72 flex flex-col gap-1.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={srcSearch}
                    onChange={(e) => setSrcSearch(e.target.value)}
                    placeholder="Search or type any language..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto max-h-52 space-y-0.5">
                  {/* Allow direct custom language entry */}
                  {srcSearch.trim() && !filteredSrcLanguages.some((l) => l.name.toLowerCase() === srcSearch.toLowerCase()) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSourceLangName(srcSearch.trim());
                        setIsSrcDropdownOpen(false);
                        setSrcSearch('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-black bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Use custom language: "{srcSearch.trim()}"</span>
                    </button>
                  )}

                  {filteredSrcLanguages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setSourceLangName(l.name);
                        setIsSrcDropdownOpen(false);
                        setSrcSearch('');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        sourceLangName === l.name
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                        {l.nativeName && (
                          <span className={`text-[10px] ${sourceLangName === l.name ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({l.nativeName})
                          </span>
                        )}
                      </div>
                      {sourceLangName === l.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Central Swap Button (⇄) */}
        <div className="flex items-center justify-center pt-2 md:pt-4">
          <button
            type="button"
            id="translator-swap-btn"
            onClick={handleSwap}
            className="p-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Swap languages and texts immediately"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Language Combobox */}
        <div className="flex-1 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              To (Target):
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTgtDropdownOpen(!isTgtDropdownOpen);
                setIsSrcDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left font-bold text-xs sm:text-sm text-slate-900 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">{currentTgtOption?.flag || '🌐'}</span>
                <span className="truncate">{targetLangName}</span>
                {currentTgtOption?.nativeName && (
                  <span className="text-xs text-slate-400 font-normal truncate">
                    ({currentTgtOption.nativeName})
                  </span>
                )}
              </div>
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {isTgtDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 max-h-72 flex flex-col gap-1.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tgtSearch}
                    onChange={(e) => setTgtSearch(e.target.value)}
                    placeholder="Search or type any target language..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto max-h-52 space-y-0.5">
                  {/* Allow direct custom language entry */}
                  {tgtSearch.trim() && !filteredTgtLanguages.some((l) => l.name.toLowerCase() === tgtSearch.toLowerCase()) && (
                    <button
                      type="button"
                      onClick={() => {
                        setTargetLangName(tgtSearch.trim());
                        setIsTgtDropdownOpen(false);
                        setTgtSearch('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-black bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Use custom language: "{tgtSearch.trim()}"</span>
                    </button>
                  )}

                  {filteredTgtLanguages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setTargetLangName(l.name);
                        setIsTgtDropdownOpen(false);
                        setTgtSearch('');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        targetLangName === l.name
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                        {l.nativeName && (
                          <span className={`text-[10px] ${targetLangName === l.name ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({l.nativeName})
                          </span>
                        )}
                      </div>
                      {targetLangName === l.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Standard Side-by-Side Containers */}
      {activeMode === 'translator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source Text Container */}
            <div className="flex flex-col rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all min-h-[260px]">
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{currentSrcOption?.flag || '🌐'}</span>
                  <span className="text-xs font-black text-slate-800">
                    {sourceLangName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleListeningSource}
                    className={`p-1.5 rounded-lg transition-all ${
                      isListeningSource
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                    title={isListeningSource ? 'Listening... click to stop' : 'Speech input (Mic)'}
                  >
                    {isListeningSource ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeak(sourceText, sourceLangName)}
                    disabled={!sourceText.trim()}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-30 transition-all cursor-pointer"
                    title="Listen to source speech"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <textarea
                id="translator-source-textarea"
                dir={isRtlLanguage(currentSrcOption?.code) ? 'rtl' : 'ltr'}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleTranslate();
                  }
                }}
                placeholder={`Type, paste, or speak text in ${sourceLangName}...`}
                className={`flex-1 w-full p-4 text-sm sm:text-base text-slate-800 placeholder-slate-400 outline-none resize-none bg-transparent ${
                  isRtlLanguage(currentSrcOption?.code) ? 'text-right' : 'text-left'
                }`}
                rows={6}
              />

              <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{sourceText.length} characters</span>
                <span className="hidden sm:inline text-[11px]">Tip: Press ⌘ + Enter to translate</span>
              </div>
            </div>

            {/* Target Text Container */}
            <div className="flex flex-col rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden min-h-[260px]">
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{currentTgtOption?.flag || '🌐'}</span>
                  <span className="text-xs font-black text-slate-800">
                    {targetLangName}
                  </span>
                  {isRtlLanguage(currentTgtOption?.code) && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-[10px] text-amber-800 font-bold">RTL</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSpeak(targetText, targetLangName)}
                    disabled={!targetText.trim()}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-30 transition-all cursor-pointer"
                    title="Listen to target speech in authentic accent"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(targetText)}
                    disabled={!targetText.trim()}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-30 transition-all cursor-pointer"
                    title="Copy translation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full p-4 relative">
                {isLoading ? (
                  <div className="h-full min-h-[140px] flex flex-col items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-7 h-7 animate-spin" />
                    <span className="text-xs font-bold text-slate-500">
                      Translating strictly into {targetLangName}...
                    </span>
                  </div>
                ) : targetText ? (
                  <p
                    dir={isRtlLanguage(currentTgtOption?.code) ? 'rtl' : 'ltr'}
                    className={`text-sm sm:text-base text-slate-900 font-medium whitespace-pre-wrap leading-relaxed select-text ${
                      isRtlLanguage(currentTgtOption?.code) ? 'text-right' : 'text-left'
                    }`}
                  >
                    {targetText}
                  </p>
                ) : (
                  <p className="text-sm text-slate-300 italic select-none">
                    Translation will appear here with 100% strict adherence to {targetLangName}...
                  </p>
                )}
              </div>

              <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{targetText.length} characters</span>
                <span className="text-emerald-700 font-extrabold text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Strict Target Adherence
                </span>
              </div>
            </div>
          </div>

          {/* Action Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              id="translator-clear-btn"
              onClick={handleClear}
              disabled={!sourceText && !targetText}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-600 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Text</span>
            </button>

            <div className="flex items-center gap-2.5">
              {/* Copy to Clipboard Button with Toast */}
              <div className="relative">
                <button
                  type="button"
                  id="translator-copy-btn"
                  onClick={() => handleCopy(targetText)}
                  disabled={!targetText}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border flex items-center gap-2 transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25'
                      : targetText
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>

                {copied && (
                  <div className="absolute -top-10 right-0 z-30 px-3 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
                    ✓ Copied to clipboard!
                  </div>
                )}
              </div>

              {/* Translate Button */}
              <button
                type="button"
                id="translator-translate-action-btn"
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Translate Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {errorMsg}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: Real-Time Dialogue & Live Speech Mode */}
      {activeMode === 'dialogue' && (
        <div className="space-y-4">
          {/* Dialogue Toolbar & Controls */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-extrabold text-slate-800">
                Two-Way Conversation Studio
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-medium text-slate-600">
                {sourceLangName} ⇄ {targetLangName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoPlayDialogueAudio(!autoPlayDialogueAudio)}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1.5 transition-all ${
                  autoPlayDialogueAudio
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title="Toggle automatic speech synthesis for translations"
              >
                {autoPlayDialogueAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>Auto-Speak</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audioSynth.playGentleFeedback();
                  setDialogueTurns([]);
                }}
                disabled={dialogueTurns.length === 0}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 disabled:opacity-30 transition-all font-bold flex items-center gap-1"
                title="Clear conversation history"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Real-time Conversation Feed */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs min-h-[360px] max-h-[480px] overflow-y-auto p-4 sm:p-6 space-y-4">
            {dialogueTurns.length === 0 ? (
              <div className="h-72 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h3 className="text-base font-black text-slate-900">
                    Live Two-Way Conversation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Speak or type using either speaker panel below. The app automatically detects or translates the speech in real time with native voice audio!
                  </p>
                </div>
              </div>
            ) : (
              dialogueTurns.map((turn) => {
                const isSpeakerA = turn.speaker === 'A';
                return (
                  <div
                    key={turn.id}
                    className={`flex flex-col ${isSpeakerA ? 'items-start' : 'items-end'} space-y-1`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 px-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                        isSpeakerA ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {turn.speakerLabel}
                      </span>
                      <span>{turn.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-xs space-y-2 ${
                        isSpeakerA
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 text-slate-900 rounded-tl-sm'
                          : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 text-slate-900 rounded-tr-sm'
                      }`}
                    >
                      {/* Original Transcript */}
                      <div className="text-xs text-slate-600 font-medium pb-1 border-b border-slate-200/50">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                          Original ({turn.sourceLangName}):
                        </span>
                        "{turn.originalText}"
                      </div>

                      {/* Direct Pure Translation */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-indigo-700 font-black block">
                          Translation ({turn.targetLangName}):
                        </span>
                        <p className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                          {turn.translatedText}
                        </p>
                      </div>

                      {/* Turn Actions */}
                      <div className="flex items-center justify-end gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => handleSpeak(turn.translatedText, turn.targetLangName)}
                          className="p-1 rounded-md text-slate-500 hover:text-blue-600 hover:bg-white/80 transition-all cursor-pointer"
                          title="Listen to native translation speech"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(turn.translatedText)}
                          className="p-1 rounded-md text-slate-500 hover:text-blue-600 hover:bg-white/80 transition-all cursor-pointer"
                          title="Copy translation"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isDialogueProcessing && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold animate-pulse w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Generating ultra-fast dialogue translation...</span>
              </div>
            )}

            <div ref={dialogueEndRef} />
          </div>

          {/* Two-Way Dual Speaker Inputs Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Speaker A Input Panel */}
            <div className="p-3 rounded-2xl bg-white border border-blue-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-blue-900">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Speaker A ({sourceLangName})</span>
                </div>
                {isListeningSpeakerA && (
                  <span className="text-rose-600 font-bold text-[11px] animate-pulse">
                    ● Listening...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="dialogue-speaker-a-mic-btn"
                  onClick={toggleListeningSpeakerA}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    isListeningSpeakerA
                      ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                  }`}
                  title="Speak as Speaker A (Mic)"
                >
                  {isListeningSpeakerA ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={speakerAInput}
                  onChange={(e) => setSpeakerAInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendSpeakerA();
                    }
                  }}
                  placeholder={`Speak or type in ${sourceLangName}...`}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white"
                />

                <button
                  type="button"
                  id="dialogue-speaker-a-send-btn"
                  onClick={() => handleSendSpeakerA()}
                  disabled={!speakerAInput.trim() || isDialogueProcessing}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 transition-all cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Speaker B Input Panel */}
            <div className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-emerald-900">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Speaker B ({targetLangName})</span>
                </div>
                {isListeningSpeakerB && (
                  <span className="text-rose-600 font-bold text-[11px] animate-pulse">
                    ● Listening...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="dialogue-speaker-b-mic-btn"
                  onClick={toggleListeningSpeakerB}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    isListeningSpeakerB
                      ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title="Speak as Speaker B (Mic)"
                >
                  {isListeningSpeakerB ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={speakerBInput}
                  onChange={(e) => setSpeakerBInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendSpeakerB();
                    }
                  }}
                  placeholder={`Speak or type in ${targetLangName}...`}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-emerald-500 focus:bg-white"
                />

                <button
                  type="button"
                  id="dialogue-speaker-b-send-btn"
                  onClick={() => handleSendSpeakerB()}
                  disabled={!speakerBInput.trim() || isDialogueProcessing}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 transition-all cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

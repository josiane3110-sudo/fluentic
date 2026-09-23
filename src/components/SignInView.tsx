import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  User, 
  Globe2, 
  Target, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';
import { audioSynth } from '../services/audioSynthesizer';
import { FluenticLogo } from './FluenticLogo';
import { WORLD_LANGUAGES } from '../data/languages';
import { SearchableLanguageSelect } from './SearchableLanguageSelect';

interface SignInViewProps {
  initialName?: string;
  initialEmail?: string;
  initialNativeLanguageCode?: string;
  initialTargetLanguageCode?: string;
  onSignIn: (name: string, email: string, nativeLanguageCode: string, targetLanguageCode: string) => void;
  onContinueGuest: (nativeLanguageCode: string, targetLanguageCode: string) => void;
  onSkipTest?: (nativeLanguageCode: string, targetLanguageCode: string, name?: string) => void;
}

const POPULAR_TARGET_CODES = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ar', 'zh', 'ru', 'lt', 'nl'];

export const SignInView: React.FC<SignInViewProps> = ({
  initialName = '',
  initialEmail = '',
  initialNativeLanguageCode = 'en',
  initialTargetLanguageCode = 'en',
  onSignIn,
  onContinueGuest,
  onSkipTest,
}) => {
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [nativeCode, setNativeCode] = useState(initialNativeLanguageCode);
  const [targetCode, setTargetCode] = useState(initialTargetLanguageCode);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDutch = nativeCode === 'nl';

  const selectedTargetLanguage = 
    WORLD_LANGUAGES.find((l) => l.code === targetCode) || 
    WORLD_LANGUAGES.find((l) => l.code === 'es') || 
    WORLD_LANGUAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage(isDutch ? 'Vul alsjeblieft jouw naam in om de niveautest te starten.' : 'Please enter your name to start the placement test.');
      audioSynth.playGentleFeedback();
      return;
    }

    setIsLoading(true);
    audioSynth.playSuccessChime();

    setTimeout(() => {
      setIsLoading(false);
      onSignIn(
        trimmedName, 
        trimmedEmail || `${trimmedName.toLowerCase().replace(/\s+/g, '.')}@fluentic.local`,
        nativeCode,
        targetCode
      );
    }, 250);
  };

  const handleGuestClick = () => {
    audioSynth.playGentleFeedback();
    onContinueGuest(nativeCode, targetCode);
  };

  return (
    <div
      id="fluentic-main-entry-login-page"
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 z-20"
    >
      <div className="w-full max-w-lg mx-auto space-y-5">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <FluenticLogo size={34} />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Fluentic
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5">
                AI Polyglot Operating System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <button
              type="button"
              onClick={() => {
                setNativeCode('nl');
                audioSynth.playGentleFeedback();
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                nativeCode === 'nl' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
              }`}
            >
              NL 🇳🇱
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => {
                setNativeCode('en');
                audioSynth.playGentleFeedback();
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                nativeCode === 'en' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
              }`}
            >
              EN 🇬🇧
            </button>
          </div>
        </div>

        {/* Main Entry Card */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-blue-200/90 shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-6 sm:p-8 space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isDutch ? 'Kies je Talen & Start de Niveautest' : 'Select Languages & Begin Placement'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              {isDutch 
                ? 'Stel je moedertaal en doeltaal in via het wereldtalenmenu. Iedereen start met een 10-vragen niveautest (A1–C2).'
                : 'Configure your native language and target language with dynamic AI curricula. All learners begin with a 10-question placement test (A1–C2).'}
            </p>
          </div>

          {/* Mandatory Placement Test Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300/80 flex items-start gap-3 text-left">
            <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-extrabold text-amber-950 block text-[13px] mb-0.5">
                {isDutch ? 'Verplichte CEFR Niveautest (Instaptoets)' : 'Mandatory CEFR Placement Test'}
              </span>
              {isDutch
                ? 'Niemand heeft directe toegang zonder de instaptest. Zo wordt jouw werkelijke taalniveau (A1 t/m C2) exact vastgesteld.'
                : 'No one enters the platform without the placement test. This calibrates your exact starting level from A1 to C2.'}
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Setup & Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Native Language Selector using SearchableLanguageSelect */}
            <div>
              <SearchableLanguageSelect
                id="signin-native-language-select"
                value={nativeCode}
                onChange={(lang) => {
                  setNativeCode(lang.code);
                  audioSynth.playGentleFeedback();
                }}
                label={isDutch ? '1. Mijn Moedertaal (Native Language)' : '1. My Native Language'}
                placeholder={isDutch ? 'Zoek moedertaal...' : 'Search native language...'}
                helperText={isDutch ? 'Voor grammatica-uitleg, vertalingen en instructies' : 'For explanations, guidance, and translations'}
                variant="card"
              />
            </div>

            {/* 2. Target Language Selector using SearchableLanguageSelect */}
            <div>
              <div className="mb-2">
                <SearchableLanguageSelect
                  id="signin-target-language-select"
                  value={targetCode}
                  onChange={(lang) => {
                    setTargetCode(lang.code);
                    audioSynth.playGentleFeedback();
                  }}
                  label={isDutch ? '2. Taal die ik wil leren (Doeltaal)' : '2. Language I Want to Learn (Target)'}
                  placeholder={isDutch ? 'Zoek uit alle 55+ talen...' : 'Search across all 55+ world languages...'}
                  helperText={isDutch ? 'AI genereert het complete curriculum in deze taal' : 'AI generates the complete curriculum in this language'}
                  variant="card"
                />
              </div>

              {/* Quick Pick Chips for popular target languages */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  {isDutch ? 'Populair:' : 'Popular:'}
                </span>
                {POPULAR_TARGET_CODES.map((code) => {
                  const l = WORLD_LANGUAGES.find((item) => item.code === code);
                  if (!l) return null;
                  const isSelected = targetCode === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setTargetCode(code);
                        audioSynth.playGentleFeedback();
                      }}
                      className={`flex items-center gap-1 py-1 px-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Name input */}
            <div>
              <label htmlFor="login-name-input" className="block text-xs font-extrabold text-slate-800 mb-1.5">
                {isDutch ? '3. Jouw Naam' : '3. Your Name'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-name-input"
                  type="text"
                  required
                  placeholder={isDutch ? 'Bijv. Josiane' : 'e.g. Josiane'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* 4. Optional Email */}
            <div>
              <label htmlFor="login-email-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                {isDutch ? 'E-mailadres (optioneel)' : 'Email Address (optional)'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email-input"
                  type="email"
                  placeholder={isDutch ? 'naam@voorbeeld.nl' : 'name@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button -> Placement Test */}
            <button
              id="login-start-placement-btn"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>{isDutch ? `Start Niveautest ${selectedTargetLanguage.name} (10 Vragen)` : `Start Placement Test in ${selectedTargetLanguage.name} (10 Questions)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
              {isDutch ? 'of' : 'or'}
            </span>
          </div>

          {/* Continue as Guest Button */}
          <button
            id="login-continue-guest-btn"
            type="button"
            onClick={handleGuestClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <span>{isDutch ? `Direct Verder als Gast naar Niveautest` : `Continue as Guest to Placement Test`}</span>
          </button>

          {/* Direct Skip Test Button */}
          <button
            id="login-skip-test-direct-btn"
            type="button"
            onClick={() => {
              audioSynth.playGentleFeedback();
              if (onSkipTest) {
                onSkipTest(nativeCode, targetCode, name);
              } else {
                onContinueGuest(nativeCode, targetCode);
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-amber-300/80 bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs shadow-xs transition-all cursor-pointer"
          >
            <span>{isDutch ? `⚡ Niveautest Overslaan & Direct Beginnen (A1)` : `⚡ Skip Placement Test & Start Directly (A1 Beginner)`}</span>
          </button>

          {/* Ephemeral / Privacy Notice */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-left">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">
                {isDutch ? 'Privacy & Sessiegeheugen: ' : 'Privacy First: '}
              </span>
              {isDutch 
                ? 'Jouw naam en oefensessies worden niet bewaard op schijf. Alles draait in het vluchtig werkgeheugen van deze browsersessie.'
                : 'Your name and practice sessions are never stored to disk. Everything runs transiently in-memory for this session.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

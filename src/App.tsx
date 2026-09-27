import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Dumbbell, 
  Sparkles, 
  Globe, 
  LogOut, 
  User as UserIcon, 
  RefreshCw 
} from 'lucide-react';

import { SignInView } from './components/SignInView';
import { CustomTranslatorView } from './components/CustomTranslatorView';
import { OnboardingPlacementView as PlacementTestView } from './components/OnboardingPlacementView';
import { FluenticLogo } from './components/FluenticLogo';
import { WORLD_LANGUAGES } from './data/languages';
import { audioSynth } from './services/audioSynthesizer';

export interface UserSession {
  name: string;
  email: string;
  nativeLanguageCode: string;
  targetLanguageCode: string;
  isGuest: boolean;
  cefrLevel?: string;
  placementCompleted?: boolean;
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'translator'>('learn');
  const [isPlacementActive, setIsPlacementActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedSession = sessionStorage.getItem('fluentic_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setSession(parsed);
        if (!parsed.placementCompleted && !parsed.cefrLevel) {
          setIsPlacementActive(true);
        }
      }
    } catch (e) {
      console.error('Failed to restore session from storage:', e);
    }
  }, []);

  const updateSession = (newSession: UserSession | null) => {
    setSession(newSession);
    if (newSession) {
      sessionStorage.setItem('fluentic_session', JSON.stringify(newSession));
    } else {
      sessionStorage.removeItem('fluentic_session');
    }
  };

  const handleSignIn = (
    name: string, 
    email: string, 
    nativeLanguageCode: string, 
    targetLanguageCode: string
  ) => {
    const newSession: UserSession = {
      name,
      email,
      nativeLanguageCode,
      targetLanguageCode,
      isGuest: false,
      placementCompleted: false,
    };
    updateSession(newSession);
    setIsPlacementActive(true);
  };

  const handleContinueGuest = (nativeLanguageCode: string, targetLanguageCode: string) => {
    const newSession: UserSession = {
      name: 'Guest Learner',
      email: 'guest@fluentic.local',
      nativeLanguageCode,
      targetLanguageCode,
      isGuest: true,
      placementCompleted: false,
    };
    updateSession(newSession);
    setIsPlacementActive(true);
  };

  const handleSkipTest = (
    nativeLanguageCode: string, 
    targetLanguageCode: string, 
    name?: string
  ) => {
    const newSession: UserSession = {
      name: name?.trim() || 'Learner',
      email: 'learner@fluentic.local',
      nativeLanguageCode,
      targetLanguageCode,
      isGuest: !name?.trim(),
      cefrLevel: 'A1',
      placementCompleted: true,
    };
    updateSession(newSession);
    setIsPlacementActive(false);
  };

  const handlePlacementComplete = (calibratedLevel: string) => {
    if (!session) return;
    const updated = {
      ...session,
      cefrLevel: calibratedLevel,
      placementCompleted: true,
    };
    updateSession(updated);
    setIsPlacementActive(false);
  };

  const handleSignOut = () => {
    audioSynth.playGentleFeedback();
    updateSession(null);
    setIsPlacementActive(false);
    setActiveTab('learn');
  };

  if (!session) {
    return (
      <SignInView
        onSignIn={handleSignIn}
        onContinueGuest={handleContinueGuest}
        onSkipTest={handleSkipTest}
      />
    );
  }

  if (isPlacementActive && !session.placementCompleted) {
    return (
      <PlacementTestView
        nativeLanguageCode={session.nativeLanguageCode}
        targetLanguageCode={session.targetLanguageCode}
        onComplete={handlePlacementComplete}
        onCancel={() => {
          handlePlacementComplete('A1');
        }}
      />
    );
  }

  const nativeLang = WORLD_LANGUAGES.find((l) => l.code === session.nativeLanguageCode) || WORLD_LANGUAGES[0];
  const targetLang = WORLD_LANGUAGES.find((l) => l.code === session.targetLanguageCode) || WORLD_LANGUAGES[1];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 shrink-0">
            <FluenticLogo size={36} />
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              Fluentic
            </h1>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => {
                audioSynth.playGentleFeedback();
                setActiveTab('learn');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'learn'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
            </button>

            <button
              onClick={() => {
                audioSynth.playGentleFeedback();
                setActiveTab('practice');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Practice</span>
            </button>

            <button
              onClick={() => {
                audioSynth.playGentleFeedback();
                setActiveTab('translator');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'translator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Translator</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{nativeLang.flag} {nativeLang.code.toUpperCase()}</span>
              <span className="text-slate-300">→</span>
              <span>{targetLang.flag} {targetLang.code.toUpperCase()}</span>
              {session.cefrLevel && (
                <span className="ml-1 px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black">
                  {session.cefrLevel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800">
              <UserIcon className="w-3.5 h-3.5 text-slate-500" />
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{session.name}</span>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out / Switch User"
              className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
                  <span>Current Level: {session.cefrLevel || 'A1'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome back, {session.name}!
                </h2>
                <p className="text-slate-500 text-sm max-w-lg">
                  You are learning <span className="font-bold text-slate-800">{targetLang.name}</span> with instructions in <span className="font-bold text-slate-800">{nativeLang.name}</span>.
                </p>
              </div>

              <button
                onClick={() => setIsPlacementActive(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Placement Test</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">1</div>
                <h3 className="font-bold text-slate-900">Foundational Expressions</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Master high-frequency vocabulary and daily conversation starters.</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">2</div>
                <h3 className="font-bold text-slate-900">Grammar & Mechanics</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Understand essential sentence structures and verb conjugations.</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">3</div>
                <h3 className="font-bold text-slate-900">Real-World Dialogues</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Practice interactive scenarios and improve conversational fluency.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Practice Hub</h2>
            <p className="text-slate-500 text-sm">
              Interactive speaking drills, flashcards, and audio exercises tailored for level {session.cefrLevel || 'A1'}.
            </p>
          </div>
        )}

        {activeTab === 'translator' && <CustomTranslatorView />}
      </main>
    </div>
  );
}

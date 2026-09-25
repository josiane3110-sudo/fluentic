import React, { useState } from 'react';
import { Sparkles, BookOpen, Dumbbell } from 'lucide-react';
import { CustomTranslatorView } from './components/CustomTranslatorView';

export function App() {
  // 1. Updated state to include 'translator'
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'translator'>('learn');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-black text-blue-600">Fluentic</h1>

          {/* 2. Navigation Buttons */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'learn' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'practice' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Practice</span>
            </button>

            <button
              onClick={() => setActiveTab('translator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'translator' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Translator</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-8">
        {/* 3. Conditional View Rendering */}
        {activeTab === 'learn' && (
          <div className="text-center py-12 font-bold text-slate-500">Learn View Content</div>
        )}

        {activeTab === 'practice' && (
          <div className="text-center py-12 font-bold text-slate-500">Practice View Content</div>
        )}

        {activeTab === 'translator' && <CustomTranslatorView />}
      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  SpatialViewMode, 
  CefrLevel, 
  Language, 
  UserProfile, 
  LearningNode 
} from './types';
import { WORLD_LANGUAGES } from './data/languages';
import { CryptoStorage, STORAGE_KEY_PROFILE, STORAGE_KEY_CARDS } from './services/cryptoStorage';
import { audioSynth } from './services/audioSynthesizer';
import { AccountDatabase, STORAGE_KEY_ACCOUNTS_DB } from './services/accountDatabase';

import { Sparkles } from 'lucide-react';

// Core Canvas & Navigation
import { AmbientCanvas } from './components/AmbientCanvas';
import { TopHorizonDeck } from './components/TopHorizonDeck';
import { OrbitDock } from './components/OrbitDock';
import { CommandSpotlight } from './components/CommandSpotlight';
import { AuthModal } from './components/AuthModal';
import { LessonModal } from './components/LessonModal';
import { OnboardingPlacementView } from './components/OnboardingPlacementView';
import { SignInView } from './components/SignInView';
import { AITutorModal } from './components/AITutorModal';

// Views
import { HomeView } from './components/views/HomeView';
import { DuolingoPathView } from './components/views/DuolingoPathView';
import { SpeechLabView } from './components/views/SpeechLabView';
import { DialogueTheatreView } from './components/views/DialogueTheatreView';
import { DailyDisciplinesView } from './components/views/DailyDisciplinesView';
import { ProStudioView } from './components/views/ProStudioView';
import { GrammarModuleView } from './components/views/GrammarModuleView';

const DEFAULT_USER: UserProfile = {
  id: 'usr-fresh-001',
  name: '',
  email: '',
  avatar: 'FL',
  isGuest: true,
  isPro: false,
  hasCompletedOnboarding: true,
  nativeLanguageCode: 'en',
  targetPace: 'dedicated',
  placementScore: 0,
  xp: 0,
  level: 1,
  gems: 0,
  streakDays: 0,
  speakingPunctuation: 0,
  speakingScore: 0,
  totalPracticeMinutes: 0,
  streakShields: 0,
  streakProtected: false,
  activeLanguageCode: 'en',
  activeCefr: 'A1',
  completedNodeIds: [],
  nodeCrowns: {},
  dailyGoalMinutes: 15,
  dailyGoalCompleted: false,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  unlockedAchievements: [],
  claimedAchievements: [],
  isSignedIn: false,
  dailyQuests: [],
};

export function App() {
  // Ephemeral session user profile
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  // Main entry authentication state
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // Hard wipe storage on mount to maintain ephemeral session privacy
  useEffect(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      AccountDatabase.clearDatabase();
    } catch {
      // Ignore storage clear errors
    }
  }, []);

  const [activeLanguage, setActiveLanguage] = useState<Language>(() => {
    return (
      WORLD_LANGUAGES.find((l) => l.code === user.activeLanguageCode) ||
      WORLD_LANGUAGES[0]
    );
  });

  const [activeCefr, setActiveCefr] = useState<CefrLevel>(user.activeCefr || 'A1');
  const [activeDialect, setActiveDialect] = useState<string>('');
  const [spatialMode, setSpatialMode] = useState<SpatialViewMode>('chrono');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [soundscapeMode, setSoundscapeMode] = useState<'alpha' | 'cosmic' | 'rain' | 'mute'>('mute');
  const [isRetakingPlacement, setIsRetakingPlacement] = useState(false);

  // Modals
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [activeLessonNode, setActiveLessonNode] = useState<LearningNode | null>(null);

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
  };

  const handleSelectLanguage = (lang: Language) => {
    setActiveLanguage(lang);
    setActiveDialect(lang.dialects && lang.dialects.length > 0 ? lang.dialects[0] : '');
    handleUpdateUser({
      ...user,
      activeLanguageCode: lang.code,
      activeLanguage: lang.name,
    });
  };

  const handleSelectCefr = (cefr: CefrLevel) => {
    setActiveCefr(cefr);
    handleUpdateUser({
      ...user,
      activeCefr: cefr,
    });
  };

  // Onboarding & Placement completion handler
  const handleOnboardingComplete = (
    finalProfile: UserProfile,
    chosenTargetLanguage: Language,
    assessedCefr: CefrLevel
  ) => {
    setUser(finalProfile);
    setActiveLanguage(chosenTargetLanguage);
    setActiveCefr(assessedCefr);
    setActiveDialect(
      chosenTargetLanguage.dialects && chosenTargetLanguage.dialects.length > 0
        ? chosenTargetLanguage.dialects[0]
        : ''
    );
    setActiveTab('home');
    setIsRetakingPlacement(false);
  };

  // Complete a learning node
  const handleLessonComplete = (xpEarned: number, gemsEarned: number) => {
    if (!activeLessonNode) return;
    const nodeId = activeLessonNode.id;
    const currentCrown = user.nodeCrowns?.[nodeId] || 0;
    const newCrown = Math.min(currentCrown + 1, 5);

    const completedIds = user.completedNodeIds.includes(nodeId)
      ? user.completedNodeIds
      : [...user.completedNodeIds, nodeId];

    const nextStreak = user.streakDays === 0 ? 1 : user.streakDays;
    const addedMinutes = activeLessonNode.targetDurationMinutes || 5;
    const nextPracticeMinutes = (user.totalPracticeMinutes || 0) + addedMinutes;

    handleUpdateUser({
      ...user,
      xp: user.xp + xpEarned,
      gems: user.gems + gemsEarned,
      streakDays: nextStreak,
      totalPracticeMinutes: nextPracticeMinutes,
      completedNodeIds: completedIds,
      nodeCrowns: {
        ...(user.nodeCrowns || {}),
        [nodeId]: newCrown,
      },
    });

    setActiveLessonNode(null);
  };

  const handleSignOut = () => {
    audioSynth.playGentleFeedback();
    setUser(DEFAULT_USER);
    setIsSignedIn(false);
    try {
      localStorage.clear();
      sessionStorage.clear();
      AccountDatabase.clearDatabase();
    } catch {
      // Ignore
    }
  };

  // Main entry login screen if not signed in
  if (!isSignedIn) {
    return (
      <div className="relative min-h-screen bg-[#f0f4f9] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 antialiased overflow-x-hidden">
        <AmbientCanvas />

        <SignInView
          initialName=""
          initialEmail=""
          initialNativeLanguageCode={user.nativeLanguageCode || 'en'}
          initialTargetLanguageCode={activeLanguage?.code || 'es'}
          onSignIn={(name, email, nativeLangCode, targetLangCode) => {
            const targetLang = WORLD_LANGUAGES.find((l) => l.code === targetLangCode) || activeLanguage;
            setActiveLanguage(targetLang);
            const brandNew: UserProfile = {
              ...DEFAULT_USER,
              id: `usr-${Date.now()}`,
              name: name.trim() || 'Explorer',
              email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@fluentic.local`,
              avatar: (name.trim() || 'EX').slice(0, 2).toUpperCase(),
              nativeLanguageCode: nativeLangCode,
              activeLanguageCode: targetLang.code,
              activeLanguage: targetLang.name,
              isGuest: false,
              isSignedIn: true,
              hasCompletedOnboarding: false,
              totalPracticeMinutes: 0,
              xp: 0,
              gems: 0,
              streakDays: 0,
              speakingPunctuation: 0,
              speakingScore: 0,
            };
            setUser(brandNew);
            setIsSignedIn(true);
          }}
          onContinueGuest={(nativeLangCode, targetLangCode) => {
            const targetLang = WORLD_LANGUAGES.find((l) => l.code === targetLangCode) || activeLanguage;
            setActiveLanguage(targetLang);
            const guestProfile: UserProfile = {
              ...DEFAULT_USER,
              id: `usr-guest-${Date.now()}`,
              name: nativeLangCode === 'nl' ? 'Gastgebruiker' : 'Guest Explorer',
              email: 'guest@fluentic.local',
              avatar: 'GE',
              nativeLanguageCode: nativeLangCode,
              activeLanguageCode: targetLang.code,
              activeLanguage: targetLang.name,
              isGuest: true,
              isSignedIn: true,
              hasCompletedOnboarding: false,
              totalPracticeMinutes: 0,
              xp: 0,
              gems: 0,
              streakDays: 0,
              speakingPunctuation: 0,
              speakingScore: 0,
            };
            setUser(guestProfile);
            setIsSignedIn(true);
          }}
          onSkipTest={(nativeLangCode, targetLangCode, customName) => {
            const targetLang = WORLD_LANGUAGES.find((l) => l.code === targetLangCode) || activeLanguage;
            setActiveLanguage(targetLang);
            setActiveCefr('A1');
            const skipProfile: UserProfile = {
              ...DEFAULT_USER,
              id: `usr-${Date.now()}`,
              name: customName?.trim() || (nativeLangCode === 'nl' ? 'Taalstudent' : 'Explorer'),
              email: 'explorer@fluentic.local',
              avatar: ((customName?.trim() || 'EX')).slice(0, 2).toUpperCase(),
              nativeLanguageCode: nativeLangCode,
              activeLanguageCode: targetLang.code,
              activeLanguage: targetLang.name,
              isGuest: true,
              isSignedIn: true,
              hasCompletedOnboarding: true,
              placementScore: 0,
              speakingPunctuation: 0,
              speakingScore: 0,
              placementDiagnosis: nativeLangCode === 'nl'
                ? 'Niveautest overgeslagen. Je start direct bij ERK-niveau A1 (Beginner).'
                : 'Placement test skipped. Starting directly at CEFR level A1 (Beginner).',
              totalPracticeMinutes: 0,
              xp: 0,
              gems: 0,
              streakDays: 0,
              streakShields: 0,
              streakProtected: false,
              weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
              unlockedAchievements: [],
              claimedAchievements: [],
              completedNodeIds: [],
              nodeCrowns: {},
            };
            setUser(skipProfile);
            setIsSignedIn(true);
          }}
        />
      </div>
    );
  }

  // Onboarding & Placement Screen view if onboarding is incomplete
  if (!user.hasCompletedOnboarding || isRetakingPlacement) {
    return (
      <div className="relative min-h-screen bg-[#f0f4f9] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 antialiased overflow-x-hidden">
        <AmbientCanvas />

        <OnboardingPlacementView
          initialProfile={user}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f0f4f9] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 antialiased overflow-x-hidden">
      {/* Living Ambient Canvas */}
      <AmbientCanvas />

      {/* Top Navigation Deck */}
      <TopHorizonDeck
        user={user}
        activeLanguage={activeLanguage}
        onSelectLanguage={handleSelectLanguage}
        activeCefr={activeCefr}
        onSelectCefr={handleSelectCefr}
        activeDialect={activeDialect}
        onSelectDialect={setActiveDialect}
        spatialMode={spatialMode}
        onSelectSpatialMode={setSpatialMode}
        soundscapeMode={soundscapeMode}
        onSelectSoundscape={setSoundscapeMode}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProModal={() => setActiveTab('pro-studio')}
        onRetakePlacement={() => setIsRetakingPlacement(true)}
        onSignOut={handleSignOut}
        onSelectNativeLanguage={(code) => handleUpdateUser({ ...user, nativeLanguageCode: code })}
      />

      {/* Main View Area */}
      <main className="relative z-10 w-full">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            activeLanguage={activeLanguage}
            onNavigate={(tab) => setActiveTab(tab)}
            onStartNextLesson={() => setActiveTab('syllabus')}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {activeTab === 'syllabus' && (
          <DuolingoPathView
            user={user}
            activeLanguage={activeLanguage}
            onSelectNode={(node) => setActiveLessonNode(node)}
            onClaimMilestone={(rewardGems) => {
              handleUpdateUser({
                ...user,
                gems: user.gems + rewardGems,
              });
            }}
          />
        )}

        {activeTab === 'speech-lab' && (
          <SpeechLabView
            activeLanguage={activeLanguage}
            user={user}
          />
        )}

        {activeTab === 'dialogue-theatre' && (
          <DialogueTheatreView
            activeLanguage={activeLanguage}
            user={user}
          />
        )}

        {activeTab === 'daily-disciplines' && (
          <DailyDisciplinesView
            user={user}
            activeLanguage={activeLanguage}
            onToggleShield={() => {
              if (user.streakProtected) return;
              if (user.gems >= 50) {
                audioSynth.playSuccessChime();
                handleUpdateUser({
                  ...user,
                  gems: user.gems - 50,
                  streakProtected: true,
                });
              } else {
                alert('Insufficient gems. Complete lessons to earn gems!');
              }
            }}
          />
        )}

        {activeTab === 'grammar-module' && (
          <GrammarModuleView
            activeLanguage={activeLanguage}
            user={user}
          />
        )}

        {activeTab === 'speed-test' && (
          <SpeedTestView
            activeLanguage={activeLanguage}
            user={user}
            onReward={(xp, gems) => {
              handleUpdateUser({
                ...user,
                xp: user.xp + xp,
                gems: user.gems + gems,
                totalPracticeMinutes: (user.totalPracticeMinutes || 0) + 2,
              });
            }}
          />
        )}

        {activeTab === 'pro-studio' && (
          <ProStudioView
            activeLanguage={activeLanguage}
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </main>

      {/* Orbit Dock Navigation Arc */}
      <OrbitDock
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isPro={user.isPro}
        nativeLanguageCode={user.nativeLanguageCode || 'en'}
        soundscapeMode={soundscapeMode}
        onToggleSoundscape={() => {
          const nextMode = soundscapeMode === 'alpha' ? 'mute' : 'alpha';
          setSoundscapeMode(nextMode);
          audioSynth.startSoundscape(nextMode);
        }}
      />

      {/* Command Spotlight Modal */}
      <CommandSpotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onNavigate={setActiveTab}
        onSelectLanguage={handleSelectLanguage}
        onSetCefr={handleSelectCefr}
        onSetSoundscape={setSoundscapeMode}
        onOpenProModal={() => setActiveTab('pro-studio')}
        activeLanguage={activeLanguage}
      />

      {/* Auth & Security Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        onUpdateUser={handleUpdateUser}
      />

      {/* Lesson Exercise Modal */}
      {activeLessonNode && (
        <LessonModal
          node={activeLessonNode}
          activeLanguage={activeLanguage}
          onClose={() => setActiveLessonNode(null)}
          onComplete={handleLessonComplete}
        />
      )}

      {/* Clean Floating AI Tutor Button */}
      <button
        type="button"
        id="launch-ai-tutor-floating-btn"
        onClick={() => {
          audioSynth.playGentleFeedback();
          setIsAITutorOpen(true);
        }}
        className="fixed bottom-24 right-5 sm:right-8 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all group"
        title="Open Fluentic AI Polyglot Tutor"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
        </span>
        <Sparkles className="w-4 h-4 fill-white" />
        <span>AI Tutor</span>
      </button>

      {/* AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        activeLanguage={activeLanguage}
        activeCefr={activeCefr}
        user={user}
      />
    </div>
  );
}

export default App;

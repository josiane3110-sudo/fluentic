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
import { CryptoStorage, STORAGE_KEY_PROFILE } from './services/cryptoStorage';
import { audioSynth } from './services/audioSynthesizer';

import { Sparkles } from 'lucide-react';

// Core Canvas & Navigation
import { AmbientCanvas } from './components/AmbientCanvas';
import { TopHorizonDeck } from './components/TopHorizonDeck';
import { OrbitDock } from './components/OrbitDock';
import { CommandSpotlight } from './components/CommandSpotlight';
import { AuthModal } from './components/AuthModal';
import { LessonModal } from './components/LessonModal';
import { OnboardingPlacementView } from './components/OnboardingPlacementView';
import { AITutorModal } from './components/AITutorModal';

// Views
import { HomeView } from './components/views/HomeView';
import { DuolingoPathView } from './components/views/DuolingoPathView';
import { SpeechLabView } from './components/views/SpeechLabView';
import { DialogueTheatreView } from './components/views/DialogueTheatreView';
import { FsrsVaultView } from './components/views/FsrsVaultView';
import { DailyDisciplinesView } from './components/views/DailyDisciplinesView';
import { ProStudioView } from './components/views/ProStudioView';
import { SpeedTestView } from './components/views/SpeedTestView';
import { GrammarModuleView } from './components/views/GrammarModuleView';

const DEFAULT_USER: UserProfile = {
  id: 'usr-guest-001',
  name: '',
  email: 'explorer@fluentic.local',
  avatar: 'PE',
  isGuest: true,
  isPro: false,
  hasCompletedOnboarding: false,
  nativeLanguageCode: 'en',
  targetPace: 'dedicated',
  placementScore: 0,
  xp: 0,
  level: 1,
  gems: 50,
  streakDays: 0,
  streakShields: 0,
  streakProtected: false,
  activeLanguageCode: 'es',
  activeCefr: 'A1',
  completedNodeIds: [],
  nodeCrowns: {},
  dailyGoalMinutes: 15,
  dailyGoalCompleted: false,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  unlockedAchievements: [],
  dailyQuests: [],
};

export function App() {
  const [user, setUser] = useState<UserProfile>(() =>
    CryptoStorage.loadItem<UserProfile>(STORAGE_KEY_PROFILE, DEFAULT_USER)
  );

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

  // Sync profile changes to encrypted local storage
  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
    CryptoStorage.saveItem(STORAGE_KEY_PROFILE, updated);
  };

  const handleSelectLanguage = (lang: Language) => {
    setActiveLanguage(lang);
    setActiveDialect(lang.dialects && lang.dialects.length > 0 ? lang.dialects[0] : '');
    handleUpdateUser({
      ...user,
      activeLanguageCode: lang.code,
    });
  };

  const handleSelectCefr = (cefr: CefrLevel) => {
    setActiveCefr(cefr);
    handleUpdateUser({
      ...user,
      activeCefr: cefr,
    });
  };

  // Handler when completing onboarding & placement
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
    CryptoStorage.saveItem(STORAGE_KEY_PROFILE, finalProfile);
  };

  // Complete a lesson node
  const handleLessonComplete = (xpEarned: number, gemsEarned: number) => {
    if (!activeLessonNode) return;
    const nodeId = activeLessonNode.id;
    const currentCrown = user.nodeCrowns?.[nodeId] || 0;
    const newCrown = Math.min(currentCrown + 1, 5);

    const completedIds = user.completedNodeIds.includes(nodeId)
      ? user.completedNodeIds
      : [...user.completedNodeIds, nodeId];

    // Increment streak if not yet practiced today
    const nextStreak = user.streakDays === 0 ? 1 : user.streakDays;

    handleUpdateUser({
      ...user,
      xp: user.xp + xpEarned,
      gems: user.gems + gemsEarned,
      streakDays: nextStreak,
      completedNodeIds: completedIds,
      nodeCrowns: {
        ...(user.nodeCrowns || {}),
        [nodeId]: newCrown,
      },
    });

    setActiveLessonNode(null);
  };

  // If user has not completed onboarding or clicked retake, show the entry page & placement screen
  if (!user.hasCompletedOnboarding || isRetakingPlacement) {
    return (
      <div className="relative min-h-screen bg-[#f0f4f9] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 antialiased overflow-x-hidden">
        {/* Living moving background */}
        <AmbientCanvas />

        {/* Onboarding & Placement Screen */}
        <OnboardingPlacementView
          initialProfile={user}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f0f4f9] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 antialiased overflow-x-hidden">
      {/* Dynamic Living Waves Canvas */}
      <AmbientCanvas />

      {/* Top Horizon Deck */}
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
      />

      {/* Main View Area */}
      <main className="relative z-10 w-full">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            activeLanguage={activeLanguage}
            onNavigate={(tab) => setActiveTab(tab)}
            onStartNextLesson={() => setActiveTab('syllabus')}
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

        {activeTab === 'fsrs-vault' && (
          <FsrsVaultView
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

      {/* Floating Spatial Orbit Dock (Bottom Arc Navigation) */}
      <OrbitDock
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isPro={user.isPro}
      />

      {/* Command Spotlight Modal (Cmd+K) */}
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

      {/* Floating AI Polyglot Tutor Launch Orb */}
      <button
        type="button"
        id="launch-ai-tutor-floating-btn"
        onClick={() => {
          audioSynth.playGentleFeedback();
          setIsAITutorOpen(true);
        }}
        className="fixed bottom-24 right-5 sm:right-8 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all group"
        title="Open Fluentic AI Polyglot Tutor"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
        </span>
        <Sparkles className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">AI Tutor</span>
        <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-bold">
          Gemini 3.8
        </span>
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

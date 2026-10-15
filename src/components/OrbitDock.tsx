import React, { useEffect } from 'react';
import { 
  Home, 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  Languages, 
  Calendar, 
  Crown, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { NavigationTab } from '../types';
import { audioSynth } from '../services/audioSynthesizer';
import { getI18n } from '../services/localization';

interface OrbitDockProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAITutor: () => void;
  isAITutorActive?: boolean;
  isPro: boolean;
  nativeLanguageCode?: string;
  soundscapeMode?: 'alpha' | 'cosmic' | 'rain' | 'mute';
  onToggleSoundscape?: () => void;
}

interface DockItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  keyNum: string;
  isCore: boolean; // Core tabs remain visible on phone/tablet; non-core hidden on small screens
  isProFeature?: boolean;
}

export const OrbitDock: React.FC<OrbitDockProps> = ({
  activeTab,
  onSelectTab,
  onOpenAITutor,
  isAITutorActive = false,
  isPro,
  nativeLanguageCode = 'nl',
  soundscapeMode = 'mute',
  onToggleSoundscape,
}) => {
  const i18n = getI18n(nativeLanguageCode);

  // Core navigation tabs (Always visible on all screens: phone, tablet, desktop)
  const coreTabs: DockItem[] = [
    { id: 'home', label: i18n.navHome, icon: Home, keyNum: '1', isCore: true },
    { id: 'syllabus', label: i18n.navPath, icon: Sparkles, keyNum: '2', isCore: true },
    { id: 'dialogue-theatre', label: i18n.navDialogue, icon: MessageSquare, keyNum: '3', isCore: true },
    { id: 'grammar-module', label: i18n.navGrammar, icon: BookOpen, keyNum: '4', isCore: true },
    { id: 'ai-translator', label: i18n.navTranslator, icon: Languages, keyNum: '5', isCore: true },
  ];

  // Overflow tabs (Hidden on constrained phone viewports to prevent UI jamming)
  const overflowTabs: DockItem[] = [
    { id: 'daily-disciplines', label: i18n.navDisciplines, icon: Calendar, keyNum: '6', isCore: false },
    { id: 'pro-studio', label: i18n.navPro, icon: Crown, keyNum: '7', isCore: false, isProFeature: true },
  ];

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const allItems = [...coreTabs, ...overflowTabs];
      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < allItems.length) {
        e.preventDefault();
        audioSynth.playGentleFeedback();
        onSelectTab(allItems[keyIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTab, coreTabs, overflowTabs]);

  return (
    <nav
      id="fluentic-spatial-orbit-dock"
      aria-label="Main spatial navigation dock"
      className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 px-2 sm:px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 flex items-center gap-1 sm:gap-1.5 max-w-[98vw] overflow-x-auto no-scrollbar scrollbar-none text-slate-800"
    >
      {/* Core Tabs: Home, Path (Learn), AI Dialogues, Grammar, AI Translator */}
      {coreTabs.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            id={`dock-tab-${item.id}-btn`}
            onClick={() => {
              audioSynth.playGentleFeedback();
              onSelectTab(item.id);
            }}
            className={`relative flex flex-col items-center justify-center min-w-[54px] sm:min-w-[62px] py-1.5 px-2 rounded-xl transition-all group cursor-pointer shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-[#1B365D] to-[#0F2137] text-[#D4AF37] font-black shadow-md shadow-blue-950/20 border border-[#C5A059]/40 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={`${item.label} (${item.keyNum})`}
          >
            <div className="relative">
              <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 ${
                isActive ? 'text-[#D4AF37]' : ''
              }`} />
            </div>

            <span className={`text-[10px] sm:text-[11px] font-bold tracking-normal whitespace-nowrap text-center mt-0.5 ${
              isActive ? 'text-[#D4AF37]' : 'text-slate-700'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {/* DEDICATED STANDALONE AI TUTOR BUTTON: Navy when inactive; Gold gradient ONLY when active */}
      <button
        id="dock-tab-ai-tutor-btn"
        type="button"
        onClick={() => {
          audioSynth.playGentleFeedback();
          onOpenAITutor();
        }}
        className={`relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px] py-1.5 px-2.5 rounded-xl transition-all group cursor-pointer shrink-0 ${
          isAITutorActive
            ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#C5A059] text-slate-950 font-black shadow-lg shadow-amber-400/25 border border-[#D4AF37] scale-105 ring-2 ring-amber-300/40'
            : 'bg-[#0A1128] hover:bg-[#1C2541] text-slate-200 hover:text-white border border-slate-800/80 shadow-xs'
        }`}
        title="Open Fluentic AI Polyglot Tutor"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 ${
            isAITutorActive ? 'text-slate-950 fill-slate-950/25' : 'text-[#D4AF37] fill-[#D4AF37]/30'
          }`} />
          {isAITutorActive && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
          )}
        </div>
        <span className={`text-[10px] sm:text-[11px] tracking-normal whitespace-nowrap text-center mt-0.5 ${
          isAITutorActive ? 'text-slate-950 font-black' : 'text-slate-200 font-bold'
        }`}>
          AI Tutor
        </span>
      </button>

      {/* All Navigation Tabs: Accessible on all viewports with smooth horizontal scroll */}
      {overflowTabs.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            id={`dock-tab-${item.id}-btn`}
            onClick={() => {
              audioSynth.playGentleFeedback();
              onSelectTab(item.id);
            }}
            className={`flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] py-1.5 px-2 rounded-xl transition-all group cursor-pointer shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-[#1B365D] to-[#0F2137] text-[#D4AF37] font-black shadow-md shadow-blue-950/20 border border-[#C5A059]/40 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={`${item.label} (${item.keyNum})`}
          >
            {item.isProFeature && !isPro && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C5A059] ring-2 ring-white shadow-2xs" />
            )}

            <div className="relative">
              <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 ${
                isActive ? 'text-[#D4AF37]' : ''
              }`} />
            </div>

            <span className={`text-[10px] sm:text-[11px] font-bold tracking-normal whitespace-nowrap text-center mt-0.5 ${
              isActive ? 'text-[#D4AF37]' : 'text-slate-700'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Focus Audio Toggle (Hidden on small viewports) */}
      {onToggleSoundscape && (
        <div className="hidden md:flex items-center">
          <div className="h-6 w-[1px] bg-slate-200 mx-1 shrink-0" />
          <button
            id="dock-toggle-binaural-btn"
            type="button"
            onClick={() => {
              audioSynth.playGentleFeedback();
              onToggleSoundscape();
            }}
            title={
              soundscapeMode && soundscapeMode !== 'mute'
                ? `Focus Audio Active (${soundscapeMode}) • Tap to Mute`
                : 'Toggle Alpha-Wave Focus Audio'
            }
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] py-1.5 px-2 rounded-xl transition-all group cursor-pointer shrink-0 ${
              soundscapeMode && soundscapeMode !== 'mute'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <div className="relative">
              {soundscapeMode && soundscapeMode !== 'mute' ? (
                <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-tight whitespace-nowrap text-center mt-0.5">
              {soundscapeMode && soundscapeMode !== 'mute' ? 'Audio ON' : 'Focus'}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

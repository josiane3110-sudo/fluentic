import React, { useEffect } from 'react';
import { 
  Home,
  Sparkles, 
  Mic, 
  MessageSquare, 
  Layers, 
  Calendar, 
  Crown,
  Zap,
  BookOpen,
  Volume2,
  VolumeX
} from 'lucide-react';
import { NavigationTab } from '../types';
import { audioSynth } from '../services/audioSynthesizer';
import { getI18n } from '../services/localization';

interface OrbitDockProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
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
  color: string;
  isProFeature?: boolean;
}

export const OrbitDock: React.FC<OrbitDockProps> = ({
  activeTab,
  onSelectTab,
  isPro,
  nativeLanguageCode = 'nl',
  soundscapeMode = 'mute',
  onToggleSoundscape,
}) => {
  const i18n = getI18n(nativeLanguageCode);

  const dockItems: DockItem[] = [
    { id: 'home', label: i18n.navHome, icon: Home, keyNum: '1', color: 'hover:text-blue-600' },
    { id: 'syllabus', label: i18n.navPath, icon: Sparkles, keyNum: '2', color: 'hover:text-blue-600' },
    { id: 'speech-lab', label: i18n.navSpeechLab, icon: Mic, keyNum: '3', color: 'hover:text-blue-600' },
    { id: 'dialogue-theatre', label: i18n.navDialogue, icon: MessageSquare, keyNum: '4', color: 'hover:text-indigo-600' },
    { id: 'grammar-module', label: i18n.navGrammar, icon: BookOpen, keyNum: '5', color: 'hover:text-indigo-600' },
    { id: 'speed-test', label: i18n.navSpeedTest, icon: Zap, keyNum: '6', color: 'hover:text-amber-600' },
    { id: 'daily-disciplines', label: i18n.navDisciplines, icon: Calendar, keyNum: '7', color: 'hover:text-orange-600' },
    { id: 'pro-studio', label: i18n.navPro, icon: Crown, keyNum: '8', color: 'hover:text-amber-500' },
  ];

  // Listen for keyboard keys 1-9
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < dockItems.length) {
        e.preventDefault();
        audioSynth.playGentleFeedback();
        onSelectTab(dockItems[keyIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTab, dockItems]);

  return (
    <nav
      id="fluentic-spatial-orbit-dock"
      aria-label="Bottom spatial orbit dock"
      className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 px-2 sm:px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 flex items-center gap-1.5 sm:gap-2 max-w-[96vw] overflow-x-auto scrollbar-none text-slate-800"
    >
      {dockItems.map((item) => {
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
            className={`relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] py-1.5 px-2 rounded-xl transition-all group cursor-pointer shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-md shadow-blue-500/30 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={`${item.label} (Press ${item.keyNum})`}
          >
            {item.isProFeature && !isPro && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white shadow-xs" />
            )}

            <div className="relative">
              <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 ${
                isActive ? 'text-white' : ''
              }`} />
            </div>

            <span className={`text-[10px] sm:text-[11px] font-bold tracking-normal whitespace-nowrap text-center mt-0.5 ${
              isActive ? 'text-white' : 'text-slate-700'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {onToggleSoundscape && (
        <>
          <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />
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
                : 'Toggle Alpha-Wave (10Hz) Binaural Focus Audio'
            }
            className={`relative flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] py-1.5 px-2 rounded-xl transition-all group cursor-pointer shrink-0 ${
              soundscapeMode && soundscapeMode !== 'mute'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <div className="relative">
              {soundscapeMode && soundscapeMode !== 'mute' ? (
                <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-hover:text-slate-600" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-tight whitespace-nowrap text-center mt-0.5">
              {soundscapeMode && soundscapeMode !== 'mute' ? 'Audio ON' : 'Focus'}
            </span>
          </button>
        </>
      )}
    </nav>
  );
};

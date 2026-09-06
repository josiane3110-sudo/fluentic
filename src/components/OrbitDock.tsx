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
  BookOpen
} from 'lucide-react';
import { NavigationTab } from '../types';
import { audioSynth } from '../services/audioSynthesizer';
import { getI18n } from '../services/localization';

interface OrbitDockProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isPro: boolean;
  nativeLanguageCode?: string;
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
}) => {
  const i18n = getI18n(nativeLanguageCode);

  const dockItems: DockItem[] = [
    { id: 'home', label: i18n.navHome, icon: Home, keyNum: '1', color: 'hover:text-blue-600' },
    { id: 'syllabus', label: i18n.navPath, icon: Sparkles, keyNum: '2', color: 'hover:text-blue-600' },
    { id: 'speech-lab', label: i18n.navSpeechLab, icon: Mic, keyNum: '3', color: 'hover:text-blue-600' },
    { id: 'dialogue-theatre', label: i18n.navDialogue, icon: MessageSquare, keyNum: '4', color: 'hover:text-indigo-600' },
    { id: 'grammar-module', label: i18n.navGrammar, icon: BookOpen, keyNum: '5', color: 'hover:text-indigo-600' },
    { id: 'speed-test', label: i18n.navSpeedTest, icon: Zap, keyNum: '6', color: 'hover:text-amber-600' },
    { id: 'fsrs-vault', label: i18n.navVault, icon: Layers, keyNum: '7', color: 'hover:text-emerald-600' },
    { id: 'daily-disciplines', label: i18n.navDisciplines, icon: Calendar, keyNum: '8', color: 'hover:text-orange-600' },
    { id: 'pro-studio', label: i18n.navPro, icon: Crown, keyNum: '9', color: 'hover:text-amber-500' },
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
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 px-2 sm:px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 flex items-center gap-1 sm:gap-1.5 max-w-[98vw] overflow-x-auto scrollbar-none text-slate-800"
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
            className={`relative flex flex-col items-center justify-center min-w-[48px] sm:min-w-[58px] py-1 px-1.5 rounded-xl transition-all group cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-md shadow-blue-500/30 scale-105'
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

            <span className={`text-[10px] sm:text-[11px] font-bold tracking-tight truncate max-w-[56px] text-center mt-0.5 ${
              isActive ? 'text-white' : 'text-slate-600'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

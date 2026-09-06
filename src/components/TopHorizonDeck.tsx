import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Crown, 
  Flame, 
  Gem, 
  Headphones, 
  Volume2, 
  VolumeX, 
  Orbit, 
  LayoutGrid, 
  GitCommit, 
  ChevronDown, 
  Check, 
  Sliders, 
  User, 
  Sparkles,
  ShieldCheck,
  X,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Language, CefrLevel, SpatialViewMode, UserProfile } from '../types';
import { WORLD_LANGUAGES } from '../data/languages';
import { audioSynth } from '../services/audioSynthesizer';
import { FluenticLogo } from './FluenticLogo';
import { getI18n } from '../services/localization';

interface TopHorizonDeckProps {
  user: UserProfile;
  activeLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  activeCefr: CefrLevel;
  onSelectCefr: (cefr: CefrLevel) => void;
  activeDialect: string;
  onSelectDialect: (dialect: string) => void;
  spatialMode: SpatialViewMode;
  onSelectSpatialMode: (mode: SpatialViewMode) => void;
  soundscapeMode: 'alpha' | 'cosmic' | 'rain' | 'mute';
  onSelectSoundscape: (mode: 'alpha' | 'cosmic' | 'rain' | 'mute') => void;
  onOpenSpotlight: () => void;
  onOpenAuthModal: () => void;
  onOpenProModal: () => void;
  onRetakePlacement?: () => void;
}

export const TopHorizonDeck: React.FC<TopHorizonDeckProps> = ({
  user,
  activeLanguage,
  onSelectLanguage,
  activeCefr,
  onSelectCefr,
  activeDialect,
  onSelectDialect,
  spatialMode,
  onSelectSpatialMode,
  soundscapeMode,
  onSelectSoundscape,
  onOpenSpotlight,
  onOpenAuthModal,
  onOpenProModal,
  onRetakePlacement,
}) => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);
  const [isDialectDropdownOpen, setIsDialectDropdownOpen] = useState(false);
  const [volume, setVolume] = useState(0.4);

  // Level Locked Modal State
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [attemptedLevel, setAttemptedLevel] = useState<CefrLevel>('A2');

  const i18n = getI18n(user?.nativeLanguageCode || 'nl');
  const unlockedLevels = user?.unlockedCefrLevels || ['A1'];

  const filteredLanguages = WORLD_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.family.toLowerCase().includes(langSearch.toLowerCase())
  );

  const handleLevelClick = (lvl: CefrLevel) => {
    if (unlockedLevels.includes(lvl)) {
      audioSynth.playGentleFeedback();
      onSelectCefr(lvl);
    } else {
      audioSynth.playGentleFeedback();
      setAttemptedLevel(lvl);
      setIsLockedModalOpen(true);
    }
  };

  return (
    <>
      <header
        id="fluentic-top-horizon-deck"
        className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xs transition-all"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="fluentic-brand-logo-btn"
              onClick={onOpenSpotlight}
              className="flex items-center group cursor-pointer focus:outline-none"
              title="Fluentic"
            >
              <FluenticLogo variant="horizontal" size="sm" showBadge={false} />
            </button>

            {/* Target Language Button */}
            <button
              id="top-language-selector-btn"
              onClick={() => setIsLangModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 transition-all text-xs sm:text-sm font-bold shadow-xs hover:border-blue-500 cursor-pointer"
            >
              <span className="text-base sm:text-lg leading-none">{activeLanguage.flag}</span>
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{activeLanguage.name}</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[10px] sm:text-xs font-black text-blue-800 border border-blue-200">
                {activeCefr}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dialect Selector Dropdown (if available) */}
            {activeLanguage.dialects && activeLanguage.dialects.length > 0 && (
              <div className="relative hidden md:block">
                <button
                  id="top-dialect-selector-btn"
                  onClick={() => setIsDialectDropdownOpen(!isDialectDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 cursor-pointer"
                >
                  <span className="max-w-[110px] truncate">{activeDialect || activeLanguage.dialects[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isDialectDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-40 text-slate-900">
                    <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {i18n.selectDialect}
                    </p>
                    {activeLanguage.dialects.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          onSelectDialect(d);
                          setIsDialectDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-blue-50 text-slate-700 hover:text-blue-900 cursor-pointer"
                      >
                        <span className="truncate">{d}</span>
                        {(activeDialect === d || (!activeDialect && d === activeLanguage.dialects![0])) && (
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Placement Test Retake Button */}
          {onRetakePlacement && (
            <button
              onClick={() => onRetakePlacement()}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{i18n.retakeTest}</span>
            </button>
          )}

          {/* Right Section: Streak, Gems, Soundscape & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Streak Counter */}
            <div
              id="top-deck-streak-pill"
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black shadow-2xs"
              title={`${user?.streakDays || 0} ${i18n.streak}`}
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{user?.streakDays || 0}</span>
            </div>

            {/* Gems Counter */}
            <div
              id="top-deck-gems-pill"
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black shadow-2xs"
              title={`${user?.gems || 0} ${i18n.gems}`}
            >
              <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 fill-blue-500" />
              <span>{user?.gems || 0}</span>
            </div>

            {/* Ambient Soundscape Controller */}
            <div className="relative">
              <button
                id="top-deck-soundscape-btn"
                onClick={() => setIsSoundMenuOpen(!isSoundMenuOpen)}
                className={`p-2 rounded-xl transition-all border cursor-pointer ${
                  soundscapeMode !== 'mute'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
                }`}
                title={i18n.soundscape}
              >
                {soundscapeMode !== 'mute' ? (
                  <Headphones className="w-4 h-4 text-blue-600 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {isSoundMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 text-slate-900">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      {i18n.soundscape}
                    </span>
                    <button
                      onClick={() => setIsSoundMenuOpen(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {[
                      { id: 'mute', label: 'Stil / Gedempt' },
                      { id: 'alpha', label: 'Binaurale Alpha Golven (10Hz)' },
                      { id: 'cosmic', label: 'Kosmische Harmonie (432Hz)' },
                      { id: 'rain', label: 'Warme Zachte Regen' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          audioSynth.playGentleFeedback();
                          onSelectSoundscape(mode.id as any);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                          soundscapeMode === mode.id
                            ? 'bg-blue-50 text-blue-900 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{mode.label}</span>
                        {soundscapeMode === mode.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Auth Trigger */}
            <button
              id="top-deck-profile-btn"
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center">
                {user?.avatar || (user?.name || 'TL').slice(0, 2).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-xs font-bold max-w-[90px] truncate">
                {user?.name || i18n.guestUser}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* LANGUAGE & LEVEL MATRIX MODAL */}
      {isLangModalOpen && (
        <div
          id="fluentic-language-matrix-modal"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLangModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">
                    {i18n.selectLanguage} & ERK-Niveau
                  </h3>
                  <p className="text-xs text-slate-500">
                    55 talen beschikbaar. Niveau wisselen vereist het afleggen van de niveautest.
                  </p>
                </div>
              </div>
              <button
                id="language-matrix-close-btn"
                onClick={() => setIsLangModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level Bar & Search Filter */}
            <div className="p-4 bg-white border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Level Selector with Locks */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-700 mr-1">{i18n.level}:</span>
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CefrLevel[]).map((lvl) => {
                  const isUnlocked = unlockedLevels.includes(lvl);
                  const isCurrent = activeCefr === lvl;

                  return (
                    <button
                      key={lvl}
                      id={`cefr-filter-${lvl}-btn`}
                      onClick={() => handleLevelClick(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isUnlocked
                          ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 hover:border-amber-300 hover:bg-amber-50'
                      }`}
                      title={isUnlocked ? `${lvl} (${i18n.unlocked})` : `${lvl} (${i18n.locked})`}
                    >
                      <span>{lvl}</span>
                      {!isUnlocked && <Lock className="w-3 h-3 text-amber-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Zoek in 55 talen..."
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Language Grid */}
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredLanguages.map((lang) => {
                const isSelected = activeLanguage.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`matrix-lang-${lang.code}-btn`}
                    onClick={() => {
                      audioSynth.playSuccessChime();
                      onSelectLanguage(lang);
                      setIsLangModalOpen(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-white hover:bg-blue-50/40 border-slate-200 hover:border-blue-300 text-slate-900'
                    }`}
                  >
                    <span className="text-2xl leading-none mt-0.5">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-black text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {lang.name}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {lang.family}
                        </span>
                      </div>
                      <div className={`text-xs font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {lang.nativeName}
                      </div>
                      <div className={`text-[11px] truncate mt-1 italic ${isSelected ? 'text-blue-100' : 'text-blue-600/80'}`}>
                        "{lang.sampleGreeting}"
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Alle 55 talen beschikbaar zonder hartjesbeperkingen</span>
              </div>
              <span className="font-bold text-blue-600">55 Talen Klaar</span>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL LOCKED WARNING MODAL */}
      {isLockedModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsLockedModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 text-slate-900 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                Niveau {attemptedLevel} is Vergrendeld!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Je kunt niet zomaar naar niveau <strong>{attemptedLevel}</strong> wisselen zonder de niveautest af te leggen, zelfs niet na het inloggen. 
                Doe de gestandaardiseerde 10-vragen niveautest om je niveau te kwalificeren!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>De test toetst 10 treden van de ERK-ladder (A1 t/m C2).</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLockedModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                {i18n.close}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLockedModalOpen(false);
                  setIsLangModalOpen(false);
                  if (onRetakePlacement) onRetakePlacement();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{i18n.takeTestNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

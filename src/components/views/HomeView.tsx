import React, { useState } from 'react';
import { 
  Flame, 
  Gem, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  MessageSquare,
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Target,
  Check,
  Clock,
  Crown,
  HelpCircle
} from 'lucide-react';
import { UserProfile, Language, NavigationTab } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface HomeViewProps {
  user: UserProfile;
  activeLanguage: Language;
  onNavigate: (tab: NavigationTab) => void;
  onStartNextLesson: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress: number;
  isUnlocked: boolean;
  rewardXp: number;
  rewardGems: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  activeLanguage,
  onNavigate,
  onStartNextLesson,
  onUpdateUser,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  const completedLessonsCount = user.completedNodeIds?.length || 0;
  const streak = user.streakDays || 0;
  const gems = user.gems || 0;
  const claimedAchievements = user.claimedAchievements || [];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Curated achievement milestones
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: isDutch ? 'Eerste Stap' : 'First Step',
      description: isDutch 
        ? 'Voltooi je eerste les op het leerpad.' 
        : 'Complete your first interactive lesson.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-500',
      progress: completedLessonsCount >= 1 ? 100 : 0,
      isUnlocked: completedLessonsCount >= 1,
      rewardXp: 50,
      rewardGems: 15,
    },
    {
      id: 'streak-ignited',
      title: isDutch ? 'Reeks Ontstoken' : 'Streak Spark',
      description: isDutch 
        ? 'Houd een actieve dagelijkse leerreeks vast.' 
        : 'Maintain an active daily learning streak.',
      icon: Flame,
      color: 'from-orange-500 to-amber-500',
      progress: streak >= 1 ? 100 : 0,
      isUnlocked: streak >= 1,
      rewardXp: 40,
      rewardGems: 15,
    },
    {
      id: 'dialogue-master',
      title: isDutch ? 'Dialoog Meester' : 'Scenario Master',
      description: isDutch 
        ? 'Oefen real-time scenario gesprekken in Dialogue Theatre.' 
        : 'Practice real-time roleplay dialogues in Dialogue Theatre.',
      icon: MessageSquare,
      color: 'from-emerald-500 to-teal-500',
      progress: Math.min(100, Math.round((completedLessonsCount * 5 / 20) * 100)),
      isUnlocked: completedLessonsCount >= 1,
      rewardXp: 80,
      rewardGems: 25,
    },
    {
      id: 'polyglot-pioneer',
      title: isDutch ? 'ERK Kwalificatie' : 'CEFR Qualified',
      description: isDutch 
        ? 'Kwalificeer je ERK-niveau via de niveautest.' 
        : 'Complete your standardized CEFR assessment.',
      icon: Trophy,
      color: 'from-purple-500 to-indigo-500',
      progress: user.hasCompletedOnboarding ? 100 : 0,
      isUnlocked: Boolean(user.hasCompletedOnboarding),
      rewardXp: 120,
      rewardGems: 30,
    },
  ];

  // Single press handler for achievements
  const handleSinglePressAchievement = (ach: Achievement) => {
    const isClaimed = claimedAchievements.includes(ach.id);

    if (ach.isUnlocked && !isClaimed) {
      // Claim reward with 1 press!
      audioSynth.playSuccessChime();
      const nextClaimed = [...claimedAchievements, ach.id];
      const updatedUser: UserProfile = {
        ...user,
        xp: (user.xp || 0) + ach.rewardXp,
        gems: (user.gems || 0) + ach.rewardGems,
        claimedAchievements: nextClaimed,
      };

      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      showToast(
        isDutch 
          ? `🎉 ${ach.title} Geclaimd! +${ach.rewardXp} XP, +${ach.rewardGems} 💎`
          : `🎉 ${ach.title} Claimed! +${ach.rewardXp} XP, +${ach.rewardGems} 💎`
      );
    } else if (isClaimed) {
      audioSynth.playGentleFeedback();
      showToast(
        isDutch 
          ? `✓ ${ach.title} is al geclaimd!`
          : `✓ ${ach.title} is already claimed!`
      );
    } else {
      audioSynth.playGentleFeedback();
      showToast(
        isDutch 
          ? `ℹ️ Nog niet ontgrendeld: ${ach.description}`
          : `ℹ️ Not yet unlocked: ${ach.description}`
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 py-3 sm:py-5 space-y-4 sm:space-y-5 pb-20">
      
      {/* Toast Notification for Single-Press Actions */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white font-bold text-xs shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Compact Streamlined Hero Card */}
      <section 
        id="fluentic-hero-welcome-card"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-4 sm:p-5 shadow-lg shadow-blue-500/15"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-blue-100 flex items-center gap-1 border border-white/20 whitespace-nowrap">
                <span>{activeLanguage.flag}</span>
                <span>{activeLanguage.name}</span>
                <span>•</span>
                <span>{user.activeCefr || 'A1'}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-orange-400/25 text-orange-200 flex items-center gap-1 border border-orange-300/30 whitespace-nowrap">
                <Flame className="w-3 h-3 text-orange-300" />
                <span>{streak} {isDutch ? 'dagen' : 'days'}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/25 text-emerald-200 flex items-center gap-1 border border-emerald-300/30 whitespace-nowrap">
                <Clock className="w-3 h-3 text-emerald-300" />
                <span>{user.totalPracticeMinutes || 0}m {isDutch ? 'praktijk' : 'practice'}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-normal text-white leading-tight truncate">
              {isDutch ? `Welkom, ${user.name || 'Taalstudent'}!` : `Welcome, ${user.name || 'Explorer'}!`}
            </h1>

            <p className="text-xs text-blue-100/90 font-normal leading-normal truncate">
              {isDutch
                ? `Je leert ${activeLanguage.name} vanuit het Nederlands.`
                : `Learning ${activeLanguage.name} with active progress.`}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
            <button
              id="home-start-next-lesson-btn"
              onClick={() => {
                audioSynth.playSuccessChime();
                onStartNextLesson();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>{i18n.startNextLesson}</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Compact 2-Col Dashboard Row (Daily Quests + Streak Shield) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Left: Compact Daily Quests (takes 2 cols on md) */}
        <div className="md:col-span-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 sm:p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-normal">
                {i18n.dailyQuests}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              +{gems} 💎 {i18n.gems.toLowerCase()}
            </span>
          </div>

          {/* Compact Quest Items */}
          <div className="space-y-1.5">
            {[
              {
                id: 'q1',
                title: isDutch ? '15 minuten intensief leren' : '15 min practice',
                progress: 0,
                max: 15,
                unit: 'min',
                rewardGems: 5,
              },
              {
                id: 'q2',
                title: isDutch ? 'Speaking uitspraakscore (puntuación)' : 'Speaking pronunciation',
                progress: 0,
                max: 100,
                unit: '%',
                rewardGems: 10,
              },
              {
                id: 'q3',
                title: isDutch ? '1 Conversatie in Dialogue Theatre' : '1 Dialogue Theatre scenario',
                progress: 0,
                max: 1,
                unit: 'scenario',
                rewardGems: 10,
              },
            ].map((q) => {
              const isCompleted = q.progress >= q.max;
              return (
                <div
                  key={q.id}
                  className="px-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 mb-1">
                      <span className="truncate pr-2">{q.title}</span>
                      <span className="text-slate-500 shrink-0 whitespace-nowrap font-medium">
                        {q.progress}/{q.max} {q.unit}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (q.progress / q.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCompleted ? (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1 whitespace-nowrap">
                        <Check className="w-3 h-3" />
                        <span>{i18n.completed}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200 whitespace-nowrap">
                        +{q.rewardGems} 💎
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Streak & Shield Card */}
        <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 sm:p-4 shadow-xs flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 tracking-normal">
                    {streak} {isDutch ? 'Dagen Reeks' : 'Day Streak'}
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                {user.streakProtected ? (isDutch ? 'Beschermd' : 'Protected') : (isDutch ? 'Actief' : 'Active')}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug">
              {isDutch 
                ? 'Oefen elke dag om je reeks levend te houden en extra edelstenen te verdienen.'
                : 'Practice every day to keep your learning streak burning and earn bonus gems.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('daily-disciplines')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-all text-center cursor-pointer"
          >
            {isDutch ? 'Bekijk Reeks & Doelen' : 'View Goals & Streaks'}
          </button>
        </div>
      </div>

      {/* Interactive Currency & Metrics Purpose Explainer: Tells the user what they are used for */}
      <section 
        id="home-currency-guide"
        className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-4 shadow-xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{isDutch ? 'Waarvoor worden Gems, Reeksen & XP gebruikt?' : 'What are Gems, Streaks & XP used for?'}</span>
          </h4>
          <span className="text-[11px] font-bold text-slate-400">Account Guide</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold text-blue-900">
              <Gem className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>💎 Gems ({gems})</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>{isDutch ? 'Gebruikt voor:' : 'Used for:'}</strong> {isDutch 
                ? 'Koop Streak Shields (50 💎) om je reeks te beschermen bij afwezigheid, ontgrendel Pro AI-scenario\'s en vraag spraakfeedback aan.'
                : 'Buy Streak Freeze Shields (50 💎) so you never lose your progress if you miss a day, unlock Pro generative AI dialogues, and access detailed accent surgery.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100 space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold text-orange-900">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span>🔥 {isDutch ? 'Dagelijkse Reeks' : 'Day Streak'} ({streak}d)</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>{isDutch ? 'Gebruikt voor:' : 'Used for:'}</strong> {isDutch
                ? 'Meet je aaneengesloten dagen van studie. Mijlpalen (7, 14, 30 dagen) belonen je met gratis bonus-edelstenen.'
                : 'Measures your uninterrupted consecutive practice days. 7, 14, and 30-day milestones award free bonus gems and cement fluency.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold text-indigo-900">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>⭐ {isDutch ? 'Ervaringspunten (XP)' : 'Experience (XP)'} ({user.xp || 0})</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>{isDutch ? 'Gebruikt voor:' : 'Used for:'}</strong> {isDutch
                ? 'Verhoogt je algehele taalvaardigheidslevel en kwalificeert je voor hogere ERK-niveaus (A1 t/m C2).'
                : 'Cumulative language fluency progress. XP unlocks advanced grammar tiers and advances your CEFR qualification level.'}
            </p>
          </div>
        </div>
      </section>

      {/* Dedicated Pro Studio & Real Payment Plan Section */}
      <section 
        id="home-pro-studio-banner"
        className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 sm:p-5 shadow-lg shadow-orange-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-amber-100 border border-white/20">
            <Crown className="w-3.5 h-3.5 fill-white text-white" />
            <span>Fluentic Pro Studio • Real Payment Plans</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            {isDutch ? 'Upgrade naar Pro Studio & Echte Betalingsplannen' : 'Upgrade to Pro Studio & Real Payment Plans'}
          </h3>
          <p className="text-xs text-amber-100/95 max-w-xl leading-relaxed">
            {isDutch 
              ? 'Onbeperkte AI Polyglot Tutor spraakinteractie, accentcorrectie, C1/C2 mastermodules en permanente Streak Freeze bescherming. Vanaf $9.99/mnd of Levenslang lidmaatschap met veilige 256-bit betaling.'
              : 'Unlimited AI Polyglot Tutor voice conversations, acoustic accent coaching, C1/C2 master modules, and permanent streak shields. From $9.99/mo or Lifetime Polyglot pass with 256-bit encrypted checkout.'}
          </p>
        </div>
        <button
          id="home-open-pro-studio-btn"
          onClick={() => {
            audioSynth.playSuccessChime();
            onNavigate('pro-studio');
          }}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{isDutch ? 'Bekijk Plannen & Pro Studio' : 'View Plans & Pro Studio'}</span>
          <ArrowRight className="w-4 h-4 text-slate-700" />
        </button>
      </section>

      {/* Compact Quick Practice Section */}
      <section className="space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-normal">
          {i18n.quickPractice}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            {
              id: 'speaking',
              title: isDutch ? 'Speaking' : 'Speaking',
              desc: isDutch ? 'Spraakherkenning' : 'Pronunciation',
              icon: Mic,
              color: 'text-blue-600 bg-blue-50 border-blue-200',
              tab: 'speech-lab' as NavigationTab,
            },
            {
              id: 'dialogue',
              title: isDutch ? 'Dialoog' : 'Dialogue Theatre',
              desc: isDutch ? 'AI rollenspellen' : 'Roleplay scenarios',
              icon: MessageSquare,
              color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
              tab: 'dialogue-theatre' as NavigationTab,
            },
            {
              id: 'grammar',
              title: isDutch ? 'Grammatica' : 'Grammar',
              desc: isDutch ? 'Naamvallen & regels' : 'Cases & rules',
              icon: BookOpen,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              tab: 'grammar-module' as NavigationTab,
            },
            {
              id: 'drill',
              title: isDutch ? 'Snelheidstest' : 'Word Drill',
              desc: isDutch ? 'Woordenschat' : 'Rapid practice',
              icon: Zap,
              color: 'text-amber-600 bg-amber-50 border-amber-200',
              tab: 'speed-test' as NavigationTab,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => {
                  audioSynth.playGentleFeedback();
                  onNavigate(card.tab);
                }}
                className="p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-left hover:border-blue-400 hover:shadow-sm transition-all group flex flex-col justify-between cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors truncate">
                    {card.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Single-Press Achievements Section */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-normal">
            {i18n.milestonesAchievements}
          </h3>
          <span className="text-[10px] font-bold text-slate-500">
            {isDutch ? 'Tik 1x om te claimen' : 'Single-press to claim'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            const isClaimed = claimedAchievements.includes(ach.id);
            const canClaim = ach.isUnlocked && !isClaimed;

            return (
              <button
                type="button"
                key={ach.id}
                onClick={() => handleSinglePressAchievement(ach)}
                className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer active:scale-97 ${
                  canClaim
                    ? 'bg-gradient-to-br from-amber-50 to-white border-amber-300 shadow-sm ring-1 ring-amber-300/50'
                    : isClaimed
                    ? 'bg-white border-slate-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-75'
                }`}
                title={canClaim ? (isDutch ? 'Tik om te claimen!' : 'Tap to claim!') : ach.title}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${ach.color} text-white flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {canClaim ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black animate-pulse whitespace-nowrap">
                        {isDutch ? 'Claim!' : 'Claim!'}
                      </span>
                    ) : isClaimed ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-0.5 whitespace-nowrap">
                        <Check className="w-3 h-3" />
                        <span>{isDutch ? 'Geclaimd' : 'Claimed'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        {ach.progress}%
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-xs truncate">
                    {ach.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>+{ach.rewardXp} XP</span>
                  <span className="text-blue-600">+{ach.rewardGems} 💎</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
};

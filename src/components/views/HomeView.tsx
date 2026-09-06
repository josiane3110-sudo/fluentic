import React from 'react';
import { 
  Flame, 
  Gem, 
  Sparkles, 
  Trophy, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  MessageSquare, 
  Layers, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Clock,
  Target,
  Crown
} from 'lucide-react';
import { UserProfile, Language, NavigationTab } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface HomeViewProps {
  user: UserProfile;
  activeLanguage: Language;
  onNavigate: (tab: NavigationTab) => void;
  onStartNextLesson: () => void;
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
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  const completedLessonsCount = user.completedNodeIds?.length || 0;
  const streak = user.streakDays || 0;
  const gems = user.gems || 0;
  const xp = user.xp || 0;

  // Curated achievement milestones in Dutch / native
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: isDutch ? 'Eerste Stap' : 'First Step',
      description: isDutch 
        ? 'Voltooi je eerste les op het Litouwse leerpad.' 
        : 'Complete your first interactive lesson on the path.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-500',
      progress: completedLessonsCount >= 1 ? 100 : 0,
      isUnlocked: completedLessonsCount >= 1,
      rewardXp: 50,
      rewardGems: 10,
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
      id: 'vocab-builder',
      title: isDutch ? 'Woordenschat Meester' : 'Vocab Architect',
      description: isDutch 
        ? 'Beheers 25 Litouwse kernwoorden in de FSRS-kluis.' 
        : 'Master 25 core vocabulary items in the vault.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-500',
      progress: Math.min(100, Math.round((completedLessonsCount * 5 / 25) * 100)),
      isUnlocked: completedLessonsCount >= 5,
      rewardXp: 100,
      rewardGems: 25,
    },
    {
      id: 'polyglot-pioneer',
      title: isDutch ? 'ERK Pionier' : 'CEFR Pioneer',
      description: isDutch 
        ? 'Rond de officiële niveautest af en kwalificeer je niveau.' 
        : 'Complete your CEFR placement assessment.',
      icon: Trophy,
      color: 'from-purple-500 to-indigo-500',
      progress: user.hasCompletedOnboarding ? 100 : 0,
      isUnlocked: user.hasCompletedOnboarding,
      rewardXp: 150,
      rewardGems: 30,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-28">
      {/* Hero Welcome Card */}
      <section 
        id="fluentic-hero-welcome-card"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-bold border border-white/20">
              <span>{activeLanguage.flag}</span>
              <span>{activeLanguage.name} • {user.activeCefr || 'A1'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              {isDutch ? `Labas, ${user.name || 'Taalstudent'}!` : `Welcome back, ${user.name || 'Explorer'}!`}
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              {isDutch
                ? `Je leert Litouws vanuit het Nederlands. Je staat op niveau ${user.activeCefr || 'A1'} met een reeks van ${streak} ${i18n.streak.toLowerCase()}.`
                : `You are learning ${activeLanguage.name} at Level ${user.activeCefr || 'A1'} with an active streak of ${streak} days.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              id="home-start-next-lesson-btn"
              onClick={() => {
                audioSynth.playSuccessChime();
                onStartNextLesson();
              }}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-900 font-black text-sm shadow-lg shadow-black/10 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>{i18n.startNextLesson}</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Daily Quests & Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Daily Quests */}
        <div className="lg:col-span-2 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-200">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{i18n.dailyQuests}</h3>
                <p className="text-xs text-slate-500">
                  {isDutch ? 'Voltooi je dagelijkse doelen om edelstenen en XP te verdienen' : 'Complete goals for gems and XP'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {[
              {
                id: 'q1',
                title: i18n.questPracticeMinutes,
                progress: 10,
                max: 15,
                unit: isDutch ? 'minuten' : 'min',
                rewardXp: 25,
                rewardGems: 5,
              },
              {
                id: 'q2',
                title: i18n.questPerfectPronunciation,
                progress: 1,
                max: 1,
                unit: isDutch ? 'voltooid' : 'done',
                rewardXp: 30,
                rewardGems: 10,
              },
              {
                id: 'q3',
                title: i18n.questReviewCards,
                progress: 6,
                max: 10,
                unit: isDutch ? 'kaarten' : 'cards',
                rewardXp: 20,
                rewardGems: 5,
              },
            ].map((q) => {
              const isCompleted = q.progress >= q.max;
              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="truncate">{q.title}</span>
                      <span className="text-slate-500 shrink-0 font-medium">
                        {q.progress}/{q.max} {q.unit}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (q.progress / q.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {i18n.claimed}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                        +{q.rewardGems} 💎
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Streak & Reeks Schild */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-200">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{streak} {i18n.currentStreakDays}</h3>
                <p className="text-xs text-slate-500">
                  {isDutch ? 'Houd je reeks actief door elke dag te oefenen' : 'Practice daily to keep streak alive'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-orange-950">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  {i18n.streakProtectedBadge}
                </span>
                <span className="font-extrabold text-orange-700">
                  {user.streakProtected ? (isDutch ? 'Actief' : 'Active') : (isDutch ? 'Niet Actief' : 'Inactive')}
                </span>
              </div>
              <p className="text-[11px] text-orange-800 leading-relaxed">
                {isDutch 
                  ? 'Een reeks-schild beschermt je score als je een dag mist.'
                  : 'Streak shields protect your streak if you miss a study session.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('daily-disciplines')}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
          >
            {isDutch ? 'Bekijk Reeks & Doelen' : 'View Streaks & Goals'}
          </button>
        </div>
      </div>

      {/* Quick Practice Modules */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">{i18n.quickPractice}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'speech-lab',
              title: i18n.speakingDrill,
              desc: isDutch ? 'Oefen Litouwse zinnen met spraakherkenning' : 'Speak phrases with real-time feedback',
              icon: Mic,
              color: 'text-blue-600 bg-blue-50 border-blue-200',
              tab: 'speech-lab' as NavigationTab,
            },
            {
              id: 'fsrs-vault',
              title: i18n.flashcardVault,
              desc: isDutch ? 'Slimme gespreide herhaling van woorden' : 'Smart spaced repetition flashcards',
              icon: Layers,
              color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
              tab: 'fsrs-vault' as NavigationTab,
            },
            {
              id: 'grammar-module',
              title: i18n.grammarGuide,
              desc: isDutch ? 'De 7 naamvallen en werkwoordsvormen' : 'Explore the 7 cases and conjugations',
              icon: BookOpen,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              tab: 'grammar-module' as NavigationTab,
            },
            {
              id: 'speed-test',
              title: i18n.speedChallenge,
              desc: isDutch ? 'Ongedateerde woorddril op je eigen tempo' : 'Untimed rapid vocabulary drill',
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
                className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 text-left hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-blue-600 gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{isDutch ? 'Oefenen' : 'Practice'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Milestones & Achievements */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">{i18n.milestonesAchievements}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className={`p-5 rounded-3xl border transition-all ${
                  ach.isUnlocked
                    ? 'bg-white border-blue-200 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${ach.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {ach.isUnlocked && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {i18n.completed}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-3">{ach.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>+{ach.rewardXp} XP</span>
                  <span className="text-blue-600">+{ach.rewardGems} 💎</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

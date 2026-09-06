import React, { useState } from 'react';
import { 
  CefrLevel, 
  Language, 
  UserProfile 
} from '../types';
import { WORLD_LANGUAGES } from '../data/languages';
import { audioSynth } from '../services/audioSynthesizer';
import { 
  PlacementAssessmentEngine, 
  PlacementTestQuestion,
  PlacementQuestionOption
} from '../services/placementTestService';
import { getI18n } from '../services/localization';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  GraduationCap, 
  ShieldCheck, 
  Flame, 
  Target,
  Layers,
  HelpCircle,
  Award
} from 'lucide-react';

interface OnboardingPlacementViewProps {
  initialProfile?: UserProfile;
  onComplete: (profile: UserProfile, targetLanguage: Language, assessedCefr: CefrLevel) => void;
}

export const OnboardingPlacementView: React.FC<OnboardingPlacementViewProps> = ({
  initialProfile,
  onComplete,
}) => {
  // Step 1: Profile & Language Setup, Step 2: 10-Question Placement Test, Step 3: Assessment Results
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // User details
  const [name, setName] = useState(initialProfile?.name || '');
  const [nativeLanguageCode, setNativeLanguageCode] = useState(initialProfile?.nativeLanguageCode || 'nl');
  const [targetLanguageCode, setTargetLanguageCode] = useState(initialProfile?.activeLanguageCode || 'lt');
  const [targetPace, setTargetPace] = useState<'casual' | 'dedicated' | 'intensive'>('dedicated');

  // Placement Test State
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [assessedLevel, setAssessedLevel] = useState<CefrLevel>('A1');
  const [unlockedLevels, setUnlockedLevels] = useState<CefrLevel[]>(['A1']);
  const [diagnosisText, setDiagnosisText] = useState('');

  // Localized dictionary based on chosen native language (Dutch when nl)
  const i18n = getI18n(nativeLanguageCode);

  const targetLanguage = WORLD_LANGUAGES.find((l) => l.code === targetLanguageCode) || 
    WORLD_LANGUAGES.find((l) => l.code === 'lt') || 
    WORLD_LANGUAGES[0];

  // Active Placement Test Variant
  const currentTest = PlacementAssessmentEngine.getPlacementTest(
    targetLanguage.code,
    targetLanguage.name,
    selectedVariant,
    nativeLanguageCode
  );

  const currentQuestion: PlacementTestQuestion = currentTest.questions[currentQIndex] || currentTest.questions[0];

  // Step 1 -> Step 2: Start the Placement Test
  const handleStartPlacementTest = () => {
    if (!name.trim()) {
      setName(nativeLanguageCode === 'nl' ? 'Taalstudent' : 'Polyglot Explorer');
    }
    audioSynth.playSuccessChime();
    setCurrentQIndex(0);
    setSelectedOptionKey(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStep(2);
  };

  // Switch Variant (A, B, C, D)
  const handleSelectVariant = (variant: 'A' | 'B' | 'C' | 'D') => {
    audioSynth.playGentleFeedback();
    setSelectedVariant(variant);
    setCurrentQIndex(0);
    setSelectedOptionKey(null);
    setIsAnswerChecked(false);
    setScore(0);
  };

  // Check Answer
  const handleCheckAnswer = () => {
    if (!selectedOptionKey || isAnswerChecked) return;

    const isCorrect = selectedOptionKey === currentQuestion.correct_key;
    setIsAnswerChecked(true);

    if (isCorrect) {
      audioSynth.playSuccessChime();
      setScore((prev) => prev + 1);
    } else {
      audioSynth.playGentleFeedback();
    }
  };

  // Next Question or Finish
  const handleNextQuestion = () => {
    audioSynth.playGentleFeedback();

    if (currentQIndex + 1 < currentTest.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOptionKey(null);
      setIsAnswerChecked(false);
    } else {
      // Calculate final score & CEFR qualification
      const finalScore = score + (selectedOptionKey === currentQuestion.correct_key && !isAnswerChecked ? 1 : 0);
      const result = PlacementAssessmentEngine.calculateCefrPlacement(finalScore);

      setScore(finalScore);
      setAssessedLevel(result.level);
      setUnlockedLevels(result.unlockedLevels);
      setDiagnosisText(result.diagnosis);
      setStep(3);
      audioSynth.playTriumphChime();
    }
  };

  // Complete Onboarding & Launch Application
  const handleFinishAndLaunch = () => {
    audioSynth.playSuccessChime();

    const finalProfile: UserProfile = {
      id: initialProfile?.id || `usr-${Date.now().toString(36)}`,
      name: name.trim() || (nativeLanguageCode === 'nl' ? 'Taalstudent' : 'Explorer'),
      email: initialProfile?.email || 'explorer@fluentic.local',
      avatar: (name.trim() || 'TL').slice(0, 2).toUpperCase(),
      isGuest: true,
      isPro: false,
      hasCompletedOnboarding: true,
      nativeLanguageCode,
      targetPace,
      placementScore: score,
      placementDiagnosis: diagnosisText,
      gems: 120, // Starter gems
      xp: 60, // Starter XP
      level: 1,
      streakDays: 1, // Streak active
      streakShields: 1,
      streakProtected: false,
      completedNodeIds: [],
      nodeCrowns: {},
      dailyGoalMinutes: targetPace === 'casual' ? 10 : targetPace === 'intensive' ? 30 : 15,
      dailyGoalCompleted: false,
      weeklyActivity: [1, 0, 0, 0, 0, 0, 0],
      unlockedAchievements: ['first-step'],
      dailyQuests: [],
      activeLanguageCode: targetLanguage.code,
      activeLanguage: targetLanguage.name,
      activeCefr: assessedLevel,
      unlockedCefrLevels: unlockedLevels,
      soundscapeMode: 'mute',
      soundEffectsEnabled: true,
      dailyGoalXp: targetPace === 'casual' ? 20 : targetPace === 'intensive' ? 100 : 50,
      todayXp: 60,
      lastActiveDate: new Date().toISOString().split('T')[0],
      dailyRituals: {
        speechDrillCompleted: false,
        fsrsReviewCompleted: false,
        scenarioOrDebateCompleted: false,
      },
    };

    onComplete(finalProfile, targetLanguage, assessedLevel);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 z-10">
      {/* Central Card Container with Glassmorphism */}
      <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-blue-200/80 shadow-[0_20px_60px_rgba(30,58,138,0.12)] text-slate-900 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✨</span>
            <span className="text-base font-black tracking-tight text-blue-900 font-sans">
              Fluentic <span className="text-blue-600 font-normal">| {i18n.tagline}</span>
            </span>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2">
            {[
              { num: 1, label: nativeLanguageCode === 'nl' ? 'Profiel & Talen' : 'Profile & Languages' },
              { num: 2, label: nativeLanguageCode === 'nl' ? 'Niveautest (10 Vragen)' : 'Placement Test (10Q)' },
              { num: 3, label: nativeLanguageCode === 'nl' ? 'Kwalificatie' : 'Results' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : step > s.num
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span>{s.num}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: Profile, Native Language, Target Language */}
        {step === 1 && (
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {nativeLanguageCode === 'nl' ? 'Welkom bij Fluentic' : 'Welcome to Fluentic'}
              </h1>
              <p className="text-sm text-slate-600">
                {nativeLanguageCode === 'nl'
                  ? 'Stel je profiel in, kies je moedertaal en de taal die je wilt leren. Daarna doe je de officiële niveautest.'
                  : 'Configure your profile, native language, and target language, followed by your standardized placement test.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-2">
              {/* Nickname Input */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {nativeLanguageCode === 'nl' ? 'Jouw Gebruikersnaam / Roepnaam' : 'Your Nickname'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={nativeLanguageCode === 'nl' ? 'Bijv. Jan, Sophie of Polyglot' : 'e.g. Alex'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 text-sm font-semibold outline-none transition-all shadow-inner"
                />
              </div>

              {/* Native Language (Nederlands / Dutch) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {nativeLanguageCode === 'nl' ? 'Mijn Moedertaal' : 'My Native Language'}
                </label>
                <select
                  value={nativeLanguageCode}
                  onChange={(e) => setNativeLanguageCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 text-sm font-semibold outline-none transition-all cursor-pointer"
                >
                  <option value="nl">🇳🇱 Nederlands (Dutch)</option>
                  <option value="en">🇬🇧 English</option>
                  <option value="de">🇩🇪 Deutsch (German)</option>
                  <option value="fr">🇫🇷 Français (French)</option>
                  <option value="es">🇪🇸 Español (Spanish)</option>
                  <option value="it">🇮🇹 Italiano (Italian)</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  {nativeLanguageCode === 'nl'
                    ? 'Alle instructies, uitleg en vertalingen worden in het Nederlands weergegeven.'
                    : 'All interface prompts and translations will match your native language.'}
                </p>
              </div>

              {/* Target Language to Learn (Lithuanian / Lietuvių) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {nativeLanguageCode === 'nl' ? 'Taal die ik wil leren' : 'Language I Want to Learn'}
                </label>
                <select
                  value={targetLanguageCode}
                  onChange={(e) => setTargetLanguageCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 text-sm font-semibold outline-none transition-all cursor-pointer"
                >
                  {WORLD_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-blue-700 font-medium">
                  {nativeLanguageCode === 'nl' && targetLanguageCode === 'lt'
                    ? '🇱🇹 Litouws geselecteerd: alleen Litouws en Nederlands in de hele app!'
                    : `Geselecteerd: ${targetLanguage.name}`}
                </p>
              </div>

              {/* Learning Pace */}
              <div className="md:col-span-2 space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {nativeLanguageCode === 'nl' ? 'Dagelijks Leertempo' : 'Learning Pace'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'casual', label: nativeLanguageCode === 'nl' ? 'Rustig' : 'Casual', time: '10 min/dag' },
                    { id: 'dedicated', label: nativeLanguageCode === 'nl' ? 'Toegewijd' : 'Dedicated', time: '15 min/dag' },
                    { id: 'intensive', label: nativeLanguageCode === 'nl' ? 'Intensief' : 'Intensive', time: '30 min/dag' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTargetPace(p.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        targetPace === p.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-black">{p.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mandatory Placement Notice */}
            <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  {nativeLanguageCode === 'nl' ? 'Verplichte Niveautest: ' : 'Standardized Placement Test: '}
                </span>
                {nativeLanguageCode === 'nl'
                  ? 'Je kunt niet zomaar van niveau wisselen zonder de niveautest af te leggen. De test telt 10 vragen op de officiële ERK-ladder (A1 t/m C2).'
                  : 'Learners must complete the 10-question standardized placement test across the CEFR ladder to qualify and unlock learning levels.'}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleStartPlacementTest}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>{nativeLanguageCode === 'nl' ? 'Start Niveautest (10 Vragen)' : 'Begin Placement Test (10Q)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Standardized 10-Question Placement Test */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{targetLanguage.flag}</span>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    {targetLanguage.name} ({targetLanguage.nativeName})
                  </h2>
                  <p className="text-xs text-slate-500">
                    {nativeLanguageCode === 'nl' 
                      ? `ERK Niveautest • Vraag ${currentQIndex + 1} van ${currentTest.questions.length}` 
                      : `CEFR Placement Ladder • Question ${currentQIndex + 1} of ${currentTest.questions.length}`}
                  </p>
                </div>
              </div>

              {/* 4 Variants Selector (Variant A, B, C, D) */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 px-2">
                  {nativeLanguageCode === 'nl' ? 'Variant:' : 'Variant:'}
                </span>
                {(['A', 'B', 'C', 'D'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleSelectVariant(v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      selectedVariant === v
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / currentTest.questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="space-y-4 pt-1">
              {/* CEFR Rung Badge & Skill Tested */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-extrabold border border-blue-200 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>{currentQuestion.level}</span>
                </span>
                <span className="font-semibold text-slate-500">
                  {currentQuestion.target_skill}
                </span>
              </div>

              {/* Prompt in Native Target Language & Parenthesized Dutch Translation */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/70 border border-blue-100 space-y-2">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.prompt_native}
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
                  ({currentQuestion.prompt_translation})
                </p>
              </div>

              {/* Options (A, B, C, D) with Target Language & Dutch Translation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options.map((opt: PlacementQuestionOption) => {
                  const isSelected = selectedOptionKey === opt.key;
                  let cardStyle = 'bg-white border-slate-200 hover:border-blue-300 text-slate-900';

                  if (isAnswerChecked) {
                    if (opt.key === currentQuestion.correct_key) {
                      cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      cardStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-500/20 font-bold';
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={isAnswerChecked}
                      onClick={() => setSelectedOptionKey(opt.key)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {opt.key}
                      </span>
                      <div className="space-y-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 break-words">
                          {opt.text_native}
                        </div>
                        <div className="text-xs text-slate-500 italic break-words">
                          ({opt.text_translation})
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-600">
                {nativeLanguageCode === 'nl' ? `Score: ${score} goed` : `Score: ${score} correct`}
              </div>

              {!isAnswerChecked ? (
                <button
                  type="button"
                  disabled={!selectedOptionKey}
                  onClick={handleCheckAnswer}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    selectedOptionKey
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {nativeLanguageCode === 'nl' ? 'Controleren' : 'Check Answer'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentQIndex + 1 < currentTest.questions.length
                      ? (nativeLanguageCode === 'nl' ? 'Volgende Vraag' : 'Next Question')
                      : (nativeLanguageCode === 'nl' ? 'Bekijk Resultaat' : 'View Results')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Assessment Results & Level Unlocked */}
        {step === 3 && (
          <div className="p-6 sm:p-8 md:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {nativeLanguageCode === 'nl' ? 'Niveautest Voltooid!' : 'Placement Test Complete!'}
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                {nativeLanguageCode === 'nl'
                  ? `Gefeliciteerd ${name}! Op basis van jouw score van ${score}/10 op de officiële ERK-ladder is jouw niveau vastgesteld.`
                  : `Congratulations ${name}! Based on your score of ${score}/10 on the CEFR ladder, your initial learning tier is confirmed.`}
              </p>
            </div>

            {/* Qualified Level Highlight Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-black tracking-widest text-blue-200">
                  {nativeLanguageCode === 'nl' ? 'Gekwalificeerd ERK-Niveau' : 'Qualified CEFR Level'}
                </div>
                <div className="text-xl font-black">
                  {assessedLevel}
                </div>
              </div>
            </div>

            {/* Diagnosis in Dutch */}
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 font-medium leading-relaxed">
              {diagnosisText}
            </div>

            {/* Unlocked Levels List */}
            <div className="max-w-md mx-auto space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {nativeLanguageCode === 'nl' ? 'Ontgrendelde Niveaus' : 'Unlocked Levels'}
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CefrLevel[]).map((lvl) => {
                  const isUnlocked = unlockedLevels.includes(lvl);
                  return (
                    <span
                      key={lvl}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        isUnlocked
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
                      }`}
                    >
                      {lvl} {isUnlocked ? '✓' : '🔒'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Launch App Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleFinishAndLaunch}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-blue-500/25 flex items-center gap-2 mx-auto transition-all transform active:scale-95 cursor-pointer"
              >
                <span>{nativeLanguageCode === 'nl' ? 'Start met Leren in Fluentic' : 'Launch Learning Studio'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

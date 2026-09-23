import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Flame, 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Timer
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface SpeedTestViewProps {
  activeLanguage: Language;
  user: UserProfile;
  onReward: (xp: number, gems: number) => void;
}

interface DrillItem {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SpeedTestView: React.FC<SpeedTestViewProps> = ({
  activeLanguage,
  user,
  onReward,
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  // Untimed Lithuanian vocabulary & phrase drills with Dutch prompts
  const drillItems: DrillItem[] = [
    {
      prompt: isDutch ? 'Vertaal: "Goedemorgen"' : 'Translate: "Good morning"',
      options: ['Labas rytas', 'Labanakt', 'Viso gero', 'Ačiū'],
      correctIndex: 0,
      explanation: isDutch ? '"Labas rytas" betekent goedemorgen in het Litouws.' : '"Labas rytas" means good morning.'
    },
    {
      prompt: isDutch ? 'Wat betekent "Ačiū"?' : 'What does "Ačiū" mean?',
      options: [
        isDutch ? 'Dank je wel' : 'Thank you',
        isDutch ? 'Alstublieft' : 'Please',
        isDutch ? 'Pardon' : 'Excuse me',
        isDutch ? 'Tot ziens' : 'Goodbye'
      ],
      correctIndex: 0,
      explanation: isDutch ? '"Ačiū" is de universele Litouwse dankbetuiging.' : '"Ačiū" means thank you.'
    },
    {
      prompt: isDutch ? 'Vertaal: "Eén koffie, alstublieft"' : 'Translate: "One coffee, please"',
      options: ['Vieną kavą, prašau', 'Noriu arbatos', 'Kur yra kava', 'Sąskaita prašau'],
      correctIndex: 0,
      explanation: isDutch ? '"Vieną kavą, prašau" is de beleefde bestelling.' : 'Standard cafe request.'
    },
    {
      prompt: isDutch ? 'Kies het Litouwse woord voor "Ja":' : 'Select word for "Yes":',
      options: ['Taip', 'Ne', 'Galbūt', 'Niekada'],
      correctIndex: 0,
      explanation: isDutch ? '"Taip" is ja, "Ne" is nee.' : '"Taip" means yes.'
    },
    {
      prompt: isDutch ? 'Wat betekent "Sąskaitą, prašau"?' : 'What does "Sąskaitą, prašau" mean?',
      options: [
        isDutch ? 'De rekening, alstublieft' : 'The check, please',
        isDutch ? 'De menukaart, graag' : 'The menu, please',
        isDutch ? 'Waar is het toilet?' : 'Where is the restroom?',
        isDutch ? 'Hoe laat is het?' : 'What time is it?'
      ],
      correctIndex: 0,
      explanation: isDutch ? 'Gebruik dit om de rekening te vragen in een Litouws restaurant.' : 'Requesting the bill.'
    },
    {
      prompt: isDutch ? 'Wat betekent "Vanduo"?' : 'What does "Vanduo" mean?',
      options: [
        isDutch ? 'Water' : 'Water',
        isDutch ? 'Brood' : 'Bread',
        isDutch ? 'Koffie' : 'Coffee',
        isDutch ? 'Thee' : 'Tea'
      ],
      correctIndex: 0,
      explanation: isDutch ? '"Vanduo" betekent water.' : '"Vanduo" translates to water.'
    },
    {
      prompt: isDutch ? 'Kies het Litouwse woord voor "Brood":' : 'Select Lithuanian word for "Bread":',
      options: ['Duona', 'Sūris', 'Kava', 'Pienas'],
      correctIndex: 0,
      explanation: isDutch ? '"Duona" is brood, vaak donker roggebrood in Litouwen.' : '"Duona" is traditional bread.'
    },
    {
      prompt: isDutch ? 'Hoe zeg je "Tot ziens"?' : 'How do you say "Goodbye"?',
      options: ['Viso gero', 'Labas rytas', 'Laba diena', 'Prašau'],
      correctIndex: 0,
      explanation: isDutch ? '"Viso gero" is de beleefde afscheidsgroet.' : '"Viso gero" means goodbye.'
    },
    {
      prompt: isDutch ? 'Vertaal: "Ik kom uit Nederland"' : 'Translate: "I am from the Netherlands"',
      options: ['Aš esu iš Nyderlandų', 'Aš gyvenu Vilniuje', 'Mano vardas Jonas', 'Aš kalbu angliškai'],
      correctIndex: 0,
      explanation: isDutch ? '"Aš esu iš Nyderlandų" is de juiste zin.' : 'I am from the Netherlands.'
    },
    {
      prompt: isDutch ? 'Wat betekent "Į dešinę"?' : 'What does "Į dešinę" mean?',
      options: [
        isDutch ? 'Naar rechts' : 'To the right',
        isDutch ? 'Naar links' : 'To the left',
        isDutch ? 'Rechtdoor' : 'Straight ahead',
        isDutch ? 'Stoppen' : 'Stop'
      ],
      correctIndex: 0,
      explanation: isDutch ? '"Į dešinę" = naar rechts, "Į kairę" = naar links.' : '"Į dešinę" means to the right.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mode, setMode] = useState<'untimed' | 'speed'>('untimed');
  const [secondsRemaining, setSecondsRemaining] = useState(45);

  const currentItem = drillItems[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked || isFinished) return;
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    if (idx === currentItem.correctIndex) {
      const newCombo = combo + 1;
      audioSynth.playComboMultiplier(newCombo);
      const newScore = score + 1;
      setScore(newScore);
      setCombo(newCombo);
      if (newCombo > highestCombo) setHighestCombo(newCombo);
    } else {
      audioSynth.playGentleFeedback();
      setCombo(0);
    }
  };

  const handleNext = () => {
    audioSynth.playGentleFeedback();
    if (currentIndex + 1 < drillItems.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      audioSynth.playTriumphChime();
      const xpEarned = score * 10;
      const gemsEarned = Math.round(score * 1.5);
      onReward(xpEarned, gemsEarned);
    }
  };

  const handleRestart = () => {
    audioSynth.playGentleFeedback();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setCombo(0);
    setSecondsRemaining(45);
    setIsFinished(false);
  };

  // Keyboard navigation: 1-4 to pick option, Enter or Space to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (!isAnswerChecked) {
        if (e.key === '1') {
          e.preventDefault();
          handleSelectOption(0);
        } else if (e.key === '2') {
          e.preventDefault();
          handleSelectOption(1);
        } else if (e.key === '3') {
          e.preventDefault();
          handleSelectOption(2);
        } else if (e.key === '4') {
          e.preventDefault();
          handleSelectOption(3);
        }
      } else {
        if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerChecked, currentIndex, currentItem, isFinished, score, combo]);

  // Timed Blitz mode countdown
  useEffect(() => {
    if (mode !== 'speed' || isFinished) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          audioSynth.playTriumphChime();
          const xpEarned = score * 10;
          const gemsEarned = Math.round(score * 1.5);
          onReward(xpEarned, gemsEarned);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isFinished, score]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {mode === 'untimed' ? (isDutch ? 'Woordendril (Zonder Tijd)' : 'Word Drill (Untimed)') : (isDutch ? 'Snelle Blitz (45s)' : 'Speed Blitz (45s)')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isDutch 
              ? 'Oefen Litouwse woorden met interactieve sneltoetsen [1]-[4]' 
              : 'Interactive vocabulary drill with instant keyboard shortcuts [1]-[4]'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('untimed')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                mode === 'untimed' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🌿 {isDutch ? 'Zonder Tijd' : 'Untimed'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('speed');
                setSecondsRemaining(45);
              }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                mode === 'speed' ? 'bg-white shadow-xs text-amber-700' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ⚡ {isDutch ? '45s Blitz' : '45s Blitz'}
            </button>
          </div>

          {mode === 'speed' && (
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${
              secondsRemaining <= 10
                ? 'bg-rose-100 border-rose-300 text-rose-800 animate-pulse'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <Timer className="w-3.5 h-3.5" />
              <span>{secondsRemaining}s</span>
            </div>
          )}

          {/* Combo Pill */}
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{combo}x</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>{isDutch ? `Vraag ${currentIndex + 1} van ${drillItems.length}` : `Question ${currentIndex + 1} of ${drillItems.length}`}</span>
              <span>{isDutch ? `Score: ${score} goed` : `Score: ${score} correct`}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / drillItems.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/60 border border-amber-200/80 text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
              {isDutch ? 'Litouws Oefenen' : 'Lithuanian Drill'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {currentItem.prompt}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentItem.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/30';

              if (isAnswerChecked) {
                if (idx === currentItem.correctIndex) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isAnswerChecked && idx === currentItem.correctIndex && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Keyboard shortcut hint */}
          <div className="text-center text-[11px] text-slate-400 font-medium">
            ⌨️ {isDutch ? 'Druk op toets 1, 2, 3 of 4 op je toetsenbord om te antwoorden' : 'Press key 1, 2, 3, or 4 to choose your answer'}
            {isAnswerChecked && ` • ${isDutch ? 'Druk op [Enter] of [Spatie] voor de volgende vraag' : 'Press [Enter] or [Space] for next question'}`}
          </div>

          {/* Bottom Actions & Explanation */}
          {isAnswerChecked && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  {selectedOption === currentItem.correctIndex 
                    ? (isDutch ? '✓ Uitstekend gedaan!' : '✓ Correct!') 
                    : (isDutch ? '✗ Niet helemaal juist.' : '✗ Incorrect.')}
                  <span className="font-normal text-slate-500 ml-1.5">{currentItem.explanation}</span>
                </p>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>{currentIndex + 1 < drillItems.length ? (isDutch ? 'Volgende' : 'Next') : (isDutch ? 'Resultaten' : 'Results')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">
              {isDutch ? 'Dril Voltooid!' : 'Drill Complete!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isDutch 
                ? `Je hebt ${score} van de ${drillItems.length} vragen correct beantwoord, met een hoogste combo van ${highestCombo}x!` 
                : `You scored ${score} of ${drillItems.length} correctly with a max combo of ${highestCombo}x!`}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <div className="px-5 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
              +{score * 10} XP
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              +{Math.round(score * 1.5)} 💎 {i18n.gems}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isDutch ? 'Nog een Keer Oefenen' : 'Drill Again'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

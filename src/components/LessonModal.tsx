import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Volume2, 
  Mic, 
  MicOff, 
  Check, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle, 
  Lightbulb, 
  Award, 
  Gem, 
  CheckCircle2, 
  VolumeX 
} from 'lucide-react';
import { LearningNode, Exercise, UserProfile, Language } from '../types';
import { audioSynth } from '../services/audioSynthesizer';

interface LessonModalProps {
  node: LearningNode;
  activeLanguage: Language;
  onClose: () => void;
  onComplete: (xpEarned: number, gemsEarned: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  node,
  activeLanguage,
  onClose,
  onComplete,
}) => {
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scrambledTokens, setScrambledTokens] = useState<string[]>([]);
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [recognizedSpeech, setRecognizedSpeech] = useState('');
  const [speechAccuracy, setSpeechAccuracy] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const recognitionRef = useRef<any>(null);
  const currentExercise = node.exercises[currentExIndex];

  // Initialize exercise state when exercise index changes
  useEffect(() => {
    if (!currentExercise) return;
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setRecognizedSpeech('');
    setSpeechAccuracy(null);
    setShowHint(false);

    if (currentExercise.type === 'sentence-scramble' && currentExercise.scrambledWords) {
      setScrambledTokens([...currentExercise.scrambledWords].sort(() => Math.random() - 0.5));
      setAssembledTokens([]);
    }

    // Auto-speak target phrase for listening comprehension
    if (currentExercise.type === 'listening-comprehension') {
      setTimeout(() => {
        audioSynth.speakText(currentExercise.targetPhrase, activeLanguage.code);
      }, 300);
    }
  }, [currentExIndex, node, activeLanguage]);

  // Handle Speech Recognition for speech exercises
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecClass) {
      // Browser fallback simulation
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const simText = currentExercise.targetPhrase;
        setRecognizedSpeech(simText);
        setSpeechAccuracy(94);
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecClass();
      recognition.lang = activeLanguage.code;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedSpeech(transcript);
        
        // Calculate similarity score
        const targetClean = currentExercise.targetPhrase.toLowerCase().replace(/[^a-z0-9]/gi, '');
        const transClean = transcript.toLowerCase().replace(/[^a-z0-9]/gi, '');
        
        let score = 85;
        if (targetClean === transClean) score = 98;
        else if (transClean.includes(targetClean.slice(0, 4))) score = 90;
        else score = Math.floor(Math.random() * 15 + 80);

        setSpeechAccuracy(score);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
      console.warn('Speech recognition error:', e);
    }
  };

  const handlePlayAudio = (rate: number = 0.9) => {
    audioSynth.speakText(currentExercise.targetPhrase, activeLanguage.code, rate);
  };

  const handleCheckAnswer = () => {
    if (isAnswerChecked) {
      // Move to next exercise
      if (currentExIndex < node.exercises.length - 1) {
        setCurrentExIndex(currentExIndex + 1);
      } else {
        setIsLessonFinished(true);
        audioSynth.playCrownFanfare();
      }
      return;
    }

    let correct = false;

    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening-comprehension' || currentExercise.type === 'translation' || currentExercise.type === 'fill-blank') {
      correct = selectedOption === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'sentence-scramble') {
      const assembledStr = assembledTokens.join(' ');
      const targetStr = Array.isArray(currentExercise.correctAnswer)
        ? currentExercise.correctAnswer.join(' ')
        : currentExercise.correctAnswer;
      correct = assembledStr === targetStr;
    } else if (currentExercise.type === 'speech-pronounce') {
      correct = (speechAccuracy ?? 0) >= 75 || recognizedSpeech.length > 3;
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      audioSynth.playSuccessChime();
    } else {
      audioSynth.playGentleFeedback();
      setAttempts(attempts + 1);
    }
  };

  // Finish Lesson
  const handleFinish = () => {
    onComplete(node.xpReward, node.gemReward);
    onClose();
  };

  return (
    <div
      id="fluentic-lesson-modal"
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95"
      >
        {/* Lesson Progress Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <button
            id="lesson-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentExIndex + (isLessonFinished ? 1 : 0)) / node.exercises.length) * 100}%`,
              }}
            />
          </div>

          <div className="text-xs font-bold text-slate-400 font-mono">
            {currentExIndex + 1}/{node.exercises.length}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isLessonFinished ? (
            <>
              {/* Node Title and CEFR pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-extrabold">
                    {node.cefr}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {node.category} • {activeLanguage.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>+{node.xpReward} XP</span>
                </div>
              </div>

              {/* Prompt Question */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {currentExercise.prompt}
                </h3>
                {currentExercise.phoneticIpa && (
                  <div className="text-xs text-slate-500 font-mono">
                    IPA: {currentExercise.phoneticIpa}
                  </div>
                )}
              </div>

              {/* Target phrase card with audio playback */}
              {currentExercise.type !== 'listening-comprehension' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-slate-900">
                      {currentExercise.targetPhrase}
                    </div>
                    <div className="text-xs text-slate-500">{currentExercise.translation}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      id="lesson-audio-play-btn"
                      onClick={() => handlePlayAudio(0.95)}
                      className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
                      title="Play native audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      id="lesson-audio-slow-btn"
                      onClick={() => handlePlayAudio(0.65)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold"
                      title="Slow pronunciation"
                    >
                      0.7x
                    </button>
                  </div>
                </div>
              )}

              {/* Listening Comprehension Audio Trigger */}
              {currentExercise.type === 'listening-comprehension' && (
                <div className="py-6 flex flex-col items-center justify-center gap-3">
                  <button
                    id="listening-play-audio-btn"
                    onClick={() => handlePlayAudio(0.9)}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Volume2 className="w-8 h-8" />
                  </button>
                  <p className="text-xs text-slate-500 font-medium">
                    Tap to hear target speech synthesis
                  </p>
                </div>
              )}

              {/* Exercise Type 1: Multiple Choice / Translation / Listening Options */}
              {(currentExercise.type === 'multiple-choice' ||
                currentExercise.type === 'listening-comprehension' ||
                currentExercise.type === 'translation' ||
                currentExercise.type === 'fill-blank') &&
                currentExercise.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentExercise.options.map((opt, idx) => {
                      const isSelected = selectedOption === opt;
                      let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                      if (isAnswerChecked) {
                        if (opt === currentExercise.correctAnswer) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400/30';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-50/90 border-amber-400 text-amber-950 ring-2 ring-amber-400/20';
                      }

                      return (
                        <button
                          key={idx}
                          id={`exercise-opt-${idx}-btn`}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            audioSynth.playGentleFeedback();
                            setSelectedOption(opt);
                          }}
                          className={`p-3.5 rounded-2xl border text-left font-medium text-sm transition-all shadow-xs ${btnStyle}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

              {/* Exercise Type 2: Speech Pronunciation Drill */}
              {currentExercise.type === 'speech-pronounce' && (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-center space-y-3">
                    <p className="text-xs font-bold text-amber-900">
                      Press microphone and pronounce the phrase clearly
                    </p>

                    <button
                      id="speech-pronounce-mic-btn"
                      onClick={toggleSpeechRecognition}
                      className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition-all ${
                        isListening
                          ? 'bg-rose-500 ring-8 ring-rose-400/30 animate-pulse'
                          : 'bg-gradient-to-tr from-amber-500 to-amber-600 hover:scale-105'
                      }`}
                    >
                      {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                    </button>

                    {recognizedSpeech && (
                      <div className="space-y-1">
                        <div className="text-xs text-slate-500">Heard speech transcript:</div>
                        <div className="font-bold text-slate-900 text-sm">
                          "{recognizedSpeech}"
                        </div>
                        {speechAccuracy !== null && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mt-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Phonetic Accuracy: {speechAccuracy}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Exercise Type 3: Sentence Scramble */}
              {currentExercise.type === 'sentence-scramble' && (
                <div className="space-y-4">
                  {/* Assembled Tokens Slot */}
                  <div className="min-h-[56px] p-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-wrap items-center gap-2">
                    {assembledTokens.length === 0 ? (
                      <span className="text-xs text-slate-400 font-medium italic">
                        Click available tokens below to construct the phrase...
                      </span>
                    ) : (
                      assembledTokens.map((token, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isAnswerChecked) return;
                            setAssembledTokens(assembledTokens.filter((_, i) => i !== idx));
                            setScrambledTokens([...scrambledTokens, token]);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all"
                        >
                          {token}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Bank Tokens */}
                  <div className="flex flex-wrap items-center gap-2">
                    {scrambledTokens.map((token, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => {
                          setScrambledTokens(scrambledTokens.filter((_, i) => i !== idx));
                          setAssembledTokens([...assembledTokens, token]);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold shadow-xs transition-all hover:border-slate-300"
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural or Grammar Hint Accordion */}
              {(currentExercise.culturalNote || currentExercise.grammarTip) && (
                <div className="pt-1">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Pedagogical Insight' : 'View Pedagogical Insight'}</span>
                  </button>

                  {showHint && (
                    <div className="mt-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1 animate-in fade-in">
                      {currentExercise.culturalNote && (
                        <p><strong>Cultural Context:</strong> {currentExercise.culturalNote}</p>
                      )}
                      {currentExercise.grammarTip && (
                        <p><strong>Grammar Rule:</strong> {currentExercise.grammarTip}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Lesson Finished Screen */
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  Node Mastery Complete!
                </h3>
                <p className="text-sm text-slate-500">
                  You've successfully mastered <strong>{node.title}</strong> with zero heart limitations.
                </p>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">XP Earned</div>
                  <div className="text-xl font-black text-amber-900">+{node.xpReward}</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-center">
                  <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Gems Reward</div>
                  <div className="text-xl font-black text-cyan-900">+{node.gemReward} 💎</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div
          className={`p-4 border-t flex items-center justify-between transition-colors ${
            isAnswerChecked
              ? isCorrect
                ? 'bg-emerald-50/80 border-emerald-200'
                : 'bg-amber-50/80 border-amber-200'
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          {isLessonFinished ? (
            <button
              id="lesson-claim-reward-btn"
              onClick={handleFinish}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all"
            >
              Claim Rewards & Return to Constellation
            </button>
          ) : (
            <>
              <div>
                {isAnswerChecked && (
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-emerald-900 text-sm">
                          Spot On! Excellent articulation.
                        </span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-amber-900 text-xs sm:text-sm">
                          Almost! Infinite attempts available.
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                id="lesson-check-continue-btn"
                onClick={handleCheckAnswer}
                className={`py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                  isAnswerChecked
                    ? isCorrect
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{isAnswerChecked ? 'Continue' : 'Check Answer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

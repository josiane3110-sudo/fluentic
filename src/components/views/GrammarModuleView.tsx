import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Check, 
  X, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface GrammarModuleViewProps {
  activeLanguage: Language;
  user: UserProfile;
}

interface GrammarTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  ruleFormula: string;
  examples: Array<{
    sentence: string;
    translation: string;
    note?: string;
  }>;
  drill: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export const GrammarModuleView: React.FC<GrammarModuleViewProps> = ({
  activeLanguage,
  user,
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  // Authoritative Lithuanian Grammar Topics explained clearly in Dutch
  const topics: GrammarTopic[] = [
    {
      id: 'cases-overview',
      title: isDutch ? 'De 7 Litouwse Naamvallen (Linksniai)' : 'The 7 Lithuanian Cases',
      category: isDutch ? 'Zelfstandige Naamwoorden' : 'Nouns',
      summary: isDutch
        ? 'Het Litouws heeft 7 naamvallen. De uitgang van een woord verandert afhankelijk van de rol in de zin: Vardininkas (nominatief/onderwerp), Kilmininkas (genitief/bezit/ontkenning), Naudininkas (datief/meewerkend), Galininkas (accusatief/lijdend), Įnagininkas (instrumentalis/met wat), Vietininkas (locatief/waar), Šauksmininkas (vocatief/aanspreking).'
        : 'Lithuanian features 7 grammatical cases denoting sentence functions.',
      ruleFormula: isDutch 
        ? '1. Vardininkas (Wie/Wat) • 2. Kilmininkas (Van wie/Geen) • 3. Naudininkas (Aan wie) • 4. Galininkas (Wat doe je) • 5. Įnagininkas (Met wat) • 6. Vietininkas (Waar) • 7. Šauksmininkas (Aanspreken)'
        : 'Nom • Gen • Dat • Acc • Inst • Loc • Voc',
      examples: [
        { sentence: 'Kava yra karšta.', translation: isDutch ? 'De koffie is heet. (Vardininkas - onderwerp)' : 'The coffee is hot.' },
        { sentence: 'Noriu kavos.', translation: isDutch ? 'Ik wil wat koffie. (Kilmininkas - deel/verlangen)' : 'I want some coffee.' },
        { sentence: 'Prašau vieną kavą.', translation: isDutch ? 'Eén koffie, alstublieft. (Galininkas - lijdend voorwerp)' : 'One coffee, please.' },
        { sentence: 'Esu kavinėje.', translation: isDutch ? 'Ik ben in het café. (Vietininkas - plaatsaanduiding)' : 'I am in the cafe.' },
      ],
      drill: {
        question: isDutch 
          ? 'Welke naamval gebruik je voor het lijdend voorwerp in: "Aš skaitau knygą" (Ik lees een boek)?' 
          : 'Which case is "knygą"?',
        options: isDutch 
          ? ['Galininkas (Accusatief)', 'Vardininkas (Nominatief)', 'Vietininkas (Locatief)', 'Šauksmininkas (Vocatief)']
          : ['Accusative', 'Nominative', 'Locative', 'Vocative'],
        correctAnswer: isDutch ? 'Galininkas (Accusatief)' : 'Accusative',
        explanation: isDutch 
          ? '"Knygą" is het lijdend voorwerp van de handeling en staat dus in de Galininkas (accusatief).' 
          : 'Galininkas marks direct objects.'
      }
    },
    {
      id: 'noun-genders',
      title: isDutch ? 'Mannelijk & Vrouwelijk Geslacht' : 'Noun Genders',
      category: isDutch ? 'Zelfstandige Naamwoorden' : 'Nouns',
      summary: isDutch
        ? 'Litouwse woorden zijn mannelijk (vyriškoji giminė) of vrouwelijk (moteriškoji giminė). Woorden op -as, -ys, -is zijn vrijwel altijd mannelijk. Woorden op -a, -ė zijn vrouwelijk.'
        : 'Nouns are masculine or feminine, identified by characteristic endings.',
      ruleFormula: isDutch 
        ? 'Mannelijk: -as (namas), -ys (kambarys), -is (brolis) | Vrouwelijk: -a (kava), -ė (upė)' 
        : 'Masculine: -as, -ys, -is | Feminine: -a, -ė',
      examples: [
        { sentence: 'Mano brolis yra aukštas.', translation: isDutch ? 'Mijn broer is lang (mannelijk woord).' : 'My brother is tall.' },
        { sentence: 'Ši knyga yra įdomi.', translation: isDutch ? 'Dit boek is interessant (vrouwelijk woord in het Litouws: knyga).' : 'This book is interesting.' },
      ],
      drill: {
        question: isDutch 
          ? 'Wat is het grammaticale geslacht van het Litouwse woord "namas" (huis)?' 
          : 'What gender is "namas"?',
        options: isDutch 
          ? ['Mannelijk (eindigt op -as)', 'Vrouwelijk (eindigt op -as)', 'Onzijdig', 'Geen van beide']
          : ['Masculine', 'Feminine', 'Neuter', 'None'],
        correctAnswer: isDutch ? 'Mannelijk (eindigt op -as)' : 'Masculine',
        explanation: isDutch 
          ? 'Woorden op -as zijn altijd mannelijk in het Litouws.' 
          : 'Words ending in -as are masculine.'
      }
    },
    {
      id: 'present-tense',
      title: isDutch ? 'Tegenwoordige Tijd (Esamasis laikas)' : 'Present Tense',
      category: isDutch ? 'Werkwoorden' : 'Verbs',
      summary: isDutch
        ? 'Litouwse werkwoorden worden verdeeld in drie vervoegingen op basis van de uitgang van de derde persoon: 1e vervoeging (-a), 2e vervoeging (-i), 3e vervoeging (-o).'
        : 'Lithuanian regular verbs fall into three conjugation groups.',
      ruleFormula: isDutch 
        ? 'Aš (ik): -u | Tu (jij): -i | Jis/Ji (hij/zij): -a/-i/-o | Mes (wij): -ame/-ime | Jūs (jullie/u): -ate/-ite'
        : 'Aš: -u | Tu: -i | Jis/Ji: -a/-i/-o | Mes: -ame | Jūs: -ate',
      examples: [
        { sentence: 'Aš dirbu kiekvieną dieną.', translation: isDutch ? 'Ik werk elke dag (dirbti -> dirbu).' : 'I work every day.' },
        { sentence: 'Mes kalbame lietuviškai.', translation: isDutch ? 'Wij spreken Litouws (kalbėti -> kalbame).' : 'We speak Lithuanian.' },
        { sentence: 'Ar tu geri kavą?', translation: isDutch ? 'Drink jij koffie? (gerti -> geri).' : 'Do you drink coffee?' },
      ],
      drill: {
        question: isDutch 
          ? 'Kies de juiste vorm voor "Aš" (ik) van het werkwoord "gyventi" (wonen):' 
          : 'Choose form for "Aš" with "gyventi":',
        options: ['gyvenu', 'gyveni', 'gyvena', 'gyvename'],
        correctAnswer: 'gyvenu',
        explanation: isDutch 
          ? 'Voor "Aš" (ik) eindigt het werkwoord in de tegenwoordige tijd op "-u": Aš gyvenu (ik woon).' 
          : 'First person singular takes -u: gyvenu.'
      }
    },
    {
      id: 'negation-genitive',
      title: isDutch ? 'De Ontkenningsregel (Ne- + Genitief)' : 'Negation & Genitive Rule',
      category: isDutch ? 'Essentiële Regels' : 'Essential Rules',
      summary: isDutch
        ? 'Een gouden regel in het Litouws: als je een werkwoord ontkent met het voorvoegsel "ne-", verandert het lijdend voorwerp ALTIJD van de 4e naamval (galininkas/accusatief) naar de 2e naamval (kilmininkas/genitief)!'
        : 'When a verb is negated with "ne-", direct objects must switch to the genitive case.',
      ruleFormula: isDutch 
        ? 'Bevestigend: Turiu bilietą (Accusatief) -> Ontkennend: Neturiu bilieto (Genitief)' 
        : 'Affirmative: Accusative -> Negative: Genitive',
      examples: [
        { sentence: 'Aš turiu laiką. -> Aš neturiu laiko.', translation: isDutch ? 'Ik heb tijd. -> Ik heb geen tijd (laiko is genitief).' : 'I have time -> I have no time.' },
        { sentence: 'Aš suprantu klausimą. -> Aš nesuprantu klausimo.', translation: isDutch ? 'Ik begrijp de vraag. -> Ik begrijp de vraag niet.' : 'I understand -> I do not understand.' },
      ],
      drill: {
        question: isDutch 
          ? 'Kies de juiste ontkennende vorm: "Aš geriu kavą" -> "Aš negeriu ___":' 
          : 'Complete the negated sentence:',
        options: ['kavos', 'kavą', 'kava', 'kavai'],
        correctAnswer: 'kavos',
        explanation: isDutch 
          ? 'Na de ontkenning "negeriu" moet "kava" in de genitief (kilmininkas) staan: "kavos"!' 
          : 'Negation requires genitive case: kavos.'
      }
    },
    {
      id: 'past-tense',
      title: isDutch ? 'Verleden Tijd (Būtasis kartinis laikas)' : 'Past Tense',
      category: isDutch ? 'Werkwoorden' : 'Verbs',
      summary: isDutch
        ? 'De verleden tijd geeft aan wat er in het verleden is gebeurd. Belangrijke onregelmatige hulpwerkwoorden zoals "būti" (zijn): buvau (ik was), buvai (jij was), buvo (hij/zij was), buvome (wij waren), buvote (jullie waren).'
        : 'The simple past tense denotes completed actions.',
      ruleFormula: isDutch 
        ? 'Būti: buvau, buvai, buvo, buvome, buvote, buvo' 
        : 'Past stem + tense endings',
      examples: [
        { sentence: 'Vakar buvau Vilniuje.', translation: isDutch ? 'Gisteren was ik in Vilnius.' : 'Yesterday I was in Vilnius.' },
        { sentence: 'Mes matėme gražų filmą.', translation: isDutch ? 'Wij zagen een mooie film.' : 'We saw a nice movie.' },
      ],
      drill: {
        question: isDutch 
          ? 'Vul in: "Vakar mes ___ kavinėje" (Gisteren waren wij in het café):' 
          : 'Complete: "Vakar mes ___ kavinėje":',
        options: ['buvome', 'buvau', 'buvo', 'esame'],
        correctAnswer: 'buvome',
        explanation: isDutch 
          ? 'Voor "mes" (wij) is de verleden tijd van zijn "buvome".' 
          : 'For "mes", the past form of būti is "buvome".'
      }
    }
  ];

  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0].id);
  const [selectedDrillAnswer, setSelectedDrillAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  const handleSelectTopic = (id: string) => {
    audioSynth.playGentleFeedback();
    setSelectedTopicId(id);
    setSelectedDrillAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleCheckDrill = () => {
    if (!selectedDrillAnswer) return;
    setIsAnswerChecked(true);
    if (selectedDrillAnswer === currentTopic.drill.correctAnswer) {
      audioSynth.playSuccessChime();
    } else {
      audioSynth.playGentleFeedback();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isDutch ? 'Litouwse Grammaticagids' : 'Grammar Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isDutch 
              ? 'Duidelijke uitleg van de 7 naamvallen, werkwoordsvervoegingen en taalregels in het Nederlands' 
              : 'Master Lithuanian noun cases, conjugations, and sentence structures'}
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>{isDutch ? '5 Kernmodules' : '5 Core Modules'}</span>
        </div>
      </div>

      {/* Main Split Layout: Topics List on Left, Topic Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Topics Navigation */}
        <div className="space-y-2">
          {topics.map((t) => {
            const isSelected = t.id === selectedTopicId;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {t.category}
                </div>
                <h4 className="text-sm font-black mt-0.5">
                  {t.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Topic Content & Drill */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Topic Title & Summary */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                {currentTopic.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentTopic.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentTopic.summary}
              </p>
            </div>

            {/* Rule Formula Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {isDutch ? 'Grammaticaformule & Schema' : 'Formula & Pattern'}
              </span>
              <p className="text-xs sm:text-sm font-black text-blue-950 font-mono">
                {currentTopic.ruleFormula}
              </p>
            </div>

            {/* Practical Examples with Audio */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isDutch ? 'Voorbeelden uit de Praktijk' : 'Practical Examples'}
              </h4>

              <div className="space-y-2">
                {currentTopic.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-slate-900">
                        {ex.sentence}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        {ex.translation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => audioSynth.speakText(ex.sentence, 'lt')}
                      className="p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 shadow-2xs shrink-0 cursor-pointer"
                      title={isDutch ? 'Beluister uitspraak' : 'Listen'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Drill */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-black text-slate-900">
                  {isDutch ? 'Snelle Grammaticacheck' : 'Practice Check'}
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentTopic.drill.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentTopic.drill.options.map((opt) => {
                    const isSelected = selectedDrillAnswer === opt;
                    let style = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';

                    if (isAnswerChecked) {
                      if (opt === currentTopic.drill.correctAnswer) {
                        style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        style = 'bg-rose-50 border-rose-400 text-rose-900';
                      }
                    } else if (isSelected) {
                      style = 'bg-blue-50 border-blue-600 text-blue-900 font-bold';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => {
                          audioSynth.playGentleFeedback();
                          setSelectedDrillAnswer(opt);
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Drill Action & Explanation */}
                <div className="pt-2 flex items-center justify-between">
                  {!isAnswerChecked ? (
                    <button
                      type="button"
                      disabled={!selectedDrillAnswer}
                      onClick={handleCheckDrill}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      {isDutch ? 'Controleer Antwoord' : 'Check Answer'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDrillAnswer(null);
                        setIsAnswerChecked(false);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isDutch ? 'Opnieuw Proberen' : 'Try Again'}</span>
                    </button>
                  )}

                  {isAnswerChecked && (
                    <p className="text-xs font-bold text-slate-700 max-w-sm text-right">
                      {selectedDrillAnswer === currentTopic.drill.correctAnswer
                        ? (isDutch ? '✓ Correct! ' : '✓ Correct! ')
                        : (isDutch ? '✗ ' : '✗ ')}
                      <span className="font-normal text-slate-500">{currentTopic.drill.explanation}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

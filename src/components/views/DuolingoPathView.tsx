import React from 'react';
import { 
  Sparkles, 
  Coffee, 
  Smile, 
  Clock, 
  Compass, 
  Utensils, 
  Users, 
  History, 
  Plane, 
  Crown, 
  Check, 
  Lock, 
  Star, 
  Gift, 
  Flame,
  Volume2,
  BookOpen
} from 'lucide-react';
import { LearningNode, UserProfile, Language, CefrLevel } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface DuolingoPathViewProps {
  user: UserProfile;
  activeLanguage: Language;
  onSelectNode: (node: LearningNode) => void;
  onClaimMilestone?: (gems: number) => void;
}

export interface PathUnit {
  id: string;
  unitNumber: number;
  title: string;
  subhead: string;
  themeColor: string;
  accentBg: string;
  minCefr: CefrLevel;
  nodes: LearningNode[];
  milestoneGems: number;
}

// Generate rich, progressive step-by-step units: Phonics first, then Cafe & Survival Essentials
export function getDuolingoUnits(language: Language, nativeCode: string = 'nl'): PathUnit[] {
  const isDutch = nativeCode === 'nl';
  const isLithuanian = language.code === 'lt';

  if (isLithuanian) {
    return [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: isDutch ? 'Litouws Alfabet & Klanken' : 'Lithuanian Phonic Alphabet',
        subhead: isDutch 
          ? 'Beheers de speciale letters (ą, č, ę, ė, į, š, ų, ū, ž) en eerste begroetingen' 
          : 'Master special letters and initial spoken greetings',
        themeColor: 'from-emerald-500 to-teal-600',
        accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        minCefr: 'A1',
        milestoneGems: 20,
        nodes: [
          {
            id: 'phonic-1',
            title: isDutch ? 'Litouws Alfabet & Klinkers' : 'Alphabet & Vowels',
            nativeTitle: 'Lietuvių abėcėlė',
            category: 'Foundations',
            cefr: 'A1',
            description: isDutch 
              ? 'Leer de zuivere klinkers en neusletters van het Litouws.' 
              : 'Listen to pure vowels and unique Lithuanian diacritics.',
            xpReward: 30,
            gemReward: 6,
            targetDurationMinutes: 3,
            iconName: 'Sparkles',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-ph1-1',
                type: 'multiple-choice',
                prompt: isDutch 
                  ? 'Kies de meest voorkomende ochtendbegroeting in het Litouws:' 
                  : 'Select the morning greeting in Lithuanian:',
                targetPhrase: 'Labas rytas!',
                translation: isDutch ? 'Goedemorgen!' : 'Good morning!',
                options: ['Labas rytas!', 'Labanakt', 'Viso gero', 'Ačiū'],
                correctAnswer: 'Labas rytas!',
                culturalNote: isDutch 
                  ? '"Labas rytas" wordt tot het middaguur gebruikt.' 
                  : 'Used until noon across Lithuania.'
              },
              {
                id: 'ex-ph1-2',
                type: 'speech-pronounce',
                prompt: isDutch 
                  ? 'Spreek deze algemene Litouwse begroeting hardop uit:' 
                  : 'Speak this greeting aloud:',
                targetPhrase: 'Laba diena!',
                translation: isDutch ? 'Goedendag!' : 'Good afternoon!',
                correctAnswer: 'Laba diena!',
              },
              {
                id: 'ex-ph1-3',
                type: 'multiple-choice',
                prompt: isDutch 
                  ? 'Hoe zeg je "Dank je wel" in het Litouws?' 
                  : 'How do you say "Thank you" in Lithuanian?',
                targetPhrase: 'Ačiū',
                translation: isDutch ? 'Dank je wel' : 'Thank you',
                options: ['Ačiū', 'Prašau', 'Atsiprašau', 'Taip'],
                correctAnswer: 'Ačiū'
              }
            ]
          },
          {
            id: 'phonic-2',
            title: isDutch ? 'Diftongen & Klankcombinaties' : 'Diphthongs & Blends',
            nativeTitle: 'Dvigarsiai (ai, au, ei, ie, uo)',
            category: 'Foundations',
            cefr: 'A1',
            description: isDutch 
              ? 'Oefen de melodische Litouwse tweeklanken zoals ie en uo.' 
              : 'Master the musical diphthongs of the Lithuanian language.',
            xpReward: 35,
            gemReward: 7,
            targetDurationMinutes: 3,
            iconName: 'Sparkles',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-ph2-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Kies het Litouwse woord voor "Ja":' : 'Select "Yes":',
                targetPhrase: 'Taip',
                translation: isDutch ? 'Ja' : 'Yes',
                options: ['Taip', 'Ne', 'Galbūt', 'Niekada'],
                correctAnswer: 'Taip'
              },
              {
                id: 'ex-ph2-2',
                type: 'speech-pronounce',
                prompt: isDutch ? 'Spreek uit: "Alstublieft":' : 'Pronounce "Please":',
                targetPhrase: 'Prašau',
                translation: isDutch ? 'Alstublieft' : 'Please',
                correctAnswer: 'Prašau'
              }
            ]
          },
          {
            id: 'phonic-3',
            title: isDutch ? 'Aangename Kennismaking' : 'First Meetings',
            nativeTitle: 'Susipažinimas',
            category: 'Foundations',
            cefr: 'A1',
            description: isDutch 
              ? 'Begroet nieuwe kennissen en wens mensen een fijne dag.' 
              : 'Introduce yourself politely in social settings.',
            xpReward: 40,
            gemReward: 8,
            targetDurationMinutes: 4,
            iconName: 'Sparkles',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-ph3-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Kies het Litouwse "Aangename kennismaking":' : 'Select "Nice to meet you":',
                targetPhrase: 'Malonu susipažinti',
                translation: isDutch ? 'Aangename kennismaking' : 'Pleased to meet you',
                options: ['Malonu susipažinti', 'Iki pasimatymo', 'Atsiprašau', 'Skanaus'],
                correctAnswer: 'Malonu susipažinti'
              }
            ]
          }
        ]
      },

      {
        id: 'unit-2',
        unitNumber: 2,
        title: isDutch ? 'Café & Overlevingsessenties' : 'Cafe & Survival Essentials',
        subhead: isDutch 
          ? 'Bestel koffie en thee, vraag om de rekening en betaal in het café' 
          : 'Order espresso, pastries, request the check and pay',
        themeColor: 'from-amber-500 to-orange-600',
        accentBg: 'bg-amber-50 text-amber-900 border-amber-200',
        minCefr: 'A1',
        milestoneGems: 25,
        nodes: [
          {
            id: 'cafe-1',
            title: isDutch ? 'In het Café Bestellen' : 'At the Cafe',
            nativeTitle: 'Kavinėje',
            category: 'Conversation',
            cefr: 'A1',
            description: isDutch 
              ? 'Bestel beleefd een koffie of water in een Litouws café.' 
              : 'Order your beverage politely in Vilnius or Kaunas.',
            xpReward: 45,
            gemReward: 10,
            targetDurationMinutes: 4,
            iconName: 'Coffee',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-cf1-1',
                type: 'multiple-choice',
                prompt: isDutch 
                  ? 'Hoe bestel je beleefd "Eén koffie, alstublieft" in het Litouws?' 
                  : 'How do you order: "A coffee, please"?',
                targetPhrase: 'Vieną kavą, prašau.',
                translation: isDutch ? 'Eén koffie, alstublieft.' : 'A coffee, please.',
                options: ['Vieną kavą, prašau.', 'Duok man kavos.', 'Nenoriu kavos.', 'Sąskaita.'],
                correctAnswer: 'Vieną kavą, prašau.',
                grammarTip: isDutch 
                  ? '"Kavą" staat in de 4e naamval (accusatief / galininkas) als lijdend voorwerp.' 
                  : '"Kavą" is in accusative case as the direct object.'
              },
              {
                id: 'ex-cf1-2',
                type: 'speech-pronounce',
                prompt: isDutch ? 'Spreek hardop uit: "Water, alstublieft":' : 'Pronounce: "Water, please":',
                targetPhrase: 'Vandens, prašau.',
                translation: isDutch ? 'Water, alstublieft.' : 'Water, please.',
                correctAnswer: 'Vandens, prašau.'
              }
            ]
          },
          {
            id: 'cafe-2',
            title: isDutch ? 'Prijzen & Vragen' : 'Prices & Inquiries',
            nativeTitle: 'Kainos ir klausimai',
            category: 'Vocabulary',
            cefr: 'A1',
            description: isDutch 
              ? 'Vraag hoeveel iets kost en begrijp bedragen.' 
              : 'Inquire about costs and recognize amounts in euros.',
            xpReward: 45,
            gemReward: 10,
            targetDurationMinutes: 4,
            iconName: 'Coffee',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-cf2-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Hoe vraag je: "Hoeveel kost dit?"' : 'How do you ask: "How much does it cost?"',
                targetPhrase: 'Kiek tai kainuoja?',
                translation: isDutch ? 'Hoeveel kost dit?' : 'How much does it cost?',
                options: ['Kiek tai kainuoja?', 'Kur yra stotis?', 'Kas čia yra?', 'Kiek valandų?'],
                correctAnswer: 'Kiek tai kainuoja?'
              }
            ]
          },
          {
            id: 'cafe-3',
            title: isDutch ? 'De Rekening & Betalen' : 'The Bill & Paying',
            nativeTitle: 'Sąskaitą, prašau',
            category: 'Conversation',
            cefr: 'A1',
            description: isDutch 
              ? 'Vraag de ober om de rekening en bedank voor de service.' 
              : 'Ask for the bill, tip, and conclude dining politely.',
            xpReward: 50,
            gemReward: 12,
            targetDurationMinutes: 4,
            iconName: 'Coffee',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-cf3-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Hoe vraag je om de rekening?' : 'How do you ask for the bill?',
                targetPhrase: 'Sąskaitą, prašau.',
                translation: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.',
                options: ['Sąskaitą, prašau.', 'Kava baigėsi.', 'Nenoriu mokėti.', 'Iki rytojaus.'],
                correctAnswer: 'Sąskaitą, prašau.'
              }
            ]
          }
        ]
      },

      {
        id: 'unit-3',
        unitNumber: 3,
        title: isDutch ? 'Wegwijzers & De Stad' : 'Directions & Navigation',
        subhead: isDutch 
          ? 'Vind je weg in Vilnius, vraag naar de trein en vind het hotel' 
          : 'Find your way around Lithuanian streets and transit',
        themeColor: 'from-blue-500 to-indigo-600',
        accentBg: 'bg-blue-50 text-blue-900 border-blue-200',
        minCefr: 'A2',
        milestoneGems: 30,
        nodes: [
          {
            id: 'city-1',
            title: isDutch ? 'De Weg Vragen' : 'Asking Directions',
            nativeTitle: 'Kur yra...?',
            category: 'Conversation',
            cefr: 'A2',
            description: isDutch 
              ? 'Vraag waar het treinstation of hotel is.' 
              : 'Locate landmarks and stations in the city.',
            xpReward: 50,
            gemReward: 12,
            targetDurationMinutes: 5,
            iconName: 'Compass',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-ct1-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Hoe vraag je: "Waar is het treinstation?"' : 'How do you ask for the train station?',
                targetPhrase: 'Kur yra geležinkelio stotis?',
                translation: isDutch ? 'Waar is het treinstation?' : 'Where is the train station?',
                options: ['Kur yra geležinkelio stotis?', 'Kur yra viešbutis?', 'Kur yra vaistinė?', 'Kur yra jūra?'],
                correctAnswer: 'Kur yra geležinkelio stotis?'
              }
            ]
          },
          {
            id: 'city-2',
            title: isDutch ? 'Links & Rechts' : 'Left & Right',
            nativeTitle: 'Kairėn ir dešinėn',
            category: 'Conversation',
            cefr: 'A2',
            description: isDutch 
              ? 'Begrijp richtingsaanwijzingen van voorbijgangers.' 
              : 'Follow directions from locals.',
            xpReward: 50,
            gemReward: 12,
            targetDurationMinutes: 4,
            iconName: 'Compass',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-ct2-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Wat betekent "Į dešinę"?' : 'What does "Į dešinę" mean?',
                targetPhrase: 'Į dešinę',
                translation: isDutch ? 'Naar rechts' : 'To the right',
                options: ['Naar rechts', 'Naar links', 'Rechtdoor', 'Terug'],
                correctAnswer: 'Naar rechts'
              }
            ]
          }
        ]
      },

      {
        id: 'unit-4',
        unitNumber: 4,
        title: isDutch ? 'Vrienden & Familie' : 'Friends & Identity',
        subhead: isDutch 
          ? 'Vertel over jezelf: "Ik kom uit Nederland", praat over familie' 
          : 'Share where you are from and describe your family',
        themeColor: 'from-purple-500 to-pink-600',
        accentBg: 'bg-purple-50 text-purple-900 border-purple-200',
        minCefr: 'B1',
        milestoneGems: 35,
        nodes: [
          {
            id: 'fam-1',
            title: isDutch ? 'Herkomst & Taal' : 'Origin & Languages',
            nativeTitle: 'Aš esu iš...',
            category: 'Conversation',
            cefr: 'B1',
            description: isDutch 
              ? 'Vertel dat je uit Nederland komt en Litouws leert.' 
              : 'Explain your background and language studies.',
            xpReward: 60,
            gemReward: 15,
            targetDurationMinutes: 5,
            iconName: 'Users',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-fm1-1',
                type: 'multiple-choice',
                prompt: isDutch ? 'Kies de juiste zin voor: "Ik kom uit Nederland":' : 'Select "I am from the Netherlands":',
                targetPhrase: 'Aš esu iš Nyderlandų.',
                translation: isDutch ? 'Ik kom uit Nederland.' : 'I am from the Netherlands.',
                options: ['Aš esu iš Nyderlandų.', 'Aš gyvenu Vilniuje.', 'Mano vardas Jonas.', 'Aš kalbu lietuviškai.'],
                correctAnswer: 'Aš esu iš Nyderlandų.'
              }
            ]
          }
        ]
      },

      {
        id: 'unit-5',
        unitNumber: 5,
        title: isDutch ? 'Grammatica & De 7 Naamvallen' : 'Lithuanian Grammar & Cases',
        subhead: isDutch 
          ? 'De 7 Litouwse naamvallen (linksniai) begrijpen en toepassen' 
          : 'Master the 7 grammatical cases of the Lithuanian language',
        themeColor: 'from-indigo-600 to-slate-800',
        accentBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
        minCefr: 'B2',
        milestoneGems: 40,
        nodes: [
          {
            id: 'gram-1',
            title: isDutch ? 'De 7 Naamvallen' : 'The 7 Cases',
            nativeTitle: 'Septyni linksniai',
            category: 'Grammar',
            cefr: 'B2',
            description: isDutch 
              ? 'Vardininkas, Kilmininkas, Naudininkas, Galininkas, Įnagininkas, Vietininkas, Šauksmininkas.' 
              : 'Understand why noun endings inflect in Lithuanian.',
            xpReward: 70,
            gemReward: 20,
            targetDurationMinutes: 6,
            iconName: 'BookOpen',
            coordinates: { x: 0, y: 0 },
            exercises: [
              {
                id: 'ex-gr1-1',
                type: 'multiple-choice',
                prompt: isDutch 
                  ? 'Welke naamval is "Vardininkas" in de Litouwse grammatica?' 
                  : 'Which case is "Vardininkas"?',
                targetPhrase: 'Vardininkas',
                translation: isDutch ? 'Nominatief (Onderwerp)' : 'Nominative Case',
                options: ['Nominatief (Onderwerp)', 'Genitief (Bezit / Ontkenning)', 'Datief (Meewerkend)', 'Accusatief (Lijdend)'],
                correctAnswer: 'Nominatief (Onderwerp)'
              }
            ]
          }
        ]
      }
    ];
  }

  // Fallback generic units for other languages
  return [
    {
      id: 'unit-1',
      unitNumber: 1,
      title: isDutch ? 'Fonetiek & Eerste Woorden' : 'Phonic Alphabet',
      subhead: isDutch ? 'Klinkers, uitspraak en begroetingen' : 'Master native sounds and greetings',
      themeColor: 'from-emerald-500 to-teal-600',
      accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      minCefr: 'A1',
      milestoneGems: 20,
      nodes: [
        {
          id: 'phonic-1',
          title: isDutch ? 'Basisklanken' : 'First Sounds',
          nativeTitle: 'Phonetics',
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch ? 'Oefen de uitspraak van de basisklanken.' : 'Listen to foundational sounds.',
          xpReward: 30,
          gemReward: 6,
          targetDurationMinutes: 3,
          iconName: 'Sparkles',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-gen1-1',
              type: 'multiple-choice',
              prompt: isDutch ? 'Kies de begroeting:' : 'Select greeting:',
              targetPhrase: language.sampleGreeting || 'Hello',
              translation: isDutch ? 'Begroeting' : 'Greeting',
              options: [language.sampleGreeting || 'Hello', 'Goodbye', 'Please', 'Thanks'],
              correctAnswer: language.sampleGreeting || 'Hello'
            }
          ]
        }
      ]
    }
  ];
}

export const DuolingoPathView: React.FC<DuolingoPathViewProps> = ({
  user,
  activeLanguage,
  onSelectNode,
  onClaimMilestone,
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');
  const units = getDuolingoUnits(activeLanguage, user.nativeLanguageCode || 'nl');
  const completedIds = new Set(user.completedNodeIds || []);

  let foundFirstActive = false;

  const HORIZONTAL_OFFSETS = [
    'translate-x-0',
    '-translate-x-10 sm:-translate-x-14',
    'translate-x-0',
    'translate-x-10 sm:translate-x-14',
  ];

  return (
    <div
      id="fluentic-duolingo-path-view"
      className="relative w-full max-w-xl mx-auto px-4 pt-4 pb-32 flex flex-col items-center select-none"
    >
      {/* Top Header Card */}
      <div className="w-full text-center mb-8 space-y-1.5 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-sm">
          <span className="text-base leading-none">{activeLanguage.flag}</span>
          <span>{activeLanguage.name} • {i18n.navPath}</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-extrabold text-[10px]">
            {user.activeCefr || 'A1'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isDutch ? 'Stapsgewijs Leerpad' : 'Step-by-Step Curriculum'}
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          {isDutch
            ? 'Je begint met de fonetiek en het alfabet, en stroomt dan direct door naar café- en overlevingsessenties. Voltooi elk bolletje om het volgende te ontgrendelen!'
            : 'Start with Phonics, then progress to Cafe Essentials. Complete each bubble to unlock the next!'}
        </p>
      </div>

      {/* The Serpentine Units Container */}
      <div className="w-full space-y-12 relative">
        {units.map((unit) => {
          return (
            <div key={unit.id} className="relative w-full space-y-6">
              {/* Unit Section Header Banner */}
              <div
                className={`w-full rounded-2xl bg-gradient-to-r ${unit.themeColor} text-white p-4 sm:p-5 shadow-md flex items-center justify-between gap-4`}
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{isDutch ? `Eenheid ${unit.unitNumber}` : `Unit ${unit.unitNumber}`}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">{unit.title}</h3>
                  <p className="text-xs text-white/90 line-clamp-1">{unit.subhead}</p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-xs font-black">
                  <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>+{unit.milestoneGems} {i18n.gems}</span>
                </div>
              </div>

              {/* Path Bubbles Column */}
              <div className="flex flex-col items-center py-4 space-y-8 relative">
                {unit.nodes.map((node, nodeIdx) => {
                  const isCompleted = completedIds.has(node.id);
                  let isActive = false;
                  let isLocked = false;

                  if (isCompleted) {
                    // Already ticked!
                  } else if (!foundFirstActive) {
                    // This is the active node!
                    isActive = true;
                    foundFirstActive = true;
                  } else {
                    // Subsequent non-completed node is locked
                    isLocked = true;
                  }

                  const offsetClass = HORIZONTAL_OFFSETS[nodeIdx % HORIZONTAL_OFFSETS.length];

                  return (
                    <div
                      key={node.id}
                      className={`relative flex flex-col items-center transition-all duration-300 ${offsetClass}`}
                    >
                      {/* Floating START Pill above active node */}
                      {isActive && (
                        <div className="absolute -top-10 z-20 animate-bounce">
                          <div className="px-3.5 py-1 rounded-full bg-slate-900 text-white font-black text-[11px] tracking-wider uppercase shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{isDutch ? 'BEGIN' : 'START'}</span>
                          </div>
                          <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 mx-auto -mt-1 shadow-xs" />
                        </div>
                      )}

                      {/* Tactile 3D Circular Bubble Button */}
                      <button
                        type="button"
                        id={`duolingo-bubble-${node.id}`}
                        disabled={isLocked}
                        onClick={() => {
                          if (isLocked) {
                            audioSynth.playGentleFeedback();
                            return;
                          }
                          audioSynth.playSuccessChime();
                          onSelectNode(node);
                        }}
                        className={`group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-150 select-none cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 hover:bg-emerald-400 border-b-6 border-emerald-700 active:translate-y-1 active:border-b-2 text-white shadow-lg shadow-emerald-500/30'
                            : isActive
                            ? 'bg-blue-600 hover:bg-blue-500 border-b-6 border-blue-800 active:translate-y-1 active:border-b-2 text-white shadow-xl shadow-blue-600/40 ring-4 ring-blue-400/40 ring-offset-2'
                            : 'bg-slate-200 border-b-6 border-slate-300 text-slate-400 cursor-not-allowed'
                        }`}
                        title={node.title}
                      >
                        {isCompleted ? (
                          <Check className="w-8 h-8 stroke-[3]" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6 text-slate-400" />
                        ) : (
                          <Star className="w-7 h-7 fill-white text-white drop-shadow-sm" />
                        )}
                      </button>

                      {/* Bubble Label Card */}
                      <div className="mt-2 text-center max-w-[130px]">
                        <p className={`text-xs font-bold leading-tight truncate ${
                          isActive ? 'text-blue-900 font-black' : isCompleted ? 'text-emerald-900' : 'text-slate-400'
                        }`}>
                          {node.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {node.nativeTitle || node.category}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

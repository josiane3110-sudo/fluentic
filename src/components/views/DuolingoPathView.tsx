import React from 'react';
import { 
  Sparkles, 
  Check, 
  Lock, 
  Star, 
  Crown, 
  Flame 
} from 'lucide-react';
import { LearningNode, UserProfile, Language, CefrLevel } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';
import { WORLD_LANGUAGES } from '../../data/languages';

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

// Generate rich, progressive step-by-step units with authentic native scripts for any language
export function getDuolingoUnits(language: Language, nativeCode: string = 'en'): PathUnit[] {
  const isDutch = nativeCode === 'nl';
  const name = language.name;
  const greeting = language.sampleGreeting || 'Hello';

  // Specific high-frequency native words and phrases per language
  const languageLexicon: Record<string, {
    alphabetTitle: string;
    vowelsNodeTitle: string;
    greetingsNodeTitle: string;
    cafeUnitTitle: string;
    coffeePhrase: string;
    waterPhrase: string;
    billPhrase: string;
    directionsUnitTitle: string;
    stationPhrase: string;
    rightPhrase: string;
    socialUnitTitle: string;
    friendPhrase: string;
    goodbyePhrase: string;
  }> = {
    ar: {
      alphabetTitle: 'الأبجدية العربية والأصوات',
      vowelsNodeTitle: 'الحركات والحروف (أ، ب، ت)',
      greetingsNodeTitle: 'التحيات والتعارف',
      cafeUnitTitle: 'في المقهى والمطعم',
      coffeePhrase: 'قهوة واحدة، من فضلك.',
      waterPhrase: 'ماء، من فضلك.',
      billPhrase: 'الحساب، لو سمحت.',
      directionsUnitTitle: 'الاتجاهات والتنقل',
      stationPhrase: 'أين محطة القطار؟',
      rightPhrase: 'إلى اليمين',
      socialUnitTitle: 'المحادثة والضيافة',
      friendPhrase: 'أهلًا وسهلًا بك!',
      goodbyePhrase: 'مع السلامة!'
    },
    ja: {
      alphabetTitle: 'ひらがな・カタカナと発音',
      vowelsNodeTitle: '母音と基本音 (あ・い・う・え・お)',
      greetingsNodeTitle: '基本の挨拶とマナー',
      cafeUnitTitle: '喫茶店と注文',
      coffeePhrase: 'コーヒーを一つ、お願いします。',
      waterPhrase: 'お水をください。',
      billPhrase: 'お会計をお願いします。',
      directionsUnitTitle: '道案内と駅',
      stationPhrase: '駅はどこですか？',
      rightPhrase: '右に曲がります',
      socialUnitTitle: '日常会話と友達',
      friendPhrase: 'お会いできて嬉しいです。',
      goodbyePhrase: 'さようなら、また会いましょう！'
    },
    zh: {
      alphabetTitle: '汉语拼音与声调',
      vowelsNodeTitle: '声母与韵母 (a, o, e)',
      greetingsNodeTitle: '基础问候与礼貌',
      cafeUnitTitle: '咖啡厅与点餐',
      coffeePhrase: '请给我一杯咖啡。',
      waterPhrase: '请给我一杯水。',
      billPhrase: '请结账，谢谢。',
      directionsUnitTitle: '问路与交通',
      stationPhrase: '请问火车站怎么走？',
      rightPhrase: '向右拐',
      socialUnitTitle: '社交日常对话',
      friendPhrase: '很高兴认识你！',
      goodbyePhrase: '再见，祝你顺心！'
    },
    ru: {
      alphabetTitle: 'Русский алфавит и фонетика',
      vowelsNodeTitle: 'Гласные и согласные звуки',
      greetingsNodeTitle: 'Приветствия и этикет',
      cafeUnitTitle: 'В уютном кафе',
      coffeePhrase: 'Один кофе, пожалуйста.',
      waterPhrase: 'Воду, пожалуйста.',
      billPhrase: 'Счёт, пожалуйста.',
      directionsUnitTitle: 'Ориентирование в городе',
      stationPhrase: 'Где находится вокзал?',
      rightPhrase: 'Направо',
      socialUnitTitle: 'Дружеское общение',
      friendPhrase: 'Очень приятно познакомиться!',
      goodbyePhrase: 'До свидания, всего хорошего!'
    },
    de: {
      alphabetTitle: 'Deutsches Alphabet & Aussprache',
      vowelsNodeTitle: 'Umlaute & Diphtonge (ä, ö, ü)',
      greetingsNodeTitle: 'Höfliche Begrüßungen',
      cafeUnitTitle: 'Im Café & Bäckerei',
      coffeePhrase: 'Einen Kaffee, bitte.',
      waterPhrase: 'Ein Mineralwasser, bitte.',
      billPhrase: 'Die Rechnung, bitte.',
      directionsUnitTitle: 'Wegbeschreibung in der Stadt',
      stationPhrase: 'Wo ist der Hauptbahnhof?',
      rightPhrase: 'Nach rechts',
      socialUnitTitle: 'Soziales & Bekanntschaften',
      friendPhrase: 'Freut mich sehr, Sie kennenzulernen!',
      goodbyePhrase: 'Auf Wiedersehen, bis bald!'
    },
    fr: {
      alphabetTitle: 'Alphabet Français & Phonétique',
      vowelsNodeTitle: 'Voyelles nasales et accents',
      greetingsNodeTitle: 'Salutations et politesse',
      cafeUnitTitle: 'Au Bistro & Café',
      coffeePhrase: 'Un café, s\'il vous plaît.',
      waterPhrase: 'De l\'eau, s\'il vous plaît.',
      billPhrase: 'L\'addition, s\'il vous plaît.',
      directionsUnitTitle: 'Orientation dans la Ville',
      stationPhrase: 'Où se trouve la gare ?',
      rightPhrase: 'À droite',
      socialUnitTitle: 'Vie Sociale & Rencontres',
      friendPhrase: 'Enchanté de faire votre connaissance !',
      goodbyePhrase: 'Au revoir et à bientôt !'
    },
    es: {
      alphabetTitle: 'Alfabeto Español y Fonética',
      vowelsNodeTitle: 'Vocales puras y sonidos (ñ, ll)',
      greetingsNodeTitle: 'Saludos y Cortesía',
      cafeUnitTitle: 'En la Cafetería y Tapas',
      coffeePhrase: 'Un café solo, por favor.',
      waterPhrase: 'Un vaso de agua, por favor.',
      billPhrase: 'La cuenta, por favor.',
      directionsUnitTitle: 'Direcciones en la Ciudad',
      stationPhrase: '¿Dónde está la estación?',
      rightPhrase: 'A la derecha',
      socialUnitTitle: 'Charla Social y Amigos',
      friendPhrase: '¡Mucho gusto en conocerte!',
      goodbyePhrase: '¡Hasta luego, que te vaya bien!'
    },
    it: {
      alphabetTitle: 'Alfabeto Italiano e Fonetica',
      vowelsNodeTitle: 'Vocali pure e suoni doppi',
      greetingsNodeTitle: 'Saluti e Convenevoli',
      cafeUnitTitle: 'Al Bar Italiano',
      coffeePhrase: 'Un espresso, per favore.',
      waterPhrase: 'Un bicchiere d\'acqua, per favore.',
      billPhrase: 'Il conto, per favore.',
      directionsUnitTitle: 'Orientamento in Città',
      stationPhrase: 'Dov\'è la stazione ferroviaria?',
      rightPhrase: 'A destra',
      socialUnitTitle: 'Amicizia e Vita Sociale',
      friendPhrase: 'Molto piacere di conoscerti!',
      goodbyePhrase: 'Arrivederci, a presto!'
    },
    lt: {
      alphabetTitle: 'Lietuvių abėcėlė ir balsiai',
      vowelsNodeTitle: 'Nosinių balsių tarimas (ą, ę, į, ų)',
      greetingsNodeTitle: 'Pasisveikinimai ir etiketas',
      cafeUnitTitle: 'Kavinėje ir restorane',
      coffeePhrase: 'Vieną kavą, prašau.',
      waterPhrase: 'Vandens, prašau.',
      billPhrase: 'Sąskaitą, prašau.',
      directionsUnitTitle: 'Miesto navigacija',
      stationPhrase: 'Kur yra geležinkelio stotis?',
      rightPhrase: 'Į dešinę',
      socialUnitTitle: 'Bendravimas ir draugystė',
      friendPhrase: 'Labai malonu susipažinti!',
      goodbyePhrase: 'Viso gero, iki pasimatymo!'
    },
    nl: {
      alphabetTitle: 'Nederlands Alfabet & Klanken',
      vowelsNodeTitle: 'Tweeklanken (ij, ui, eu, oe)',
      greetingsNodeTitle: 'Begroetingen & Kennismaking',
      cafeUnitTitle: 'In het Café & Terras',
      coffeePhrase: 'Een koffie, alstublieft.',
      waterPhrase: 'Een glas water, alstublieft.',
      billPhrase: 'Mag ik de rekening, alstublieft?',
      directionsUnitTitle: 'De Weg Vragen in de Stad',
      stationPhrase: 'Waar is het treinstation?',
      rightPhrase: 'Naar rechts',
      socialUnitTitle: 'Gezelligheid & Gesprek',
      friendPhrase: 'Leuk om je te ontmoeten!',
      goodbyePhrase: 'Tot ziens, fijne dag!'
    }
  };

  const lex = languageLexicon[language.code] || {
    alphabetTitle: `${name} Script & Sounds`,
    vowelsNodeTitle: `Pure Vowels & Alphabet`,
    greetingsNodeTitle: `Essential Greetings`,
    cafeUnitTitle: `At the Cafe & Essentials`,
    coffeePhrase: `${greeting} - Coffee, please.`,
    waterPhrase: `Water, please.`,
    billPhrase: `The bill, please.`,
    directionsUnitTitle: `Transit & Navigation`,
    stationPhrase: `Where is the station?`,
    rightPhrase: `To the right`,
    socialUnitTitle: `Conversations & Phrases`,
    friendPhrase: `Pleased to meet you!`,
    goodbyePhrase: `Goodbye!`
  };

  return [
    // Unit 1: Foundations & Alphabet (A1)
    {
      id: 'unit-1',
      unitNumber: 1,
      title: isDutch ? `${name} Alfabet & Klanken` : `${name} Alphabet & Phonetics`,
      subhead: isDutch 
        ? `Beheers de uitspraak, letters en eerste begroetingen in het ${name}` 
        : `Master script pronunciation, core phonemes, and essential greetings in ${name}`,
      themeColor: 'from-emerald-500 to-teal-600',
      accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      minCefr: 'A1',
      milestoneGems: 20,
      nodes: [
        {
          id: 'phonic-1',
          title: isDutch ? 'Alfabet & Klinkers' : 'Alphabet & Pure Vowels',
          nativeTitle: lex.alphabetTitle,
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch 
            ? `Leer de basisletters en zuivere klanken van het ${name}.` 
            : `Listen to pure vowels and foundational script of ${name}.`,
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
                ? `Kies de meest voorkomende begroeting in het ${name}:` 
                : `Select the standard greeting in ${name}:`,
              targetPhrase: greeting,
              translation: isDutch ? 'Hallo / Goedendag!' : 'Hello / Good day!',
              options: [greeting, lex.goodbyePhrase, lex.billPhrase, lex.rightPhrase],
              correctAnswer: greeting,
              culturalNote: isDutch 
                ? `Universele respectvolle begroeting in het ${name}.` 
                : `Standard respectful greeting used across native regions.`
            },
            {
              id: 'ex-ph1-2',
              type: 'speech-pronounce',
              prompt: isDutch 
                ? `Spreek deze ${name} begroeting hardop uit:` 
                : `Speak this ${name} greeting aloud:`,
              targetPhrase: greeting,
              translation: isDutch ? 'Begroeting' : 'Greeting',
              correctAnswer: greeting,
            }
          ]
        },
        {
          id: 'phonic-2',
          title: isDutch ? 'Klankcombinaties & Woorden' : 'Phonemes & Core Words',
          nativeTitle: lex.vowelsNodeTitle,
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch 
            ? `Oefen authentieke klanken en elementaire woorden.` 
            : `Practice authentic sound combinations and first survival words.`,
          xpReward: 35,
          gemReward: 7,
          targetDurationMinutes: 3,
          iconName: 'Sparkles',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-ph2-1',
              type: 'multiple-choice',
              prompt: isDutch 
                ? `Kies het authentieke ${name} woord voor water:` 
                : `Select the authentic ${name} expression for water:`,
              targetPhrase: lex.waterPhrase,
              translation: isDutch ? 'Water, alstublieft.' : 'Water, please.',
              options: [lex.waterPhrase, lex.coffeePhrase, lex.rightPhrase, lex.goodbyePhrase],
              correctAnswer: lex.waterPhrase
            }
          ]
        },
        {
          id: 'phonic-3',
          title: isDutch ? 'Kennismaking & Etiquette' : 'Introductions & Etiquette',
          nativeTitle: lex.greetingsNodeTitle,
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch 
            ? `Leer beleefd hallo en tot ziens zeggen.` 
            : `Introduce yourself politely in social settings.`,
          xpReward: 40,
          gemReward: 8,
          targetDurationMinutes: 4,
          iconName: 'Sparkles',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-ph3-1',
              type: 'multiple-choice',
              prompt: isDutch 
                ? `Hoe neem je beleefd afscheid in het ${name}?` 
                : `How do you say goodbye in ${name}?`,
              targetPhrase: lex.goodbyePhrase,
              translation: isDutch ? 'Tot ziens / Vaarwel' : 'Goodbye / Farewell',
              options: [lex.goodbyePhrase, greeting, lex.coffeePhrase, lex.stationPhrase],
              correctAnswer: lex.goodbyePhrase
            }
          ]
        }
      ]
    },

    // Unit 2: Cafe & Essentials (A1-A2)
    {
      id: 'unit-2',
      unitNumber: 2,
      title: isDutch ? `Café & Overlevingsessenties` : `Cafe & Survival Essentials`,
      subhead: isDutch 
        ? `Bestel drankjes, vraag om de rekening en communiceer in restaurants` 
        : `Order beverages, ask for the check, and navigate dining comfortably`,
      themeColor: 'from-amber-500 to-orange-600',
      accentBg: 'bg-amber-50 text-amber-900 border-amber-200',
      minCefr: 'A1',
      milestoneGems: 25,
      nodes: [
        {
          id: 'cafe-1',
          title: isDutch ? 'In het Café Bestellen' : 'At the Cafe',
          nativeTitle: lex.cafeUnitTitle,
          category: 'Conversation',
          cefr: 'A1',
          description: isDutch 
            ? `Bestel beleefd een koffie of drankje in het ${name}.` 
            : `Order your beverage politely in ${name}.`,
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
                ? `Hoe bestel je een koffie in het ${name}?` 
                : `How do you order coffee in ${name}?`,
              targetPhrase: lex.coffeePhrase,
              translation: isDutch ? 'Een koffie, alstublieft.' : 'A coffee, please.',
              options: [lex.coffeePhrase, lex.waterPhrase, lex.billPhrase, lex.goodbyePhrase],
              correctAnswer: lex.coffeePhrase
            },
            {
              id: 'ex-cf1-2',
              type: 'speech-pronounce',
              prompt: isDutch ? 'Spreek hardop uit: "Water, alstublieft":' : 'Pronounce: "Water, please":',
              targetPhrase: lex.waterPhrase,
              translation: isDutch ? 'Water, alstublieft.' : 'Water, please.',
              correctAnswer: lex.waterPhrase
            }
          ]
        },
        {
          id: 'cafe-2',
          title: isDutch ? 'De Rekening & Betalen' : 'The Bill & Paying',
          nativeTitle: lex.billPhrase,
          category: 'Conversation',
          cefr: 'A1',
          description: isDutch 
            ? `Vraag om de rekening en betaal beleefd.` 
            : `Ask for the check and conclude dining.`,
          xpReward: 50,
          gemReward: 12,
          targetDurationMinutes: 4,
          iconName: 'Coffee',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-cf2-1',
              type: 'multiple-choice',
              prompt: isDutch ? 'Hoe vraag je om de rekening?' : 'How do you ask for the check?',
              targetPhrase: lex.billPhrase,
              translation: isDutch ? 'De rekening, alstublieft.' : 'The check, please.',
              options: [lex.billPhrase, lex.coffeePhrase, lex.stationPhrase, lex.rightPhrase],
              correctAnswer: lex.billPhrase
            }
          ]
        }
      ]
    },

    // Unit 3: Directions & Transit (A2)
    {
      id: 'unit-3',
      unitNumber: 3,
      title: isDutch ? `Wegwijzers & De Stad` : `Directions & Navigation`,
      subhead: isDutch 
        ? `Vind je weg in de stad, vraag naar het station en begrijp routes` 
        : `Find your way around native streets, locate stations, and follow directions`,
      themeColor: 'from-blue-500 to-indigo-600',
      accentBg: 'bg-blue-50 text-blue-900 border-blue-200',
      minCefr: 'A2',
      milestoneGems: 30,
      nodes: [
        {
          id: 'city-1',
          title: isDutch ? 'De Weg Vragen' : 'Asking Directions',
          nativeTitle: lex.directionsUnitTitle,
          category: 'Conversation',
          cefr: 'A2',
          description: isDutch 
            ? `Vraag waar het station of hotel zich bevindt.` 
            : `Locate landmarks and transit stations in the city.`,
          xpReward: 50,
          gemReward: 12,
          targetDurationMinutes: 5,
          iconName: 'Compass',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-ct1-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe vraag je naar het station in het ${name}?` : `How do you ask for the train station in ${name}?`,
              targetPhrase: lex.stationPhrase,
              translation: isDutch ? 'Waar is het station?' : 'Where is the station?',
              options: [lex.stationPhrase, lex.rightPhrase, lex.billPhrase, greeting],
              correctAnswer: lex.stationPhrase
            }
          ]
        },
        {
          id: 'city-2',
          title: isDutch ? 'Links & Rechts' : 'Left & Right',
          nativeTitle: lex.rightPhrase,
          category: 'Conversation',
          cefr: 'A2',
          description: isDutch ? 'Begrijp richtingsaanwijzingen van locals.' : 'Follow directions from locals.',
          xpReward: 50,
          gemReward: 12,
          targetDurationMinutes: 4,
          iconName: 'Compass',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-ct2-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Wat betekent deze richting in het ${name}?` : `What does this direction mean in ${name}?`,
              targetPhrase: lex.rightPhrase,
              translation: isDutch ? 'Naar rechts' : 'To the right',
              options: [lex.rightPhrase, lex.stationPhrase, lex.goodbyePhrase, lex.coffeePhrase],
              correctAnswer: lex.rightPhrase
            }
          ]
        }
      ]
    },

    // Unit 4: Social Dialogue & Mastery (B1+)
    {
      id: 'unit-4',
      unitNumber: 4,
      title: isDutch ? `Sociale Connecties & Gesprekken` : `Social Dialogue & Fluency`,
      subhead: isDutch 
        ? `Voer spontane gesprekken met moedertaalsprekers` 
        : `Hold spontaneous conversations with native speakers`,
      themeColor: 'from-purple-500 to-violet-600',
      accentBg: 'bg-purple-50 text-purple-900 border-purple-200',
      minCefr: 'B1',
      milestoneGems: 40,
      nodes: [
        {
          id: 'social-1',
          title: isDutch ? 'Vriendschap Sluiten' : 'Meeting Friends',
          nativeTitle: lex.socialUnitTitle,
          category: 'Conversation',
          cefr: 'B1',
          description: isDutch ? 'Voer een warm en vriendelijk gesprek.' : 'Engage warmly in social circles.',
          xpReward: 60,
          gemReward: 15,
          targetDurationMinutes: 5,
          iconName: 'Users',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-sc1-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe begroet je een nieuwe vriend in het ${name}?` : `How do you greet a friend warmly in ${name}?`,
              targetPhrase: lex.friendPhrase,
              translation: isDutch ? 'Aangename kennismaking!' : 'Pleased to meet you!',
              options: [lex.friendPhrase, lex.billPhrase, lex.goodbyePhrase, lex.stationPhrase],
              correctAnswer: lex.friendPhrase
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
}) => {
  const nativeCode = user.nativeLanguageCode || 'en';
  const isDutch = nativeCode === 'nl';
  const i18n = getI18n(nativeCode);
  const units = getDuolingoUnits(activeLanguage, nativeCode);
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
          {activeLanguage.name} {isDutch ? 'Stapsgewijs Leerpad' : 'Step-by-Step Curriculum'}
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          {isDutch
            ? 'Je begint met de fonetiek en het alfabet, en stroomt dan direct door naar café- en overlevingsessenties. Voltooi elk bolletje om het volgende te ontgrendelen!'
            : 'Start with Phonics and native script, then progress to Cafe Essentials. Complete each bubble to unlock the next!'}
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

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
    },
    pt: {
      alphabetTitle: 'Alfabeto Português & Sons',
      vowelsNodeTitle: 'Vogais nasais e acentuação (ã, õ, ç)',
      greetingsNodeTitle: 'Saudações e Cortesia',
      cafeUnitTitle: 'No Café e Pastelaria',
      coffeePhrase: 'Um café, por favor.',
      waterPhrase: 'Um copo de água, por favor.',
      billPhrase: 'A conta, por favor.',
      directionsUnitTitle: 'Direções na Cidade',
      stationPhrase: 'Onde fica a estação?',
      rightPhrase: 'À direita',
      socialUnitTitle: 'Conversação e Amigos',
      friendPhrase: 'Muito prazer em conhecê-lo!',
      goodbyePhrase: 'Até logo, um bom dia!'
    },
    ko: {
      alphabetTitle: '한글 자모음과 발음 체계',
      vowelsNodeTitle: '기본 모음과 자음',
      greetingsNodeTitle: '기본 인사와 예절',
      cafeUnitTitle: '카페에서 주문하기',
      coffeePhrase: '커피 한 잔 주세요.',
      waterPhrase: '물 좀 주세요.',
      billPhrase: '계산서 부탁드립니다.',
      directionsUnitTitle: '길 찾기와 교통',
      stationPhrase: '기차역이 어디에 있나요?',
      rightPhrase: '오른쪽으로 가세요',
      socialUnitTitle: '일상 대화와 친구 사귀기',
      friendPhrase: '만나서 정말 반갑습니다!',
      goodbyePhrase: '안녕히 가세요, 또 만나요!'
    },
    hi: {
      alphabetTitle: 'हिन्दी वर्णमाला और ध्वनियाँ',
      vowelsNodeTitle: 'स्वर और व्यंजन (अ, आ, इ, ई)',
      greetingsNodeTitle: 'सादर अभिवादन और शिष्टाचार',
      cafeUnitTitle: 'कैफ़े और खान-पान',
      coffeePhrase: 'कृपया एक कॉफ़ी दीजिए।',
      waterPhrase: 'कृपया पानी दीजिए।',
      billPhrase: 'कृपया बिल लाइए।',
      directionsUnitTitle: 'दिशाएँ और मार्ग',
      stationPhrase: 'रेलवे स्टेशन कहाँ है?',
      rightPhrase: 'दाहिनी ओर मुड़िए',
      socialUnitTitle: 'सामाजिक संवाद और मित्रता',
      friendPhrase: 'आपसे मिलकर बहुत प्रसन्नता हुई!',
      goodbyePhrase: 'अलविदा, फिर मिलेंगे!'
    },
    tr: {
      alphabetTitle: 'Türk Alfabesi ve Telaffuz',
      vowelsNodeTitle: 'Ünlüler ve Yumuşak G (ç, ğ, ı, ö, ş, ü)',
      greetingsNodeTitle: 'Temel Selamlaşma ve Nezaket',
      cafeUnitTitle: 'Kafede Sipariş',
      coffeePhrase: 'Bir kahve lütfen.',
      waterPhrase: 'Bir bardak su lütfen.',
      billPhrase: 'Hesap lütfen.',
      directionsUnitTitle: 'Şehirde Yön Tarifi',
      stationPhrase: 'Tren istasyonu nerede?',
      rightPhrase: 'Sağa dönün',
      socialUnitTitle: 'Günlük Sohbet ve Tanışma',
      friendPhrase: 'Tanıştığımıza çok memnun oldum!',
      goodbyePhrase: 'Hoşça kalın, görüşmek üzere!'
    },
    pl: {
      alphabetTitle: 'Polski Alfabet i Wymowa',
      vowelsNodeTitle: 'Samogłoski nosowe i dwuznaki (ą, ę, sz, cz)',
      greetingsNodeTitle: 'Powitania i Zwroty Grzecznościowe',
      cafeUnitTitle: 'W Kawiarni i Restauracji',
      coffeePhrase: 'Poproszę jedną kawę.',
      waterPhrase: 'Poproszę wodę.',
      billPhrase: 'Rachunek poproszę.',
      directionsUnitTitle: 'Wskazówki Dojazdu',
      stationPhrase: 'Gdzie jest dworzec kolejowy?',
      rightPhrase: 'W prawo',
      socialUnitTitle: 'Rozmowa i Nowi Znajomi',
      friendPhrase: 'Bardzo miło cię poznać!',
      goodbyePhrase: 'Do widzenia, miłego dnia!'
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
    // ========================================================
    // MODULE 1: CEFR A1 — Survival Phrases, Greetings & Food
    // ========================================================
    {
      id: 'unit-a1',
      unitNumber: 1,
      title: isDutch ? `A1: Overlevingsfrasen & Begroetingen` : `A1: Survival Phrases & Essentials`,
      subhead: isDutch 
        ? `Essentiële begroetingen, beleefdheid, eten en drinken in het ${name}` 
        : `Survival phrases, greetings, essential food, and emergency vocabulary in ${name}`,
      themeColor: 'from-emerald-500 to-teal-600',
      accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      minCefr: 'A1',
      milestoneGems: 25,
      nodes: [
        {
          id: 'a1-greetings',
          title: isDutch ? 'Begroetingen & Beleefdheid' : 'Greetings & Courtesy',
          nativeTitle: lex.greetingsNodeTitle,
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch 
            ? `Leer warme begroetingen en afscheid nemen in het ${name}.` 
            : `Master foundational greetings and polite expressions in ${name}.`,
          xpReward: 35,
          gemReward: 8,
          targetDurationMinutes: 3,
          iconName: 'Sparkles',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-a1-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe begroet je iemand vriendelijk in het ${name}?` : `How do you greet someone in ${name}?`,
              targetPhrase: greeting,
              translation: isDutch ? 'Hallo / Goedendag' : 'Hello / Good day',
              options: [greeting, lex.goodbyePhrase, lex.billPhrase, lex.rightPhrase],
              correctAnswer: greeting,
              culturalNote: isDutch ? 'Standaard vriendelijke begroeting.' : 'Universal friendly greeting for all occasions.',
              exampleSentence: `— ${greeting}! ¿Cómo estás?`,
              exampleTranslation: 'Hello! How are you doing today?'
            },
            {
              id: 'ex-a1-2',
              type: 'sentence-scramble',
              prompt: isDutch ? `Bouw de beleefde afscheidsgroet:` : `Assemble the polite farewell:`,
              targetPhrase: lex.goodbyePhrase,
              translation: isDutch ? 'Tot ziens / Het ga je goed' : 'Goodbye / See you again',
              correctAnswer: lex.goodbyePhrase,
              scrambledWords: lex.goodbyePhrase.split(/\s+/).filter(Boolean),
              exampleSentence: `— ${lex.goodbyePhrase}`,
              exampleTranslation: 'Goodbye, have a wonderful day!'
            }
          ]
        },
        {
          id: 'a1-food',
          title: isDutch ? 'Eten, Drankjes & Bestellen' : 'Food, Drinks & Ordering',
          nativeTitle: lex.cafeUnitTitle,
          category: 'Conversation',
          cefr: 'A1',
          description: isDutch 
            ? `Bestel drankjes en vraag om de rekening in cafés.` 
            : `Order food and beverages confidently in daily life.`,
          xpReward: 40,
          gemReward: 10,
          targetDurationMinutes: 4,
          iconName: 'Coffee',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-a1-3',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe bestel je koffie in het ${name}?` : `How do you order coffee in ${name}?`,
              targetPhrase: lex.coffeePhrase,
              translation: isDutch ? 'Een koffie, alstublieft.' : 'A coffee, please.',
              options: [lex.coffeePhrase, lex.waterPhrase, lex.billPhrase, lex.stationPhrase],
              correctAnswer: lex.coffeePhrase,
              culturalNote: isDutch ? 'Voeg altijd "alstublieft" toe voor beleefdheid.' : 'Always append "please" for courteous dining etiquette.',
              exampleSentence: `— ${lex.coffeePhrase}`,
              exampleTranslation: 'One fresh coffee, please.'
            },
            {
              id: 'ex-a1-4',
              type: 'listening-comprehension',
              prompt: isDutch ? `Luister en kies wat de klant vraagt:` : `Listen and choose what is being requested:`,
              targetPhrase: lex.billPhrase,
              translation: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.',
              options: [lex.billPhrase, lex.waterPhrase, lex.coffeePhrase, greeting],
              correctAnswer: lex.billPhrase,
              exampleSentence: `— ${lex.billPhrase}`,
              exampleTranslation: 'The check, please, we are ready to pay.'
            }
          ]
        },
        {
          id: 'a1-emergency',
          title: isDutch ? 'Hulp & Noodgevallen' : 'Emergency & Survival Help',
          nativeTitle: isDutch ? 'Hulp & Noodzakelijke Woorden' : 'Emergency Assistance',
          category: 'Foundations',
          cefr: 'A1',
          description: isDutch 
            ? `Vraag om hulp en begrijp noodzakelijke overlevingszinnen.` 
            : `Ask for assistance in urgent or emergency situations.`,
          xpReward: 45,
          gemReward: 12,
          targetDurationMinutes: 3,
          iconName: 'ShieldAlert',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-a1-5',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe vraag je om water bij dorst?` : `How do you urgently ask for water?`,
              targetPhrase: lex.waterPhrase,
              translation: isDutch ? 'Water, alstublieft.' : 'Water, please.',
              options: [lex.waterPhrase, lex.rightPhrase, lex.stationPhrase, greeting],
              correctAnswer: lex.waterPhrase,
              culturalNote: isDutch ? 'Cruciale overlevingsfrase.' : 'Essential survival phrase when traveling.',
              exampleSentence: `— ${lex.waterPhrase}`,
              exampleTranslation: 'Water, please, as soon as possible.'
            }
          ]
        }
      ]
    },

    // ========================================================
    // MODULE 2: CEFR A2 — Navigation, Shopping & Routines
    // ========================================================
    {
      id: 'unit-a2',
      unitNumber: 2,
      title: isDutch ? `A2: Navigatie, Winkelen & Gewoonten` : `A2: Everyday Navigation & Routines`,
      subhead: isDutch 
        ? `Wegwijs in de stad, winkelen, dagelijkse routines en tijden` 
        : `Everyday navigation, shopping, routines, and simple temporal descriptions`,
      themeColor: 'from-blue-500 to-indigo-600',
      accentBg: 'bg-blue-50 text-blue-900 border-blue-200',
      minCefr: 'A2',
      milestoneGems: 30,
      nodes: [
        {
          id: 'a2-navigation',
          title: isDutch ? 'Wegwijzers & Vervoer' : 'Wayfinding & City Transit',
          nativeTitle: lex.directionsUnitTitle,
          category: 'Conversation',
          cefr: 'A2',
          description: isDutch 
            ? `Vraag naar het station en begrijp richtingsaanwijzingen.` 
            : `Locate train stations and follow street directions.`,
          xpReward: 50,
          gemReward: 12,
          targetDurationMinutes: 4,
          iconName: 'Compass',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-a2-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe vraag je naar het station in het ${name}?` : `How do you ask for the train station in ${name}?`,
              targetPhrase: lex.stationPhrase,
              translation: isDutch ? 'Waar is het station?' : 'Where is the station?',
              options: [lex.stationPhrase, lex.rightPhrase, lex.waterPhrase, greeting],
              correctAnswer: lex.stationPhrase,
              culturalNote: isDutch ? 'Stel je vraag beleefd met een begroeting.' : 'Best used by opening with a polite greeting.',
              exampleSentence: `— Disculpe, ¿${lex.stationPhrase}?`,
              exampleTranslation: 'Excuse me, where is the main station?'
            },
            {
              id: 'ex-a2-2',
              type: 'multiple-choice',
              prompt: isDutch ? `Wat betekent deze richting in het ${name}?` : `What does this navigation direction mean in ${name}?`,
              targetPhrase: lex.rightPhrase,
              translation: isDutch ? 'Naar rechts' : 'To the right',
              options: [lex.rightPhrase, lex.stationPhrase, lex.coffeePhrase, lex.goodbyePhrase],
              correctAnswer: lex.rightPhrase,
              culturalNote: isDutch ? 'Basisrichting voor straatnavigatie.' : 'Core directional cue for street navigation.',
              exampleSentence: `— Siga recto y luego gire a la derecha.`,
              exampleTranslation: 'Continue straight and then turn to the right.'
            }
          ]
        },
        {
          id: 'a2-shopping',
          title: isDutch ? 'Winkelen & Prijzen' : 'Shopping & Market Purchases',
          nativeTitle: isDutch ? 'Winkelen & Transacties' : 'Shopping & Everyday Transactions',
          category: 'Conversation',
          cefr: 'A2',
          description: isDutch 
            ? `Vraag naar prijzen en reken eenvoudig af in lokale winkels.` 
            : `Ask for prices and conduct simple store purchases.`,
          xpReward: 55,
          gemReward: 14,
          targetDurationMinutes: 4,
          iconName: 'ShoppingBag',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-a2-3',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe vraag je de rekening of prijs?` : `How do you request the final checkout?`,
              targetPhrase: lex.billPhrase,
              translation: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.',
              options: [lex.billPhrase, lex.stationPhrase, lex.coffeePhrase, lex.goodbyePhrase],
              correctAnswer: lex.billPhrase,
              exampleSentence: `— ¿Cuánto cuesta esto? ${lex.billPhrase}`,
              exampleTranslation: 'How much is this? The bill, please.'
            }
          ]
        }
      ]
    },

    // ========================================================
    // MODULE 3: CEFR B1 — Travel, Opinions & Storytelling
    // ========================================================
    {
      id: 'unit-b1',
      unitNumber: 3,
      title: isDutch ? `B1: Reizen, Meningen & Ervaringen` : `B1: Travel, Opinions & Storytelling`,
      subhead: isDutch 
        ? `Reissituaties beheren, meningen delen en eerdere ervaringen vertellen` 
        : `Travel, expressing opinions, work routines, and personal storytelling`,
      themeColor: 'from-purple-500 to-violet-600',
      accentBg: 'bg-purple-50 text-purple-900 border-purple-200',
      minCefr: 'B1',
      milestoneGems: 40,
      nodes: [
        {
          id: 'b1-social',
          title: isDutch ? 'Nieuwe Mensen & Vriendschap' : 'Meeting Friends & Dialogue',
          nativeTitle: lex.socialUnitTitle,
          category: 'Conversation',
          cefr: 'B1',
          description: isDutch 
            ? `Voer spontane gesprekken en maak warme connecties.` 
            : `Engage in friendly social conversation and establish connections.`,
          xpReward: 60,
          gemReward: 15,
          targetDurationMinutes: 5,
          iconName: 'Users',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-b1-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe begroet je een nieuwe vriend warm in het ${name}?` : `How do you warmly welcome a new friend in ${name}?`,
              targetPhrase: lex.friendPhrase,
              translation: isDutch ? 'Aangename kennismaking!' : 'Pleased to meet you!',
              options: [lex.friendPhrase, lex.billPhrase, lex.stationPhrase, lex.rightPhrase],
              correctAnswer: lex.friendPhrase,
              culturalNote: isDutch ? 'Warme sociale begroeting.' : 'Creates an instant comfortable bond.',
              exampleSentence: `— ¡Mucho gusto! ${lex.friendPhrase}`,
              exampleTranslation: 'A pleasure! Pleased to meet you!'
            }
          ]
        },
        {
          id: 'b1-storytelling',
          title: isDutch ? 'Verhalen & Ervaringen Delen' : 'Sharing Personal Experiences',
          nativeTitle: isDutch ? 'Ervaringen Vertellen' : 'Storytelling in Context',
          category: 'Conversation',
          cefr: 'B1',
          description: isDutch 
            ? `Beschrijf wat je gisteren beleefde en deel persoonlijke plannen.` 
            : `Narrate past adventures and personal travel memories.`,
          xpReward: 65,
          gemReward: 16,
          targetDurationMinutes: 5,
          iconName: 'BookOpen',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-b1-2',
              type: 'multiple-choice',
              prompt: isDutch ? `Iemand vertelt over gisteren: wat deden ze?` : `A friend recounts yesterday's outing:`,
              targetPhrase: isDutch ? 'Gisteren bezochten we een prachtig museum' : 'Yesterday we visited a wonderful museum',
              translation: isDutch ? 'Gisteren bezochten we een museum.' : 'Yesterday we visited a museum.',
              options: [
                isDutch ? 'Gisteren bezochten we een prachtig museum' : 'Yesterday we visited a wonderful museum',
                isDutch ? 'We blijven vandaag thuis' : 'We are staying home today',
                isDutch ? 'De trein vertrekt over tien minuten' : 'The train leaves in ten minutes',
                lex.billPhrase
              ],
              correctAnswer: isDutch ? 'Gisteren bezochten we een prachtig museum' : 'Yesterday we visited a wonderful museum',
              exampleSentence: 'Ayer fuimos al centro histórico y disfrutamos mucho.',
              exampleTranslation: 'Yesterday we visited the historic center and enjoyed it thoroughly.'
            }
          ]
        }
      ]
    },

    // ========================================================
    // MODULE 4: CEFR B2 — Debate, Workplace & Abstract Concepts
    // ========================================================
    {
      id: 'unit-b2',
      unitNumber: 4,
      title: isDutch ? `B2: Debat, Werkoverleg & Media` : `B2: Debate, Workplace & Media`,
      subhead: isDutch 
        ? `Complexe werksituaties, meningen beargumenteren en actuele media begrijpen` 
        : `Abstract concepts, debates, complex workplace interactions, and media`,
      themeColor: 'from-amber-500 to-orange-600',
      accentBg: 'bg-amber-50 text-amber-900 border-amber-200',
      minCefr: 'B2',
      milestoneGems: 50,
      nodes: [
        {
          id: 'b2-debate',
          title: isDutch ? 'Constructief Debat & Argumenten' : 'Debate & Persuasive Discussion',
          nativeTitle: isDutch ? 'Meningen Beargumenteren' : 'Constructive Reasoning',
          category: 'Professional',
          cefr: 'B2',
          description: isDutch 
            ? `Verdedig je standpunt beleefd en weeg alternatieven af.` 
            : `Defend points of view and articulate nuanced arguments.`,
          xpReward: 75,
          gemReward: 18,
          targetDurationMinutes: 5,
          iconName: 'MessageSquare',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-b2-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Hoe breng je beleefd een tegenwerping in?` : `How do you constructively introduce a counterpoint?`,
              targetPhrase: isDutch ? 'Ik begrijp je idee, maar we moeten ook rekening houden met de planning' : 'I see your point, but we must also consider the timeline',
              translation: isDutch ? 'Begrip tonen met een constructieve kanttekening' : 'Validating ideas while offering practical alternatives',
              options: [
                isDutch ? 'Ik begrijp je idee, maar we moeten ook rekening houden met de planning' : 'I see your point, but we must also consider the timeline',
                isDutch ? 'Dat idee is volledig onbruikbaar' : 'That concept is totally wrong',
                lex.stationPhrase,
                lex.waterPhrase
              ],
              correctAnswer: isDutch ? 'Ik begrijp je idee, maar we moeten ook rekening houden met de planning' : 'I see your point, but we must also consider the timeline',
              culturalNote: isDutch ? 'Essentieel voor professionele beleefdheid.' : 'Crucial for constructive professional collaboration.',
              exampleSentence: 'Entiendo tu propuesta; sin embargo, conviene revisar el presupuesto.',
              exampleTranslation: 'I understand your proposal; however, we should inspect the budget.'
            }
          ]
        },
        {
          id: 'b2-workplace',
          title: isDutch ? 'Professionele Samenwerking' : 'Workplace Project Collaboration',
          nativeTitle: isDutch ? 'Werkoverleg & Coördinatie' : 'Professional Teamwork',
          category: 'Professional',
          cefr: 'B2',
          description: isDutch 
            ? `Coördineer projecten en communiceer vlot met internationale collega's.` 
            : `Coordinate tasks and communicate effortlessly with colleagues.`,
          xpReward: 80,
          gemReward: 20,
          targetDurationMinutes: 6,
          iconName: 'Briefcase',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-b2-2',
              type: 'multiple-choice',
              prompt: isDutch ? `Wat stelt de collega voor over de presentatie?` : `What does your colleague propose regarding next steps?`,
              targetPhrase: isDutch ? 'Laten we de presentatie naar volgende week verschuiven' : 'Let us reschedule the presentation to next week',
              translation: isDutch ? 'Voorstel om de planning aan te passen' : 'Proposal to optimize the project calendar',
              options: [
                isDutch ? 'Laten we de presentatie naar volgende week verschuiven' : 'Let us reschedule the presentation to next week',
                isDutch ? 'We stoppen direct met het hele project' : 'We cancel the initiative completely',
                lex.coffeePhrase,
                greeting
              ],
              correctAnswer: isDutch ? 'Laten we de presentatie naar volgende week verschuiven' : 'Let us reschedule the presentation to next week',
              exampleSentence: 'Propongo coordinar una breve reunión técnica mañana.',
              exampleTranslation: 'I propose scheduling a quick alignment meeting tomorrow.'
            }
          ]
        }
      ]
    },

    // ========================================================
    // MODULE 5: CEFR C1/C2 — Nuance, Idioms & Cultural Fluency
    // ========================================================
    {
      id: 'unit-c1-c2',
      unitNumber: 5,
      title: isDutch ? `C1/C2: Genuanceerde Beheersing & Idioom` : `C1/C2: Nuance, Idioms & Cultural Fluency`,
      subhead: isDutch 
        ? `Genuanceerde expressie, idiomatische beheersing en culturele spreekwoorden` 
        : `Nuanced expressions, idiomatic fluency, cultural proverbs, and advanced discussion`,
      themeColor: 'from-rose-500 to-pink-600',
      accentBg: 'bg-rose-50 text-rose-900 border-rose-200',
      minCefr: 'C1',
      milestoneGems: 60,
      nodes: [
        {
          id: 'c1-nuance',
          title: isDutch ? 'Subtiele Betekenis & Tussen de Regels' : 'Subtle Nuance & Subtext',
          nativeTitle: isDutch ? 'Diepe Betekenis & Toon' : 'Subtlety & Expressive Tone',
          category: 'Advanced Mastery',
          cefr: 'C1',
          description: isDutch 
            ? `Begrijp ironie, dubbele bodems en impliciete bedoelingen.` 
            : `Comprehend implicit humor, subtext, and subtle registers.`,
          xpReward: 90,
          gemReward: 22,
          targetDurationMinutes: 6,
          iconName: 'Crown',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-c1-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Iemand zegt "tussen de regels lezen". Wat betekent dit?` : `What does reading between the lines mean in context?`,
              targetPhrase: isDutch ? 'De onderliggende bedoeling begrijpen die niet direct uitgesproken is' : 'Understanding underlying intentions not directly spoken',
              translation: isDutch ? 'Genuanceerd empathisch luisteren' : 'Perceiving subtext and unspoken nuances',
              options: [
                isDutch ? 'De onderliggende bedoeling begrijpen die niet direct uitgesproken is' : 'Understanding underlying intentions not directly spoken',
                isDutch ? 'Een boek letterlijk heel snel doorbladeren' : 'Flipping through printed pages quickly',
                lex.stationPhrase,
                lex.goodbyePhrase
              ],
              correctAnswer: isDutch ? 'De onderliggende bedoeling begrijpen die niet direct uitgesproken is' : 'Understanding underlying intentions not directly spoken',
              exampleSentence: 'Su comentario contenía una sutil ironía comprensible para pocos.',
              exampleTranslation: 'Their remark held subtle irony appreciated by attentive listeners.'
            }
          ]
        },
        {
          id: 'c2-proverbs',
          title: isDutch ? 'Culturele Spreekwoorden & Idioom' : 'Cultural Proverbs & Heritage Idioms',
          nativeTitle: isDutch ? 'Volledige Moedertaalbeheersing' : 'Native Idiomatic Mastery',
          category: 'Advanced Mastery',
          cefr: 'C2',
          description: isDutch 
            ? `Gebruik diep culturele beeldspraak en spreekwoorden zoals moedertaalsprekers.` 
            : `Employ deep cultural idioms and proverbs with authentic native precision.`,
          xpReward: 100,
          gemReward: 25,
          targetDurationMinutes: 6,
          iconName: 'Award',
          coordinates: { x: 0, y: 0 },
          exercises: [
            {
              id: 'ex-c2-1',
              type: 'multiple-choice',
              prompt: isDutch ? `Wat betekent het spreekwoord "het licht aan het einde van de tunnel zien"?` : `What does "seeing the light at the end of the tunnel" signify?`,
              targetPhrase: isDutch ? 'Hoop en opluchting dat een zware periode bijna overwonnen is' : 'Relief and confidence that a challenging period is concluding',
              translation: isDutch ? 'Spreekwoord voor hoopvol perspectief' : 'Idiom representing hopeful triumph over hardship',
              options: [
                isDutch ? 'Hoop en opluchting dat een zware periode bijna overwonnen is' : 'Relief and confidence that a challenging period is concluding',
                isDutch ? 'Letterlijk een trein zien aankomen in een station' : 'Literally observing an oncoming train',
                lex.rightPhrase,
                lex.billPhrase
              ],
              correctAnswer: isDutch ? 'Hoop en opluchting dat een zware periode bijna overwonnen is' : 'Relief and confidence that a challenging period is concluding',
              culturalNote: isDutch ? 'Teken van hoogste idiomatische spreekvaardigheid.' : 'Hallmark of effortless C2 native discourse.',
              exampleSentence: 'Tras meses de intenso esfuerzo colectivo, por fin vemos la luz al final del túnel.',
              exampleTranslation: 'After months of collective dedication, we finally see light at the end of the tunnel.'
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

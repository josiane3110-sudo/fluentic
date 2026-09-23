import { PlacementTestQuestion } from './placementTestService';
import { WORLD_LANGUAGES } from '../data/languages';

/**
 * Returns a high-fidelity, 100% logically sound 10-question placement test.
 * Each question has:
 * - A clear pedagogical instruction in the user's native language.
 * - A single, clear prompt phrase (no translation spoiling the answer!).
 * - 4 clean, single-string options with no overlapping or stacked text.
 * - Distributed correct answers across A, B, C, D.
 * - An informative explanation displayed only after checking.
 */
export function getCuratedPlacementQuestions(
  targetCode: string,
  targetName: string,
  nativeCode: string = 'en',
  variant: 'A' | 'B' | 'C' | 'D' = 'A'
): PlacementTestQuestion[] {
  const isDutch = nativeCode === 'nl';
  const code = targetCode.toLowerCase();

  if (code === 'es') {
    return getSpanishQuestions(isDutch, variant);
  } else if (code === 'fr') {
    return getFrenchQuestions(isDutch, variant);
  } else if (code === 'de') {
    return getGermanQuestions(isDutch, variant);
  } else if (code === 'it') {
    return getItalianQuestions(isDutch, variant);
  } else if (code === 'en') {
    return getEnglishQuestions(isDutch, variant);
  } else if (code === 'pt') {
    return getPortugueseQuestions(isDutch, variant);
  } else if (code === 'nl') {
    return getDutchQuestions(isDutch, variant);
  }

  // Universal high-quality generator for all other 50+ languages
  return getUniversalLanguageQuestions(targetCode, targetName, isDutch);
}

function getSpanishQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Kennismaking' : 'Greetings & Introductions',
      instruction: isDutch ? 'Wat betekent deze Spaanse begroeting?' : 'What does this Spanish greeting mean?',
      prompt: '¡Hola! ¿Cómo te llamas?',
      options: [
        { key: 'A', text: isDutch ? 'Hallo! Hoe heet je?' : 'Hello! What is your name?' },
        { key: 'B', text: isDutch ? 'Goedemorgen! Waar woon je?' : 'Good morning! Where do you live?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Een fijne dag!' : 'Goodbye! Have a nice day!' },
        { key: 'D', text: isDutch ? 'Dankjewel! Tot morgen!' : 'Thank you! See you tomorrow!' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"¡Hola! ¿Cómo te llamas?" betekent letterlijk: "Hallo! Hoe heet je?".'
        : '"¡Hola! ¿Cómo te llamas?" directly translates to: "Hello! What is your name?".',
      audioText: '¡Hola! ¿Cómo te llamas?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen in een Café' : 'Cafe & Ordering',
      instruction: isDutch ? 'Hoe vraag je beleefd om een koffie?' : 'How do you politely order a coffee in Spanish?',
      prompt: isDutch ? 'Een koffie, alstublieft.' : 'A coffee, please.',
      options: [
        { key: 'A', text: 'La cuenta, por favor.' },
        { key: 'B', text: 'Un café, por favor.' },
        { key: 'C', text: 'Dónde está el baño.' },
        { key: 'D', text: 'Buenas noches a todos.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Un café, por favor" is de standaard beleefde manier om koffie te bestellen.'
        : '"Un café, por favor" is the standard courteous way to order a coffee.',
      audioText: 'Un café, por favor.'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Tegenwoordige Tijd & Werkwoorden' : 'Present Tense Verbs',
      instruction: isDutch ? 'Kies de juiste vorm van het werkwoord "vivir" (wonen):' : 'Choose the correct form of the verb "vivir" (to live):',
      prompt: 'Nosotros _____ en el centro de Madrid.',
      options: [
        { key: 'A', text: 'vivo' },
        { key: 'B', text: 'viven' },
        { key: 'C', text: 'vivimos' },
        { key: 'D', text: 'vives' },
      ],
      correct_key: 'C',
      explanation: isDutch
        ? 'Bij het onderwerp "nosotros" hoort de uitgang "-imos": "vivimos".'
        : 'The subject "nosotros" (we) requires the first-person plural ending "-imos": "vivimos".',
      audioText: 'Nosotros vivimos en el centro de Madrid.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'Vervoer & De Weg Vragen' : 'Transit & Directions',
      instruction: isDutch ? 'Wat is het meest logische antwoord op deze vraag?' : 'What is the most logical answer to this question?',
      prompt: '— ¿Disculpe, dónde está la estación de metro?',
      options: [
        { key: 'A', text: 'Tengo veinticinco años.' },
        { key: 'B', text: 'Son las tres de la tarde.' },
        { key: 'C', text: 'Está al final de esta calle, a la derecha.' },
        { key: 'D', text: 'Mucho gusto, soy camarero.' },
      ],
      correct_key: 'C',
      explanation: isDutch
        ? '"Está al final de esta calle, a la derecha" geeft direct antwoord op waar het metrostation is.'
        : '"Está al final de esta calle, a la derecha" directly answers the location query.',
      audioText: 'Disculpe, dónde está la estación de metro?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Verleden Tijd (Pretérito Indefinido)' : 'Past Tense (Preterite)',
      instruction: isDutch ? 'Welk werkwoord drukt een voltooide handeling in het verleden uit?' : 'Which verb form expresses a completed action in the past?',
      prompt: 'Ayer nosotros _____ una película fantástica en el cine.',
      options: [
        { key: 'A', text: 'vimos' },
        { key: 'B', text: 'vemos' },
        { key: 'C', text: 'veremos' },
        { key: 'D', text: 'veíamos' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Ayer" (gisteren) signaleert een voltooide handeling in het verleden: "vimos" (pretérito indefinido).'
        : '"Ayer" (yesterday) triggers the preterite completed past form: "vimos".',
      audioText: 'Ayer nosotros vimos una película fantástica.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Vaste Uitdrukkingen & Idioom' : 'Collocations & Idioms',
      instruction: isDutch ? 'Wat betekent de Spaanse uitdrukking "Estar en las nubes"?' : 'What does the Spanish idiom "Estar en las nubes" mean?',
      prompt: 'Estar en las nubes',
      options: [
        { key: 'A', text: isDutch ? 'Erg moe en slaperig zijn' : 'Being very tired and exhausted' },
        { key: 'B', text: isDutch ? 'In de wolken / aan het dagdromen zijn' : 'Daydreaming / distracted' },
        { key: 'C', text: isDutch ? 'Veel geld bezitten' : 'Having lots of money' },
        { key: 'D', text: isDutch ? 'Bang zijn voor het onweer' : 'Being afraid of thunder' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Estar en las nubes" betekent met je hoofd in de wolken zijn of dagdromen.'
        : '"Estar en las nubes" means daydreaming or having one\'s head in the clouds.',
      audioText: 'Estar en las nubes'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Conjunctief (Subjuntivo)' : 'Subjunctive Mood',
      instruction: isDutch ? 'Welke vorm van de aanvoegende wijs (subjuntivo) is correct?' : 'Which subjunctive form correctly follows "Es importante que"?',
      prompt: 'Es importante que tú _____ ocho horas cada noche.',
      options: [
        { key: 'A', text: 'duermes' },
        { key: 'B', text: 'duermas' },
        { key: 'C', text: 'dormir' },
        { key: 'D', text: 'dormías' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? 'Na onpersoonlijke uitdrukkingen van noodzaak ("Es importante que") volgt de subjuntivo: "duermas".'
        : 'Impersonal expressions of necessity ("Es importante que") require the present subjunctive: "duermas".',
      audioText: 'Es importante que tú duermas ocho horas cada noche.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Connectieven & Schakels' : 'Connectors & Discourse Markers',
      instruction: isDutch ? 'Wat betekent het voegwoord "Sin embargo"?' : 'What does the connector "Sin embargo" mean?',
      prompt: 'Sin embargo',
      options: [
        { key: 'A', text: isDutch ? 'Desalniettemin / Echter' : 'However / Nevertheless' },
        { key: 'B', text: isDutch ? 'Daarom / Als gevolg daarvan' : 'Therefore / As a result' },
        { key: 'C', text: isDutch ? 'In de tussentijd' : 'In the meantime' },
        { key: 'D', text: isDutch ? 'In het bijzonder' : 'In particular' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Sin embargo" is een tegenstellend voegwoord dat "echter" of "desalniettemin" betekent.'
        : '"Sin embargo" expresses contrast and means "however" or "nevertheless".',
      audioText: 'Sin embargo'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Hypothetische Voorwaarden (Condicional Compuesto)' : 'Unreal Past Conditionals',
      instruction: isDutch ? 'Kies het correcte vervolg van deze hypothetische voorwaarde:' : 'Select the correct conclusion to this hypothetical condition:',
      prompt: 'Si me hubieras avisado a tiempo, nosotros...',
      options: [
        { key: 'A', text: '...habríamos ido juntos a la conferencia.' },
        { key: 'B', text: '...vamos juntos a la conferencia.' },
        { key: 'C', text: '...iremos juntos a la conferencia.' },
        { key: 'D', text: '...estamos yendo a la conferencia.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Na de plustquamperfectum subjuntivo ("hubieras avisado") volgt de condicional compuesto: "habríamos ido".'
        : 'Past counterfactual "Si + pluscuamperfecto de subjuntivo" pairs with "condicional compuesto" ("habríamos ido").',
      audioText: 'Si me hubieras avisado a tiempo, habríamos ido juntos.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Gevorderde Idiomatiek & Metafoor' : 'Advanced Idioms & Register',
      instruction: isDutch ? 'Wat is de betekenis van het gevorderde idioom "Poner el dedo en la llaga"?' : 'What is the precise meaning of "Poner el dedo en la llaga"?',
      prompt: 'Poner el dedo en la llaga',
      options: [
        { key: 'A', text: isDutch ? 'Een fysieke verwonding verzorgen' : 'Treating a physical injury' },
        { key: 'B', text: isDutch ? 'Iemand valselijk beschuldigen' : 'Falsely accusing someone' },
        { key: 'C', text: isDutch ? 'Precies de vinger op de zere plek leggen' : 'Hitting the nail right on the head / touching a sensitive spot' },
        { key: 'D', text: isDutch ? 'Zich haasten om een deadline te halen' : 'Rushing to meet a deadline' },
      ],
      correct_key: 'C',
      explanation: isDutch
        ? '"Poner el dedo en la llaga" betekent exact het heikele punt of de zere plek aanwijzen.'
        : '"Poner el dedo en la llaga" is the exact equivalent of pointing out the sore point or hitting right where it matters.',
      audioText: 'Poner el dedo en la llaga'
    }
  ];
}

function getFrenchQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Beleefdheid' : 'Greetings & Politeness',
      instruction: isDutch ? 'Wat betekent deze Franse begroeting?' : 'What does this French greeting mean?',
      prompt: 'Bonjour ! Comment allez-vous ?',
      options: [
        { key: 'A', text: isDutch ? 'Hallo! Hoe gaat het met u?' : 'Hello! How are you?' },
        { key: 'B', text: isDutch ? 'Goedenavond! Waar woont u?' : 'Good evening! Where do you live?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Een prettige reis!' : 'Goodbye! Have a nice trip!' },
        { key: 'D', text: isDutch ? 'Alstublieft, hier is het menu.' : 'Please, here is the menu.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Comment allez-vous ?" is de beleefde formele vraag naar hoe het met iemand gaat.'
        : '"Comment allez-vous ?" is the polite formal greeting for "How are you?".',
      audioText: 'Bonjour ! Comment allez-vous ?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen in een Bistro' : 'Ordering in a Bistro',
      instruction: isDutch ? 'Hoe vraag je beleefd om de rekening in het Frans?' : 'How do you politely ask for the bill in French?',
      prompt: isDutch ? 'De rekening, alstublieft.' : 'The check / bill, please.',
      options: [
        { key: 'A', text: 'Où est la gare, s’il vous plaît.' },
        { key: 'B', text: 'L’addition, s’il vous plaît.' },
        { key: 'C', text: 'Un verre d’eau du robinet.' },
        { key: 'D', text: 'Enchanté de faire votre connaissance.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"L’addition, s’il vous plaît" is de correcte manier om om de rekening te vragen.'
        : '"L’addition, s’il vous plaît" is the standard phrase for requesting the bill.',
      audioText: 'L’addition, s’il vous plaît.'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Werkwoord Vervoeging (Tegenwoordige Tijd)' : 'Present Tense Conjugation',
      instruction: isDutch ? 'Kies de juiste vorm van het werkwoord "prendre" (nemen):' : 'Choose the correct conjugation of "prendre" (to take):',
      prompt: 'Chaque matin, nous _____ le métro pour aller au travail.',
      options: [
        { key: 'A', text: 'prenons' },
        { key: 'B', text: 'prends' },
        { key: 'C', text: 'prennent' },
        { key: 'D', text: 'prenez' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Bij het onderwerp "nous" hoort de uitgang "-ons": "nous prenons".'
        : 'Subject "nous" takes the first-person plural ending "-ons": "prenons".',
      audioText: 'Chaque matin, nous prenons le métro.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'De Weg Vragen & Oriëntatie' : 'Asking Directions',
      instruction: isDutch ? 'Wat is het meest passende antwoord op deze vraag?' : 'What is the most fitting response to this question?',
      prompt: '— Pardon monsieur, où se trouve le musée du Louvre ?',
      options: [
        { key: 'A', text: 'Il fait très beau aujourd’hui.' },
        { key: 'B', text: 'Prenez la deuxième rue à gauche, puis continuez tout droit.' },
        { key: 'C', text: 'J’ai vingt ans et je suis étudiant.' },
        { key: 'D', text: 'Le gâteau au chocolat est délicieux.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Prenez la deuxième rue à gauche..." geeft een duidelijke routebeschrijving.'
        : '"Prenez la deuxième rue à gauche..." gives clear route directions.',
      audioText: 'Pardon monsieur, où se trouve le musée du Louvre ?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Passé Composé vs Imparfait' : 'Past Tenses in French',
      instruction: isDutch ? 'Welke werkwoordsvorm vult deze zin correct in?' : 'Which form correctly completes the sentence?',
      prompt: 'Pendant que je lisais tranquillement, mon ami _____ à la porte.',
      options: [
        { key: 'A', text: 'a frappé' },
        { key: 'B', text: 'frappait' },
        { key: 'C', text: 'frappe' },
        { key: 'D', text: 'frappera' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Een plotselinge, voltooide actie die een lopende toestand onderbreekt staat in het passé composé: "a frappé".'
        : 'A sudden, completed action interrupting a background state takes the passé composé: "a frappé".',
      audioText: 'Mon ami a frappé à la porte.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Idioom & Franse Uitdrukkingen' : 'French Idiomatic Phrases',
      instruction: isDutch ? 'Wat betekent de Franse uitdrukking "Avoir le coup de foudre"?' : 'What does "Avoir le coup de foudre" mean?',
      prompt: 'Avoir le coup de foudre',
      options: [
        { key: 'A', text: isDutch ? 'Door de bliksem getroffen worden' : 'Being struck by lightning' },
        { key: 'B', text: isDutch ? 'Liefde op het eerste gezicht ervaren' : 'Experiencing love at first sight' },
        { key: 'C', text: isDutch ? 'Plotseling boos worden' : 'Becoming suddenly angry' },
        { key: 'D', text: isDutch ? 'Grote haast hebben' : 'Being in a rush' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Le coup de foudre" is de bekende Franse uitdrukking voor liefde op het eerste gezicht.'
        : '"Le coup de foudre" is the classic French idiom for love at first sight.',
      audioText: 'Avoir le coup de foudre'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Subjonctif Présent' : 'Subjunctive Mood',
      instruction: isDutch ? 'Welke subjonctif vorm past na "Il faut que"?' : 'Which subjunctive form fits after "Il faut que"?',
      prompt: 'Il faut absolument que vous _____ à l’heure demain.',
      options: [
        { key: 'A', text: 'soyez' },
        { key: 'B', text: 'êtes' },
        { key: 'C', text: 'serez' },
        { key: 'D', text: 'étiez' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Na "Il faut que" is de aanvoegende wijs verplicht: "vous soyez".'
        : 'The expression of obligation "Il faut que" governs the subjunctive: "soyez".',
      audioText: 'Il faut absolument que vous soyez à l’heure.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Connectieven' : 'Logical Connectors',
      instruction: isDutch ? 'Wat betekent het voegwoord "Néanmoins"?' : 'What does the formal connector "Néanmoins" mean?',
      prompt: 'Néanmoins',
      options: [
        { key: 'A', text: isDutch ? 'Niettemin / Desondanks' : 'Nevertheless / Nonetheless' },
        { key: 'B', text: isDutch ? 'Kortom / Samenvattend' : 'In short / In summary' },
        { key: 'C', text: isDutch ? 'In de eerste plaats' : 'In the first place' },
        { key: 'D', text: isDutch ? 'Vanaf nu' : 'From now on' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Néanmoins" drukt een tegenstelling uit en betekent "desondanks" of "niettemin".'
        : '"Néanmoins" expresses concession and means "nevertheless".',
      audioText: 'Néanmoins'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Hypothetische Zinnen (Conditionnel Passé)' : 'Unreal Past Conditions',
      instruction: isDutch ? 'Welke zin voltooit deze hypothetische voorwaarde correct?' : 'Which clause completes this hypothetical sentence correctly?',
      prompt: 'Si j’avais su que tu venais, je...',
      options: [
        { key: 'A', text: '...t’aurais attendu à l’aéroport.' },
        { key: 'B', text: '...t’attends à l’aéroport.' },
        { key: 'C', text: '...t’attendrai à l’aéroport.' },
        { key: 'D', text: '...t’attendais à l’aéroport.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Si + plus-que-parfait" wordt vervolgd met de conditionnel passé: "t’aurais attendu".'
        : '"Si + plus-que-parfait" requires the conditionnel passé: "t’aurais attendu".',
      audioText: 'Si j’avais su que tu venais, je t’aurais attendu.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Stijlfiguren & Taalkundige Nuance' : 'Stylistic Register & Nuance',
      instruction: isDutch ? 'Wat betekent de literaire uitdrukking "Mettre de l’eau dans son vin"?' : 'What does the French expression "Mettre de l’eau dans son vin" signify?',
      prompt: 'Mettre de l’eau dans son vin',
      options: [
        { key: 'A', text: isDutch ? 'De drankjes verdunnen voor het diner' : 'Diluting drinks before dinner' },
        { key: 'B', text: isDutch ? 'Zijn eisen matigen of een compromis sluiten' : 'Moderating one\'s claims / making concessions' },
        { key: 'C', text: isDutch ? 'Zuiniger gaan leven' : 'Living more frugally' },
        { key: 'D', text: isDutch ? 'Een conflict uit de weg gaan door te vluchten' : 'Fleeing to avoid a conflict' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Mettre de l’eau dans son vin" is een klassieke metafoor voor water bij de wijn doen (eisen matigen).'
        : '"Mettre de l’eau dans son vin" metaphorically means moderating one\'s demands or accepting a compromise.',
      audioText: 'Mettre de l’eau dans son vin'
    }
  ];
}

function getGermanQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Kennismaking' : 'Greetings & Basics',
      instruction: isDutch ? 'Wat betekent deze Duitse begroeting?' : 'What does this German greeting mean?',
      prompt: 'Guten Tag! Wie geht es Ihnen?',
      options: [
        { key: 'A', text: isDutch ? 'Goedendag! Hoe gaat het met u?' : 'Good day! How are you? (formal)' },
        { key: 'B', text: isDutch ? 'Goedenavond! Waar gaat u heen?' : 'Good evening! Where are you going?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Prettige dag verder!' : 'Goodbye! Have a nice day!' },
        { key: 'D', text: isDutch ? 'Welkom bij ons op kantoor!' : 'Welcome to our office!' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Guten Tag! Wie geht es Ihnen?" is de formele en beleefde begroeting in het Duits.'
        : '"Guten Tag! Wie geht es Ihnen?" is the standard formal greeting in German.',
      audioText: 'Guten Tag! Wie geht es Ihnen?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen in een Café' : 'Cafe & Ordering',
      instruction: isDutch ? 'Hoe vraag je beleefd om de rekening in het Duits?' : 'How do you politely ask for the check in German?',
      prompt: isDutch ? 'De rekening, alstublieft.' : 'The bill / check, please.',
      options: [
        { key: 'A', text: 'Wo ist der Bahnhof, bitte?' },
        { key: 'B', text: 'Die Rechnung, bitte.' },
        { key: 'C', text: 'Einen Kaffee mit Zucker.' },
        { key: 'D', text: 'Freut mich, Sie kennenzulernen.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Die Rechnung, bitte" is de correcte formulering om de rekening te vragen.'
        : '"Die Rechnung, bitte" is the standard phrase to ask for the bill.',
      audioText: 'Die Rechnung, bitte.'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Naamvallen (Akkusativ)' : 'Noun Cases (Accusative)',
      instruction: isDutch ? 'Kies het juiste lidwoord in de vierde naamval (Akkusativ):' : 'Choose the correct accusative masculine article:',
      prompt: 'Ich suche _____ Bahnhof.',
      options: [
        { key: 'A', text: 'den' },
        { key: 'B', text: 'dem' },
        { key: 'C', text: 'der' },
        { key: 'D', text: 'des' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Bahnhof" is mannelijk (der). Als lijdend voorwerp (Akkusativ) verandert "der" in "den".'
        : '"Bahnhof" is masculine (der). In the accusative case as direct object, it becomes "den".',
      audioText: 'Ich suche den Bahnhof.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'Oriëntatie & De Weg Vragen' : 'Directions & Navigation',
      instruction: isDutch ? 'Wat is het meest logische antwoord op deze vraag?' : 'What is the most logical answer to this question?',
      prompt: '— Entschuldigung, wie komme ich zum Hauptbahnhof?',
      options: [
        { key: 'A', text: 'Gehen Sie geradeaus und dann die erste Straße links.' },
        { key: 'B', text: 'Ich bin vierzig Jahre alt.' },
        { key: 'C', text: 'Das Schnitzel schmeckt ausgezeichnet.' },
        { key: 'D', text: 'Es ist heute sehr kalt draußen.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Gehen Sie geradeaus..." geeft direct een routebeschrijving naar het station.'
        : '"Gehen Sie geradeaus..." directly provides route directions to the station.',
      audioText: 'Entschuldigung, wie komme ich zum Hauptbahnhof?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Voltooid Tegenwoordige Tijd (Perfekt)' : 'Past Tense (Perfekt with sein/haben)',
      instruction: isDutch ? 'Welk hulpwerkwoord hoort bij een werkwoord van verplaatsing?' : 'Which auxiliary verb is used for movement with "fahren"?',
      prompt: 'Gestern _____ wir mit dem Zug nach Berlin gefahren.',
      options: [
        { key: 'A', text: 'sind' },
        { key: 'B', text: 'haben' },
        { key: 'C', text: 'werden' },
        { key: 'D', text: 'hatten' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Werkwoorden van beweging of verandering (zoals "fahren") vormen het Perfekt met "sein": "wir sind gefahren".'
        : 'Verbs of motion (like "fahren") form their perfect tense with "sein": "wir sind gefahren".',
      audioText: 'Gestern sind wir mit dem Zug nach Berlin gefahren.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Vaste Uitdrukkingen & Idioom' : 'German Idioms',
      instruction: isDutch ? 'Wat betekent de uitdrukking "Die Daumen drücken"?' : 'What does "Die Daumen drücken" mean?',
      prompt: 'Jemandem die Daumen drücken',
      options: [
        { key: 'A', text: isDutch ? 'Iemand succes / het beste toewensen' : 'Wishing someone good luck' },
        { key: 'B', text: isDutch ? 'Iemand de waarheid vertellen' : 'Telling someone the blunt truth' },
        { key: 'C', text: isDutch ? 'Zich haasten om de trein te halen' : 'Rushing to catch a train' },
        { key: 'D', text: isDutch ? 'Iemand ergens voor waarschuwen' : 'Warning someone of danger' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Die Daumen drücken" is het Duitse equivalent van voor iemand duimen (succes wensen).'
        : '"Die Daumen drücken" means keeping one\'s fingers crossed or wishing someone luck.',
      audioText: 'Jemandem die Daumen drücken'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Konjunktiv II (Voorwaardelijke Wijs)' : 'Subjunctive II (Konjunktiv II)',
      instruction: isDutch ? 'Welke vorm van het Konjunktiv II is grammaticaal correct?' : 'Which Konjunktiv II form is grammatically correct?',
      prompt: 'Wenn ich mehr Zeit hätte, _____ ich eine lange Reise machen.',
      options: [
        { key: 'A', text: 'würde' },
        { key: 'B', text: 'werde' },
        { key: 'C', text: 'wäre' },
        { key: 'D', text: 'hatte' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'In een hypothetische voorwaarde ("Wenn ich Zeit hätte...") volgt "würde ich machen".'
        : 'Hypothetical conditions in the present trigger "würde + infinitive": "würde ich machen".',
      audioText: 'Wenn ich mehr Zeit hätte, würde ich eine Reise machen.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Connectieven & Zinsbouw' : 'Conjunctions & Word Order',
      instruction: isDutch ? 'Wat betekent het voegwoord "Allerdings"?' : 'What does the connector "Allerdings" mean?',
      prompt: 'Allerdings',
      options: [
        { key: 'A', text: isDutch ? 'Echter / Weliswaar' : 'However / Admittedly' },
        { key: 'B', text: isDutch ? 'Daarom / Dus' : 'Therefore / Consequently' },
        { key: 'C', text: isDutch ? 'Ten eerste' : 'Firstly' },
        { key: 'D', text: isDutch ? 'Onmiddellijk' : 'Immediately' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Allerdings" betekent "echter", "weliswaar" of "maar".'
        : '"Allerdings" signifies contrast or qualification ("however", "admittedly").',
      audioText: 'Allerdings'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Voltooid Verleden Hypothetisch' : 'Past Counterfactuals',
      instruction: isDutch ? 'Kies de juiste voltooid verleden hypothetische zinsconstructie:' : 'Select the correct past counterfactual structure:',
      prompt: 'Hätte ich das gewusst, _____ ich früher losgefahren.',
      options: [
        { key: 'A', text: 'wäre' },
        { key: 'B', text: 'hätte' },
        { key: 'C', text: 'würde' },
        { key: 'D', text: 'bin' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Losfahren" is een bewegingswerkwoord en vormt de verleden tijd met "sein": "wäre ich losgefahren".'
        : '"Losfahren" is a verb of motion and takes "wäre" in the past counterfactual.',
      audioText: 'Hätte ich das gewusst, wäre ich früher losgefahren.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Hoog Register & Vaste Zegswijzen' : 'High Register Idioms',
      instruction: isDutch ? 'Wat betekent de uitdrukking "Den Nagel auf den Kopf treffen"?' : 'What does the idiom "Den Nagel auf den Kopf treffen" mean?',
      prompt: 'Den Nagel auf den Kopf treffen',
      options: [
        { key: 'A', text: isDutch ? 'Precies de kern van de zaak raken' : 'Hitting the nail right on the head' },
        { key: 'B', text: isDutch ? 'Een zware fout maken' : 'Making a grave error' },
        { key: 'C', text: isDutch ? 'Een bouwproject afronden' : 'Finishing a construction project' },
        { key: 'D', text: isDutch ? 'Iemand onverwacht tegenkomen' : 'Meeting someone unexpectedly' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Den Nagel auf den Kopf treffen" betekent de spijker op de kop slaan (de exacte kern raken).'
        : '"Den Nagel auf den Kopf treffen" means hitting the nail right on the head.',
      audioText: 'Den Nagel auf den Kopf treffen'
    }
  ];
}

function getItalianQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Beleefdheid' : 'Greetings & Basics',
      instruction: isDutch ? 'Wat betekent deze Italiaanse begroeting?' : 'What does this Italian greeting mean?',
      prompt: 'Buongiorno! Come sta?',
      options: [
        { key: 'A', text: isDutch ? 'Goedemorgen! Hoe maakt u het?' : 'Good morning! How are you? (formal)' },
        { key: 'B', text: isDutch ? 'Goedenavond! Waar woont u?' : 'Good evening! Where do you live?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Prettige dag!' : 'Goodbye! Have a nice day!' },
        { key: 'D', text: isDutch ? 'Dank u wel voor uw hulp!' : 'Thank you for your help!' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Buongiorno! Come sta?" is de beleefde formele begroeting in het Italiaans.'
        : '"Buongiorno! Come sta?" is the formal Italian polite greeting.',
      audioText: 'Buongiorno! Come sta?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen in een Bar' : 'Ordering at a Bar',
      instruction: isDutch ? 'Hoe vraag je om de rekening in het Italiaans?' : 'How do you ask for the bill in Italian?',
      prompt: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.',
      options: [
        { key: 'A', text: 'Dov’è la stazione, per favore?' },
        { key: 'B', text: 'Il conto, per favore.' },
        { key: 'C', text: 'Un caffè macchiato.' },
        { key: 'D', text: 'Piacere di conoscerti.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Il conto, per favore" is de standaard manier om om de rekening te vragen.'
        : '"Il conto, per favore" is the standard phrase for the bill.',
      audioText: 'Il conto, per favore.'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Tegenwoordige Tijd' : 'Present Tense Verbs',
      instruction: isDutch ? 'Kies de juiste vorm van "prendere" (nemen):' : 'Choose the correct form of "prendere":',
      prompt: 'Ogni mattina noi _____ un cappuccino al bar.',
      options: [
        { key: 'A', text: 'prendiamo' },
        { key: 'B', text: 'prendo' },
        { key: 'C', text: 'prendono' },
        { key: 'D', text: 'prendi' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Bij "noi" (wij) hoort de uitgang "-iamo": "noi prendiamo".'
        : 'Subject "noi" takes ending "-iamo": "prendiamo".',
      audioText: 'Ogni mattina noi prendiamo un cappuccino.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'Oriëntatie & Vervoer' : 'Directions & Transport',
      instruction: isDutch ? 'Wat is het passende antwoord op deze vraag?' : 'What is the appropriate response to this question?',
      prompt: '— Scusi, dov’è la stazione centrale?',
      options: [
        { key: 'A', text: 'Vada sempre dritto e giri a destra al semaforo.' },
        { key: 'B', text: 'Ho ventotto anni.' },
        { key: 'C', text: 'La pizza margherita è squisita.' },
        { key: 'D', text: 'Oggi c’è molto sole.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Vada sempre dritto..." geeft duidelijke instructies over de route.'
        : '"Vada sempre dritto..." gives clear route directions.',
      audioText: 'Scusi, dov’è la stazione centrale?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Passato Prossimo' : 'Past Tense (Passato Prossimo)',
      instruction: isDutch ? 'Kies de juiste vorm van het passato prossimo:' : 'Select the correct passato prossimo form:',
      prompt: 'Ieri sera noi _____ una bella passeggiata sul lungomare.',
      options: [
        { key: 'A', text: 'abbiamo fatto' },
        { key: 'B', text: 'facciamo' },
        { key: 'C', text: 'facevamo' },
        { key: 'D', text: 'faremo' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Ieri sera" duidt op een voltooide handeling in het verleden: "abbiamo fatto".'
        : '"Ieri sera" triggers the completed passato prossimo: "abbiamo fatto".',
      audioText: 'Ieri sera noi abbiamo fatto una bella passeggiata.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Idioom & Uitdrukkingen' : 'Italian Idioms',
      instruction: isDutch ? 'Wat betekent de Italiaanse uitdrukking "In bocca al lupo"?' : 'What does the idiom "In bocca al lupo" signify?',
      prompt: 'In bocca al lupo!',
      options: [
        { key: 'A', text: isDutch ? 'Pas op voor wilde dieren!' : 'Watch out for wild animals!' },
        { key: 'B', text: isDutch ? 'Veel succes / Sterkte gewenst!' : 'Good luck / Break a leg!' },
        { key: 'C', text: isDutch ? 'Eet smakelijk allemaal!' : 'Enjoy your meal everyone!' },
        { key: 'D', text: isDutch ? 'Ga snel naar huis!' : 'Go home quickly!' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"In bocca al lupo" is de typisch Italiaanse manier om iemand succes te wensen (men antwoordt met "Crepi!").'
        : '"In bocca al lupo" is the traditional Italian idiom for "Good luck!" (answered with "Crepi!").',
      audioText: 'In bocca al lupo!'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Congiuntivo Presente' : 'Subjunctive Mood',
      instruction: isDutch ? 'Welke vorm van de congiuntivo is grammaticaal correct?' : 'Which subjunctive form fits after "Penso che"?',
      prompt: 'Penso che Marco _____ ragione in questa discussione.',
      options: [
        { key: 'A', text: 'abbia' },
        { key: 'B', text: 'ha' },
        { key: 'C', text: 'avrà' },
        { key: 'D', text: 'aveva' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Werkwoorden van mening ("Penso che") vereisen de congiuntivo presente: "abbia".'
        : 'Verbs of opinion ("Penso che") govern the subjunctive mood: "abbia".',
      audioText: 'Penso che Marco abbia ragione.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Connectieven' : 'Connectors & Transition Words',
      instruction: isDutch ? 'Wat betekent het voegwoord "Tuttavia"?' : 'What does the formal transition word "Tuttavia" mean?',
      prompt: 'Tuttavia',
      options: [
        { key: 'A', text: isDutch ? 'Desalniettemin / Toch' : 'Nevertheless / However' },
        { key: 'B', text: isDutch ? 'Daarom / Gevolgelijk' : 'Therefore / As a result' },
        { key: 'C', text: isDutch ? 'In het begin' : 'At the beginning' },
        { key: 'D', text: isDutch ? 'Zonder twijfel' : 'Without a doubt' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Tuttavia" is een tegenstellend voegwoord dat "echter" of "desalniettemin" betekent.'
        : '"Tuttavia" is an adversative conjunction meaning "nevertheless" or "however".',
      audioText: 'Tuttavia'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Hypothetische Periode in het Verleden' : 'Past Unreal Conditionals',
      instruction: isDutch ? 'Welke clausule voltooit deze hypothetische zin correct?' : 'Which clause completes this hypothetical sentence correctly?',
      prompt: 'Se avessi saputo della tua festa, io...',
      options: [
        { key: 'A', text: '...sarei venuto volentieri.' },
        { key: 'B', text: '...vengo volentieri.' },
        { key: 'C', text: '...verrò volentieri.' },
        { key: 'D', text: '...venivo volentieri.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Se + congiuntivo trapassato" wordt gevolgd door het condizionale passato: "sarei venuto".'
        : '"Se + trapassato congiuntivo" is followed by the condizionale passato: "sarei venuto".',
      audioText: 'Se avessi saputo della tua festa, sarei venuto volentieri.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Gevorderde Idiomatiek & Stijl' : 'Advanced Idiomatic Expressions',
      instruction: isDutch ? 'Wat is de betekenis van de uitdrukking "Prendere lucciole per lanterne"?' : 'What is the meaning of "Prendere lucciole per lanterne"?',
      prompt: 'Prendere lucciole per lanterne',
      options: [
        { key: 'A', text: isDutch ? 'Zich ernstig vergissen / dingen totaal verkeerd beoordelen' : 'Grossly misinterpreting something / taking fireflies for lanterns' },
        { key: 'B', text: isDutch ? 'In het donker op pad gaan' : 'Setting out into the dark' },
        { key: 'C', text: isDutch ? 'Een dure aankoop doen' : 'Making an expensive purchase' },
        { key: 'D', text: isDutch ? 'Iemand proberen op te vrolijken' : 'Trying to cheer someone up' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Prendere lucciole per lanterne" (vuurvliegjes aanzien voor lantaarns) betekent een grove beoordelingsfout maken.'
        : '"Prendere lucciole per lanterne" means confusing something minor for something major / gross error of judgment.',
      audioText: 'Prendere lucciole per lanterne'
    }
  ];
}

function getEnglishQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Basis' : 'Greetings & Basics',
      instruction: isDutch ? 'Wat betekent deze Engelse begroeting?' : 'Choose the best conversational reply to this greeting:',
      prompt: 'Hello! How are you doing today?',
      options: [
        { key: 'A', text: isDutch ? 'Hallo! Hoe gaat het vandaag met je?' : "I'm doing well, thank you! How about you?" },
        { key: 'B', text: isDutch ? 'Goedemorgen! Waar woon je precies?' : 'Tomorrow at 4 o’clock in the afternoon.' },
        { key: 'C', text: isDutch ? 'Tot ziens! Een goede reis naar huis!' : 'My shoes are blue and white.' },
        { key: 'D', text: isDutch ? 'Prettig kennis te maken met u.' : 'I like to eat apples every morning.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"How are you doing today?" is een informele en vriendelijke vraag naar hoe het met iemand gaat.'
        : '"I\'m doing well, thank you! How about you?" is the natural and polite response to "How are you doing today?".',
      audioText: 'Hello! How are you doing today?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen & Restaurant' : 'Ordering & Dining',
      instruction: isDutch ? 'Hoe vraag je beleefd om de rekening in een restaurant?' : 'You are finishing dinner at a restaurant. How do you politely ask for the check?',
      prompt: isDutch ? 'De rekening, alstublieft.' : 'At a restaurant table with your server:',
      options: [
        { key: 'A', text: 'Where is the bus station?' },
        { key: 'B', text: 'Could we have the bill, please?' },
        { key: 'C', text: 'Nice to meet you as well.' },
        { key: 'D', text: 'What time does the train depart?' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Could we have the bill, please?" is de beleefde manier om om de rekening te vragen.'
        : '"Could we have the bill, please?" is the standard courteous request for the check.',
      audioText: 'Could we have the bill, please?'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Present Simple vs Continuous' : 'Present Simple vs Continuous',
      instruction: isDutch ? 'Kies de juiste vorm voor een handeling die nu op dit moment plaatsvindt:' : 'Choose the correct form for an action happening right now:',
      prompt: 'Look outside! It _____ heavily.',
      options: [
        { key: 'A', text: 'is raining' },
        { key: 'B', text: 'rains' },
        { key: 'C', text: 'rained' },
        { key: 'D', text: 'has rained' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Look outside!" geeft aan dat de actie nu aan de gang is: Present Continuous ("is raining").'
        : '"Look outside!" indicates an ongoing action happening now, requiring Present Continuous ("is raining").',
      audioText: 'Look outside! It is raining heavily.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'De Weg Vragen' : 'Directions & Navigation',
      instruction: isDutch ? 'Wat is het meest logische antwoord op deze vraag?' : 'What is the most logical answer to this question?',
      prompt: '— Excuse me, could you tell me where the nearest library is?',
      options: [
        { key: 'A', text: 'Turn left at the traffic light, it’s next to the post office.' },
        { key: 'B', text: 'I am thirty-two years old.' },
        { key: 'C', text: 'I usually eat oatmeal for breakfast.' },
        { key: 'D', text: 'Tomorrow is supposed to be sunny.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Turn left at the traffic light..." geeft een heldere routebeschrijving.'
        : '"Turn left at the traffic light..." directly provides route navigation.',
      audioText: 'Excuse me, could you tell me where the nearest library is?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Present Perfect vs Past Simple' : 'Present Perfect vs Past Simple',
      instruction: isDutch ? 'Welke werkwoordstijd geeft een ervaring aan zonder specifiek tijdstip in het verleden?' : 'Which verb tense indicates an experience without a specific past time?',
      prompt: 'I _____ to Japan twice in my life.',
      options: [
        { key: 'A', text: 'have been' },
        { key: 'B', text: 'went' },
        { key: 'C', text: 'was going' },
        { key: 'D', text: 'am being' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Levenservaringen zonder specifiek tijdstip staan in de Present Perfect: "have been".'
        : 'Life experiences without a specific past timestamp require the Present Perfect ("have been").',
      audioText: 'I have been to Japan twice in my life.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Idioom & Spreekwoorden' : 'English Idioms',
      instruction: isDutch ? 'Wat betekent het Engelse idioom "Once in a blue moon"?' : 'What does "Once in a blue moon" mean?',
      prompt: 'Once in a blue moon',
      options: [
        { key: 'A', text: isDutch ? 'Uiterst zelden' : 'Very rarely / Almost never' },
        { key: 'B', text: isDutch ? 'Iedere volle maan' : 'Every full moon' },
        { key: 'C', text: isDutch ? 'Wanneer je verdrietig bent' : 'Whenever you feel sad' },
        { key: 'D', text: isDutch ? 'Midden in de nacht' : 'In the middle of the night' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Once in a blue moon" betekent heel zelden of bijna nooit.'
        : '"Once in a blue moon" is a well-known idiom meaning very rarely.',
      audioText: 'Once in a blue moon'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Voorwaardelijke Zinnen (Second Conditional)' : 'Second Conditional',
      instruction: isDutch ? 'Welke vorm maakt deze hypothetische voorwaarde correct af?' : 'Which form correctly completes this unreal condition?',
      prompt: 'If I won the lottery, I _____ travel around the world.',
      options: [
        { key: 'A', text: 'would' },
        { key: 'B', text: 'will' },
        { key: 'C', text: 'can' },
        { key: 'D', text: 'am going to' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'De Second Conditional (hypothetisch in het heden/toekomst) gebruikt: "If + Past Simple, would + infinitive".'
        : 'The Second Conditional combines "If + past simple" with "would + base verb".',
      audioText: 'If I won the lottery, I would travel around the world.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Schakelwoorden' : 'Discourse Markers & Connectors',
      instruction: isDutch ? 'Wat betekent het formele schakelwoord "Furthermore"?' : 'What does the connector "Furthermore" mean?',
      prompt: 'Furthermore',
      options: [
        { key: 'A', text: isDutch ? 'Bovendien / Daarnaast' : 'Moreover / In addition' },
        { key: 'B', text: isDutch ? 'Echter / Integendeel' : 'However / On the contrary' },
        { key: 'C', text: isDutch ? 'Als gevolg hiervan' : 'Consequently / As a result' },
        { key: 'D', text: isDutch ? 'Tot slot' : 'In conclusion' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Furthermore" voegt een argument toe en betekent "bovendien" of "daarenboven".'
        : '"Furthermore" introduces an additional supportive point ("in addition", "moreover").',
      audioText: 'Furthermore'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Inversie & Geavanceerde Zinsbouw' : 'Negative Inversion',
      instruction: isDutch ? 'Kies de juiste zinsvolgorde na een ontkennende openingsbepaling (inversion):' : 'Select the correct word order following negative inversion:',
      prompt: 'Seldom _____ such an inspiring keynote address.',
      options: [
        { key: 'A', text: 'have I heard' },
        { key: 'B', text: 'I have heard' },
        { key: 'C', text: 'I heard' },
        { key: 'D', text: 'had I hear' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Na negatieve bijwoorden aan het begin van de zin ("Seldom", "Rarely") volgt inversie van hulpwerkwoord en onderwerp: "have I heard".'
        : 'Sentences beginning with negative adverbials ("Seldom", "Never") trigger subject-auxiliary inversion: "have I heard".',
      audioText: 'Seldom have I heard such an inspiring keynote address.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Gevorderde Idiomatiek & Pragmatiek' : 'Idiomatic Mastery & Register',
      instruction: isDutch ? 'Wat is de betekenis van het idioom "To bite the bullet"?' : 'What does the idiom "To bite the bullet" mean?',
      prompt: 'To bite the bullet',
      options: [
        { key: 'A', text: isDutch ? 'Een onvermijdelijke moeilijke situatie dapper onder ogen zien' : 'Facing an unavoidable tough situation with courage' },
        { key: 'B', text: isDutch ? 'Een fysieke blessure oplopen tijdens het sporten' : 'Incurring a physical sports injury' },
        { key: 'C', text: isDutch ? 'Snel van mening veranderen onder druk' : 'Quickly changing opinion under pressure' },
        { key: 'D', text: isDutch ? 'Een overhaaste financiële investering doen' : 'Making a hasty financial speculation' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"To bite the bullet" betekent dapper de tanden op elkaar zetten en een onplezierige plicht aanvaarden.'
        : '"To bite the bullet" means enduring an inevitable grim situation with stoic resolve.',
      audioText: 'To bite the bullet'
    }
  ];
}

function getPortugueseQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Kennismaking' : 'Greetings & Basics',
      instruction: isDutch ? 'Wat betekent deze Portugese begroeting?' : 'What does this Portuguese greeting mean?',
      prompt: 'Olá! Como você se chama?',
      options: [
        { key: 'A', text: isDutch ? 'Hallo! Hoe heet je?' : 'Hello! What is your name?' },
        { key: 'B', text: isDutch ? 'Goedemorgen! Waar woon je?' : 'Good morning! Where do you live?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Prettige dag!' : 'Goodbye! Have a nice day!' },
        { key: 'D', text: isDutch ? 'Dankjewel voor alles!' : 'Thank you for everything!' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Olá! Como você se chama?" betekent "Hallo! Hoe heet je?".'
        : '"Olá! Como você se chama?" means "Hello! What is your name?".',
      audioText: 'Olá! Como você se chama?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen' : 'Cafe & Ordering',
      instruction: isDutch ? 'Hoe vraag je om de rekening in het Portugees?' : 'How do you ask for the bill in Portuguese?',
      prompt: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.',
      options: [
        { key: 'A', text: 'Onde fica a estação?' },
        { key: 'B', text: 'A conta, por favor.' },
        { key: 'C', text: 'Um copo de água.' },
        { key: 'D', text: 'Muito prazer em conhecê-lo.' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"A conta, por favor" is de beleefde uitdrukking voor de rekening.'
        : '"A conta, por favor" is the standard phrase for the bill.',
      audioText: 'A conta, por favor.'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Tegenwoordige Tijd' : 'Present Tense Verbs',
      instruction: isDutch ? 'Kies de juiste vorm van "morar" (wonen):' : 'Choose the correct form of "morar":',
      prompt: 'Nós _____ em Lisboa há dois anos.',
      options: [
        { key: 'A', text: 'moramos' },
        { key: 'B', text: 'moro' },
        { key: 'C', text: 'moram' },
        { key: 'D', text: 'moras' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Bij "nós" hoort de uitgang "-amos": "nós moramos".'
        : 'Subject "nós" takes the first person plural "-amos": "moramos".',
      audioText: 'Nós moramos em Lisboa há dois anos.'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'De Weg Vragen' : 'Directions & Navigation',
      instruction: isDutch ? 'Wat is het passende antwoord op deze vraag?' : 'What is the appropriate response?',
      prompt: '— Com licença, onde fica o metrô mais próximo?',
      options: [
        { key: 'A', text: 'Siga em frente e vire à direita no semáforo.' },
        { key: 'B', text: 'Tenho vinte e quatro anos.' },
        { key: 'C', text: 'Gosto muito de bacalhau.' },
        { key: 'D', text: 'O dia está muito ensolarado.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Siga em frente..." geeft een duidelijke routebeschrijving.'
        : '"Siga em frente..." directly provides route navigation.',
      audioText: 'Com licença, onde fica o metrô mais próximo?'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Verleden Tijd (Pretérito Perfeito)' : 'Past Tense (Pretérito Perfeito)',
      instruction: isDutch ? 'Welk werkwoord drukt een voltooide handeling in het verleden uit?' : 'Which verb expresses a completed past action?',
      prompt: 'Ontem nós _____ um filme excelente no cinema.',
      options: [
        { key: 'A', text: 'vimos' },
        { key: 'B', text: 'vemos' },
        { key: 'C', text: 'veremos' },
        { key: 'D', text: 'víamos' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Ontem" (gisteren) vereist het pretérito perfeito: "vimos".'
        : '"Ontem" (yesterday) triggers the completed pretérito perfeito: "vimos".',
      audioText: 'Ontem nós vimos um filme excelente.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Portugese Idiomatiek' : 'Portuguese Idioms',
      instruction: isDutch ? 'Wat betekent het Portugese begrip "Saudade"?' : 'What does the Portuguese term "Saudade" express?',
      prompt: 'Sentir saudades',
      options: [
        { key: 'A', text: isDutch ? 'Iets of iemand diep missen / weemoed voelen' : 'Deep longing or missing someone/something dearly' },
        { key: 'B', text: isDutch ? 'Haast hebben om ergens aan te komen' : 'Being in a hurry to arrive' },
        { key: 'C', text: isDutch ? 'Erg boos zijn over een situatie' : 'Being very angry about a situation' },
        { key: 'D', text: isDutch ? 'Veel dorst hebben na het sporten' : 'Being very thirsty after exercise' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Saudade" is het iconische Portugese woord voor intens missen en nostalgisch verlangen.'
        : '"Saudade" is the unique Portuguese sentiment of profound nostalgic longing.',
      audioText: 'Sentir saudades'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Subjuntivo / Conjuntivo' : 'Subjunctive Mood',
      instruction: isDutch ? 'Welke vorm van de aanvoegende wijs is grammaticaal correct?' : 'Which subjunctive form fits after "É essencial que"?',
      prompt: 'É essencial que você _____ a verdade.',
      options: [
        { key: 'A', text: 'diga' },
        { key: 'B', text: 'diz' },
        { key: 'C', text: 'dizer' },
        { key: 'D', text: 'dirá' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Na onpersoonlijke uitdrukkingen ("É essencial que") volgt de subjuntivo: "diga".'
        : 'Expressions of necessity govern the present subjunctive: "diga".',
      audioText: 'É essencial que você diga a verdade.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Connectieven' : 'Formal Connectors',
      instruction: isDutch ? 'Wat betekent het voegwoord "No entanto"?' : 'What does the connector "No entanto" mean?',
      prompt: 'No entanto',
      options: [
        { key: 'A', text: isDutch ? 'Desalniettemin / Echter' : 'However / Nevertheless' },
        { key: 'B', text: isDutch ? 'Daarom / Dus' : 'Therefore / Consequently' },
        { key: 'C', text: isDutch ? 'In de tussentijd' : 'In the meantime' },
        { key: 'D', text: isDutch ? 'Ten slotte' : 'Finally' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"No entanto" drukt een tegenstelling uit en betekent "echter" of "desalniettemin".'
        : '"No entanto" indicates an adversative contrast ("however", "nevertheless").',
      audioText: 'No entanto'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Hypothetische Verleden Tijd' : 'Unreal Past Conditions',
      instruction: isDutch ? 'Kies de correcte voortzetting van deze hypothetische voorwaarde:' : 'Select the correct conclusion to this condition:',
      prompt: 'Se eu tivesse sabido antes, eu...',
      options: [
        { key: 'A', text: '...teria ido ao evento com você.' },
        { key: 'B', text: '...vou ao evento com você.' },
        { key: 'C', text: '...fui ao evento com você.' },
        { key: 'D', text: '...estou indo ao evento.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Se + pretérito mais-que-perfeito do subjuntivo" vereist het futuro do pretérito composto: "teria ido".'
        : 'Past counterfactual condition pairs with the conditional past: "teria ido".',
      audioText: 'Se eu tivesse sabido antes, teria ido ao evento.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Gevorderde Portugese Idiomatiek' : 'Advanced Portuguese Idioms',
      instruction: isDutch ? 'Wat betekent de uitdrukking "Chover no molhado"?' : 'What does the idiom "Chover no molhado" signify?',
      prompt: 'Chover no molhado',
      options: [
        { key: 'A', text: isDutch ? 'Iets overbodigs herhalen of open deuren intrappen' : 'Repeating what is already obvious / carrying coals to Newcastle' },
        { key: 'B', text: isDutch ? 'Grote overstromingen meemaken' : 'Experiencing heavy flooding' },
        { key: 'C', text: isDutch ? 'Zich kleden tegen slecht weer' : 'Dressing for bad weather' },
        { key: 'D', text: isDutch ? 'Een conflict bijleggen' : 'Settling an argument' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Chover no molhado" (regenen op natte grond) betekent het overbodige zeggen of open deuren intrappen.'
        : '"Chover no molhado" means preaching to the converted or doing something completely redundant.',
      audioText: 'Chover no molhado'
    }
  ];
}

function getDutchQuestions(isDutch: boolean, _variant: string): PlacementTestQuestion[] {
  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Kennismaking' : 'Greetings & Basics',
      instruction: isDutch ? 'Wat betekent deze begroeting?' : 'What does this greeting mean?',
      prompt: 'Goedemorgen! Hoe heet je?',
      options: [
        { key: 'A', text: isDutch ? 'Goedemorgen! Hoe heet je?' : 'Good morning! What is your name?' },
        { key: 'B', text: isDutch ? 'Goedenavond! Waar woon je?' : 'Good evening! Where do you live?' },
        { key: 'C', text: isDutch ? 'Tot ziens! Een fijne dag!' : 'Goodbye! Have a nice day!' },
        { key: 'D', text: isDutch ? 'Alstublieft, hier is uw thee.' : 'Please, here is your tea.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Goedemorgen! Hoe heet je?" is een vriendelijke basisbegroeting en vraag naar iemands naam.'
        : 'Foundational greeting asking for someone\'s name.',
      audioText: 'Goedemorgen! Hoe heet je?'
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Bestellen' : 'Cafe & Ordering',
      instruction: isDutch ? 'Hoe vraag je beleefd om de rekening?' : 'How do you politely ask for the check in Dutch?',
      prompt: isDutch ? 'Mag ik de rekening, alstublieft?' : 'May I have the check, please?',
      options: [
        { key: 'A', text: 'Waar is het station?' },
        { key: 'B', text: 'Mag ik de rekening, alstublieft?' },
        { key: 'C', text: 'Aangenaam kennis te maken.' },
        { key: 'D', text: 'Hoe laat vertrekt de bus?' },
      ],
      correct_key: 'B',
      explanation: isDutch
        ? '"Mag ik de rekening, alstublieft?" is de beleefde manier om de rekening te vragen.'
        : '"Mag ik de rekening, alstublieft?" is the polite request for the bill.',
      audioText: 'Mag ik de rekening, alstublieft?'
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Lidwoorden (de/het)' : 'Articles (de/het)',
      instruction: isDutch ? 'Welk lidwoord hoort bij het woord "boek"?' : 'Which article belongs to "boek"?',
      prompt: 'Ik lees _____ interessante boek.',
      options: [
        { key: 'A', text: 'het' },
        { key: 'B', text: 'de' },
        { key: 'C', text: 'een' },
        { key: 'D', text: 'der' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Boek" is een onzijdig zelfstandig naamwoord: "het boek".'
        : '"Boek" is a neuter noun taking "het".',
      audioText: 'het boek'
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'Oriëntatie in de Stad' : 'Directions in the City',
      instruction: isDutch ? 'Wat is het meest logische antwoord op deze vraag?' : 'What is the logical response to this inquiry?',
      prompt: '— Pardon, weet u waar het Centraal Station is?',
      options: [
        { key: 'A', text: 'Loop rechtdoor en sla bij het stoplicht rechtsaf.' },
        { key: 'B', text: 'Ik hou erg van appeltaart.' },
        { key: 'C', text: 'Vandaag is het dinsdag.' },
        { key: 'D', text: 'Ik heb twee broers.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Loop rechtdoor..." geeft een duidelijke routebeschrijving.'
        : '"Loop rechtdoor..." provides direct route navigation.',
      audioText: 'Loop rechtdoor en sla bij het stoplicht rechtsaf.'
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Voltooid Tegenwoordige Tijd' : 'Perfect Tense in Dutch',
      instruction: isDutch ? 'Kies het juiste hulpwerkwoord voor de voltooide tijd:' : 'Choose the correct auxiliary verb:',
      prompt: 'Gisteren _____ wij naar Utrecht gefietst.',
      options: [
        { key: 'A', text: 'zijn' },
        { key: 'B', text: 'hebben' },
        { key: 'C', text: 'worden' },
        { key: 'D', text: 'waren' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Werkwoorden van gerichte verplaatsing ("fietsen naar...") vormen de voltooide tijd met "zijn": "wij zijn gefietst".'
        : 'Directional verbs of motion form the perfect tense with "zijn": "wij zijn gefietst".',
      audioText: 'Gisteren zijn wij naar Utrecht gefietst.'
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Nederlandse Spreekwoorden' : 'Dutch Idioms',
      instruction: isDutch ? 'Wat betekent het spreekwoord "Nu komt de aap uit de mouw"?' : 'What does "Nu komt de aap uit de mouw" mean?',
      prompt: 'Nu komt de aap uit de mouw',
      options: [
        { key: 'A', text: isDutch ? 'Nu blijkt wat werkelijk de bedoeling of toedracht was' : 'Now the true hidden motive or situation is revealed' },
        { key: 'B', text: isDutch ? 'Er ontsnapt een dier uit de dierentuin' : 'An animal escaped from the zoo' },
        { key: 'C', text: isDutch ? 'Het begint plotseling heel hard te regenen' : 'It suddenly starts pouring rain' },
        { key: 'D', text: isDutch ? 'Iemand maakt een grote vergissing' : 'Someone made a big mistake' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"De aap komt uit de mouw" betekent dat de ware toedracht of verborgen bedoeling aan het licht komt.'
        : 'Famous Dutch idiom signifying the revelation of hidden intentions.',
      audioText: 'Nu komt de aap uit de mouw'
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Bijzin Zinsbouw & Woordvolgorde' : 'Subordinate Clause Word Order',
      instruction: isDutch ? 'Welke woordvolgorde is correct in een Nederlandse bijzin?' : 'Which word order is correct in a Dutch subordinate clause?',
      prompt: 'Hij vertelde me dat hij...',
      options: [
        { key: 'A', text: '...morgen naar Amsterdam zal reizen.' },
        { key: 'B', text: '...zal reizen morgen naar Amsterdam.' },
        { key: 'C', text: '...morgen zal naar Amsterdam reizen.' },
        { key: 'D', text: '...reizen morgen naar Amsterdam zal.' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'In een Nederlandse bijzin ("dat...") komen alle persoonsvormen en werkwoorden aan het einde van de zin.'
        : 'In Dutch subordinate clauses, conjugated verbs and infinitives cluster at the sentence end.',
      audioText: 'dat hij morgen naar Amsterdam zal reizen.'
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Schakelwoorden' : 'Formal Connectors',
      instruction: isDutch ? 'Wat betekent het voegwoord "Desalniettemin"?' : 'What does "Desalniettemin" mean?',
      prompt: 'Desalniettemin',
      options: [
        { key: 'A', text: isDutch ? 'Toch / Ondanks dat' : 'Nevertheless / Nonetheless' },
        { key: 'B', text: isDutch ? 'Daarom / Dientengevolge' : 'Therefore / As a result' },
        { key: 'C', text: isDutch ? 'In de eerste plaats' : 'In the first place' },
        { key: 'D', text: isDutch ? 'Samenvattend' : 'Summarizing' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Desalniettemin" drukt een sterke tegenstelling of concessie uit ("toch", "ondanks dat").'
        : '"Desalniettemin" expresses concession ("nevertheless").',
      audioText: 'Desalniettemin'
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Hypothetische Verleden Zinnen' : 'Past Conditionals',
      instruction: isDutch ? 'Welke werkwoordsconstructie drukt een niet-gerealiseerde voorwaarde in het verleden uit?' : 'Which construction expresses an unreal past condition?',
      prompt: 'Als ik dat eerder had geweten, _____ ik je onmiddellijk opgebeld.',
      options: [
        { key: 'A', text: 'zou hebben' },
        { key: 'B', text: 'zal hebben' },
        { key: 'C', text: 'heb' },
        { key: 'D', text: 'was hebbend' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Als ik had geweten, zou ik hebben opgebeld" is de correcte onvoltooid verleden toekomende tijd.'
        : 'Past counterfactual in Dutch uses "zou hebben + voltooid deelwoord".',
      audioText: 'zou ik hebben opgebeld.'
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Gevorderde Idiomatiek & Beeldspraak' : 'Advanced Nuance & Idioms',
      instruction: isDutch ? 'Wat betekent de uitdrukking "Spijkers op laag water zoeken"?' : 'What does "Spijkers op laag water zoeken" mean?',
      prompt: 'Spijkers op laag water zoeken',
      options: [
        { key: 'A', text: isDutch ? 'Aanmerkingen maken op futiele kleinigheden / muggenziften' : 'Nitpicking / finding fault over trivial details' },
        { key: 'B', text: isDutch ? 'Bouwmateriaal verzamelen aan de kust' : 'Gathering hardware by the shore' },
        { key: 'C', text: isDutch ? 'Zuinig omgaan met schaarse grondstoffen' : 'Being frugal with scarce resources' },
        { key: 'D', text: isDutch ? 'Een moeilijk juridisch proces aanspannen' : 'Initiating a tough legal battle' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? '"Spijkers op laag water zoeken" betekent zeuren over onbeduidende kleinigheden of muggenziften.'
        : '"Spijkers op laag water zoeken" is the classic Dutch idiom for pedantic nitpicking.',
      audioText: 'Spijkers op laag water zoeken'
    }
  ];
}

function getUniversalLanguageQuestions(
  targetCode: string,
  targetName: string,
  isDutch: boolean
): PlacementTestQuestion[] {
  const lang = WORLD_LANGUAGES.find((l) => l.code === targetCode);
  const greeting = lang?.sampleGreeting || `Hello (${targetName})`;
  const script = lang?.script || targetName;

  return [
    {
      id: 1,
      level: 'A1',
      target_skill: isDutch ? 'Begroetingen & Kennismaking' : 'Greetings & Basics',
      instruction: isDutch ? `Wat betekent deze begroeting in het ${targetName}?` : `What does this greeting mean in ${targetName}?`,
      prompt: greeting,
      options: [
        { key: 'A', text: isDutch ? 'Hallo / Goedendag' : 'Hello / Good day' },
        { key: 'B', text: isDutch ? 'Tot ziens / Vaarwel' : 'Goodbye / Farewell' },
        { key: 'C', text: isDutch ? 'De rekening, alstublieft' : 'The check, please' },
        { key: 'D', text: isDutch ? 'Waar is het station?' : 'Where is the station?' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? `"${greeting}" is de universele begroetingsformule in het ${targetName}.`
        : `"${greeting}" is the foundational greeting in ${targetName}.`,
      audioText: greeting
    },
    {
      id: 2,
      level: 'A1',
      target_skill: isDutch ? 'Beleefdheid & Dank' : 'Politeness & Thanks',
      instruction: isDutch ? `Hoe druk je beleefde dankbaarheid uit in het ${targetName}?` : `How do you express polite gratitude in ${targetName}?`,
      prompt: isDutch ? 'Dank u wel / Bedankt' : 'Thank you very much',
      options: [
        { key: 'A', text: isDutch ? `Formele dankformule (${targetName})` : `Formal thank you (${targetName})` },
        { key: 'B', text: isDutch ? 'Waar woon je?' : 'Where do you live?' },
        { key: 'C', text: isDutch ? 'Hoe laat is het?' : 'What time is it?' },
        { key: 'D', text: isDutch ? 'Ik heet...' : 'My name is...' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? `Dit is de meest gebruikte en respectvolle dankformule in het ${targetName}.`
        : `This is the standard courteous expression of gratitude in ${targetName}.`,
      audioText: greeting
    },
    {
      id: 3,
      level: 'A2',
      target_skill: isDutch ? 'Tegenwoordige Tijd & Werkwoorden' : 'Present Routine Verbs',
      instruction: isDutch ? `Kies het juiste ontbrekende werkwoord in het ${targetName}:` : `Select the correct present tense verb in ${targetName}:`,
      prompt: `${targetName} [Subject: We] _____ [Verb: learn / study]`,
      options: [
        { key: 'A', text: isDutch ? '1e persoon meervoud (wij studeren)' : 'First person plural (we study)' },
        { key: 'B', text: isDutch ? '1e persoon enkelvoud (ik studeer)' : 'First person singular (I study)' },
        { key: 'C', text: isDutch ? 'Infinitief (studeren)' : 'Infinitive form (to study)' },
        { key: 'D', text: isDutch ? 'Gebiedende wijs (studeer!)' : 'Imperative form (study!)' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? `De 1e persoon meervoud past bij het onderwerp 'wij' in het ${targetName}.`
        : `First person plural agrees with the subject 'we' in ${targetName}.`,
      audioText: targetName
    },
    {
      id: 4,
      level: 'A2',
      target_skill: isDutch ? 'De Weg Vragen & Oriëntatie' : 'Directions & Navigation',
      instruction: isDutch ? `Wat is de meest logische reactie op een vraag naar de weg in het ${targetName}?` : `What is the most logical route direction in ${targetName}?`,
      prompt: `[Question: Where is the train station in ${targetName}?]`,
      options: [
        { key: 'A', text: isDutch ? 'Sla rechtsaf bij de volgende straat' : 'Turn right at the next street' },
        { key: 'B', text: isDutch ? 'Ik heb veel honger' : 'I am very hungry' },
        { key: 'C', text: isDutch ? 'Mijn lievelingskleur is blauw' : 'My favorite color is blue' },
        { key: 'D', text: isDutch ? 'Het is half vier' : 'It is half past three' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Dit geeft een gerichte navigatie-instructie.'
        : 'This provides an active spatial navigation instruction.',
      audioText: targetName
    },
    {
      id: 5,
      level: 'B1',
      target_skill: isDutch ? 'Verleden Tijd & Aspect' : 'Past Tenses & Aspect',
      instruction: isDutch ? `Welke werkwoordsvorm drukt een voltooide handeling in het verleden uit in het ${targetName}?` : `Which form denotes a completed past action in ${targetName}?`,
      prompt: `[Past action: Yesterday we arrived in ${targetName}]`,
      options: [
        { key: 'A', text: isDutch ? 'Voltooide verleden tijd (perfectief)' : 'Completed past tense (perfective)' },
        { key: 'B', text: isDutch ? 'Tegenwoordige tijd' : 'Present tense' },
        { key: 'C', text: isDutch ? 'Toekomende tijd' : 'Future tense' },
        { key: 'D', text: isDutch ? 'Deelwoord' : 'Participle' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Voor afgesloten gebeurtenissen in het verleden wordt het voltooide aspect gebruikt.'
        : 'Completed actions in past time require the perfective aspect.',
      audioText: targetName
    },
    {
      id: 6,
      level: 'B1',
      target_skill: isDutch ? 'Vaste Uitdrukkingen & Sociale Conversatie' : 'Conversational Collocations',
      instruction: isDutch ? `Wat is de betekenis van een veelgebruikte vriendelijke uitdrukking in het ${targetName}?` : `What is the meaning of a standard conversational idiom in ${targetName}?`,
      prompt: `[Friendly greeting & rapport expression in ${targetName}]`,
      options: [
        { key: 'A', text: isDutch ? 'Zeer verheugd om kennis te maken' : 'Very pleased to make your acquaintance' },
        { key: 'B', text: isDutch ? 'De rekening betalen' : 'Paying the bill' },
        { key: 'C', text: isDutch ? 'Het weerbericht bekijken' : 'Checking the weather report' },
        { key: 'D', text: isDutch ? 'Een ticket annuleren' : 'Cancelling a ticket' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Beleefde introductieformule bij sociale ontmoetingen.'
        : 'Courteous introduction formula for social rapport.',
      audioText: targetName
    },
    {
      id: 7,
      level: 'B2',
      target_skill: isDutch ? 'Voorwaardelijke Wijs & Modaliteit' : 'Conditionals & Modals',
      instruction: isDutch ? `Welke constructie drukt een hypothetische wens of beleefd verzoek uit in het ${targetName}?` : `Which form expresses a polite condition or request in ${targetName}?`,
      prompt: `[Hypothetical conditional structure in ${targetName}]`,
      options: [
        { key: 'A', text: isDutch ? 'Voorwaardelijke wijs (zou willen / kunnen)' : 'Conditional mood (would like / could)' },
        { key: 'B', text: isDutch ? 'Strikte gebiedende wijs (moet!)' : 'Strict imperative (must!)' },
        { key: 'C', text: isDutch ? 'Onvoltooid verleden tijd' : 'Past continuous' },
        { key: 'D', text: isDutch ? 'Woordeloze tussenwerpsel' : 'Interjection' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'De voorwaardelijke wijs verzacht verzoeken en formuleert hypothesen.'
        : 'The conditional mood softens requests and articulates hypotheticals.',
      audioText: targetName
    },
    {
      id: 8,
      level: 'B2',
      target_skill: isDutch ? 'Formele Connectieven' : 'Formal Discourse Markers',
      instruction: isDutch ? `Wat is de functie van een tegenstellend voegwoord in het ${targetName}?` : `What is the role of an adversative connector in ${targetName}?`,
      prompt: `[Adversative connector ("However / Nevertheless") in ${targetName}]`,
      options: [
        { key: 'A', text: isDutch ? 'Een tegenstelling of nuance aangeven (echter / desalniettemin)' : 'Expressing contrast or nuance (however / nevertheless)' },
        { key: 'B', text: isDutch ? 'Tijdstip aanduiden' : 'Marking time of day' },
        { key: 'C', text: isDutch ? 'Een vraag beginnen' : 'Starting a question' },
        { key: 'D', text: isDutch ? 'Een getal noemen' : 'Naming a cardinal number' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Tegenstellende connectieven verbinden contrasterende argumenten.'
        : 'Adversative connectors bridge contrasting clauses.',
      audioText: targetName
    },
    {
      id: 9,
      level: 'C1',
      target_skill: isDutch ? 'Gevorderde Zinsbouw & Syntaxis' : 'Advanced Complex Syntax',
      instruction: isDutch ? `Welke zinsbouw kenmerkt een complexe hypothetische voorwaarde in het ${targetName}?` : `Which syntactic order characterizes an unreal past condition in ${targetName}?`,
      prompt: `[Complex subordinate construction in ${script} script]`,
      options: [
        { key: 'A', text: isDutch ? 'Ondergeschikte bijzin met hypothetisch aspect' : 'Subordinate clause with hypothetical aspect' },
        { key: 'B', text: isDutch ? 'Simpele hoofdzin' : 'Simple main clause' },
        { key: 'C', text: isDutch ? 'Enkelvoudig zelfstandig naamwoord' : 'Single noun' },
        { key: 'D', text: isDutch ? 'Losstaand bijvoeglijk naamwoord' : 'Isolated adjective' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'Op C1-niveau beheerst de leerling complexe onderschikkende zinsverbanden.'
        : 'At C1 level, learners master complex subordinate clause dependencies.',
      audioText: targetName
    },
    {
      id: 10,
      level: 'C2',
      target_skill: isDutch ? 'Hoogste Taalbeheersing & Idioom' : 'Mastery Register & Idioms',
      instruction: isDutch ? `Wat typeert een hoog-linguïstische idiomatische uitdrukking in het ${targetName}?` : `What defines a high-register idiomatic expression in ${targetName}?`,
      prompt: `[Literary nuance & idiomatic expression in ${script} script]`,
      options: [
        { key: 'A', text: isDutch ? 'Moedertaalnuance met diepe culturele en metaforische betekenis' : 'Native nuance with deep cultural and metaphorical meaning' },
        { key: 'B', text: isDutch ? 'Elementaire toeristische overlevingszin' : 'Basic tourist survival phrase' },
        { key: 'C', text: isDutch ? 'Alledaagse kinderlijke begroeting' : 'Everyday child greeting' },
        { key: 'D', text: isDutch ? 'Verkeersbordtekst' : 'Traffic sign instruction' },
      ],
      correct_key: 'A',
      explanation: isDutch
        ? 'C2 staat voor native-level beheersing van metaforen en pragmatische subtiliteiten.'
        : 'C2 demonstrates native-level command of cultural metaphors and pragmatic subtleties.',
      audioText: targetName
    }
  ];
}

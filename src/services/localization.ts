/**
 * Comprehensive Fluentic Localization Engine
 * When user's native language is Dutch (nl) and target language is Lithuanian (lt),
 * the entire app UI, prompts, instructions, explanations, and navigation MUST be in Dutch,
 * and all learning materials (words, sentences, pronunciations) MUST be in Lithuanian.
 */

export interface TranslationDictionary {
  // Brand & General
  appName: string;
  tagline: string;
  close: string;
  cancel: string;
  save: string;
  continue: string;
  back: string;
  confirm: string;
  loading: string;
  locked: string;
  unlocked: string;
  completed: string;
  correct: string;
  incorrect: string;
  check: string;
  next: string;
  finish: string;
  start: string;
  score: string;
  level: string;
  streak: string;
  gems: string;
  xp: string;
  retakeTest: string;
  levelLockedAlert: string;
  takePlacementTestToUnlock: string;

  // Navigation Tabs
  navHome: string;
  navPath: string;
  navSpeechLab: string;
  navDialogue: string;
  navGrammar: string;
  navSpeedTest: string;
  navTranslator: string;
  navVault: string;
  navDisciplines: string;
  navPro: string;

  // Header
  selectLanguage: string;
  selectLevel: string;
  selectDialect: string;
  commandSpotlight: string;
  soundscape: string;
  profile: string;
  guestUser: string;
  proActive: string;
  upgradePro: string;

  // Home View
  welcomeBack: string;
  readyToLearn: string;
  startNextLesson: string;
  dailyGoal: string;
  dailyQuests: string;
  questPracticeMinutes: string;
  questPerfectPronunciation: string;
  questReviewCards: string;
  quickPractice: string;
  speakingDrill: string;
  flashcardVault: string;
  grammarGuide: string;
  speedChallenge: string;
  currentStreakDays: string;
  streakProtectedBadge: string;
  protectStreakWithFreeze: string;
  milestonesAchievements: string;
  claimed: string;
  claimReward: string;

  // Duolingo Path View
  unit1Title: string;
  unit1Desc: string;
  unit2Title: string;
  unit2Desc: string;
  unit3Title: string;
  unit3Desc: string;
  unit4Title: string;
  unit4Desc: string;
  unit5Title: string;
  unit5Desc: string;
  startLessonPrompt: string;
  completedBadge: string;
  lockedLessonNotice: string;
  crownLevel: string;

  // Speech Lab View
  speechLabTitle: string;
  speechLabSubtitle: string;
  scenarioCafe: string;
  scenarioCafeDesc: string;
  scenarioFriends: string;
  scenarioFriendsDesc: string;
  scenarioDirections: string;
  scenarioDirectionsDesc: string;
  scenarioDining: string;
  scenarioDiningDesc: string;
  scenarioMarket: string;
  scenarioMarketDesc: string;
  scenarioEmergency: string;
  scenarioEmergencyDesc: string;
  listenToNative: string;
  pressToSpeak: string;
  listening: string;
  pronunciationScore: string;
  excellentPronunciation: string;
  needsPractice: string;
  repeatPhrase: string;
  nextSentence: string;

  // FSRS Vault View
  vaultTitle: string;
  vaultSubtitle: string;
  clickToFlip: string;
  howWellDidYouKnow: string;
  ratingAgain: string;
  ratingHard: string;
  ratingGood: string;
  ratingEasy: string;
  totalCards: string;
  dueToday: string;
  retentionRate: string;

  // Grammar Module View
  grammarTitle: string;
  grammarSubtitle: string;
  ruleCasesTitle: string;
  ruleCasesDesc: string;
  ruleVerbsTitle: string;
  ruleVerbsDesc: string;
  rulePastTenseTitle: string;
  rulePastTenseDesc: string;
  ruleParticiplesTitle: string;
  ruleParticiplesDesc: string;
  ruleParticlesTitle: string;
  ruleParticlesDesc: string;
  exampleSentence: string;
  grammarFormula: string;
  checkYourUnderstanding: string;

  // Speed Test View
  speedTestTitle: string;
  speedTestSubtitle: string;
  untimedNotice: string;
  questionOf: string;
  completedDrillCongratulations: string;
  claimXpAndGems: string;

  // Placement Test & Level Lock
  placementTestTitle: string;
  placementTestSubtitle: string;
  variantLabel: string;
  selectVariant: string;
  questionLabel: string;
  skillEvaluated: string;
  cefrEvaluationNotice: string;
  levelMustBeEarned: string;
  takeTestNow: string;
  unlockedLevelResult: string;
}

export const DUTCH_TRANSLATIONS: TranslationDictionary = {
  // Brand & General
  appName: 'Fluentic',
  tagline: 'Vloeiend in elk woord',
  close: 'Sluiten',
  cancel: 'Annuleren',
  save: 'Opslaan',
  continue: 'Verder gaan',
  back: 'Terug',
  confirm: 'Bevestigen',
  loading: 'Laden...',
  locked: 'Vergrendeld',
  unlocked: 'Ontgrendeld',
  completed: 'Voltooid',
  correct: 'Uitstekend! Helemaal juist',
  incorrect: 'Niet helemaal juist. Probeer het opnieuw',
  check: 'Controleren',
  next: 'Volgende vraag',
  finish: 'Afronden',
  start: 'Starten',
  score: 'Score',
  level: 'Niveau',
  streak: 'Dagen Reeks',
  gems: 'Edelstenen',
  xp: 'Ervaringspunten',
  retakeTest: 'Niveautest Afleggen',
  levelLockedAlert: 'Niveau Vergrendeld! Je kunt niet van niveau wisselen zonder de Niveautest te doen.',
  takePlacementTestToUnlock: 'Doe de Niveautest (10 vragen) om door te stromen naar een hoger niveau.',

  // Navigation Tabs
  navHome: 'Home',
  navPath: 'Path',
  navSpeechLab: 'Speaking',
  navDialogue: 'AI Gesprekken',
  navGrammar: 'Grammatica',
  navSpeedTest: 'Snelheidstest',
  navTranslator: 'AI Vertaler',
  navVault: 'Woordkaarten',
  navDisciplines: 'Reeks & Doelen',
  navPro: 'Pro Studio',

  // Header
  selectLanguage: 'Kies Doeltaal',
  selectLevel: 'ERK-Niveau',
  selectDialect: 'Kies Dialect',
  commandSpotlight: 'Opdrachten (Cmd+K)',
  soundscape: 'Focus Geluid',
  profile: 'Mijn Profiel',
  guestUser: 'Gastgebruiker',
  proActive: 'Pro Actief',
  upgradePro: 'Word Pro',

  // Home View
  welcomeBack: 'Welkom terug',
  readyToLearn: 'Klaar om vandaag verder te leren?',
  startNextLesson: 'Volgende Les Starten',
  dailyGoal: 'Dagelijks Leerdoel',
  dailyQuests: 'Dagelijkse Missies',
  questPracticeMinutes: 'Oefen 15 minuten intensief',
  questPerfectPronunciation: 'Behaal een uitstekende uitspraakscore in het Spraaklab',
  questReviewCards: 'Herhaal 10 woordkaarten in de FSRS-kluis',
  quickPractice: 'Snelle Oefeningen',
  speakingDrill: 'Spraakoefening',
  flashcardVault: 'Geheugenkluis',
  grammarGuide: 'Grammaticagids',
  speedChallenge: 'Snelheidsuitdaging',
  currentStreakDays: 'Dagen Reeks',
  streakProtectedBadge: 'Reeks Beschermd',
  protectStreakWithFreeze: 'Bescherm je reeks met een schild (50 edelstenen)',
  milestonesAchievements: 'Mijlpalen & Prestaties',
  claimed: 'Geclaimd',
  claimReward: 'Beloning Claimen',

  // Duolingo Path View
  unit1Title: 'Eenheid 1: Alfabet, Fonetiek & Eerste Begroetingen',
  unit1Desc: 'Beheers de basisklanken, het alfabet en beleefde begroetingen.',
  unit2Title: 'Eenheid 2: Het Dagelijks Leven & Bestellen in het Café',
  unit2Desc: 'Leer eten, drinken en alledaagse zaken bestellen met de juiste uitspraak.',
  unit3Title: 'Eenheid 3: Overleven, Richtingen & de Stad Verkennen',
  unit3Desc: 'Vraag de weg, begrijp straatborden en navigeer zelfstandig.',
  unit4Title: 'Eenheid 4: Vrienden Maken & Familiegesprekken',
  unit4Desc: 'Vertel over je hobby’s, interesses en familiebanden.',
  unit5Title: 'Eenheid 5: Professionele Woordenschat & Diepgang',
  unit5Desc: 'Verfijn je woordenschat voor studie, werk en literaire nuance.',
  startLessonPrompt: 'Start Les',
  completedBadge: 'Les Voltooid',
  lockedLessonNotice: 'Voltooi de vorige lesbel om deze les vrij te spelen.',
  crownLevel: 'Kroon niveau',

  // Speech Lab View
  speechLabTitle: 'Interactief Spraaklab',
  speechLabSubtitle: 'Luister naar moedertaalsprekers en oefen je uitspraak met directe feedback.',
  scenarioCafe: 'In het Café & Koffie Bestellen',
  scenarioCafeDesc: 'Oefen het bestellen van koffie, gebak en het vragen om de rekening.',
  scenarioFriends: 'Nieuwe Mensen Ontmoeten',
  scenarioFriendsDesc: 'Stel jezelf beleefd voor en praat over je herkomst en bezigheden.',
  scenarioDirections: 'De Weg Vragen in de Stad',
  scenarioDirectionsDesc: 'Vraag waar het treinstation of het museum is en begrijp aanwijzingen.',
  scenarioDining: 'In het Restaurant',
  scenarioDiningDesc: 'Reserveer een tafel, vraag naar ingrediënten en geef complimenten.',
  scenarioMarket: 'Winkelen op de Markt',
  scenarioMarketDesc: 'Vraag naar prijzen, vers fruit en betaal contant of per pin.',
  scenarioEmergency: 'Noodsituatie & Hulp Vragen',
  scenarioEmergencyDesc: 'Leer levensbelangrijke zinnen voor noodgevallen, apotheek of arts.',
  listenToNative: 'Luister naar moedertaalspreker',
  pressToSpeak: 'Klik om in te spreken',
  listening: 'Luisteren naar je stem...',
  pronunciationScore: 'Uitspraakscore',
  excellentPronunciation: 'Uitstekende uitspraak! Heel natuurlijk!',
  needsPractice: 'Goed geprobeerd! Luister nogmaals en herhaal de zin.',
  repeatPhrase: 'Opnieuw Inspraken',
  nextSentence: 'Volgende Zin',

  // FSRS Vault View
  vaultTitle: 'Slimme Woordkaarten (FSRS)',
  vaultSubtitle: 'Gespreide herhaling afgestemd op jouw persoonlijke geheugencurve.',
  clickToFlip: 'Klik op de kaart om de vertaling en uitleg te bekijken',
  howWellDidYouKnow: 'Hoe goed kende je dit Litouwse woord?',
  ratingAgain: 'Opnieuw (Vergeten)',
  ratingHard: 'Moeilijk (Veel moeite)',
  ratingGood: 'Goed (Kende het)',
  ratingEasy: 'Makkelijk (Moeiteloos)',
  totalCards: 'Totaal Aantal Kaarten',
  dueToday: 'Vandaag te Herhalen',
  retentionRate: 'Geschatte Onthoudscore',

  // Grammar Module View
  grammarTitle: 'Litouwse Grammaticagids & Oefeningen',
  grammarSubtitle: 'Heldere uitleg van de 7 naamvallen, werkwoordsvormen en zinsbouw.',
  ruleCasesTitle: 'De 7 Litouwse Naamvallen (Linksmai)',
  ruleCasesDesc: 'Vardininkas (Onderwerp), Kilmininkas (Bezit/Ontkenning), Naudininkas (Meewerkend), Galininkas (Lijdend), Įnagininkas (Middel), Vietininkas (Plaats), Šauksmininkas (Aanspreekvorm).',
  ruleVerbsTitle: 'Werkwoordvervoeging (Tegenwoordige Tijd)',
  ruleVerbsDesc: 'De drie hoofdklassen (-a, -i, -o): aš dirbu, tu dirbi, jis dirba, mes dirbame, jūs dirbate, jie dirba.',
  rulePastTenseTitle: 'De Verleden Tijden (Būtasis kartinis & dažninis)',
  rulePastTenseDesc: 'Onderscheid tussen een eenmalige handeling (buvau) en een herhaalde gewoonte (būdavau).',
  ruleParticiplesTitle: 'De Rijke Deelwoorden van het Litouws',
  ruleParticiplesDesc: 'Veelvuldig gebruik van actieve en passieve deelwoorden, pusdalyvis en padalyvis.',
  ruleParticlesTitle: 'Klemtoon & Toonhoogte Accent',
  ruleParticlesDesc: 'Litouws kent dynamische en muzikale accenten die de betekenis van woorden kunnen veranderen.',
  exampleSentence: 'Voorbeeldzin met uitspraak',
  grammarFormula: 'Vaste Grammaticaformule',
  checkYourUnderstanding: 'Controleer je begrip',

  // Speed Test View
  speedTestTitle: 'Ongedateerde Snelheidstest & Woorddril',
  speedTestSubtitle: 'Oefen je woordenschat en grammatica op je eigen tempo zonder stressvolle tijdslimiet.',
  untimedNotice: 'Geen tikkende klok — neem alle rust om elk woord grondig te begrijpen.',
  questionOf: 'Vraag',
  completedDrillCongratulations: 'Gefeliciteerd! Je hebt alle vragen voltooid!',
  claimXpAndGems: 'Verzamel je Beloning (+60 XP, +25 Edelstenen)',

  // Placement Test & Level Lock
  placementTestTitle: 'Standaard Niveautest (10 Vragen)',
  placementTestSubtitle: 'Bepaal je exacte ERK-niveau (A1 t/m C2). Niveau wisselen kan alleen via deze test!',
  variantLabel: 'Test Variant',
  selectVariant: 'Kies Variant (A, B, C of D)',
  questionLabel: 'Vraag',
  skillEvaluated: 'Geteste Vaardigheid',
  cefrEvaluationNotice: 'Elke vraag toetst een specifieke trede op de Europese ERK-ladder (van A1 tot C2).',
  levelMustBeEarned: 'Niveaus kunnen niet handmatig worden aangeklikt. Je ontgrendelt niveaus uitsluitend via de Niveautest.',
  takeTestNow: 'Doe Niveautest Nu',
  unlockedLevelResult: 'Gekwalificeerd Niveau'
};

export const ENGLISH_FALLBACK_TRANSLATIONS: TranslationDictionary = {
  appName: 'Fluentic',
  tagline: 'Fluent in every word',
  close: 'Close',
  cancel: 'Cancel',
  save: 'Save',
  continue: 'Continue',
  back: 'Back',
  confirm: 'Confirm',
  loading: 'Loading...',
  locked: 'Locked',
  unlocked: 'Unlocked',
  completed: 'Completed',
  correct: 'Correct! Well done',
  incorrect: 'Not quite. Try again',
  check: 'Check',
  next: 'Next question',
  finish: 'Finish',
  start: 'Start',
  score: 'Score',
  level: 'Level',
  streak: 'Day Streak',
  gems: 'Gems',
  xp: 'Experience Points',
  retakeTest: 'Take Placement Test',
  levelLockedAlert: 'Level Locked! You cannot jump levels without taking the placement test.',
  takePlacementTestToUnlock: 'Take the 10-question placement test to qualify for higher levels.',

  navHome: 'Home',
  navPath: 'Path',
  navSpeechLab: 'Speaking',
  navDialogue: 'AI Dialogues',
  navGrammar: 'Grammar',
  navSpeedTest: 'Speed Test',
  navTranslator: 'AI Translator',
  navVault: 'Flashcards',
  navDisciplines: 'Streaks & Goals',
  navPro: 'Pro Studio',

  selectLanguage: 'Target Language',
  selectLevel: 'CEFR Level',
  selectDialect: 'Dialect',
  commandSpotlight: 'Command Spotlight (Cmd+K)',
  soundscape: 'Soundscape',
  profile: 'User Profile',
  guestUser: 'Guest Explorer',
  proActive: 'Pro Active',
  upgradePro: 'Go Pro',

  welcomeBack: 'Welcome back',
  readyToLearn: 'Ready to continue learning today?',
  startNextLesson: 'Start Next Lesson',
  dailyGoal: 'Daily Learning Goal',
  dailyQuests: 'Daily Quests',
  questPracticeMinutes: 'Practice for 15 dedicated minutes',
  questPerfectPronunciation: 'Achieve an excellent score in the Speech Lab',
  questReviewCards: 'Review 10 flashcards in the FSRS vault',
  quickPractice: 'Quick Review',
  speakingDrill: 'Speaking Drill',
  flashcardVault: 'Memory Vault',
  grammarGuide: 'Grammar Guide',
  speedChallenge: 'Speed Drill',
  currentStreakDays: 'Day Streak',
  streakProtectedBadge: 'Streak Protected',
  protectStreakWithFreeze: 'Protect your streak with a shield (50 gems)',
  milestonesAchievements: 'Milestones & Achievements',
  claimed: 'Claimed',
  claimReward: 'Claim Reward',

  unit1Title: 'Unit 1: Alphabet, Phonics & First Greetings',
  unit1Desc: 'Master the fundamental phonemes, alphabet, and courteous greetings.',
  unit2Title: 'Unit 2: Daily Life & Ordering at the Cafe',
  unit2Desc: 'Learn to order food, drinks, and everyday items with natural pronunciation.',
  unit3Title: 'Unit 3: Survival, Directions & City Navigation',
  unit3Desc: 'Ask for directions, read street signage, and navigate confidently.',
  unit4Title: 'Unit 4: Making Friends & Social Connections',
  unit4Desc: 'Speak comfortably about your hobbies, passions, and background.',
  unit5Title: 'Unit 5: Professional Nuance & Mastery',
  unit5Desc: 'Refine your vocabulary for workplace, academia, and literature.',
  startLessonPrompt: 'Start Lesson',
  completedBadge: 'Lesson Completed',
  lockedLessonNotice: 'Complete the previous lesson bubble to unlock this path.',
  crownLevel: 'Crown level',

  speechLabTitle: 'Interactive Speech Lab',
  speechLabSubtitle: 'Listen to native speakers and speak out loud with real-time feedback.',
  scenarioCafe: 'At the Cafe & Ordering Drinks',
  scenarioCafeDesc: 'Practice ordering coffee, pastries, and asking for the bill.',
  scenarioFriends: 'Meeting New Friends',
  scenarioFriendsDesc: 'Introduce yourself and share where you are from.',
  scenarioDirections: 'Asking for Directions in the City',
  scenarioDirectionsDesc: 'Find the train station, museum, or market with confidence.',
  scenarioDining: 'At the Restaurant',
  scenarioDiningDesc: 'Reserve a table, ask about ingredients, and compliment the chef.',
  scenarioMarket: 'Shopping at the Market',
  scenarioMarketDesc: 'Ask for prices, fresh fruits, and pay with ease.',
  scenarioEmergency: 'Emergency & Urgent Assistance',
  scenarioEmergencyDesc: 'Essential phrases for medical, pharmacy, or police assistance.',
  listenToNative: 'Listen to native speaker',
  pressToSpeak: 'Click to speak',
  listening: 'Listening to your voice...',
  pronunciationScore: 'Pronunciation Score',
  excellentPronunciation: 'Excellent pronunciation! Very natural!',
  needsPractice: 'Good attempt! Listen again and repeat the phrase.',
  repeatPhrase: 'Record Again',
  nextSentence: 'Next Phrase',

  vaultTitle: 'Smart Flashcard Vault (FSRS)',
  vaultSubtitle: 'Spaced repetition tailored to your cognitive retention curve.',
  clickToFlip: 'Click the card to reveal definition and examples',
  howWellDidYouKnow: 'How well did you recall this item?',
  ratingAgain: 'Again (Forgot)',
  ratingHard: 'Hard (Struggled)',
  ratingGood: 'Good (Recalled)',
  ratingEasy: 'Easy (Effortless)',
  totalCards: 'Total Cards',
  dueToday: 'Due Today',
  retentionRate: 'Estimated Retention',

  grammarTitle: 'Grammar Guide & Exercises',
  grammarSubtitle: 'Approachable breakdown of case morphology, conjugations, and syntax.',
  ruleCasesTitle: 'The 7 Cases of Lithuanian',
  ruleCasesDesc: 'Nominative, Genitive, Dative, Accusative, Instrumental, Locative, Vocative.',
  ruleVerbsTitle: 'Verb Conjugation (Present Tense)',
  ruleVerbsDesc: 'The three primary conjugation stems (-a, -i, -o).',
  rulePastTenseTitle: 'Past Simple vs Frequentative Past',
  rulePastTenseDesc: 'Single past actions versus repeated habitual past actions.',
  ruleParticiplesTitle: 'Rich Participial Forms',
  ruleParticiplesDesc: 'Extensive use of active and passive participles, pusdalyvis and padalyvis.',
  ruleParticlesTitle: 'Pitch Accents & Intonation',
  ruleParticlesDesc: 'Tonal and dynamic word stresses that distinguish meaning.',
  exampleSentence: 'Example sentence with audio',
  grammarFormula: 'Grammar Formula',
  checkYourUnderstanding: 'Check your understanding',

  speedTestTitle: 'Untimed Rapid Practice & Word Drill',
  speedTestSubtitle: 'Review vocabulary and grammar combos at your natural pace with no time stress.',
  untimedNotice: 'No countdown timer — take all the time you need to master each phrase.',
  questionOf: 'Question',
  completedDrillCongratulations: 'Congratulations! You completed all questions!',
  claimXpAndGems: 'Claim Reward (+60 XP, +25 Gems)',

  placementTestTitle: 'Standardized Placement Test (10 Questions)',
  placementTestSubtitle: 'Assess your exact CEFR level (A1 to C2). Changing levels is only possible through this test!',
  variantLabel: 'Test Variant',
  selectVariant: 'Choose Variant (A, B, C, or D)',
  questionLabel: 'Question',
  skillEvaluated: 'Skill Tested',
  cefrEvaluationNotice: 'Each question tests a specific rung of the CEFR ladder from A1 to C2.',
  levelMustBeEarned: 'Levels cannot be selected manually. You must earn your level through the Placement Test.',
  takeTestNow: 'Take Placement Test Now',
  unlockedLevelResult: 'Qualified Level'
};

/**
 * Get active localized dictionary
 */

export const SPANISH_TRANSLATIONS: TranslationDictionary = {
  appName: "Fluentic",
  tagline: "Fluido en cada palabra",
  close: "Cerrar",
  cancel: "Cancelar",
  save: "Guardar",
  continue: "Continuar",
  back: "Atrás",
  confirm: "Confirmar",
  loading: "Cargando...",
  locked: "Bloqueado",
  unlocked: "Desbloqueado",
  completed: "Completado",
  correct: "¡Correcto!",
  incorrect: "Incorrecto",
  check: "Comprobar",
  next: "Siguiente",
  finish: "Finalizar",
  start: "Comenzar",
  score: "Puntuación",
  level: "Nivel",
  streak: "Racha",
  gems: "Gemas",
  xp: "XP",
  retakeTest: "Repetir prueba",
  levelLockedAlert: "Nivel bloqueado",
  takePlacementTestToUnlock: "Haz la prueba de nivel para desbloquear",

  navHome: "Inicio",
  navPath: "Plan de Estudio",
  navSpeechLab: "Laboratorio de Voz",
  navDialogue: "Diálogos IA",
  navGrammar: "Gramática",
  navSpeedTest: "Práctica Rápida",
  navTranslator: "Traductor IA",
  navVault: "Tarjetas FSRS",
  navDisciplines: "Disciplinas",
  navPro: "Pro Studio",

  selectLanguage: "Idioma de destino",
  selectLevel: "Nivel MCER",
  selectDialect: "Variante regional",
  commandSpotlight: "Buscar (Ctrl+K)",
  soundscape: "Ambiente sonoro",
  profile: "Perfil",
  guestUser: "Invitado",
  proActive: "Pro Activo",
  upgradePro: "Mejorar a Pro",

  welcomeBack: "¡Bienvenido de nuevo!",
  readyToLearn: "¿Listo para continuar tu aprendizaje?",
  startNextLesson: "Iniciar siguiente lección",
  dailyGoal: "Meta diaria",
  dailyQuests: "Misiones diarias",
  questPracticeMinutes: "15 min de práctica diaria",
  questPerfectPronunciation: "Pronunciación perfecta",
  questReviewCards: "Repasar 10 tarjetas de memoria",
  quickPractice: "Práctica rápida",
  speakingDrill: "Entrenamiento de voz",
  flashcardVault: "Repaso espaciado FSRS",
  grammarGuide: "Guía gramatical",
  speedChallenge: "Desafío de vocabulario",
  currentStreakDays: "días de racha activa",
  streakProtectedBadge: "Protegido con escudo",
  protectStreakWithFreeze: "Proteger racha (50 gemas)",
  milestonesAchievements: "Logros y metas",
  claimed: "Reclamado",
  claimReward: "Reclamar recompensa",

  unit1Title: "Unidad 1: Fundamentos y Mecánica del Alfabeto",
  unit1Desc: "Domina el alfabeto, la fonética nativa y las expresiones de supervivencia.",
  unit2Title: "Unidad 2: Vida Diaria y Rutinas",
  unit2Desc: "Conversaciones cotidianas, comida y direcciones.",
  unit3Title: "Unidad 3: Pasado y Narración",
  unit3Desc: "Relata vivencias y experiencias previas.",
  unit4Title: "Unidad 4: Trabajo y Debate Profesional",
  unit4Desc: "Propuestas de equipo y comunicación formal.",
  unit5Title: "Unidad 5: Matices y Prosa Literaria",
  unit5Desc: "Discurso académico, giros idiomáticos y registros avanzados.",
  startLessonPrompt: "Comenzar lección",
  completedBadge: "Completado",
  lockedLessonNotice: "Completa la lección anterior para desbloquear.",
  crownLevel: "Nivel Corona",

  speechLabTitle: "Laboratorio de Pronunciación Interactiva",
  speechLabSubtitle: "Escucha a nativos y practica en tiempo real.",
  scenarioCafe: "En la cafetería",
  scenarioCafeDesc: "Pide bebidas y solicita la cuenta.",
  scenarioFriends: "Conociendo amigos",
  scenarioFriendsDesc: "Preséntate y comparte tus aficiones.",
  scenarioDirections: "Direcciones en la ciudad",
  scenarioDirectionsDesc: "Pregunta por transportes y monumentos.",
  scenarioDining: "En el restaurante",
  scenarioDiningDesc: "Reserva una mesa y conversa con el personal.",
  scenarioMarket: "Mercado local",
  scenarioMarketDesc: "Pregunta precios y haz compras.",
  scenarioEmergency: "Ayuda urgente",
  scenarioEmergencyDesc: "Frases esenciales para farmacias o emergencias.",
  listenToNative: "Escuchar audio nativo",
  pressToSpeak: "Toca para hablar",
  listening: "Escuchando tu voz...",
  pronunciationScore: "Puntuación de pronunciación",
  excellentPronunciation: "¡Pronunciación excelente y natural!",
  needsPractice: "Buen intento. Escucha de nuevo y repite.",
  repeatPhrase: "Grabar de nuevo",
  nextSentence: "Siguiente frase",

  vaultTitle: "Baúl Inteligente de Tarjetas (FSRS)",
  vaultSubtitle: "Repetición espaciada ajustada a tu curva de memoria.",
  clickToFlip: "Toca la tarjeta para ver el reverso",
  howWellDidYouKnow: "¿Cómo recordaste este concepto?",
  ratingAgain: "Olvidé",
  ratingHard: "Difícil",
  ratingGood: "Bien",
  ratingEasy: "Fácil",
  totalCards: "Total tarjetas",
  dueToday: "Para hoy",
  retentionRate: "Retención estimada",

  grammarTitle: "Guía de Gramática y Morfología",
  grammarSubtitle: "Estructuras oracionales y reglas explicadas paso a paso.",
  ruleCasesTitle: "Casos gramaticales",
  ruleCasesDesc: "Comprende la función sintáctica en cada oración.",
  ruleVerbsTitle: "Conjugación verbal",
  ruleVerbsDesc: "Tiempos verbales y desinencias personales.",
  rulePastTenseTitle: "Tiempos del pasado",
  rulePastTenseDesc: "Distingue acciones puntuales de habituales.",
  ruleParticiplesTitle: "Participios y conectores",
  ruleParticiplesDesc: "Sintaxis avanzada y subordinación.",
  ruleParticlesTitle: "Entonación y ritmo",
  ruleParticlesDesc: "Acentos dinámicos y musicalidad de la lengua.",
  exampleSentence: "Frase de ejemplo con audio",
  grammarFormula: "Fórmula gramatical",
  checkYourUnderstanding: "Comprueba tu comprensión",

  speedTestTitle: "Práctica Rápida sin Presión de Tiempo",
  speedTestSubtitle: "Afianza patrones léxicos a tu propio ritmo.",
  untimedNotice: "Sin cuenta atrás: tómate el tiempo necesario.",
  questionOf: "Pregunta",
  completedDrillCongratulations: "¡Enhorabuena! Has completado todas las preguntas.",
  claimXpAndGems: "Reclamar (+60 XP, +25 Gemas)",

  placementTestTitle: "Prueba de Nivel Estandarizada MCER (10 Preguntas)",
  placementTestSubtitle: "Determina con exactitud tu nivel de A1 a C2.",
  variantLabel: "Variante",
  selectVariant: "Elegir variante (A, B, C o D)",
  questionLabel: "Pregunta",
  skillEvaluated: "Habilidad evaluada",
  cefrEvaluationNotice: "Cada pregunta evalúa un peldaño del marco europeo MCER.",
  levelMustBeEarned: "El nivel no se elige al azar; se acredita con la prueba.",
  takeTestNow: "Hacer prueba de nivel ahora",
  unlockedLevelResult: "Nivel obtenido"
};

export const FRENCH_TRANSLATIONS: TranslationDictionary = {
  appName: "Fluentic",
  tagline: "La fluidité dans chaque mot",
  close: "Fermer",
  cancel: "Annuler",
  save: "Enregistrer",
  continue: "Continuer",
  back: "Retour",
  confirm: "Confirmer",
  loading: "Chargement...",
  locked: "Verrouillé",
  unlocked: "Déverrouillé",
  completed: "Terminé",
  correct: "Correct !",
  incorrect: "Incorrect",
  check: "Vérifier",
  next: "Suivant",
  finish: "Terminer",
  start: "Commencer",
  score: "Score",
  level: "Niveau",
  streak: "Série",
  gems: "Gemmes",
  xp: "XP",
  retakeTest: "Repasser le test",
  levelLockedAlert: "Niveau verrouillé",
  takePlacementTestToUnlock: "Passez le test de niveau pour débloquer",

  navHome: "Accueil",
  navPath: "Parcours",
  navSpeechLab: "Labo Vocal",
  navDialogue: "Dialogues IA",
  navGrammar: "Grammaire",
  navSpeedTest: "Pratique Rapide",
  navTranslator: "Traducteur IA",
  navVault: "Cartes FSRS",
  navDisciplines: "Disciplines",
  navPro: "Pro Studio",

  selectLanguage: "Langue cible",
  selectLevel: "Niveau CECRL",
  selectDialect: "Variante dialectale",
  commandSpotlight: "Rechercher (Ctrl+K)",
  soundscape: "Ambiance sonore",
  profile: "Profil",
  guestUser: "Invité",
  proActive: "Pro Actif",
  upgradePro: "Passer à Pro",

  welcomeBack: "Bon retour parmi nous !",
  readyToLearn: "Prêt à poursuivre votre apprentissage ?",
  startNextLesson: "Lancer la leçon suivante",
  dailyGoal: "Objectif quotidien",
  dailyQuests: "Quêtes du jour",
  questPracticeMinutes: "15 min d’entraînement intensif",
  questPerfectPronunciation: "Prononciation impeccable",
  questReviewCards: "Réviser 10 cartes mémoire",
  quickPractice: "Pratique express",
  speakingDrill: "Entraînement oral",
  flashcardVault: "Cartes FSRS espacées",
  grammarGuide: "Guide grammatical",
  speedChallenge: "Défi lexical",
  currentStreakDays: "jours consécutifs de série",
  streakProtectedBadge: "Série protégée par bouclier",
  protectStreakWithFreeze: "Protéger la série (50 gemmes)",
  milestonesAchievements: "Succès et récompenses",
  claimed: "Réclamé",
  claimReward: "Réclamer la récompense",

  unit1Title: "Unité 1 : Fondations et Mécanique de l’Alphabet",
  unit1Desc: "Maîtrisez l’alphabet, la phonétique authentique et les bases de survie.",
  unit2Title: "Unité 2 : Vie Quotidienne et Repères",
  unit2Desc: "Commandez au restaurant et orientez-vous facilement.",
  unit3Title: "Unité 3 : Récits et Actions Passées",
  unit3Desc: "Racontez vos souvenirs et vos anecdotes avec précision.",
  unit4Title: "Unité 4 : Échanges Professionnels et Débat",
  unit4Desc: "Collaborez en équipe et formulez des propositions nuancées.",
  unit5Title: "Unité 5 : Nuances, Proverbes et Registre Soutenu",
  unit5Desc: "Débat universitaire, subjonctif et métaphores patrimoniales.",
  startLessonPrompt: "Démarrer la leçon",
  completedBadge: "Validé",
  lockedLessonNotice: "Complétez la leçon précédente pour progresser.",
  crownLevel: "Niveau Couronne",

  speechLabTitle: "Laboratoire Vocal Interactif",
  speechLabSubtitle: "Écoutez des locuteurs natifs et perfectionnez votre accent.",
  scenarioCafe: "Au café",
  scenarioCafeDesc: "Commandez des boissons et demandez l’addition.",
  scenarioFriends: "Rencontre amicale",
  scenarioFriendsDesc: "Présentez-vous et partagez vos origines.",
  scenarioDirections: "S’orienter en ville",
  scenarioDirectionsDesc: "Trouvez la gare et les monuments clés.",
  scenarioDining: "Au restaurant",
  scenarioDiningDesc: "Réservez une table et appréciez le repas.",
  scenarioMarket: "Au marché",
  scenarioMarketDesc: "Demandez les prix et faites vos emplettes.",
  scenarioEmergency: "Assistance d’urgence",
  scenarioEmergencyDesc: "Expressions vitales pour la pharmacie et les secours.",
  listenToNative: "Écouter la voix native",
  pressToSpeak: "Cliquez pour parler",
  listening: "Écoute de votre voix en cours...",
  pronunciationScore: "Score de précision",
  excellentPronunciation: "Excellente diction ! Très naturel.",
  needsPractice: "Bel effort ! Réécoutez et répétez la phrase.",
  repeatPhrase: "Réenregistrer",
  nextSentence: "Phrase suivante",

  vaultTitle: "Coffre de Mémorisation Espacée (FSRS)",
  vaultSubtitle: "Optimisé pour ancrer durablement le vocabulaire.",
  clickToFlip: "Cliquez sur la carte pour révéler la traduction",
  howWellDidYouKnow: "Quel était votre niveau de rappel ?",
  ratingAgain: "Oublié",
  ratingHard: "Difficile",
  ratingGood: "Bien",
  ratingEasy: "Facile",
  totalCards: "Total cartes",
  dueToday: "À revoir aujourd’hui",
  retentionRate: "Taux de rétention",

  grammarTitle: "Précis de Grammaire et Syntaxe",
  grammarSubtitle: "Explications méthodiques des règles et déclinaisons.",
  ruleCasesTitle: "Régimes et cas nominaux",
  ruleCasesDesc: "Identifiez le rôle syntaxique des mots dans la phrase.",
  ruleVerbsTitle: "Conjugaison et aspects",
  ruleVerbsDesc: "Temps verbaux et accords rigoureux.",
  rulePastTenseTitle: "Temps du passé",
  rulePastTenseDesc: "Distinguez l’aspect accompli des actions habituelles.",
  ruleParticiplesTitle: "Participes et connecteurs",
  ruleParticiplesDesc: "Subordination complexe et style fluide.",
  ruleParticlesTitle: "Accentuation tonale",
  ruleParticlesDesc: "Rythme naturel et intonation mélodique.",
  exampleSentence: "Exemple audio commenté",
  grammarFormula: "Règle clé",
  checkYourUnderstanding: "Vérifiez vos acquis",

  speedTestTitle: "Pratique Rapide sans Stress Temporel",
  speedTestSubtitle: "Révisez vos automatismes à votre rythme.",
  untimedNotice: "Aucun compte à rebours : progressez sereinement.",
  questionOf: "Question",
  completedDrillCongratulations: "Félicitations ! Vous avez complété toutes les questions.",
  claimXpAndGems: "Réclamer (+60 XP, +25 Gemmes)",

  placementTestTitle: "Test de Niveau Standardisé CECRL (10 Questions)",
  placementTestSubtitle: "Évaluez précisément votre niveau de A1 à C2.",
  variantLabel: "Variante",
  selectVariant: "Sélectionner la variante (A, B, C ou D)",
  questionLabel: "Question",
  skillEvaluated: "Compétence testée",
  cefrEvaluationNotice: "Chaque question évalue un échelon du cadre européen CECRL.",
  levelMustBeEarned: "Les niveaux s’obtiennent par le test pour garantir une vraie progression.",
  takeTestNow: "Passer le test de niveau maintenant",
  unlockedLevelResult: "Niveau certifié"
};

export const GERMAN_TRANSLATIONS: TranslationDictionary = {
  appName: "Fluentic",
  tagline: "Fließend in jedem Wort",
  close: "Schließen",
  cancel: "Abbrechen",
  save: "Speichern",
  continue: "Weiter",
  back: "Zurück",
  confirm: "Bestätigen",
  loading: "Laden...",
  locked: "Gesperrt",
  unlocked: "Freigeschaltet",
  completed: "Abgeschlossen",
  correct: "Richtig!",
  incorrect: "Falsch",
  check: "Überprüfen",
  next: "Weiter",
  finish: "Beenden",
  start: "Starten",
  score: "Punktzahl",
  level: "Stufe",
  streak: "Serie",
  gems: "Edelsteine",
  xp: "XP",
  retakeTest: "Test wiederholen",
  levelLockedAlert: "Stufe gesperrt",
  takePlacementTestToUnlock: "Einstufungstest ablegen zum Freischalten",

  navHome: "Start",
  navPath: "Lernpfad",
  navSpeechLab: "Sprachlabor",
  navDialogue: "KI-Dialoge",
  navGrammar: "Grammatik",
  navSpeedTest: "Schnellübung",
  navTranslator: "KI-Übersetzer",
  navVault: "FSRS-Karten",
  navDisciplines: "Disziplinen",
  navPro: "Pro Studio",

  selectLanguage: "Zielsprache",
  selectLevel: "GER-Niveau",
  selectDialect: "Dialekt",
  commandSpotlight: "Suche (Strg+K)",
  soundscape: "Klanglandschaft",
  profile: "Profil",
  guestUser: "Gast",
  proActive: "Pro Aktiv",
  upgradePro: "Auf Pro upgraden",

  welcomeBack: "Willkommen zurück!",
  readyToLearn: "Bereit für deine nächste Lerneinheit?",
  startNextLesson: "Nächste Lektion starten",
  dailyGoal: "Tagesziel",
  dailyQuests: "Tägliche Aufgaben",
  questPracticeMinutes: "15 Min. intensives Lernen",
  questPerfectPronunciation: "Perfekte Aussprache",
  questReviewCards: "10 Karteikarten wiederholen",
  quickPractice: "Schnellstart",
  speakingDrill: "Sprechtraining",
  flashcardVault: "FSRS-Wiederholung",
  grammarGuide: "Grammatikführer",
  speedChallenge: "Vokabel-Sprint",
  currentStreakDays: "Tage aktive Serie",
  streakProtectedBadge: "Serie durch Schild geschützt",
  protectStreakWithFreeze: "Serie schützen (50 Edelsteine)",
  milestonesAchievements: "Erfolge & Meilensteine",
  claimed: "Eingelöst",
  claimReward: "Belohnung einlösen",

  unit1Title: "Einheit 1: Alphabet & Phonetische Grundlagen",
  unit1Desc: "Meistere das Alphabet, Lautgesetze und alltägliche Überlebensphrasen.",
  unit2Title: "Einheit 2: Alltag & Orientierung",
  unit2Desc: "Bestelle im Café und frage nach dem Weg.",
  unit3Title: "Einheit 3: Vergangenheit & Erzählung",
  unit3Desc: "Erzähle von vergangenen Erlebnissen und Reisen.",
  unit4Title: "Einheit 4: Beruf & Fachdiskussion",
  unit4Desc: "Koordiniere Projekte und formuliere differenzierte Argumente.",
  unit5Title: "Einheit 5: Nuancen & Gehobener Stil",
  unit5Desc: "Akademischer Diskurs, Idiomatik und literarische Ausdruckskraft.",
  startLessonPrompt: "Lektion starten",
  completedBadge: "Abgeschlossen",
  lockedLessonNotice: "Schließe die vorherige Lektion ab.",
  crownLevel: "Kronen-Niveau",

  speechLabTitle: "Interaktives Sprachlabor",
  speechLabSubtitle: "Höre Muttersprachlern zu und trainiere deine Aussprache in Echtzeit.",
  scenarioCafe: "Im Café",
  scenarioCafeDesc: "Bestelle Getränke und bezahle die Rechnung.",
  scenarioFriends: "Freunde kennenlernen",
  scenarioFriendsDesc: "Stelle dich vor und erzähle von deiner Heimat.",
  scenarioDirections: "Nach dem Weg fragen",
  scenarioDirectionsDesc: "Finde Bahnhöfe und Sehenswürdigkeiten.",
  scenarioDining: "Im Restaurant",
  scenarioDiningDesc: "Reserviere einen Tisch und sprich mit dem Personal.",
  scenarioMarket: "Auf dem Markt",
  scenarioMarketDesc: "Erfrage Preise und kaufe frische Waren.",
  scenarioEmergency: "Notfallhilfe",
  scenarioEmergencyDesc: "Wichtige Sätze für Apotheke und Notsituationen.",
  listenToNative: "Muttersprachler anhören",
  pressToSpeak: "Klicken zum Sprechen",
  listening: "Stimme wird erfasst...",
  pronunciationScore: "Aussprache-Bewertung",
  excellentPronunciation: "Hervorragende Aussprache! Sehr authentisch.",
  needsPractice: "Guter Versuch! Noch einmal anhören und nachsprechen.",
  repeatPhrase: "Erneut aufnehmen",
  nextSentence: "Nächster Satz",

  vaultTitle: "FSRS-Karteikasten",
  vaultSubtitle: "Wissenschaftlich fundierte Langzeit-Wiederholung.",
  clickToFlip: "Karte antippen, um Übersetzung zu sehen",
  howWellDidYouKnow: "Wie gut konntest du dich erinnern?",
  ratingAgain: "Vergessen",
  ratingHard: "Schwer",
  ratingGood: "Gut",
  ratingEasy: "Einfach",
  totalCards: "Gesamtkarten",
  dueToday: "Heute fällig",
  retentionRate: "Behaltensrate",

  grammarTitle: "Grammatik- & Morphologie-Leitfaden",
  grammarSubtitle: "Kompakte Übersicht über Fälle, Konjugationen und Satzbau.",
  ruleCasesTitle: "Kasuslehre",
  ruleCasesDesc: "Verstehe Nominativ, Genitiv, Dativ und Akkusativ.",
  ruleVerbsTitle: "Verbkonjugation",
  ruleVerbsDesc: "Regelmäßige und unregelmäßige Formen.",
  rulePastTenseTitle: "Zeiten der Vergangenheit",
  rulePastTenseDesc: "Unterscheide Präteritum und Perfekt.",
  ruleParticiplesTitle: "Partizipien & Satzgefüge",
  ruleParticiplesDesc: "Satzverknüpfung und Nebensätze.",
  ruleParticlesTitle: "Betonung & Sprachmelodie",
  ruleParticlesDesc: "Natürlicher Redefluss und Akzentsetzung.",
  exampleSentence: "Beispielsatz mit Audio",
  grammarFormula: "Grammatikregel",
  checkYourUnderstanding: "Verständnis prüfen",

  speedTestTitle: "Schnellübung ohne Zeitdruck",
  speedTestSubtitle: "Wiederhole Vokabeln im eigenen Wohlfühltempo.",
  untimedNotice: "Kein Countdown: Nimm dir alle Zeit, die du brauchst.",
  questionOf: "Frage",
  completedDrillCongratulations: "Glückwunsch! Du hast alle Fragen beantwortet.",
  claimXpAndGems: "Belohnung einlösen (+60 XP, +25 Edelsteine)",

  placementTestTitle: "Standardisierter GER-Einstufungstest (10 Fragen)",
  placementTestSubtitle: "Bestimme präzise dein Niveau von A1 bis C2.",
  variantLabel: "Variante",
  selectVariant: "Variante wählen (A, B, C oder D)",
  questionLabel: "Frage",
  skillEvaluated: "Geprüfte Fähigkeit",
  cefrEvaluationNotice: "Jede Frage misst eine Stufe des Gemeinsamen Europäischen Referenzrahmens.",
  levelMustBeEarned: "Stufen werden durch den Test ermittelt, um echten Lernerfolg zu sichern.",
  takeTestNow: "Einstufungstest jetzt starten",
  unlockedLevelResult: "Erreichtes Niveau"
};

export function getI18n(nativeCode: string = 'en'): TranslationDictionary {
  const code = (nativeCode || 'en').toLowerCase().trim().split(/[-_]/)[0];
  if (code === 'nl') {
    return DUTCH_TRANSLATIONS;
  }
  if (code === 'es') {
    return SPANISH_TRANSLATIONS;
  }
  if (code === 'fr') {
    return FRENCH_TRANSLATIONS;
  }
  if (code === 'de') {
    return GERMAN_TRANSLATIONS;
  }
  return ENGLISH_FALLBACK_TRANSLATIONS;
}

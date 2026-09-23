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
export function getI18n(nativeCode: string = 'en'): TranslationDictionary {
  if (nativeCode === 'nl') {
    return DUTCH_TRANSLATIONS;
  }
  return ENGLISH_FALLBACK_TRANSLATIONS;
}

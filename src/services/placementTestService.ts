import { CefrLevel } from '../types';
import { AICurriculumEngine } from './aiCurriculumService';
import { WORLD_LANGUAGES } from '../data/languages';
import { getCuratedPlacementQuestions } from './curatedPlacementTests';

export interface PlacementQuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text?: string;
  text_native?: string;
  text_translation?: string;
}

export interface PlacementTestQuestion {
  id: number;
  level: string; // 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  target_skill: string;
  instruction?: string;
  prompt?: string;
  prompt_native?: string;
  prompt_translation?: string;
  options: PlacementQuestionOption[];
  correct_key: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  explanation_native?: string;
  explanation_translation?: string;
  audioText?: string;
}

export interface PlacementTestVariant {
  language: string;
  languageCode: string;
  variant: 'A' | 'B' | 'C' | 'D';
  questions: PlacementTestQuestion[];
}

export class PlacementAssessmentEngine {
  // Synchronous cache populated by dynamic engine
  private static synchronousTestCache = new Map<string, PlacementTestVariant>();

  /**
   * Get 10-question placement test for any target language and variant.
   * Delivers authentic, logically sound questions with zero overlapping text or spoiler translations.
   */
  public static getPlacementTest(
    targetLanguageCode: string,
    targetLanguageName: string,
    variant: 'A' | 'B' | 'C' | 'D' = 'A',
    nativeLanguageCode: string = 'en'
  ): PlacementTestVariant {
    const cacheKey = `${targetLanguageCode}_${nativeLanguageCode}_${variant}`;
    if (this.synchronousTestCache.has(cacheKey)) {
      return this.synchronousTestCache.get(cacheKey)!;
    }

    // Get curated, linguistically authentic 10-question test
    const curated = getCuratedPlacementQuestions(
      targetLanguageCode,
      targetLanguageName,
      nativeLanguageCode,
      variant
    );

    // Normalize questions to guarantee both new and legacy fields are present
    const normalizedQuestions: PlacementTestQuestion[] = curated.map((q) => {
      const prompt = q.prompt || q.prompt_native || targetLanguageName;
      const instruction = q.instruction || q.prompt_translation || `Vraag over ${targetLanguageName}`;
      const explanation = q.explanation || q.explanation_translation || '';

      return {
        ...q,
        prompt,
        instruction,
        prompt_native: prompt,
        prompt_translation: instruction,
        explanation,
        explanation_translation: explanation,
        options: q.options.map((opt) => ({
          key: opt.key,
          text: opt.text || opt.text_native || '',
          text_native: opt.text_native || opt.text || '',
          text_translation: opt.text_translation || opt.text || '',
        }))
      };
    });

    const testVariant: PlacementTestVariant = {
      language: targetLanguageName,
      languageCode: targetLanguageCode,
      variant,
      questions: normalizedQuestions
    };

    this.synchronousTestCache.set(cacheKey, testVariant);
    return testVariant;
  }

  private static buildUniversalQuestions(
    code: string,
    name: string,
    nativeCode: string
  ): PlacementTestQuestion[] {
    const isDutch = nativeCode === 'nl';
    const lang = WORLD_LANGUAGES.find((l) => l.code === code);
    const greeting = lang?.sampleGreeting || `Hello (${name})`;

    const levels = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'C3+'];
    const skills = isDutch ? [
      'Begroetingen & Basis',
      'Eten & Bestellen',
      'Vervoer & Reizen',
      'Persoonlijke Kennismaking',
      'Dienstregeling & Tijd',
      'Herkomst & Biografie',
      'Formele Transacties',
      'Ruimtelijke Routebeschrijving',
      'Waarde & Prijs',
      'Gevorderde Idiomatiek'
    ] : [
      'Greetings & Foundations',
      'Dining & Ordering',
      'Wayfinding & Travel',
      'Personal Introduction',
      'Timetables & Time',
      'Origins & Biography',
      'Formal Transactions',
      'Spatial Directions',
      'Valuation & Price',
      'Advanced Idiomatic Fluency'
    ];

    return levels.map((lvl, idx) => ({
      id: idx + 1,
      level: lvl,
      target_skill: skills[idx] || `Skill ${idx + 1}`,
      prompt_native: idx === 0 ? greeting : `${name} — Level ${lvl} expression`,
      prompt_translation: isDutch ? `Kies de juiste betekenis of vorm in het ${name}` : `Choose the correct meaning or form in ${name}`,
      options: [
        { key: 'A', text_native: idx === 0 ? greeting : `Option A (${name})`, text_translation: isDutch ? 'Correcte betekenis' : 'Correct meaning' },
        { key: 'B', text_native: `Option B (${name})`, text_translation: isDutch ? 'Alternatief B' : 'Alternative B' },
        { key: 'C', text_native: `Option C (${name})`, text_translation: isDutch ? 'Alternatief C' : 'Alternative C' },
        { key: 'D', text_native: `Option D (${name})`, text_translation: isDutch ? 'Alternatief D' : 'Alternative D' },
      ],
      correct_key: 'A',
      explanation_translation: isDutch ? 'Dit is de accurate constructie binnen het ERK-kader.' : 'This is the accurate construction within the CEFR framework.'
    }));
  }

  /**
   * Computes CEFR placement based on the 10-question score
   */
  public static calculateCefrPlacement(
    score: number,
    nativeCode: string = 'en'
  ): {
    level: CefrLevel;
    score: number;
    unlockedLevels: CefrLevel[];
    diagnosis: string;
  } {
    let level: CefrLevel = 'A1';
    let unlockedLevels: CefrLevel[] = ['A1'];
    let diagnosis = '';
    const isDutch = nativeCode === 'nl';

    if (score >= 10) {
      level = 'C2';
      unlockedLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      diagnosis = isDutch
        ? 'Volledige taalbeheersing (C2) — Uitzonderlijke moedertaalbeheersing en idiomatische perfectie.'
        : 'Mastery (C2) — Full native-level operational proficiency and idiomatic precision.';
    } else if (score >= 8) {
      level = 'C1';
      unlockedLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      diagnosis = isDutch
        ? 'Gevorderde taalgebruiker (C1) — Uitstekende beheersing van complexe grammatica, conjunctief en nuance.'
        : 'Advanced User (C1) — Excellent grasp of complex grammar, nuance, and advanced registers.';
    } else if (score >= 6) {
      level = 'B2';
      unlockedLevels = ['A1', 'A2', 'B1', 'B2'];
      diagnosis = isDutch
        ? 'Zelfstandige taalgebruiker (B2) — Vloeiende communicatie, hypothetische zinnen en passieve constructies.'
        : 'Independent User (B2) — Fluent conversation, conditionals, and spontaneous interaction.';
    } else if (score >= 4) {
      level = 'B1';
      unlockedLevels = ['A1', 'A2', 'B1'];
      diagnosis = isDutch
        ? 'Drempelniveau (B1) — Voldoende voor alledaagse gesprekken, verleden tijden en reissituaties.'
        : 'Threshold Level (B1) — Capable in daily conversations, past tenses, and travel contexts.';
    } else if (score >= 2) {
      level = 'A2';
      unlockedLevels = ['A1', 'A2'];
      diagnosis = isDutch
        ? 'Basisgebruiker (A2) — Goede basis van tegenwoordige tijd, basiszinsbouw en dagelijkse behoeften.'
        : 'Waystage User (A2) — Solid understanding of present tense routine verbs and daily needs.';
    } else {
      level = 'A1';
      unlockedLevels = ['A1'];
      diagnosis = isDutch
        ? 'Beginner (A1) — Ideaal startpunt: uitspraak, basisbegroetingen en overlevingsfrasen.'
        : 'Breakthrough (A1) — Optimal starting point: foundational pronunciation, survival phrases, and greetings.';
    }

    return {
      level,
      score,
      unlockedLevels,
      diagnosis
    };
  }
}

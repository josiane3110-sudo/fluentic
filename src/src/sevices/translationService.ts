import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client using your environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface TranslationResult {
  detectedLanguage: string;
  translatedText: string;
  transliteration?: string;
  explanation?: string;
}

export async function translateCustom(text: string, targetLanguage: string): Promise<TranslationResult> {
  const prompt = `
  You are an expert AI language teacher and translator inside a learning app.

  TASK:
  1. Detect the source language of the input text automatically.
  2. Translate the input text accurately into ${targetLanguage}.
  3. If the target language uses non-Latin script (like Arabic, Japanese, Chinese, Cyrillic), provide a clear phonetic transliteration in English characters.
  4. Provide a brief 1-sentence breakdown explaining key vocabulary, grammar context, or tone.

  INPUT TEXT: "${text}"

  OUTPUT FORMAT (Return strictly raw valid JSON with no markdown formatting):
  {
    "detectedLanguage": "Name of detected source language",
    "translatedText": "The exact translated text",
    "transliteration": "Phonetic reading if non-Latin, otherwise empty string",
    "explanation": "Short 1-sentence learning tip"
  }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  try {
    const rawText = response.text ? response.text.replace(/```json|```/g, '').trim() : '';
    return JSON.parse(rawText);
  } catch (e) {
    return {
      detectedLanguage: 'Auto-detected',
      translatedText: response.text || '',
    };
  }
}

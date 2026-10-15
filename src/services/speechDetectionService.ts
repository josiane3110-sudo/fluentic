/**
 * Real-Time Audio Detection & Speech Recognition Engine
 * Seamless integration of Web Speech API with fallback MediaRecorder detection.
 */

// BCP-47 Language mapping
export const BCP47_MAP: Record<string, string> = {
  ar: 'ar-SA',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  ru: 'ru-RU',
  nl: 'nl-NL',
  tr: 'tr-TR',
  pl: 'pl-PL',
  sv: 'sv-SE',
  el: 'el-GR',
  hi: 'hi-IN',
  uk: 'uk-UA',
  vi: 'vi-VN',
  cs: 'cs-CZ',
  ro: 'ro-RO',
  hu: 'hu-HU',
  da: 'da-DK',
  fi: 'fi-FI',
  no: 'no-NO',
  id: 'id-ID',
  th: 'th-TH',
  he: 'he-IL',
  fa: 'fa-IR',
  tl: 'fil-PH',
  lt: 'lt-LT',
  lv: 'lv-LV',
  et: 'et-EE',
  bn: 'bn-BD',
  ur: 'ur-PK',
  ms: 'ms-MY',
  bg: 'bg-BG',
  hr: 'hr-HR',
  sr: 'sr-RS',
  sk: 'sk-SK',
  sl: 'sl-SI',
  ca: 'ca-ES',
  sw: 'sw-KE',
};

export function getBcp47Locale(langCode?: string): string {
  if (!langCode) return 'en-US';
  const clean = langCode.trim().toLowerCase().split(/[-_]/)[0];
  return BCP47_MAP[clean] || `${clean}-${clean.toUpperCase()}`;
}


export interface SpeechDetectionOptions {
  langCode?: string;
  onTranscript: (finalTranscript: string) => void;
  onInterim?: (interimTranscript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

class SpeechDetectionService {
  private activeRecognition: any = null;
  private isListening: boolean = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioStream: MediaStream | null = null;

  public getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Start listening with the highest-precision available engine
   */
  public async startListening(options: SpeechDetectionOptions): Promise<boolean> {
    this.stopListening();

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        const code = (options.langCode || 'en').toLowerCase().split(/[-_]/)[0];
        const bcp47 = BCP47_MAP[code] || `${code}-${code.toUpperCase()}`;
        
        recognition.lang = bcp47;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        let accumulated = '';

        recognition.onstart = () => {
          this.isListening = true;
        };

        recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              accumulated += (accumulated ? ' ' : '') + transcript.trim();
              options.onTranscript(accumulated);
            } else {
              interim += transcript;
              if (options.onInterim) {
                options.onInterim(interim);
              }
            }
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition warning:', e.error);
          if (options.onError) {
            options.onError(e.error || 'Speech detection error');
          }
        };

        recognition.onend = () => {
          this.isListening = false;
          this.activeRecognition = null;
          if (options.onEnd) {
            options.onEnd();
          }
        };

        this.activeRecognition = recognition;
        recognition.start();
        return true;
      } catch (err: any) {
        console.warn('Failed to start native SpeechRecognition, checking mic stream:', err);
      }
    }

    // Fallback: Check audio microphone permission via MediaRecorder
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioStream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.isListening = true;

      this.mediaRecorder.onstop = () => {
        this.isListening = false;
        if (options.onEnd) options.onEnd();
      };

      this.mediaRecorder.start();
      return true;
    } catch (err: any) {
      this.isListening = false;
      if (options.onError) {
        options.onError('Microphone access denied or unsupported.');
      }
      return false;
    }
  }

  /**
   * Stop active listening cleanly
   */
  public stopListening(): void {
    if (this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch {
        // Ignore
      }
      this.activeRecognition = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch {
        // Ignore
      }
      this.mediaRecorder = null;
    }

    if (this.audioStream) {
      try {
        this.audioStream.getTracks().forEach((track) => track.stop());
      } catch {
        // Ignore
      }
      this.audioStream = null;
    }

    this.isListening = false;
  }
}

export const speechDetector = new SpeechDetectionService();

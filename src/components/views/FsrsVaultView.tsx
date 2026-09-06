import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Volume2, 
  Sparkles, 
  BrainCircuit, 
  Check, 
  ArrowRight, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface FsrsVaultViewProps {
  activeLanguage: Language;
  user: UserProfile;
}

interface FlashcardItem {
  id: string;
  category: string;
  frontText: string;
  backText: string;
  ipa: string;
  exampleTarget: string;
  exampleNative: string;
  imageUrl: string;
}

export const FsrsVaultView: React.FC<FsrsVaultViewProps> = ({
  activeLanguage,
  user,
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  // Flashcards with high-quality photographic imagery, Lithuanian target front and Dutch native back
  const flashcards: FlashcardItem[] = [
    {
      id: 'coffee',
      category: isDutch ? 'Eten & Drinken' : 'Food & Drink',
      frontText: 'Kava',
      backText: isDutch ? 'Koffie' : 'Coffee',
      ipa: '/kɐˈvaː/',
      exampleTarget: 'Vieną juodą kavą be cukraus, prašau.',
      exampleNative: isDutch ? 'Eén zwarte koffie zonder suiker, alstublieft.' : 'One black coffee without sugar, please.',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'bread',
      category: isDutch ? 'Eten & Drinken' : 'Food & Drink',
      frontText: 'Duona',
      backText: isDutch ? 'Brood' : 'Bread',
      ipa: '/ˈdwɔ.nɐ/',
      exampleTarget: 'Lietuviška juoda duona yra labai skani.',
      exampleNative: isDutch ? 'Litouws donker roggebrood is erg lekker.' : 'Lithuanian black rye bread is delicious.',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'water',
      category: isDutch ? 'Eten & Drinken' : 'Food & Drink',
      frontText: 'Vanduo',
      backText: isDutch ? 'Water' : 'Water',
      ipa: '/vɐnˈdʊɔ/',
      exampleTarget: 'Stiklinę šalto vandens, prašau.',
      exampleNative: isDutch ? 'Een glas koud water, alstublieft.' : 'A glass of cold water, please.',
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'train',
      category: isDutch ? 'Reizen & Stad' : 'Travel & City',
      frontText: 'Traukinys',
      backText: isDutch ? 'Trein' : 'Train',
      ipa: '/tɾɐʊ̯kʲɪˈnʲiːs/',
      exampleTarget: 'Traukinys į Vilnių išvyksta dešimtą valandą.',
      exampleNative: isDutch ? 'De trein naar Vilnius vertrekt om tien uur.' : 'The train to Vilnius leaves at ten.',
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'book',
      category: isDutch ? 'Onderwijs' : 'Education',
      frontText: 'Knyga',
      backText: isDutch ? 'Boek' : 'Book',
      ipa: '/ˈknʲiː.ɡɐ/',
      exampleTarget: 'Aš skaitau įdomią lietuvišką knygą.',
      exampleNative: isDutch ? 'Ik lees een interessant Litouws boek.' : 'I am reading an interesting book.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'house',
      category: isDutch ? 'Wonen' : 'Living',
      frontText: 'Namas',
      backText: isDutch ? 'Huis' : 'House',
      ipa: '/ˈnɐ.mɐs/',
      exampleTarget: 'Šis senas namas turi gražų sodą.',
      exampleNative: isDutch ? 'Dit oude huis heeft een mooie tuin.' : 'This old house has a lovely garden.',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'cat',
      category: isDutch ? 'Dieren' : 'Animals',
      frontText: 'Katė',
      backText: isDutch ? 'Kat' : 'Cat',
      ipa: '/kɐˈtʲeː/',
      exampleTarget: 'Maža katė miega ant sofos.',
      exampleNative: isDutch ? 'De kleine kat slaapt op de bank.' : 'The small cat sleeps on the sofa.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'sun',
      category: isDutch ? 'Natuur' : 'Nature',
      frontText: 'Saulė',
      backText: isDutch ? 'Zon' : 'Sun',
      ipa: '/ˈsɐʊ̯.lʲeː/',
      exampleTarget: 'Šiandien danguje ryškiai šviečia saulė.',
      exampleNative: isDutch ? 'Vandaag schijnt de zon helder aan de hemel.' : 'Today the sun is shining brightly.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'tea',
      category: isDutch ? 'Eten & Drinken' : 'Food & Drink',
      frontText: 'Arbata',
      backText: isDutch ? 'Thee' : 'Tea',
      ipa: '/ɐɾ.bɐˈtɐ/',
      exampleTarget: 'Ar norite žaliosios arbatos su medumi?',
      exampleNative: isDutch ? 'Wilt u groene thee met honing?' : 'Would you like green tea with honey?',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'sea',
      category: isDutch ? 'Natuur' : 'Nature',
      frontText: 'Jūra',
      backText: isDutch ? 'Zee' : 'Sea',
      ipa: '/ˈjuː.ɾɐ/',
      exampleTarget: 'Baltijos jūra vasarą yra labai rami.',
      exampleNative: isDutch ? 'De Oostzee is in de zomer erg rustig.' : 'The Baltic Sea is peaceful in summer.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);

  const card = flashcards[currentIndex];

  const handleFlip = () => {
    audioSynth.playGentleFeedback();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (ratingName: string) => {
    if (ratingName === 'easy' || ratingName === 'good') {
      audioSynth.playSuccessChime();
    } else {
      audioSynth.playGentleFeedback();
    }
    setCardsReviewed((prev) => prev + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isDutch ? 'Litouwse Flitskaarten' : 'Flashcards'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isDutch 
              ? 'Leer Litouws met afbeeldingen, audio en Nederlandse vertalingen' 
              : 'Visual spaced repetition flashcards with audio and native Dutch translations'}
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold flex items-center gap-1.5">
          <BrainCircuit className="w-4 h-4 text-purple-600" />
          <span>{isDutch ? `Kaart ${currentIndex + 1} van ${flashcards.length}` : `Card ${currentIndex + 1} of ${flashcards.length}`}</span>
        </div>
      </div>

      {/* Main Flashcard Container with Flip Animation */}
      <div className="perspective-1000">
        <div
          onClick={handleFlip}
          className="w-full cursor-pointer select-none rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md transition-all hover:shadow-lg"
        >
          {/* Card Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
            <img
              src={card.imageUrl}
              alt={card.frontText}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
              {card.category}
            </div>
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-blue-600" />
              <span>{isDutch ? 'Klik om te draaien' : 'Tap to flip'}</span>
            </div>
          </div>

          {/* Card Content (Front = Lithuanian, Back = Dutch) */}
          <div className="p-6 sm:p-8 text-center space-y-4">
            {!isFlipped ? (
              /* FRONT: Target Language (Lithuanian) */
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {card.frontText}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      audioSynth.speakText(card.frontText, 'lt');
                    }}
                    className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-all hover:scale-110 cursor-pointer"
                    title={isDutch ? 'Beluister Litouws' : 'Pronounce'}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs font-mono text-blue-700 font-bold">
                  {card.ipa}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isDutch ? 'Litouws Voorbeeld' : 'Example Sentence'}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    "{card.exampleTarget}"
                  </p>
                </div>

                <p className="text-xs text-slate-400">
                  {isDutch ? '👉 Klik op de kaart voor de Nederlandse vertaling' : '👉 Tap card to reveal Dutch translation'}
                </p>
              </div>
            ) : (
              /* BACK: Native Language (Dutch) */
              <div className="space-y-3 animate-in fade-in bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  {isDutch ? 'Nederlandse Betekenis' : 'Dutch Translation'}
                </span>

                <h3 className="text-3xl sm:text-4xl font-black text-blue-950">
                  {card.backText}
                </h3>

                <div className="p-3.5 rounded-2xl bg-white border border-blue-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isDutch ? 'Nederlandse Vertaling' : 'Translation in Dutch'}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 italic">
                    "{card.exampleNative}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FSRS Spaced Repetition Feedback Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
          {isDutch ? 'Hoe goed kende je dit Litouwse woord?' : 'How well did you know this word?'}
        </span>

        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleNextCard('again')}
            className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-center font-bold text-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-base">🔴</div>
            <span>{isDutch ? 'Opnieuw' : 'Again'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNextCard('hard')}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-center font-bold text-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-base">🟠</div>
            <span>{isDutch ? 'Moeilijk' : 'Hard'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNextCard('good')}
            className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-center font-bold text-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-base">🔵</div>
            <span>{isDutch ? 'Goed' : 'Good'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNextCard('easy')}
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-center font-bold text-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-base">🟢</div>
            <span>{isDutch ? 'Makkelijk' : 'Easy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

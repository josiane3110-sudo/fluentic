import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Check, 
  User, 
  Bot, 
  Utensils,
  Handshake,
  Compass,
  Building,
  CheckCircle2
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { audioSynth } from '../../services/audioSynthesizer';
import { getI18n } from '../../services/localization';

interface DialogueTheatreViewProps {
  activeLanguage: Language;
  user: UserProfile;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  nativeTranslation: string;
  timestamp: string;
}

interface ChatScenario {
  id: string;
  title: string;
  icon: React.ElementType;
  persona: string;
  setting: string;
  initialMessage: string;
  initialTranslation: string;
  suggestedReplies: Array<{ text: string; translation: string }>;
  aiReplies: Record<string, { text: string; translation: string; nextSuggestions?: Array<{ text: string; translation: string }> }>;
}

export const DialogueTheatreView: React.FC<DialogueTheatreViewProps> = ({
  activeLanguage,
  user,
}) => {
  const isDutch = (user.nativeLanguageCode || 'nl') === 'nl';
  const i18n = getI18n(user.nativeLanguageCode || 'nl');

  const scenarios: ChatScenario[] = [
    {
      id: 'cafe',
      title: isDutch ? 'In het Restaurant & Café' : 'At the Cafe & Restaurant',
      icon: Utensils,
      persona: isDutch ? 'Padavėjas Mantas (Kelner)' : 'Waiter Mantas',
      setting: isDutch ? 'Een sfeervol restaurant in Vilnius. Je zit aan tafel met de menukaart.' : 'A cozy restaurant in Vilnius.',
      initialMessage: 'Laba diena! Sveiki atvykę. Ar jau išsirinkote, ką norėsite gerti?',
      initialTranslation: isDutch ? 'Goedendag! Welkom. Heeft u al gekozen wat u wilt drinken?' : 'Good day! Welcome. Have you chosen a drink?',
      suggestedReplies: [
        { text: 'Vieną kavą su pienu, prašau.', translation: isDutch ? 'Eén koffie met melk, alstublieft.' : 'One coffee with milk, please.' },
        { text: 'Prašau stiklinę šalto vandens.', translation: isDutch ? 'Een glas koud water, graag.' : 'A glass of cold water, please.' },
        { text: 'Ar turite šaltibarščių?', translation: isDutch ? 'Heeft u koude bietensoep (šaltibarščiai)?' : 'Do you have cold beet soup?' }
      ],
      aiReplies: {
        'default': {
          text: 'Puiku! Tuojau atnešiu. Ar norėsite paragauti tradicinių lietuviškų patiekalų?',
          translation: isDutch ? 'Uitstekend! Ik breng het zo. Wilt u traditionele Litouwse gerechten proeven?' : 'Wonderful! I will bring it right away. Would you like to try traditional meals?',
          nextSuggestions: [
            { text: 'Taip, norėčiau cepelinų!', translation: isDutch ? 'Ja, ik wil graag cepelinai (aardappelknoedels)!' : 'Yes, I would like cepelinai!' },
            { text: 'Sąskaitą, prašau.', translation: isDutch ? 'De rekening, alstublieft.' : 'The bill, please.' }
          ]
        }
      }
    },
    {
      id: 'introductions',
      title: isDutch ? 'Kennismaken met een Local' : 'Meeting a Local',
      icon: Handshake,
      persona: isDutch ? 'Eglė (Litouwse studente uit Vilnius)' : 'Eglė (Local)',
      setting: isDutch ? 'In het Vingispark in Vilnius op een zonnige middag.' : 'In Vingis Park, Vilnius.',
      initialMessage: 'Labas! Aš esu Eglė. Malonu susipažinti! Iš kur tu esi atvykęs?',
      initialTranslation: isDutch ? 'Hallo! Ik ben Eglė. Aangenaam kennis te maken! Waar kom je vandaan?' : 'Hi! I am Eglė. Nice to meet you! Where are you from?',
      suggestedReplies: [
        { text: 'Labas! Aš esu iš Nyderlandų.', translation: isDutch ? 'Hallo! Ik kom uit Nederland.' : 'Hi! I am from the Netherlands.' },
        { text: 'Mano vardas yra Jonas.', translation: isDutch ? 'Mijn naam is Jonas.' : 'My name is Jonas.' },
        { text: 'Aš mokausi lietuvių kalbos!', translation: isDutch ? 'Ik leer de Litouwse taal!' : 'I am learning Lithuanian!' }
      ],
      aiReplies: {
        'default': {
          text: 'Nuostabu! Nyderlandai yra labai graži šalis. Kaip tau patinka Lietuva ir Vilnius?',
          translation: isDutch ? 'Geweldig! Nederland is een heel mooi land. Hoe vind je Litouwen en Vilnius?' : 'Wonderful! Netherlands is a beautiful country. How do you like Lithuania and Vilnius?',
          nextSuggestions: [
            { text: 'Vilnius yra labai gražus miestas.', translation: isDutch ? 'Vilnius is een prachtige stad.' : 'Vilnius is a beautiful city.' },
            { text: 'Man labai patinka lietuviškas maistas!', translation: isDutch ? 'Ik vind het Litouwse eten erg lekker!' : 'I really like Lithuanian food!' }
          ]
        }
      }
    },
    {
      id: 'directions',
      title: isDutch ? 'De Weg Vragen in de Stad' : 'City & Directions',
      icon: Compass,
      persona: isDutch ? 'Tomas (Behulpzame voorbijganger)' : 'Tomas (Helpful Passersby)',
      setting: isDutch ? 'Op het Kathedraalplein in Vilnius.' : 'Cathedral Square in Vilnius.',
      initialMessage: 'Atsiprašau, ar jums reikia pagalbos rasti kelią?',
      initialTranslation: isDutch ? 'Pardon, heeft u hulp nodig bij het vinden van de weg?' : 'Excuse me, do you need help finding the way?',
      suggestedReplies: [
        { text: 'Taip, kur yra Gedimino pilis?', translation: isDutch ? 'Ja, waar is het Gediminaskasteel?' : 'Yes, where is Gediminas Castle?' },
        { text: 'Kur yra artimiausia stotelė?', translation: isDutch ? 'Waar is de dichtstbijzijnde bushalte?' : 'Where is the nearest bus stop?' },
        { text: 'Ačiū, aš tiesiog vaikštau.', translation: isDutch ? 'Bedankt, ik wandel gewoon wat rond.' : 'Thank you, I am just walking.' }
      ],
      aiReplies: {
        'default': {
          text: 'Gedimino pilis yra visai šalia! Eikite tiesiai pro parką ir pamatysite kalną.',
          translation: isDutch ? 'Het Gediminaskasteel is heel dichtbij! Loop rechtdoor door het park en je ziet de heuvel.' : 'Gediminas Castle is very close! Walk straight through the park.',
          nextSuggestions: [
            { text: 'Labai ačiū už pagalbą!', translation: isDutch ? 'Hartelijk dank voor de hulp!' : 'Thank you very much for help!' },
            { text: 'Geros dienos!', translation: isDutch ? 'Een fijne dag!' : 'Have a nice day!' }
          ]
        }
      }
    }
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);
  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSuggestions, setCurrentSuggestions] = useState<Array<{ text: string; translation: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset messages when scenario changes
    const initial: ChatMessage = {
      id: '1',
      sender: 'ai',
      text: activeScenario.initialMessage,
      nativeTranslation: activeScenario.initialTranslation,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initial]);
    setCurrentSuggestions(activeScenario.suggestedReplies);
  }, [selectedScenarioId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string, translationToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    audioSynth.playGentleFeedback();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      nativeTranslation: translationToSend || (isDutch ? 'Jouw antwoord' : 'Your response'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI automated conversational response
    setTimeout(() => {
      audioSynth.playSuccessChime();
      const replyData = activeScenario.aiReplies.default;
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyData.text,
        nativeTranslation: replyData.translation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      if (replyData.nextSuggestions) {
        setCurrentSuggestions(replyData.nextSuggestions);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isDutch ? 'Litouwse AI Gesprekspartner' : 'AI Chat Theatre'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isDutch 
              ? 'Chat in het Litouws met directe Nederlandse vertalingen en handige suggesties' 
              : 'Interactive Lithuanian dialogue with real-time Dutch translations and smart replies'}
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-blue-600" />
          <span>{activeScenario.persona}</span>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Interface */}
      <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        
        {/* Chat Persona Subheader */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              LT
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">{activeScenario.persona}</p>
              <p className="text-[11px] text-slate-500">{activeScenario.setting}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const initial: ChatMessage = {
                id: '1',
                sender: 'ai',
                text: activeScenario.initialMessage,
                nativeTranslation: activeScenario.initialTranslation,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setMessages([initial]);
              setCurrentSuggestions(activeScenario.suggestedReplies);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            title={isDutch ? 'Chat opnieuw starten' : 'Restart chat'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isAi ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAi ? 'bg-blue-100 text-blue-700' : 'bg-slate-800 text-white'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl shadow-2xs ${
                    isAi 
                      ? 'bg-slate-50 border border-slate-200/80 text-slate-900' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                      {isAi && (
                        <button
                          type="button"
                          onClick={() => audioSynth.speakText(msg.text, 'lt')}
                          className="p-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 shadow-2xs shrink-0 cursor-pointer"
                          title={isDutch ? 'Beluister uitspraak' : 'Listen'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {msg.nativeTranslation && (
                      <p className={`text-xs mt-1.5 italic font-medium ${
                        isAi ? 'text-slate-500' : 'text-blue-100'
                      }`}>
                        "{msg.nativeTranslation}"
                      </p>
                    )}
                  </div>

                  <span className={`text-[10px] text-slate-400 block px-1 ${!isAi ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs font-bold text-slate-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>{isDutch ? 'Aan het typen...' : 'Typing...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Replies Bar */}
        {currentSuggestions.length > 0 && (
          <div className="px-6 py-2.5 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {isDutch ? 'Snelle Antwoorden:' : 'Quick Replies:'}
            </span>
            {currentSuggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sug.text, sug.translation)}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-xs font-bold text-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-300 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{sug.text}</span>
                <span className="text-[10px] text-slate-400 font-normal">({sug.translation})</span>
              </button>
            ))}
          </div>
        )}

        {/* Text Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={isDutch ? 'Typ een bericht in het Litouws...' : 'Type a message in Lithuanian...'}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />

          <button
            type="button"
            disabled={!inputText.trim()}
            onClick={() => handleSendMessage()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

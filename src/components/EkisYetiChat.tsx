import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  sender: 'ekis' | 'user';
  text: string;
  time: string;
  link?: { label: string; url: string };
}

// Klubbens FAQ & Kunskapsbas för Ekis
const knowledgeBase: { keys: string[]; answer: string; link?: { label: string; url: string } }[] = [
  {
    keys: ['fritidskort', 'bidrag', 'stöd', 'subvention'],
    answer:
      'Fritidskortet funkar hos oss! IK Lidingö Freeskiers är anslutna till Riksidrottsförbundet. Anmäl barnet som vanligt via bokningssidan och registrera sedan aktiviteten i Fritidskortet-appen.',
    link: { label: 'Läs om Fritidskortet', url: '/kontakt#fritidskortet' }
  },
  {
    keys: ['boka', 'anmäl', 'plats', 'kö', 'släpp'],
    answer:
      'Så bokar du: Vi har inget kösystem – först till kvarn gäller! Anmälan för lediga platser öppnar den 16 oktober kl. 09.00 på klubbens bokningssida.',
    link: { label: 'Se träningsgrupper', url: '/helgskidskola' }
  },
  {
    keys: ['nivå', 'grupp', 'passar', 'nybörjare', 'test'],
    answer:
      'Kort guide: Nybörjare och osäkra åkare börjar i Helgskidskolan (från 5 år). Kan barnet svänga och stanna själv i hela backen och vill hoppa i parken – då är Skidklubben rätt!',
    link: { label: 'Hitta rätt nivå', url: '/#level-finder' }
  },
  {
    keys: ['hjälm', 'ryggskydd', 'utrustning', 'skidor', 'goggles', 'kläder', 'stavar'],
    answer:
      'Godkänd hjälm är obligatoriskt på all träning! I Skidklubben krävs även godkänt ryggskydd (rekommenderas i skidskolan). Utrustning och pjäxor kan även hyras i Ekholmsnäsbackens uthyrning.',
    link: { label: 'Utrustningsguide', url: '/kontakt' }
  },
  {
    keys: ['snö', 'väder', 'inställt', 'stängd', 'kallt', 'temperatur'],
    answer:
      'Vid för lite snö eller stängd backe flyttar vi tillfället till ett nytt datum – ingen träning försvinner! Du får alltid besked via e-post samma dag.',
    link: { label: 'Se backstatus', url: '/' }
  },
  {
    keys: ['skada', 'pengar tillbaka', 'återbetal', 'avboka', 'sjuk'],
    answer:
      'Enligt klubbens policy utgår ingen återbetalning vid skada eller sjukdom, eftersom tränare och backtider redan är bokade och bekostade för säsongen.',
    link: { label: 'Klubbens regler', url: '/kontakt' }
  },
  {
    keys: ['försäkring', 'skidförbundet', 'olycksfall', 'folksam'],
    answer:
      'Alla medlemmar är olycksfallsförsäkrade via Svenska Skidförbundets licensförsäkring hos Folksam under klubbens organiserade träningar och tävlingar!',
    link: { label: 'Om klubben', url: '/om-oss' }
  },
  {
    keys: ['pris', 'kostar', 'avgift', 'träningsavgift'],
    answer:
      'Helgskidskolan kostar 2 980 kr för 5 lektioner à 75 minuter. Privatlektioner kostar 850 kr (1 pers) eller 1 300 kr (2 pers) för 60 minuter inkl. liftkort.',
    link: { label: 'Se alla priser', url: '/helgskidskola' }
  },
  {
    keys: ['privat', 'tränare', 'privatlektion'],
    answer:
      'Privatlektioner bokas smidigt online via vår bokningspanel på privatlektionssidan! Du får 60 minuter personlig coachning och liftkort ingår under passet.',
    link: { label: 'Boka privatlektion', url: '/privatlektion' }
  },
  {
    keys: ['medlem', 'medlemskort', 'rabatt', 'förmån', 'erbjudande', 'partner', 'wallet', 'alpingaraget'],
    answer:
      'Alla medlemmar har tillgång till vårt digitala medlemskort i mobilen med rabatter hos Alpingaraget, Skistar, Gadelius och Kang Poles! Logga in i Medlemsportalen för att se dina förmåner.',
    link: { label: 'Till Medlemsportalen', url: '/medlem' }
  },
  {
    keys: ['resa', 'läger', 'kläppen', 'rookie', 'tävling', 'mästerskap'],
    answer:
      'Vi arrangerar klubbresor till Kläppen, klubbmästerskap samt vår deltävling i Rookie Series Stockholm i Ekholmsnäsbacken!',
    link: { label: 'Se klubbkalendern', url: '/kalender' }
  }
];

export const EkisYetiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ekis',
      text: 'Hej! Jag heter Ekis och är Lidingö Freeskiers maskot! ❄️ Vad undrar du över om skidskolan, utrustning, medlemskort eller backen?',
      time: 'Just nu'
    }
  ]);
  const [customInput, setCustomInput] = useState('');

  const quickQuestions = [
    {
      q: 'När öppnar anmälan?',
      a: 'Anmälan för lediga platser öppnar den 16 oktober kl. 09.00! Vi har inget kösystem, så det är först till kvarn som gäller!',
      link: { label: 'Se träningsgrupper', url: '/helgskidskola' }
    },
    {
      q: 'Vilken utrustning behövs?',
      a: 'Godkänd hjälm och ryggskydd är obligatoriskt för alla! Skidor med inställda bindningar och pjäxor. Stavar behövs från fortsättningsnivå.',
      link: { label: 'Läs utrustningsguide', url: '/kontakt' }
    },
    {
      q: 'Hur bokar jag privatlektion?',
      a: 'Du kan boka privatlektion online direkt via vår bokningspanel! 850 kr (1 pers) eller 1 300 kr (2 pers). Liftkort ingår under lektionen.',
      link: { label: 'Boka privatlektion', url: '/privatlektion' }
    },
    {
      q: 'Hur funkar digitala medlemskortet?',
      a: 'Gå till Medlemsportalen i menyn så ser du ditt digitala kort med QR-kod, träningsgrupp och partnerförmåner hos Alpingaraget och Skistar!',
      link: { label: 'Till Medlemsportalen', url: '/medlem' }
    }
  ];

  const handleQuickQuestion = (item: typeof quickQuestions[0]) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: item.q, time: timeNow },
      { sender: 'ekis', text: item.a, time: timeNow, link: item.link }
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = customInput.trim();
    setCustomInput('');

    // Sök i kunskapsbasen
    const lower = userText.toLowerCase();
    const match = knowledgeBase.find(entry =>
      entry.keys.some(key => lower.includes(key))
    );

    let replyText = 'Tack för frågan! För specifika frågor eller kontakt kan du alltid mejla oss direkt på admin@lidingofreeskiers.se eller kolla vår FAQ.';
    let replyLink: { label: string; url: string } | undefined = { label: 'Till kontaktsidan', url: '/kontakt' };

    if (match) {
      replyText = match.answer;
      replyLink = match.link;
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time: timeNow },
      {
        sender: 'ekis',
        text: replyText,
        time: timeNow,
        link: replyLink
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Mascot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 bg-white p-2 sm:px-4 sm:py-2.5 rounded-full shadow-card border-2 border-freeskiers-cyan/30 hover:border-freeskiers-cyan hover:shadow-elevated transition-all duration-300 transform hover:scale-105"
          aria-label="Fråga maskoten Ekis"
        >
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sky-50 border border-freeskiers-cyan/20">
            <img 
              src="/assets/logo/ekis-yeti-avatar.png" 
              alt="Ekis Yetin" 
              className="w-full h-full object-cover scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/logo/ekis-yeti-transparent.png';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>

          {/* Text on larger screens */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-freeskiers-navy flex items-center gap-1">
              <span>Fråga Ekis</span>
              <Sparkles className="w-3 h-3 text-freeskiers-cyan" />
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Klubbens FAQ-Yeti</span>
          </div>

          {/* Subtle pulse effect */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-freeskiers-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-freeskiers-cyan"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-freeskiers-navy to-freeskiers-cyan text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-1 border border-white/30 overflow-hidden shrink-0">
                <img 
                  src="/assets/logo/ekis-yeti-avatar.png" 
                  alt="Ekis" 
                  className="w-full h-full object-cover scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/logo/ekis-yeti-transparent.png';
                  }}
                />
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Ekis the Yeti</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Maskot</span>
                </div>
                <div className="text-[11px] text-slate-200">Alltid redo i backen! ❄️</div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Stäng chatt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-freeskiers-cyan text-white rounded-br-xs' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.link && (
                  <Link
                    to={msg.link.url}
                    onClick={() => setIsOpen(false)}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-freeskiers-cyan hover:underline bg-white/80 px-2.5 py-1 rounded-full border border-freeskiers-cyan/20 shadow-2xs"
                  >
                    <span>{msg.link.label}</span>
                    <span>→</span>
                  </Link>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Quick Suggestions (if only welcoming) */}
            {messages.length === 1 && (
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>Vanliga frågor:</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(item)}
                      className="text-left text-xs bg-white hover:bg-sky-50 text-slate-700 hover:text-freeskiers-cyan font-medium p-2.5 rounded-xl border border-slate-200 hover:border-freeskiers-cyan/30 transition-all shadow-2xs"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Fråga om skola, utrustning, kort..." 
              className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-freeskiers-cyan focus:bg-white transition-all text-slate-800"
            />
            <button 
              type="submit"
              disabled={!customInput.trim()}
              className="bg-freeskiers-cyan hover:bg-freeskiers-lightcyan disabled:opacity-40 text-white p-2 rounded-full transition-colors shrink-0 shadow-sm"
              aria-label="Skicka fråga"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

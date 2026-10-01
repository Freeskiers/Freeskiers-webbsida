import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  sender: 'ekis' | 'user';
  text: string;
  time: string;
  link?: { label: string; url: string };
}

export const EkisYetiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ekis',
      text: 'Hej! Jag heter Ekis och är Lidingö Freeskiers maskot! ❄️ Vad undrar du över om skidskolan, utrustning eller backen?',
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
      q: 'Kan man använda Fritidskortet?',
      a: 'Ja! Statliga Fritidskortet kan användas hos oss för att täcka deltagaravgifter för barn och unga.',
      link: { label: 'Info om Fritidskortet', url: '/kontakt#fritidskortet' }
    },
    {
      q: 'Kan man boka privatlektion?',
      a: 'Vissa av våra tränare erbjuder privatlektioner i mån av tid. Kontakta oss med åkarens ålder och nivå så hjälper vi till att matcha!',
      link: { label: 'Läs om privatlektioner', url: '/privatlektion' }
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
    const userText = customInput;
    setCustomInput('');

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time: timeNow },
      {
        sender: 'ekis',
        text: 'Tack för frågan! För specifika frågor eller avbokningar kan du alltid mejla oss direkt på info@lidingofreeskiers.se eller kolla vår FAQ!',
        time: timeNow,
        link: { label: 'Till kontaktsidan', url: '/kontakt' }
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
                <h4 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <span>Ekis the Yeti</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-medium">FAQ-Bot</span>
                </h4>
                <p className="text-[11px] text-sky-100 font-medium">Lidingö Freeskiers maskot</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Stäng chatt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-freeskiers-cyan text-white rounded-br-none' 
                      : 'bg-white border border-slate-200/80 text-slate-800 shadow-sm rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.link && (
                    <Link
                      to={msg.link.url}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-freeskiers-cyan hover:underline"
                    >
                      <span>{msg.link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick FAQ questions */}
          <div className="p-3 bg-white border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-freeskiers-cyan" />
              <span>Vanliga frågor:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-left text-[11px] font-medium bg-slate-100 hover:bg-freeskiers-cyan/10 hover:text-freeskiers-cyan text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  {q.q}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input 
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ställ en fråga till Ekis..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan transition-colors"
            />
            <button
              type="submit"
              className="bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white p-2 rounded-xl transition-colors shrink-0"
              aria-label="Skicka"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

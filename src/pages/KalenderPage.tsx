import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Filter, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Facebook, 
  Instagram, 
  Sparkles, 
  Bell, 
  ChevronRight,
  List,
  Grid
} from 'lucide-react';
import { clubEvents, ClubEvent } from '../data/clubEvents';
import { useLevelFinder } from '../context/LevelFinderContext';

export const KalenderPage: React.FC = () => {
  const { openLevelFinder } = useLevelFinder();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'months'>('timeline');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Alla händelser' },
    { id: 'anmalan', label: 'Anmälan & Platser' },
    { id: 'traning', label: 'Träning & Backe' },
    { id: 'tavling', label: 'Tävling & Event' },
    { id: 'klubbkvall', label: 'Klubbkvällar & Läger' },
  ];

  const months = [
    { index: 'all', label: 'Hela säsongen' },
    { index: 9, label: 'Oktober' },
    { index: 10, label: 'November' },
    { index: 11, label: 'December' },
    { index: 0, label: 'Januari' },
    { index: 1, label: 'Februari' },
    { index: 2, label: 'Mars / April' },
  ];

  const filteredEvents = clubEvents.filter((ev) => {
    const matchCategory = selectedCategory === 'all' || ev.category === selectedCategory;
    const matchMonth = selectedMonth === 'all' || ev.monthIndex === selectedMonth;
    return matchCategory && matchMonth;
  });

  // Generate .ics calendar file download
  const handleDownloadICS = (event: ClubEvent) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IK Lidingö Freeskiers//Säsongskalender//SV',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - IK Lidingö Freeskiers`,
      `DESCRIPTION:${event.description}\\n\\nMer info: https://www.lidingofreeskiers.se${event.actionUrl || '/kalender'}`,
      `LOCATION:${event.location}`,
      `DTSTART:20261016T090000Z`,
      `DTEND:20261016T110000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy ready-made social media caption (Instagram / Facebook)
  const handleCopySocialText = (event: ClubEvent) => {
    const text = `❄️ ${event.title.toUpperCase()} ❄️\n\n📅 Datum: ${event.shortDate} (${event.time})\n📍 Plats: ${event.location}\n\n${event.description}\n\n👉 Läs mer & se kalendern på: https://www.lidingofreeskiers.se${event.actionUrl || '/kalender'}\n\n#lidingöfreeskiers #ekholmsnäsbacken #freeskiers #skidglädje #lidingö #skidskola`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  // Share to Facebook
  const handleShareFacebook = (event: ClubEvent) => {
    const url = encodeURIComponent(window.location.origin + (event.actionUrl || '/kalender'));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white">
      
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/freestyle-jump.jpg" 
            alt="Säsongskalender IK Lidingö Freeskiers" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/85 to-freeskiers-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Kalender</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-freeskiers-lightcyan/40 shadow-soft">
            <CalendarIcon className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Säsongen 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl">
            Säsongskalender <span className="text-freeskiers-lightcyan">& Event</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Här samlar vi alla viktiga datum för klubben: anmälningssläpp, tränarutbildning, klubbkvällar i Alpingaraget, säsongsstart, Rookie Series och klubbmästerskap.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#kalender"
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-soft transition-all"
            >
              <span>Bläddra i kalendern</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={openLevelFinder}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
              <span>Gör vårt skidtest</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Calendar View Section */}
      <div id="kalender" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Controls Bar: View Toggle, Category Pills & Month Tabs */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">Överblick & Filtrering</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-0.5">
                  Planera säsongen i Ekholmsnäsbacken
                </h2>
              </div>

              {/* View Mode Toggle: Timeline vs Months */}
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs self-start lg:self-auto">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-freeskiers-navy text-white shadow-soft'
                      : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>Tidslinje / Lista</span>
                </button>
                <button
                  onClick={() => setViewMode('months')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'months'
                      ? 'bg-freeskiers-navy text-white shadow-soft'
                      : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Månadskort</span>
                </button>
              </div>
            </div>

            {/* Filter by Category */}
            <div className="pt-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>Kategorier</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-freeskiers-cyan text-white shadow-soft'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Month */}
            <div className="pt-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>Månad</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {months.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMonth(m.index as any)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedMonth === m.index
                        ? 'bg-freeskiers-navy text-white font-bold'
                        : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results count & status */}
          <div className="flex items-center justify-between gap-4 mb-6 px-1">
            <div className="text-xs sm:text-sm font-semibold text-slate-600">
              Visar <strong className="text-freeskiers-navy">{filteredEvents.length}</strong> händelser
            </div>
            {(selectedCategory !== 'all' || selectedMonth !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMonth('all');
                }}
                className="text-xs font-bold text-freeskiers-cyan hover:underline"
              >
                Nollställ filter
              </button>
            )}
          </div>

          {/* Events View: Timeline View */}
          {viewMode === 'timeline' && (
            <div className="space-y-6 mb-16">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left: Date Badge & Event Details */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    
                    {/* Big Date Badge */}
                    <div className="shrink-0 w-20 sm:w-24 h-24 rounded-2xl bg-gradient-to-b from-sky-50 to-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider leading-none">
                        {event.month}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-freeskiers-navy leading-none mt-1">
                        {event.day}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 mt-1">
                        {event.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${event.categoryColor}`}>
                          {event.categoryLabel}
                        </span>
                        {event.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                            {event.badge}
                          </span>
                        )}
                        {event.isPushedTop && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
                            <Bell className="w-2.5 h-2.5" />
                            <span>Pinnad i toppvyn</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-freeskiers-navy tracking-tight">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-freeskiers-cyan" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-freeskiers-cyan" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 max-w-3xl">
                        {event.description}
                      </p>
                    </div>

                  </div>

                  {/* Right: Actions & Social Sharing */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    {event.actionUrl && (
                      <Link
                        to={event.actionUrl}
                        className="inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-soft transition-all"
                      >
                        <span>{event.actionLabel || 'Läs mer & Boka'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {/* Social Share & iCal tools */}
                    <div className="flex items-center gap-1.5 self-center sm:self-auto">
                      <button
                        onClick={() => handleDownloadICS(event)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-slate-600 hover:text-freeskiers-navy hover:bg-slate-100 text-xs font-semibold border border-slate-200 transition-colors"
                        title="Ladda ner till din kalender (.ics)"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span className="hidden sm:inline">iCal</span>
                      </button>

                      <button
                        onClick={() => handleShareFacebook(event)}
                        className="p-1.5 rounded-xl text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
                        title="Dela på Facebook"
                        aria-label="Dela på Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopySocialText(event)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-100 transition-colors"
                        title="Kopiera färdig text för Instagram & Facebook"
                      >
                        {copiedId === event.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Kopierat!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-slate-600">För SoMe</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Events View: Months Grid View */}
          {viewMode === 'months' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between hover:shadow-elevated transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${event.categoryColor}`}>
                        {event.categoryLabel}
                      </span>
                      <span className="text-xs font-extrabold text-freeskiers-cyan">
                        {event.shortDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-freeskiers-navy mb-2 leading-snug">
                      {event.title}
                    </h3>

                    <div className="text-xs text-slate-500 space-y-1 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-freeskiers-cyan shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-freeskiers-cyan shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    {event.actionUrl ? (
                      <Link
                        to={event.actionUrl}
                        className="text-xs font-bold text-freeskiers-cyan hover:underline flex items-center gap-1"
                      >
                        <span>{event.actionLabel || 'Läs mer'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : <div />}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDownloadICS(event)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        title="Ladda ner iCal"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopySocialText(event)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        title="Kopiera text för Instagram/Facebook"
                      >
                        {copiedId === event.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* How we push events / Social Media sync info box */}
          <div className="bg-gradient-to-r from-slate-900 to-freeskiers-navy rounded-3xl p-8 sm:p-12 text-white shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-freeskiers-lightcyan text-xs font-bold uppercase tracking-wider border border-freeskiers-cyan/40">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Klubbens Kanaler & Sociala Medier</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Missa inga uppdateringar i backen
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Viktiga event visas automatiskt i webbplatsens toppvy. Följ även <strong>@lidingofreeskiers</strong> på Instagram och Facebook för filmer, dagsfärska snöbilder och snabb information vid snöfall!
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://www.instagram.com/lidingofreeskiers/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-soft"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Följ @lidingofreeskiers på Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/freeskierslidingo/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-soft"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Följ på Facebook</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/10 rounded-2xl p-6 border border-white/20 text-xs text-slate-200 space-y-3">
                <div className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
                  <span>För Tränare & Styrelse</span>
                </div>
                <p className="leading-relaxed">
                  Vill du pusha ett event till Facebook eller Instagram? Klicka på <strong>"För SoMe"</strong> på valfritt event ovan för att kopiera en färdig text med emojis och länkar, redo att klistra in i Meta Business Suite!
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

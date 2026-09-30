import React, { useState } from 'react';
import { Calendar, Snowflake, Sun, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface SeasonPhase {
  id: string;
  name: string;
  period: string;
  months: number[]; // 0-indexed: 0 = Jan, 8 = Sep, 9 = Oct...
  tagline: string;
  highlights: string[];
  actionLabel?: string;
  actionPath?: string;
  color: string;
}

export const SeasonWheel: React.FC = () => {
  const currentMonth = new Date().getMonth(); // 0-11

  const seasons: SeasonPhase[] = [
    {
      id: 'autumn',
      name: 'Tidig Höst',
      period: 'September – Oktober',
      months: [8, 9],
      tagline: 'Uppstart & Anmälan inför vintern',
      highlights: [
        'Höstträning startar med barmark, koordination & studsmatta',
        'Utbildningshelg för nya och fortsättande tränare (åk 9+)',
        'ANMÄLAN ÖPPNAR: 16 oktober kl. 09:00 för lediga platser (först till kvarn!)',
        'Information och planering för säsongens grupper'
      ],
      actionLabel: 'Läs om Höstsäsongen',
      actionPath: '/hostsasong',
      color: 'from-blue-500/10 to-cyan-500/10 border-blue-200'
    },
    {
      id: 'prewinter',
      name: 'Förvinter & Förberedelser',
      period: 'November – December',
      months: [10, 11],
      tagline: 'Klubbkvällar & Snöläggning i Ekholmsnäs',
      highlights: [
        'Snöläggningen startar så fort kylan kommer till Lidingö',
        'Skidbytardag & Klubbkväll i Alpingaraget – utrustningscheck',
        'Ledarsamling och genomgång av träningsupplägg och säkerhet',
        'Välkomstmejl och samlingsinfo skickas ut till alla anmälda'
      ],
      actionLabel: 'Utrustning & Frågor',
      actionPath: '/kontakt',
      color: 'from-sky-500/10 to-indigo-500/10 border-sky-200'
    },
    {
      id: 'winter',
      name: 'Högsäsong Vinter',
      period: 'Januari – Februari',
      months: [0, 1],
      tagline: 'Full fart i Ekholmsnäsbacken!',
      highlights: [
        'Freeskiers Helgskidskola körs under 5 helger i januari & februari',
        'Freeskiers Skidklubb tränar på vardagskvällar i park och pist',
        'Privatlektioner med klubbens certifierade tränare',
        'Massor av åkglädje, hopp, rails och nya kompisar på snö'
      ],
      actionLabel: 'Till Helgskidskolan',
      actionPath: '/helgskidskola',
      color: 'from-cyan-500/10 to-teal-500/10 border-cyan-300'
    },
    {
      id: 'spring',
      name: 'Vårvinter & Event',
      period: 'Mars – April',
      months: [2, 3],
      tagline: 'Tävlingar, Vårsol & Säsongsavslutning',
      highlights: [
        'Klubbens deltävling i Rookie Series Stockholm',
        'Klubbmästerskap med festlig stämning och korvgrillning',
        'Klubbresor och härlig vårskidåkning i längre dagar',
        'Diplomutdelning och säsongsavslutning för alla åkare'
      ],
      actionLabel: 'Om Klubben & Event',
      actionPath: '/om-oss',
      color: 'from-indigo-500/10 to-blue-500/10 border-indigo-200'
    }
  ];

  // Find active season index based on calendar month
  const activeSeasonIndex = seasons.findIndex(s => s.months.includes(currentMonth));
  const defaultSelected = activeSeasonIndex !== -1 ? activeSeasonIndex : 0;
  
  const [selectedSeason, setSelectedSeason] = useState<number>(defaultSelected);
  const activeSeason = seasons[selectedSeason];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-freeskiers-lightgray/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-freeskiers-cyan/10 border border-freeskiers-cyan/20 text-freeskiers-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Freeskiers Årshjul</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight">
            Vad händer under året i klubben?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Följ säsongens gång från höstens barmarksträning och anmälningssläpp, till vinterns träningar och vårens tävlingar i Ekholmsnäsbacken.
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {seasons.map((season, idx) => {
            const isCurrentlyRunning = season.months.includes(currentMonth);
            const isSelected = selectedSeason === idx;

            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-white border-freeskiers-cyan shadow-card ring-2 ring-freeskiers-cyan/20' 
                    : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Active month badge */}
                {isCurrentlyRunning && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-freeskiers-cyan text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
                    Just nu!
                  </span>
                )}
                <div className="text-xs font-semibold text-freeskiers-cyan uppercase tracking-wider mb-1">
                  {season.period}
                </div>
                <div className="font-extrabold text-base sm:text-lg text-freeskiers-navy leading-tight">
                  {season.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Card for Selected Phase */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-card transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5 text-freeskiers-cyan font-bold text-sm uppercase tracking-wide">
                <Calendar className="w-4 h-4" />
                <span>{activeSeason.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy mt-1">
                {activeSeason.name} – {activeSeason.tagline}
              </h3>
            </div>
            {activeSeason.actionLabel && activeSeason.actionPath && (
              <Link
                to={activeSeason.actionPath}
                className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft transition-all self-start lg:self-auto shrink-0"
              >
                <span>{activeSeason.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeSeason.highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Season Pro Tip */}
          <div className="mt-8 p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-3 text-xs sm:text-sm text-sky-900 font-medium">
            <Snowflake className="w-5 h-5 text-freeskiers-cyan shrink-0" />
            <span>
              Tips till föräldrar: Anmälan till Helgskidskola och Skidklubb öppnar alltid den 16 oktober. Håll utkik här på sajten för direktlänkar!
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

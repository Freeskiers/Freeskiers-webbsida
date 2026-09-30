import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, Calendar, Clock, CheckCircle2, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';

export const HelgskidskolaPage: React.FC = () => {
  const groups = [
    {
      level: 'Grön Grupp – Nybörjare',
      age: 'Från 5 år och uppåt',
      desc: 'För barn som aldrig åkt skidor tidigare eller som behöver repetera grunderna i barnbacken.',
      focus: ['Lära sig glida och stanna i plog', 'Åka knapplift på egen hand', 'Självförtroende och skidglädje']
    },
    {
      level: 'Blå Grupp – Fortsättning',
      age: 'Från ca 6–9 år',
      desc: 'För barn som kan bromsa, svänga och åka lift själva i Ekholmsnäs stora backe.',
      focus: ['Slalomsvängar och fartkontroll', 'Parallella skidor', 'Små terrängvågor och mini-hopp']
    },
    {
      level: 'Röd Grupp – Avancerad / Freeski intro',
      age: 'Från ca 8–13 år',
      desc: 'För säkra åkare som åker obehindrat i alla backar och vill lära sig trick, rails och hopp.',
      focus: ['Skärande carvingsvängar', 'Hoppteknik & landning i parken', 'Glädje och rails']
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Tag */}
        <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-cyan uppercase tracking-wider mb-4">
          <Link to="/" className="hover:underline">Hem</Link>
          <span>/</span>
          <span>Helgskidskola</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-freeskiers-navy tracking-tight">
            Freeskiers Helgskidskola
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            För barn och unga som vill lära sig åka skidor eller ta sin åkning till nästa nivå. Vi kör 5 intensiva och roliga tillfällen på lördagar eller söndagar under januari och februari i Ekholmsnäsbacken.
          </p>
        </div>

        {/* Key Info Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-freeskiers-lightgray border border-slate-200/90 mb-14">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 flex items-center justify-center text-freeskiers-cyan shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Omfattning</div>
              <div className="font-extrabold text-freeskiers-navy text-sm sm:text-base">5 helgtillfällen (jan–feb)</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 flex items-center justify-center text-freeskiers-cyan shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Passlängd</div>
              <div className="font-extrabold text-freeskiers-navy text-sm sm:text-base">75 minuter per gång</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 flex items-center justify-center text-freeskiers-cyan shrink-0">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Plats</div>
              <div className="font-extrabold text-freeskiers-navy text-sm sm:text-base">Ekholmsnäsbacken, Lidingö</div>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mb-8">
            Våra Skidskolegrupper
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {groups.map((group, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-card flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider mb-1">
                    {group.age}
                  </div>
                  <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">
                    {group.level}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {group.desc}
                  </p>
                  <div className="space-y-2.5 mb-8">
                    {group.focus.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="https://www.lidingofreeskiers.se"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-soft"
                  >
                    <span>Anmäl till denna grupp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Important Terms */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 mb-12">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-extrabold text-freeskiers-navy mb-4">
              Pris & Medlemskap
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              I deltagaravgiften för skidskolan ingår 5 lärarledda träningspass med våra certifierade ungdomsledare samt medlemskap i IK Lidingö Freeskiers och olycksfallsförsäkring via Svenska Skidförbundet.
            </p>
            
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-700 mb-6">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Utrustnings- & Avbokningspolicy:</strong> Alla deltagare måste ha godkänd hjälm och ryggskydd. Vid eventuell snöbrist flyttas lektionerna framåt eller ersätts med andra datum under säsongen. Vid skada eller frånvaro utgår ingen återbetalning enligt klubbens regler.
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://www.lidingofreeskiers.se"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all"
              >
                <span>Boka Skidskola (Öppnar 16 okt)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-freeskiers-cyan hover:underline"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Har du frågor? Fråga Ekis i FAQ</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { useLevelFinder } from '../context/LevelFinderContext';

export const SkidklubbPage: React.FC = () => {
  const { openLevelFinder } = useLevelFinder();

  return (
    <div className="bg-white">
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/freestyle-jump.jpg" 
            alt="Freeskiers Skidklubb parkåkning" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/80 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Skidklubb</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-freeskiers-lightcyan/40">
            <Zap className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Regelbunden Träning i Backen</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Freeskiers Skidklubb
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            För barn och unga som vill träna regelbunden friåkning och freestyle under vintersäsongen. Vi kör vardagskvällar i Ekholmsnäsbacken med fokus på hopp, rails, allsidig skidteknik och stark gemenskap.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.lidingofreeskiers.se"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-soft transition-all"
            >
              <span>Anmälan öppnar 16 okt</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={openLevelFinder}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
              <span>Gör skidtestet för att testa nivån</span>
            </button>
          </div>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
            <h3 className="text-xl font-extrabold text-freeskiers-navy mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-freeskiers-cyan" />
              <span>Hur träningen ser ut</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              I skidklubben delas åkarna in i åldersanpassade träningsgrupper. Träningarna leds av klubbens duktiga och inspirerande instruktörer som själva åker på hög nivå och brinner för att lära ut.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span>Träning 1–2 gånger i veckan under januari–mars (måndag–torsdag kvällar).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span>Parkträning med rails, boxar, små och stora hopp samt varierad åkning i hela backen.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span>Fokus på glädje och utveckling – tävling är helt frivilligt för den som vill testa!</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-freeskiers-cyan" />
                <span>Anmälningsprocess</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tidigare medlemmar har förtur under hösten. Därefter öppnas alla lediga platser upp för nya medlemmar.
              </p>
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-100 text-xs sm:text-sm text-sky-900 font-medium mb-6">
                <strong>Anmälan öppnar den 16 oktober kl. 09.00!</strong> Vi tillämpar inget kösystem utan först till kvarn gäller för alla öppna platser.
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <a
                href="https://www.lidingofreeskiers.se"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3.5 rounded-full font-bold text-sm shadow-soft transition-all"
              >
                <span>Anmäl till Skidklubben</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Requirements */}
        <div className="bg-freeskiers-lightgray rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <h3 className="text-xl sm:text-2xl font-extrabold text-freeskiers-navy mb-4">
            Förkunskapskrav för Skidklubben
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-2xl">
            För att delta i Freeskiers Skidklubb behöver åkaren kunna ta sig upp i liften själv, bromsa kontrollerat och svänga med parallella skidor i hela Ekholmsnäsbacken.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={openLevelFinder}
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-soft transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Testa åkarens nivå i skidtestet</span>
            </button>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold text-freeskiers-cyan hover:underline"
            >
              <span>Fråga Ekis i FAQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

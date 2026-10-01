import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, MapPin, Users, Award, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLevelFinder } from '../context/LevelFinderContext';

export const RookieSeriesPage: React.FC = () => {
  const { openLevelFinder } = useLevelFinder();

  return (
    <div className="bg-white">
      
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[420px] sm:min-h-[500px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/freestyle-jump.jpg" 
            alt="Rookie Series i Ekholmsnäsbacken med Svenska Skidförbundet" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/85 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Rookie Series Stockholm</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-freeskiers-lightcyan/40 shadow-soft">
            <Trophy className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Officiellt samarbete med Svenska Skidförbundet</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl">
            Rookie Series <span className="text-freeskiers-lightcyan">Stockholm</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Sveriges roligaste instegstävling i Slopestyle & Big Air för barn och unga! Arrangeras i Ekholmsnäsbacken av IK Lidingö Freeskiers i samarbete med Svenska Skidförbundet.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://www.skidor.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all transform hover:-translate-y-0.5"
            >
              <span>Se tävlingskalendern (SSF)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={openLevelFinder}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-6 py-3.5 rounded-full font-bold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
              <span>Gör vårt skidtest</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-freeskiers-lightgray border border-slate-200/90 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Plats</div>
              <div className="font-extrabold text-freeskiers-navy text-base mt-0.5">Ekholmsnäsbacken, Lidingö</div>
              <div className="text-xs text-slate-500 mt-1">Snowparken & hoppen</div>
            </div>

            <div className="p-6 rounded-2xl bg-freeskiers-lightgray border border-slate-200/90 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">När</div>
              <div className="font-extrabold text-freeskiers-navy text-base mt-0.5">Februari / Mars årligen</div>
              <div className="text-xs text-slate-500 mt-1">En helg fylld av åkglädje</div>
            </div>

            <div className="p-6 rounded-2xl bg-freeskiers-lightgray border border-slate-200/90 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Klasser</div>
              <div className="font-extrabold text-freeskiers-navy text-base mt-0.5">Kids, Ungdom & Junior</div>
              <div className="text-xs text-slate-500 mt-1">Killar & tjejer, skidor & bräda</div>
            </div>

            <div className="p-6 rounded-2xl bg-freeskiers-lightgray border border-slate-200/90 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Förbundssamarbete</div>
              <div className="font-extrabold text-freeskiers-navy text-base mt-0.5">Svenska Skidförbundet</div>
              <div className="text-xs text-slate-500 mt-1">Officiell nationell tour</div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                Tävling på barnens villkor
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight mt-2 mb-6">
                Vad är Rookie Series?
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  <strong>Rookie Series</strong> är Svenska Skidförbundets officiella instegstävling för unga skid- och snowboardåkare runt om i landet. Tävlingen är skapad för att sänka tröskeln till tävlingsåkning och ge alla unga åkare en positiv, stöttande och rolig första upplevelse.
                </p>
                <p>
                  Hos IK Lidingö Freeskiers i Ekholmsnäsbacken kör vi tävlingen med ett avslappnat <em>jam-format</em>. Det innebär att åkarna får åka så många åk de hinner under ett tidspass, istället för att bli utslagna efter ett enda åk. Det skapar mer skidåkning, mindre nervositet och massor av pepp bland kompisarna i backen!
                </p>
                <p>
                  Under tävlingsdagen bjuder vi på DJ, grym stämning, grillade hamburgare i solen och ett välfyllt prisbord från klubbens samarbetspartners som <strong>Gadelius Fastighetsbyrå</strong> och <strong>Alpingaraget</strong>.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-freeskiers-navy">
                  <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan" />
                  <span>Ingen utslagning – alla kör massor av åk</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-freeskiers-navy">
                  <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan" />
                  <span>Hjälm och ryggskydd obligatoriskt</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200/90 relative group">
                <img 
                  src="/assets/images/hero-freeski-cinematic.jpg" 
                  alt="Park och hopp i Ekholmsnäsbacken" 
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">
                    Ekholmsnäs Snowpark
                  </div>
                  <div className="text-xl font-extrabold mt-1">
                    Gemenskap, musik och hopp
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classes & Formats */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                Tävlingsklasser
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy mt-1">
                Klasser för alla åldrar
              </h3>
              <p className="text-slate-600 text-sm mt-2">
                Alla deltagare tävlar mot jämnåriga med anpassade bedömningskriterier där stil, glädje och kontroll belönas högst.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg mb-5">
                  KIDS
                </div>
                <h4 className="text-xl font-extrabold text-freeskiers-navy mb-2">Kids (upp till ca 10 år)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  För de yngsta åkarna. Fullt fokus på glädje och att våga testa. Alla deltagare får medalj och diplom från Svenska Skidförbundet!
                </p>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  Medalj till alla deltagare
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center font-black text-lg mb-5">
                  UNG
                </div>
                <h4 className="text-xl font-extrabold text-freeskiers-navy mb-2">Ungdom (ca 11–14 år)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Lite större utmaningar på kickers och boxar. Bedömning av rotationer, grabs och rena landningar. Grym pepp mellan åkarna!
                </p>
                <div className="text-xs font-bold text-freeskiers-cyan bg-sky-50 px-3 py-1 rounded-full inline-block">
                  Fina priser från sponsorer
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-freeskiers-navy text-white flex items-center justify-center font-black text-lg mb-5">
                  JUN
                </div>
                <h4 className="text-xl font-extrabold text-freeskiers-navy mb-2">Junior (15–18 år)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  För äldre ungdomar med avancerad parkåkning. Steget vidare mot Swedish Slopestyle Tour och SM.
                </p>
                <div className="text-xs font-bold text-freeskiers-navy bg-slate-100 px-3 py-1 rounded-full inline-block">
                  Ranking & Tävlingslicens
                </div>
              </div>

            </div>
          </div>

          {/* Swedish Ski Federation membership banner */}
          <div className="bg-gradient-to-r from-freeskiers-navy to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-freeskiers-lightcyan text-xs font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>Officiell förening i SSF</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                IK Lidingö Freeskiers är anslutna till Svenska Skidförbundet
              </h3>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Som medlem i klubben ingår medlemskap i Svenska Skidförbundet och Riksidrottsförbundet. Det ger alla våra åkare officiell olycksfallsförsäkring och rätten att delta i sanktionerade tävlingar i hela landet.
              </p>
            </div>
            
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                to="/skidklubb"
                className="bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all text-center"
              >
                <span>Träna med Skidklubben</span>
              </Link>
              <Link
                to="/om-oss"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-sm transition-all text-center"
              >
                <span>Om föreningen</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

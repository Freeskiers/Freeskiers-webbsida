import React from 'react';
import { Link } from 'react-router-dom';
import { SeasonWheel } from '../components/SeasonWheel';
import { SlopeStatus } from '../components/SlopeStatus';
import { Calendar, Users, Trophy, Sparkles, ArrowRight, ShieldCheck, Heart, Snowflake } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      
      {/* Live Backstatus Bar */}
      <SlopeStatus />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-sky-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-freeskiers-cyan/10 border border-freeskiers-cyan/20 text-freeskiers-cyan text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Sveriges största friåkningsklubb</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-freeskiers-navy tracking-tight leading-tight">
              Lidingö Freeskiers
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-freeskiers-cyan mt-2">
              – För skidälskande barn och unga
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Skidglädje, gemenskap och upplevelser på snö. Vi driver helgskidskola och skidklubb i Ekholmsnäsbacken där alla får utvecklas i sin egen takt – utan prestationskrav.
            </p>
          </div>

          {/* Dual Action Cards (Skidskola & Skidklubb) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
            
            {/* Helgskidskola Card */}
            <div className="group relative bg-freeskiers-lightgray hover:bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 flex items-center justify-center text-freeskiers-cyan mb-6 group-hover:scale-110 transition-transform">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider mb-2">
                  Helger i Jan – Feb
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mb-3">
                  Freeskiers Helgskidskola
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  För dig som vill lära dig åka skidor och ha roligt i backen under 5 tillfällen på helger under januari och februari i Ekholmsnäsbacken. Grupper från nybörjare till fortsättning.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60">
                <Link
                  to="/helgskidskola"
                  className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-soft transition-all"
                >
                  <span>Till skidskolan & Anmälan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Skidklubb Card */}
            <div className="group relative bg-freeskiers-lightgray hover:bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-freeskiers-navy/10 flex items-center justify-center text-freeskiers-navy mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-freeskiers-navy uppercase tracking-wider mb-2">
                  Vardagskvällar under vintern
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mb-3">
                  Freeskiers Skidklubb
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  För dig som vill träna regelbunden skidåkning under vardagarna. Träna friåkning, hopp, rails, carving och park med klubbens inspirerande tränare.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60">
                <Link
                  to="/skidklubb"
                  className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-soft transition-all"
                >
                  <span>Till skidklubben & Info</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* Important Season Alert Banner */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-freeskiers-cyan text-white flex items-center justify-center shrink-0 shadow-soft">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-base sm:text-lg text-freeskiers-navy">
                  Anmälan öppnar 16 oktober kl. 09.00
                </div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Gäller lediga platser för Helgskidskola & Skidklubb säsongen 2026/2027. Först till kvarn!
                </div>
              </div>
            </div>
            <Link
              to="/helgskidskola"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-freeskiers-cyan hover:text-freeskiers-lightcyan hover:underline shrink-0"
            >
              <span>Se tider & priser</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* The Interactive Årshjul Component */}
      <SeasonWheel />

      {/* About Club Story Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Story text */}
            <div>
              <div className="inline-flex items-center gap-2 text-freeskiers-cyan font-bold text-xs uppercase tracking-wider mb-2">
                <Heart className="w-4 h-4" />
                <span>Vår Filosofi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight leading-tight mb-6">
                Vi är Lidingö Freeskiers
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Skidglädje, nya vänner och massor av upplevelser på snö – det är kärnan i Lidingö Freeskiers.</strong> Vi driver skidskola och skidklubb för barn och unga där alla, oavsett nivå, får utvecklas i sin egen takt.
                </p>
                <p>
                  Vår verksamhet bygger på rörelseglädje och känslan av frihet när man bemästrar backen, vare sig det handlar om den allra första plogsvängen eller att susa fram i snygga carvingsvängar. Vi tävlar inte, men hos oss kan du prova på allt från jibbing och puckelpist till härlig lössnöåkning.
                </p>
                <p>
                  När du slutat nian finns dessutom möjlighet att gå våra skid- och snowboardinstruktörsutbildningar och därefter påbörja en tränarkarriär inom Lidingö Freeskiers.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/om-oss"
                  className="inline-flex items-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-soft transition-all"
                >
                  <span>Möt våra tränare & ledare</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/om-oss#bli-tranare"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-full text-sm font-bold transition-all"
                >
                  <span>Bli tränare (åk 9+)</span>
                </Link>
              </div>
            </div>

            {/* Visual Mascot Feature Card */}
            <div className="relative bg-gradient-to-tr from-sky-100/60 to-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card text-center flex flex-col items-center">
              <img 
                src="/assets/logo/ekis-yeti-transparent.png" 
                alt="Maskoten Ekis Yetin" 
                className="w-48 sm:w-60 h-auto object-contain transform hover:scale-105 transition-transform duration-300 drop-shadow-md mb-6"
              />
              <div className="max-w-md">
                <h3 className="text-xl sm:text-2xl font-extrabold text-freeskiers-navy">
                  Träffa klubbens maskot: Ekis!
                </h3>
                <p className="text-slate-600 text-sm mt-2">
                  Ekis älskar snö, hopp och stora svängar i Ekholmsnäsbacken. Har du frågor om klubben? Klicka på chattbubblan nere i hörnet så hjälper Ekis dig direkt!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Values Grid */}
      <section className="py-16 bg-freeskiers-lightgray/50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/10 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-lg text-freeskiers-navy mb-2">Ingen tävlingshets</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hos oss fokuserar vi på rörelseglädje, gemenskap och att ha roligt på snö. Alla är välkomna oavsett förkunskaper.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/10 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-lg text-freeskiers-navy mb-2">Unga ledare & förebilder</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Klubbens tränare är äldre ungdomar och åkare som själva vuxit upp i föreningen. Tryggt, inspirerande och roligt!
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/10 text-freeskiers-cyan flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-lg text-freeskiers-navy mb-2">Trygghet & Försäkring</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Alla medlemmar är olycksfallsförsäkrade via Svenska Skidförbundet och vi tillämpar alltid hjälm- och ryggskyddskrav.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

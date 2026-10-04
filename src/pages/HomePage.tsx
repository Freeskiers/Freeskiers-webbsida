import React from 'react';
import { Link } from 'react-router-dom';
import { SlopeStatus } from '../components/SlopeStatus';
import { LevelFinder } from '../components/LevelFinder';
import { useLevelFinder } from '../context/LevelFinderContext';
import { clubEvents } from '../data/clubEvents';
import { Calendar, Users, Sparkles, ArrowRight, ShieldCheck, Heart, Snowflake, Camera, Trophy, Bell } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openLevelFinder } = useLevelFinder();

  return (
    <div className="bg-white">
      
      {/* Cinematic Full-Bleed Hero Section */}
      <section className="relative min-h-[620px] sm:min-h-[700px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-freeskiers-navy">
        {/* Full-bleed background image with dramatic lighting */}
        <div className="absolute inset-0">
          <img 
            src="/assets/images/hero-freeski-cinematic.jpg" 
            alt="IK Lidingö Freeskiers i Ekholmsnäsbacken" 
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          {/* Multi-layered gradient overlay for contrast, depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy via-transparent to-black/40" />
          <div className="absolute inset-0 bg-freeskiers-navy/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-freeskiers-cyan/30 border border-freeskiers-lightcyan/40 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-soft">
              <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
              <span>Sveriges största friåkningsklubb i Ekholmsnäsbacken</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
              Lidingö <span className="text-freeskiers-lightcyan">Freeskiers</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 mt-3 drop-shadow">
              100% Skidglädje & Gemenskap för barn och unga
            </p>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow">
              Från de allra första svängarna i barnbacken till feta hopp, rails och friåkning. Skidklubb och helgskidskola där alla utvecklas i sin egen takt – helt utan prestationshets.
            </p>

            {/* Action Buttons: Skidklubb first, then Helgskidskola, then Skidtest */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to="/skidklubb"
                className="inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-7 py-4 rounded-full font-bold text-base shadow-elevated hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Freeskiers Skidklubb</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/helgskidskola"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-7 py-4 rounded-full font-bold text-base transition-all transform hover:-translate-y-0.5"
              >
                <span>Boka Helgskidskola</span>
              </Link>
              <button
                onClick={openLevelFinder}
                className="inline-flex items-center gap-2 bg-freeskiers-lightcyan/20 hover:bg-freeskiers-lightcyan/30 text-white border border-freeskiers-lightcyan/40 backdrop-blur-md px-6 py-4 rounded-full font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
                title="Gör ett snabbt test för att se vilken nivå och grupp som passar"
              >
                <Sparkles className="w-4 h-4 text-freeskiers-lightcyan" />
                <span>Hitta rätt nivå (skidtest)</span>
              </button>
            </div>

            {/* Floating stats & highlights strip */}
            <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-black text-freeskiers-lightcyan">500+</span>
                <span className="text-xs text-slate-300 font-medium">Aktiva unga åkare</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-black text-white">2001</span>
                <span className="text-xs text-slate-300 font-medium">Etablerad i Ekholmsnäs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-black text-freeskiers-lightcyan">6–18 år</span>
                <span className="text-xs text-slate-300 font-medium">Från barn till junior</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-black text-white">0%</span>
                <span className="text-xs text-slate-300 font-medium">Tävlingshets – ren glädje</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Backstatus Bar */}
      <SlopeStatus />

      {/* Season Alert Banner */}
      <div className="bg-sky-50/70 border-b border-sky-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-freeskiers-cyan text-white flex items-center justify-center shrink-0 shadow-soft">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base text-freeskiers-navy">
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
              <span>Se tider & grupper</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Activities Grid Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
              Vår Verksamhet på Snö & Barmark
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-freeskiers-navy tracking-tight mt-2">
              Hitta din skidupplevelse
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Oavsett om du tar dina första svängar eller vill sätta säsongens fetaste tricks i parken finns det en plats för dig hos Lidingö Freeskiers.
            </p>
          </div>

          {/* 4 Rich Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* 1. Skidklubb (Prioriterad först) */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/images/freestyle-jump.jpg" 
                  alt="Freeskiers Skidklubb" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-freeskiers-navy text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Vardagskvällar
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-freeskiers-navy mb-2">
                    Freeskiers Skidklubb
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    Träna regelbunden friåkning, hopp, rails, carving och park under vinterns vardagskvällar i Ekholmsnäsbacken.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/skidklubb"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm shadow-soft transition-all"
                  >
                    <span>Till skidklubben</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Helgskidskola */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/images/skidskola-hero-day.jpg" 
                  alt="Freeskiers Helgskidskola" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-freeskiers-cyan text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Helger • Jan–Feb
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-freeskiers-navy mb-2">
                    Helgskidskola
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    5 helgtillfällen i januari och februari. Grön, blå och röd nivå för barn från 5 år med utbildade instruktörer.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/helgskidskola"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm shadow-soft transition-all"
                  >
                    <span>Läs mer & Anmäl</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Höstsäsong & Barmark */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/images/park-rails.jpg" 
                  alt="Höstsäsong & Barmarksträning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Okt – Dec
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-freeskiers-navy mb-2">
                    Höstsäsong & Barmark
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    Bygg grundstyrka och luftkänsla med trampolinträning, barmark och Höstlovsläger innan snön lägger sig.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/hostsasong"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Se höstprogram</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Privatlektion & Tränare */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/images/privatlektion-coach.jpg" 
                  alt="Privatlektion och Tränare" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-freeskiers-cyan text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  1-på-1 & Coach
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-freeskiers-navy mb-2">
                    Privatlektion & Tränare
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    Få personlig instruktör i backen eller gå klubbens ledarutbildning efter årskurs 9 och bli tränare.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/privatlektion"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Boka / Bli tränare</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Embedded Level Finder / Skidtest Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-sky-50/60 via-white to-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
              Interaktiv Nivåguide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
              Vilken grupp passar ditt barn?
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Svara på 3 snabba frågor så guidar vi dig till rätt nivå och träning i Ekholmsnäsbacken!
            </p>
          </div>

          <LevelFinder />
        </div>
      </section>

      {/* Säsongskalender & Event Preview Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/10 text-freeskiers-cyan text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Säsongen 2026/2027</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight">
                Klubbens Kalender & Event
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
                Håll koll på anmälningsdatum, klubbkvällar, tävlingar och läger i Ekholmsnäsbacken.
              </p>
            </div>

            <Link
              to="/kalender"
              className="inline-flex items-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-soft transition-all self-start md:self-auto"
            >
              <span>Öppna hela kalendervyn</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Events in Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {clubEvents.slice(0, 3).map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-freeskiers-cyan/20 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-freeskiers-cyan uppercase leading-none">{event.month}</span>
                      <span className="text-xl font-black text-freeskiers-navy leading-none mt-0.5">{event.day}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${event.categoryColor}`}>
                      {event.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-freeskiers-navy mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {event.time}
                  </span>
                  <Link 
                    to="/kalender"
                    className="text-xs font-bold text-freeskiers-cyan hover:underline flex items-center gap-1"
                  >
                    <span>I kalendern</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

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

      {/* Full-Width Edge-to-Edge Action Photo Gallery */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
            <Camera className="w-4 h-4" />
            <span>Glimtar från backen</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Livet, farten och gemenskapen i Freeskiers
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Varje vecka fylls Ekholmsnäsbacken av skidglädje, skratt, framsteg och grym gemenskap. Här är några ögonblick från vår vardag.
          </p>
        </div>

        {/* 5 Edge-to-Edge Panoramic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 px-2 sm:px-4">
          
          <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-md">
            <img 
              src="/assets/images/skidskola-hero-day.jpg" 
              alt="Skidglädje i barnbacken" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">Helgskidskola</span>
              <h4 className="text-base font-extrabold text-white mt-1">Glädje & high fives</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">Trygga instruktörer och massor av skratt</p>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-md">
            <img 
              src="/assets/images/freestyle-jump.jpg" 
              alt="Hopp och parkåkning" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">Snowparken</span>
              <h4 className="text-base font-extrabold text-white mt-1">Hopp & Big Air</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">Träna på kickers, grabbar och luftkänsla</p>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-md">
            <img 
              src="/assets/images/freeski-powder-hero.jpg" 
              alt="Carving i stora backen" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">Skidklubben</span>
              <h4 className="text-base font-extrabold text-white mt-1">Snabba svängar</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">Carving och friåkning med tränare</p>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-md">
            <img 
              src="/assets/images/privatlektion-coach.jpg" 
              alt="Unga tränare och ledare" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">Ledarskap</span>
              <h4 className="text-base font-extrabold text-white mt-1">Klubbens tränarteam</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">Ungdomar som vuxit upp i föreningen</p>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-md sm:col-span-2 lg:col-span-1">
            <img 
              src="/assets/images/ekholmsnas-sunset.jpg" 
              alt="Kvällsåkning i elljus" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-freeskiers-lightcyan uppercase tracking-wider">Ekholmsnäs</span>
              <h4 className="text-base font-extrabold text-white mt-1">Magiska kvällar</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">Upplyst backe och solnedgång över Lidingö</p>
            </div>
          </div>

        </div>
      </section>

      {/* Community Values Grid */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-freeskiers-lightgray p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/10 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-lg text-freeskiers-navy mb-2">Ingen tävlingshets</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hos oss fokuserar vi på rörelseglädje, gemenskap och att ha roligt på snö. Alla är välkomna oavsett förkunskaper.
              </p>
            </div>
            <div className="bg-freeskiers-lightgray p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/10 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-lg text-freeskiers-navy mb-2">Unga ledare & förebilder</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Klubbens tränare är äldre ungdomar och åkare som själva vuxit upp i föreningen. Tryggt, inspirerande och roligt!
              </p>
            </div>
            <div className="bg-freeskiers-lightgray p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
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

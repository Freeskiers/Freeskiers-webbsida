import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

export const HosasongPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/park-rails.jpg" 
            alt="Freeskiers Höstsäsong och barmark" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/80 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Höstsäsong</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-freeskiers-lightcyan/40">
            <Sun className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Förberedelse inför vintern</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Freeskiers Höstsäsong
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Bygg upp styrka, balans, koordination och självförtroende i luften innan snön faller! Under hösten kör vi barmarksträning, studsmatta och gymnastik med klubbens tränare.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">Studsmatta & Luftkoll</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Träna rotationer, grabs och kroppskontroll i luften under trygga former på studsmatta innan du testar dem på snö.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">Styrka & Rörlighet</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Freeski kräver explosivitet och stabilitet. Vi bygger benstyrka, bålstabilitet och balans som förebygger skador.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">Gemenskap</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Träffa gamla och nya skidkompisar redan under hösten så att gänget är sammansvetsat när backen väl öppnar!
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="bg-freeskiers-lightgray rounded-3xl p-8 sm:p-12 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-freeskiers-navy">Vill du veta mer om höstträningen?</h3>
            <p className="text-sm text-slate-600 mt-1">Information om höstens grupper och tider skickas ut i slutet av sommaren.</p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all shrink-0"
          >
            <span>Kontakta oss för intresse</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
      </div>
    </div>
  );
};

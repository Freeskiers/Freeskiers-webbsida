import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

export const HosasongPage: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-cyan uppercase tracking-wider mb-4">
          <Link to="/" className="hover:underline">Hem</Link>
          <span>/</span>
          <span>Höstsäsong</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/10 text-freeskiers-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Sun className="w-3.5 h-3.5" />
            <span>Förberedelse inför vintern</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-freeskiers-navy tracking-tight">
            Freeskiers Höstsäsong
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Bygg upp styrka, balans, koordination och självförtroende i luften innan snön faller! Under hösten kör vi barmarksträning, studsmatta och gymnastik med klubbens tränare.
          </p>
        </div>

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
  );
};

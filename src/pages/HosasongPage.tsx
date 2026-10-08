import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, CheckCircle2, ArrowRight, Zap, Target, MapPin, Calendar, Clock, Star } from 'lucide-react';
import { SLOPE_MAP_URL, departmentEmails } from '../data/clubData';

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
            Bygg upp styrka, balans, koordination och självförtroende i luften innan snön faller! Under hösten kör vi barmarksträning vid Stockby och studsmatta i Vikingahallen med klubbens tränare.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Förtur Banner */}
          <div className="mb-12 p-6 rounded-3xl bg-sky-50 border border-sky-100 flex items-start gap-4">
            <Star className="w-6 h-6 text-freeskiers-cyan shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-freeskiers-navy text-base">Förtur till Skidklubben</h3>
              <p className="text-sm text-slate-700 mt-1">
                Den som deltar i Freeskiers höstträning har förtur till platserna i Freeskiers Skidklubb inför vintersäsongen!
              </p>
            </div>
          </div>

          {/* Barmark & Trampolin Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            
            {/* Barmarksträning */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">Onsdagar kl. 18.30–19.30</span>
                <h3 className="text-2xl font-black text-freeskiers-navy mt-1 mb-3">Barmarksträning i Stockby</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Tillsammans skapar vi de bästa förutsättningarna inför säsongspremiären! Varje onsdag fram till december tränar barn och vuxna tillsammans vid Stockby motionsgård. Lekfullt, roligt och med mycket fokus på skidåkarmuskler, spänst och bålstyrka.
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-freeskiers-cyan" />
                    <span>Samling vid Gula huset / Stockby motionsgård</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-freeskiers-cyan" />
                    <span>Onsdagar 18.30 – 19.30 (oavsett väder)</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-freeskiers-navy">Pris: 795 kr</span>
                <span className="text-xs text-slate-500">Inkl. barmark & trampolin</span>
              </div>
            </div>

            {/* Trampolinträning */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">Studsmatta i Vikingahallen</span>
                <h3 className="text-2xl font-black text-freeskiers-navy mt-1 mb-3">Trampolin & Luftkontroll</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Träna rotationer, grabs och kroppskontroll i luften under trygga former på studsmatta innan du testar dem på snö. Våra tränare är utbildade i hoppteknik och hjälper dig att utvecklas säkert.
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-freeskiers-cyan" />
                    <span>Grupp 1 (åk 1–4): kl. 18.00 – 19.30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-freeskiers-cyan" />
                    <span>Grupp 2 (åk 5–9): kl. 19.30 – 21.00</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-freeskiers-navy">Endast trampolin: 600 kr</span>
                <span className="text-xs text-slate-500">GT Vikingarna</span>
              </div>
            </div>

          </div>

          {/* 3 Nyckelområden */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-freeskiers-navy mb-2">Luftkontroll</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lära sig orientera sig i luften, säkra landningar och rotationer som ger trygghet i parken.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-freeskiers-navy mb-2">Skidstyrka & Balans</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bygg benmuskler och bålstabilitet som orkar en heldag i backen och minskar risken för skador.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-freeskiers-navy mb-2">Klubbgemenskap</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Träffa tränare och skidkompisar redan under hösten så att alla känner sig trygga när snön kommer!
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-freeskiers-lightgray rounded-3xl p-8 sm:p-12 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-freeskiers-navy">Frågor om höstträningen?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Kontakta vår höstsäsongs-koordinator direkt på <a href={`mailto:${departmentEmails.hostsasong}`} className="font-bold text-freeskiers-cyan hover:underline">{departmentEmails.hostsasong}</a>.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all shrink-0"
            >
              <span>Gå till kontaktsidan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

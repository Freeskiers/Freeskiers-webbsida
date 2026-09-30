import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export const PrivatlektionPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/privatlektion-coach.jpg" 
            alt="Privatlektion på skidor med coach" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/80 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Privatlektion</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-freeskiers-lightcyan/40">
            <UserCheck className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Individuell coachning</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Privatlektioner på skidor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Vill du få personlig coachning och ta stora kliv på kort tid? Våra certifierade instruktörer erbjuder privatlektioner för både nybörjare som vill hitta balansen och erfarna åkare som vill slipa på specifika trick eller carvingsvängar.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
            <h3 className="text-xl font-extrabold text-freeskiers-navy mb-4">Vad vi kan träna på</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span><strong>Grundteknik:</strong> Trygghet, bromsteknik och fina plog- eller parallellsvängar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span><strong>Carving:</strong> Skärande svängar med ren kantkontroll och högre fart.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                <span><strong>Park & Freestyle:</strong> Hopp, 180s, 360s, boxar, rails och switch-åkning (baklänges).</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-4">Hur du bokar</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Alla privatlektioner bokas direkt med respektive tränare via deras individuella bokningskalender. Gå in under "Om oss" för att läsa mer om våra instruktörer och se deras lediga tider i Ekholmsnäsbacken!
              </p>
            </div>
            <Link
              to="/om-oss"
              className="inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-soft transition-all"
            >
              <span>Välj tränare & Se tider</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

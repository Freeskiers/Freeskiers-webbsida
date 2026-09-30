import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export const PrivatlektionPage: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-cyan uppercase tracking-wider mb-4">
          <Link to="/" className="hover:underline">Hem</Link>
          <span>/</span>
          <span>Privatlektion</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/10 text-freeskiers-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Individuell coachning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-freeskiers-navy tracking-tight">
            Privatlektioner på skidor
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Vill du få personlig coachning och ta stora kliv på kort tid? Våra certifierade instruktörer erbjuder privatlektioner för både nybörjare som vill hitta balansen och erfarna åkare som vill slipa på specifika trick eller carvingsvängar.
          </p>
        </div>

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
  );
};

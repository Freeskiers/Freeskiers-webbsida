import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export const SkidklubbPage: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-cyan uppercase tracking-wider mb-4">
          <Link to="/" className="hover:underline">Hem</Link>
          <span>/</span>
          <span>Skidklubb</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-navy/10 text-freeskiers-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Regelbunden Träning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-freeskiers-navy tracking-tight">
            Freeskiers Skidklubb
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            För barn och unga som vill träna regelbunden friåkning och freestyle under vintersäsongen. Vi kör vardagskvällar i Ekholmsnäsbacken med fokus på hopp, rails, allsidig skidteknik och stark gemenskap.
          </p>
        </div>

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
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold text-freeskiers-cyan hover:underline"
            >
              <span>Osäker på nivån? Fråga Ekis i FAQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

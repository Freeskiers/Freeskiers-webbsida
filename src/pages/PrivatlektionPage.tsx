import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Users, CheckCircle2, TicketCheck, PackageCheck, MapPin, ExternalLink, Mail } from 'lucide-react';
import { AgendoBooking } from '../components/AgendoBooking';
import { privatlektionData, EQUIPMENT_RENTAL_URL, SLOPE_MAP_URL, departmentEmails } from '../data/clubData';

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
            {privatlektionData.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AgendoBooking label="Boka privatlektion online" />
          </div>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Upplägg och innehåll */}
          <section className="mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-freeskiers-cyan">Upplägg & Innehåll</span>
            <h2 className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">Personlig träning utifrån dina mål</h2>
            <div className="mt-4 grid gap-6 text-base text-slate-700 leading-relaxed sm:grid-cols-2">
              <p>{privatlektionData.format}</p>
              <p>{privatlektionData.audience}</p>
            </div>
          </section>

          {/* Vad vi kan träna på */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-freeskiers-navy mb-2">Grundteknik & Trygghet</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trygghet i liften och backen, bromsteknik samt kontrollerade plog- eller parallellsvängar.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-freeskiers-navy mb-2">Carving & Fartkontroll</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Skärande svängar med ren kantkontroll, dynamisk skidposition och mer fartkänsla.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-freeskiers-navy mb-2">Park & Freestyle</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hoppteknik, grabs, 180s, 360s, boxar, rails samt trygg baklängesåkning (switch).
              </p>
            </div>
          </div>

          {/* Priser och minimikrav */}
          <section className="border-y border-slate-200 py-12 mb-14">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-freeskiers-cyan" />
              <h2 className="text-2xl sm:text-3xl font-black text-freeskiers-navy">Priser</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {privatlektionData.prices.map((price) => (
                <div key={price.people} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">{price.people}</span>
                    <p className="mt-2 text-4xl font-black text-freeskiers-navy">{price.price}</p>
                    <p className="mt-1 text-sm text-slate-500">{price.duration}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Tillfälligt liftkort ingår</span>
                    <AgendoBooking label="Boka denna tid" className="py-2.5 px-5 text-sm" />
                  </div>
                </div>
              ))}
            </div>

            {/* Minimikrav för två personer */}
            <div className="mt-8 rounded-3xl bg-sky-50 border border-sky-100 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-freeskiers-navy">Minimikrav för två personer</h3>
              <p className="mt-2 text-sm text-slate-700">{privatlektionData.pairRequirement.intro}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                {privatlektionData.pairRequirement.items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Inför lektionen */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-freeskiers-navy mb-8">Inför din privatlektion</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {privatlektionData.practical.map((item, idx) => (
                <article key={item.title} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
                  {idx === 0 && <TicketCheck className="w-7 h-7 text-freeskiers-cyan mb-3" />}
                  {idx === 1 && <PackageCheck className="w-7 h-7 text-freeskiers-cyan mb-3" />}
                  {idx === 2 && <MapPin className="w-7 h-7 text-freeskiers-cyan mb-3" />}
                  <h3 className="text-lg font-bold text-freeskiers-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Hyra utrustning & hitta till backen */}
          <section className="grid gap-8 border-t border-slate-200 pt-12 md:grid-cols-2 mb-14">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-freeskiers-navy">Hyra utrustning</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Skidor, pjäxor, stavar och hjälmar finns att hyra i Ekholmsnäsbackens skiduthyrning precis bredvid liften. Boka gärna i förväg under helger.
              </p>
              <a 
                href={EQUIPMENT_RENTAL_URL} 
                target="_blank" 
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-freeskiers-cyan hover:underline"
              >
                <span>Se uthyrning och priser i Ekholmsnäs</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-freeskiers-navy">Hitta till backen</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Privatlektionerna hålls i Ekholmsnäsbacken på Lidingö. Samling sker vid skiduthyrningen i god tid innan lektionen startar.
              </p>
              <a 
                href={SLOPE_MAP_URL} 
                target="_blank" 
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-freeskiers-cyan hover:underline"
              >
                <span>Öppna vägbeskrivning i Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* Frågor och direktkontakt */}
          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-freeskiers-navy">Har du särskilda önskemål eller frågor?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Kontakta vår tränaransvarige direkt via mejl så hjälper vi dig att sy ihop ett upplägg.
              </p>
            </div>
            <a
              href={`mailto:${departmentEmails.privatlektioner}`}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-freeskiers-navy font-bold text-sm px-6 py-3 rounded-full hover:bg-slate-100 transition-colors shadow-sm shrink-0"
            >
              <Mail className="w-4 h-4 text-freeskiers-cyan" />
              <span>{departmentEmails.privatlektioner}</span>
            </a>
          </section>

          {/* Direktbokning CTA Banner */}
          <section className="rounded-3xl bg-gradient-to-r from-freeskiers-navy to-slate-900 p-8 sm:p-12 text-white shadow-elevated">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Boka din privatlektion direkt online</h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Välj en ledig tid i kalendern och slutför bokningen smidigt i vår officiella bokningspanel.
            </p>
            <div className="mt-6">
              <AgendoBooking label="Öppna bokningspanelen" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

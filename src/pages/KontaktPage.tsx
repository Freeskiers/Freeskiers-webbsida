import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ChevronDown, Send, CheckCircle2, ShieldCheck, HeartHandshake, Snowflake, ArrowRight } from 'lucide-react';

interface DepartmentEmail {
  id: string;
  name: string;
  email: string;
  shortDesc: string;
  focus: string;
}

const departmentEmails: DepartmentEmail[] = [
  {
    id: 'admin',
    name: 'Admin & Styrelse',
    email: 'admin@lidingofreeskiers.se',
    shortDesc: 'Föreningsfrågor, ekonomi, avgifter & sponsring',
    focus: 'Övergripande föreningsfrågor, medlemsregister, fakturor och partnerskap.'
  },
  {
    id: 'helg',
    name: 'Helgskidskolan',
    email: 'helg@lidingofreeskiers.se',
    shortDesc: 'Helgskidskola (januari–februari)',
    focus: 'Gruppindelning (Grön, Blå, Röd), lektionstider, anmälan och närvaro i helgskidskolan.'
  },
  {
    id: 'skidklubb',
    name: 'Freeskiers Skidklubb',
    email: 'skidklubb@lidingofreeskiers.se',
    shortDesc: 'Vardagsträning, park & friåkning',
    focus: 'Träningsgrupper på vardagskvällar, åkarnivåer, parkträning och ledare.'
  },
  {
    id: 'privatlektioner',
    name: 'Privatlektioner',
    email: 'privatlektioner@lidingofreeskiers.se',
    shortDesc: 'Individuell coachning & teknikpass',
    focus: 'Förfrågningar om privatlektioner i Ekholmsnäsbacken med klubbens tränare.'
  }
];

export const KontaktPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactSent, setContactSent] = useState(false);
  const [selectedDeptEmail, setSelectedDeptEmail] = useState<string>('admin@lidingofreeskiers.se');
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });

  const faqs = [
    {
      q: 'Vilken utrustning behöver mitt barn ha med sig?',
      a: 'Godkänd hjälm och ryggskydd är ett absolut krav för alla deltagare i både skidskola och skidklubb. Skidorna ska ha fungerande bindningar inställda efter barnets längd och vikt. Stavar rekommenderas först från fortsättningsnivå.'
    },
    {
      q: 'Ingår liftkort i deltagaravgiften?',
      a: 'Nej, liftkort ingår inte i avgiften för skidskolan/skidklubben. Liftkort köps separat direkt via Ekholmsnäsbackens biljettkassa eller på deras webbplats.'
    },
    {
      q: 'Hur fungerar statliga Fritidskortet hos er?',
      a: 'IK Lidingö Freeskiers är anslutna till Riksidrottsförbundet och godkänd förening för Fritidskortet. Du kan använda ditt barns fritidskortsaldo för att betala hela eller delar av deltagar- och medlemsavgiften.'
    },
    {
      q: 'Är mitt barn försäkrat under träningarna?',
      a: 'Ja! Alla deltagare med erlagd medlemsavgift är olycksfallsförsäkrade genom Svenska Skidförbundets gemensamma medlemsförsäkring hos Folksam under klubbens organiserade träningar och resor.'
    },
    {
      q: 'Vad händer om det är för lite snö i Ekholmsnäsbacken?',
      a: 'Ekholmsnäsbacken har ett effektivt snökanonsystem och öppnar så fort kylan tillåter. Skulle snön dröja till säsongsstarten flyttas träningarna framåt eller ersätts med andra datum under säsongen.'
    },
    {
      q: 'Kan man få pengar tillbaka om barnet blir sjukt eller skadat?',
      a: 'Enligt klubbens avboknings- och återbetalningsregler utgår tyvärr ingen återbetalning vid skada, sjukdom eller missade tillfällen, då tränare och backtider bokas och bekostas i förväg för hela säsongen.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const selectedDepartment = departmentEmails.find(d => d.email === selectedDeptEmail) || departmentEmails[0];

  return (
    <div className="bg-white">
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/ekholmsnas-sunset.jpg" 
            alt="Ekholmsnäsbacken solnedgång" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/80 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Kontakt & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Kontakt & Vanliga frågor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Här når du rätt person i klubben direkt. Välj ärende nedan för att kontakta admin, helgskidskolan, skidklubben eller tränarna för privatlektioner.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Department Email Overview Directory (4 Cards) */}
          <div className="mb-14">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                Direktkontakt med Föreningen
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
                Klubbens Funktionsadresser
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Skicka e-post direkt till den funktion ditt ärende gäller så svarar vi snabbare!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentEmails.map((dept) => (
                <div 
                  key={dept.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-freeskiers-cyan/30 flex items-center justify-center text-freeskiers-cyan mb-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-lg text-freeskiers-navy mb-1">{dept.name}</h3>
                    <div className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider mb-2">
                      {dept.shortDesc}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {dept.focus}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a 
                      href={`mailto:${dept.email}`}
                      className="font-bold text-xs sm:text-sm text-freeskiers-navy hover:text-freeskiers-cyan flex items-center gap-1.5 transition-colors"
                      title={`Mejla ${dept.email}`}
                    >
                      <span className="truncate">{dept.email}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column: FAQ Accordion Left & Contact Form with Dropdown Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
            
            {/* FAQ Accordion (7 cols) */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-extrabold text-freeskiers-navy mb-6">
                Vanliga frågor och svar (FAQ)
              </h2>
              
              <div className="space-y-3.5">
                {faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div 
                      key={i} 
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-freeskiers-navy hover:text-freeskiers-cyan transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-freeskiers-cyan shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Fritidskortet / Försäkring callout */}
              <div id="fritidskortet" className="mt-8 p-6 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3.5">
                <ShieldCheck className="w-6 h-6 text-freeskiers-cyan shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-freeskiers-navy font-bold block mb-1">
                    Statliga Fritidskortet & Medlemsförsäkring
                  </strong>
                  IK Lidingö Freeskiers är en auktoriserad förening i Svenska Skidförbundet och RF. Du kan nyttja ditt barns fritidskort för deltagaravgiften och alla deltagare är olycksfallsförsäkrade i Folksam.
                </div>
              </div>
            </div>

            {/* Contact form with Dropdown for Email Destination (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-freeskiers-lightgray rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-card">
                <h3 className="text-xl font-extrabold text-freeskiers-navy mb-1">
                  Skicka meddelande
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Välj avdelning i rullgardinsmenyn så går ditt meddelande direkt till rätt ansvarig.
                </p>

                {contactSent ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center animate-in fade-in duration-300">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <div className="font-bold text-base">Tack för ditt meddelande!</div>
                    <p className="text-xs text-emerald-700 mt-1">
                      Ditt meddelande har skickats till <strong>{selectedDeptEmail}</strong>. Vi återkommer normalt inom 1–2 vardagar.
                    </p>
                    <button
                      onClick={() => setContactSent(false)}
                      className="mt-4 text-xs font-bold text-freeskiers-cyan underline"
                    >
                      Skicka ett till meddelande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    
                    {/* DROPDOWN SELECTOR: Admin@, Helg@, Skidklubb@, Privatlektioner@ */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Vem vill du kontakta? (Mottagare) *
                      </label>
                      <select
                        value={selectedDeptEmail}
                        onChange={(e) => setSelectedDeptEmail(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-bold text-freeskiers-navy shadow-xs cursor-pointer"
                      >
                        {departmentEmails.map((dept) => (
                          <option key={dept.email} value={dept.email}>
                            {dept.email} – {dept.name}
                          </option>
                        ))}
                      </select>
                      <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100 text-[11px] text-slate-600 flex items-center justify-between">
                        <span>Mottagare: <strong className="text-freeskiers-cyan">{selectedDeptEmail}</strong></span>
                        <span className="text-slate-400">({selectedDepartment.name})</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ditt namn *</label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                        placeholder="För- och efternamn"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">E-postadress *</label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({...contactData, email: e.target.value})}
                          placeholder="namn@epost.se"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Telefonnummer</label>
                        <input
                          type="tel"
                          value={contactData.phone}
                          onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                          placeholder="070-123 45 67"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Meddelande *</label>
                      <textarea
                        rows={4}
                        required
                        value={contactData.message}
                        onChange={(e) => setContactData({...contactData, message: e.target.value})}
                        placeholder={`Skriv ditt meddelande till ${selectedDepartment.name}...`}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Skicka meddelande till {selectedDeptEmail}</span>
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-freeskiers-navy">Träningsbacke & Samlingsplats</div>
                      <span>Ekholmsnäsbacken, 181 41 Lidingö</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

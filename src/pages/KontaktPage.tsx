import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ChevronDown, Send, CheckCircle2, ShieldCheck, HeartHandshake, Snowflake } from 'lucide-react';

export const KontaktPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactSent, setContactSent] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

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
            Vanliga frågor & Kontakt
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Här hittar du svar på de vanligaste frågorna från föräldrar kring anmälan, utrustning, försäkring och Fritidskortet. Du kan även skicka ett meddelande direkt till oss eller fråga maskoten Ekis!
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column: FAQ Accordion Left & Contact Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-freeskiers-navy mb-6">
              Svar på vanliga frågor (FAQ)
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
                  Har du frågor om Fritidskortet eller försäkring?
                </strong>
                Alla barn och unga i Sverige kan ta del av Fritidskortet. Ange ditt barns personnummer vid betalning så hjälper vi till att administrera saldot mot klubbavgiften.
              </div>
            </div>
          </div>

          {/* Contact form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-freeskiers-lightgray rounded-3xl p-7 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-2">
                Hör av dig till oss
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fyll i formuläret så återkommer vi så snart vi kan.
              </p>

              {contactSent ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <div className="font-bold text-base">Tack för ditt meddelande!</div>
                  <p className="text-xs text-emerald-700 mt-1">Vi svarar normalt inom 1–2 vardagar.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Ditt namn</label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({...contactData, name: e.target.value})}
                      placeholder="För- och efternamn"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">E-postadress</label>
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
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Meddelande</label>
                    <textarea
                      rows={4}
                      required
                      value={contactData.message}
                      onChange={(e) => setContactData({...contactData, message: e.target.value})}
                      placeholder="Vad gäller din fråga?"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Skicka meddelande</span>
                  </button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-freeskiers-cyan shrink-0" />
                  <a href="mailto:info@lidingofreeskiers.se" className="font-semibold text-freeskiers-navy hover:underline">
                    info@lidingofreeskiers.se
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <span>Ekholmsnäsbacken, 181 41 Lidingö</span>
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

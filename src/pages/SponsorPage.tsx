import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Users, Megaphone, Trophy, Mail, CheckCircle2, Send, ArrowRight, Building2 } from 'lucide-react';

export const SponsorPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    packageInterest: 'allmänt',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const sponsorLogos = [
    { name: 'Gadelius Fastighetsbyrå', file: '/assets/partners/gadelius.png' },
    { name: 'Ekholmsnäsbacken', file: '/assets/partners/ekholmsnas.png' },
    { name: 'Alpingaraget', file: '/assets/partners/alpingaraget.png' },
    { name: 'K&NG', file: '/assets/partners/kang.png' },
    { name: 'Stockholm Bordsuthyrning', file: '/assets/partners/stockholmbordsuthyrning.png' },
  ];

  return (
    <div className="bg-white">
      
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[400px] sm:min-h-[480px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/ekholmsnas-sunset.jpg" 
            alt="Bli sponsor till IK Lidingö Freeskiers" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/85 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Bli Sponsor & Partner</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-freeskiers-lightcyan/40 shadow-soft">
            <HeartHandshake className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Stötta barn- och ungdomsidrotten på Lidingö</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl">
            Bli Sponsor & <span className="text-freeskiers-lightcyan">Samarbetspartner</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Var med och möjliggör rörelseglädje och gemenskap för över 500 skidälskande barn och unga i Ekholmsnäsbacken. Tillsammans bygger vi framtidens idrottsupplevelser utan prestationshets!
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">500+ Aktiva Familjer</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nå en attraktiv, engagerad och köpstark målgrupp av barnfamiljer på Lidingö och i Stockholmsregionen som vistas regelbundet i backen.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">Synlighet i Backen & Digitalt</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Exponering via arenabanderoller vid liften, logotyp på tränarkläder och deltagarvästar, samt digital synlighet på vår webb och i nyhetsbrev.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-freeskiers-navy mb-3">Event & Tävlingar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Koppla ert varumärke till nationella publika event såsom <strong>Rookie Series Stockholm</strong> tillsammans med Svenska Skidförbundet.
              </p>
            </div>
          </div>

          {/* Current Partners Showcase */}
          <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
              Våra Fantastiska Partners
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy mt-1 mb-8">
              Företag som gör skillnad för klubbens unga åkare
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {sponsorLogos.map((sponsor) => (
                <div key={sponsor.name} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center h-20 w-44 hover:scale-105 transition-transform">
                  <img 
                    src={sponsor.file} 
                    alt={sponsor.name} 
                    className="max-h-12 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Form & Contact Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Information & Board Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                Direktkontakt med Styrelsen
              </span>
              <h2 className="text-3xl font-extrabold text-freeskiers-navy tracking-tight">
                Vill ditt företag vara med på resan?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Vi anpassar gärna partnerskap efter era önskemål och målsättningar – oavsett om det handlar om arenareklam, utrustningsstöd, material eller eventpartnerskap.
              </p>

              <div className="p-6 rounded-2xl bg-freeskiers-lightgray border border-slate-200/90 space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-sm text-freeskiers-navy">Förening</div>
                    <div className="text-xs text-slate-600">IK Lidingö Freeskiers (Org.nr: 802412-2821)</div>
                    <div className="text-xs text-slate-500">Ekholmsnäsbacken, 181 41 Lidingö</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-sm text-freeskiers-navy">E-post till Styrelsen</div>
                    <a href="mailto:info@lidingofreeskiers.se" className="text-xs text-freeskiers-cyan font-bold hover:underline">
                      info@lidingofreeskiers.se
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-sm text-freeskiers-navy">Kontaktpersoner</div>
                    <div className="text-xs text-slate-600">Stefan Aaröe & Styrelsen i IK Lidingö Freeskiers</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 leading-relaxed">
                💡 <em>Visste du att IK Lidingö Freeskiers är en ideell förening godkänd för statliga Fritidskortet och ansluten till Svenska Skidförbundet? All sponsring går oavkortat till barnens backverksamhet och ledarutveckling.</em>
              </div>
            </div>

            {/* Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
              {formSent ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-freeskiers-navy">
                    Tack för ert intresse!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Vi i styrelsen har tagit emot era uppgifter och återkommer till er så snart som möjligt för att diskutera ett samarbete.
                  </p>
                  <button
                    onClick={() => { setFormSent(false); }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-freeskiers-cyan hover:underline pt-2"
                  >
                    <span>Skicka ett till meddelande</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-freeskiers-navy">
                    Intresseanmälan Sponsor / Samarbetspartner
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fyll i formuläret så kontaktar styrelsen er för ett personligt möte eller förslag.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Företagsnamn *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="T.ex. Företag AB" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kontaktperson *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="För- och efternamn" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-postadress *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="kontakt@foretag.se" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Telefonnummer
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="070-123 45 67" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Intresseområde
                    </label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm bg-white"
                    >
                      <option value="allmänt">Öppet förslag / Vill veta mer</option>
                      <option value="arena">Arenareklam & Banderoll i backen</option>
                      <option value="kläder">Klädsponsor (tränarjackor & åkarvästar)</option>
                      <option value="rookie">Eventpartner för Rookie Series</option>
                      <option value="annat">Annat samarbete</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Meddelande eller idéer
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Berätta gärna kort om ert företag och vad ni vill åstadkomma..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-freeskiers-cyan text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-4 px-6 rounded-full font-bold text-sm shadow-soft hover:shadow-elevated transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Skicka sponsorförfrågan till styrelsen</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

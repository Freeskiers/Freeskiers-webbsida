import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Award, ArrowRight, CheckCircle2, Send, Calendar, ShieldCheck } from 'lucide-react';

export const OmOssPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [coachForm, setCoachForm] = useState({
    name: '',
    email: '',
    phone: '',
    birthYear: '',
    experience: ''
  });

  const coaches = [
    {
      name: 'Filippa',
      role: 'Huvudtränare & Utbildare',
      specialty: 'Park, Rails & Trygghet för unga',
      desc: 'Åkt i klubben sedan barnsben. Brinner för att hjälpa barn att våga testa nya saker och ha roligt i backen.',
      bookingUrl: 'https://www.lidingofreeskiers.se/privatlektion/'
    },
    {
      name: 'Oskar',
      role: 'Skidklubbstränare',
      specialty: 'Big Air, 360s & Carving',
      desc: 'Mångårig åkare med stor passion för hoppteknik och skidkänsla. Certifierad instruktör.',
      bookingUrl: 'https://www.lidingofreeskiers.se/privatlektion/'
    },
    {
      name: 'Wilma',
      role: 'Skidskoleinstruktör',
      specialty: 'Nybörjare & Barnskidskola',
      desc: 'Expert på att få de yngsta åkarna att känna sig trygga och glada i liften och barnbacken.',
      bookingUrl: 'https://www.lidingofreeskiers.se/privatlektion/'
    },
    {
      name: 'Hugo',
      role: 'Freestyletränare',
      specialty: 'Jibbing, Boxar & Switch',
      desc: 'Kreativ skidåkare som inspirerar till rörelse och lekfullhet över hela berget.',
      bookingUrl: 'https://www.lidingofreeskiers.se/privatlektion/'
    }
  ];

  const boardMembers = [
    { name: 'Stefan Aaröe', role: 'Styrelseledamot' },
    { name: 'Styrelsen IK Lidingö Freeskiers', role: 'Ideellt engagemang för öns unga åkare' }
  ];

  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-white">
      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/coaches-group.jpg" 
            alt="Lidingö Freeskiers tränarteam" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/80 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Om oss</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-freeskiers-lightcyan/40">
            <Heart className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Vår Förenings själ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Om Lidingö Freeskiers
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            IK Lidingö Freeskiers grundades 2001 och har vuxit till att bli Sveriges största friåkningsklubb för barn och unga. Vår idé är enkel: vi vill ge alla chansen att uppleva samma gränslösa glädje och frihet på snö som vi själva känner.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section 2: Våra Tränare */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">Klubbens Förebilder</span>
              <h2 className="text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
                Våra Tränare & Instruktörer
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md">
              Alla våra tränare är utbildade ledare som brinner för skidglädje och pedagogik. Boka gärna en privatlektion med någon av dem!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.map((coach, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between hover:shadow-elevated transition-all">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-freeskiers-cyan/20 flex items-center justify-center text-freeskiers-cyan font-bold text-2xl mb-4">
                    {coach.name.charAt(0)}
                  </div>
                  <h3 className="font-extrabold text-xl text-freeskiers-navy">{coach.name}</h3>
                  <div className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider mt-0.5 mb-2">
                    {coach.role}
                  </div>
                  <div className="text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded-lg mb-3">
                    ⭐️ {coach.specialty}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {coach.desc}
                  </p>
                </div>
                
                <a
                  href={coach.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-soft"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Boka med {coach.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Bli Tränare */}
        <div id="bli-tranare" className="bg-gradient-to-br from-slate-50 via-white to-sky-50 rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-navy/10 text-freeskiers-navy text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>För dig som gått ut nian</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-freeskiers-navy tracking-tight mb-4">
                Vill du bli tränare i Freeskiers?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Att vara tränare hos oss är ett fantastiskt extrajobb där du får sprida skidglädje till barn, utveckla ditt eget ledarskap och bli del av en sammansvetsad tränarkår.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <span>Klubben bekostar certifierad skid- eller snowboardinstruktörsutbildning.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <span>Schysst timarvode och ledartröja/klubbjacka.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-freeskiers-cyan shrink-0 mt-0.5" />
                  <span>Värdefull merit på ditt CV inför framtida jobb och studier.</span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
              <h3 className="font-extrabold text-lg text-freeskiers-navy mb-4">
                Skicka intresseanmälan som tränare
              </h3>
              
              {formSent ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <div className="font-bold text-base">Tack för din anmälan!</div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Vi hör av oss inför kommande tränarutbildning under hösten!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCoachSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Namn</label>
                    <input
                      type="text"
                      required
                      value={coachForm.name}
                      onChange={(e) => setCoachForm({...coachForm, name: e.target.value})}
                      placeholder="För- och efternamn"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">E-post</label>
                      <input
                        type="email"
                        required
                        value={coachForm.email}
                        onChange={(e) => setCoachForm({...coachForm, email: e.target.value})}
                        placeholder="din@epost.se"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Telefon</label>
                      <input
                        type="tel"
                        required
                        value={coachForm.phone}
                        onChange={(e) => setCoachForm({...coachForm, phone: e.target.value})}
                        placeholder="070-123 45 67"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Kort om din skidbakgrund</label>
                    <textarea
                      rows={3}
                      value={coachForm.experience}
                      onChange={(e) => setCoachForm({...coachForm, experience: e.target.value})}
                      placeholder="Hur länge har du åkt skidor/snowboard? Har du åkt i klubben tidigare?"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3 rounded-xl font-bold text-sm shadow-soft transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Skicka intresseanmälan</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Section 4: Styrelsen & Föreningen */}
        <div id="styrelsen" className="bg-white border-t border-slate-200/80 pt-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy mb-4">
              Styrelsen & Föreningsdrift
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              IK Lidingö Freeskiers är en ideell idrottsförening som drivs av engagerade föräldrar och ledare. Vi verkar för att hålla skidglädjen levande på Lidingö och i Ekholmsnäsbacken.
            </p>
            <div className="p-4 rounded-2xl bg-freeskiers-lightgray border border-slate-200/80 text-sm text-slate-700">
              Vill du engagera dig som förälder eller har idéer kring klubbens utveckling? Hör gärna av dig till styrelsen via <a href="mailto:info@lidingofreeskiers.se" className="text-freeskiers-cyan font-bold hover:underline">info@lidingofreeskiers.se</a>.
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

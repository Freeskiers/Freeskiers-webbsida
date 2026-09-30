import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const partners = [
    { name: 'Ekholmsnäsbacken', desc: 'Hemmabacke & Lift' },
    { name: 'Gadelius Fastighetsbyrå', desc: 'Huvudpartner' },
    { name: 'Alpingaraget', desc: 'Utrustning & Skidvård' },
    { name: 'Kang Poles', desc: 'Stavar & Åkglädje' },
    { name: 'Lidingö Centrum', desc: 'Lokal samverkanspartner' },
    { name: 'Stockholm Bordsuthyrning', desc: 'Eventpartner' }
  ];

  return (
    <footer className="bg-freeskiers-navy text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Partner Section */}
        <div className="mb-14 pb-12 border-b border-slate-700/60">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-freeskiers-lightcyan mb-8">
            Stolta Samarbetspartners & Vänner
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center">
            {partners.map((partner, i) => (
              <div 
                key={i} 
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="font-bold text-sm text-white tracking-tight">{partner.name}</div>
                <div className="text-[11px] text-freeskiers-lightcyan font-medium mt-0.5">{partner.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Club Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/logo/freeskiers-logo-white.svg" 
                alt="Freeskiers" 
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback if white svg fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-extrabold text-lg tracking-tight">Lidingö Freeskiers</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Sveriges största friåkningsklubb för barn och unga. Vi skapar rörelseglädje, gemenskap och trygghet på snö i Ekholmsnäsbacken.
            </p>
            <div className="flex items-center gap-3 text-slate-300">
              <a 
                href="https://www.instagram.com/lidingofreeskiers/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-freeskiers-cyan flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/freeskierslidingo/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-freeskiers-cyan flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-freeskiers-lightcyan mb-4">
              Verksamhet
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/helgskidskola" className="hover:text-white transition-colors">Helgskidskola (jan–feb)</Link>
              </li>
              <li>
                <Link to="/skidklubb" className="hover:text-white transition-colors">Freeskiers Skidklubb</Link>
              </li>
              <li>
                <Link to="/hostsasong" className="hover:text-white transition-colors">Höstträning (barmark & studsmatta)</Link>
              </li>
              <li>
                <Link to="/privatlektion" className="hover:text-white transition-colors">Privatlektioner</Link>
              </li>
              <li>
                <Link to="/om-oss" className="hover:text-white transition-colors">Bli tränare (ungdomsledare)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Sport & Membership */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-freeskiers-lightcyan mb-4">
              Trygghet & Klubbinfo
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/kontakt" className="hover:text-white transition-colors">Vanliga frågor (FAQ & Ekis)</Link>
              </li>
              <li>
                <Link to="/kontakt#fritidskortet" className="hover:text-white transition-colors">Fritidskortet</Link>
              </li>
              <li>
                <Link to="/kontakt#forsakring" className="hover:text-white transition-colors">Försäkring (Skidförbundet)</Link>
              </li>
              <li>
                <Link to="/kontakt#avbokning" className="hover:text-white transition-colors">Snöpolicy & Avbokning</Link>
              </li>
              <li>
                <Link to="/om-oss#styrelsen" className="hover:text-white transition-colors">Styrelsen & Föreningen</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hemmabacke & Kontakt */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-freeskiers-lightcyan mb-4">
              Hemmabacke
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-freeskiers-lightcyan shrink-0 mt-0.5" />
                <span>Ekholmsnäsbacken<br />Ekholmsnäsvägen 85, 181 41 Lidingö</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-freeskiers-lightcyan shrink-0" />
                <a href="mailto:info@lidingofreeskiers.se" className="hover:text-white transition-colors">
                  info@lidingofreeskiers.se
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Medlem i Svenska Skidförbundet & RF</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} IK Lidingö Freeskiers. Ideell förening.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Byggd med åkglädje för barn & unga</span>
            <Heart className="w-3.5 h-3.5 text-freeskiers-lightcyan inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};

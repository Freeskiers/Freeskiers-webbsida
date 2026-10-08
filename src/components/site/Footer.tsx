import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { useLevelFinder } from "@/components/site/LevelFinder";

import logo from "@/assets/freeskiers-logo-2024-white.png.asset.json";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  partners,
  SLOPE_ADDRESS,
} from "@/lib/club-data";

export function Footer() {
  const { openLevelFinder } = useLevelFinder();
  return (
    <footer className="on-dark bg-primary-deep">
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Stolta samarbetspartners &amp; vänner
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partners.map((p) => (
              <li
                key={p.name}
                className="flex h-16 w-40 items-center justify-center rounded-2xl bg-background p-3 shadow-sm sm:h-20 sm:w-48"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              to="/sponsor"
              className="inline-flex items-center rounded-full border border-accent/40 bg-primary-foreground/5 px-5 py-2.5 text-xs font-bold text-accent transition-colors hover:border-primary-foreground hover:text-primary-foreground sm:text-sm"
            >
              Vill ditt företag stötta barn &amp; unga? Bli sponsor &amp; partner →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Lidingö Freeskiers" width={1817} height={1817} className="h-20 w-20" />
            <p className="mt-4 text-sm text-accent">
              Skidglädje utan prestationsångest. Sveriges största friåkningsklubb för barn och unga,
              hemma i Ekholmsnäsbacken sedan 2001.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Instagram className="size-4" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Facebook className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Snabblänkar</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-accent">
              <li><Link to="/skidklubb" className="hover:text-primary-foreground">Skidklubb</Link></li>
              <li><Link to="/helgskidskola" className="hover:text-primary-foreground">Helgskidskola</Link></li>
              <li><Link to="/kalender" className="font-semibold hover:text-primary-foreground">Säsongskalender &amp; Event</Link></li>
              <li><Link to="/rookie-series" className="hover:text-primary-foreground">Rookie Series</Link></li>
              <li><Link to="/hostsasong" className="hover:text-primary-foreground">Höstsäsong</Link></li>
              <li><Link to="/privatlektion" className="hover:text-primary-foreground">Privatlektion</Link></li>
              <li><Link to="/om-oss" className="hover:text-primary-foreground">Om oss</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary-foreground">Kontakt & FAQ</Link></li>
              <li><Link to="/om-oss" hash="bli-tranare" className="hover:text-primary-foreground">Bli tränare</Link></li>
              <li><Link to="/sponsor" className="font-bold hover:text-primary-foreground">Bli sponsor</Link></li>
              <li className="col-span-2 pt-1">
                <button type="button" onClick={openLevelFinder} className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-primary-foreground">
                  <Sparkles className="size-3.5" /> Hitta rätt nivå (skidtest)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Hemmabacke & kontakt</h3>
            <ul className="mt-4 space-y-3 text-sm text-accent">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <a href="https://maps.app.goo.gl/m3gQEfDvu73twtnh8" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">Ekholmsnäsbacken<br />{SLOPE_ADDRESS}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href="mailto:admin@lidingofreeskiers.se" className="hover:text-primary-foreground">admin@lidingofreeskiers.se</a>
              </li>
              <li className="flex gap-2 pt-1 text-xs text-accent/80">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                <span>Medlem i Svenska Skidförbundet &amp; Riksidrottsförbundet</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs text-accent">
          © {new Date().getFullYear()} IK Lidingö Freeskiers · Ideell förening · Byggd med åkglädje för barn och unga
        </div>
      </div>
    </footer>
  );
}

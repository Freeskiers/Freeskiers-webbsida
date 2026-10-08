import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, CheckCircle2, HeartHandshake, MapPin, ShieldCheck, Users } from "lucide-react";

import parkPhoto from "@/assets/photos/hero-freeski-cinematic.jpg";
import jumpPhoto from "@/assets/photos/freestyle-jump.jpg";
import { LevelFinderButton } from "@/components/site/LevelFinder";
import { PageBanner } from "@/components/site/PageBanner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rookie-series")({
  head: () => ({
    meta: [
      { title: "Rookie Series Stockholm i Ekholmsnäsbacken | Lidingö Freeskiers" },
      { name: "description", content: "Svenska Skidförbundets instegstävling i slopestyle och big air för barn och unga – arrangeras av IK Lidingö Freeskiers i Ekholmsnäsbacken." },
      { property: "og:title", content: "Rookie Series Stockholm — Lidingö Freeskiers" },
      { property: "og:description", content: "Tävling på barnens villkor: jam-format, ingen utslagning och medalj till alla Kids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RookieSeries,
});

const facts = [
  { icon: MapPin, l: "Plats", v: "Ekholmsnäsbacken, Lidingö", s: "Snowparken & hoppen" },
  { icon: Calendar, l: "När", v: "Februari / Mars årligen", s: "En helg fylld av åkglädje" },
  { icon: Users, l: "Klasser", v: "Kids, Ungdom & Junior", s: "Killar & tjejer, skidor & bräda" },
  { icon: ShieldCheck, l: "Förbundssamarbete", v: "Svenska Skidförbundet", s: "Officiell nationell tour" },
];

const classes = [
  { tag: "KIDS", t: "Kids (upp till ca 10 år)", d: "För de yngsta åkarna. Fullt fokus på glädje och att våga testa. Alla deltagare får medalj och diplom från Svenska Skidförbundet!", p: "Medalj till alla deltagare" },
  { tag: "UNG", t: "Ungdom (ca 11–14 år)", d: "Lite större utmaningar på kickers och boxar. Bedömning av rotationer, grabs och rena landningar. Grym pepp mellan åkarna!", p: "Fina priser från sponsorer" },
  { tag: "JUN", t: "Junior (15–18 år)", d: "För äldre ungdomar med avancerad parkåkning. Steget vidare mot Swedish Slopestyle Tour och SM.", p: "Ranking & Tävlingslicens" },
];

function RookieSeries() {
  return (
    <>
      <PageBanner photo={jumpPhoto} alt="Rookie Series i Ekholmsnäsbacken med Svenska Skidförbundet" eyebrow="Officiellt samarbete med Svenska Skidförbundet" title="Rookie Series Stockholm">
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
          Sveriges roligaste instegstävling i Slopestyle &amp; Big Air för barn och unga! Arrangeras i Ekholmsnäsbacken av IK Lidingö Freeskiers i samarbete med Svenska Skidförbundet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="cta" size="xl" className="rounded-full" asChild>
            <a href="https://www.skidor.com" target="_blank" rel="noreferrer">Se tävlingskalendern (SSF) <ArrowRight className="size-5" /></a>
          </Button>
          <LevelFinderButton variant="onDark" label="Gör vårt skidtest" className="h-14 px-6" />
        </div>
      </PageBanner>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, l, v, s }) => (
            <div key={l} className="surface-card p-5">
              <Icon className="size-6 text-primary" />
              <dt className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{l}</dt>
              <dd className="mt-1 font-bold text-heading">{v}</dd>
              <dd className="text-xs text-muted-foreground">{s}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-4 leading-relaxed">
          <p className="text-eyebrow">Tävling på barnens villkor</p>
          <h2 className="text-3xl sm:text-4xl">Vad är Rookie Series?</h2>
          <p><strong className="text-heading">Rookie Series</strong> är Svenska Skidförbundets officiella instegstävling för unga skid- och snowboardåkare runt om i landet. Tävlingen är skapad för att sänka tröskeln till tävlingsåkning och ge alla unga åkare en positiv och stöttande första tävlingsupplevelse.</p>
          <p>Hos IK Lidingö Freeskiers i Ekholmsnäsbacken kör vi tävlingen med ett avslappnat <em>jam-format</em>. Det innebär att åkarna får åka så många åk de hinner under ett tidspass, istället för att bli utslagna efter ett enda åk.</p>
          <p>Under tävlingsdagen bjuder vi på DJ, grym stämning, grillade hamburgare i solen och ett välfyllt prisbord från klubbens samarbetspartners som <strong className="text-heading">Gadelius Fastighetsbyrå</strong> och <strong className="text-heading">Alpingaraget</strong>.</p>
          <ul className="space-y-2 text-sm font-medium">
            <li className="flex gap-2"><CheckCircle2 className="size-5 text-primary" /> Ingen utslagning – alla kör massor av åk</li>
            <li className="flex gap-2"><CheckCircle2 className="size-5 text-primary" /> Hjälm och ryggskydd obligatoriskt</li>
          </ul>
        </div>
        <figure className="surface-card relative overflow-hidden">
          <img src={parkPhoto} alt="Park och hopp i Ekholmsnäsbacken" loading="lazy" className="h-96 w-full object-cover" />
          <figcaption className="on-dark absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/90 to-transparent p-5">
            <p className="font-bold">Ekholmsnäs Snowpark</p>
            <p className="text-sm text-primary-foreground/80">Gemenskap, musik och hopp</p>
          </figcaption>
        </figure>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-eyebrow">Tävlingsklasser</p>
            <h2 className="mt-2 text-3xl">Klasser för alla åldrar</h2>
            <p className="mt-2 text-sm">Alla deltagare tävlar mot jämnåriga med anpassade bedömningskriterier där stil, glädje och kontroll belönas högst.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {classes.map((c) => (
              <article key={c.tag} className="surface-card bg-background p-6">
                <span className="rounded-full bg-primary-deep px-3 py-1 text-xs font-bold text-primary-foreground">{c.tag}</span>
                <h3 className="mt-4 text-lg">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed">{c.d}</p>
                <p className="mt-4 text-xs font-bold uppercase text-primary">{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="on-dark rounded-3xl bg-primary-deep p-8 sm:p-12">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent"><HeartHandshake className="size-4" /> Officiell förening i SSF</p>
          <h2 className="mt-3 text-2xl sm:text-3xl">IK Lidingö Freeskiers är anslutna till Svenska Skidförbundet</h2>
          <p className="mt-3 max-w-3xl text-primary-foreground/85">Som medlem i klubben ingår medlemskap i Svenska Skidförbundet och Riksidrottsförbundet. Det ger alla våra åkare officiell olycksfallsförsäkring och rätten att delta i sanktionerade tävlingar i hela landet.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="cta" className="rounded-full" asChild><Link to="/skidklubb">Träna med Skidklubben</Link></Button>
            <Button variant="onDark" className="rounded-full" asChild><Link to="/om-oss">Om föreningen</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

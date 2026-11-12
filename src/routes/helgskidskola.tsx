import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";

import { GroupContact } from "@/components/site/GroupContact";
import { GroupPage } from "@/components/site/GroupPage";
import { LevelFinder } from "@/components/site/LevelFinder";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, departmentEmail, helgskidskola2027, privatlektionSida } from "@/lib/club-data";

const skidskolegrupper = [
  {
    color: "Grön Grupp",
    name: "Nybörjare",
    age: "5–10 år",
    krav: ["Inga förkunskaper krävs", "Barnet fyller 5–10 år under året", "Barnet måste kunna ta instruktioner på svenska"],
    larOss: ["Kontrollera skidorna", "Börja bromsa", "Åka lift med lärare", "Själv ta sig ned för halva backen"],
  },
  {
    color: "Blå Grupp",
    name: "Avancerad nybörjare",
    age: "5–10 år",
    krav: ["Kan få stopp på skidorna", "Åker lift tillsammans med vuxen", "Barnet måste kunna ta instruktioner på svenska"],
    larOss: ["Stanna på ett mer kontrollerat sätt", "Svänga", "Åka lift själv"],
  },
  {
    color: "Röd Grupp",
    name: "Fortsättning",
    age: "5–10 år",
    krav: ["Åker på ett kontrollerat sätt", "Svänger i plog", "Åker lift själv", "Barnet måste kunna ta instruktioner på svenska"],
    larOss: ["Svänga med mer parallella skidor", "Få en säkrare åkning", "Klara av brantare backar"],
  },
];

export const Route = createFileRoute("/helgskidskola")({
  head: () => ({
    meta: [
      { title: "Helgskidskola — 5 helgtillfällen i Ekholmsnäsbacken | Lidingö Freeskiers" },
      { name: "description", content: "Helgskidskola för barn från 5 år. Fem tillfällen på lördagar eller söndagar i januari–februari, i grön, blå eller röd grupp." },
      { property: "og:title", content: "Helgskidskola — Lidingö Freeskiers" },
      { property: "og:description", content: "Fem helgtillfällen i januari och februari. Grön, blå och röd grupp efter nivå." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Helgskidskola,
});

function Helgskidskola() {
  return (
    <GroupPage
      slug="helgskidskola"
      showFacts={false}
      intro="För barn och unga som vill lära sig åka skidor eller ta sin åkning till nästa nivå. Fem roliga tillfällen på helger under januari och februari i Ekholmsnäsbacken."
    >
      <section>
        <h2 className="text-2xl sm:text-3xl">Våra skidskolegrupper</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {skidskolegrupper.map((g) => (
            <article key={g.color} className="surface-card flex flex-col bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{g.color}</p>
              {g.name ? <h3 className="mt-1 text-xl">{g.name}</h3> : null}
              {g.age ? <p className="mt-1 text-xs font-semibold text-muted-foreground">{g.age}</p> : null}
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">Vad som krävs</p>
              <ul className="mt-2 space-y-2 text-sm">
                {g.krav.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">Vad vi lär oss</p>
              <ul className="mt-2 flex-1 space-y-2 text-sm">
                {g.larOss.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 px-6 py-8 sm:px-8">
        <div className="flex items-start gap-4">
          <CalendarDays className="mt-1 size-7 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-eyebrow">Vintersäsongen</p>
            <h2 className="mt-1 text-2xl sm:text-3xl">{helgskidskola2027.registration.title}</h2>
            <p className="mt-4 font-semibold text-heading">{helgskidskola2027.registration.opens}</p>
            <p className="mt-1 text-sm">{helgskidskola2027.registration.allocation}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Träningsavgift</p>
            <p className="mt-1 text-3xl font-bold text-heading">{helgskidskola2027.registration.trainingFee}</p>
            <p className="mt-1 text-xs text-muted-foreground">{helgskidskola2027.registration.priceNote}</p>
          </div>
          <Button variant="cta" size="lg" className="rounded-full" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">Anmäl till Helgskidskolan</a>
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3">
          <CalendarDays className="size-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl">Datum</h2>
        </div>
        <p className="mt-4">{helgskidskola2027.schedule.extent}</p>
        {helgskidskola2027.schedule.dateInfo ? (
          <p className="mt-2 max-w-3xl leading-relaxed">{helgskidskola2027.schedule.dateInfo}</p>
        ) : null}
        <p className="mt-6 font-semibold text-heading">{helgskidskola2027.schedule.dateListIntro}</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {helgskidskola2027.schedule.dates.map((datum) => (
            <li
              key={datum.name}
              className={`border-l-4 px-4 py-3 ${
                datum.reserve ? "border-border bg-secondary/30" : "border-primary bg-secondary/40"
              }`}
            >
              <span
                className={`block text-xs font-bold uppercase tracking-wider ${
                  datum.reserve ? "text-muted-foreground" : "text-primary"
                }`}
              >
                {datum.name}
              </span>
              <span className="mt-1 block font-semibold text-heading">{datum.date}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed">{helgskidskola2027.schedule.dateNote}</p>
      </section>

      <section className="border-t border-border pt-6">
        <div className="flex items-center gap-3">
          <Clock3 className="size-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl">Tider</h2>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed">{helgskidskola2027.schedule.timeInfo}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {helgskidskola2027.schedule.sessions.map((session) => (
            <div key={session} className="border-l-4 border-primary bg-secondary/40 px-4 py-3 font-semibold text-heading">
              {session}
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <h3 className="text-lg">Samling</h3>
          <p className="mt-2 text-sm leading-relaxed">{helgskidskola2027.schedule.gathering}</p>
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-8 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl">Utrustning</h2>
          </div>
          <p className="mt-4 font-semibold text-heading">{helgskidskola2027.equipment.required}</p>
          <p className="mt-3 text-sm leading-relaxed">{helgskidskola2027.equipment.preparation}</p>
        </div>
        <div>
          <h3 className="text-xl">Hyra utrustning</h3>
          <p className="mt-3 text-sm leading-relaxed">{helgskidskola2027.equipment.rental}</p>
          <p className="mt-3 text-sm font-semibold">Pris: 940 kr. Priserna gäller innevarande säsong, med reservation för ändringar.</p>
          <p className="mt-3 text-sm">{"Är du intresserad? Klicka på knappen nedan. Bokningen är öppen mellan 1 november och 20 december."}</p>
          <Button variant="cta" size="lg" className="mt-4 rounded-full" asChild>
            <a href="https://entry.sportadmin.se/groupsOverview?uid=k3zfkH" target="_blank" rel="noreferrer">Boka skidhyra här</a>
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3">
          <Users className="size-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl">Medlemskap i Lidingö Freeskiers</h2>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed">{helgskidskola2027.membership.intro}</p>
        <h3 className="mt-6 text-lg">{helgskidskola2027.membership.season}</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {helgskidskola2027.membership.fees.map((fee) => (
            <li key={fee} className="flex gap-3 border-l-4 border-primary bg-secondary/40 px-4 py-3 font-semibold text-heading">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              {fee}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed">{helgskidskola2027.membership.registration}</p>
        <p className="mt-2 text-sm leading-relaxed">{helgskidskola2027.membership.benefits}</p>
        <p className="mt-3 text-xs text-muted-foreground">{helgskidskola2027.membership.note}</p>
      </section>

        <section className="surface-card bg-card p-6">
          <h2 className="text-xl">Avbokning &amp; återbetalning</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Enligt klubbens avboknings- och återbetalningsregler utgår ingen återbetalning vid skada, sjukdom
            eller missade tillfällen, då tränare och backtider bokas och bekostas i förväg för hela säsongen.
          </p>
          <Link to="/avbokning" className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Läs alla avboknings- och återbetalningsregler →
          </Link>
        </section>

      <GroupContact topic="Helgskidskolan" email={departmentEmail("helg")} />

      <section className="border-y border-border bg-secondary/40 px-6 py-8 sm:px-8">
        <h2 className="text-2xl sm:text-3xl">Privatlektioner</h2>
        <p className="mt-4 max-w-3xl leading-relaxed">{privatlektionSida.audience}</p>
        <p className="mt-2 max-w-3xl leading-relaxed">{privatlektionSida.format}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {privatlektionSida.prices.map((p) => (
            <div key={p.people} className="border-l-4 border-primary bg-card px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{p.people}</p>
              <p className="mt-1 font-semibold text-heading">{p.price} · {p.duration}</p>
            </div>
          ))}
        </div>
        <Button variant="cta" size="lg" className="mt-6 rounded-full" asChild>
          <Link to="/privatlektion">Läs mer &amp; boka privatlektion</Link>
        </Button>
      </section>

      <section className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-10">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-eyebrow">Interaktiv Nivåguide</p>
          <h2 className="mt-1 text-2xl sm:text-3xl">Osäker på vilken grupp ditt barn ska gå i?</h2>
          <p className="mt-2 text-sm">Gör vårt 1-minuters skidtest så får du direkt rekommendation om Grön, Blå eller Röd grupp!</p>
        </div>
        <LevelFinder />
      </section>
    </GroupPage>
  );
}


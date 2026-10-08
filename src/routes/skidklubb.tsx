import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Repeat,
  Sparkles,
  Users,
} from "lucide-react";

import backenFoto from "@/assets/photos/ekholmsnas-sunset.jpg";
import { GroupContact } from "@/components/site/GroupContact";
import { LevelFinderButton } from "@/components/site/LevelFinder";
import { PageBanner } from "@/components/site/PageBanner";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, departmentEmail, groups, helgskidskola2027, skidklubbSida } from "@/lib/club-data";

export const Route = createFileRoute("/skidklubb")({
  head: () => ({
    meta: [
      { title: "Freeskiers Skidklubb — vardagsträning i park och backe" },
      {
        name: "description",
        content:
          "Regelbunden friåkning och freestyle för barn och unga i årskurs 1–9. Träning 1–2 gånger i veckan måndag–onsdag kvällar, januari–mars i Ekholmsnäsbacken.",
      },
      { property: "og:title", content: "Freeskiers Skidklubb" },
      {
        property: "og:description",
        content: "Vardagskvällar i Ekholmsnäsbacken med park, hopp, rails och allsidig skidteknik.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Skidklubb,
});

const visionIcons = [Repeat, Users, HeartHandshake];

function Skidklubb() {
  const g = groups.find((x) => x.slug === "freeskiers-skidklubb")!;
  const intro =
    "För barn och unga som vill träna regelbunden friåkning och freestyle under vintersäsongen. Vardagskvällar i Ekholmsnäsbacken med fokus på hopp, rails och stark gemenskap.";
  const cta = (
    <a href={BOOKING_URL} target="_blank" rel="noreferrer">
      {g.cta}
    </a>
  );

  return (
    <>
      <PageBanner photo={g.photo} alt={g.photoAlt} eyebrow={`${g.age} · ${g.level}`} title={g.name}>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="cta" size="xl" className="rounded-full" asChild>
            {cta}
          </Button>
          <LevelFinderButton variant="onDark" label="Gör skidtestet" className="h-14 px-6" />
        </div>
      </PageBanner>

      {/* Snabbfakta – marin band */}
      <section className="bg-primary-deep text-primary-foreground">
        <dl className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 sm:divide-x sm:divide-white/15">
          {g.facts.map((f) => (
            <div key={f.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                {f.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <p className="text-lg">{g.summary}</p>

        {/* Vår vision */}
        <div className="space-y-5">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="h-1.5 w-8 rounded-full bg-primary" aria-hidden />
            Vår vision
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {skidklubbSida.vision.map((v, i) => {
              const Icon = visionIcons[i] ?? Sparkles;
              return (
                <div key={v.title} className="surface-card bg-card p-5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-heading">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Så ser träningen ut */}
        <div className="surface-card bg-card p-6">
          <h2 className="text-xl">Så ser träningen ut</h2>
          <p className="mt-3 text-sm leading-relaxed">{skidklubbSida.traning.intro}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Träningen
              </h3>
              <ul className="mt-2 space-y-2 text-sm">
                {skidklubbSida.traning.punkter.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Inför passet
              </h3>
              <ul className="mt-2 space-y-2 text-sm">
                {skidklubbSida.traning.forPasset.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Minimikrav */}
        <div className="surface-card bg-card p-6">
          <h2 className="text-xl">Minimikrav</h2>
          <p className="mt-2 text-sm leading-relaxed">
            För en trygg, rolig och utvecklande verksamhet krävs grundläggande skidvana:
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {skidklubbSida.requirements.map((r) => (
              <li key={r} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-muted-foreground">
            {skidklubbSida.requirementsNote}
          </p>
        </div>

        {/* Anmälan & förtur */}
        <div id="anmalan" className="space-y-5 scroll-mt-24">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="h-1.5 w-8 rounded-full bg-primary" aria-hidden />
            {skidklubbSida.anmalan.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {skidklubbSida.anmalan.steps.map((s) => (
              <div key={s.title} className="surface-card bg-card p-5">
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {s.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <Button variant="cta" size="lg" className="rounded-full" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              {skidklubbSida.anmalan.cta}
            </a>
          </Button>
        </div>

        {/* Träningsschema & priser */}
        <div className="space-y-5">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="h-1.5 w-8 rounded-full bg-primary" aria-hidden />
            Träningsschema & priser
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="hidden grid-cols-[1.1fr_1.2fr_0.9fr_auto] items-center gap-4 border-b border-border bg-secondary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-secondary-foreground sm:grid">
              <span>Årskurs</span>
              <span>Dagar</span>
              <span>Tider</span>
              <span className="text-right">Pris</span>
            </div>
            {skidklubbSida.schedule.map((row) => (
              <div
                key={row.group}
                className={`grid gap-1 px-6 py-4 sm:grid-cols-[1.1fr_1.2fr_0.9fr_auto] sm:items-center sm:gap-4 ${
                  row.highlight ? "bg-accent/10" : ""
                } ${row !== skidklubbSida.schedule[0] ? "border-t border-border" : ""}`}
              >
                <span className={`font-semibold ${row.highlight ? "text-accent" : "text-heading"}`}>
                  {row.group}
                </span>
                <span className="text-sm">
                  {row.days}
                  <span className="block text-xs text-muted-foreground">{row.perWeek}</span>
                </span>
                <span className="text-sm">{row.time}</span>
                <span className="text-right">
                  <span className="block text-lg font-bold text-primary">{row.price}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="whitespace-pre-line text-xs text-muted-foreground">
            {skidklubbSida.priceNote}
          </p>
        </div>

        {/* Medlemskap */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl">
            <span className="h-1.5 w-8 rounded-full bg-primary" aria-hidden />
            Medlemskap i Lidingö Freeskiers
          </h2>
          <h3 className="text-lg">{helgskidskola2027.membership.season}</h3>
          <ul className="grid gap-3">
            {helgskidskola2027.membership.fees.map((fee) => (
              <li
                key={fee}
                className="flex gap-3 border-l-4 border-primary bg-secondary/40 px-4 py-3 font-semibold text-heading"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                {fee}
              </li>
            ))}
          </ul>
          <p className="whitespace-pre-line text-xs text-muted-foreground">
            {helgskidskola2027.membership.note}
          </p>
        </div>

        {/* Säsongens events */}
        <div className="surface-card bg-card p-6">
          <h2 className="flex items-center gap-3 text-xl">
            <Sparkles className="size-5 text-primary" aria-hidden />
            Säsongens events
          </h2>
          <p className="mt-3 text-sm leading-relaxed">{skidklubbSida.eventsIntro}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {skidklubbSida.events.map((e) => (
              <li
                key={e}
                className="rounded-xl border border-border bg-secondary/50 px-4 py-3 text-center text-sm font-semibold text-heading"
              >
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed">{skidklubbSida.eventsOutro}</p>
        </div>

        {/* Ekholmsnäsbacken */}
        <div className="surface-card flex items-stretch gap-4 bg-card p-5">
          <img
            src={backenFoto}
            alt="Ekholmsnäsbacken upplyst i kvällsljus, sedd över sjön"
            className="w-28 shrink-0 rounded-xl object-cover sm:w-40"
            loading="lazy"
          />
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-base">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
              Ekholmsnäsbacken
            </h2>
            <p className="mt-2 text-sm leading-relaxed">{skidklubbSida.backen.intro}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {skidklubbSida.backen.perks.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                >
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={skidklubbSida.backen.link}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Läs mer om Ekholmsnäsbacken
            </a>
          </div>
        </div>

        <GroupContact topic="Freeskiers Skidklubb" email={departmentEmail("skidklubb")} />
      </section>
    </>
  );
}

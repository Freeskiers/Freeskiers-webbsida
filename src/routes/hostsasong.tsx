import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Lock, MapPin, Star } from "lucide-react";

import { GroupPage } from "@/components/site/GroupPage";
import { hostsasongSida as h } from "@/lib/club-data";

export const Route = createFileRoute("/hostsasong")({
  head: () => ({
    meta: [
      { title: "Höstsäsong — barmark & trampolin | Lidingö Freeskiers" },
      { name: "description", content: "Barmarksträning varje onsdag och trampolinträning i Vikingahallen för barn i åk 1–9 – med förtur till Freeskiers Skidklubb." },
      { property: "og:title", content: "Höstsäsong — Lidingö Freeskiers" },
      { property: "og:description", content: "Ladda upp inför vintern med barmark och trampolin – och förtur till skidklubben." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hostsasong,
});

function MapLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
      <MapPin className="size-4" /> {label}
    </a>
  );
}

function Hostsasong() {
  return (
    <GroupPage
      slug="hostsasong"
      intro="Ladda upp rejält inför vintern med Freeskiers Höstsäsong! Barmarksträning och trampolinträning bygger styrka, kroppskontroll och trygghet i luften innan snön faller."
      showHeroLevelFinder={false}
      showFacts={false}
      heroAction={
        h.registrationOpen ? undefined : (
          <span className="inline-flex h-14 items-center gap-2 rounded-full border border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground">
            <Lock className="size-4" /> Anmälan stängd
          </span>
        )
      }
    >
      {!h.registrationOpen && (
        <section className="surface-card border-l-4 border-primary bg-card p-6">
          <h2 className="text-xl">Anmälan är stängd</h2>
          <p className="mt-2 text-sm leading-relaxed">{h.closedText}</p>
        </section>
      )}


      <section className="grid gap-5 md:grid-cols-2">
        <article className="surface-card bg-card p-6">
          <h2 className="text-xl">{h.barmark.title}</h2>
          <p className="mt-2 text-sm font-semibold">{h.barmark.lead}</p>
          <p className="mt-2 text-sm leading-relaxed">{h.barmark.text}</p>
          <p className="mt-2 text-sm leading-relaxed">{h.barmark.meeting}</p>
          <MapLink href={h.barmark.mapUrl} label={h.barmark.mapLabel} />
        </article>
        <article className="surface-card bg-card p-6">
          <h2 className="text-xl">{h.trampolin.title}</h2>
          <p className="mt-2 text-sm font-semibold">{h.trampolin.lead}</p>
          <p className="mt-2 text-sm leading-relaxed">{h.trampolin.text}</p>
          <div className="mt-4 rounded-2xl bg-secondary p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="size-4 text-primary" /> Träningstider &amp; datum
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {h.trampolin.groups.map((grp) => (
                <div key={grp.label} className="rounded-xl border border-primary/15 bg-card/70 p-3">
                  <p className="text-sm font-semibold">{grp.label}</p>
                  <p className="text-xs font-medium text-primary">{grp.time}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {h.trampolin.dates.map((d) => (
                      <li key={d} className="flex flex-wrap items-baseline gap-x-1.5 leading-snug">
                        <span className="font-medium">{d}</span>
                        <span className="text-xs text-muted-foreground">{grp.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <MapLink href={h.trampolin.mapUrl} label={h.trampolin.mapLabel} />
        </article>
      </section>

      <section className="surface-card bg-card p-6 sm:p-8">
        <h2 className="text-2xl">Pris & frågor</h2>
        <p className="mt-3 text-sm leading-relaxed">
          Priset för höstsäsongen är <strong>{h.price}</strong> och inkluderar både barmarksträning och träning i Vikingahallen (5 tillfällen).
          <br />
          Enbart träning i Vikingahallen, 5 tillfällen: <strong>{h.trampolinOnlyPrice}</strong>.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          Frågor om Höstsäsongen? Mejla{" "}
          <a href={`mailto:${h.contactEmail}`} className="font-semibold text-primary underline-offset-4 hover:underline">{h.contactEmail}</a>.
        </p>
      </section>

      <section className="surface-card bg-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Star className="size-6" />
          </span>
          <div>
            <h2 className="text-2xl">Förtur till Freeskiers Skidklubb</h2>
            <p className="mt-2 text-sm leading-relaxed">{h.priority}</p>
            <p className="mt-2 text-sm font-semibold">{h.requirement}</p>
          </div>
        </div>
      </section>

    </GroupPage>
  );
}

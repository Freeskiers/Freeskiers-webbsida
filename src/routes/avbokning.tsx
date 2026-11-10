import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import sunset from "@/assets/photos/ekholmsnas-sunset.jpg";
import { PageBanner } from "@/components/site/PageBanner";

export const Route = createFileRoute("/avbokning")({
  head: () => ({
    meta: [
      { title: "Avboknings- och återbetalningsregler | Lidingö Freeskiers" },
      { name: "description", content: "Så fungerar avbokning och återbetalning för Freeskiers Skidklubb och Helgskidskolan." },
      { property: "og:title", content: "Avboknings- och återbetalningsregler — Lidingö Freeskiers" },
      { property: "og:description", content: "Datum för avbokning, regler för återbetalning och vad som gäller om backen inte öppnar." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AvbokningPage,
});

const avbokning = [
  "t.o.m 30 november: hela avgiften återbetalas.",
  "Skidklubben 1–20 december: återbetalning minus 1 000 kr.",
  "Helgskidskolan 1–20 december: återbetalning minus 600 kr.",
  "Från 21 december: ingen återbetalning.",
];

function AvbokningPage() {
  return (
    <>
      <PageBanner photo={sunset} alt="Solnedgång över Ekholmsnäsbacken" eyebrow="Skidklubb & Helgskidskola" title="Avbokning & återbetalning" />
      <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:px-6">
        <div className="surface-card bg-card p-6">
          <h2 className="text-2xl">Avbokningsregler</h2>
          <ul className="mt-4 grid gap-3">
            {avbokning.map((t) => (
              <li key={t} className="flex gap-3 border-l-4 border-primary bg-secondary/40 px-4 py-3 font-semibold text-heading">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed">
            Efter 21 december gäller ingen återbetalning. Inte heller vid skada, sjukdom eller missade tillfällen, då
            tränare och backtider bokas och bekostas i förväg för hela säsongen.
          </p>
        </div>
        <div className="surface-card bg-card p-6">
          <h2 className="text-2xl">Återbetalningsregler</h2>
          <p className="mt-3 text-sm leading-relaxed">
            <strong>Lidingö Freeskiers är en ideell förening och kan inte bära större ekonomiska förluster.</strong>{" "}
            Snöläggning och drift av Ekholmsnäsbacken sköts av en extern entreprenör.{" "}
            <strong>Om backen öppnar genomför vi träning och full avgift gäller.</strong> Om backen inte öppnar{" "}
            <strong>återbetalar vi avgiften minus en anmälningsavgift på 1 000 kr för Skidklubben och 600 kr för Helgskidskolan.</strong>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Föreningen följer myndigheternas rekommendationer vid pandemier eller andra händelser utanför vår kontroll.{" "}
            <strong>Om träning inte kan bedrivas på grund av sådana rekommendationer utgår ingen återbetalning av träningsavgiften.</strong>
          </p>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, MapPin, PackageCheck, TicketCheck, Users } from "lucide-react";

import { AgendoBooking } from "@/components/site/AgendoBooking";
import { GroupContact } from "@/components/site/GroupContact";
import { GroupPage } from "@/components/site/GroupPage";
import { Button } from "@/components/ui/button";
import { departmentEmail, EQUIPMENT_RENTAL_URL, privatlektionSida, SLOPE_MAP_URL } from "@/lib/club-data";

const practicalIcons = [TicketCheck, PackageCheck, MapPin];

export const Route = createFileRoute("/privatlektion")({
  head: () => ({
    meta: [
      { title: "Privatlektion på skidor i Ekholmsnäsbacken | Lidingö Freeskiers" },
      { name: "description", content: "Boka en 60 minuters privatlektion för en eller två personer i Ekholmsnäsbacken. Liftkort ingår och lektionen anpassas efter nivå och mål." },
      { property: "og:title", content: "Privatlektion — Lidingö Freeskiers" },
      { property: "og:description", content: "Personlig skidcoachning för en eller två personer. För barn, ungdomar och vuxna på alla nivåer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privatlektion,
});

function Privatlektion() {
  return (
    <GroupPage
      slug="privatlektioner"
      showFacts={false}
      showOverview={false}
      intro={privatlektionSida.intro}
      heroAction={<AgendoBooking label="Boka privatlektion" />}
    >
      <section>
        <p className="text-eyebrow">Upplägg och innehåll</p>
        <h2 className="mt-2 text-2xl sm:text-3xl">Personlig träning utifrån dina mål</h2>
        <div className="mt-4 grid gap-4 text-sm leading-relaxed sm:grid-cols-2">
          <p>{privatlektionSida.format}</p>
          <p>{privatlektionSida.audience}</p>
        </div>
      </section>

      <section className="border-y border-border py-8">
        <div className="flex items-center gap-3">
          <Users className="size-7 text-primary" aria-hidden="true" />
          <h2 className="text-2xl">Priser</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {privatlektionSida.prices.map((price) => (
            <div key={price.people} className="surface-card border border-border bg-card p-6">
              <p className="font-semibold text-heading">{price.people}</p>
              <p className="mt-2 text-3xl font-bold text-primary">{price.price}</p>
              <p className="mt-1 text-sm text-muted-foreground">{price.duration}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-secondary p-5">
          <p className="font-semibold text-heading">Minimikrav för två personer</p>
          <p className="mt-2 text-sm">{privatlektionSida.pairRequirement.intro}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {privatlektionSida.pairRequirement.items.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl">Inför din privatlektion</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {privatlektionSida.practical.map((item, index) => {
            const Icon = practicalIcons[index];
            if (!Icon) return null;
            return (
              <article key={item.title} className="surface-card border border-border bg-card p-6">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl">Hyra utrustning</h2>
          <p className="mt-3 text-sm leading-relaxed">{privatlektionSida.rental}</p>
          <Button variant="outline" className="mt-5" asChild>
            <a href={EQUIPMENT_RENTAL_URL} target="_blank" rel="noreferrer">
              Se uthyrning och priser <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div>
          <h2 className="text-xl">Hitta till backen</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Privatlektionerna hålls i Ekholmsnäsbacken på Lidingö. Samling sker vid skiduthyrningen.
          </p>
          <Button variant="outline" className="mt-5" asChild>
            <a href={SLOPE_MAP_URL} target="_blank" rel="noreferrer">
              Öppna vägbeskrivning <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <GroupContact topic="privatlektioner" email={departmentEmail("privatlektioner")} />

      <section className="rounded-2xl bg-primary-deep p-6 text-primary-foreground sm:p-8">
        <h2 className="text-2xl text-primary-foreground">Boka privatlektion</h2>
        <p className="mt-2 max-w-2xl text-sm text-primary-foreground/85">
          Välj en ledig tid och boka direkt. Du slutför bokningen i panelen som öppnas.
        </p>
        <div className="mt-5">
          <AgendoBooking label="Boka privatlektion" />
        </div>
      </section>
    </GroupPage>
  );
}

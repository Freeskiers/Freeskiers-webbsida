import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, MapPin, ShoppingBag, Tag } from "lucide-react";

import logo from "@/assets/freeskiers-logo-horizontal.png.asset.json";
import sunset from "@/assets/photos/ekholmsnas-sunset.jpg";
import { PageBanner } from "@/components/site/PageBanner";
import { Button } from "@/components/ui/button";
import { webbshopSida } from "@/lib/club-data";

export const Route = createFileRoute("/webbshop")({
  head: () => ({
    meta: [
      { title: "Webbshop — Lidingö Freeskiers" },
      {
        name: "description",
        content:
          "Handla Lidingö Freeskiers egen klubbkollektion i samarbete med Intersport på Lidingö – hoodies, mössor, keps, buff, skistrap och kaffetermos.",
      },
      { property: "og:title", content: "Webbshop — Lidingö Freeskiers" },
      {
        property: "og:description",
        content:
          "Beställ Lidingö Freeskiers klubbkläder och profilprodukter online hos Intersport Lidingö.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebbshopPage,
});

function WebbshopPage() {
  return (
    <>
      <PageBanner
        photo={sunset}
        alt="Ekholmsnäsbacken i kvällsljus"
        eyebrow="Klubbkollektion · Intersport Lidingö"
        title="Webbshop"
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
          {webbshopSida.lead}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="cta" size="lg" className="rounded-full" asChild>
            <a href={webbshopSida.shopUrl} target="_blank" rel="noreferrer">
              <ShoppingBag className="size-4" />
              {webbshopSida.ctaLabel}
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </PageBanner>

      {/* Så här handlar du + logga */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-card bg-card p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <ShoppingBag className="size-3.5" /> Webbshop
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl">{webbshopSida.lead}</h2>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-heading">
                {webbshopSida.stepsTitle}
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm sm:text-base">
                {webbshopSida.steps.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-secondary/70 p-4 text-sm font-semibold text-heading">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <span>💡 {webbshopSida.pickupNote}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="cta" size="lg" className="rounded-full" asChild>
                <a href={webbshopSida.shopUrl} target="_blank" rel="noreferrer">
                  {webbshopSida.ctaLabel}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <a
                href={webbshopSida.originalPageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary underline hover:opacity-80"
              >
                Länk till lidingofreeskiers.se/resor/
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="surface-card flex flex-col items-center justify-center bg-card p-8 text-center">
            <img
              src={logo.url}
              alt="Lidingö Freeskiers"
              width={630}
              height={634}
              className="h-44 w-auto object-contain sm:h-56"
            />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Officiell klubbkollektion i samarbete med Intersport Lidingö Centrum
            </p>
          </div>
        </div>
      </section>

      {/* Priser & kollektionsbild */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card bg-background p-6 sm:p-8">
              <div className="flex items-center gap-2 text-primary">
                <Tag className="size-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Kollektion &amp; prislista
                </span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl">
                {webbshopSida.productsTitle}
              </h2>
              <ul className="mt-5 divide-y divide-border">
                {webbshopSida.products.map((item) => (
                  <li
                    key={item.name}
                    className="py-3 text-sm sm:text-base"
                  >
                    <span className="font-bold uppercase tracking-wide text-heading">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button variant="cta" className="w-full rounded-full" asChild>
                  <a href={webbshopSida.shopUrl} target="_blank" rel="noreferrer">
                    Beställ i webbshopen hos Intersport Lidingö
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-background p-4 shadow-sm sm:p-6">
              <img
                src={webbshopSida.productsPhoto}
                alt={webbshopSida.productsPhotoAlt}
                loading="lazy"
                className="mx-auto max-h-[540px] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

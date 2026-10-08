import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

import { LevelFinderButton } from "@/components/site/LevelFinder";
import { PageBanner } from "@/components/site/PageBanner";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, groups } from "@/lib/club-data";

type Props = {
  slug: string;
  intro: string;
  children?: ReactNode;
  showFacts?: boolean;
  showOverview?: boolean;
  heroAction?: ReactNode;
  showHeroLevelFinder?: boolean;
};

export function GroupPage({ slug, intro, children, showFacts = true, showOverview = true, heroAction, showHeroLevelFinder = true }: Props) {
  const g = groups.find((x) => x.slug === slug)!;
  const coach = g.booking === "coach";
  const cta = coach ? (
    <Link to="/kontakt">{g.cta}</Link>
  ) : (
    <a href={BOOKING_URL} target="_blank" rel="noreferrer">{g.cta}</a>
  );

  return (
    <>
      <PageBanner photo={g.photo} alt={g.photoAlt} eyebrow={`${g.age} · ${g.level}`} title={g.name}>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {heroAction ?? (
            <Button variant="cta" size="xl" className="rounded-full" asChild>
              {cta}
            </Button>
          )}
          {coach || !showHeroLevelFinder ? null : <LevelFinderButton variant="onDark" label="Gör skidtestet" className="h-14 px-6" />}
        </div>
      </PageBanner>

      {showOverview ? (
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
          <dl className="grid gap-4 rounded-3xl border border-border bg-card p-6 pr-28 sm:grid-cols-3 lg:pr-52">
            {g.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1 font-semibold text-heading">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className={`mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 ${showFacts ? "lg:grid-cols-3" : ""}`}>
        <div className={`space-y-6 ${showFacts ? "lg:col-span-2" : ""}`}>
          {showOverview ? (
            <>
              <p className="text-lg">{g.summary}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {g.bullets.map((b) => (
                  <li key={b} className="surface-card flex gap-3 p-4 text-sm">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {children}
        </div>

        {showFacts ? (
          <aside className="surface-card h-fit space-y-4 bg-card p-6">
            <h2 className="text-lg">Snabbfakta</h2>
            <p className="text-sm">{g.when}</p>
            <p className="text-xs text-muted-foreground">
              Platserna fördelas enligt först till kvarn. Tidigare medlemmar har förtur.
            </p>
            <Button variant="cta" size="lg" className="w-full rounded-full" asChild>
              {cta}
            </Button>
            {coach ? null : <LevelFinderButton label="Testa åkarens nivå" className="w-full" />}
          </aside>
        ) : null}
      </section>
    </>
  );
}

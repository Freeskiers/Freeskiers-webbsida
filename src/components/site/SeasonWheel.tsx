import { ArrowRight, Calendar, CheckCircle2, Clock, Snowflake } from "lucide-react";
import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { seasonPhases } from "@/lib/club-data";

function phaseForMonth(month: number) {
  return seasonPhases.findIndex((phase) => phase.monthNumbers.includes(month));
}

export function SeasonWheel() {
  const currentIndex = useMemo(() => phaseForMonth(new Date().getMonth()), []);
  const initialIndex = currentIndex === -1 ? 0 : currentIndex;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selected = seasonPhases[selectedIndex];

  if (!selected) return null;

  function selectPhase(index: number) {
    setSelectedIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    setSelectedIndex((current) => (current + direction + seasonPhases.length) % seasonPhases.length);
  }

  return (
    <section id="arshjul" className="scroll-mt-20 bg-gradient-snow py-16 sm:py-20" aria-labelledby="season-wheel-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase text-primary">
            <Clock className="size-3.5" />
            <span>Freeskiers Årshjul</span>
          </div>
          <h2 id="season-wheel-title" className="text-3xl sm:text-4xl">
            Vad händer under året i klubben?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Följ säsongens gång från höstens barmarksträning och anmälningssläpp, till vinterns träningar och vårens tävlingar i Ekholmsnäsbacken.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" role="tablist" aria-label="Välj del av skidsäsongen" onKeyDown={handleKeyDown}>
          {seasonPhases.map((phase, index) => {
            const selectedPhase = selectedIndex === index;
            const current = currentIndex === index;
            return (
              <div key={phase.id} className="relative">
                <Button
                  type="button"
                  variant="outline"
                  role="tab"
                  id={`season-tab-${phase.id}`}
                  aria-selected={selectedPhase}
                  aria-controls="season-panel"
                  tabIndex={selectedPhase ? 0 : -1}
                  onClick={() => selectPhase(index)}
                  className={`h-full min-h-24 w-full justify-start whitespace-normal rounded-2xl p-4 text-left sm:p-5 ${selectedPhase ? "border-accent bg-background ring-2 ring-accent/20 shadow-card" : "border-border bg-background/70 hover:bg-background"}`}
                >
                  <span className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase text-primary">{phase.months}</span>
                    <span className="block text-base font-extrabold text-heading sm:text-lg">{phase.name}</span>
                  </span>
                </Button>
                {current ? <span className="absolute -top-2.5 right-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground shadow-sm">Just nu!</span> : null}
              </div>
            );
          })}
        </div>

        <div id="season-panel" role="tabpanel" aria-labelledby={`season-tab-${selected.id}`} className="overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-card sm:p-10">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2.5 text-sm font-bold uppercase text-primary">
                <Calendar className="size-4" />
                <span>{selected.months}</span>
              </div>
              <h3 className="mt-1 text-2xl sm:text-3xl">{selected.name} – {selected.tagline}</h3>
            </div>
            <Button variant="cta" className="self-start rounded-full lg:self-auto" asChild>
              <Link to={selected.actionPath}>
                {selected.actionLabel} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
            {selected.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-sm font-medium leading-relaxed sm:text-base">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-secondary bg-secondary/60 p-4 text-xs font-medium text-heading sm:text-sm">
            <Snowflake className="size-5 shrink-0 text-primary" />
            <span>
              Tips till föräldrar: Anmälan till Helgskidskola och Skidklubb öppnar alltid den 16 oktober. Håll utkik här på sajten för direktlänkar!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
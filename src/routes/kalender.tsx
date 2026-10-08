import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Copy, Download, Facebook, Grid, Instagram, List, MapPin, Share2 } from "lucide-react";
import { useState } from "react";

import jump from "@/assets/photos/freestyle-jump.jpg";
import { LevelFinderButton } from "@/components/site/LevelFinder";
import { PageBanner } from "@/components/site/PageBanner";
import { CLUB_URL, clubEvents, eventLink, FACEBOOK_URL, INSTAGRAM_URL, SEASON, type ClubEvent } from "@/lib/club-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kalender")({
  head: () => ({
    meta: [
      { title: `Säsongskalender ${SEASON} — Lidingö Freeskiers` },
      { name: "description", content: "Alla viktiga datum: anmälningssläpp, tränarutbildning, klubbkväll, säsongsstart, Rookie Series, sportlovscamp och klubbmästerskap i Ekholmsnäsbacken." },
      { property: "og:title", content: "Säsongskalender & Event — Lidingö Freeskiers" },
      { property: "og:description", content: "Håll koll på klubbens anmälningsdatum, klubbkvällar, tävlingar och läger." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KalenderPage,
});

const categories = [
  { id: "all", label: "Alla händelser" },
  { id: "anmalan", label: "Anmälan & Platser" },
  { id: "traning", label: "Träning & Backe" },
  { id: "tavling", label: "Tävling & Event" },
  { id: "klubbkvall", label: "Klubbkvällar & Läger" },
];
const months: { index: number | "all"; label: string }[] = [
  { index: "all", label: "Hela säsongen" },
  { index: 9, label: "Oktober" },
  { index: 10, label: "November" },
  { index: 11, label: "December" },
  { index: 0, label: "Januari" },
  { index: 1, label: "Februari" },
  { index: 2, label: "Mars / April" },
];


function downloadIcs(ev: ClubEvent) {
  const esc = (t: string) => t.replace(/[,;]/g, (m) => `\\${m}`);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//IK Lidingö Freeskiers//Säsongskalender//SV", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:${ev.id}@lidingofreeskiers.se`,
    `SUMMARY:${esc(ev.title)} - IK Lidingö Freeskiers`,
    `DESCRIPTION:${esc(ev.description)}\\n\\nMer info: ${CLUB_URL}${ev.actionUrl ?? "/kalender"}`,
    `LOCATION:${esc(ev.locationUrl ? `${ev.location} – ${ev.locationUrl}` : ev.location)}`,
    `DTSTART;VALUE=DATE:${ev.start}`, `DTEND;VALUE=DATE:${ev.end}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  a.download = `${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function socialText(ev: ClubEvent) {
  return `❄️ ${ev.title.toUpperCase()} ❄️\n\n📅 Datum: ${ev.shortDate} (${ev.time})\n📍 Plats: ${ev.locationUrl ? `${ev.location} – ${ev.locationUrl}` : ev.location}\n\n${ev.description}\n\n👉 Läs mer: ${CLUB_URL}${ev.actionUrl ?? "/kalender"}\n\n#lidingofreeskiers #ekholmsnäsbacken #freeski`;
}

function KalenderPage() {
  const [cat, setCat] = useState("all");
  const [month, setMonth] = useState<number | "all">("all");
  const [view, setView] = useState<"timeline" | "months">("timeline");
  const [copied, setCopied] = useState<string | null>(null);

  const list = clubEvents.filter(
    (e) =>
      (cat === "all" || e.category === cat || (cat === "klubbkvall" && e.category === "lager")) &&
      (month === "all" || e.monthIndex === month || (month === 2 && e.monthIndex === 3)),
  );

  const copy = async (ev: ClubEvent) => {
    await navigator.clipboard.writeText(socialText(ev));
    setCopied(ev.id);
    setTimeout(() => setCopied(null), 3000);
  };
  const shareFb = (ev: ClubEvent) => {
    const u = encodeURIComponent(window.location.origin + (ev.actionUrl ?? "/kalender"));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank", "width=600,height=400");
  };

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-xs font-bold transition-colors",
      active ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-secondary",
    );

  return (
    <>
      <PageBanner photo={jump} alt="Hopp i Ekholmsnäsbacken" eyebrow={`Säsongen ${SEASON}`} title="Säsongskalender & Event">
        <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
          Här samlar vi alla viktiga datum för klubben: anmälningssläpp, tränarutbildning, klubbkvällar i
          Alpingaraget, säsongsstart, Rookie Series och klubbmästerskap.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#kalender" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            Bläddra i kalendern <ArrowRight className="size-4" />
          </a>
          <LevelFinderButton variant="onDark" label="Gör vårt skidtest" />
        </div>
      </PageBanner>

      <section id="kalender" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="surface-card mb-10 bg-secondary/40 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-eyebrow">Överblick &amp; filtrering</p>
              <h2 className="mt-1 text-2xl sm:text-3xl">Planera säsongen i Ekholmsnäsbacken</h2>
            </div>
            <div className="flex gap-1 self-start rounded-2xl border border-border bg-background p-1">
              <button type="button" onClick={() => setView("timeline")} aria-pressed={view === "timeline"} className={cn("flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold", view === "timeline" ? "bg-primary-deep text-primary-foreground" : "hover:bg-secondary")}>
                <List className="size-4" /> Tidslinje / Lista
              </button>
              <button type="button" onClick={() => setView("months")} aria-pressed={view === "months"} className={cn("flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold", view === "months" ? "bg-primary-deep text-primary-foreground" : "hover:bg-secondary")}>
                <Grid className="size-4" /> Månadskort
              </button>
            </div>
          </div>
          <p className="mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategorier</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.id} type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={pill(cat === c.id)}>{c.label}</button>
            ))}
          </div>
          <p className="mt-5 mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Månad</p>
          <div className="flex flex-wrap gap-2">
            {months.map((m) => (
              <button key={m.label} type="button" onClick={() => setMonth(m.index)} aria-pressed={month === m.index} className={pill(month === m.index)}>{m.label}</button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p className="surface-card p-8 text-center text-sm text-muted-foreground">Inga händelser matchar filtret.</p>
        ) : view === "timeline" ? (
          <ol className="space-y-5">
            {list.map((ev) => {
              const l = eventLink(ev.actionUrl);
              return (
                <li key={ev.id} className="surface-card flex flex-col gap-5 bg-card p-6 sm:p-8 lg:flex-row lg:items-center">
                  <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-secondary text-center">
                    <span className="text-xs font-bold text-primary">{ev.month}</span>
                    <span className="text-3xl font-black leading-none text-heading">{ev.day}</span>
                    <span className="text-[10px] text-muted-foreground">{ev.year}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">{ev.categoryLabel}</span>
                      {ev.badge ? <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-heading">{ev.badge}</span> : null}
                      <span className="text-xs font-bold text-primary">{ev.shortDate}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl">{ev.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-primary" />{ev.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />{ev.locationUrl ? <a href={ev.locationUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{ev.location}</a> : ev.location}</span>
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed">{ev.description}</p>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-border pt-4 lg:items-end lg:border-t-0 lg:pt-0">
                    <Link {...l} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary">
                      {ev.actionLabel ?? "Läs mer"} <ArrowRight className="size-4" />
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => downloadIcs(ev)} title="Lägg till i din kalender (.ics)" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                        <Download className="size-3.5" /> iCal
                      </button>
                      <button type="button" onClick={() => shareFb(ev)} aria-label="Dela på Facebook" className="rounded-full border border-border p-1.5 hover:bg-secondary">
                        <Facebook className="size-4" />
                      </button>
                      <button type="button" onClick={() => copy(ev)} title="Kopiera färdig text för Instagram & Facebook" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                        {copied === ev.id ? <><Check className="size-3.5 text-success" /> Kopierat!</> : <><Copy className="size-3.5" /> För SoMe</>}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((ev) => {
              const l = eventLink(ev.actionUrl);
              return (
                <article key={ev.id} className="surface-card flex flex-col justify-between bg-card p-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">{ev.categoryLabel}</span>
                      <span className="text-xs font-extrabold text-primary">{ev.shortDate}</span>
                    </div>
                    <h3 className="mb-2 text-lg">{ev.title}</h3>
                    <div className="mb-3 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5"><Clock className="size-3.5 shrink-0 text-primary" />{ev.time}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="size-3.5 shrink-0 text-primary" />{ev.locationUrl ? <a href={ev.locationUrl} target="_blank" rel="noreferrer" className="truncate font-semibold text-primary hover:underline">{ev.location}</a> : <span className="truncate">{ev.location}</span>}</p>
                    </div>
                    <p className="mb-4 line-clamp-3 text-xs leading-relaxed">{ev.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
                    <Link {...l} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      {ev.actionLabel ?? "Läs mer"} <ArrowRight className="size-3.5" />
                    </Link>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => downloadIcs(ev)} aria-label="Ladda ner iCal" className="rounded-lg border border-border p-1.5 hover:bg-secondary"><Download className="size-3.5" /></button>
                      <button type="button" onClick={() => copy(ev)} aria-label="Kopiera text för Instagram/Facebook" className="rounded-lg border border-border p-1.5 hover:bg-secondary">
                        {copied === ev.id ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="on-dark mt-16 grid gap-8 rounded-3xl bg-primary-deep p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              <Share2 className="size-3.5" /> Klubbens kanaler &amp; sociala medier
            </span>
            <h3 className="text-2xl sm:text-3xl">Missa inga uppdateringar i backen</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Viktiga event visas automatiskt i webbplatsens toppvy. Följ även <strong>@lidingofreeskiers</strong> på
              Instagram och Facebook för filmer, bilder och snabba besked.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-bold hover:bg-primary-foreground/20">
                <Instagram className="size-4" /> Följ @lidingofreeskiers på Instagram
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-bold hover:bg-primary-foreground/20">
                <Facebook className="size-4" /> Följ på Facebook
              </a>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-xs lg:col-span-4">
            <p className="text-sm font-extrabold">För tränare &amp; styrelse</p>
            <p className="leading-relaxed text-primary-foreground/80">
              Vill du pusha ett event till Facebook eller Instagram? Klicka på <strong>"För SoMe"</strong> på valfritt
              event ovan för att kopiera en färdig text.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

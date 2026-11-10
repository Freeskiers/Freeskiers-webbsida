import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCmsContent } from "@/contexts/CmsPreviewContext";
import { clubEvents, eventLink } from "@/lib/club-data";

const pushed = clubEvents.filter((e) => e.isPushedTop);

export function TopEventBanner() {
  const { topBanner } = useCmsContent();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (topBanner?.enabled || pushed.length <= 1 || paused || dismissed) return;
    const t = setInterval(() => setI((p) => (p + 1) % pushed.length), 7000);
    return () => clearInterval(t);
  }, [topBanner?.enabled, paused, dismissed]);

  if (dismissed) return null;

  // Active CMS top banner takes priority when enabled
  if (topBanner?.enabled) {
    const isWarning = topBanner.type === "warning";
    const isSuccess = topBanner.type === "success";

    const bgClass = isWarning
      ? "bg-amber-600 text-amber-50 border-amber-500/30"
      : isSuccess
        ? "bg-emerald-700 text-emerald-50 border-emerald-600/30"
        : "bg-primary-deep text-primary-foreground border-primary-foreground/10";

    const badgeLabel = isWarning ? "Viktigt" : isSuccess ? "Nyhet" : "Aktuellt";
    const badgeClass = isWarning
      ? "border-amber-300/40 bg-amber-700/50 text-amber-100"
      : isSuccess
        ? "border-emerald-300/40 bg-emerald-800/50 text-emerald-100"
        : "border-accent/40 bg-accent/20 text-accent";

    const linkColor = isWarning || isSuccess
      ? "text-white underline hover:opacity-90"
      : "text-accent underline hover:text-primary-foreground";

    const isExternal =
      topBanner.linkUrl?.startsWith("http://") ||
      topBanner.linkUrl?.startsWith("https://") ||
      topBanner.linkUrl?.startsWith("mailto:");

    return (
      <div
        className={`on-dark border-b px-3 py-2 text-xs sm:px-6 ${bgClass}`}
        role="region"
        aria-label="Klubbens toppmeddelande"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${badgeClass}`}
          >
            {badgeLabel}
          </span>

          <div
            className="flex min-w-0 flex-1 items-center justify-center gap-2 truncate text-center"
            aria-live="polite"
          >
            <span className="truncate text-xs font-extrabold sm:text-sm">{topBanner.text}</span>
            {topBanner.linkUrl ? (
              isExternal ? (
                <a
                  href={topBanner.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`ml-1 inline-flex shrink-0 items-center gap-1 font-bold underline-offset-2 ${linkColor}`}
                >
                  {topBanner.linkText || "Läs mer"} <ArrowRight className="size-3" />
                </a>
              ) : (
                <Link
                  {...eventLink(topBanner.linkUrl)}
                  className={`ml-1 inline-flex shrink-0 items-center gap-1 font-bold underline-offset-2 ${linkColor}`}
                >
                  {topBanner.linkText || "Läs mer"} <ArrowRight className="size-3" />
                </Link>
              )
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/kalender"
              className="hidden items-center gap-1 rounded-full border border-primary-foreground/15 px-2.5 py-1 text-[11px] font-bold hover:bg-primary-foreground/10 sm:inline-flex"
            >
              <Calendar className="size-3 text-accent" /> Kalender
            </Link>
            <button
              type="button"
              aria-label="Dölj toppmeddelande"
              onClick={() => setDismissed(true)}
              className="rounded p-1 text-primary-foreground/60 hover:text-primary-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to clubEvents rotation
  if (pushed.length === 0) return null;
  const ev = pushed[i % pushed.length]!;

  return (
    <div
      className="on-dark border-b border-primary-foreground/10 bg-primary-deep px-3 py-2 text-xs sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Klubbens aktuella event"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/40 bg-accent/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-accent">
          <span className="hidden sm:inline">Aktuellt event</span>
          <span className="sm:hidden">Aktuellt</span>
        </span>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 truncate text-center" aria-live="polite">
          <span className="shrink-0 rounded bg-primary-foreground/10 px-2 py-0.5 text-[11px] font-bold">
            {ev.shortDate}
          </span>
          <span className="truncate text-xs font-extrabold sm:text-sm">{ev.title}</span>
          <span className="hidden truncate text-primary-foreground/70 xl:inline">– {ev.tagline}</span>
          <Link
            {...eventLink(ev.actionUrl)}
            className="ml-1 inline-flex shrink-0 items-center gap-1 font-bold text-accent underline underline-offset-2 hover:text-primary-foreground"
          >
            {ev.actionLabel ?? "Läs mer"} <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {pushed.length > 1 ? (
            <div className="flex items-center gap-1 rounded-full border border-primary-foreground/10 p-0.5">
              <button type="button" aria-label="Föregående event" onClick={() => setI((p) => (p === 0 ? pushed.length - 1 : p - 1))} className="flex size-5 items-center justify-center rounded-full hover:bg-primary-foreground/20">
                <ChevronLeft className="size-3.5" />
              </button>
              <button type="button" aria-label="Nästa event" onClick={() => setI((p) => (p + 1) % pushed.length)} className="flex size-5 items-center justify-center rounded-full hover:bg-primary-foreground/20">
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          ) : null}
          <Link to="/kalender" className="hidden items-center gap-1 rounded-full border border-primary-foreground/15 px-2.5 py-1 text-[11px] font-bold hover:bg-primary-foreground/10 sm:inline-flex">
            <Calendar className="size-3 text-accent" /> Kalender
          </Link>
          <button type="button" aria-label="Dölj toppmeddelande" onClick={() => setDismissed(true)} className="rounded p-1 text-primary-foreground/60 hover:text-primary-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

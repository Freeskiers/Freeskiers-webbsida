import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, RotateCcw, ShieldAlert } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

// Nivåväljaren från klubbens repo (commit 050ff651): tre frågor → rekommenderad grupp.

type Option = { label: string; description?: string; value: string };
type Question = { title: string; subtitle: string; options: Option[] };

const questions: Question[] = [
  {
    title: "Hur gammal är barnet när vintersäsongen startar?",
    subtitle: "Räkna med den ålder åkaren är när vintersäsongen startar i januari.",
    options: [
      { label: "Fyller 4 år eller yngre", description: "Inte fyllt 5 än", value: "toddler" },
      { label: "Fyller 5–6 år", value: "young" },
      { label: "Fyller 7–12 år", description: "Från åk 1", value: "club" },
      { label: "Fyller 13–14 år", description: "\n", value: "teen" },
      { label: "Fyller 15 år", value: "senior" },
      { label: "Fyller 16 år eller äldre", value: "adult" },
    ],
  },
  {
    title: "Kunskapsnivå?",
    subtitle: "Var ärlig – rätt nivå ger absolut mest skidglädje och trygghet!",
    options: [
      { label: "Nybörjare", description: "Har aldrig åkt skidor tidigare.", value: "beginner" },
      { label: "Avancerad nybörjare", description: "Kan få stopp på skidorna, svänga i barnbacken och åka arkarlift tillsammans med vuxen.", value: "intermediate" },
      { label: "Trygg åkare", description: "Åker obehindrat och på ett kontrollerat sätt, svänger i plog och åker ankarlift själv.", value: "advanced" },
      { label: "Park", description: "Hoppar gärna på kickers, provar rails/boxar och vill utveckla hopp och trick.", value: "freestyle" },
      { label: "Avancerad åkare", description: "Åker säkert i alla backar, med parallella skidor och har god fartkontroll.", value: "expert" },
    ],
  },
  {
    title: "Vad vill åkaren framför allt göra?",
    subtitle: "Välj det som lockar mest inför kommande säsong.",
    options: [
      { label: "Träning på helger", description: "5 intensiva och roliga lördagar eller söndagar i Ekholmsnäsbacken.", value: "weekend" },
      { label: "Träning på vardagar", description: "Träna 1–2 vardagskvällar i veckan hela vintern.", value: "club" },
      { label: "Egen tränare – privatlektion", description: "Personlig coachning anpassade efter dina behov.", value: "private" },

    ],
  },
];

// För åkare som fyller 5–6 år visas bara skidskolans tre grupper – park och skidklubb kommer senare.
const youngHidden = new Set(["freestyle", "expert"]);
function optionsFor(q: Question, answers: string[]) {
  if (answers[0] === "young") return q.options.filter((o) => !youngHidden.has(o.value));
  return q.options;
}


type Result = {
  badge: string;
  title: string;
  desc: string;
  to: "/helgskidskola" | "/skidklubb" | "/privatlektion";
  linkText: string;
  details: string[];
};

// Åldersregler utgår från vilken ålder åkaren fyller det år vintersäsongen startar i januari.
// Helgskidskola: fyller minst 5 år, ingen övre gräns. Skidklubb: fyller 7–14 år (från åk 1) + minimikrav.
// Privatlektion lyfts för den som är 13+ och nybörjare – i grupperna är de flesta yngre.
function privateResult(older: boolean): Result {
  return {
    badge: "Privatlektion • Egen tränare",
    title: "Privatlektion",
    desc: older
      ? "I skidskolans grupper är de flesta yngre än du. Med en egen tränare övar du på dina villkor och tar stora kliv på kort tid."
      : "Personlig coachning med en av klubbens instruktörer – i mån av tid och ledig kapacitet under säsongen.",
    to: "/privatlektion",
    linkText: "Läs om privatlektioner",
    details: ["1 eller 2 personer", "60 minuter", "Ekholmsnäsbacken, Lidingö", "Bokning direkt på sidan"],
  };
}

function recommend(a: string[]): Result {

  const [age, skill, goal] = a;
  const skilled = skill === "advanced" || skill === "freestyle" || skill === "expert";

  if (age === "toddler") {
    return {
      badge: "Inte gammal nog än",
      title: "Välkommen nästa säsong!",
      desc: "Helgskidskolan tar emot barn som fyller minst 5 år det år skidskolan äger rum. Kom tillbaka igen när barnet har fyllt fem!",
      to: "/helgskidskola",
      linkText: "Läs om Helgskidskolan",
      details: ["Barnet ska fylla minst 5 år", "Välkommen igen nästa säsong"],
    };
  }

  if (age === "adult") return privateResult(true);

  if (skill === "expert" && goal !== "private") {
    return {
      badge: "Skidklubb • Avancerad åkare",
      title: "Freeskiers Skidklubb",
      desc: "Du åker redan tryggt i alla backar \u2013 då är Freeskiers Skidklubb nästa steg. Där tränar du friåkning, hopp, park och carving med klubbens tränare i Ekholmsnäsbacken.",
      to: "/skidklubb",
      linkText: "Se Skidklubben & minimikraven",
      details: ["Från åk 1 (fyller 7 år)", "Till och med året man fyller 15", "Ska uppnå skidklubbens minimikrav", "Hjälm & ryggskydd krävs"],
    };
  }

  const older = age === "teen" || age === "senior";
  if (goal === "private" || (older && skill === "beginner")) return privateResult(older);

  if ((age === "club" || age === "teen") && skilled && goal !== "weekend") {

    return {
      badge: "Skidklubb • Vardagar",
      title: "Freeskiers Skidklubb",
      desc: "För åkare som vill träna regelbunden friåkning, carving, hopp, rails och park under vardagskvällar i Ekholmsnäsbacken. Åkaren behöver uppnå minimikraven på skidklubbens sida.",
      to: "/skidklubb",
      linkText: "Se Skidklubben & minimikraven",
      details: ["Från åk 1 (fyller 7 år)", "Till och med året man fyller 15", "Ska uppnå skidklubbens minimikrav", "Hjälm & ryggskydd krävs"],
    };
  }

  const ageNote = "Fyller minst 5 år – ingen övre åldersgräns";

  if (skill === "beginner") {
    return {
      badge: "Helgskidskola • Grön Grupp (Nybörjare)",
      title: "Helgskidskola – Grön Grupp",
      desc: "Perfekt för den som tar sina första svängar eller behöver bygga självförtroende i barnbacken och liften. Trygga instruktörer och massor av skidglädje!",
      to: "/helgskidskola",
      linkText: "Se Helgskidskolan & Anmäl",
      details: [ageNote, "5 helgtillfällen i jan–feb", "Inga förkunskaper krävs", "Hjälm krävs, ryggskydd rekommenderas"],
    };
  }
  if (skill === "intermediate") {
    return {
      badge: "Helgskidskola • Blå Grupp (Avancerad nybörjare)",
      title: "Helgskidskola – Blå Grupp",
      desc: "För den som kan få stopp på skidorna och vill lära sig stanna kontrollerat, svänga och åka lift själv.",
      to: "/helgskidskola",
      linkText: "Se Helgskidskolan & Anmäl",
      details: [ageNote, "5 helger i jan–feb", "Krav: kan få stopp på skidorna"],
    };
  }
  return {
    badge: "Helgskidskola • Röd Grupp (Fortsättning)",
    title: "Helgskidskola – Röd Grupp",
    desc: "För den som åker kontrollerat och lift själv, och vill svänga med mer parallella skidor och klara brantare backar.",
    to: "/helgskidskola",
    linkText: "Se Helgskidskolan & Anmäl",
    details: [ageNote, "5 helger i jan–feb", "Krav: åker kontrollerat & lift själv"],
  };
}

export function LevelFinder({ onNavigate, modal = false }: { onNavigate?: () => void; modal?: boolean }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  // "Fyller 4 år eller yngre" och "Fyller 16 år eller äldre" avslutar testet direkt.
  const done = step >= questions.length || answers[0] === "toddler" || answers[0] === "adult";
  const result = done ? recommend(answers) : null;
  const q = done ? undefined : questions[step];

  return (
    <div className={modal ? "" : "rounded-3xl border border-border bg-background p-6 shadow-card sm:p-10"}>
      <div className="mb-3">
        <span className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          Nivåväljaren • 1 min skidtest
        </span>
        <h3 className="text-lg font-black sm:text-xl">{done ? "Ditt resultat & Rekommenderad grupp" : q?.title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
          {done ? "Här är den verksamhet som passar åkarens ålder och erfarenhet bäst." : q?.subtitle}
        </p>
      </div>

      {!done && q ? (
        <>
          <div className="mb-3 flex items-center gap-2">
            {questions.map((x, i) => (
              <div key={x.title} className={`h-1.5 flex-1 rounded-full transition-colors ${i === step ? "bg-accent" : i < step ? "bg-primary-deep" : "bg-muted"}`} />
            ))}
            <span className="ml-2 text-xs font-bold text-muted-foreground">{step + 1} / {questions.length}</span>
          </div>
          <div className="space-y-2">
            {optionsFor(q, answers).map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setAnswers([...answers, o.value])}
                className="group flex w-full items-center justify-between gap-3 rounded-xl border border-border px-3.5 py-2.5 text-left transition-colors hover:border-accent hover:bg-secondary/60"
              >
                <span>
                  <span className="block text-sm font-extrabold text-heading group-hover:text-primary sm:text-base">{o.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{o.description}</span>
                </span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-2 text-xs font-semibold text-muted-foreground hover:text-primary">
              ← Föregående fråga
            </button>
          ) : null}
        </>
      ) : null}

      {result ? (
        <div className="space-y-3">
          <div className="rounded-2xl border border-accent/30 bg-secondary/50 p-4">
            <span className="inline-flex rounded-full bg-primary-deep px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">{result.badge}</span>
            <h4 className="mt-2 text-lg font-black sm:text-xl">{result.title}</h4>
            <p className="mt-2 text-sm leading-relaxed">{result.desc}</p>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {result.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm font-medium">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>Hjälm är obligatoriskt på all träning. Ryggskydd krävs i skidklubben och rekommenderas i skidskolan. Osäker? Fråga Ekis eller kontakta oss.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" className="rounded-full" asChild>
              <Link to={result.to} onClick={() => onNavigate?.()}>
                {result.linkText} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => setAnswers([])}>
              <RotateCcw className="size-4" /> Gör om testet
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const LevelFinderContext = createContext<{ openLevelFinder: () => void }>({ openLevelFinder: () => {} });

export function useLevelFinder() {
  return useContext(LevelFinderContext);
}

export function LevelFinderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openLevelFinder = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openLevelFinder }), [openLevelFinder]);

  return (
    <LevelFinderContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[94vh] overflow-y-auto rounded-3xl p-5 sm:max-w-xl">
          <DialogTitle className="sr-only">Hitta rätt nivå</DialogTitle>
          <DialogDescription className="sr-only">Tre snabba frågor som föreslår rätt grupp.</DialogDescription>
          <LevelFinder modal onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </LevelFinderContext.Provider>
  );
}

export function LevelFinderButton({ label = "Hitta rätt nivå", className, variant = "outline" }: { label?: string; className?: string; variant?: "outline" | "cta" | "onDark" }) {
  const { openLevelFinder } = useLevelFinder();
  return (
    <Button type="button" variant={variant} className={`rounded-full ${className ?? ""}`} onClick={openLevelFinder}>
      {label}
    </Button>
  );
}

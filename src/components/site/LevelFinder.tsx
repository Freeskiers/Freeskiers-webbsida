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
      { label: "Fyller 7–10 år", description: "Från åk 1 till åk 4", value: "child" },
      { label: "Fyller 11–15 år", description: "Från åk 5 till åk 9", value: "teen" },
      { label: "Fyller 16 år eller äldre", value: "adult" },
    ],
  },
  {
    title: "Kunskapsnivå?",
    subtitle: "Var ärlig – rätt nivå ger absolut mest skidglädje och trygghet!",
    options: [
      { label: "Nybörjare", description: "Har aldrig åkt skidor tidigare.", value: "beginner" },
      { label: "Avancerad nybörjare", description: "Kan få stopp på skidorna, svänga i barnbacken och åka ankarlift tillsammans med vuxen.", value: "intermediate" },
      { label: "Fortsättning", description: "Åker på ett kontrollerat sätt, svänger i plog och åker ankarlift själv. Vill lära sig svänga med mer parallella skidor, få en säkrare åkning och klara av brantare backar.", value: "advanced" },
      { label: "Medelgod åkare", description: "Bättre än fortsättning och man kan åka med parallella skidor.", value: "skidklubb_mid" },
      { label: "Avancerad åkare", description: "Åker säkert i alla backar, med parallella skidor och har god fartkontroll.", value: "expert" },
      { label: "Park", description: "Hoppar gärna på kickers, provar rails/boxar och vill utveckla hopp och trick.", value: "freestyle" },
    ],
  },
  {
    title: "Vad vill åkaren framför allt göra?",
    subtitle: "Välj det som lockar mest inför kommande säsong.",
    options: [
      { label: "Träning på helger", description: "5 intensiva och roliga lördagar eller söndagar i Ekholmsnäsbacken (5–10 år).", value: "weekend" },
      { label: "Träning på vardagar", description: "Träna 1–2 vardagskvällar i veckan hela vintern i Skidklubben (7–15 år).", value: "club" },
      { label: "Egen tränare – privatlektion", description: "Personlig coachning anpassad efter dina behov (från 4 år).", value: "private" },
    ],
  },
];

// För åkare som fyller 5–6 år visas bara skidskolans tre grupper – park och skidklubb kommer senare.
// För medelgoda/avancerade åkare och park visas inte Helgskidskolan ("weekend"), eftersom Helgskidskolan bara är upp till nivån Fortsättning.
const youngHidden = new Set(["skidklubb_mid", "freestyle", "expert"]);
function optionsFor(q: Question, answers: string[], step: number) {
  if (step === 1 && answers[0] === "young") {
    return q.options.filter((o) => !youngHidden.has(o.value));
  }
  if (step === 2 && (answers[1] === "skidklubb_mid" || answers[1] === "expert" || answers[1] === "freestyle")) {
    return q.options.filter((o) => o.value !== "weekend");
  }
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
// Helgskidskola: 5–10 år (övre åldersgräns 10 år).
// Skidklubb: fyller 7–15 år (från åk 1 till åk 9) + uppfyller minimikrav.
// Privatlektion: rekommenderas för alla åkare 11 år och äldre som inte går i Skidklubben, samt för vuxna.
function privateResult(type: "overAgeHelg" | "adult" | "default"): Result {
  if (type === "overAgeHelg") {
    return {
      badge: "Privatlektion • Egen tränare",
      title: "Privatlektion",
      desc: "Helgskidskolan har en övre åldersgräns på 10 år. För åkare från 11 år rekommenderar vi privatlektion med en egen instruktör – det ger bäst utveckling, personlig coachning och snabbare framsteg anpassade efter åkarens förutsättningar.",
      to: "/privatlektion",
      linkText: "Läs om privatlektioner & boka",
      details: ["Helgskidskolans maxålder är 10 år", "1 eller 2 personer", "60 minuter", "Ekholmsnäsbacken, Lidingö"],
    };
  }

  if (type === "adult") {
    return {
      badge: "Privatlektion • Vuxen",
      title: "Privatlektion",
      desc: "I klubbens barn- och ungdomsgrupper är åkarna yngre. Med en egen instruktör övar du på dina villkor och tar stora kliv på kort tid.",
      to: "/privatlektion",
      linkText: "Läs om privatlektioner & boka",
      details: ["1 eller 2 personer", "60 minuter", "Ekholmsnäsbacken, Lidingö", "Bokning direkt på sidan"],
    };
  }

  return {
    badge: "Privatlektion • Egen tränare",
    title: "Privatlektion",
    desc: "Personlig coachning med en av klubbens instruktörer – anpassas helt efter åkarens nivå, mål och önskemål.",
    to: "/privatlektion",
    linkText: "Läs om privatlektioner & boka",
    details: ["1 eller 2 personer", "60 minuter", "Ekholmsnäsbacken, Lidingö", "Bokning direkt på sidan"],
  };
}

export function recommend(a: string[]): Result {
  const [age, skill, goal] = a;

  if (age === "toddler") {
    return {
      badge: "Inte gammal nog än för Helgskidskolan",
      title: "Privatlektion från 4 år",
      desc: "Helgskidskolan tar emot barn som fyller 5–10 år det år skidskolan äger rum. Är barnet 4 år går det däremot bra att boka privatlektion!",
      to: "/privatlektion",
      linkText: "Läs om privatlektioner (från 4 år)",
      details: ["Privatlektion från 4 år", "Helgskidskola från 5 år", "Välkommen till grupp nästa säsong"],
    };
  }

  if (age === "adult") return privateResult("adult");

  if (goal === "private") {
    return privateResult(age === "teen" ? "overAgeHelg" : "default");
  }

  // Åkare över 10 år (11–15 år)
  if (age === "teen") {
    const isClubCandidate =
      (skill === "advanced" || skill === "skidklubb_mid" || skill === "expert" || skill === "freestyle") &&
      goal === "club";
    const isSkidklubbLevel = skill === "skidklubb_mid" || skill === "expert" || skill === "freestyle";

    if (isClubCandidate || isSkidklubbLevel) {
      return {
        badge:
          skill === "expert"
            ? "Skidklubb • Avancerad åkare"
            : skill === "freestyle"
            ? "Skidklubb • Park & friåkning"
            : skill === "skidklubb_mid"
            ? "Skidklubb • Medelgod åkare"
            : "Skidklubb • Vardagar",
        title: "Freeskiers Skidklubb",
        desc: "För åkare i åk 5–9 som åker säkert i hela backen och vill träna regelbunden friåkning, skärande sväng, hopp, rails och park under vardagskvällar i Ekholmsnäsbacken.",
        to: "/skidklubb",
        linkText: "Se Skidklubben & minimikraven",
        details: [
          "Årskurs 5–9 (fyller 11–15 år)",
          "Måndagar & onsdagar kvällar",
          "Ska uppnå skidklubbens minimikrav",
          "Hjälm & ryggskydd krävs",
        ],
      };
    }

    // Alla andra 11–15-åringar (nybörjare, avancerade nybörjare eller som vill ha helgträning)
    // Helgskidskolan har övre gräns 10 år -> hänvisa till privatlektion!
    return privateResult("overAgeHelg");
  }

  // Åkare 7–10 år (child) med medelgod, avancerad eller park-vana
  if ((skill === "skidklubb_mid" || skill === "expert" || skill === "freestyle") && age === "child") {
    return {
      badge:
        skill === "expert"
          ? "Skidklubb • Avancerad åkare"
          : skill === "freestyle"
          ? "Skidklubb • Park & friåkning"
          : "Skidklubb • Medelgod åkare",
      title: "Freeskiers Skidklubb",
      desc: "Helgskidskolan sträcker sig upp till nivån Fortsättning. För dig som redan åker med parallella skidor eller vill satsa på park, hopp och skärande sväng är Freeskiers Skidklubb rätt steg!",
      to: "/skidklubb",
      linkText: "Se Skidklubben & minimikraven",
      details: [
        "Från åk 1 (fyller 7 år)",
        "Ska uppnå skidklubbens minimikrav",
        "Hjälm & ryggskydd krävs",
      ],
    };
  }

  // Åkare 7–10 år som vill träna vardagskvällar i klubben och har god skidvana
  if (age === "child" && skill === "advanced" && goal === "club") {
    return {
      badge: "Skidklubb • Vardagar",
      title: "Freeskiers Skidklubb",
      desc: "För åkare i åk 1–4 som vill träna regelbunden friåkning, skärande sväng, hopp, rails och park under vardagskvällar i Ekholmsnäsbacken. Åkaren behöver uppnå minimikraven på skidklubbens sida.",
      to: "/skidklubb",
      linkText: "Se Skidklubben & minimikraven",
      details: [
        "Åk 1–4 (fyller 7–10 år)",
        "Träning 1 kväll/vecka",
        "Ska uppnå skidklubbens minimikrav",
        "Hjälm & ryggskydd krävs",
      ],
    };
  }

  // Resterande barn 5–10 år -> Helgskidskolan (Grön, Blå eller Röd grupp)
  const ageNote = "Fyller 5–10 år (övre åldersgräns 10 år)";

  if (skill === "beginner") {
    return {
      badge: "Helgskidskola • Grön Grupp (Nybörjare)",
      title: "Helgskidskola – Grön Grupp",
      desc: "Perfekt för barn (5–10 år) som tar sina första svängar eller behöver bygga självförtroende i barnbacken och liften. Trygga instruktörer och massor av skidglädje!",
      to: "/helgskidskola",
      linkText: "Se Helgskidskolan & Anmäl",
      details: [ageNote, "5 helgtillfällen i jan–feb", "Kunna ta instruktioner på svenska", "Inga förkunskaper krävs", "Hjälm krävs, ryggskydd rekommenderas"],
    };
  }
  if (skill === "intermediate") {
    return {
      badge: "Helgskidskola • Blå Grupp (Avancerad nybörjare)",
      title: "Helgskidskola – Blå Grupp",
      desc: "För barn (5–10 år) som kan få stopp på skidorna och vill lära sig stanna på ett mer kontrollerat sätt, svänga och åka lift själv.",
      to: "/helgskidskola",
      linkText: "Se Helgskidskolan & Anmäl",
      details: [ageNote, "5 helger i jan–feb", "Kunna ta instruktioner på svenska", "Krav: kan få stopp på skidorna & åker lift med vuxen"],
    };
  }
  return {
    badge: "Helgskidskola • Röd Grupp (Fortsättning)",
    title: "Helgskidskola – Röd Grupp",
    desc: "För barn (5–10 år) som åker på ett kontrollerat sätt, svänger i plog och åker lift själv. Vi lär oss svänga med mer parallella skidor, få en säkrare åkning och klara av brantare backar.",
    to: "/helgskidskola",
    linkText: "Se Helgskidskolan & Anmäl",
    details: [ageNote, "5 helger i jan–feb", "Kunna ta instruktioner på svenska", "Svänga med mer parallella skidor", "Klara brantare backar"],
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
            {optionsFor(q, answers, step).map((o) => (
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

export function LevelFinderButton({ label = "Hitta rätt nivå", className, variant = "outline", size }: { label?: string; className?: string; variant?: "outline" | "cta" | "onDark"; size?: "default" | "sm" | "lg" | "xl" }) {
  const { openLevelFinder } = useLevelFinder();
  return (
    <Button type="button" variant={variant} size={size} className={`rounded-full ${className ?? ""}`} onClick={openLevelFinder}>
      {label}
    </Button>
  );
}

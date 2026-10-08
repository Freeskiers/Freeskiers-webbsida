import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ekisAvatar from "@/assets/ekis-yeti-avatar.png.asset.json";
import ekisFull from "@/assets/ekis-yeti-transparent.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EKIS_OPEN_EVENT } from "@/lib/ekis-chat";

type Msg = { from: "ekis" | "user"; text: string };

const knowledge: { keys: string[]; answer: string }[] = [
  {
    keys: ["fritidskort", "bidrag", "stöd"],
    answer:
      "Fritidskortet funkar hos oss! Anmäl barnet som vanligt via Anmäl & Boka och registrera sedan aktiviteten i Fritidskortet-appen. Behöver du organisationsnummer eller kvitto hör du av dig till admin@lidingofreeskiers.se.",
  },
  {
    keys: ["boka", "anmäl", "plats", "kö"],
    answer:
      "Så bokar du: 1) klicka på Anmäl & Boka, 2) skapa konto, välj grupp (helgskidskola, skidklubb eller höstsäsong), 3) betala. Platserna är först till kvarn och släpps när anmälan öppnar. Privatlektioner erbjuds i mån av tid – skicka en förfrågan via Kontakt.",
  },
  {
    keys: ["nivå", "grupp", "passar", "nybörjare"],
    answer:
      "Kort guide: nybörjare och osäkra åkare börjar i Helgskidskolan. Kan barnet svänga och stanna själv i hela backen och vill hoppa – då är Skidklubben rätt. Gör skidtestet ”Hitta rätt nivå” i menyn så får du ett förslag!",
  },
  {
    keys: ["hjälm", "ryggskydd", "utrustning", "skidor", "goggles", "kläder"],
    answer:
      "Hjälm är obligatoriskt på all vår träning. I skidklubben krävs även ryggskydd – i skidskolan rekommenderar vi det. Egna skidor, pjäxor och stavar behövs – bra begagnat hittar du på Skidbytardagen. Goggles slår solglasögon varje gång!",
  },
  {
    keys: ["snö", "väder", "inställt", "inställt", "stängd", "kallt"],
    answer:
      "Vid för lite snö eller stängd backe flyttar vi tillfället till ett nytt datum – ingen träning försvinner. Du får besked via e-post samma dag. Dagens snöläge står i banderollen högst upp på sajten.",
  },
  {
    keys: ["skada", "pengar tillbaka", "återbetal", "avboka", "sjuk"],
    answer:
      "Vi betalar inte tillbaka avgiften vid skada eller sjukdom, eftersom tränare och platser redan är bokade. Vid längre skada försöker vi hitta en lösning, som plats i en senare grupp.",
  },
  {
    keys: ["försäkring", "skidförbundet", "olycksfall"],
    answer:
      "Alla medlemmar är olycksfallsförsäkrade via Svenska Skidförbundets licensförsäkring under organiserad träning och tävling. Fri åkning utanför träningstid täcks inte, så en egen olycksfallsförsäkring är klokt.",
  },
  {
    keys: ["pris", "kostar", "avgift", "medlem"],
    answer:
      "Säsongens avgifter visas på klubbens anmälningssida när anmälan öppnar. Liftkort ingår inte och köps separat via Ekholmsnäsbacken. Fritidskortet kan användas för deltagar- och medlemsavgifter.",
  },
  {
    keys: ["privat", "tränare", "lektion"],
    answer:
      "Vissa av våra tränare erbjuder privatlektioner i mån av tid. Kontakta oss med åkarens ålder och nivå så hjälper vi till att matcha!",
  },
  {
    keys: ["resa", "läger", "kläppen", "rookie", "tävling"],
    answer:
      "Vi arrangerar Rookie Series Stockholm i Ekholmsnäsbacken tillsammans med Svenska Skidförbundet – läs mer på sidan Rookie Series. Håll koll på Instagram eller mejla admin@lidingofreeskiers.se.",
  },
];

const quizSteps = [
  {
    q: "Kul! Fråga 1: Kan barnet svänga och stanna själv i hela backen?",
    options: ["Ja, absolut", "Lite osäkert", "Nej, nybörjare"],
  },
  {
    q: "Fråga 2: Hoppar barnet gärna på små hopp?",
    options: ["Ja, hoppar redan", "Vill testa", "Nej, helst inte"],
  },
  {
    q: "Sista frågan: Hur många dagar i veckan vill ni åka?",
    options: ["Två kvällar", "En dag i veckan", "Bara ibland"],
  },
] as const;

const quizResults = [
  "Då är Freeskiers Skidklubb helt rätt – parkträning två kvällar i veckan!",
  "Helgskidskolan passar perfekt, och en privatlektion är ett bra extra kliv.",
  "Börja i helgskidskolan. Lugnt tempo, liten grupp och massor av skidglädje!",
];

function findAnswer(text: string) {
  const t = text.toLowerCase();
  const hit = knowledge.find((k) => k.keys.some((key) => t.includes(key)));
  if (hit) return hit.answer;
  return "Det där kan jag inte svara på än, men klubben fixar det! Mejla admin@lidingofreeskiers.se eller titta på Kontakt-sidan. Fråga mig gärna om anmälan, priser, utrustning, snöläge, försäkring eller Fritidskortet.";
}

export function EkisChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [quiz, setQuiz] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "ekis",
      text: "Hej! Jag är Ekis, klubbens yeti. Fråga mig om anmälan, priser, utrustning, snöläget, försäkring eller Fritidskortet – eller starta nivåquizet!",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, quiz]);

  // Öppna chatten från knappar i headern och på sidorna.
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(EKIS_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(EKIS_OPEN_EVENT, handleOpen);
  }, []);


  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { from: "user", text: value }, { from: "ekis", text: findAnswer(value) }]);
    setInput("");
  }

  function answerQuiz(index: number) {
    const step = quiz ?? 0;
    const current = quizSteps[step]!;
    const score = quizScore + index;
    setMessages((m) => [...m, { from: "user", text: current.options[index] ?? "" }]);
    if (step === quizSteps.length - 1) {
      const bucket = score <= 2 ? 0 : score <= 4 ? 1 : 2;
      setMessages((m) => [...m, { from: "ekis", text: quizResults[bucket] ?? "" }]);
      setQuiz(null);
      setQuizScore(0);
      return;
    }
    setQuizScore(score);
    setQuiz(step + 1);
  }

  return (
    <>
      {open ? (
        <div className="fixed inset-x-3 bottom-3 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[24rem]">
          <div className="flex items-center gap-3 gradient-alpine px-4 py-3 text-primary-foreground">
            <img
              src={ekisAvatar.url}
              alt="Ekis the Yeti"
              width={297}
              height={297}
              loading="lazy"
              className="size-10 rounded-full bg-primary-foreground/15 object-contain"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold">Ekis the Yeti</p>
              <p className="text-xs text-primary-foreground/80">Klubbens hjälpsamma maskot</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Stäng chatten"
              className="ml-auto cursor-pointer rounded-lg p-1.5 hover:bg-primary-foreground/15"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-snow px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.from === "ekis"
                    ? "bg-background text-foreground shadow-sm"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}

            {quiz !== null ? (
              <div className="max-w-[92%] space-y-2 rounded-2xl bg-background px-3.5 py-3 text-sm shadow-sm">
                <p>{quizSteps[quiz]!.q}</p>
                <div className="grid gap-2">
                  {quizSteps[quiz]!.options.map((o, i) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => answerQuiz(i)}
                      className="cursor-pointer rounded-lg border border-border px-3 py-2 text-left text-xs font-medium hover:border-accent hover:bg-secondary"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border bg-background px-3 py-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {["Nivåer", "Utrustning", "Inställt pga väder", "Fritidskortet"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => send(chip)}
                  className="cursor-pointer rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary hover:bg-accent/20"
                >
                  {chip}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setQuizScore(0);
                  setQuiz(0);
                }}
                className="cursor-pointer rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Nivåquiz
              </button>
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv din fråga till Ekis…"
                aria-label="Din fråga"
              />
              <Button type="submit" variant="cta" size="icon" aria-label="Skicka">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chatta med Ekis"
        title="Chatta med Ekis"
        className={`fixed right-4 bottom-4 z-40 flex cursor-pointer items-center gap-2 rounded-full bg-cta py-2 pr-4 pl-1.5 text-sm font-semibold text-cta-foreground shadow-xl transition-transform duration-300 hover:-translate-y-0.5 sm:right-5 sm:bottom-5 ${open ? "hidden" : ""}`}
      >
        <img
          src={ekisFull.url}
          alt=""
          width={364}
          height={443}
          loading="lazy"
          className="h-10 w-auto object-contain drop-shadow"
        />
        <span className="whitespace-nowrap lg:hidden">Hjälp</span>
        <span className="hidden whitespace-nowrap lg:inline">Chatta med Ekis</span>
      </button>
    </>
  );
}

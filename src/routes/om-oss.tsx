import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, Heart, Mail, Mountain, Users } from "lucide-react";
import { useState } from "react";

import teamPhoto from "@/assets/photos/coaches-group.jpg";
import { ClubForm } from "@/components/site/ClubForm";
import { PageBanner } from "@/components/site/PageBanner";
import {
  board,
  type CoachCategory,
  coaches,
  CONTACT_EMAIL,
  europeanSnowsportSamarbete,
} from "@/lib/club-data";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — vision, tränare och styrelse | Lidingö Freeskiers" },
      { name: "description", content: "IK Lidingö Freeskiers grundades 2001. Möt våra tränare och instruktörer, styrelsen och bli tränare i klubben." },
      { property: "og:title", content: "Om Lidingö Freeskiers" },
      { property: "og:description", content: "Vår vision, våra tränare och hur du blir en av oss." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const coachFilters: { id: "all" | CoachCategory; label: string }[] = [
  { id: "all", label: "Alla" },
  { id: "huvudtranare", label: "Huvudtränare" },
  { id: "arena", label: "Arena" },
  { id: "tranare", label: "Tränare" },
];

function AboutPage() {
  const [coachCategory, setCoachCategory] = useState<"all" | CoachCategory>("all");
  const matchesFilter = (c: (typeof coaches)[number], filter: "all" | CoachCategory) => {
    if (filter === "all") return true;
    if (filter === "arena") return Boolean(c.arena);
    if (filter === "huvudtranare") return c.role === "Huvudtränare";
    return c.category === filter;
  };
  const filteredCoaches = coaches.filter((c) => matchesFilter(c, coachCategory));

  return (
    <>
      <PageBanner photo={teamPhoto} alt="Åkare i Ekholmsnäsbacken" title="Om Lidingö Freeskiers" />
      <section className="gradient-snow">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="max-w-3xl text-lg leading-relaxed">
            IK Lidingö Freeskiers grundades 2001 och har vuxit till att bli Sveriges största
            friåkningsklubb för barn och unga. Vår idé är enkel: vi vill ge alla chansen att uppleva
            samma gränslösa glädje och frihet på snö som vi själva känner.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-semibold text-heading">
            Skidglädje utan prestationsångest.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-5 px-4 pb-16 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Heart, t: "Glädje först", d: "Skratt och lek är den bästa tekniken." },
            { icon: Users, t: "Gemenskap", d: "Kompisar i och utanför backen." },
            { icon: Mountain, t: "Utveckling", d: "Alla blir bättre, i sin egen takt." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="surface-card p-6 text-center">
              <Icon className="mx-auto size-7 text-primary" />
              <h2 className="mt-3 text-lg">{t}</h2>
              <p className="mt-1 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-10">
          <h2 className="text-3xl">Stolt medlem i Svenska Skidförbundet &amp; RF</h2>
          <p className="mt-3 max-w-3xl leading-relaxed">
            IK Lidingö Freeskiers är en auktoriserad idrottsförening ansluten till <strong><a href="http://www.skidor.se" target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">Svenska Skidförbundet</a></strong> (SSF) och <strong><a href="https://www.rf.se" target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">Riksidrottsförbundet</a></strong> (RF).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-eyebrow">Klubbens förebilder</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Våra tränare &amp; ledare</h2>
          </div>
          <p className="max-w-md text-sm">
            Klubbens tränare är äldre ungdomar och erfarna åkare som själva vuxit upp i föreningen.
            Tryggt, inspirerande och fullt av skidglädje i backen!
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {coachFilters.map((f) => {
            const count = coaches.filter((c) => matchesFilter(c, f.id)).length;
            const active = coachCategory === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCoachCategory(f.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "surface-card bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-primary"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCoaches.map((c) => (
            <article key={c.name} className="surface-card flex items-center gap-3.5 bg-card p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-base font-bold text-primary">
                {c.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold text-heading">{c.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-primary">
                    {c.role}
                  </span>
                  {c.arena ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-primary">
                      {c.arena}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2" id="bli-tranare">
        <div>
          <p className="text-eyebrow">Bli tränare</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Vill du bli tränare i Lidingö Freeskiers?</h2>
          <p className="mt-4 leading-relaxed">
            För dig som går i nian (åk 9+). Att vara tränare hos oss är ett fantastiskt extrajobb där
            du får sprida skidglädje till barn, utveckla ditt eget ledarskap och bli en viktig del av
            klubbgemenskapen i Lidingö Freeskiers.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["God skidkunskap & erfarenhet:", "Du är en trygg och skicklig skidåkare som behärskar pister väl och har en stabil skidteknik."],
              ["Erfarenhet av att arbeta med barn:", "Tidigare erfarenhet som ungdomsledare, barnpassning, sportaktiviteter eller föreningsliv är ett stort plus."],
              ["Skräddarsydda instruktörskurser:", "Vi syr ihop certifierade instruktörskurser med externa utbildare (SLAO/SSF) som man bekostar själv. Efter genomförd kurs och godkänt resultat finns goda möjligheter till tränaruppdrag!"],
              ["Schysst timarvode & tillgång till ledarkläder.", ""],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span><strong className="text-heading">{t}</strong> {d}</span>
              </li>
            ))}
          </ul>
        </div>
        <ClubForm
          title="Ansök som tränare"
          description="Berätta om din skidåkning och din erfarenhet av barn och ledarskap. Vi i ledningen går igenom anmälningarna och återkopplar inför kommande instruktörskurser under hösten."
          submitLabel="Skicka ansökan"
          consent="Jag är införstådd med att instruktörsutbildningen genomförs tillsammans med extern utbildare och bekostas av deltagaren själv."
          fields={[
            { name: "name", label: "Namn", required: true },
            { name: "email", label: "E-post", type: "email", required: true },
            { name: "phone", label: "Telefon" },
            { name: "birthYear", label: "Födelseår" },
            { name: "skiExperience", label: "Skidkunskap & åkerfarenhet", type: "textarea", required: true, placeholder: "Hur länge har du åkt skidor/snowboard? Hur är din vana i backe/park/carving? Har du åkt i Freeskiers tidigare?" },
            { name: "childExperience", label: "Erfarenhet av att arbeta med barn & unga", type: "textarea", placeholder: "T.ex. barnpassning, idrottsledare, hjälpledare i skola eller förening..." },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <figure className="surface-card overflow-hidden">
          <img
            src={teamPhoto}
            alt="Åkare och ledare i Ekholmsnäsbacken"
            loading="lazy"
            width={1800}
            height={1199}
            className="h-64 w-full object-cover sm:h-80"
          />
        </figure>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6" id="european-snowsport">
        <div className="surface-card bg-card p-6 sm:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="text-eyebrow">{europeanSnowsportSamarbete.eyebrow}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">
                {europeanSnowsportSamarbete.title}
              </h2>
              <h3 className="mt-3 text-xl font-bold text-primary">
                {europeanSnowsportSamarbete.headline}
              </h3>

              <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                {europeanSnowsportSamarbete.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-heading">
                  {europeanSnowsportSamarbete.infoPrompt}
                </p>
                <a
                  href={europeanSnowsportSamarbete.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary underline hover:opacity-80 sm:text-base"
                >
                  {europeanSnowsportSamarbete.externalUrl}
                  <ExternalLink className="size-4" />
                </a>
              </div>

              <div className="mt-6 rounded-2xl bg-secondary/70 p-5">
                <h4 className="text-base font-bold text-heading">
                  {europeanSnowsportSamarbete.contactTitle}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed">
                  {europeanSnowsportSamarbete.contactText}{" "}
                  <a
                    href={`mailto:${europeanSnowsportSamarbete.contactEmail}`}
                    className="inline-flex items-center gap-1 font-bold text-primary underline"
                  >
                    <Mail className="size-3.5" />
                    {europeanSnowsportSamarbete.contactEmail}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center rounded-2xl bg-background p-6 shadow-sm">
                <img
                  src={europeanSnowsportSamarbete.logo}
                  alt={europeanSnowsportSamarbete.logoAlt}
                  loading="lazy"
                  className="h-44 w-auto object-contain sm:h-52"
                />
              </div>
              <figure className="overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={europeanSnowsportSamarbete.photo}
                  alt={europeanSnowsportSamarbete.photoAlt}
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card" id="styrelsen">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-eyebrow">Styrelsen</p>
          <h2 className="mt-2 text-3xl">Styrelsen &amp; föreningen</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {board.map((b) => (
              <li key={b.name} className="surface-card p-5">
                <p className="font-semibold text-heading">{b.name}</p>
                {b.role ? (
                  <p className="text-sm text-muted-foreground">{b.role}</p>
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            Vill du engagera dig som förälder eller har idéer kring klubbens utveckling? Hör gärna
            av dig till styrelsen via{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

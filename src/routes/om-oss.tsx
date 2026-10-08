import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Heart, Mountain, Users } from "lucide-react";

import teamPhoto from "@/assets/photos/coaches-group.jpg";
import { ClubForm } from "@/components/site/ClubForm";
import { PageBanner } from "@/components/site/PageBanner";
import { board, coaches, CONTACT_EMAIL } from "@/lib/club-data";

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

function AboutPage() {
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
            { icon: Users, t: "Gemenskap", d: "Kompisar i backen – och utanför." },
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
            IK Lidingö Freeskiers är en auktoriserad idrottsförening ansluten till <strong>Svenska Skidförbundet (SSF)</strong> och <strong>Riksidrottsförbundet (RF)</strong>.
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c) => (
            <article key={c.name} className="surface-card hover-lift flex flex-col bg-card p-6">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-primary">
                {c.name.charAt(0)}
              </span>
              <h3 className="mt-4 text-xl">{c.name}</h3>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                {c.role}
              </p>
              <p className="mt-3 rounded-lg bg-card px-2.5 py-2 text-xs font-medium text-muted-foreground">
                ⭐ {c.specialty}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed">{c.bio}</p>
              <p className="mt-5 text-xs font-semibold text-primary">Tränare i Ekholmsnäsbacken</p>
            </article>
          ))}
        </div>
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

      <section className="bg-card" id="styrelsen">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-eyebrow">Styrelsen</p>
          <h2 className="mt-2 text-3xl">Styrelsen &amp; föreningen</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {board.map((b) => (
              <li key={b.name} className="surface-card p-5">
                <p className="font-semibold text-heading">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.role}</p>
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

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2" id="bli-tranare">
        <div>
          <p className="text-eyebrow">Bli tränare</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Vill du bli en av oss?</h2>
          <p className="mt-4 leading-relaxed">
            För dig som går i nian (åk 9+). Att vara tränare hos oss är ett fantastiskt extrajobb där
            du får sprida skidglädje till barn, utveckla ditt eget ledarskap och bli en viktig del av
            klubbgemenskapen i Ekholmsnäsbacken.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["God skidkunskap & erfarenhet:", "Du är en trygg och skicklig skidåkare som behärskar backen väl och har en stabil skidteknik."],
              ["Erfarenhet av att arbeta med barn:", "Tidigare erfarenhet som ungdomsledare, barnpassning, sportaktiviteter eller föreningsliv är ett stort plus."],
              ["Skräddarsydda instruktörskurser:", "Vi syr ihop certifierade instruktörskurser med externa utbildare (SLAO/SSF) som man bekostar själv. Efter genomförd kurs och godkänt resultat finns goda möjligheter till tränaruppdrag!"],
              ["Schysst timarvode & ledarkläder.", ""],
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
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Building2, Mail, Megaphone, Trophy, Users } from "lucide-react";

import sunset from "@/assets/photos/ekholmsnas-sunset.jpg";
import { ClubForm } from "@/components/site/ClubForm";
import { PageBanner } from "@/components/site/PageBanner";
import { CONTACT_EMAIL, partners } from "@/lib/club-data";

export const Route = createFileRoute("/sponsor")({
  head: () => ({
    meta: [
      { title: "Bli sponsor & samarbetspartner | Lidingö Freeskiers" },
      { name: "description", content: "Stötta barn- och ungdomsidrotten på Lidingö. Synlighet i Ekholmsnäsbacken, digitalt och vid Rookie Series Stockholm." },
      { property: "og:title", content: "Bli sponsor — Lidingö Freeskiers" },
      { property: "og:description", content: "Var med och möjliggör skidglädje för över 500 barn och unga i Ekholmsnäsbacken." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SponsorPage,
});

const perks = [
  { icon: Users, t: "500+ Aktiva Familjer", d: "Nå en engagerad målgrupp av barnfamiljer på Lidingö och i Stockholmsregionen som vistas regelbundet i backen." },
  { icon: Megaphone, t: "Synlighet i Backen & Digitalt", d: "Exponering via arenabanderoller vid liften, logotyp på tränarkläder och deltagarvästar, samt digital synlighet på vår webb och i nyhetsbrev." },
  { icon: Trophy, t: "Event & Tävlingar", d: "Koppla ert varumärke till publika event såsom Rookie Series Stockholm tillsammans med Svenska Skidförbundet." },
];

function SponsorPage() {
  return (
    <>
      <PageBanner photo={sunset} alt="Bli sponsor till IK Lidingö Freeskiers" eyebrow="Stötta barn- och ungdomsidrotten på Lidingö" title="Bli Sponsor & Samarbetspartner">
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
          Var med och möjliggör rörelseglädje och gemenskap för över 500 skidälskande barn och unga i Ekholmsnäsbacken. Tillsammans bygger vi framtidens idrottsupplevelser utan prestationshets!
        </p>
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
        {perks.map(({ icon: Icon, t, d }) => (
          <article key={t} className="surface-card p-6">
            <Icon className="size-7 text-primary" />
            <h2 className="mt-3 text-lg">{t}</h2>
            <p className="mt-2 text-sm leading-relaxed">{d}</p>
          </article>
        ))}
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <p className="text-eyebrow">Våra Fantastiska Partners</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Företag som gör skillnad för klubbens unga åkare</h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {partners.map((p) => (
              <li key={p.name} className="flex h-20 w-48 items-center justify-center rounded-2xl border border-border bg-background p-3">
                <img src={p.logo} alt={p.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <p className="text-eyebrow">Direktkontakt med Styrelsen</p>
          <h2 className="text-3xl">Vill ditt företag vara med på resan?</h2>
          <p className="leading-relaxed">Vi anpassar gärna partnerskap efter era önskemål och målsättningar – oavsett om det handlar om arenareklam, utrustningsstöd, material eller eventpartnerskap.</p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><Building2 className="size-5 shrink-0 text-primary" /><span><strong className="block text-heading">Förening</strong>IK Lidingö Freeskiers (Org.nr: 802412-2821)<br />Ekholmsnäsbacken, 181 41 Lidingö</span></li>
            <li className="flex gap-3"><Mail className="size-5 shrink-0 text-primary" /><span><strong className="block text-heading">E-post till Styrelsen</strong><a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary underline">{CONTACT_EMAIL}</a></span></li>
            <li className="flex gap-3"><Users className="size-5 shrink-0 text-primary" /><span><strong className="block text-heading">Kontaktpersoner</strong>Stefan Aaröe &amp; Styrelsen i IK Lidingö Freeskiers</span></li>
          </ul>
          <p className="rounded-xl border border-border bg-secondary/50 p-4 text-sm italic">
            Visste du att IK Lidingö Freeskiers är en ideell förening godkänd för statliga Fritidskortet och ansluten till Svenska Skidförbundet? All sponsring går oavkortat till barnens backverksamhet och ledarutveckling.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ClubForm
            title="Intresseanmälan Sponsor / Samarbetspartner"
            description="Fyll i formuläret så kontaktar styrelsen er för ett personligt möte eller förslag."
            submitLabel="Skicka sponsorförfrågan till styrelsen"
            fields={[
              { name: "company", label: "Företagsnamn", required: true, placeholder: "T.ex. Företag AB" },
              { name: "contactName", label: "Kontaktperson", required: true, placeholder: "För- och efternamn" },
              { name: "email", label: "E-postadress", type: "email", required: true, placeholder: "kontakt@foretag.se" },
              { name: "phone", label: "Telefonnummer", type: "tel" },
              { name: "interest", label: "Intresseområde (arenareklam, klädsponsor, Rookie Series, annat)" },
              { name: "message", label: "Meddelande eller idéer", type: "textarea", placeholder: "Berätta gärna kort om ert företag och vad ni vill åstadkomma..." },
            ]}
          />
        </div>
      </section>
    </>
  );
}

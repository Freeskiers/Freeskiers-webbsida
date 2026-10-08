import { createFileRoute } from "@tanstack/react-router";
import { Mail, Search, ShieldCheck, Snowflake } from "lucide-react";
import { useState } from "react";

import ekis from "@/assets/ekis-yeti-transparent.png.asset.json";
import sunset from "@/assets/photos/ekholmsnas-sunset.jpg";
import { ClubForm } from "@/components/site/ClubForm";
import { PageBanner } from "@/components/site/PageBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CONTACT_EMAIL, departmentEmails, faqs, SLOPE_ADDRESS } from "@/lib/club-data";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & FAQ — Lidingö Freeskiers" },
      { name: "description", content: "Svar på vanliga frågor om utrustning, liftkort, Fritidskortet, försäkring, snö och avbokning. Kontaktformulär och karta till Ekholmsnäsbacken." },
      { property: "og:title", content: "Kontakt & FAQ — Lidingö Freeskiers" },
      { property: "og:description", content: "Frågor om nivåer, utrustning, försäkring och avbokning? Ekis svarar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [q, setQ] = useState("");
  const list = faqs.filter((f) => {
    const t = q.toLowerCase();
    return !t || f.q.toLowerCase().includes(t) || f.a.toLowerCase().includes(t) || f.tags.some((x) => x.includes(t));
  });

  return (
    <>
      <PageBanner photo={sunset} alt="Solnedgång över Ekholmsnäsbacken" eyebrow="Ekis svarar" title="Vanliga frågor & kontakt" />
      <section className="gradient-snow">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-[auto_1fr]">
          <img src={ekis.url} alt="Ekis the Yeti" width={364} height={443} className="mx-auto h-36 w-auto md:h-44" />
          <div>
            <h2 className="text-2xl">Hej! Jag är Ekis</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed">
              Här hittar du svar på det föräldrar oftast undrar kring anmälan, utrustning,
              försäkring och Fritidskortet. Hittar du inte svaret – skriv till oss längre ner.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-5 pb-8 sm:px-6">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sök t.ex. hjälm, liftkort, försäkring…" className="h-10 pl-10 text-sm" />
        </div>
        <Accordion type="single" collapsible className="mt-3">
          {list.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="py-3 text-left text-sm font-semibold text-heading">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-3 text-sm">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {list.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Inga träffar – fråga oss direkt nedan.</p> : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-eyebrow"></p>
          <h2 className="mt-1 text-3xl">Klubbens mailadresser</h2>
          <p className="mt-2 text-sm">Skicka e-post direkt till den funktion ditt ärende gäller så svarar vi snabbare!</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departmentEmails.map((d) => (
            <article key={d.id} className="surface-card flex flex-col bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Mail className="size-5" /></span>
              <h3 className="mt-4 text-lg">{d.name}</h3>
              <p className="mt-1 text-xs font-semibold text-primary">{d.shortDesc}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed">{d.focus}</p>
              <a href={`mailto:${d.email}`} className="mt-4 truncate text-sm font-bold text-primary underline">{d.email}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card" id="avbokning">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl">Snöpolicy, utrustning &amp; avbokning</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Snowflake,
                t: "För lite snö",
                d: "Ekholmsnäsbacken snölägger så fort kylan tillåter. Dröjer snön flyttas träningarna framåt eller ersätts med andra datum under säsongen.",
              },
              {
                icon: ShieldCheck,
                t: "Utrustning",
                d: "Godkänd hjälm är obligatorisk i både skidskola och skidklubb. Ryggskydd krävs i skidklubben och rekommenderas i skidskolan. Bindningar inställda efter barnets längd och vikt.",
              },
              {
                icon: ShieldCheck,
                t: "Avbokning & återbetalning",
                d: "Ingen återbetalning vid skada, sjukdom eller missade tillfällen – tränare och backtider bokas och bekostas för hela säsongen.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="surface-card p-6">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-3 text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <ClubForm
            title="Skriv till oss"
            description="Välj mottagare så går ditt meddelande direkt till rätt ansvarig. Vi återkommer normalt inom 1–2 vardagar."
            recipients={departmentEmails.map((d) => ({ value: d.email, label: `${d.email} – ${d.name}` }))}
            submitLabel="Skicka meddelande"
            fields={[
              { name: "name", label: "Namn", required: true },
              { name: "email", label: "E-post", type: "email", required: true },
              { name: "phone", label: "Telefonnummer", type: "tel" },
              { name: "message", label: "Meddelande", type: "textarea", required: true },
            ]}
          />
          <p className="mt-4 text-sm text-muted-foreground">{"\n"}</p>
        </div>
        <div className="surface-card overflow-hidden">
          <iframe
            title="Karta till Ekholmsnäsbacken"
            src={`https://www.google.com/maps?q=${encodeURIComponent(`Ekholmsnäsbacken, ${SLOPE_ADDRESS}`)}&output=embed`}
            className="h-full min-h-96 w-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

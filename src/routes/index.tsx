import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

import { LevelFinder, LevelFinderButton } from "@/components/site/LevelFinder";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { Button } from "@/components/ui/button";
import { clubEvents, eventLink, groups, heroPhoto, SEASON } from "@/lib/club-data";
import hoppNattAsset from "@/assets/photos/freeskiers-hopp-natt.png.asset.json";

const skidskola = groups.find((g) => g.slug === "helgskidskola")!;
const skidklubb = groups.find((g) => g.slug === "freeskiers-skidklubb")!;
const orderedGroups = [skidklubb, ...groups.filter((g) => g !== skidklubb)];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lidingö Freeskiers — skidskola och skidklubb i Ekholmsnäsbacken" },
      { name: "description", content: "Helgskidskola, skidklubb, höstträning och privatlektioner för barn och unga i Ekholmsnäsbacken på Lidingö. Skidglädje utan prestationsångest." },
      { property: "og:title", content: "Lidingö Freeskiers" },
      { property: "og:description", content: "Sveriges största friåkningsklubb för barn och unga – hemma i Ekholmsnäsbacken." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-primary-deep sm:min-h-[720px]">
        <img
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          width={2000}
          height={1125}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/95 via-primary-deep/70 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep/80 via-transparent to-transparent" />
        <div className="on-dark mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur sm:text-sm">
              SVERIGES STÖRSTA FRIÅKNINGSKLUBB
            </span>
            <h1 className="mt-6 text-5xl leading-[1.05] sm:text-7xl">
              Lidingö <span className="text-accent">Freeskiers</span>
            </h1>
            <p className="mt-3 text-xl font-semibold sm:text-3xl">
              100% skidglädje &amp; gemenskap för barn och unga
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              Från de allra första svängarna i barnbacken till hopp, rails och friåkning.
              Skidklubben och Helgskidskolan där alla utvecklas i sin egen takt – helt utan
              prestationshets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="cta" size="xl" className="rounded-full" asChild>
                <Link to="/skidklubb">Freeskiers Skidklubb <ArrowRight className="size-5" /></Link>
              </Button>
              <Button variant="onDark" size="xl" className="rounded-full" asChild>
                <Link to="/helgskidskola">Anmäl till Helgskidskolan</Link>
              </Button>
              <LevelFinderButton variant="onDark" label="Hitta rätt nivå (skidtest)" className="h-14 px-6" />
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-eyebrow">Hitta rätt verksamhet</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Skidåkning året runt</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {orderedGroups.map((g) => (
            <Link
              key={g.slug}
              to={g.to}
              className="group surface-card hover-lift relative flex h-96 flex-col justify-end overflow-hidden"
            >
              <img
                src={g.cardPhoto ?? g.photo}
                alt={g.cardPhotoAlt ?? g.photoAlt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
              <div className="on-dark relative p-6">
                <h3 className="mt-3 text-xl">{g.name}</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">{g.age} · {g.level}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Läs mer <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-gradient-snow py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-eyebrow flex items-center gap-1.5"><Calendar className="size-4" /> Säsongen {SEASON}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Klubbens Kalender &amp; Event</h2>
              <p className="mt-2 max-w-xl text-sm sm:text-base">
                Håll koll på anmälningsdatum, klubbkvällar, tävlingar och läger i Ekholmsnäsbacken.
              </p>
            </div>
            <Button variant="cta" size="lg" className="self-start rounded-full md:self-auto" asChild>
              <Link to="/kalender">Öppna hela kalendervyn <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {clubEvents.slice(0, 3).map((ev) => {
              return (
                <article key={ev.id} className="surface-card flex flex-col justify-between bg-card p-6">
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex size-14 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-secondary text-center">
                        <span className="text-[10px] font-bold leading-none text-primary">{ev.month}</span>
                        <span className="mt-0.5 text-xl font-black leading-none text-heading">{ev.day}</span>
                      </div>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">{ev.categoryLabel}</span>
                    </div>
                    <h3 className="text-lg leading-snug">{ev.title}</h3>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5"><Clock className="size-3.5 text-primary" />{ev.time}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />{ev.locationUrl ? <a href={ev.locationUrl} target="_blank" rel="noreferrer" className="truncate font-semibold text-primary hover:underline">{ev.location}</a> : <span className="truncate">{ev.location}</span>}</p>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{ev.description}</p>
                  </div>
                  <Link {...eventLink(ev.actionUrl)} className="mt-4 inline-flex items-center gap-1 border-t border-border pt-4 text-sm font-bold text-primary hover:underline">
                    {ev.actionLabel ?? "Läs mer"} <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-eyebrow flex items-center gap-1.5">
              <Heart className="size-4" /> Vår filosofi
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Vi är Lidingö Freeskiers</h2>
            <div className="mt-6 space-y-4 leading-relaxed">
              <p>
                <strong className="text-heading">
                  Skidglädje, nya vänner och massor av upplevelser på snö – det är kärnan i
                  Lidingö Freeskiers.
                </strong>{" "}
                Vi driver skidskola och skidklubb för barn och unga där alla, oavsett nivå, får
                utvecklas i sin egen takt.
              </p>
              <p>
                Vår verksamhet bygger på rörelseglädje och känslan av frihet när man bemästrar
                backen, vare sig det handlar om den allra första plogsvängen eller att susa fram i
                snygga carvingsvängar. Vi tävlar inte, men hos oss kan du prova på allt från
                jibbing och puckelpist till härlig lössnöåkning.
              </p>
              <p>
                När du slutat nian finns dessutom möjlighet att gå våra instruktörsutbildningar och
                därefter påbörja en tränarkarriär i föreningen.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="cta" size="lg" className="rounded-full" asChild>
                <Link to="/om-oss">Möt våra tränare &amp; ledare</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link to="/om-oss" hash="bli-tranare">Bli tränare (åk 9+)</Link>
              </Button>
            </div>
          </div>

          <div className="surface-card overflow-hidden">
            <img src={hoppNattAsset.url} alt="Skidåkare i luften över ett snöhopp på kvällen, med eldkorg och upplyst backe i bakgrunden" loading="lazy" className="h-full max-h-[520px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-snow py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-eyebrow">Interaktiv Nivåguide</p>
            <h2 className="mt-1 text-3xl sm:text-4xl">Vilken grupp passar ditt barn?</h2>
            <p className="mt-2 text-sm">Svara på 3 snabba frågor så guidar vi dig till rätt nivå och träning i Ekholmsnäsbacken!</p>
          </div>
          <LevelFinder />
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                t: "Ingen tävlingshets",
                d: "Hos oss fokuserar vi på rörelseglädje, gemenskap och att ha roligt på snö. Alla är välkomna oavsett förkunskaper.",
              },
              {
                icon: Users,
                t: "Unga ledare & förebilder",
                d: "Klubbens tränare är äldre ungdomar och åkare som själva vuxit upp i föreningen. Tryggt, inspirerande och roligt!",
              },
              {
                icon: ShieldCheck,
                t: "Trygghet & försäkring",
                d: "Alla medlemmar är olycksfallsförsäkrade via Svenska Skidförbundet. Hjälm är alltid obligatorisk, och i skidklubben krävs även ryggskydd.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="surface-card p-6 sm:p-8">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />
    </>
  );
}

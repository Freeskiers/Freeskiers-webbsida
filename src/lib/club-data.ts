// Innehåll och bilder hämtade från klubbens GitHub-repo
// (Freeskiers/Freeskiers-webbsida, synkad mot commit 050ff651).
// Överallt där klubben ännu inte lämnat ett riktigt värde (t.ex. priser) visas
// ingen siffra – texten hänvisar i stället till klubbens bokningssida.

import coachesGroup from "@/assets/photos/coaches-group.jpg";
export { coachesGroup };
import ekholmsnasSunset from "@/assets/photos/ekholmsnas-sunset.jpg";
import heroNightAction from "@/assets/photos/hero-freeski-night-action.jpg.asset.json";
import freeskiPowder from "@/assets/photos/freeski-powder-hero.jpg";
import parkRails from "@/assets/photos/park-rails.jpg";
import privatCoach from "@/assets/photos/privatlektion-coach.jpg";
import helgskidskolaGrupp from "@/assets/photos/helgskidskola-grupp-ljus.jpg";
import skidklubbHopp from "@/assets/photos/skidklubb-hopp.jpg.asset.json";
import privatlektionerGrupp from "@/assets/photos/privatlektioner-grupp.jpg.asset.json";
import webbshopProdukter from "@/assets/photos/webbshop-produkter.png";
import europeanSnowsportPhoto from "@/assets/photos/european-snowsport-skidskola.png";

import alpingaragetLogo from "@/assets/partners/alpingaraget.png";
import ekholmsnasLogo from "@/assets/partners/ekholmsnas.png";
import europeanSnowsportLogo from "@/assets/partners/european-snowsport.png";
import gadeliusLogo from "@/assets/partners/gadelius.png";
import kangLogo from "@/assets/partners/kang.png";
import lidingocentrumLogo from "@/assets/partners/lidingocentrum.svg";
import stockholmbordsuthyrningLogo from "@/assets/partners/stockholmbordsuthyrning.png";

// Klubbens riktiga länkar (visas aldrig som systemnamn för besökarna)
export const CLUB_URL = "https://www.lidingofreeskiers.se";
export const BOOKING_URL = "https://sportadmin.se/book/?F=7631cd86-189b-4c49-bfc0-3ba70fe1f127";
export const PRIVATE_BOOKING_URL = "https://www.lidingofreeskiers.se/privatlektion/";
export const EQUIPMENT_RENTAL_URL = "https://www.ekholmsnasbacken.se/uthyrning";
export const SLOPE_MAP_URL = "https://maps.app.goo.gl/m3gQEfDvu73twtnh8";
export const WEBCAM_URL = CLUB_URL;
export const CONTACT_EMAIL = "kontakt@lidingofreeskiers.se";
export const SLOPE_ADDRESS = "Ekholmsnäsvägen 87, 181 41 Lidingö";
export const INSTAGRAM_URL = "https://www.instagram.com/lidingofreeskiers/";
export const FACEBOOK_URL = "https://www.facebook.com/freeskierslidingo/";
export const WEBBSHOP_URL = "https://intersportlidingo.se/Login.aspx?out=1";
export const REGISTRATION_OPEN = "16 oktober kl. 09.00";
export const SEASON = "2026/2027";

export const helgskidskola2027 = {
  registration: {
    title: "Anmälan till Helgskidskolan",
    opens: "Anmälan öppnar den 1 november kl. 09.00.",
    allocation: "Vi har inget kösystem - först till kvarn gäller!",
    trainingFee: "2 980 kr",
    priceNote: "Träningsavgift för vintersäsongen. Med reservation för ändringar.",
  },
  schedule: {
    extent: "Helgskidskolan omfattar 5 lektioner à 75 minuter.",
    dateInfo: "",
    dateListIntro: "Följande datum gäller:",
    dates: [
      { name: "TILLFÄLLE 1", date: "Lördag 30 januari", reserve: false },
      { name: "TILLFÄLLE\u00a02", date: "Söndag 31 januari", reserve: false },
      { name: "TILLFÄLLE\u00a03", date: "Lördag 6 februari", reserve: false },
      { name: "TILLFÄLLE\u00a04", date: "Lördag 20 februari", reserve: false },
      { name: "TILLFÄLLE\u00a05", date: "Söndag 21 februari", reserve: false },
    ],
    dateNote:
      "Om vädret är för dåligt ställs lektionen in och ersätts inte med ett nytt datum.",
    timeInfo:
      "Du väljer pass vid anmälan. Tiden du väljer gäller vid samtliga tillfällen.",
    sessions: ["Förmiddag 09.30–10.45", "Lunch 11.15–12.30", "Eftermiddag 13.15–14.30"],
    gathering:
      "Kom i god tid för att hitta rätt grupp och delta i uppropet. Barnen delas in i mindre grupper med färgade västar. Efter lektionen samlas alla på samma plats som vid starten.",
  },
  equipment: {
    required: "Alla barn måste ha hjälm i backen. Ryggskydd rekommenderas.",
    preparation:
      "Kontrollera före säsongsstart att skidorna är i gott skick, att pjäxorna passar och att bindningarna är korrekt inställda.",
    rental:
      "Tillsammans med Ekholmsnäsbacken erbjuder vi uthyrning av skidor, pjäxor, stavar och hjälm för Helgskidskolans samtliga tillfällen. Utrustningen hämtas ut innan den första lektionen och tas med hem så att ni kan använda den som er egen under hela Helgskidskolans period. Återlämning sker i samband med det sista tillfället.",
  },
  membership: {
    intro:
      "",
    season: "Medlemsavgifter för vintersäsongen",
    fees: ["Enskilt medlemskap: 195 kr", "Familjemedlemskap, max 5 personer: 595 kr"],
    registration:
      "",
    benefits: "",
    note: "Medlemskapet tecknas i samband med anmälan.\nPriserna gäller innevarande säsong. Med reservation för ändringar.",
  },
};

export const privatlektionSida = {
  intro:
    "Vill du ta nästa steg i din åkning? Våra privatlektioner anpassas helt efter nivå, mål och ålder.",
  audience:
    "För alla åkare som vill ta nästa steg. Vi erbjuder privatlektioner för barn, ungdomar och vuxna – från total nybörjare till avancerad åkare.",
  format:
    "Med fullt fokus från instruktören finns tid att öva, få individuell feedback och skapa en trygg grund för fortsatt åkglädje.",
  prices: [
    { people: "1 person", price: "850 kr", duration: "60 minuter" },
    { people: "2 personer", price: "1 300 kr", duration: "60 minuter" },
  ],
  pairRequirement: {
    intro: "För privatlektion med två personer behöver båda vara avancerade nybörjare.",
    items: [
      "Kan få stopp på skidorna på ett kontrollerat sätt",
      "Kan åka ankarlift tillsammans med en vuxen",
    ],
  },
  practical: [
    {
      title: "Liftkort ingår",
      text: "Ett tillfälligt liftkort ingår under lektionen. Du hämtar det tillsammans med tränaren i skiduthyrningen och lämnar tillbaka det efter lektionen.",
    },
    {
      title: "Utrustning",
      text: "Ta med fungerande skidor, pjäxor, hjälm, ryggskydd (för barn/vuxna över 7 år) samt kläder efter väder. Stavar behövs inte för nybörjare.",
    },
    {
      title: "Samlingsplats",
      text: "Tränaren möter er vid skiduthyrningen och är tydligt synbar med jacka/väst från Lidingö Freeskiers.",
    },
  ],
  rental:
    "Ekholmsnäsbackens skiduthyrning har skidor, pjäxor, stavar och hjälmar till alla från 2 år och uppåt. Tyvärr hyr de i dagsläget inte ut snowboards.",
};

// Innehåll till /skidklubb — hämtat från klubbens gamla webbplats (skidklubb-freeskiers).
export const skidklubbSida = {
  anmalan: {
    title: "Anmälan till Freeskiers Skidklubb",
    steps: [
      {
        title: "Förtur — tidigare medlemmar & Höstsäsongen",
        tag: "Förtur",
        text: "Den 4 oktober skickas en betalningsavisering till alla tidigare medlemmar och de som är anmälda till årets Höstsäsong, där väljer du att behålla eller frigöra din plats. Sista betalningsdag är 14 oktober.",
      },
      {
        title: "Nya medlemmar",
        tag: "16 oktober kl. 09.00",
        text: "Anmälan för lediga platser öppnar 16 oktober kl. 09.00. Antalet platser beror på hur många som fortsätter i respektive årskurs. Vi har inget kösystem - först till kvarn gäller!",
      },
    ],
    cta: "Anmäl till Skidklubben",
  },
  vision: [
    {
      title: "Kontinuitet i träningen",
      text: "Tränarna ska lära känna åkarna väl, både vad gäller åkningsfärdighet och personlighet, och anpassa träningen efter individens förutsättningar.",
    },
    {
      title: "Stark teamkänsla",
      text: "Ungdomarna behöver lära känna varandra, tränarna och gruppen som helhet. Gruppen ska vara så stabil som möjligt – därför ställer vi höga krav på närvaro.",
    },
    {
      title: "Engagerade föräldrar",
      text: "Verksamheten bygger på att även föräldrarna deltar. Uppgifterna är av varierande omfattning och alla kan delta – det är kul och man kommer närmre sitt barn.",
    },
  ],
  schedule: [
    {
      group: "Åk 1–4 – måndag",
      days: "Måndag",
      time: "18.15–19.45",
      price: "3 130 kr",
      perWeek: "1 gång/vecka",
      highlight: false,
    },
    {
      group: "Åk 1–4 – onsdag",
      days: "Onsdag",
      time: "18.15–19.45",
      price: "3 130 kr",
      perWeek: "1 gång/vecka",
      highlight: false,
    },
    {
      group: "Årskurs 5",
      days: "Onsdag",
      time: "19.45–21.15",
      price: "3 130 kr",
      perWeek: "1 gång/vecka",
      highlight: false,
    },
    {
      group: "Årskurs 6–9",
      days: "Måndag och onsdag",
      time: "19.45–21.15",
      price: "4 390 kr",
      perWeek: "2 gånger/vecka",
      highlight: false,
    },
  ],
  priceNote:
    "Alla priser inkluderar liftkort.\nPriserna gäller innevarande säsong. Med reservation för ändringar.",
  requirements: [
    "Åkning ska kunna ske kontrollerat från topp till botten i backen",
    "Åkning med huvudsakligen parallella skidor",
    "Självständig åkning i lift samt säker avstigning",
    "Förmåga att stanna kontrollerat utan problem",
  ],
  requirementsNote:
    "Inga krav ställs på trick, hopp eller avancerade svängar – dessa moment introduceras och utvecklas inom verksamheten.",
  traning: {
    intro:
      "Åkarna är indelade efter åldersanpassade grupper som leds av klubbens instruktörer.",
    punkter: [
      "1–2 pass i veckan, måndag–onsdag kvällar, januari–mars.",
      "Parkträning med rails, boxar och hopp – och åkning i hela backen.",
      "Fokus på sväng för att lära sig att åka på skär – träningen består av att åka i bana samt olika övningar för att hitta en skärande sväng.",
      "Glädje och utveckling först. Tävling är helt frivilligt.",
    ],
    forPasset: [
      "Samling vid skylten för din årskurs – var i god tid.",
      "Hjälm och ryggskydd är obligatoriskt.",
      "Vallade och slipade skidor.",
    ],
  },
  backen: {
    intro:
      "Vi tränar i Ekholmsnäsbacken på Lidingö. Tre nedfarter – Familjebacken, Lilla backen och Stora parken – och tre liftar - Stora liften, Rullbandet och Rail-liften. En backe som tillgodoser alla, oavsett nivå.",
    perks: ["Skiduthyrning", "Café med enklare mat och fika", "Grill under helgerna"],
    link: "https://www.ekholmsnasbacken.se/",
  },
  eventsIntro:
    "Under säsongen håller vi i olika events. Tidigare år har vi bland annat haft:",
  events: ["Big Airbag Sessions", "Avalanche Clinic", "The Bunch Railsession"],
  eventsOutro:
    "Varje säsong avslutas på bästa sätt – Beach Party, med poolskidåkning och massa annat skoj.",
};

export const heroPhoto = { src: heroNightAction.url, alt: "Lidingö Freeskiers i Ekholmsnäsbacken" };

export type GroupFact = { label: string; value: string };

export type Group = {
  slug: string;
  name: string;
  age: string;
  level: string;
  badge: string;
  when: string;
  booking: "club" | "coach";
  to: "/helgskidskola" | "/skidklubb" | "/hostsasong" | "/privatlektion";
  cta: string;
  summary: string;
  bullets: string[];
  facts: GroupFact[];
  photo: string;
  cardPhoto?: string;
  cardPhotoAlt?: string;
  photoAlt: string;
};

export const groups: Group[] = [
  {
    slug: "helgskidskola",
    to: "/helgskidskola",
    cta: "Anmäl till Helgskidskolan",
    name: "Freeskiers Helgskidskola",
    age: "Från 5 år",
    level: "Nybörjare & fortsättning",
    badge: "",
    when: "5 tillfällen på lördagar eller söndagar, januari–februari",
    booking: "club",
    summary:
      "För barn och unga som vill lära sig åka skidor eller ta sin åkning till nästa nivå. Vi kör 5 intensiva och roliga tillfällen på helger under januari och februari i Ekholmsnäsbacken.",
    bullets: [
      "Grön grupp – nybörjare från 5 år",
      "Blå grupp – avancerade nybörjare",
      "Röd grupp – fortsättning",
      "Hjälm är obligatoriskt. Ryggskydd rekommenderas",
      "Liftkort behövs inte. Vi har en egen liftkö",
    ],
    facts: [
      { label: "Omfattning", value: "5 helgtillfällen (jan–feb)" },
      { label: "Passlängd", value: "75 minuter per gång" },
      { label: "Plats", value: "Ekholmsnäsbacken, Lidingö" },
    ],
    photo: helgskidskolaGrupp,
    photoAlt: "Ledare och barn i Helgskidskolan i toppen av Ekholmsnäsbacken",
  },
  {
    slug: "freeskiers-skidklubb",
    to: "/skidklubb",
    cta: "Anmäl till Skidklubben",
    name: "Freeskiers Skidklubb",
    age: "Åk 1-9",
    level: "Vana åkare",
    badge: "",
    when: "Träning 1–2 gånger i veckan, måndag–onsdag kväll, januari–mars",
    booking: "club",
    summary:
      "För barn och unga som vill träna regelbunden friåkning och freestyle under vintersäsongen. Vi kör vardagskvällar i Ekholmsnäsbacken med fokus på hopp, rails, allsidig skidteknik och stark gemenskap.",
    bullets: [
      "Åldersanpassade träningsgrupper",
      "Parkträning med rails, boxar och hopp",
      "Tävling är helt frivilligt",
      "Krav: åka ankarlift, kontrollerad broms och parallella skidor",
    ],
    facts: [
      { label: "Träning", value: "1–2 pass i veckan" },
      { label: "Period", value: "Januari–mars" },
      { label: "Plats", value: "Ekholmsnäsbacken, Lidingö" },
    ],
    photo: skidklubbHopp.url,
    photoAlt: "Freeskiers-åkare i hopp med röda skidor i Ekholmsnäsbacken på kvällen",
  },
  {
    slug: "hostsasong",
    to: "/hostsasong",
    cta: "Anmälan till Höstsäsongen",
    name: "Freeskiers Höstsäsong",
    age: "Åk 1–9",
    level: "Vana åkare",
    badge: "",
    when: "Hösten fram till jul – barmark varje onsdag och trampolinträning",
    booking: "club",
    summary:
      "Ladda upp rejält inför vintern! Barmarksträning varje onsdag och trampolinträning i Vikingahallen.",
    bullets: [
      "Barmarksträning varje onsdag",
      "Trampolinträning i Vikingahallen",
      "Förtur till Freeskiers Skidklubb",
      "För barn i åk 1–9",
    ],
    facts: [
      { label: "Innehåll", value: "Barmark & trampolin" },
      { label: "Pris", value: "795 kr" },
      { label: "Plats", value: "Stockby & Vikingahallen, Lidingö" },
    ],
    photo: parkRails,
    photoAlt: "Åkare på rails i parken",
  },
  {
    slug: "privatlektioner",
    to: "/privatlektion",
    cta: "Boka privatlektion",
    name: "Privatlektioner",
    age: "Alla åldrar",
    level: "Alla nivåer",
    badge: "",
    when: "60 minuter för en eller två personer, bokas direkt på sidan",
    booking: "coach",
    summary:
      "Personlig coachning för barn, ungdomar och vuxna – från total nybörjare till avancerad åkare.",
    bullets: [
      "Grundteknik, broms och svängar",
      "Carving med kantkontroll",
      "Hopp, 180s, 360s, boxar och rails",
      "Switch-åkning och freestyle",
    ],
    facts: [
      { label: "Upplägg", value: "1 eller 2 personer" },
      { label: "Lektionstid", value: "60 minuter" },
      { label: "Plats", value: "Ekholmsnäsbacken, Lidingö" },
    ],
    photo: privatlektionerGrupp.url,
    photoAlt: "Barn kastar snö på en Freeskiers-ledare i Ekholmsnäsbacken",
  },
];

export type Coach = {
  name: string;
  role: string;
};

// Synkad direkt mot SportAdmin (gruppen "Tränare - Lidingö Freeskiers" säsong 2026/2027)
export const coaches: Coach[] = [
  { name: "Abbe Olofsson", role: "Tränare" },
  { name: "Alexandra Taube", role: "Tränare" },
  { name: "Anton Knave", role: "Tränare" },
  { name: "August Ornby", role: "Tränare" },
  { name: "Axel Lundgren Dahl", role: "Tränare" },
  { name: "Billie Åberg", role: "Tränare" },
  { name: "Carl Elmfeldt", role: "Tränare" },
  { name: "Carl Leuhusen", role: "Tränare" },
  { name: "Carl Nordlander", role: "Tränare" },
  { name: "Carlaxel Vikström", role: "Tränare" },
  { name: "Ebba Dangré", role: "Tränare" },
  { name: "Ella Riisberg", role: "Tränare" },
  { name: "Ella-Milou Feigin Hamilton", role: "Tränare" },
  { name: "Eric Ryman", role: "Tränare" },
  { name: "Erik Norinder", role: "Tränare" },
  { name: "Felix Bergström", role: "Tränare" },
  { name: "Felix Jonsberg Nordahl", role: "Tränare" },
  { name: "Filip Ryman", role: "Tränare" },
  { name: "Franca Peilitz", role: "Tränare" },
  { name: "Gustaf Isakson", role: "Tränare" },
  { name: "Hector Nelker", role: "Tränare" },
  { name: "Hedvig Nelker", role: "Tränare" },
  { name: "Hilma Newman", role: "Tränare" },
  { name: "Hugo Riisberg", role: "Tränare" },
  { name: "Ingrid Roth", role: "Tränare" },
  { name: "Ivar Zetterström", role: "Tränare" },
  { name: "John Edeus", role: "Tränare" },
  { name: "Julie Ryott", role: "Tränare" },
  { name: "Kian Blomberg", role: "Tränare" },
  { name: "Klas Lagerström", role: "Tränare" },
  { name: "Leia Fallan Röd Elgh", role: "Tränare" },
  { name: "Liv Rammer", role: "Tränare" },
  { name: "Livia Wetternin", role: "Tränare" },
  { name: "Lovisa Högström", role: "Tränare" },
  { name: "Luc Pope", role: "Tränare" },
  { name: "Ludvig Holmgren", role: "Tränare" },
  { name: "Martina Mellberg Ahlström", role: "Tränare" },
  { name: "Max Wrange", role: "Tränare" },
  { name: "Nils Hadzin", role: "Tränare" },
  { name: "Noah Oscarsson", role: "Tränare" },
  { name: "Olle Dahlqvist", role: "Tränare" },
  { name: "Oscar Wolf", role: "Tränare" },
  { name: "Otto Wallentin", role: "Tränare" },
  { name: "Petter Wejstorp", role: "Tränare" },
  { name: "Philip Dahlbeck Nobel", role: "Tränare" },
  { name: "Saga Boldt-Christmas", role: "Tränare" },
  { name: "Sam Martinsson", role: "Tränare" },
  { name: "Samuel Malmquist", role: "Tränare" },
  { name: "Signe Nordblad", role: "Tränare" },
  { name: "Sigrid Zetterström", role: "Tränare" },
  { name: "Simon Agnblad", role: "Tränare" },
  { name: "Sixten Lundström", role: "Tränare" },
  { name: "Stella Af Sandeberg", role: "Tränare" },
  { name: "Svante Dahlqvist", role: "Tränare" },
  { name: "Thea Elmfeldt", role: "Tränare" },
  { name: "Tom Foulds", role: "Tränare" },
  { name: "Tom Leuhusen", role: "Tränare" },
  { name: "Valter Dahl", role: "Tränare" },
  { name: "Vincent Lindau Carloni", role: "Tränare" },
  { name: "Wilhelm Lang", role: "Tränare" },
  { name: "William Nagenius", role: "Tränare" },
];

export const board: { name: string; role?: string }[] = [
  { name: "Stefan Aaröe (Ordförande)", role: "Sponsoransvarig, Backgruppen" },
  { name: "Sten Berggren (Kassör)", role: "Backgruppen, Investeringar" },
  { name: "Klara Tengstrand", role: "Tränaransvarig" },
  { name: "Ann Winitsky Säiner", role: "Sponsor- och kommunikationsansvarig" },
  { name: "Daniel Ryman", role: "Backansvarig (gällande LFS´s aktiviteter, ej driften)" },
  { name: "Erik Rune", role: "Design" },
  { name: "Javier Rojas", role: "Resurs" },
];

export type EventCategory = "anmalan" | "traning" | "helgskidskola" | "tavling" | "klubbkvall" | "lager";

export type ClubEvent = {
  id: string;
  title: string;
  shortDate: string;
  day: string;
  month: string;
  year: string;
  /** 0 = januari … 11 = december */
  monthIndex: number;
  /** Startdatum (YYYYMMDD) för kalenderfil */
  start: string;
  /** Slutdatum exklusive (YYYYMMDD) för kalenderfil */
  end: string;
  time: string;
  location: string;
  /** Länk som platsen pekar på (t.ex. anmälningssidan) */
  locationUrl?: string;
  category: EventCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  /** Visas i den roterande toppraden på alla sidor */
  isPushedTop: boolean;
  badge?: string;
};

// Synkat mot repo commit f776ca02 (src/data/clubEvents.ts) samt assets/Ekholmsnas_Kalender_2027_med_Parkering_och_OG.xlsx
export const clubEvents: ClubEvent[] = [
  {
    id: "anmalan-oppnar-2026", title: "Anmälan till Freeskiers Skidklubb", shortDate: "16 oktober 2026",
    day: "16", month: "OKT", year: "2026", monthIndex: 9, start: "20261016", end: "20261017",
    time: "Kl. 09:00", location: "Freeskiers bokningssida", locationUrl: BOOKING_URL, category: "anmalan", categoryLabel: "Anmälan",
    tagline: "Lediga platser i Skidklubbens årskurser",
    description: "Anmälan för alla lediga platser till Freeskiers Skidklubb öppnar 16 oktober kl. 09.00. Tidigare medlemmar och deltagare i Höstsäsongen har förtur. Vi har inget kösystem - först till kvarn gäller!",
    actionLabel: "Läs mer om Freeskiers Skidklubb", actionUrl: "/skidklubb", isPushedTop: true, badge: "Viktigt datum",
  },
  {
    id: "anmalan-helgskidskola-2026", title: "Anmälan till Helgskidskolan", shortDate: "1 november 2026",
    day: "01", month: "NOV", year: "2026", monthIndex: 10, start: "20261101", end: "20261102",
    time: "Kl. 09:00", location: "Freeskiers bokningssida", locationUrl: BOOKING_URL, category: "anmalan", categoryLabel: "Anmälan",
    tagline: "Lediga platser i Grön, Blå och Röd grupp",
    description: "Anmälan till Helgskidskolan öppnar den 1 november kl. 09.00. Vi har inget kösystem - först till kvarn gäller!",
    actionLabel: "Läs mer om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: true, badge: "Viktigt datum",
  },
  {
    id: "camp-freeskiers-host-2026", title: "Camp Freeskiers", shortDate: "7–8 november 2026",
    day: "07", month: "NOV", year: "2026", monthIndex: 10, start: "20261107", end: "20261109",
    time: "Helgläger", location: "", category: "lager", categoryLabel: "Camp & Läger",
    tagline: "Gemensam camp inför vintersäsongen",
    description: "Camp Freeskiers den 7–8 november 2026 med fokus på skidglädje, gemenskap och förberedelse inför vintern.",
    actionLabel: "Läs om klubben", actionUrl: "/om-oss", isPushedTop: true, badge: "Camp Freeskiers",
  },
  {
    id: "klubbkvall-alpingaraget-2026", title: "Klubbkväll & Utrustningscheck i Alpingaraget", shortDate: "30 november 2026",
    day: "30", month: "NOV", year: "2026", monthIndex: 10, start: "20261130", end: "20261201",
    time: "18:00 – 20:30", location: "Alpingaraget, Birger Jarlsgatan, Stockholm", category: "klubbkvall", categoryLabel: "Klubbkväll & Partner",
    tagline: "Medlemsrabatter, bootfitting och klubbjackor",
    description: "Exklusiv klubbkväll hos vår samarbetspartner Alpingaraget. Träffa tränarna, prova ut rätt pjäxor och skidor med experthjälp, köp hjälm och ryggskydd med klubbrabatt samt beställ årets klubbjacka.",
    actionLabel: "Läs om partners & utrustning", actionUrl: "/sponsor", isPushedTop: true, badge: "Klubbkväll",
  },

  // === JANUARI 2027 ===
  {
    id: "traning-2027-01-11", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 11 januari 2027",
    day: "11", month: "JAN", year: "2027", monthIndex: 0, start: "20270111", end: "20270112",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Första måndagsträningen i Ekholmsnäsbacken (v. 2). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: true, badge: "v. 2 · Träningsstart",
  },
  {
    id: "traning-2027-01-13", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 13 januari 2027",
    day: "13", month: "JAN", year: "2027", monthIndex: 0, start: "20270113", end: "20270114",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 2). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 2",
  },
  {
    id: "var-resa-bortaresa-2027", title: "Vår resa (Bortaresa)", shortDate: "14–17 januari 2027",
    day: "14", month: "JAN", year: "2027", monthIndex: 0, start: "20270114", end: "20270118",
    time: "Torsdag – Söndag", location: "Bortaresa (hemmabacken fri)", category: "lager", categoryLabel: "Resa & Läger",
    tagline: "Klubbens gemensamma bortaresa under vecka 2",
    description: "Freeskiers bortaresa torsdag 14 januari till söndag 17 januari (v. 2). Påverkar ej Ekholmsnäsbacken.",
    actionLabel: "Om klubben", actionUrl: "/om-oss", isPushedTop: false, badge: "v. 2 · Bortaresa",
  },
  {
    id: "traning-2027-01-18", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 18 januari 2027",
    day: "18", month: "JAN", year: "2027", monthIndex: 0, start: "20270118", end: "20270119",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 3). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 3",
  },
  {
    id: "traning-2027-01-20", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 20 januari 2027",
    day: "20", month: "JAN", year: "2027", monthIndex: 0, start: "20270120", end: "20270121",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 3). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 3",
  },
  {
    id: "utbildning-park-2027", title: "Utbildning park i Ekholmsnäsbacken", shortDate: "21–22 januari 2027",
    day: "21", month: "JAN", year: "2027", monthIndex: 0, start: "20270121", end: "20270123",
    time: "Dagtid / kväll", location: "Ekholmsnäsbacken Snowpark, Lidingö", category: "traning", categoryLabel: "Utbildning & Park",
    tagline: "Parken disponeras för utbildning torsdag–fredag",
    description: "Utbildning i parken i Ekholmsnäsbacken torsdag 21 januari och fredag 22 januari (v. 3).",
    actionLabel: "Läs om våra tränare", actionUrl: "/om-oss", isPushedTop: false, badge: "v. 3 · Parkutbildning",
  },
  {
    id: "traning-2027-01-25", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 25 januari 2027",
    day: "25", month: "JAN", year: "2027", monthIndex: 0, start: "20270125", end: "20270126",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 4). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 4",
  },
  {
    id: "traning-2027-01-27", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 27 januari 2027",
    day: "27", month: "JAN", year: "2027", monthIndex: 0, start: "20270127", end: "20270128",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 4). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 4",
  },
  {
    id: "hss-1-2027-01-30", title: "Helgskidskola – Tillfälle 1", shortDate: "Lördag 30 januari 2027",
    day: "30", month: "JAN", year: "2027", monthIndex: 0, start: "20270130", end: "20270131",
    time: "09:30 – 14:30", location: "Ekholmsnäsbacken, Lidingö", category: "helgskidskola", categoryLabel: "Helgskidskola",
    tagline: "Förmiddag 09.30–10.45 · Lunch 11.15–12.30 · Eftermiddag 13.15–14.30",
    description: "Premiär för Helgskidskolan i Grön, Blå och Röd grupp! Backen är fri för skidskolan fram till kl. 15.00 (LSK Klubbcup 1 startar kl. 16.00; gemensam parkeringsvärd vid skiftet kl. 14.30–16.00).",
    actionLabel: "Läs om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: true, badge: "Premiär",
  },
  {
    id: "hss-2-2027-01-31", title: "Helgskidskola – Tillfälle 2", shortDate: "Söndag 31 januari 2027",
    day: "31", month: "JAN", year: "2027", monthIndex: 0, start: "20270131", end: "20270201",
    time: "09:30 – 14:30", location: "Ekholmsnäsbacken, Lidingö", category: "helgskidskola", categoryLabel: "Helgskidskola",
    tagline: "Förmiddag 09.30–10.45 · Lunch 11.15–12.30 · Eftermiddag 13.15–14.30",
    description: "Helgskidskolans andra tillfälle i Ekholmsnäsbacken. Förmiddagen helt fri för skidskola (eventuell LSK Klubbcup U8 på eftermiddagen, aktiv P-dirigering kl. 14.30–15.45).",
    actionLabel: "Läs om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: false, badge: "v. 4",
  },

  // === FEBRUARI 2027 ===
  {
    id: "traning-2027-02-01", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 1 februari 2027",
    day: "01", month: "FEB", year: "2027", monthIndex: 1, start: "20270201", end: "20270202",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 5). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 5",
  },
  {
    id: "traning-2027-02-03", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 3 februari 2027",
    day: "03", month: "FEB", year: "2027", monthIndex: 1, start: "20270203", end: "20270204",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 5). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 5",
  },
  {
    id: "hss-3-2027-02-06", title: "Helgskidskola – Tillfälle 3", shortDate: "Lördag 6 februari 2027",
    day: "06", month: "FEB", year: "2027", monthIndex: 1, start: "20270206", end: "20270207",
    time: "09:30 – 14:30", location: "Ekholmsnäsbacken, Lidingö", category: "helgskidskola", categoryLabel: "Helgskidskola",
    tagline: "Förmiddag 09.30–10.45 · Lunch 11.15–12.30 · Eftermiddag 13.15–14.30",
    description: "Helgskidskolans tredje tillfälle. Backen är 100 % fri för vår skidskola hela dagen.",
    actionLabel: "Läs om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: false, badge: "v. 5",
  },
  {
    id: "traning-2027-02-08", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 8 februari 2027",
    day: "08", month: "FEB", year: "2027", monthIndex: 1, start: "20270208", end: "20270209",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 6). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 6",
  },
  {
    id: "traning-2027-02-10", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 10 februari 2027",
    day: "10", month: "FEB", year: "2027", monthIndex: 1, start: "20270210", end: "20270211",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 6). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 6",
  },
  {
    id: "rookie-series-ekholmsnas-2027", title: "Vår tävling (Freeskiers Skidklubb) – Rookie Series Stockholm", shortDate: "Söndag 14 februari 2027",
    day: "14", month: "FEB", year: "2027", monthIndex: 1, start: "20270214", end: "20270215",
    time: "09:30 – 14:00 (prisutdelning 14:15–14:45)", location: "Ekholmsnäsbacken Snowpark, Lidingö", category: "tavling", categoryLabel: "Tävling & Event",
    tagline: "Klubbens tävling i Ekholmsnäsbacken (v. 6) i samarbete med SSF",
    description: "Vår freeski-tävling i Ekholmsnäsbacken körs förmiddag/lunch med avslut ca kl. 14.00 samt prisutdelning och hemgång ca 14.15–14.45. Jam-format för Kids, Ungdom och Junior. Samordning i backen och på parkeringen (kl. 13.45–15.15) med LSK Klubbcup 2 som startar kl. 15.00.",
    actionLabel: "Läs om Rookie Series", actionUrl: "/rookie-series", isPushedTop: true, badge: "🏆 Vår tävling · v. 6",
  },
  {
    id: "traning-2027-02-15", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 15 februari 2027",
    day: "15", month: "FEB", year: "2027", monthIndex: 1, start: "20270215", end: "20270216",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 7). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 7",
  },
  {
    id: "traning-2027-02-17", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 17 februari 2027",
    day: "17", month: "FEB", year: "2027", monthIndex: 1, start: "20270217", end: "20270218",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 7). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 7",
  },
  {
    id: "hss-4-2027-02-20", title: "Helgskidskola – Tillfälle 4", shortDate: "Lördag 20 februari 2027",
    day: "20", month: "FEB", year: "2027", monthIndex: 1, start: "20270220", end: "20270221",
    time: "09:30 – 14:30", location: "Ekholmsnäsbacken, Lidingö", category: "helgskidskola", categoryLabel: "Helgskidskola",
    tagline: "Förmiddag 09.30–10.45 · Lunch 11.15–12.30 · Eftermiddag 13.15–14.30",
    description: "Helgskidskolans fjärde tillfälle. Backen är 100 % fri för vår skidskola hela dagen.",
    actionLabel: "Läs om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: false, badge: "v. 7",
  },
  {
    id: "hss-5-2027-02-21", title: "Helgskidskola – Tillfälle 5", shortDate: "Söndag 21 februari 2027",
    day: "21", month: "FEB", year: "2027", monthIndex: 1, start: "20270221", end: "20270222",
    time: "09:30 – 14:30", location: "Ekholmsnäsbacken, Lidingö", category: "helgskidskola", categoryLabel: "Helgskidskola",
    tagline: "Förmiddag 09.30–10.45 · Lunch 11.15–12.30 · Eftermiddag 13.15–14.30",
    description: "Helgskidskolans femte och avslutande tillfälle. Backen är 100 % fri för vår skidskola hela dagen.",
    actionLabel: "Läs om Helgskidskolan", actionUrl: "/helgskidskola", isPushedTop: false, badge: "Avslutning",
  },
  {
    id: "traning-2027-02-22", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 22 februari 2027",
    day: "22", month: "FEB", year: "2027", monthIndex: 1, start: "20270222", end: "20270223",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 8). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 8",
  },
  {
    id: "traning-2027-02-24", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 24 februari 2027",
    day: "24", month: "FEB", year: "2027", monthIndex: 1, start: "20270224", end: "20270225",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 8). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 8",
  },

  // === MARS 2027 ===
  {
    id: "traning-2027-03-01", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 1 mars 2027",
    day: "01", month: "MAR", year: "2027", monthIndex: 2, start: "20270301", end: "20270302",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 9). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 9",
  },
  {
    id: "traning-2027-03-03", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 3 mars 2027",
    day: "03", month: "MAR", year: "2027", monthIndex: 2, start: "20270303", end: "20270304",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 9). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 9",
  },
  {
    id: "traning-2027-03-08", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 8 mars 2027",
    day: "08", month: "MAR", year: "2027", monthIndex: 2, start: "20270308", end: "20270309",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 10). Samordning på parkeringen då LSK USM-kval SL (D) pågår från kl. 17.00 – parkera kompakt och samåk gärna.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 10 · P-samordning",
  },
  {
    id: "traning-2027-03-10", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 10 mars 2027",
    day: "10", month: "MAR", year: "2027", monthIndex: 2, start: "20270310", end: "20270311",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 10). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 10",
  },
  {
    id: "traning-2027-03-15", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 15 mars 2027",
    day: "15", month: "MAR", year: "2027", monthIndex: 2, start: "20270315", end: "20270316",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 11). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 11",
  },
  {
    id: "traning-2027-03-17", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 17 mars 2027",
    day: "17", month: "MAR", year: "2027", monthIndex: 2, start: "20270317", end: "20270318",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie onsdagsträning i Ekholmsnäsbacken (v. 11). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 11",
  },
  {
    id: "traning-2027-03-22", title: "Träning Måndag: Freeskiers Skidklubb Åk 1–4 (måndag) & Åk 6–9", shortDate: "Måndag 22 mars 2027",
    day: "22", month: "MAR", year: "2027", monthIndex: 2, start: "20270322", end: "20270323",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Mån)",
    tagline: "Åk 1–4 måndag (18.15–19.45) · Åk 6–9 (19.45–21.15)",
    description: "Ordinarie måndagsträning i Ekholmsnäsbacken (v. 12, sista veckan före påsk). Åk 1–4 måndag tränar kl. 18.15–19.45 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 12",
  },
  {
    id: "traning-2027-03-24", title: "Träning Onsdag: Freeskiers Skidklubb Åk 1–4 (onsdag), Åk 5 & Åk 6–9", shortDate: "Onsdag 24 mars 2027",
    day: "24", month: "MAR", year: "2027", monthIndex: 2, start: "20270324", end: "20270325",
    time: "18:15 – 21:15", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning (Ons)",
    tagline: "Åk 1–4 onsdag (18.15–19.45) · Åk 5 (19.45–21.15) · Åk 6–9 (19.45–21.15)",
    description: "Avslutande onsdagsträning före påsk i Ekholmsnäsbacken (v. 12). Åk 1–4 onsdag tränar kl. 18.15–19.45 samt Åk 5 och Åk 6–9 kl. 19.45–21.15.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: false, badge: "v. 12 · Före påsk",
  },
];

/** Delar upp en intern länk som "/om-oss#bli-tranare" till Link-props */
export function eventLink(url?: string): { to: string; hash?: string } {
  const [to = "/kalender", hash] = (url ?? "/kalender").split("#");
  return hash ? { to, hash } : { to };
}

export type DepartmentEmail = { id: string; name: string; email: string; shortDesc: string; focus: string };

// Funktionsadresser – repo commit f776ca02 (KontaktPage)
export const departmentEmails: DepartmentEmail[] = [
  { id: "admin", name: "Administration", email: "admin@lidingofreeskiers.se", shortDesc: "Föreningsfrågor, ekonomi, avgifter & sponsring", focus: "Övergripande föreningsfrågor, medlemsregister, fakturor och partnerskap." },
  { id: "helg", name: "Helgskidskolan", email: "helg@lidingofreeskiers.se", shortDesc: "", focus: "Frågor gällande gruppindelning (Grön, Blå, Röd), lektionstider och anmälan i Helgskidskolan." },
  { id: "skidklubb", name: "Freeskiers Skidklubb", email: "skidklubb@lidingofreeskiers.se", shortDesc: "Vardagsträning, park & friåkning", focus: "Frågor gällande skidklubbens grupper, anmälan och träningar." },
  { id: "privatlektioner", name: "Privatlektioner", email: "privatlektion@lidingofreeskiers.se", shortDesc: "Individuell coachning & teknikpass", focus: "Frågor gällande bokning, ändringar, avbokning eller annat angånde privatlektioner." },
];

/** Mejladressen för en av klubbens funktioner, t.ex. departmentEmail("helg"). */
export function departmentEmail(id: string) {
  return departmentEmails.find((d) => d.id === id)?.email ?? CONTACT_EMAIL;
}

export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Gadelius", logo: gadeliusLogo },
  { name: "Ekholmsnäsbacken", logo: ekholmsnasLogo },
  { name: "Alpingaraget", logo: alpingaragetLogo },
  { name: "Kang Poles", logo: kangLogo },
  { name: "Stockholm Bordsuthyrning", logo: stockholmbordsuthyrningLogo },
  { name: "Lidingö Centrum", logo: lidingocentrumLogo },
];

export type GalleryPhoto = { src: string; alt: string };

export const gallery: GalleryPhoto[] = [
  { src: helgskidskolaGrupp, alt: "Helgskidskolan i toppen av Ekholmsnäsbacken" },
  { src: skidklubbHopp.url, alt: "Freeskiers-åkare i hopp med röda skidor i Ekholmsnäsbacken på kvällen" },
  { src: freeskiPowder, alt: "Friåkning i lössnö" },
  { src: privatCoach, alt: "Tränare och åkare i backen" },
  { src: ekholmsnasSunset, alt: "Solnedgång över Ekholmsnäs" },
];

export type SeasonPhase = {
  id: "early-autumn" | "pre-winter" | "high-winter" | "spring-winter";
  shortName: string;
  name: string;
  months: string;
  monthNumbers: number[];
  tagline: string;
  activities: string[];
  actionLabel: string;
  actionPath: "/hostsasong" | "/kontakt" | "/helgskidskola" | "/om-oss";
};

export const seasonPhases: SeasonPhase[] = [
  {
    id: "early-autumn",
    shortName: "Tidig höst",
    name: "Tidig Höst",
    months: "September – Oktober",
    monthNumbers: [8, 9],
    tagline: "Uppstart & Anmälan inför vintern",
    activities: [
      "Höstträning startar med barmark, koordination & studsmatta",
      "Utbildningshelg för nya och fortsättande tränare (åk 9+)",
      `ANMÄLAN ÖPPNAR: ${REGISTRATION_OPEN} för lediga platser (först till kvarn!)`,
      "Information och planering för säsongens grupper",
    ],
    actionLabel: "Läs om Höstsäsongen",
    actionPath: "/hostsasong",
  },
  {
    id: "pre-winter",
    shortName: "Förvinter",
    name: "Förvinter & Förberedelser",
    months: "November – December",
    monthNumbers: [10, 11],
    tagline: "Klubbkvällar & Snöläggning i Ekholmsnäs",
    activities: [
      "Snöläggningen startar så fort kylan kommer till Lidingö",
      "Skidbytardag & Klubbkväll i Alpingaraget – utrustningscheck",
      "Ledarsamling och genomgång av träningsupplägg och säkerhet",
      "Välkomstmejl och samlingsinfo skickas ut till alla anmälda",
    ],
    actionLabel: "Utrustning & Frågor",
    actionPath: "/kontakt",
  },
  {
    id: "high-winter",
    shortName: "Vinter",
    name: "Högsäsong Vinter",
    months: "Januari – Februari",
    monthNumbers: [0, 1],
    tagline: "Full fart i Ekholmsnäsbacken!",
    activities: [
      "Freeskiers Helgskidskola körs under 5 helger i januari & februari",
      "Freeskiers Skidklubb tränar på vardagskvällar i park och pist",
      "Privatlektioner med klubbens certifierade tränare",
      "Massor av åkglädje, hopp, rails och nya kompisar på snö",
    ],
    actionLabel: "Till Helgskidskolan",
    actionPath: "/helgskidskola",
  },
  {
    id: "spring-winter",
    shortName: "Vårvinter",
    name: "Vårvinter & Event",
    months: "Mars – April",
    monthNumbers: [2, 3],
    tagline: "Tävlingar, Vårsol & Säsongsavslutning",
    activities: [
      "Klubbens deltävling i Rookie Series Stockholm",
      "Klubbmästerskap med festlig stämning och korvgrillning",
      "Klubbresor och härlig vårskidåkning i längre dagar",
      "Diplomutdelning och säsongsavslutning för alla åkare",
    ],
    actionLabel: "Om Klubben & Event",
    actionPath: "/om-oss",
  },
];

export const faqs = [
  {
    q: "Vilken utrustning behöver mitt barn ha med sig?",
    a: "Hälm är ett absolut krav i både Helgskidskolan och Freeskiers skidklubb. I skidklubben krävs även ryggskydd medan det endast rekommenderas till skidskolan. Skidorna ska ha fungerande bindningar inställda efter barnets längd och vikt. Stavar behövs inte för nybörjare. Skidor, pjäxor, stavar och hjälmar kan hyras av Ekholmsnäsbackens skiduthyrning.",
    tags: ["hjälm", "ryggskydd", "utrustning", "bindningar"],
  },
  {
    q: "Ingår liftkort i deltagaravgiften?",
    a: "Liftkort behövs inte i Helgskidskolan – vi har en egen liftkö. Skidklubbens träningsavgifter inkluderar liftkort, och vid privatlektion ingår ett tillfälligt liftkort under lektionen.",
    tags: ["liftkort", "avgift", "betalning"],
  },
  {
    q: "Hur fungerar statliga Fritidskortet hos er?",
    a: "IK Lidingö Freeskiers är anslutna till Riksidrottsförbundet och godkänd förening för Fritidskortet. Du kan använda ditt barns fritidskortsaldo för att betala hela eller delar av deltagar- och medlemsavgiften.",
    tags: ["fritidskortet", "bidrag", "betalning", "riksidrottsforbundet"],
  },
  {
    q: "Är mitt barn försäkrat under träningarna?",
    a: "Ja! Alla deltagare med erlagd medlemsavgift är olycksfallsförsäkrade genom Svenska Skidförbundets gemensamma medlemsförsäkring hos Folksam under klubbens organiserade träningar och resor.",
    tags: ["försäkring", "skidförbundet", "folksam", "trygghet"],
  },
  {
    q: "Vad händer vid dåligt väder eller om det är för lite snö i Ekholmsnäsbacken?",
    a: "Om vädret är för dåligt eller om en lektion måste ställas in på grund av väder- eller snöläget så ställs den lektionen in och ersätts inte med ett nytt datum.",
    tags: ["snö", "inställt", "väder", "snöläggning"],
  },
  {
    q: "Kan man få pengar tillbaka om barnet blir sjukt eller skadat?",
    a: "Enligt klubbens avboknings- och återbetalningsregler utgår ingen återbetalning vid skada, sjukdom eller missade tillfällen, då tränare och backtider bokas och bekostas i förväg för hela säsongen.",
    tags: ["återbetalning", "avbokning", "sjukdom", "policy"],
  },
  {
    q: "Vilken grupp passar mitt barn?",
    a: "Gör skidtestet ”Hitta rätt nivå” här på sajten – tre frågor om ålder, kunskapsnivå och vad åkaren framför allt vill göra, och du får ett förslag. Helgskidskolan vänder sig till åkare från 5 år och Skidklubben till åk 1–9 som uppfyller minimikraven; för yngre nybörjare och vuxna passar en privatlektion.",
    tags: ["nivå", "grupp", "guide"],
  },
  {
    q: "Kan vuxna åka med er?",
    a: "Ja! Klubbens instruktörer erbjuder privatlektioner för barn, ungdomar och vuxna – en eller två personer i 60 minuter. Boka direkt på privatlektionssidan; liftkort ingår under lektionen.",
    tags: ["vuxna", "föräldrar", "privatlektion"],
  },
];


/** Höstsäsongen – innehåll från klubbens tidigare webbplats. */
export const hostsasongSida = {
  registrationOpen: false,
  closedText: "Anmälan till Höstsäsongen är nu stängd. Barmarksträningen pågår varje onsdag fram till december.",
  price: "795 kr",
  trampolinOnlyPrice: "600 kr",
  requirement: "",
  priority:
    "Den som är anmäld till höstsäsongen har förtur till Freeskiers Skidklubb. ",
  contactEmail: "admin@lidingofreeskiers.se",
  barmark: {
    title: "Barmarksträning",
    lead: "Tillsammans skapar vi oss de bästa förutsättningarna inför säsongspremiären!",
    text: "Varje onsdag fram till december kl. 18.30–19.30 vid Stockby, oavsett väder. Barn och vuxna tränar tillsammans. Lekfullt, roligt och jobbigt är temat – med mycket fokus på skidåkarmuskler så att säsongspremiären blir den bästa möjliga!",
    meeting: "Samling kl. 18.30 vid Gula huset / Papilles / Stockby motionsgård.",
    mapUrl: "https://maps.app.goo.gl/oGCH2CBRmXTyzYsw7",
    mapLabel: "Hitta till barmarksträningen",
  },
  trampolin: {
    title: "Träning i Vikingahallen för säker freeski- och snowboardåkning i park",
    lead: "Vi håller till i GT Vikingarnas lokal på Lidingö, Vikingahallen!",
    text: "Bygg upp styrka, balans, koordination och självförtroende i luften innan snön faller! Träna rotationer, grabs och kroppskontroll i luften under trygga former på studsmatta innan du testar dem på snö. Du lär dig nya trick, får feedback på din teknik och inspireras av andra i samma ålder. Det är ett effektivt sätt att bli tryggare med att hoppa i backen. Våra tränare är utbildade i hoppteknik, så det finns gott om kunniga tränare på plats.",
    mapUrl: "https://maps.app.goo.gl/mDR4ezqEVsf78ZFCA",
    mapLabel: "Hitta till trampolinträningen",
    groups: [
      { label: "Årskurs 1–4", time: "kl. 18.00–19.30" },
      { label: "Årskurs 5–9", time: "kl. 19.30–21.00" },
    ] as { label: string; time: string }[],
    dates: [
      "23 oktober",
      "13 november",
      "27 november",
      "4 december",
      "11 december",
    ] as string[],
  },
};

/** Webbshop – innehåll och länkar från https://www.lidingofreeskiers.se/resor/ */
export const webbshopSida = {
  lead: "Vi lanserar våran egen webbshop i samarbete med Intersport på Lidingö.",
  stepsTitle: "Så här handlar du:",
  steps: [
    "Klicka på länken till webbshopen nedan",
    "Betala enkelt och säkert online",
    "Välj mellan postleverans eller upphämtning i butik",
  ],
  pickupNote: "Upphämtning sker endast hos Intersport i Lidingö Centrum",
  ctaLabel: "Kom till Freeskiers webbshop",
  shopUrl: WEBBSHOP_URL,
  originalPageUrl: "https://www.lidingofreeskiers.se/resor/",
  productsTitle: "Priser",
  products: [
    { name: "Hoodie vuxen", price: "499 kr" },
    { name: "Hoodie barn", price: "449 kr" },
    { name: "Mössa", price: "279–299 kr" },
    { name: "Keps", price: "299 kr" },
    { name: "Skistrap", price: "59 kr" },
    { name: "Buff", price: "179–229 kr" },
    { name: "Kaffetermos", price: "229 kr" },
  ],
  productsPhoto: webbshopProdukter,
  productsPhotoAlt: "Lidingö Freeskiers kollektion: hoodie, mössor, keps, buff, skistrap och kaffetermos",
};

/** Samarbete European Snowsport – innehåll från https://www.freeskiers.se/samarbete-european-snowsport/ */
export const europeanSnowsportSamarbete = {
  eyebrow: "Internationellt samarbete",
  title: "Samarbete European Snowsport",
  headline: "Skidlärare i Alperna med European Snowsport",
  paragraphs: [
    "Freeskiers och European Snowsport, ES, är partner skidskolor. Vi är otroligt glada över detta fantastiska och exklusiva samarbetet vi har med ES, vilket möjliggör en omfattande utveckling för våra tränare och skidlärare samtidigt som ES får tillgång till duktiga skidlärare.",
    "Freeskiers samarbetar tätt med European Snowsport (ES) för att erbjuda våra egna Freeskiers tränare unika möjligheter att praktisera, träna och arbeta inom en internationell skidskola i Alperna. Samarbetet grundar sig på att våra tränare, efter att ha genomgått utbildning Steg 2, får möjlighet att arbeta ett antal veckor under högsäsongen och sedan, efter gymnasiet, jobba en hel säsong i Alperna för ES skidskola. För ES innebär detta en möjlighet att välkomna våra välutbildade skidlärare från Freeskiers till sina anläggningar. Våra Freeskiers tränare har en gedigen erfarenhet av skidskola och har genomgått Camp Freeskiers utbildningar med fokus på HLR, service och ledarskap, samt har avklarat Friluftsfrämjandets skidlärautbildningar.",
    "Tillsammans med ES kommer vi även att genomföra camps för våra vuxna Oldies & Goldies i Verbier, med start från 2024. Detta kommer ge våra vuxna skidentusiaster en oförglömlig och berikande upplevelse i skidåkningens mecka.",
  ],
  infoPrompt: "För mer information om European Snowsport, klicka nedan:",
  externalUrl: "https://europeansnowsport.com/sv/",
  contactTitle: "Kontakt",
  contactText: "Vill du veta mer och anmäla dig? Hör av dig till Olle Lundström på",
  contactEmail: "olle.lundstrom@greatwideopen.se",
  logo: europeanSnowsportLogo,
  logoAlt: "European Snowsport – Ski and Snowboard School",
  photo: europeanSnowsportPhoto,
  photoAlt: "Skidlärare i Alperna hos European Snowsport",
};

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

import alpingaragetLogo from "@/assets/partners/alpingaraget.png";
import ekholmsnasLogo from "@/assets/partners/ekholmsnas.png";
import gadeliusLogo from "@/assets/partners/gadelius.png";
import kangLogo from "@/assets/partners/kang.png";
import stockholmbordsuthyrningLogo from "@/assets/partners/stockholmbordsuthyrning.png";

// Klubbens riktiga länkar (visas aldrig som systemnamn för besökarna)
export const CLUB_URL = "https://www.lidingofreeskiers.se";
export const BOOKING_URL = "https://sportadmin.se/book/?F=7631cd86-189b-4c49-bfc0-3ba70fe1f127";
export const PRIVATE_BOOKING_URL = "https://www.lidingofreeskiers.se/privatlektion/";
export const EQUIPMENT_RENTAL_URL = "https://www.ekholmsnasbacken.se/uthyrning";
export const SLOPE_MAP_URL = "https://maps.app.goo.gl/m3gQEfDvu73twtnh8";
export const WEBCAM_URL = CLUB_URL;
export const CONTACT_EMAIL = "admin@lidingofreeskiers.se";
export const SLOPE_ADDRESS = "Ekholmsnäsvägen 87, 181 41 Lidingö";
export const INSTAGRAM_URL = "https://www.instagram.com/lidingofreeskiers/";
export const FACEBOOK_URL = "https://www.facebook.com/freeskierslidingo/";
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
    dateStatus: "Datum för vintersäsongen meddelas när planeringen är klar.",
    sessions: ["Förmiddag 09.30–10.45", "Lunch 11.15–12.30", "Eftermiddag 13.15–14.30"],
    gathering:
      "Kom i god tid för att hitta rätt grupp och delta i uppropet. Barnen delas in i mindre grupper med färgade västar. Efter lektionen samlas alla på samma plats som vid starten.",
  },
  equipment: {
    required: "Alla barn måste ha hjälm i backen. Ryggskydd rekommenderas.",
    preparation:
      "Kontrollera före säsongsstart att skidorna är i gott skick, att pjäxorna passar och att bindningarna är korrekt inställda.",
    rental:
      "Skidor, pjäxor, stavar och hjälm kan hyras för samtliga skidskoletillfällen. Utrustningen tas med hem och används under Helgskidskolans veckor. Lägg till skidhyra vid anmälan. Information om uthämtning skickas inför kursstart och utrustningen återlämnas vid sista tillfället.",
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
      text: "Ta med fungerande skidor, pjäxor, hjälm, skidkläder och vantar. Stavar behövs inte för nybörjare.",
    },
    {
      title: "Samlingsplats",
      text: "Tränaren möter er vid skiduthyrningen och bär en mörkblå tränarjacka.",
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
        title: "Tidigare medlemmar",
        tag: "Förtur",
        text: "Den 4 oktober skickas en avisering till alla tidigare medlemmar. Där väljer du att behålla eller frigöra din plats. Sista betalningsdag är 14 oktober.",
      },
      {
        title: "Deltagare i Höstsäsongen",
        tag: "Förtur",
        text: "Den som är anmäld till årets Höstsäsong har förtur till vintersäsongen. Ett mail med betalningslänk skickas den 4 oktober. Sista betalningsdag är 14 oktober.",
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
      group: "Årskurs 1–4",
      days: "Måndag eller onsdag",
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
      highlight: true,
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
      "Vi tränar i Ekholmsnäsbacken på Lidingö. Två nedfarter – en barnbacke och en tävlingsbacke – och två liftar. Med en ny park, förbättrat barnområde och bräddad backe från 2024 tillgodoser backen alla, oavsett nivå.",
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
    photoAlt: "Freeskiers skidklubb i Ekholmsnäsbacken",
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
  specialty: string;
  bio: string;
};

export const coaches: Coach[] = [
  {
    name: "Filippa",
    role: "Huvudtränare & Utbildare",
    specialty: "Park, rails & trygghet för unga",
    bio: "Åkt i klubben sedan barnsben. Brinner för att hjälpa barn att våga testa nya saker och ha roligt i backen.",
  },
  {
    name: "Oskar",
    role: "Skidklubbstränare",
    specialty: "Big Air, 360s & carving",
    bio: "Mångårig åkare med stor passion för hoppteknik och skidkänsla. Certifierad instruktör.",
  },
  {
    name: "Wilma",
    role: "Skidskoleinstruktör",
    specialty: "Nybörjare & barnskidskola",
    bio: "Expert på att få de yngsta åkarna att känna sig trygga och glada i liften och barnbacken.",
  },
  {
    name: "Hugo",
    role: "Freestyletränare",
    specialty: "Jibbing, boxar & switch",
    bio: "Kreativ skidåkare som inspirerar till rörelse och lekfullhet över hela backen.",
  },
];

export const board = [
  { name: "Stefan Aaröe", role: "Styrelseledamot" },
  { name: "", role: "" },
];

export type EventCategory = "anmalan" | "traning" | "tavling" | "klubbkvall" | "lager";

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

// Synkat mot repo commit f776ca02 (src/data/clubEvents.ts)
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
    id: "tranarutbildning-host-2026", title: "Tränarutbildning & Ledarsamling (åk 9+)", shortDate: "24–25 oktober 2026",
    day: "24", month: "OKT", year: "2026", monthIndex: 9, start: "20261024", end: "20261026",
    time: "09:00 – 16:00", location: "", category: "traning", categoryLabel: "Träning & Ledare",
    tagline: "Utbildningshelg för nya och fortsättande ledare",
    description: "Vi samlar klubbens tränarstab och nya ungdomsledare som gått ut nian för genomgång av pedagogik, säkerhet, övningar och planering inför vintersäsongen.",
    actionLabel: "Bli tränare i klubben", actionUrl: "/om-oss#bli-tranare", isPushedTop: false, badge: "Ledarutveckling",
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
    id: "klubbkvall-alpingaraget-2026", title: "Klubbkväll & Utrustningscheck i Alpingaraget", shortDate: "12 november 2026",
    day: "12", month: "NOV", year: "2026", monthIndex: 10, start: "20261112", end: "20261113",
    time: "18:00 – 20:30", location: "Alpingaraget, Birger Jarlsgatan, Stockholm", category: "klubbkvall", categoryLabel: "Klubbkväll & Partner",
    tagline: "Medlemsrabatter, bootfitting och klubbjackor",
    description: "Exklusiv klubbkväll hos vår samarbetspartner Alpingaraget. Träffa tränarna, prova ut rätt pjäxor och skidor med experthjälp, köp hjälm och ryggskydd med klubbrabatt samt beställ årets klubbjacka.",
    actionLabel: "Läs om partners & utrustning", actionUrl: "/sponsor", isPushedTop: true, badge: "Klubbkväll",
  },
  {
    id: "snolaggning-ekholmsnas-2026", title: "Snöläggning & Pistpreparering i Ekholmsnäs", shortDate: "December 2026",
    day: "01", month: "DEC", year: "2026", monthIndex: 11, start: "20261201", end: "20261202",
    time: "Hela dygnet vid minusgrader", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Backstatus",
    tagline: "Snökanonerna startar så fort kylan anländer",
    description: "Ekholmsnäsbackens snöteam lägger grunden för vinterns alla spår och snowparken. Följ backstatus direkt på vår webbplats för uppdateringar om öppningsdatum!",
    actionLabel: "Se backstatus", actionUrl: "/", isPushedTop: false, badge: "Snöläggning",
  },
  {
    id: "sasongsstart-vinter-2027", title: "Säsongsstart för Freeskiers Skidklubb & Helgskidskola", shortDate: "9–10 januari 2027",
    day: "09", month: "JAN", year: "2027", monthIndex: 0, start: "20270109", end: "20270111",
    time: "Se gruppens schema", location: "Ekholmsnäsbacken, Lidingö", category: "traning", categoryLabel: "Träning & Backe",
    tagline: "Första lektionerna och träningspassen på snö!",
    description: "Nu drar vi igång! Helgskidskolans grupper kör igång med pass på lördagar/söndagar och Skidklubben startar sina vardagskvällar. Samling vid klubbflaggan vid barnbacken.",
    actionLabel: "Se Skidklubben", actionUrl: "/skidklubb", isPushedTop: true, badge: "Premiär",
  },
  {
    id: "rookie-series-ekholmsnas-2027", title: "Rookie Series Stockholm i Ekholmsnäsbacken", shortDate: "13–14 februari 2027",
    day: "13", month: "FEB", year: "2027", monthIndex: 1, start: "20270213", end: "20270215",
    time: "09:30 – 15:30", location: "Ekholmsnäsbacken Snowpark, Lidingö", category: "tavling", categoryLabel: "Tävling & Event",
    tagline: "Sveriges roligaste instegstävling i Slopestyle & Big Air",
    description: "I samarbete med Svenska Skidförbundet (SSF). Jam-format utan utslagning, massor av åk för Kids, Ungdom och Junior. DJ, grillade burgare och prisbord från Gadelius & Alpingaraget.",
    actionLabel: "Läs om Rookie Series", actionUrl: "/rookie-series", isPushedTop: true, badge: "SSF Tävling",
  },
  {
    id: "sportlovslager-2027", title: "Sportlovscamp & Parksessioner", shortDate: "Vecka 9 (1–5 mars 2027)",
    day: "01", month: "MAR", year: "2027", monthIndex: 2, start: "20270301", end: "20270306",
    time: "10:00 – 14:00", location: "Ekholmsnäsbacken, Lidingö", category: "lager", categoryLabel: "Läger & Lov",
    tagline: "Intensiva friåkningsdagar med klubbens tränare",
    description: "Öppet för alla klubbens åkare under sportlovet. Fokus på park, trick, rails och mycket skidglädje tillsammans med kompisarna när skolan har lov.",
    actionLabel: "Se verksamhet", actionUrl: "/skidklubb", isPushedTop: false, badge: "Lovläger",
  },
  {
    id: "klubbmasterskap-avslutning-2027", title: "Klubbmästerskap & Stor Säsongsavslutning", shortDate: "27 mars 2027",
    day: "27", month: "MAR", year: "2027", monthIndex: 2, start: "20270327", end: "20270328",
    time: "11:00 – 16:00", location: "Ekholmsnäsbacken, Lidingö", category: "tavling", categoryLabel: "Klubbfest & Tävling",
    tagline: "Gemensam festdag med trick, skojtävling & diplomutdelning",
    description: "Årets stora höjdpunkt för hela familjen! Alla deltagare från Helgskidskolan och Skidklubben bjuds in till skojtävlingar, grillfest, tränaruppvisning och diplomutdelning.",
    actionLabel: "Läs om klubben", actionUrl: "/om-oss", isPushedTop: false, badge: "Säsongsavslutning",
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
  { id: "privatlektioner", name: "Privatlektioner", email: "privatlektioner@lidingofreeskiers.se", shortDesc: "Individuell coachning & teknikpass", focus: "Frågor gällande bokning, ändringar, avbokning eller annat angånde privatlektioner." },
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
];

export type GalleryPhoto = { src: string; alt: string };

export const gallery: GalleryPhoto[] = [
  { src: helgskidskolaGrupp, alt: "Helgskidskolan i toppen av Ekholmsnäsbacken" },
  { src: skidklubbHopp.url, alt: "Freeskiers skidklubb i Ekholmsnäsbacken" },
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
    a: "Godkänd hjälm är ett absolut krav i både Helgskidskolan och Freeskiers skidklubb. I skidklubben krävs även ryggskydd medan det endast rekommenderas till skidskolan.\nSkidorna ska ha fungerande bindningar inställda efter barnets längd och vikt. Stavar behövs inte för nybörjare.\nSkidor, pjäxor, stavar och hjälmar kan hyras av Ekholmsnäsbackens skiduthyrning.",
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
    q: "Vad händer om det är för lite snö i Ekholmsnäsbacken?",
    a: "Ekholmsnäsbacken har ett effektivt snökanonsystem och öppnar så fort kylan tillåter. Skulle snön dröja till säsongsstarten flyttas träningarna framåt eller ersätts med andra datum under säsongen.",
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

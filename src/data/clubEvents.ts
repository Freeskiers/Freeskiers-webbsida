export interface ClubEvent {
  id: string;
  title: string;
  shortDate: string;
  day: string;
  month: string;
  year: string;
  monthIndex: number; // 9 = Okt, 10 = Nov, 11 = Dec, 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr
  time: string;
  location: string;
  category: 'anmalan' | 'traning' | 'tavling' | 'klubbkvall' | 'lager';
  categoryLabel: string;
  categoryColor: string;
  tagline: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  isPushedTop: boolean; // Om sant visas detta event i toppvyn (Top Event Banner)
  badge?: string;
}

export const clubEvents: ClubEvent[] = [
  {
    id: 'anmalan-oppnar-2026',
    title: 'Anmälan öppnar för säsongen 2026/2027',
    shortDate: '16 oktober 2026',
    day: '16',
    month: 'OKT',
    year: '2026',
    monthIndex: 9,
    time: 'Kl. 09:00',
    location: 'Online via SportAdmin & Webbplatsen',
    category: 'anmalan',
    categoryLabel: 'Anmälan & Platser',
    categoryColor: 'bg-amber-500/15 text-amber-800 border-amber-300',
    tagline: 'Lediga platser till Helgskidskola & Freeskiers Skidklubb',
    description: 'Anmälan för alla lediga platser till Helgskidskolan (Grön, Blå, Röd grupp) och Skidklubbens vardagsträning öppnar. Vi tillämpar inget kösystem utan först till kvarn gäller!',
    actionLabel: 'Läs om anmälan & grupper',
    actionUrl: '/helgskidskola',
    isPushedTop: true,
    badge: '🔥 Viktigt datum'
  },
  {
    id: 'tranarutbildning-host-2026',
    title: 'Tränarutbildning & Ledarsamling (åk 9+)',
    shortDate: '24–25 oktober 2026',
    day: '24',
    month: 'OKT',
    year: '2026',
    monthIndex: 9,
    time: '09:00 – 16:00',
    location: 'Ekholmsnäsbackens klubbrum / Gymnastikhall',
    category: 'traning',
    categoryLabel: 'Träning & Ledare',
    categoryColor: 'bg-blue-500/15 text-blue-800 border-blue-300',
    tagline: 'Utbildningshelg för nya och fortsättande ledare',
    description: 'Vi samlar klubbens tränarstab och nya ungdomsledare som gått ut nian för genomgång av pedagogik, säkerhet, övningar och planering inför vintersäsongen.',
    actionLabel: 'Bli tränare i klubben',
    actionUrl: '/om-oss#bli-tranare',
    isPushedTop: false,
    badge: 'Ledarutveckling'
  },
  {
    id: 'klubbkvall-alpingaraget-2026',
    title: 'Klubbkväll & Utrustningscheck i Alpingaraget',
    shortDate: '12 november 2026',
    day: '12',
    month: 'NOV',
    year: '2026',
    monthIndex: 10,
    time: '18:00 – 20:30',
    location: 'Alpingaraget, Birger Jarlsgatan, Stockholm',
    category: 'klubbkvall',
    categoryLabel: 'Klubbkväll & Partner',
    categoryColor: 'bg-purple-500/15 text-purple-800 border-purple-300',
    tagline: 'Medlemsrabatter, bootfitting och klubbjackor',
    description: 'Exklusiv klubbkväll hos vår samarbetspartner Alpingaraget. Träffa tränarna, prova ut rätt pjäxor och skidor med experthjälp, köp hjälm och ryggskydd med klubbrabatt samt beställ årets klubbjacka.',
    actionLabel: 'Läs om partners & utrustning',
    actionUrl: '/sponsor',
    isPushedTop: true,
    badge: '🛍️ Klubbkväll'
  },
  {
    id: 'snolaggning-ekholmsnas-2026',
    title: 'Snöläggning & Pistpreparering i Ekholmsnäs',
    shortDate: 'December 2026',
    day: '01',
    month: 'DEC',
    year: '2026',
    monthIndex: 11,
    time: 'Hela dygnet vid minusgrader',
    location: 'Ekholmsnäsbacken, Lidingö',
    category: 'traning',
    categoryLabel: 'Backstatus',
    categoryColor: 'bg-cyan-500/15 text-cyan-800 border-cyan-300',
    tagline: 'Snökanonerna startar så fort kylan anländer',
    description: 'Ekholmsnäsbackens snöteam lägger grunden för vinterns alla spår och snowparken. Följ live backstatus direkt på vår webbplats för uppdateringar om öppningsdatum!',
    actionLabel: 'Se live backstatus',
    actionUrl: '/',
    isPushedTop: false,
    badge: '❄️ Snöläggning'
  },
  {
    id: 'sasongsstart-vinter-2027',
    title: 'Säsongsstart för Freeskiers Skidklubb & Helgskidskola',
    shortDate: '9–10 januari 2027',
    day: '09',
    month: 'JAN',
    year: '2027',
    monthIndex: 0,
    time: 'Se gruppens schema',
    location: 'Ekholmsnäsbacken, Lidingö',
    category: 'traning',
    categoryLabel: 'Träning & Backe',
    categoryColor: 'bg-emerald-500/15 text-emerald-800 border-emerald-300',
    tagline: 'Första lektionerna och träningspassen på snö!',
    description: 'Nu drar vi igång! Helgskidskolans grupper kör igång med pass på lördagar/söndagar och Skidklubben startar sina vardagskvällar. Samling vid klubbflaggan vid barnbacken.',
    actionLabel: 'Se Skidklubben',
    actionUrl: '/skidklubb',
    isPushedTop: true,
    badge: '🎿 Premiär'
  },
  {
    id: 'rookie-series-ekholmsnas-2027',
    title: 'Rookie Series Stockholm i Ekholmsnäsbacken',
    shortDate: '13–14 februari 2027',
    day: '13',
    month: 'FEB',
    year: '2027',
    monthIndex: 1,
    time: '09:30 – 15:30',
    location: 'Ekholmsnäsbacken Snowpark, Lidingö',
    category: 'tavling',
    categoryLabel: 'Tävling & Event',
    categoryColor: 'bg-rose-500/15 text-rose-800 border-rose-300',
    tagline: 'Sveriges roligaste instegstävling i Slopestyle & Big Air',
    description: 'I samarbete med Svenska Skidförbundet (SSF). Jam-format utan utslagning, massor av åk för Kids, Ungdom och Junior. DJ, grillade burgare och prisbord från Gadelius & Alpingaraget.',
    actionLabel: 'Läs om Rookie Series',
    actionUrl: '/rookie-series',
    isPushedTop: true,
    badge: '🏆 SSF Tävling'
  },
  {
    id: 'sportlovslager-2027',
    title: 'Sportlovscamp & Parksessioner',
    shortDate: 'Vecka 9 (1–5 mars 2027)',
    day: '01',
    month: 'MAR',
    year: '2027',
    monthIndex: 2,
    time: '10:00 – 14:00',
    location: 'Ekholmsnäsbacken, Lidingö',
    category: 'lager',
    categoryLabel: 'Läger & Lov',
    categoryColor: 'bg-amber-500/15 text-amber-800 border-amber-300',
    tagline: 'Intensiva friåkningsdagar med klubbens tränare',
    description: 'Öppet för alla klubbens åkare under sportlovet. Fokus på park, trick, rails och mycket skidglädje tillsammans med kompisarna när skolan har lov.',
    actionLabel: 'Se verksamhet',
    actionUrl: '/skidklubb',
    isPushedTop: false,
    badge: '☀️ Lovläger'
  },
  {
    id: 'klubbmasterskap-avslutning-2027',
    title: 'Klubbmästerskap & Stor Säsongsavslutning',
    shortDate: '27 mars 2027',
    day: '27',
    month: 'MAR',
    year: '2027',
    monthIndex: 2,
    time: '11:00 – 16:00',
    location: 'Ekholmsnäsbacken, Lidingö',
    category: 'tavling',
    categoryLabel: 'Klubbfest & Tävling',
    categoryColor: 'bg-indigo-500/15 text-indigo-800 border-indigo-200',
    tagline: 'Gemensam festdag med trick, skojtävling & diplomutdelning',
    description: 'Årets stora höjdpunkt för hela familjen! Alla deltagare från Helgskidskolan och Skidklubben bjuds in till skojtävlingar, grillfest, tränaruppvisning och diplomutdelning.',
    actionLabel: 'Läs om klubben',
    actionUrl: '/om-oss',
    isPushedTop: false,
    badge: '🎉 Säsongsavslutning'
  }
];

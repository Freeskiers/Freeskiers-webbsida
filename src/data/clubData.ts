// Officiella länkar och data för IK Lidingö Freeskiers
export const CLUB_URL = "https://www.lidingofreeskiers.se";
export const BOOKING_URL = "https://sportadmin.se/book/?F=7631cd86-189b-4c49-bfc0-3ba70fe1f127";
export const PRIVATE_BOOKING_URL = "https://www.lidingofreeskiers.se/privatlektion/";
export const EQUIPMENT_RENTAL_URL = "https://www.ekholmsnasbacken.se/uthyrning";
export const SLOPE_MAP_URL = "https://maps.app.goo.gl/m3gQEfDvu73twtnh8";
export const CONTACT_EMAIL = "admin@lidingofreeskiers.se";
export const SLOPE_ADDRESS = "Ekholmsnäsvägen 87, 181 41 Lidingö";
export const INSTAGRAM_URL = "https://www.instagram.com/lidingofreeskiers/";
export const FACEBOOK_URL = "https://www.facebook.com/freeskierslidingo/";
export const REGISTRATION_OPEN = "16 oktober kl. 09.00";
export const SEASON = "2026/2027";

export const departmentEmails: Record<string, string> = {
  allmant: "admin@lidingofreeskiers.se",
  helgskidskola: "helgskidskola@lidingofreeskiers.se",
  skidklubb: "skidklubben@lidingofreeskiers.se",
  hostsasong: "hostsasong@lidingofreeskiers.se",
  privatlektioner: "privatlektion@lidingofreeskiers.se",
  sponsor: "sponsor@lidingofreeskiers.se",
  tavling: "tavling@lidingofreeskiers.se",
};

export const privatlektionData = {
  intro:
    "Boka en 60 minuters privatlektion för en eller två personer i Ekholmsnäsbacken. Du får personlig coachning anpassad efter din nivå och dina mål. Liftkort ingår under lektionstiden.",
  format:
    "Varje lektion är 60 minuter lång med en av klubbens utbildade tränare. Vi fokuserar helt på vad du eller ditt barn vill utveckla – från trygghet och svängteknik till carving och hopp i parken.",
  audience:
    "Privatlektioner passar barn från cirka 4 år, ungdomar och vuxna. Du kan boka för en person eller för två åkare tillsammans.",
  prices: [
    { people: "1 person", price: "850 kr", duration: "60 minuter" },
    { people: "2 personer", price: "1 300 kr", duration: "60 minuter (650 kr/person)" },
  ],
  pairRequirement: {
    intro:
      "Om två personer delar lektion måste båda ha liknande förkunskaper för att få ut maximalt av tiden:",
    items: [
      "Båda åkarna måste minst vara avancerade nybörjare.",
      "Båda måste kunna bromsa och stanna kontrollerat i hela backen.",
      "Båda måste kunna åka ankarlift tillsammans med en vuxen.",
    ],
  },
  practical: [
    {
      title: "Liftkort ingår",
      text: "Tillfälligt liftkort under lektionstiden ingår i priset. Du behöver inte köpa något separat liftkort i förväg.",
    },
    {
      title: "Egen utrustning",
      text: "Ta med egen hjälm, skidor och pjäxor. Hjälm är obligatoriskt för alla åkare. Behöver du hyra finns uthyrning vid backen.",
    },
    {
      title: "Samling vid skiduthyrningen",
      text: "Kom i god tid före lektionens start så att du är ombytt och redo. Samling sker utanför Ekholmsnäsbackens skiduthyrning.",
    },
  ],
};

export const helgskidskolaData = {
  price: "2 980 kr",
  extent: "5 lektioner à 75 minuter under januari och februari",
  registrationOpens: "16 oktober kl. 09.00",
  sessions: [
    "Förmiddag: 09.30–10.45",
    "Lunch: 11.15–12.30",
    "Eftermiddag: 13.15–14.30",
  ],
};

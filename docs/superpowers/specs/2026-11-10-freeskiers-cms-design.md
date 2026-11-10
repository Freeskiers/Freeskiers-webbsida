# Freeskiers Studio CMS – Design & Arkitekturspecifikation

**Datum:** 2026-11-10  
**Status:** Godkänd av beställare / Redo för implementeringsplan  
**Klassificering:** Architectural  

---

## 1. Sammanfattning & Syfte
IK Lidingö Freeskiers behöver ett enkelt, driftsäkert och användarvänligt innehållshanteringssystem (CMS) kallat **Freeskiers Studio**. 

Systemet gör det möjligt för utvalda styrelsemedlemmar och ledare att själva uppdatera webbplatsens texter, priser, datum, kalenderhändelser, regler, vanliga frågor och bilder, **utan** att riskera att förstöra webbplatsens grundstruktur, layout eller design.

Superadmin och utvecklare fortsätter arbeta precis som vanligt via Lovable, Git och AI-chatten utan några negativa bieffekter.

---

## 2. Arkitektur & Datalagring

### 2.1 Central datakälla
* Webbplatsens redigerbara innehåll centraliseras i en strukturerad JSON-fil: `src/data/site-content.json`.
* `src/lib/club-data.ts` läser från och exporterar innehållet från `site-content.json` med strikta TypeScript-typer och fallback-värden. Detta garanterar att webbplatsen alltid renderas korrekt även om ett specifikt fält saknas.

### 2.2 Git-baserad publicering (Ingen extern databas)
* Ändringar som görs i CMS:et publiceras direkt som commits till Git-repot via en säker serverfunktion `POST /api/cms/publish`.
* Commiten pushas till GitHub (`main`), vilket gör att Lovable och webbplatsens produktionsmiljö automatiskt synkas och bygger om.
* Fullständig versionshistorik bevaras automatiskt – varje ändring märks med redaktörens namn och tidpunkt.

### 2.3 Mediabibliotek & Bildoptimering
* Nya bilder som laddas upp i CMS:et sparas i `src/assets/photos/cms/`.
* Klienten skalar ned och komprimerar uppladdade bilder i webbläsaren innan de skickas till servern (till max bredd 1600px för banners och 800px för porträtt), vilket förhindrar att sajten blir tungladdad.

---

## 3. Behörighet & Inloggning

* **Placering:** Integrerat i administratörsportalen under `/admin` (fliken "Innehåll / CMS") med direktlänk `/admin/cms`.
* **Autentisering:** 
  1. Kontroll av redaktörens e-postadress mot en lista över godkända adresser (`ALLOWED_CMS_EDITORS` i `src/lib/cmsConfig.ts`).
  2. Klubb-PIN (samma säkra PIN som klubbens admin-gate).
* **Rollstyrning:** Redaktörer ser endast de avskalade formulärfälten. Källkod, Git-konfiguration och systeminställningar är dolda och otillgängliga.

---

## 4. Redaktörsgränssnitt (Bruttolista)

CMS:et organiseras i 8 tydliga sektionsflikar:

1. **📢 Banner & Snöstatus:**
   * Strömbrytare: Aktiv / Inaktiv.
   * Typ: Information (blå), Varning/Viktigt (gul/röd), Succé/Öppet (grön).
   * Meddelandetext.
   * Valfri knapptext och länk-URL.

2. **⛷️ Träningsgrupper & Priser:**
   * Helgskidskolan, Skidklubben, Höstsäsongen, Privatlektioner.
   * Träningsavgifter och medlemsavgifter (siffror och förklarande text).
   * Anmälningsdatum, tider och schemadagar.
   * Kravprofil och förkunskapskrav (dynamisk punktlista).
   * Gruppbild (uppladdning/byte av foto).
   * Direktlänk till anmälan i SportAdmin.

3. **📋 Avboknings- & Återbetalningsregler (/avbokning):**
   * Datumgränser (t.o.m. 30 november, 1–20 december, från 21 december).
   * Avdragsbelopp för Skidklubben (1 000 kr) och Helgskidskolan (600 kr).
   * Anmälningsavgift vid utebliven backöppning (400 kr).
   * Villkorstext vid force majeure och snöläggningsförutsättningar.

4. **📅 Klubbkalender & Event (/kalender):**
   * Skapa, redigera och ta bort kalenderhändelser.
   * Titel, datum, tid, plats och målgrupp.
   * Beskrivande text, anmälningslänk och valfri eventbild.

5. **❓ Vanliga frågor & Svar (FAQ):**
   * Skapa, redigera och sortera frågor.
   * Rubrik/fråga och svar (med stöd för stycken och länkar).
   * Kategori: Utrustning, Anmälan, Träning, Avbokning.

6. **👥 Tränare & Ledare (/om-oss):**
   * Redigera tränare/ledare (namn, roll, åldersgrupp).
   * Ladda upp och beskära porträttfoto.
   * Lägga till ny person eller dölja/ta bort inaktiv person.

7. **🤝 Sponsorer & Medlemserbjudanden (/sponsor & /medlem):**
   * Företagsnamn, webbadress och logotyp.
   * Medlemserbjudande och hur rabatten nyttjas.
   * Medlemskod för online-köp (kopierbar i medlemsportalen).

8. **🏔️ Startsida & Klubbprofil:**
   * Hero-rubrik, ingress och knappar.
   * Hero-bakgrundsbild.
   * Säsongshjulets faser och månadsstatus.
   * Kontaktuppgifter, klubbadress och länkar till sociala medier.

---

## 5. Live-förhandsgranskning (Preview) & Utkastläge

1. **Lokal utkastlagring:**
   * Varje ändring som redaktören gör sparas omedelbart i webbläsarens `sessionStorage` som ett aktivt utkast.
   * Ingenting skrivs till servern eller källkoden under redigering.

2. **Preview-läge:**
   * Klick på *"Förhandsgranska webbplatsen"* aktiverar utkastläget.
   * Webbplatsens sidor läser utkastets värden istället för produktionsdatan.
   * En flytande bottenbalk visas över hela sajten under förhandsgranskning:  
     `👁️ Förhandsgranskning aktiv – du ser dina osparade ändringar` med snabbknapparna `[Gå tillbaka till redigeraren]` och `[Publicera ändringar]`.

3. **Återställning:**
   * Redaktören kan när som helst klicka *"Återställ till senast publicerade"* för att slänga pågående utkast.

---

## 6. Publicering & Säkerhet

### 6.1 Server-endpoint: `POST /api/cms/publish`
* Tar emot den validerade datastrukturen och eventuella nya bildfiler.
* Skapar en git commit mot GitHub-repot med ett strukturerat meddelande:  
  `"CMS: Uppdatering av innehåll genomförd av [Redaktörsnamn]"`
* Pushar ändringen till GitHub (`lovable-repo` och `origin`).
* Lovable Cloud och webbplatsens produktionsmiljö känner av den nya commiten och driftsätter uppdateringen automatiskt.

### 6.2 Säkerhetsrestriktioner & Sandlåda
* Endpointen har en strikt vitlista: den tillåter endast skrivning till `src/data/site-content.json` samt bildfiler i `src/assets/photos/cms/`.
* Inga källkodsfiler (`.tsx`, `.ts`, `.json` utanför datamappen) kan läsas eller skrivas via CMS:et.
* Om nätverket eller GitHub API skulle fela visas ett informativt felmeddelande och redaktörens utkast sparas orört lokalt.

---

## 7. Verifiering & Testning

1. **Typsäkerhet:** TypeScript-verifiering av `site-content.json` mot `club-data.ts`-schemat.
2. **Preview-test:** Kontrollera att utkast syns i realtid på startsidan, träningsgruppssidorna, /avbokning och /kalender utan sidomladdning.
3. **Publiceringstest:** Verifiera att `POST /api/cms/publish` uppdaterar filen, skapar commit och pushar till GitHub.
4. **Isoleringstest:** Säkerställ att obehöriga anrop utan godkänd e-post/PIN blockeras med HTTP 401/403.

# Workshop-plan: Ny webbplats för Lidingö Freeskiers
**Datum:** Ikväll (Styrelsemöte / Webbgrupp, 5 personer)  
**Mål:** Fastställa innehåll, sidstruktur, funktioner och prioriteringar inför bygget i Lovable & GitHub.  
**Tid:** ca 50–60 minuter  
**Facilitator:** Stefan

---

## Förberedelser (redan fixat i repot)
1. **Logotyper insamlade:** Sköld, officiell SVG (färg & vit) samt horisontell banner finns nu i `assets/logo/`.
2. **Nulägesanalys av https://www.lidingofreeskiers.se:**
   - 10+ spretiga menyflikar i dagsläget.
   - Bokning via Agendo-widget och externa länkar/Google Forms.
   - Behov av starkare visuell identitet som speglar skidglädje och gemenskap för barn & unga.
3. **Mål efter kvällens möte:** En färdig PRD / specifikation som pushas till GitHub och matas direkt in i Lovable.

---

## Agenda & Blockindelning

| Block | Ämne | Tid | Mål |
|---|---|---|---|
| **1. Syfte & Målgrupper** | Vem är sajten till för & vad är #1 prioritering? | 10 min | Enas om besökarnas prioritering |
| **2. Struktur & Innehåll** | Menystruktur, sidor som ska bort vs läggas till | 15 min | Fastställa ny sitemap (max 5 huvudval) |
| **3. Funktioner & Flöden** | Bokning, schema, tränaransökan, shop & backstatus | 15 min | Definiera vilka funktioner MVP:n kräver |
| **4. Design & Tonalitet** | Känslan på sajten och förberedelse för Lovable | 10 min | Spika visuell riktning och MoSCoW-prioritering |
| **5. Övriga Önskemål & Idéer** | Swish, LOK-stöd, nyhetsbrev, bilder, event & fria inspel | 10 min | Fånga upp allt utanför standardmallen |

---

## Block 1: Syfte, Identitet & Målgrupper (10 min)

### Fråga 1.1: Vilken är sajtens enskilt viktigaste uppgift?
- **A)** Konvertering – få föräldrar att anmäla barn till Helgskidskola, Skidklubb och Höstsäsong.
- **B)** Information & service – schema, träningstider och svar på vanliga frågor för aktiva åkare.
- **C)** Varumärke & Inspiration – visa upp gemenskapen, tränarna och skidglädjen (rekrytera både åkare och tränare).
- *Rekommendation:* **A + C i kombination** – En modern landningssida som omedelbart förmedlar energin och har tydliga "call-to-actions" (Boka/Anmäl) utan krångel.

### Fråga 1.2: Vem besöker sajten – och i vilken ordning prioriterar vi dem?
1. **Föräldrar till barn 5–15 år:** Vill snabbt veta tider, priser, nivåer och hur anmälan går till (mobilbesökare!).
2. **Aktiva medlemmar:** Söker datum, samlingsplatser, scheman och event.
3. **Ungdomar (15+) / Nya instruktörer:** Nyfikna på att gå tränarutbildning och jobba i klubben.
4. **Sponsorer / Partners / Allmänhet:** Ekholmsnäsbacken, lokala samarbeten.

---

## Block 2: Struktur & Innehåll (15 min)

### Nuläge på lidingofreeskiers.se:
Idag har sajten 10 separata menyval: *Hem, Freeskiers Skidklubb, Helgskidskola, Privatlektion, Höstsäsong, O&G, Samarbete European Snowsport, Webbshop, Kontakta oss, Om oss*.

### Fråga 2.1: Hur förenklar vi menyn till max 5 huvudval?
**Förslag till ny modern sitemap:**
1. **Våra Grupper & Träning** *(Dropdown / Samlingssida)*
   - Helgskidskola (jan–feb)
   - Freeskiers Skidklubb (vardagar)
   - Höstsäsong (barmark / studsmatta)
   - Oldies & Goldies (vuxna)
   - Privatlektioner & European Snowsport
2. **Bli tränare** *(Egen framträdande flik – klubbens viktigaste rekrytering!)*
   - Tränarutbildning efter åk 9, tränarfilosofi, intresseanmälan.
3. **Om Freeskiers**
   - Vår vision & gemenskap (ingen tävlingshets, ren åkglädje).
   - Tränarteamet & Styrelsen.
   - Vår hemmabacke: Ekholmsnäsbacken.
   - Partners & Sponsorer.
4. **Aktuellt / Kalender**
   - Viktiga datum (anmälningsstart, säsongsstart, klubbevent/Rookie Series).
   - FAQ (Vanliga frågor & svar).
5. **Kontakt**
   - Snabb kontaktväg, styrelse, ledning, avbokningsregler.
- **Header Action Button:** Tydlig knapp: **"Anmäl & Boka"** (sticker ut i accentfärg).

---

## Block 3: Nya Funktioner & Flöden (15 min)

### Fråga 3.1: Hur ska anmälan och bokning fungera?
- Hur integrerar vi Agendo? (Direktlänkar till specifika grupper, inbäddad ren widget, eller tydliga bokningskort som leder in i Agendo?)
- Hur hanteras kö och "först till kvarn"? Tydliga anmälningsdatum med nedräkning eller statusmärken (*Öppen*, *Fåtal kvar*, *Fullbokad*).

### Fråga 3.2: Vilka nya smarta funktioner vill styrelsen ha?
- [ ] **Back- och snöstatus-banner:** Enkel statusindikator ("Ekholmsnäsbacken öppen", temperatur/snöläge eller snabblänk till webbkamera).
- [ ] **Mobilanpassat Tränaransökningsformulär:** Smidigt digitalt formulär direkt på sajten (ersätter mejl/Word-mallar).
- [ ] **FAQ-dragspel (Accordion):** Svara på de 10 vanligaste föräldrafrågorna (utrustning, liftkort, skidvana, återbud).
- [ ] **Instagram-feed / Videobakgrund:** Visa korta klipp från hopp, rails och glädje i Ekholmsnäs för maximal känsla.
- [ ] **Webbshop / Klubbkläder:** Länk till extern leverantör eller enkel produktvisning av klubbjacka/merch.

---

## Block 4: Design, Lovable & MoSCoW-prioritering (10 min)

### Fråga 4.1: Visuell profil & tonalitet
- Färgpalett: Snövitt, djupt mörkblå/svart, isblått / cyan / neonorange accent (matchar klubbens jackor och actionkänsla).
- Typografi: Modern, kraftfull sans-serif (t.ex. Inter / Outfit / Plus Jakarta Sans) – sportigt och premium.
- Bildspråk: Riktiga bilder på klubbens barn och ungdomar (ingen opersonlig bildbyråkänsla).

### Fråga 4.2: MoSCoW-prioritering inför Lovable
- **Must Have (MVP för säsongen):**
  - Responsiv, blixtsnabb startsida med Wow-effekt.
  - Tydliga sidor för Helgskidskola, Skidklubb och Höstträning.
  - Sömlös länkning/integration till Agendo-bokning.
  - Mobilvänlig "Bli tränare"-sida med intresseanmälan.
  - Om oss, styrelse, sponsorer och kontakt.
- **Should Have:**
  - FAQ med sök/filter.
  - Säsongskalender / Viktiga datum.
  - Ekholmsnäsbacken status/info-modul.
- **Could Have (Fas 2):**
  - Merch-shop / extern shop-visning.
  - Interaktiv nivåguide ("Vilken grupp passar mitt barn?").
- **Won't Have (i nuläget):**
  - Eget komplext medlemssystem (hanteras av Agendo/IdrottOnline).

---

## Block 5: Övriga Önskemål, Idéer & Styrelsens Fria Inspel (10 min)
*Mål: Fånga upp specifika krav, administrativa rutiner, samarbeten och vilda visioner.*

### Fråga 5.1: Särskilda integrationer och administrativa system
- **Swish / Direktbetalning:** Behövs QR-koder eller Swish-nummer för direktbetalning vid prova-på, event eller köp av merch?
- **IdrottOnline / LOK-stöd:** Behöver vi tydlig koppling/info kring medlemsregistrering och statligt/kommunalt LOK-stöd?
- **Nyhetsbrev / E-post:** Ska intresserade föräldrar kunna lämna sin e-post för att få påminnelse inför anmälningssläpp?
- **Flerspråkighet (Engelska):** Behövs en engelsk sammanfattningssida för internationella familjer på ön?

### Fråga 5.2: Styrelsens öppna lista & vilda idéer (Fritext)
- *Köp & Sälj / Utrustningsbytardag:* Möjlighet för medlemmar att sälja/byta urvuxen freeski-utrustning?
- *Rookie Series & Tävlingar:* Ska det finnas en särskild undersida för klubbens egna tävlingar och resultat?
- *Foto & Film / GDPR:* Rutiner för att samla in grymma videoklipp och bilder från föräldrar och tränare.
- *Samarbeten:* Skolor, fritids eller idrottsdagar på Lidingö.
- *Övriga inspel:* Styrelsen brainstormar fritt!

---

## Nästa steg efter kvällens möte
1. Svaren matas in i GitHub-repot som en färdig specifikation: `docs/website-spec.md`.
2. Repot pushas till GitHub (`Freeskiers/Freeskiers-webbsida`).
3. Repot kopplas till Lovable för omedelbar generering av React/Vite/Tailwind-koden med klubbens logotyp och design!

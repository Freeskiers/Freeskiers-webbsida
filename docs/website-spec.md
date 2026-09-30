# Webbplats-specifikation & PRD: Lidingö Freeskiers
**Datum:** 2026-09-29  
**Uppdragsgivare:** Styrelsen för IK Lidingö Freeskiers  
**Nuvarande webb:** [lidingofreeskiers.se](https://www.lidingofreeskiers.se)  
**Målarkitektur:** React, Vite, Tailwind CSS, Lucide Icons, Shadcn UI  
**Design & Typsnitt:** Poppins (Google Fonts), Klubbens officiella färgpalett och maskot  
**Assets i repot:** 
- Logotyper: `assets/logo/freeskiers-logo-skold.png`, `assets/logo/freeskiers-logo.svg`, `assets/logo/freeskiers-logo-white.svg`
- Maskot (Ekis the Yeti): `assets/logo/ekis-yeti-transparent.png`, `assets/logo/ekis-yeti-avatar.png`

---

## 1. Vision, Syfte & Tonalitet
- **Huvudsakligt mål:** Information & Träningstider samt Konvertering & Skidglädje (lika högt prioriterade).
- **Varumärkeskänsla:** Ljus, krispig, nordisk vintersport, modern, hög energi, genuin skidglädje och stark gemenskap utan prestationshets (se referens: https://www.lidingofreeskiers.se).
- **Prioriterade målgrupper:**
  1. **Föräldrar till barn 5–15 år (Mobilförst):** Behöver snabbt hitta träningstider, priser, nivåer och enkel anmälan.
  2. **Unga ledare & tränare (åk 9+):** Klubbens ryggrad – tydlig väg till tränarutbildning, rollbeskrivning och intresseanmälan.

---

## 2. Visuell Profil & Färgsystem (Äkta Freeskiers-färger)

### Färgpalett (Referens: https://www.lidingofreeskiers.se)
- **Freeskiers Himmelsblå / Cyan (Knappar & Accenter):** `#098ACB`
- **Freeskiers Ljus Cyan:** `#04A4CC`
- **Djup Marinblå (Rubriker & Footer-bas):** `#1B365D`
- **Snövit (Bakgrund & Kort):** `#FFFFFF`
- **Ljus Snögrå (Kortytor & Bakgrund):** `#F7F7F7`
- **Mörk Charcoal (Brödtext):** `#424242`
- **INGEN ORANGE FÄRG:** Orange färg tillhör inte klubben och ska tas bort helt.

### Typografi & Logotyp & Maskot
- **Typsnitt:** **Poppins** (Google Fonts) för hela webbplatsen.
- **Logotyp:** Nya sköldlogotypen (`assets/logo/freeskiers-logo-skold.png`) i header och navigation, vit variant (`assets/logo/freeskiers-logo-white.svg`) i footern.
- **Maskot:** Officiella "Ekis the Yeti" (`assets/logo/ekis-yeti-transparent.png`) för FAQ-bot och profil.
- **Bildval & Video:** Riktiga bilder och actionvideos från klubbens arkiv.

---

## 3. Struktur & Sitemap (Huvudmeny)

Huvudmenyn hålls ren och modern med max 4–5 val + framträdande bokningsknapp:

```
[ LOGO ]   Våra Grupper   |   Om Freeskiers   |   Resor & Event   |   FAQ & Kontakt   |   [ Anmäl & Boka (CTA) ]
```

### 1. Våra Grupper (Träning & Skidskola)
*Obs: Oldies & Goldies utgår helt ur menyn.*
- **Helgskidskola** (jan–feb i Ekholmsnäs, anmälan via SportAdmin).
- **Freeskiers Skidklubb** (vardagsträningar under vintern, anmälan via SportAdmin).
- **Höstsäsong** (barmarksträning, studsmatta och akrobatik).
- **Privatlektioner** (bokas via Agendo).
- **Prislista & Medlemskap:** Tydlig översikt över priser, vad medlemskapet innebär och vad som ingår.
- **Regler & Policy:** Säkerhetsinfo, vad som händer vid snöbrist/flyttade träningar, samt återbetalningspolicy (ingen återbetalning vid skada).
- **Interaktiv Nivåväljare:** "Vilken grupp passar mitt barn?".

### 2. Om Freeskiers
- **Klubbens Vision & Historia:** Sveriges största friåkningsklubb, glädje framför prestation.
- **Bli Tränare:** Information om instruktörsutbildning efter åk 9 och digitalt ansökningsformulär.
- **Våra Tränare:** Galleri med bild och presentation på samtliga tränare. Under varje tränares bild finns en flik/knapp: *"Boka privatlektion med [Namn]"* kopplat mot Agendo.
- **Styrelsen:** Bild och presentation av styrelsemedlemmar och kontaktvägar.
- **Föräldraengagemang:** Anmälan av engagerade föräldrar (vilka förväntningar som ställs och vad man kan hjälpa till med).

### 3. Resor & Event (Eventyta på webben)
- Kommande resor och läger med anmälningsformulär.
- Klubbens event: Skidbytardag, klubbmästerskap och **Rookie Series Stockholm**.
- **Säsongskalender & Nästa viktiga datum:** Tydlig nedräkning/tidslinje på förstasidan.

### 4. FAQ & Kontakt
- **Ekis the Yeti:** Smart FAQ-chattbot med klubbens maskot "Ekis".
- **Fritidskortet:** Information om statliga Fritidskortet och hur föräldrar använder det hos Lidingö Freeskiers.
- **Försäkring:** Information om Svenska Skidförbundets olycksfallsförsäkring som ingår i medlemskapet.
- **Kontaktformulär & Hitta hit:** Karta och info om samlingsplats i Ekholmsnäsbacken.

### 5. Medlemssektion / Inloggad yta (Fas 1.1)
- Möjlighet att samla uppgifter kring utbildningsnivå, anmälan till ledarutbildningar och Camp Freeskiers.

### Footer
- **Design:** Mörkblå bas (`#3B69A1`) med ljusblå text (`#48A1D5`) och vit klubblogo.
- **Partners:** Gadelius, Alpingaraget, Ekholmsnäsbacken, Kang Poles, Lidingö Centrum m.fl.
- **Snabblänkar, Föreningsinfo & Sociala medier.**

---

## 4. Kärnfunktioner & Tekniska Flöden

### 1. Tydlig separation mellan SportAdmin & Agendo
- **SportAdmin = Klubbens ryggrad:**
  - Skidklubben och Helgskidskolan bokas exklusivt via **SportAdmin**.
  - Alla knappar och kort för skidklubb/skidskola leder sömlöst och tydligt till SportAdmins anmälningssystem.
- **Agendo = Enbart Privatlektioner:**
  - Agendo används endast för privatlektioner och tränarbokning.
  - På tränarsidan hämtas/länkas respektive tränares lediga tider via Agendo.

### 2. "Ekis" – Klubbens Maskot & Smart FAQ-Bot
- Interaktiv flytande widget i hörnet med maskoten Ekis (den snälla Freeski-yetin).
- Besvarar direkt:
  - *"Vilken grupp passar min 8-åring?"* (knyter an till nivåväljaren)
  - *"Hur fungerar Fritidskortet?"*
  - *"Vad händer om det inte finns snö i backen?"*
  - *"Hur anmäler jag mig till skidskolan?"* (pekar till SportAdmin)
  - *"Vilken utrustning behövs?"* (skidor med bindning, hjälm, ryggskydd)

### 3. Ekholmsnäsbacken Live-Status & Webbkamera
- En widget/banner på startsidan som visar:
  - Backstatus: Öppet / Stängt / Pistförhållanden.
  - Temperatur och snödjup.
  - Integrerad bild/länk till Ekholmsnäsbackens live-webbkamera.

### 4. Eventyta & Nästa Viktiga Datum (Startsidan)
- Dynamisk hero/banner som lyfter fram nästa stora grej:
  - *T.ex. "Anmälan till Helgskidskolan öppnar 16 oktober kl 09:00 - Först till kvarn!"*
  - Tävlingar som Rookie Series eller klubbens skidbytardag.

### 5. Instagram & Community-flöde
- Flöde som visar utvalda taggar och konton klubben följer, för att fånga farten, hoppen och gemenskapen i backen.

### 6. Digitala Formulär (Egenbyggda i appen)
- **Bli tränare-formulär:** För ungdomar efter åk 9.
- **Engagerade föräldrar:** Anmälan för föräldrar som vill stötta backen, grilla korv, hjälpa till på event eller köra skidbytardag.
- **Resor & Camp Freeskiers:** Smidig intresseanmälan för klubbresor.

---

## 5. Lovable Master Prompt (Kopiera rakt in i Lovable)

```text
CRITICAL REDESIGN & REFACTORING INSTRUCTION (Reference: https://www.lidingofreeskiers.se)

Please completely overhaul the website to match our authentic club identity, layout, colors, and structure:

1. COLOR PALETTE & VISUAL STYLE:
- REMOVE the orange color completely. It does NOT belong to our brand.
- Switch from the dark/black tech theme to a bright, fresh, Nordic alpine snow aesthetic:
  - Background: Pure Crisp White (#FFFFFF) and Light Snow Gray (#F7F7F7) cards.
  - Primary Brand Colors: Freeskiers Cyan Blue (#098ACB) and Bright Ski Cyan (#04A4CC).
  - Deep Navy/Dark Slate for headings: #1B365D.
  - Body text: Dark Charcoal (#424242) for high legibility.
  - Card style: Clean white rounded surfaces, subtle soft drop-shadows (box-shadow: 0 4px 20px rgba(0,0,0,0.06)).
- Font: Poppins across the entire site (Google Fonts).

2. REAL SUBPAGES & ROUTING (Implement React Router):
Do not make this a single one-page scroll. Create distinct, dedicated pages with full content and clean navigation:
- "/" (Home: Hero with large authentic ski action photo, quick cards to ski school/club, slope webcam banner, event/news card, Instagram community section).
- "/helgskidskola" (Weekend Ski School: Ages, weekend schedule Jan-Feb in Ekholmsnäs, prices, level info, prominent 'Boka Skidskola'-button).
- "/skidklubb" (Freeskiers Skidklubb: Weekday training, groups, age info, 'Anmäl till Skidklubben'-button).
- "/hostsasong" (Autumn dryland and trampoline training).
- "/privatlektion" (Private lessons information).
- "/om-oss" (About Freeskiers: Our vision 'ski joy without performance anxiety', Coach Gallery with individual photos and 'Boka med [Tränare]' buttons, Board of Directors, and 'Bli tränare'-section with application form).
- "/kontakt" (FAQ with our Mascot 'Ekis', contact form, map to Ekholmsnäsbacken, and cancellation policies).

3. BOOKING BUTTONS & BACKEND LOGIC:
- DO NOT display backend system names like "SportAdmin" or "Agendo" in visible headings or buttons. Parents only care about booking their child easily.
- Buttons should say natural things like: "Anmäl till Skidskolan", "Boka plats", or "Boka privatlektion".

4. MASCOT COMPONENT ("Ekis the Yeti"):
- Use our official club mascot image located in: assets/logo/ekis-yeti-transparent.png (and assets/logo/ekis-yeti-avatar.png for avatar).
- Place 'Ekis' in a friendly floating FAQ widget in the bottom right corner with quick answers to common parent questions (levels, equipment, weather/cancellation).

5. FOOTER:
- Dark navy blue base (#1B365D) with light cyan/white text.
- Display our club sponsors prominently: Gadelius, Ekholmsnäsbacken, Alpingaraget, Kang Poles, Lidingö Centrum.
```

---

## 6. Checklista inför Lansering i Lovable & GitHub
- [x] Logotyper inlagda i `assets/logo/`.
- [x] Exakta färgkoder (`#3B69A1`, `#48A1D5`) och typsnitt (*Poppins*) definierade.
- [x] Tydlig åtskillnad: **SportAdmin** för grupper & **Agendo** för tränare.
- [x] Maskoten **Ekis the Yeti** definierad för FAQ.
- [x] Oldies & Goldies borttagen, Partners flyttade till footer.
- [x] Pusha denna specifikation till `main` på GitHub för omedelbar import till Lovable.

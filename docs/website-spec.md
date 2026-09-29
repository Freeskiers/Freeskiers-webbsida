# Webbplats-specifikation & PRD: Lidingö Freeskiers
**Datum:** 2026-09-29  
**Uppdragsgivare:** Styrelsen för IK Lidingö Freeskiers  
**Nuvarande webb:** [lidingofreeskiers.se](https://www.lidingofreeskiers.se)  
**Målarkitektur:** React, Vite, Tailwind CSS, Lucide Icons, Shadcn UI  
**Design & Typsnitt:** Poppins (Google Fonts), Klubbens officiella färgpalett och nya logotyp  
**Assets i repot:** `assets/logo/freeskiers-logo-skold.png`, `assets/logo/freeskiers-logo.svg`, `assets/logo/freeskiers-logo-white.svg`

---

## 1. Vision, Syfte & Tonalitet
- **Huvudsakligt mål:** Information & Träningstider samt Konvertering & Skidglädje (lika högt prioriterade).
- **Varumärkeskänsla:** Nordisk vintersport, modern, hög energi, genuin skidglädje och stark gemenskap utan prestationshets.
- **Prioriterade målgrupper:**
  1. **Föräldrar till barn 5–15 år (Mobilförst):** Behöver snabbt hitta träningstider, priser, nivåer och sömlös anmälan via **SportAdmin**.
  2. **Unga ledare & tränare (åk 9+):** Klubbens ryggrad – tydlig väg till tränarutbildning, rollbeskrivning och intresseanmälan.

---

## 2. Visuell Profil & Färgsystem (Exakta Färgkoder)

### Färgpalett
- **Mörkblå (Rubriker & Footer-bas):** `RGB(59, 105, 161)` / Hex `#3B69A1`
- **Ljusblå (Accenter & Footer-text):** `RGB(72, 161, 213)` / Hex `#48A1D5`
- **Snövit (Bakgrund & Ren yta):** `#FFFFFF` / Off-white `#F8FAFC`
- **Mörk grafit / Alpin skiffer (Text & Kontraster):** `#0F172A` / `#1E293B`
- **Säkerhetsorange (Knappar / Call-to-Action):** `#FF6B35` / `#F97316` *(för att poppa mot snö/blått)*

### Typografi & Logotyp
- **Typsnitt:** **Poppins** (400, 500, 600, 700) för hela webbplatsen.
- **Logotyp:** Nya sköldlogotypen (`assets/logo/freeskiers-logo-skold.png`) i header och navigation, vit variant (`assets/logo/freeskiers-logo-white.svg`) i footern.
- **Bildval & Video:** Riktiga bilder och actionvideos från klubbens arkiv (hämtas via dedikerad Google Drive-mapp).

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
Build a world-class, modern, high-energy, and responsive web application for IK Lidingö Freeskiers (Sweden's largest freeskiing and youth freestyle ski club based in Ekholmsnäsbacken, Lidingö).

### Brand & Visual Identity:
- Font: Poppins (Google Fonts, weights 400, 500, 600, 700).
- Color Palette:
  - Primary Dark Blue (Headers & Footer base): #3B69A1 (RGB 59, 105, 161)
  - Accent Light Blue (Subheaders, badges, footer text): #48A1D5 (RGB 72, 161, 213)
  - Pure Snow White background (#FFFFFF) with subtle cool gray card surfaces (#F8FAFC).
  - High-visibility Call-To-Action buttons in vibrant safety orange (#FF6B35).
- Logo: Freeskiers shield logo (assets/logo/freeskiers-logo-skold.png) in header and white SVG logo in footer.
- Style: Nordic alpine freeskiing, playful, authentic, energetic, motion-filled, clean and welcoming for kids and parents. No generic corporate look!

### Architecture & Navigation:
1. Header:
   - Logo left, navigation links center, high-contrast CTA button "Anmäl & Boka" right.
   - Navigation:
     - "Våra Grupper" (Dropdown / Section: Helgskidskola, Freeskiers Skidklubb, Höstsäsong, Privatlektioner).
     - "Om Freeskiers" (Klubbvision, Våra Tränare, Bli Tränare, Styrelsen, Föräldraengagemang).
     - "Resor & Event" (Kommande resor, Rookie Series, Skidbytardag).
     - "FAQ & Kontakt" (Smart FAQ, Ekis the Yeti, Fritidskortet, Försäkring).
2. Footer:
   - Deep dark blue base (#3B69A1) with light blue text (#48A1D5).
   - Partners section: Ekholmsnäsbacken, Gadelius, Alpingaraget, Kang Poles, Lidingö Centrum.
   - Quick links, Club contact info, social links.

### Critical Booking & System Logic:
- SportAdmin: All regular ski training (Skidklubben) and Helgskidskolan are booked through SportAdmin! Provide crystal clear, prominent "Boka via SportAdmin"-buttons with information on season start and first-come first-served rules.
- Agendo: Used EXCLUSIVELY for private lessons ("Privatlektioner"). On the Coaches page ("Våra Tränare"), display coach cards with photo, bio, specialties, and a direct "Boka privatlektion via Agendo"-button for each coach.

### Special Interactive Features to Implement:
1. "Ekis the Yeti" Chatbot Widget:
   - A friendly floating AI mascot chatbot in the bottom right featuring "Ekis", the club's yeti mascot.
   - Pre-programmed with smart answers for: Fritidskortet, SportAdmin booking steps, gear requirements (helmet/back protector), snow status & cancellation policy (no refund on injury, rescheduled on low snow), and level quiz.
2. Ekholmsnäsbacken Live-Status Banner:
   - Shows slope open/closed status, current temperature, snow depth, and a webcam view/link.
3. Featured Event / Next Important Date Banner:
   - Prominent alert/card on homepage for the next club milestone (e.g. registration opening countdown, Rookie Series Stockholm, or ski gear swap day).
4. Interactive Level Guide ("Vilken grupp passar mitt barn?"):
   - 3-step interactive selector helping parents find the right group (Nybörjare vs Fortsättning vs Skidklubb).
5. Digital Forms:
   - "Bli tränare" coach application form for teens (grade 9+).
   - "Engagerade föräldrar" form for volunteer parents detailing expectations and tasks.
   - Trip & Camp registration form.
6. Pricing & Policy Section:
   - Clear price cards under training including club membership fee, benefits, safety info, insurance coverage via Svenska Skidförbundet, and weather/injury policy.
7. Curated Instagram Community Grid:
   - Modern social feed showcase showing freeskiers doing jumps, rails, and having fun in the snow.
```

---

## 6. Checklista inför Lansering i Lovable & GitHub
- [x] Logotyper inlagda i `assets/logo/`.
- [x] Exakta färgkoder (`#3B69A1`, `#48A1D5`) och typsnitt (*Poppins*) definierade.
- [x] Tydlig åtskillnad: **SportAdmin** för grupper & **Agendo** för tränare.
- [x] Maskoten **Ekis the Yeti** definierad för FAQ.
- [x] Oldies & Goldies borttagen, Partners flyttade till footer.
- [x] Pusha denna specifikation till `main` på GitHub för omedelbar import till Lovable.

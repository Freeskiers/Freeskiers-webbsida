# Lovable Refactoring & Build Prompt: IK Lidingö Freeskiers

Klistra in detta i chatten i Lovable (eller skriv *"Genomför alla ändringar enligt PROMPT.md"*):

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

2. FULL-BLEED CINEMATIC HERO & SURFACE-FILLING PHOTOGRAPHY:
- Hero: Edge-to-edge, full-width cinematic hero background (assets/images/hero-freeski-cinematic.jpg) featuring youth freeskiers carving crisp snow in twilight floodlights, bold white typography, stats strip ("500+ unga åkare", "Etabl. 2001", "6–18 år", "0% Tävlingshets"), and prominent action buttons.
- 4 Activity Cards: Generous photo-cover cards that fill the grid for Helgskidskola (assets/images/skidskola-hero-day.jpg), Skidklubb (assets/images/freestyle-jump.jpg), Höstsäsong & Barmark (assets/images/park-rails.jpg), and Privatlektion/Tränare (assets/images/privatlektion-coach.jpg).
- Full-Width Panoramic Gallery: 5-column edge-to-edge photo strip showcasing the authentic life, coaching, jumps, and magic sunsets of Ekholmsnäsbacken.
- Subpage Photo Banners: Every subpage (/helgskidskola, /skidklubb, /hostsasong, /privatlektion, /om-oss, /kontakt) has a cinematic photo header banner.

3. REAL SUBPAGES & ROUTING (Implement React Router):
Do not make this a single one-page scroll. Create distinct, dedicated pages with full content and clean navigation:
- "/" (Home: Full-bleed hero, live slope status bar, 4 activity cards, interactive Årshjul, authentic story with mascot Ekis, full-width photo wall, values).
- "/helgskidskola" (Weekend Ski School: Ages, weekend schedule Jan-Feb in Ekholmsnäs, prices, level info, prominent 'Boka Skidskola'-button).
- "/skidklubb" (Freeskiers Skidklubb: Weekday training, groups, age info, 'Anmäl till Skidklubben'-button).
- "/hostsasong" (Autumn dryland and trampoline training).
- "/privatlektion" (Private lessons information with direct coach booking).
- "/om-oss" (About Freeskiers: Our vision 'ski joy without performance anxiety', Coach Gallery with individual photos and 'Boka med [Tränare]' buttons, Board of Directors, and 'Bli tränare'-section with application form).
- "/kontakt" (FAQ with our Mascot 'Ekis', contact form, map to Ekholmsnäsbacken, and cancellation policies).

3. BOOKING BUTTONS & BACKEND LOGIC:
- DO NOT display backend system names like "SportAdmin" or "Agendo" in visible headings or buttons. Parents only care about booking their child easily.
- Buttons should say natural things like: "Anmäl till Skidskolan", "Boka plats", or "Boka privatlektion".

4. MASCOT COMPONENT ("Ekis the Yeti"):
- Use our official club mascot image located in: assets/logo/ekis-yeti-transparent.png (and assets/logo/ekis-yeti-avatar.png for avatar).
- Place 'Ekis' in a friendly floating FAQ widget in the bottom right corner with quick answers to common parent questions (levels, equipment, weather/cancellation).

5. INTERACTIVE "ÅRSHJUL" / SÄSONGSÖVERSIKT ("Vad händer under året i Freeskiers"):
- Add an interactive, beautiful Season Cycle component on the homepage (and/or "/om-oss"):
  - Shows what happens across the 4 club seasons with interactive phase cards / circular selector:
    * "Tidig Höst (Sep–Okt)": Höstträning (barmark & studsmatta), tränarutbildning, och ANMÄLAN ÖPPNAR i mitten av oktober (först till kvarn!).
    * "Förvinter (Nov–Dec)": Snöläggning i Ekholmsnäs, Skidbytardag, förberedelser och utrustning.
    * "Vinter Högsäsong (Jan–Feb)": Helgskidskolan (5 helger), Skidklubben (vardagskvällar), Privatlektioner i Ekholmsnäsbacken.
    * "Vårvinter & Event (Mars)": Klubbhelg, Rookie Series Stockholm (tävling), klubbmästerskap och säsongsavslutning.
  - Automatically highlights the current active phase based on the real calendar month, with clear status tags (e.g. 'Just nu!', 'Kommande').

6. FOOTER:
- Dark navy blue base (#1B365D) with light cyan/white text.
- Display our club sponsors prominently: Gadelius, Ekholmsnäsbacken, Alpingaraget, Kang Poles, Lidingö Centrum.
```

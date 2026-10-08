# Anpassa sidan Privatlektioner

## Resultat
- Bygg om sidan med verifierad information från klubbens gamla webbplats.
- Visa tydligt att privatlektioner finns för en eller två personer, med aktuella priser utan årtal i rubriken.
- Lägg bokningsknappen högt på sidan och koppla den till klubbens befintliga bokningswidget.

## Sidans innehåll
- Inledning om personlig coachning för barn, ungdomar och vuxna på alla nivåer.
- Upplägg och pris: 1 person, 850 kr/60 minuter; 2 personer, 1 300 kr/60 minuter.
- Minimikrav för två deltagare: båda ska vara avancerade nybörjare, kunna stanna kontrollerat och åka ankarlift med vuxen.
- Praktisk information om inkluderat tillfälligt liftkort, egen utrustning, uthyrning och samling vid skiduthyrningen.
- Länkar till Ekholmsnäsbackens uthyrning och vägbeskrivning.

## Teknisk lösning
- Skapa en liten klientkomponent som laddar bokningswidgetens officiella skript med profil 252 och placerar dess knapp i angiven behållare.
- Ladda skriptet endast på privatlektionssidan och städa upp det vid sidbyte för att undvika dubbla knappar.
- Uppdatera privatlektionsuppgifterna i den gemensamma innehållskällan så att andra ytor visar bokning i stället för kontaktförfrågan.
- Kontrollera sidan på både större och mindre skärm, inklusive att bokningspanelen öppnas.

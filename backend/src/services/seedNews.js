// scripts/seedNews.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from '../models/newsModel.js';
import { fetchCityImage } from './utils/fetchCityImage.js';
import path from 'path'; 
import { fileURLToPath } from 'url';



const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.PEXELS_API_KEY) {
  console.error(" Fehler: PEXELS_API_KEY nicht definiert in .env-Datei.");
  process.exit(1);
}

/* console.log("PEXELS_API_KEY:", process.env.PEXELS_API_KEY);
dotenv.config();
if (!process.env.PEXELS_API_KEY) {
  console.error(" Fehler: PEXELS_API_KEY nicht definiert in .env-Datei.");
  process.exit(1); // Beenden des Skripts, wenn der API-Schlüssel fehlt
} */

const cities = [
  "Berlin", "Paris", "Rom", "Amsterdam", "Wien",
  "Madrid", "Prag", "Lissabon", "Kopenhagen", "Brüssel"
];

// Beispielhafte Überschriften und Beschreibungen

const headlines = [
  "Neues Boutique-Hotel eröffnet in",
  "Großveranstaltung bringt Touristen nach",
  "Reisetrend 2025: Warum alle nach",
  "Kulinarisches Festival begeistert Besucher in",
  "Historische Altstadt von",
  "Flugangebote locken Reisende nach",
  "Nachhaltiger Tourismus boomt in",
  "Sommerprogramm in",
  "Neue Fahrradwege geplant in",
  "Kunstszene wächst stark in"
];

const descriptions = [
  "Die Stadt erlebt einen Tourismusboom mit neuen Angeboten.",
  "Zahlreiche Besucher genießen das lokale Flair und die Sehenswürdigkeiten.",
  "Das Reiseziel zählt zu den beliebtesten Europas.",
  "Besonders junge Reisende schätzen die Vielfalt der Stadt.",
  "Die Region bietet ein einzigartiges Erlebnis für Kulturinteressierte.",
  "Hotels melden Rekordzahlen an Übernachtungen.",
  "Lokale Unternehmen profitieren vom starken Reiseverkehr.",
  "Neue Events und Attraktionen ziehen immer mehr Besucher an.",
  "Städtereisen liegen weiterhin voll im Trend.",
  "Die Stadt wird für ihre Nachhaltigkeitsstrategie gelobt."
];

// Funktion zur Generierung eines zufälligen Datums (letzte 30 Tage)

function randomDate() {
  const now = new Date();
  const past = new Date(now);
  past.setDate(past.getDate() - Math.floor(Math.random() * 30));
  return past;
}

// Generierung von 10 Nachrichten

//	 generateSeedData --- verwenden Sie die Wartezeit für Bilder
async function generateSeedData() {
  return await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const city = cities[i % cities.length];
      const headline = `${headlines[i % headlines.length]} ${city}`;
      const description = descriptions[i % descriptions.length];
      const image = await fetchCityImage(city) || "/images/fallback.jpg"; //direkt von API or fallback

      return {
        title: headline,
        content: [
          { type: "paragraph", text: `${description} ${city} ist bereit für neue Besucher.` },
          { type: "image", url: image },
          { type: "paragraph", text: `Die Tourismusbranche in ${city} erlebt eine spannende Zeit. Experten sehen positive Entwicklungen für das kommende Jahr.` },
          { type: "paragraph", text: `Lokale Behörden investieren in Infrastruktur und kulturelle Veranstaltungen. Reisende können sich auf ein vielfältiges Angebot freuen.` },
          { type: "paragraph", text: `Einwohner begrüßen die Veränderungen, betonen jedoch auch die Bedeutung von nachhaltiger Planung.` },
          { type: "image", url: `https://picsum.photos/seed/${city.toLowerCase()}-extra-${i}/600/300` },
          { type: "paragraph", text: `Die Region bietet zahlreiche Freizeitmöglichkeiten: von Stadtführungen bis hin zu kulinarischen Touren.` },
          { type: "paragraph", text: `Besucher können kulturelle Highlights wie Museen, Theater und lokale Märkte entdecken.` },
          { type: "paragraph", text: `Die Behörden hoffen, dass sich ${city} langfristig als Top-Reiseziel in Europa etabliert.` }
        ],
        image,
        createdAt: randomDate()
      };
    })
  );
}

// Verbindung und Schreiben in die Datenbank

mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    const seedData = await generateSeedData(); //bei der Verbindung zu MongoDB Warten auf Daten vor der Aufzeichnung
    await News.deleteMany();
    await News.insertMany(seedData);
    console.log("10 gefälschte Nachrichten wurden erfolgreich auf Deutsch hinzugefügt");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Fehler beim Verbinden mit MongoDB:", err);
  });



  ///node src/services/seedNews.js BEFEHLEN, um die Nachrichten zu generieren und in die Datenbank zu schreiben

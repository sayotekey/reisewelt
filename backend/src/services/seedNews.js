// scripts/seedNews.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from '../models/newsModel.js';

dotenv.config();


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

const seedData = Array.from({ length: 10 }).map((_, i) => {
  const city = cities[i % cities.length];
  const headline = headlines[i % headlines.length] + " " + city;
  const description = descriptions[i % descriptions.length];
  const image = `https://picsum.photos/seed/${city.toLowerCase() + i}/600/300`;


  //CONTENT
 return {
  title: headline,
  content: [
    { type: "paragraph", text: `${description} ${city} ist bereit für neue Besucher.` },
    { type: "image", url: image },
    { type: "paragraph", text: `Die Tourismusbranche in ${city} erlebt eine spannende Zeit. Experten sehen positive Entwicklungen für das kommende Jahr.` },
    { type: "paragraph", text: `Lokale Behörden investieren in Infrastruktur und kulturelle Veranstaltungen. Reisende können sich auf ein vielfältiges Angebot freuen.` }
  ],
  image,
  createdAt: randomDate(),
};
});
// Verbindung und Schreiben in die Datenbank

mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    await News.deleteMany(); 
    await News.insertMany(seedData); 
    console.log("10 gefälschte Nachrichten wurden erfolgreich auf Deutsch hinzugefügt");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Fehler beim Verbinden mit MongoDB:", err);
  });


  ///node src/services/seedNews.js BEFEHLEN, um die Nachrichten zu generieren und in die Datenbank zu schreiben

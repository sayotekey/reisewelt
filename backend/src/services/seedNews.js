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

// default language is German
const language = process.argv[2] || 'de'; 


const headlines = {
  de: [
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
  ],
  en: [
    "New boutique hotel opens in",
    "Major event brings tourists to",
    "Travel trend 2025: Why everyone is going to",
    "Culinary festival delights visitors in",
    "Historic old town of",
    "Flight deals attract travelers to",
    "Sustainable tourism booms in",
    "Summer program in",
    "New bike paths planned in",
    "Art scene grows strongly in"
  ]
};

const descriptions = {
  de: [
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
  ],
  en: [
    "The city is experiencing a tourism boom with new offerings.",
    "Numerous visitors enjoy the local flair and attractions.",
    "The destination is among Europe's most popular.",
    "Especially young travelers appreciate the city's diversity.",
    "The region offers a unique experience for culture enthusiasts.",
    "Hotels report record numbers of overnight stays.",
    "Local businesses benefit from strong travel traffic.",
    "New events and attractions attract more and more visitors.",
    "City breaks continue to be a major trend.",
    "The city is praised for its sustainability strategy."
  ]
};

const contentTemplates = {
  de: {
    paragraph1: (city) => `Die Tourismusbranche in ${city} erlebt eine spannende Zeit. Experten sehen positive Entwicklungen für das kommende Jahr.`,
    paragraph2: (city) => `Lokale Behörden investieren in Infrastruktur und kulturelle Veranstaltungen. Reisende können sich auf ein vielfältiges Angebot freuen.`,
    paragraph3: () => `Einwohner begrüßen die Veränderungen, betonen jedoch auch die Bedeutung von nachhaltiger Planung.`,
    paragraph4: () => `Die Region bietet zahlreiche Freizeitmöglichkeiten: von Stadtführungen bis hin zu kulinarischen Touren.`,
    paragraph5: () => `Besucher können kulturelle Highlights wie Museen, Theater und lokale Märkte entdecken.`,
    paragraph6: (city) => `Die Behörden hoffen, dass sich ${city} langfristig als Top-Reiseziel in Europa etabliert.`,
    mainText: (description, city) => `${description} ${city} ist bereit für neue Besucher.`
  },
  en: {
    paragraph1: (city) => `The tourism industry in ${city} is experiencing an exciting time. Experts see positive developments for the coming year.`,
    paragraph2: (city) => `Local authorities are investing in infrastructure and cultural events. Travelers can look forward to a diverse offering.`,
    paragraph3: () => `Residents welcome the changes but also emphasize the importance of sustainable planning.`,
    paragraph4: () => `The region offers numerous recreational opportunities: from city tours to culinary tours.`,
    paragraph5: () => `Visitors can discover cultural highlights such as museums, theaters and local markets.`,
    paragraph6: (city) => `Authorities hope that ${city} will establish itself as a top travel destination in Europe in the long term.`,
    mainText: (description, city) => `${description} ${city} is ready for new visitors.`
  }
};

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
/*   return await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const city = cities[i % cities.length];
      const headline = `${headlines[i % headlines.length]} ${city}`;
      const description = descriptions[i % descriptions.length];
      const image = await fetchCityImage(city) || "/images/fallback.jpg"; //direkt von API or fallback */
const currentHeadlines = headlines[language];
const currentDescriptions = descriptions[language];
const currentContent = contentTemplates[language];

      return await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const city = cities[i % cities.length];
      const headline = `${currentHeadlines[i % currentHeadlines.length]} ${city}`;
      const description = currentDescriptions[i % currentDescriptions.length];
      const image = await fetchCityImage(city) || "/images/fallback.jpg"; //direkt von API or fallback

      return {
        title: headline,
        content: [
          { type: "paragraph", text: currentContent.mainText(description, city) },
          { type: "image", url: image },
          { type: "paragraph", text: currentContent.paragraph1(city) },
          { type: "paragraph", text: currentContent.paragraph2(city) },
          { type: "paragraph", text: currentContent.paragraph3() },
          { type: "image", url: `https://picsum.photos/seed/${city.toLowerCase()}-extra-${i}/600/300` },
          { type: "paragraph", text: currentContent.paragraph4() },
          { type: "paragraph", text: currentContent.paragraph5() },
          { type: "paragraph", text: currentContent.paragraph6(city) }
        ],
        image,
        language: language, // Добавляем поле языка
        createdAt: randomDate()
      };
    })
  );
}

// Подключение и запись в базу данных
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    const seedData = await generateSeedData();
    
    // Если генерируем для определенного языка, удаляем только новости на этом языке
    if (language !== 'de') {
      await News.deleteMany({ language: language });
    } else {
      await News.deleteMany({}); // Для немецкого удаляем все (обратная совместимость)
    }
    
    await News.insertMany(seedData);
    console.log(`10 новостей успешно добавлены на ${language === 'de' ? 'немецком' : 'английском'} языке`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Ошибка при подключении к MongoDB:", err);
  });

// Команды для запуска:
// node src/services/seedNews.js         (немецкий по умолчанию)
// node src/services/seedNews.js de      (немецкий)
// node src/services/seedNews.js en      (английский)


  ///node src/services/seedNews.js BEFEHLEN, um die Nachrichten zu generieren und in die Datenbank zu schreiben 
  //https://www.pexels.com/

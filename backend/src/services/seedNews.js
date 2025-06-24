// scripts/seedNews.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from '../models/newsModel.js';

dotenv.config();


const cities = [
  "Berlin", "Paris", "Rom", "Amsterdam", "Wien",
  "Madrid", "Prag", "Lissabon", "Kopenhagen", "Brüssel"
];

// Примеры заголовков и описаний
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

// Функция генерации случайной даты (последние 30 дней)
function randomDate() {
  const now = new Date();
  const past = new Date(now);
  past.setDate(past.getDate() - Math.floor(Math.random() * 30));
  return past;
}

// Генерация 10 новостей
const seedData = Array.from({ length: 10 }).map((_, i) => {
  const city = cities[i % cities.length];
  const headline = headlines[i % headlines.length] + " " + city;
  const description = descriptions[i % descriptions.length];
  const image = `https://picsum.photos/seed/${city.toLowerCase() + i}/600/300`;

  return {
    title: headline,
    content: description,
    image,
    createdAt: randomDate(),
  };
});

// Подключение и запись в базу
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    await News.deleteMany(); // очистим базу
    await News.insertMany(seedData); // вставим новые данные
    console.log("10 фейковых новостей успешно добавлены на немецком языке!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(" Ошибка подключения к MongoDB:", err);
  });

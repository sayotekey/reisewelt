import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "../models/reviewModel.js"; 
dotenv.config();

const reviews = [
  {
    name: "Johann Sosnowski",
    text: "Unsere Reise nach Berlin war einfach unvergesslich! Wir haben den Alexanderplatz, das Brandenburger Tor und die East Side Gallery erkundet. Besonders beeindruckt hat uns die Vielfalt der Street Art und die gemütlichen Cafés in Kreuzberg. Weltreise hat uns perfekt beraten – von der Hotelwahl bis zu den Insider-Tipps für das Nachtleben.",
    rating: 5,
    createdAt: new Date("2025-05-27"),
  },
  {
    name: "Stefan W.",
    text: "Guten Morgen aus Paris! Wir sitzen gerade im Quartier Latin, haben Croissants und Café au Lait genossen und planen unseren Tag rund um den Louvre und den Eiffelturm. Danke an Weltteise für die stressfreie Organisation unserer Stadttour mit Hop-on-Hop-off-Bus und reservierten Tickets für das Musée d’Orsay.",
    rating: 5,
    createdAt: new Date("2025-05-23"),
  },
  {
    name: "Erik Pfefferkorn",
    text: "Unsere Zeit in Barcelona war traumhaft. Wir sind durch die Gassen der Altstadt geschlendert, haben die Sagrada Família bestaunt und Tapas in einem kleinen Restaurant am Meer genossen. Weltreise hat uns sogar eine geführte Fahrradtour am Strand organisiert – ein Highlight unserer Reise!",
    rating: 4,
    createdAt: new Date("2025-05-20"),
  },
  {
    name: "Laura Müller",
    text: "Wir haben eine fantastische Zeit in Rom verbracht! Die antiken Ruinen am Forum Romanum, das Kolosseum bei Sonnenuntergang und die gemütlichen Plätze mit Gelato waren einfach magisch. Dank Weltreise hatten wir Tickets ohne Warteschlange und hervorragende Restaurant-Empfehlungen.",
    rating: 5,
    createdAt: new Date("2025-06-02"),
  },
  {
    name: "Maximilian Fischer",
    text: "Amsterdam hat uns total begeistert: Grachtenfahrten, die malerischen Häuser und die entspannten Radwege. Weltreise hat uns ein tolles Canal-Cruise-Paket und eine Fahrradtour empfohlen. So konnten wir die Stadt wie Einheimische erleben – absolut empfehlenswert!",
    rating: 5,
    createdAt: new Date("2025-06-05"),
  },
  {
    name: "Anja Weber",
    text: "Unser Kurztrip nach Prag war zauberhaft. Die Karlsbrücke im Morgennebel, das prunkvolle Prager Schloss und die historischen Gassen der Altstadt haben uns verzaubert. Weltreise hat uns ein romantisches Paket geschnürt, inklusive Flusskreuzfahrt und Konzertkarten für klassische Musik.",
    rating: 4,
    createdAt: new Date("2025-06-07"),
  },
  {
    name: "Daniel Schmidt",
    text: "Wir haben Wien lieben gelernt: die Prachtbauten der Hofburg, der Duft von frischem Kaffee im Café Central und ein unvergesslicher Abend in der Staatsoper. Weltreise hat uns perfekte Sitzplätze besorgt und sogar eine private Führung durch das Kunsthistorische Museum organisiert.",
    rating: 5,
    createdAt: new Date("2025-06-10"),
  },
];


const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Review.deleteMany();
    await Review.insertMany(reviews);
    console.log(" rewiews loaded!");
    process.exit();
  } catch (err) {
    console.error(" error reviews is not loaded:", err);
    process.exit(1);
  }
};

seedReviews();


//node src/services/reviewsSeed.js
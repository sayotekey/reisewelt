import React, { useEffect, useState } from "react";
import hero1 from "../images/heroSection1.jpg";
import hero2 from "../images/heroSection2.jpg";
import hero3 from "../images/heroSection3.jpg";
import hero4 from "../images/heroSection4.jpg";
import hero6 from "../images/heroSection6.jpg";
import hero7 from "../images/heroSection7.jpg";
import hero8 from "../images/heroSection8.jpg";





const images = [hero4, hero2, hero3,  hero1, hero6, hero7, hero8, ];

const quotes = [
  {
    text: "„Die Welt ist ein Buch. Wer nie reist, sieht nur eine Seite davon.“",
    author: "Augustinus Aurelius",
  },
  {
    text: "„Reisen ist Leben, wie Leben Reisen ist.“",
    author: "Jean Paul",
  },
  {
    text: "„Man entdeckt keine neuen Erdteile, ohne den Mut zu haben, alte Küsten aus den Augen zu verlieren.“",
    author: "André Gide",
  },
  {
    text: "„Nur wer umherschweift, findet neue Wege.“",
    author: "Norwegisches Sprichwort",
  },
  {
    text: "„Eine Reise ist wie eine Ehe: Die sicherste Art zu scheitern ist, zu glauben, man habe sie unter Kontrolle.“",
    author: "John Steinbeck",
  },
  {
    text: "„Reisen bedeutet, sich selbst zu entdecken.“",
    author: "Albert Camus",
  },
  {
    text: "„Wege entstehen dadurch, dass man sie geht.“",
    author: "Franz Kafka",
  },
  {
    text: "„Reisen ist die Sehnsucht nach dem Leben.“",
    author: "Kurt Tucholsky",
  },
  {
    text: "„Je mehr man reist, desto mehr erkennt man, wie wenig man weiß.“",
    author: "Sokrates",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {images.map((img, i) => (
        <div
          key={i}
          className={`hero-background ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="quote">
        <p className="quote-text">{quotes[index].text}</p>
        <p className="quote-author">– {quotes[index].author}</p>
      </div>
    </div>
  );
};

export default HeroSection;

// src/components/TravelNews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const TravelNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/news")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log("Найдено новостей:", sorted);
        setNews(sorted.slice(sorted)); // Только 4 последние новости
      })
      .catch((err) => {
        console.error("Fehler beim Laden der News:", err);
      });
  }, []);


  const scroll = (direction) => {
  const container = document.getElementById("scrollContainer");
  const scrollAmount = 320;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

  return (
    <div className="w-full max-w-[1320px] mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-200 mb-6">
        Reise-Nachrichten
      </h2>


 <div className="relative">

  <button
    onClick={() => scroll("left")}
    className="absolute -left-11 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden md:block"
  >
 <FaChevronLeft size={20} />
  </button>


  <div
    id="scrollContainer"
    className="flex overflow-x-auto no-scrollbar space-x-4 scroll-smooth px-2"
  >
    {news.map((item) => (
      <div
        key={item._id}
        className="min-w-[300px] max-w-[300px] flex-shrink-0"
      >
        <NewsCard {...item} />
      </div>
    ))}
  </div>

 
  <button
    onClick={() => scroll("right")}
    className="absolute -right-11 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full shadow  hover:bg-fuchsia-400  transition hidden md:block"
  >
 <FaChevronRight size={20} />
  </button>
</div>



      <div className="mt-8 text-center">
        <Link
          to="/news"
          className="inline-block bg-blue-300 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Weitere News anzeigen
        </Link>
      </div>
    </div>
  );
};

export default TravelNews;

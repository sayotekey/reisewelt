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
        //  console.log(sorted);
        setNews(sorted.slice(sorted)); //all news
      })
      .catch((err) => {
        console.error("Error loading news:", err);
      });
  }, []);

  const scroll = (direction) => {
    const container = document.getElementById("scrollContainer");
    // Adaptive scroll amount based on screen size
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    let scrollAmount = 320; // desktop default
    
    if (isMobile) {
      scrollAmount = 180; // for 2 cards on mobile
    } else if (isTablet) {
      scrollAmount = 240; // for 3 cards on tablet
    }

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-[1320px] mx-auto p-2 md:p-4 my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-4 md:mb-6">
        Reise-Nachrichten
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-6 md:-left-11 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-1 md:p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden sm:block"
        >
          <FaChevronLeft size={16} className="md:hidden" />
          <FaChevronLeft size={20} className="hidden md:block" />
        </button>

        <div
          id="scrollContainer"
          className="flex overflow-x-auto no-scrollbar space-x-2 md:space-x-4 scroll-smooth px-2"
        >
          {news.map((item) => (
            <div
              key={item._id}
              className="min-w-[170px] max-w-[170px] sm:min-w-[220px] sm:max-w-[220px] lg:min-w-[300px] lg:max-w-[300px] flex-shrink-0"
            >
              <NewsCard {...item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-6 md:-right-11 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-1 md:p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden sm:block"
        >
          <FaChevronRight size={16} className="md:hidden" />
          <FaChevronRight size={20} className="hidden md:block" />
        </button>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <Link
          to="/news"
          className="inline-block bg-blue-200 text-white px-4 md:px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm md:text-base"
        >
          Weitere News anzeigen
        </Link>
      </div>
    </div>
  );
};

export default TravelNews;

// TravelNews.jsx — A component that loads and displays a list of news articles.

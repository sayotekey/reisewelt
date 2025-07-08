import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; //1.import use theme

const TravelNews = () => {
  const { isDark } = useTheme(); // 2. use isDark from useTheme hook
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
    <div
      className="w-full max-w-[1320px] mx-auto p-2 md:p-4 my-10"
      style={{
        color: "var(--text-color)",
      }}
    >
      <div className="flex justify-between items-center mb-6 relative">
        <h2
          className="text-3xl font-bold text-center w-full mb-5 transition-all duration-500 hover:scale-105"
          style={{
            color: "var(--accent-color)",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Reise-Nachrichten
        </h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-6 md:-left-11 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 rounded-full shadow transition hidden sm:block"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--accent-color)";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--bg-secondary)";
            e.target.style.color = "var(--text-color)";
          }}
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
          className="absolute -right-6 md:-right-11 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 rounded-full shadow transition hidden sm:block"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--accent-color)";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--bg-secondary)";
            e.target.style.color = "var(--text-color)";
          }}
        >
          <FaChevronRight size={16} className="md:hidden" />
          <FaChevronRight size={20} className="hidden md:block" />
        </button>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <Link
          to="/news"
          className="inline-block px-4 md:px-6 py-2 rounded-full transition text-sm md:text-base"
          style={{
            backgroundColor: "var(--accent-color)",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--accent-color)";
          }}
        >
          Weitere News anzeigen
        </Link>
      </div>
    </div>
  );
};

export default TravelNews;

// TravelNews.jsx — A component that loads and displays a list of news articles.

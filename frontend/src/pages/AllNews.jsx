
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { Link } from "react-router-dom";
import { useTranslate } from "../locales/index.js";

const AllNews = () => {
  const { t, currentLanguage } = useTranslate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/news?language=${currentLanguage}`
        );
        const sorted = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNews(sorted);
      } catch (err) {
        console.error("Error loading news:", err);
      }
    };

    fetchNews();
  }, [currentLanguage]); 
  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8 text-white">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
        {t("allNews.title") || "Alle Reise-Nachrichten"}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {news.map((item) => (
          <NewsCard key={item._id} {...item} />
        ))}
      </div>
      <div className="mt-6 sm:mt-8">
        <Link
          to="/"
          className="text-blue-300 hover:underline text-xs sm:text-sm md:text-base"
        >
          {t("allNews.backToHome") || "← Zurück zur Startseite"}
        </Link>
      </div>
    </div>
  );
};

export default AllNews;

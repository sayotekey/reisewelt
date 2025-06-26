// src/pages/AllNews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard"; // путь к твоей карточке
import { Link } from "react-router-dom";

//!!
const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/news")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNews(sorted);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der News:", err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Alle Reise-Nachrichten</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard key={item._id} {...item} />
        ))}
      </div>
      <div className="mt-8">
        <Link to="/" className="text-blue-300 hover:underline">
          ← Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default AllNews;

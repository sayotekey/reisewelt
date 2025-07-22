import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const SingleNews = () => {
  const { id } = useParams(); // Beispiel: Wenn ein Benutzer http://localhost:5173/news/65f123abc aufruft, lautet die ID "65f123abc".
  //Wir benötigen diese Kennung, um die gewünschten Nachrichten vom Server zu erhalten
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  //Wenn die Seite geladen ist - gehen Sie zum Server, holen Sie die gewünschten Nachrichten und zeigen Sie sie.
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/news/${id}`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Nachricht:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Lädt...</div>;
  }

  if (!news) {
    return (
      <div className="text-center text-red-400 mt-20">
        Nachricht nicht gefunden.
      </div>
    );
  }

  //Die Anzeige der Nachricht selbst:
  return (
    <motion.div
      className="max-w-4xl mx-auto p-4 text-gray-200 mt-18"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/news" className="text-blue-200 hover:underline mb-4 inline-block">
        ← Zurück zu den Nachrichten
      </Link>

      {/*   <img
        src={news.image}
        alt={news.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      /> */}
      <h1 className="text-3xl font-bold mb-4 text-gray-600">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(news.createdAt).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="space-y-4 text-gray-500 text-lg">
        {news.content.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index}>{block.text}</p>;
          } else if (block.type === "image") {
            return (
              <img
                key={index}
                src={block.url}
                alt="Artikelbild"
                className="w-3/4 h-80 object-cover rounded-md mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
};

export default SingleNews;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewsCard = ({ _id, title, content, image, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });


    const fallbackImage = "/images/fallback.jpg";// Fallback-Bild, falls das Bild nicht geladen werden kann


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/news/${_id}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 h-80 flex flex-col">
          {/* BILD-UMSCHLAG */}
          <div className="h-40 overflow-hidden">
            <img
              src={image || fallbackImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>

          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2 line-clamp-2">
                {title}
              </h3>
             {content.find((block) => block.type === "paragraph")?.text}

            </div>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;

//NewsCard.jsx - Eine Nachrichtenkarte

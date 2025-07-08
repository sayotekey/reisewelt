import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NewsCard = ({ _id, title, content, image, createdAt }) => {
  const { isDark } = useTheme();
  const formattedDate = new Date(createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const fallbackImage = "/images/fallback.jpg"; // Fallback image if the image fails to load

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/news/${_id}`}>
        <div
          className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 h-48 sm:h-56 lg:h-80 flex flex-col"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-color)",
            border: "1px solid var(--border-color)"
          }}
        >
          {/* IMAGE CONTAINER */}
          <div className="h-28 sm:h-32 lg:h-40 overflow-hidden">
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

          <div className="p-2 sm:p-3 lg:p-4 flex flex-col justify-between flex-grow">
            <div>
              <h3
                className="text-sm sm:text-base lg:text-lg font-semibold mb-2 line-clamp-2"
                style={{ color: "var(--text-color)" }}
              >
                {title}
              </h3>
              {/* Show content only on desktop */}
              <p
                className="text-sm mb-2 line-clamp-3 hidden lg:block"
                style={{ color: "var(--text-light)" }}
              >
                {content.find((block) => block.type === "paragraph")?.text}
              </p>
            </div>
            {/* Show date only on desktop */}
            <p
              className="text-xs hidden lg:block"
              style={{ color: "var(--text-light)" }}
            >
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;

//NewsCard.jsx - A news card component

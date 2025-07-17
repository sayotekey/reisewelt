import { useEffect, useState } from "react";
import lastSearchImg from "../images/lastSearchImg.png";
import { useTranslate } from "../locales/index.js";

const LastSearch = () => {
  const [lastSearches, setLastSearches] = useState([]);
  const { t } = useTranslate();

  useEffect(() => {
    const storedSearches = localStorage.getItem("lastSearches");

    if (storedSearches) {
      setLastSearches(JSON.parse(storedSearches));
    }
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!lastSearches || lastSearches.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-left text-gray-600">
        {t("lastSearch.title") || "Ihre letzten Suchen"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {lastSearches.slice(0, 4).map((search, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-20 bg-gradient-to-br from-blue-400 to-indigo-600">
              <img
                src={lastSearchImg}
                alt="Reiseziel"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="p-2">
              <h3 className="font-bold text-sm text-gray-800 mb-2 truncate">
                {search.to || "Unbekanntes Ziel"}
              </h3>

              <div className="flex items-center text-gray-600 mb-1">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">
                  {formatDate(search.startDate)} - {formatDate(search.endDate)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>
                    {search.adults} {t("lastSearch.adults") || "Erw."}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 100-5H9v5zm0 0v6a2 2 0 002 2h2a2 2 0 002-2v-6m-6 0h6"
                    />
                  </svg>
                  <span>
                    {search.children} {t("lastSearch.children") || "Kinder"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSearch;

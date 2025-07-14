import { useEffect, useState } from "react";
import lastSearchImg from "../images/lastSearchImg.png";
import { useTranslate } from "../locales/index.js";

const LastSearch = () => {
  const [lastSearches, setLastSearches] = useState([]);
  const { t } = useTranslate();


  useEffect(() => {
    // Beim Laden der Komponente, Daten aus localStorage abrufen
    const storedSearches = localStorage.getItem("lastSearches");

    if (storedSearches) {
      setLastSearches(JSON.parse(storedSearches));
    }
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate); // Konvertiere den ISO-Datum-String in ein Date-Objekt
    return date.toLocaleDateString("de-DE", {
      day: "2-digit", // Tag in zweistelliger Form (z.B. 01, 02, ..., 31)
      month: "2-digit", // Monat in zweistelliger Form (z.B. 01, 02, ..., 12)
      year: "numeric", // Jahr in numerischer Form (z.B. 2025)
    });
  };

  if (!lastSearches || lastSearches.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 px-">
      <h2 className="text-xl font-bold mb-4 text-center">
        {t("lastSearch.title") || "Ihre letzten Suchen"}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {lastSearches.map((search, index) => (
          <div key={index} className="flex w-80 last-search shadow-xl " >
            <div className="w-32 flex-shrink-0 bg-gray-200">
              <img
                src={lastSearchImg}
                alt="Reiseziel"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-4 text-sm text-gray-800">
              <p className="font-bold mb-3">{search.to || "-"}</p>
              <p className="mb-1">
                {formatDate(search.startDate)} - {formatDate(search.endDate)}
              </p>
              <p>
                {search.adults} {t("lastSearch.adults") || "Erwachsene"} | {search.children} {t("lastSearch.children") || "Kinder"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSearch;

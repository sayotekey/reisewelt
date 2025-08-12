import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent.jsx";
import { useTheme } from "../context/ThemeContext";
import { useTranslate } from "../locales/index.js";
import { useNavigate } from "react-router-dom";
import validCityNames from "../utils/validCityNames.js";

// Animationsstile hinzufügen
const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  
  @keyframes slowBounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-8px);
    }
  }
  
  .animate-slow-bounce {
    animation: slowBounce 2s infinite;
  }
  
  @keyframes customPulse {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.4;
    }
  }
  
  .animate-custom-pulse {
    animation: customPulse 2s ease-in-out infinite;
  }
`;

// Stile zum Head hinzufügen
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("top-travel-animations");
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "top-travel-animations";
    styleSheet.innerText = fadeInStyle;
    document.head.appendChild(styleSheet);
  }
}

// Struktur: Land → Städte (aktualisiert entsprechend der Amadeus API)
/*
const countriesCities = {
  Belgien: ["Antwerpen", "Brüssel"],
  Dänemark: ["Kopenhagen"],
  Deutschland: [
    "Berlin",
    "Düsseldorf",
    "Frankfurt",
    "Hamburg",
    "Köln",
    "Leipzig",
    "München",
    "Stuttgart",
  ],
  Frankreich: ["Lyon", "Marseille", "Nizza", "Paris", "Toulouse"],
  Italien: ["Bologna", "Mailand_Malpensa", "Mailand_Linate", "Pisa", "Rom"],
  Irland: ["Dublin"],
  Niederlande: ["Amsterdam"],
  Norwegen: ["Oslo"],
  Österreich: ["Graz", "Innsbruck", "Klagenfurt", "Linz", "Salzburg", "Wien"],
  Portugal: ["Lissabon", "Porto"],
  Schottland: [" Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness"],
  Schweden: ["Stockholm"],
  Schweiz: ["Genf", "Zürich"],
  Spanien: [
    "Algeciras",
    "Barcelona",
    "Coruna",
    "Granada",
    "Madrid",
    " Malaga_Costa_del_Sol",
    "Palma",
    "Sevilla",
    "Valencia",
  ],
};
*/

const TopTravelDestinations = () => {
  const { isDark } = useTheme();
  const [activeCountry, setActiveCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslate();
  const navigate = useNavigate();
  // const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [uuid, setUuid] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // Städte des ausgewählten Landes anzeigen
  const handleCountryClick = (country) => {
    setActiveCountry(country);
    setSelectedCity(null); // Ausgewählte Stadt zurücksetzen
    setHotels([]); // Hotels leeren
    // setError(null);
  };

  // Städte-Liste direkt aus validCityNames
  const countriesCities = Object.fromEntries(
    Object.entries(validCityNames).map(([country, cities]) => [
      country,
      Object.keys(cities),
    ])
  );

  // Hotels für die ausgewählte Stadt laden
  /*   const fetchHotelsByCity = async (city) => {
    setLoading(true);
    setError(null);
    setSelectedCity(city); 
    */

  const fetchHotelsByCity = async (city) => {
    // Sonderfall Hamburg
    if (city === "Hamburg") {
      navigate("/hamburg-hotels");
      return;
    }
    setSelectedCity(city);
    setLoading(true);
    setError(null);

    try {
      const countUrl = `http://localhost:3000/api/amadeus/getHotelCount?cityName=${city}`;
      console.log("aktuelle City hotelName-Anfrage", city);
      const countResponse = await axios.get(countUrl);
      console.log(`API Antwort für ${city}:`, countResponse.data); // Number

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const { uniqueId, hotelCount } = countResponse.data;
      setUuid(uniqueId);

      if (Number(hotelCount) > 0) {
        const urlForGetHotelNames = `http://localhost:3000/api/amadeus/top-travel-hotels?uuid=${uniqueId}`;
        const hotelResponse = await axios.get(urlForGetHotelNames);
        console.log("Hotel-Daten:", hotelResponse.data);

        setHotels(hotelResponse.data || []);
      } else {
        setHotels([]);
      }
    } catch (err) {
      console.error(err);
      setError("Fehler beim Laden der Hotels");
    } finally {
      setLoading(false);
    }

    /*
    try {
      console.log(`Lade Hotels für Stadt: ${city}`);
      const url = `http://localhost:3000/api/amadeus/combined?cityName=${city}`;
      console.log(`API URL: ${url}`);

      const response = await axios.get(url);
      console.log(`API Antwort für ${city}:`, response);

      if (response.data && response.data.length > 0) {
        const hotelsWithCity = response.data.map((hotel) => ({
          ...hotel,
          cityName: city,
        }));
        setHotels(hotelsWithCity);
        console.log(
          `Gefunden ${hotelsWithCity.length} Hotels in ${city}:`,
          hotelsWithCity
        );
      } else {
        setHotels([]);
        setError(`Keine Hotels in ${city} gefunden.`);
        console.log(
          ` Keine Hotels in ${city} gefunden. Response:`,
          response.data
        );
      }
    } catch (e) {
      console.error(`Fehler beim Laden der Hotels für Stadt ${city}:`, e);
      console.error("Error details:", e.response?.data || e.message);
      setError(`Fehler beim Laden der Hotels für ${city}.`);
      setHotels([]);
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <div
      className="py-10 px-6"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="mb-8">
        <h2
          className="text-3xl font-medium mb-4 pl-4"
          style={{ color: "var(--text-color)" }}
        >
          {t("topTravel.title") || "Top Reiseziele"} –{" "}
          <span style={{ color: "var(--accent-color)" }}>
            {t("topTravel.subtitle") || "Europa"}
          </span>{" "}
          {t("topTravel.dreamVacation") || "Traumurlaub"}
        </h2>

        <div className="flex flex-wrap gap-4 text-sm pl-4">
          {Object.keys(countriesCities).map((country) => (
            <button
              key={country}
              onClick={() => handleCountryClick(country)}
              className={`hover:underline transition-colors ${
                activeCountry === country ? "font-bold" : ""
              }`}
              style={{
                color:
                  activeCountry === country
                    ? "var(--accent-color)"
                    : "var(--text-light)",
              }}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 pl-4">
        {/* Linke Spalte — Städte oder Hotels */}
        <div className="lg:w-1/2">
          {!activeCountry && (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <h4
                className="text-xl font-semibold mb-2 opacity-70 animate-custom-pulse"
                style={{ color: "var(--text-color)" }}
              >
                {t("topTravel.pleaseSelectCountry") ||
                  "Bitte wählen Sie ein Land"}
              </h4>
              <p
                className="text-sm opacity-60"
                style={{ color: "var(--text-light)" }}
              >
                {t("topTravel.clickCountryToSee") ||
                  "Klicken Sie oben auf ein Land, um Städte zu sehen"}
              </p>
              <div className="mt-8 text-6xl opacity-30 animate-slow-bounce">
                🌍
              </div>
            </div>
          )}

          {/* Städte anzeigen, wenn Land ausgewählt, aber keine Stadt ausgewählt */}
          {activeCountry && !selectedCity && (
            <div>
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                {t("topTravel.citiesIn") || "Städte in"} {activeCountry}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {countriesCities[activeCountry].map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchHotelsByCity(city)}
                    className="text-left p-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-color)",
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
                    <span className="font-medium">📍 {city}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveCountry(null)}
                className="mt-4 text-sm hover:underline transition-colors"
                style={{ color: "var(--text-light)" }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--accent-color)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--text-light)";
                }}
              >
                {t("topTravel.backToCities") || "← Zurück zu Städten in"}{" "}
                {activeCountry}
              </button>
            </div>
          )}

          {/* Hotels anzeigen, wenn Stadt ausgewählt */}
          {selectedCity && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4
                  className="text-xl font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  {t("topTravel.hotelsIn") || "Hotels in"} {selectedCity}
                </h4>
                <button
                  onClick={() => {
                    setSelectedCity(null);
                    setHotels([]);
                    setError(null);
                  }}
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--text-light)" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--accent-color)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--text-light)";
                  }}
                >
                  {t("topTravel.backToCities") || "← Zurück zu Städten in"}{" "}
                  {activeCountry}
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div
                    className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
                    style={{ borderColor: "var(--accent-color)" }}
                  ></div>
                  <p
                    className="font-medium"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Lädt Hotels für {selectedCity}...
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-light)" }}
                  >
                    {t("topTravel.pleaseWait") ||
                      "Bitte warten Sie einen Moment"}
                  </p>
                </div>
              )}

              {error && <p style={{ color: "var(--accent-color)" }}>{error}</p>}

              {!loading && !error && hotels.length === 0 && (
                <p style={{ color: "var(--text-color)" }}>
                  {t("topTravel.noHotelsFound") || "Keine Hotels in"}{" "}
                  {selectedCity} gefunden.
                </p>
              )}

              <div className="space-y-4">
                {hotels.flat().map((hotelWrapper, index) => {
                  const hotel = hotelWrapper.hotel;
                  if (!hotel) return null;

                  return (
                    <div
                      key={hotel.id || index}
                      className="pb-3 p-3 rounded cursor-pointer transition-colors relative"
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                      }}
                      // onMouseEnter={(e) => {
                      //   e.target.style.backgroundColor = "var(--accent-color)";
                      //   e.target.style.color = "white";
                      // }}
                      // onMouseLeave={(e) => {
                      //   e.target.style.backgroundColor = "var(--bg-secondary)";
                      //   e.target.style.color = "var(--text-color)";
                      // }}
                      onClick={() => toggleCard(index)}
                    >
                      <h5
                        className="font-semibold"
                        style={{ color: "var(--text-color)" }}
                      >
                        {hotel.name || "Hotelname nicht verfügbar"}
                      </h5>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-light)" }}
                      >
                        {hotel.cityName}
                      </p>
                      {hotel.offers && hotel.offers[0] && (
                        <div
                          className="text-sm mt-1"
                          style={{ color: "var(--accent-color)" }}
                        >
                          {t("topTravel.from") || "Ab"}{" "}
                          {hotel.offers[0].price?.total}{" "}
                          {hotel.offers[0].price?.currency}
                        </div>
                      )}
                      {hotel.hotel?.rating && (
                        <div
                          className="text-sm mt-1"
                          style={{ color: "var(--accent-hover)" }}
                        >
                          {hotel.hotel.rating}{" "}
                          {t("topTravel.stars") || "Sterne"}
                        </div>
                      )}

                      {/* Dropdown-Bereich */}
                      <div
                        style={{
                          maxHeight: activeIndex === index ? "500px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.8s ease-in",
                        }}
                      >
                        {activeIndex === index && (
                          <div className="mt-3 p-2 border-t border-gray-300">
                            <p style={{ color: "var(--text-color)" }}>
                              {hotel.description ||
                                "Keine Beschreibung verfügbar."}
                            </p>
                            <p style={{ color: "var(--text-light)" }}>
                              Weitere Hotelinfos hier...
                            </p>
                            <button className="text-white rounded px-3 py-1 bg-orange-500 cursor-pointer mt-2 hover:bg-amber-400 hover:text-black absolute bottom-1 right-2">
                              Angebote anzeigen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                className="rounded bg-orange-500 mt-4 p-2 w-full cursor-pointer"
                onClick={async () => {
                  // Neue Suchanfrage ggf. speichern
                  const newSearch = {
                    to: myCity,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    adults,
                    children,
                  };
                  const previousSearches =
                    JSON.parse(localStorage.getItem("lastSearches")) || [];
                  const updatedSearches = [
                    newSearch,
                    ...previousSearches,
                  ].slice(0, 4);
                  localStorage.setItem(
                    "lastSearches",
                    JSON.stringify(updatedSearches)
                  );
                  // URL-Parameter vorbereiten
                  const params = new URLSearchParams({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    adults: adults.toString(),
                    children: children.toString(),
                  });
                  localStorage.setItem("SearchBarParams", params.toString());

                  console.log("startDate:", startDate.toISOString()); // startDate: 2025-07-28T22:00:00.000Z
                  console.log("endDate:", endDate.toISOString()); // endDate: 2025-07-29T22:00:00.000Z
                  console.log("adults:", adults);
                  console.log("children:", children);

                  const lowerCity = myCity.toLowerCase();
                  params.append("city", myCity);

                  // Sonderfall Hamburg
                  if (lowerCity === "hamburg") {
                    // Kein Mock-Parameter
                    window.location.href = `/hamburg-hotels?${params.toString()}`;
                  } else {
                    // mock immer setzen (leer oder mit Wert)
                    const validMocks = ["berlin", "genf", "kopenhagen"];
                    const mockValue = validMocks.includes(lowerCity)
                      ? lowerCity
                      : "";

                    params.append("mock", encodeURIComponent(mockValue));

                    window.location.href = `/hotel-results?${params.toString()}`;
                  }
                }}
              >
                alle Angebote für {selectedCity} anzeigen
              </button>
            </div>
          )}
        </div>

        {/* Rechte Spalte — Karte */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default TopTravelDestinations;

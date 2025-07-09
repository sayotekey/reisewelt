import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent.jsx";
import { useTheme } from "../context/ThemeContext";

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
const countriesCities = {
  Deutschland: [
    "Berlin",
    "Hamburg",
    "München",
    "Köln",
    "Frankfurt",
    "Düsseldorf",
    "Leipzig",
    "Stuttgart",
  ],
  Österreich: ["Wien", "Salzburg", "Graz", "Innsbruck"],
  Schweiz: ["Zürich", "Genf"],
  Frankreich: ["Paris", "Lyon", "Marseille", "Nizza", "Toulouse"],
  Italien: ["Rom", "Bologna"],
  Spanien: ["Madrid", "Barcelona", "Sevilla", "Valencia", "Palma"],
  Portugal: ["Lissabon", "Porto"],
  Niederlande: ["Amsterdam"],
  Belgien: ["Brüssel", "Antwerpen"],
  Irland: ["Dublin"],
  Schottland: ["Edinburgh"],
  Dänemark: ["Kopenhagen"],
  Norwegen: ["Oslo"],
  Schweden: ["Stockholm"],
};

const TopTravelDestinations = () => {
  const { isDark } = useTheme();
  const [activeCountry, setActiveCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Städte des ausgewählten Landes anzeigen
  const handleCountryClick = (country) => {
    setActiveCountry(country);
    setSelectedCity(null); // Ausgewählte Stadt zurücksetzen
    setHotels([]); // Hotels leeren
    setError(null);
  };

  // Hotels für die ausgewählte Stadt laden
  const fetchHotelsByCity = async (city) => {
    setLoading(true);
    setError(null);
    setSelectedCity(city);

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
    }
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
          className="text-3xl font-bold mb-4 pl-4"
          style={{ color: "var(--text-color)" }}
        >
          Top Reiseziele –{" "}
          <span style={{ color: "var(--accent-color)" }}>Europa</span>{" "}
          Traumurlaub
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
                Bitte wähle ein Land
              </h4>
              <p
                className="text-sm opacity-60"
                style={{ color: "var(--text-light)" }}
              >
                Klicken Sie auf ein Land oben, um Städte zu sehen
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
                Städte in {activeCountry}
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
                ← Zurück zur Länderauswahl
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
                  Hotels in {selectedCity}
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
                  ← Zurück zu Städten in {activeCountry}
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
                    Bitte warten Sie einen Moment
                  </p>
                </div>
              )}

              {error && <p style={{ color: "var(--accent-color)" }}>{error}</p>}

              {!loading && !error && hotels.length === 0 && (
                <p style={{ color: "var(--text-color)" }}>
                  Keine Hotels in {selectedCity} gefunden.
                </p>
              )}

              <div className="space-y-4">
                {hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="pb-3 p-3 rounded cursor-pointer transition-colors"
                    style={{
                      borderBottom: "1px solid var(--border-color)",
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
                    <h5
                      className="font-semibold"
                      style={{ color: "var(--text-color)" }}
                    >
                      {hotel.hotel?.name || "Hotelname nicht verfügbar"}
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
                        Ab {hotel.offers[0].price?.total}{" "}
                        {hotel.offers[0].price?.currency}
                      </div>
                    )}
                    {hotel.hotel?.rating && (
                      <div
                        className="text-sm mt-1"
                        style={{ color: "var(--accent-hover)" }}
                      >
                        {hotel.hotel.rating} Sterne
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from './MapComponent.jsx';

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
if (typeof document !== 'undefined') {
  // Проверяем, не добавлены ли уже стили
  const existingStyle = document.getElementById('top-travel-animations');
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
  Deutschland: ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Düsseldorf", "Leipzig", "Stuttgart"],
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
  Schweden: ["Stockholm"]
};

const TopTravelDestinations = () => {
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
        const hotelsWithCity = response.data.map(hotel => ({
          ...hotel,
          cityName: city
        }));
        setHotels(hotelsWithCity);
        console.log(`✅ Gefunden ${hotelsWithCity.length} Hotels in ${city}:`, hotelsWithCity);
      } else {
        setHotels([]);
        setError(`Keine Hotels in ${city} gefunden.`);
        console.log(`❌ Keine Hotels in ${city} gefunden. Response:`, response.data);
      }
    } catch (e) {
      console.error(`❌ Fehler beim Laden der Hotels für Stadt ${city}:`, e);
      console.error('Error details:', e.response?.data || e.message);
      setError(`Fehler beim Laden der Hotels für ${city}.`);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-10 px-6 text-blue-800">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 pl-4">
          Top Reiseziele – <span className="text-yellow-500">Europa</span> Traumurlaub
        </h2>

        <div className="flex flex-wrap gap-4 text-sm pl-4">
          {Object.keys(countriesCities).map((country) => (
            <button
              key={country}
              onClick={() => handleCountryClick(country)}
              className={`hover:text-blue-500 underline ${
                activeCountry === country ? "font-bold text-blue-600" : ""
              }`}
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
              <h4 className="text-xl font-semibold mb-2 text-blue-800 opacity-70 animate-custom-pulse">
                Bitte wähle ein Land
              </h4>
              <p className="text-sm text-gray-500 opacity-60">
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
              <h4 className="text-xl font-semibold mb-4 text-blue-800">
                Städte in {activeCountry}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {countriesCities[activeCountry].map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchHotelsByCity(city)}
                    className="text-left p-4 border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors"
                  >
                    <span className="text-blue-800 font-medium">📍 {city}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveCountry(null)}
                className="mt-4 text-sm text-gray-600 hover:text-blue-600 underline"
              >
                ← Zurück zur Länderauswahl
              </button>
            </div>
          )}

          {/* Hotels anzeigen, wenn Stadt ausgewählt */}
          {selectedCity && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-blue-800">
                  Hotels in {selectedCity}
                </h4>
                <button
                  onClick={() => {
                    setSelectedCity(null);
                    setHotels([]);
                    setError(null);
                  }}
                  className="text-sm text-gray-600 hover:text-blue-600 underline"
                >
                  ← Zurück zu Städten in {activeCountry}
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-blue-600 font-medium">Lädt Hotels für {selectedCity}...</p>
                  <p className="text-sm text-gray-500 mt-1">Bitte warten Sie einen Moment</p>
                </div>
              )}

              {error && <p className="text-red-600">{error}</p>}

              {!loading && !error && hotels.length === 0 && (
                <p>Keine Hotels in {selectedCity} gefunden.</p>
              )}

              <div className="space-y-4">
                {hotels.map((hotel, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 hover:bg-blue-50 p-3 rounded cursor-pointer">
                    <h5 className="font-semibold text-blue-800">
                      {hotel.hotel?.name || "Hotelname nicht verfügbar"}
                    </h5>
                    <p className="text-sm text-gray-600">
                       {hotel.cityName}
                    </p>
                    {hotel.offers && hotel.offers[0] && (
                      <div className="text-sm text-green-600 mt-1">
                         Ab {hotel.offers[0].price?.total} {hotel.offers[0].price?.currency}
                      </div>
                    )}
                    {hotel.hotel?.rating && (
                      <div className="text-sm text-yellow-600 mt-1">
                        ⭐ {hotel.hotel.rating} Sterne
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

import { useState } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import validCities from "../utils/validCities.js";

import xButtonDelete from "../icons/x-solid.svg";
import finder from "../icons/finder.gif";
import search from "../icons/search.gif";
import itcRoyal from "../images/itc-royal-bengal.jpg";

export default function SearchForm() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [loading, setLoading] = useState(false);
  const [startDate, endDate] = dateRange;

  // Filtere Vorschläge nach Eingabe (case-insensitive, enthält den Text)
  const suggestions = myCity
    ? validCities.filter((city) =>
        city.toLowerCase().includes(myCity.toLowerCase())
      )
    : [];

  const handleInputChange = (e) => {
    setMyCity(e.target.value);
    setShowSuggestions(true);
    setError("");
  };

  const handleSuggestionClick = (city) => {
    setMyCity(city);
    setShowSuggestions(false);
    setError("");
  };

  const handleSearch = () => {
    if (!myCity) {
      setError("Bitte einen Städtenamen eingeben.");
      return;
    }
    if (!validCities.includes(myCity)) {
      setError("Ungültiger Städtename, bitte Eingabe überprüfen.");
      return;
    }
    setError("");
    setShowSuggestions(false);
  };

  // onclick button fetchs hotels with data from backend
  const getCombinedData = async (myCity) => {
    try {
      setError(""); // optional: reset error before fetch
      setHotels([]); // optional: clear previous hotels
      setLoading(true); // <-- Spinner sichtbar machen
      const response = await axios.get(
        "http://localhost:3000/api/amadeus/combined",
        {
          params: {
            cityName: myCity, // Pass the search city to the backend
          },
        }
      );
      console.log("Fetched Information:", response.data);
      console.log(Array.isArray(response.data)); // ist true!
      setHotels(response.data);
      setLoading(false); // <-- Spinner ausblenden

      // Lesen die zuletzt gespeicherten Suchen aus localStorage
      const previousSearches =
        JSON.parse(localStorage.getItem("lastSearches")) || [];
      // Create a new search object
      const newSearch = {
        to: myCity,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        adults,
        children,
      };
      //
      const updatedSearches = [newSearch, ...previousSearches].slice(0, 3); // Limit to 3 searches
      localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Error fetching hotels:", error.message);
      return [];
    }
  };

  return (
    <div className="bg-purple-400 text-gray-900 p-6 rounded-2xl w-full max-w-4xl mx-auto shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reiseziel */}
        <div className="relative w-full max-w-md">
          <label className="font-semibold mb-1 flex items-center gap-2">
            Wohin möchtest du reisen?
          </label>
          <input
            type="text"
            placeholder="Reiseziel eingeben"
            className="w-full p-2 rounded border border-gray-800"
            value={myCity}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            // autoComplete="off"
          />

          {myCity && (
            <button
              type="button"
              className="absolute right-0 top-4 -translate-y-1/2 text-gray-400 cursor-pointer min-w-2"
              onClick={() => setMyCity("")}
              tabIndex={-1}
              aria-label="Eingabe löschen"
            >
              <div className="absolute -top-8 right-0 w-10 h-10 flex justify-center">
                <img src={xButtonDelete} alt="x-icon" width={15} />
              </div>
            </button>
          )}
          {/* Dropdown für Vorschläge */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-56 overflow-y-auto">
              {suggestions.map((city) => (
                <li
                  key={city}
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Flug hinzufügen */}
        <div>
          <label className="font-semibold mb-1">Flüg hinzufügen</label>
          <input
            type="text"
            placeholder="Optional"
            className="w-full p-2 rounded border border-gray-800"
          />
        </div>

        {/* Wann reisen */}
        <div>
          <label className="font-semibold mb-1 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-600" />
            Wann reisen?
          </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            className="w-full p-2 rounded border border-gray-800 cursor-pointer"
            placeholderText="Datum auswählen"
            dateFormat="dd.MM.yyyy"
            isClearable
          />
        </div>

        {/* Personenwahl */}
        <div className="relative">
          <label className="font-semibold mb-1">
            Wie viele Personen reisen?
          </label>
          <div
            className="w-full p-2 rounded border border-gray-800 bg-white cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {adults} Erwachsene, {children} Kinder
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 bg-white border border-gray-800 rounded p-4 mt-2 w-full shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span>Erwachsene</span>
                  <div className="flex gap-2 items-center">
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      &#45;
                    </button>
                    <span>{adults}</span>
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => setAdults(adults + 1)}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kinder</span>
                  <div className="flex gap-2 items-center">
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      &#45;
                    </button>
                    <span>{children}</span>
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => setChildren(children + 1)}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Suchen Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            handleSearch();
            // Only fetch hotels if there is no error, myCity is valid, and both dates are selected
            if (
              myCity &&
              validCities.includes(myCity) &&
              startDate &&
              endDate
            ) {
              getCombinedData(myCity);
            } else if (!startDate || !endDate) {
              setError("Bitte Reisedatum angeben!");
            }
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Suchen
        </button>
      </div>
      {/* Error Message */}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {loading && (
        <div className="flex bg-white mt-4">
          <p className="font-bold">Wir suchen gerade die besten Deals!</p>
          <img src={search} width={200} alt="find-gif" />
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Gefundene Hotels in {myCity}:
        </h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/*  */} <img src={itcRoyal} className="w-1/3 h-auto" alt="" />
          {hotels.map((hotel) => (
            <div className="flex flex-wrap w-1/2" key={hotel.hotel.dupeId}>
              {/* einige Hotelnamen sind full-caps => Anpassen! */}
              <h3 className="font-bold w-full">{hotel.hotel.name}</h3>
              {/* <p>{Bewertung später}</p> */}
              <h4 className="block w-full">&#40;{hotel.hotel.cityCode}&#41;</h4>
              <p className="block">
                {hotel.offers?.[0]?.checkInDate}&#45;
                {hotel.offers?.[0]?.checkOutDate}
              </p>

              <p>
                Preis ab:
                {hotel.offers?.[0]?.price?.total}
                {hotel.offers?.[0]?.price?.currency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

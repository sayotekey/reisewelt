import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function SearchForm() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [searchCity, setSearchCity] = useState(""); // State for search input (wohin ?)
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;

  // onclick  button fetch hotels from backend
  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/hotels", {
        params: {
          city: searchCity, // Pass the search city to the backend
        },
      });
      console.log("Fetched hotels:", res.data);
      setHotels(res.data);

      // Lesen die zuletzt gespeicherten Suchen aus localStorage
      const previousSearches =
        JSON.parse(localStorage.getItem("lastSearches")) || [];
      // Create a new search object
      const newSearch = {
        to: searchCity,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        adults,
        children,
      };
      //
      const updatedSearches = [newSearch, ...previousSearches].slice(0, 3); // Limit to 3 searches
      localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return [];
    }
  };

  return (
    <div className="bg-purple-400 text-gray-900 p-6 rounded-2xl w-full max-w-4xl mx-auto shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reiseziel */}
        <div>
          <label className="font-semibold mb-1 flex items-center gap-2">
            Wohin möchtest du reisen?
          </label>
          <input
            type="text"
            placeholder="Add text"
            className="w-full p-2 rounded border border-gray-800"

            value={myCity}
            onChange={(e) => setMyCity(e.target.value)}

          />
        </div>

        {/* Flug hinzufügen */}
        <div>
          <label className="font-semibold mb-1">Flüg hinzufügen</label>
          <input
            type="text"
            placeholder="Optional"
            className="w-full p-2 rounded border border-gray-800"

           // value={searchCity}
           // onChange={(e) => setSearchCity(e.target.value)}

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
            className="w-full p-2 rounded border border-gray-800"
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
                      className="px-3 py-1 border rounded bg-gray-200 text-gray-200 font-bold text-lg hover:bg-gray-300 transition-colors"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      −
                    </button>
                    <span>{adults}</span>
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-200 font-bold text-lg hover:bg-gray-200"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kinder</span>
                  <div className="flex gap-2 items-center">
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-200  hover:bg-gray-200 text-lg font-bold"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      −
                    </button>

                    <span>{children}</span>
                    <button
                      className="px-2 py-1 border rounded bg-gray-200 text-gray-200 font-bold text-lg hover:bg-gray-200"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
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
          onClick={fetchHotels}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Suchen
        </button>
      </div>

      {/* Hotels List */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Gefundene Hotels:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="p-4 bg-yellow-200 rounded shadow transform transition-transform hover:scale-105"
            >
              <h3 className="font-bold">{hotel.name}</h3>
              <p>{hotel.city}</p>
              <p>Preis: {hotel.price} €</p>
              <p>Bewertung: {hotel.rating} Sterne</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

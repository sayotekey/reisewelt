import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import validCities from "../utils/validCities.js";

import xButtonDelete from "../icons/x-solid-black.svg";
import arrowDown from "../icons/angle-down-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import plane from "../icons/plane-solid-black.svg";
import plane2 from "../icons/plane2-solid-black.png";
import persons from "../icons/people-group-solid-black.svg";
import wishlistHeartFull from "../icons/heart-solid-black.svg";
import wishlistHeartEmpty from "../icons/heart-regular-black.svg";

import finder from "../icons/finder.gif";
import search from "../icons/search.gif";
import gptExample from "../images/ChatGPT.png";

export default function SearchForm() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef();

  // Filtere Vorschläge nach Eingabe (case-insensitive, enthält den Text)
  const suggestions = myCity
    ? validCities.filter((city) =>
        city.toLowerCase().includes(myCity.toLowerCase())
      )
    : [];

  const handleInputChange = (e) => {
    setMyCity(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    // setError("");
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      // Auswahl nach unten bewegen
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      // Auswahl nach oben bewegen
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      setMyCity(suggestions[selectedIndex]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (city) => {
    setMyCity(city);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    // setError("");
  };

  const handleChildrenAgePopUp = () => {
    setChildrenAges(true);
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

  // 1.Endpunkt für UUID
  const getUUID = async () => {
    // ... später:
    // const statusResponse = await fetch(`/api/status/${uuid}`);
    // const statusData = await statusResponse.json();
    // statusData enthält jetzt die Infos zu dieser UUID
  };

  // onclick button fetchs hotels with data from backend
  const getCombinedData = async (myCity) => {
    try {
      setError(""); // optional: reset error before fetch
      setHotels([]); // optional: clear previous hotels
      setLoading(true); // <-- Spinner sichtbar machen
      const response = await axios.get("http://localhost:3000/api/generate", {
        params: {
          cityName: myCity, // Pass the search city to the backend
        },
      });
      const data = await response.json();
      const uuid = data.uuid;

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
          <div className="flex  mb-1 gap-2">
            <img
              src={travelGoal}
              alt="icon: mountain and building"
              className="h-4"
            />
            <label className="font-semibold flex items-center gap-2">
              Wohin möchtest du reisen?
            </label>
          </div>
          <input
            type="text"
            placeholder="Reiseziel eingeben"
            className="w-full p-2 rounded border border-gray-800"
            value={myCity}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
              {suggestions.map((city, idx) => (
                <li
                  key={city}
                  className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                    idx === selectedIndex ? "bg-indigo-200" : ""
                  }`}
                  onMouseDown={() => handleSuggestionClick(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
          {myCity && (
            <button
              type="button"
              className="absolute -right-2 top-4 -translate-y-1/2 text-gray-400 cursor-pointer min-w-2"
              onClick={() => setMyCity("")}
              tabIndex={-1}
              aria-label="Eingabe löschen"
            >
              <div className="absolute top-3 right-2 w-10 h-10 flex justify-center">
                <img src={xButtonDelete} alt="x-icon" width={15} />
              </div>
            </button>
          )}
        </div>
        {/* Flug hinzufügen */}
        <div className="w-full max-w-md">
          <div className="flex mb-1 gap-2">
            <img
              src={plane}
              alt="icon: mountain and building"
              className="h-4"
            />
            <label className="font-semibold hover:cursor-pointer flex text-black gap-2">
              Willst du fliegen?
            </label>
          </div>
          <input
            type="text"
            placeholder="  +  Flug hinzufügen"
            className="w-full p-2 hover:cursor-pointer border rounded border-dashed border-gray-600 text-gray-600 placeholder-gray-600"
          />
        </div>

        <div>
          <label className="font-semibold mb-1 flex items-center gap-2">
            <FaCalendarAlt className="text-black" />
            Wann reisen?
          </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            className="p-2 rounded border border-gray-800 cursor-pointer"
            placeholderText="Datum auswählen"
            dateFormat="dd.MM.yyyy"
            isClearable
          />
        </div>
        {/* Personenwahl */}
        <div className="relative">
          <div className="flex flex-row mb-1 ">
            <img
              src={persons}
              alt="icon: group of 3 people"
              className="h-5 pr-2"
            />
            <label className="font-semibold">Wie viele Personen reisen?</label>
          </div>

          <div
            className="w-full p-2 rounded border border-gray-800 pl-4 bg-white cursor-pointer hover:bg-blue-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {adults} Erwachsene, {children} Kinder (0 - 17 Jahre)
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-15 bg-white border border-gray-800 rounded p-4 mt-2 w-full shadow-md"
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
                  <span>Kinder (0 - 17 Jahre)</span>
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
                      onClick={() => {
                        setChildren(children + 1);
                        // handleChildrenAgePopUp();
                      }}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                {children >= 1 && (
                  <>
                    <div className="pt-3 pb-2 w-full">
                      <p className="pb-3">Alter bei Rückreise:</p>
                      {/* Für jedes Kind ein Dropdown */}
                      <div className="grid grid-cols-2 gap-7">
                        {Array.from({ length: children }).map((_, idx) => (
                          <div
                            key={idx}
                            className="mb-2 flex items-center gap-2"
                          >
                            <label className="flex items-center gap-2">
                              Kind {idx + 1}
                            </label>
                            <select
                              className="border rounded px-1 py-0.5"
                              value={childrenAges[idx] || ""}
                              onChange={(e) => {
                                const newAges = [...childrenAges];
                                newAges[idx] = e.target.value;
                                setChildrenAges(newAges);
                              }}
                            >
                              <option value="Alter">Alter wählen</option>
                              {Array.from({ length: 18 }).map((_, age) => (
                                <option key={age} value={age}>
                                  {age}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-8">
                      <button
                        className="bg-purple-400 rounded absolute bottom-0 right-0 w-fit px-2 py-1"
                        onClick={() => setShowDropdown(false)}
                      >
                        Angaben speichern
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <div
              className="flex gap-4 my-4 mx-2 transform transition-transform duration-500 hover:scale-105 cursor-pointer"
              key={hotel.hotel.dupeId}
              onClick={() =>
                (window.location.href = `/hotel/${hotel.hotel.dupeId}`)
              }
            >
              <div className="w-2/5 relative">
                <div className="flex absolute top-2 right-2">
                  <img
                    src={wishlistHeartEmpty}
                    alt="icon: heart"
                    className="h-5 w-5 z-10"
                    // onClick={handleAddToWishlist} => kommt noch !!
                  />
                </div>
                <img
                  src={gptExample}
                  alt="gpt-example-picture"
                  className="rounded-tl-xl rounded-bl-xl"
                />
              </div>

              <div className="flex flex-wrap w-1/2">
                <h3 className="font-bold w-full">
                  {hotel.hotel.name
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </h3>
                {/* <p>{Bewertung später}</p> */}
                <h4 className="block w-full">
                  &#40;
                  {
                    // Finde den passenden Stadtnamen zum CityCode
                    validCities.find((city) =>
                      city
                        .toLowerCase()
                        .includes(hotel.hotel.cityCode.toLowerCase())
                    ) || hotel.hotel.cityCode
                  }
                  &#41;&#44;
                </h4>
                <p className="block">
                  {hotel.offers?.[0]?.checkInDate
                    ? new Date(hotel.offers[0].checkInDate).toLocaleDateString(
                        "de-DE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                    : ""}
                  &#32; &#45;&#32;
                  {hotel.offers?.[0]?.checkOutDate
                    ? new Date(hotel.offers[0].checkOutDate).toLocaleDateString(
                        "de-DE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                    : ""}
                </p>
                {/* Anzahl + Erwachsene(r) */}
                <p>
                  {hotel.offers[0].guests.adults}&#32;
                  {hotel.offers[0].guests.adults > 1
                    ? "Erwachsene"
                    : "Erwachsener"}
                </p>
                {/* Kinder optional */}
                <p>
                  Preis ab:&#32;
                  {hotel.offers?.[0]?.price?.total
                    ? hotel.offers[0].price.total.replace(".", ",")
                    : ""}
                  &#32;
                  {hotel.offers[0]?.price.currency.replace("EUR", "€")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

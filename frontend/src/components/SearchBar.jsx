import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaBed,
  FaUtensils,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useTranslate } from "../locales/index.js"; // Import the translation context

import validCities from "../utils/validCities.js";

import xButtonDelete from "../icons/x-solid-black.svg";
// import arrowDown from "../icons/angle-down-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import plane from "../icons/plane-solid-black.svg";
// import plane2 from "../icons/plane2-solid-black.png";
import persons from "../icons/people-group-solid-black.svg";
import question from "../icons/question-solid-black.svg";

export default function SearchForm() {
  const { t } = useTranslate();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [error, setError] = useState("");
  // const [cityError, setCityError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showErrorInfo, setShowErrorInfo] = useState(false);
  // const navigate = useNavigate();
  const dropdownRef = useRef();

  // Daten aus localStorage holen
  // useEffect(() => {
  //   const lastHotels = JSON.parse(localStorage.getItem("lastHotels")) || [];
  //   if (lastHotels.length > 0) {
  //     setHotels(lastHotels);
  //   }
  // }, []);

  //dropdown functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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
    setError("");
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
    setError("");
  };

  const handleSearch = () => {
    console.log("kontrolle myCity bei Validierung", myCity);

    if (!myCity || myCity === "") {
      setError("Bitte einen Städtenamen eingeben.");
      return false;
    } else if (!validCities.includes(myCity)) {
      setError("Ungültiger Städtename, bitte Eingabe überprüfen.");
      return false;
    } else if (!startDate || !endDate) {
      setError("Bitte ein Reisedatum angeben!");
      return false;
    }
    return true;
    // else {
    //   // setCityError("");
    //   setError("");
    //   setShowSuggestions(false);
    // }
  };

  // 1.Endpunkt für UUID
  // onclick button anfrage an backend senden, um UUID zu generieren
  // und die UUID in der MongoDB zu speichern
  // const getCombinedData = async () => {
  //   try {
  //     setError(""); // optional: reset error before fetch
  //     setHotels([]); // optional: clear previous hotels
  //     setLoading(true); // <-- Spinner sichtbar machen

  //     ///
  //     // Speichern der letzten Suchanfrage im Local Storage
  //     const previousSearches =
  //       JSON.parse(localStorage.getItem("lastSearches")) || [];
  //     const newSearch = {
  //       to: myCity,
  //       startDate: startDate ? startDate.toISOString() : null,
  //       endDate: endDate ? endDate.toISOString() : null,
  //       adults,
  //       children,
  //     };
  //     const updatedSearches = [newSearch, ...previousSearches].slice(0, 4); // Limit to 4 searches
  //     localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
  //     ///
  //     const response = await axios.get(
  //       "http://localhost:3000/api/uuid/generate",
  //       {
  //         params: {
  //           //zum backend schicken
  //           cityName: myCity,
  //           startDate: startDate,
  //           endDate: endDate,
  //           adults: adults,
  //           children: children,
  //         },
  //       }
  //     );
  //     const myUuid = response.data.uuid;

  //     console.log("UUID:", myUuid); // Gibt die generierte UUID aus

  //     // 2. Endpunkt: Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const url = `http://localhost:3000/api/uuid/status/${myUuid}`;
  //     const hotelCountResponse = await axios.get(url);
  //     const countRaw = hotelCountResponse.data.count; // {"count":3 }
  //     let flag = hotelCountResponse.data.flag; // false?

  //     console.log("2.Endpunkt: aktueller Count", countRaw);
  //     console.log("2.Endpunkt: aktuelle flag", flag);

  //     let allHotels = []; // Array für alle Hotels
  //     let newCount = 0; // Variable für neuen Count

  //     while (flag === false) {
  //       await new Promise((resolve) => setTimeout(resolve, 3000));
  //       const retryResponse = await axios.get(url); // erneute Abfrage der Anzahl der Hotels
  //       newCount = retryResponse.data.count; // aktualisiere neuen Count
  //       console.log("newCount aus while-loop:", newCount);
  //       flag = retryResponse.data.flag;

  //       if (newCount > allHotels.length) {
  //         //3. endpunkt
  //         const hotelLength = allHotels.length;
  //         const urlHotel = "http://localhost:3000/api/uuid/hotels";
  //         const hotelResponse = await axios.get(urlHotel, {
  //           params: {
  //             uuid: myUuid,
  //             count: hotelLength,
  //             limit: newCount - hotelLength,
  //           },
  //         });
  //         console.log(hotelResponse.data.hotels);
  //         console.log(Array.isArray(hotelResponse.data.hotels));

  //         hotelResponse.data.hotels.forEach((hotel) => {
  //           console.log(hotel);
  //           allHotels.push(hotel[0]);
  //         });

  //         setHotels([...allHotels]);
  //       }
  //     }
  //     if (allHotels.length === 0) {
  //       setError("Es wurden keine Hotels gefunden.");
  //       setLoading(false);
  //     } else {
  //       setHotels([...allHotels]);
  //       setLoading(false);
  //     }
  //     console.log("allHotels", allHotels);

  //     localStorage.setItem("lastHotels", JSON.stringify(allHotels));

  //     // Lesen die zuletzt gespeicherten Suchen aus localStorage
  //     //   const previousSearches =
  //     //     JSON.parse(localStorage.getItem("lastSearches")) || [];
  //     //   // Create a new search object
  //     //   const newSearch = {
  //     //     to: myCity,
  //     //     startDate: startDate ? startDate.toISOString() : null,
  //     //     endDate: endDate ? endDate.toISOString() : null,
  //     //     adults,
  //     //     children,
  //     //   };
  //     //   //
  //     //   const updatedSearches = [newSearch, ...previousSearches].slice(0, 3); // Limit to 3 searches
  //     //   localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
  //     //
  //   } catch (error) {
  //     console.error("Error fetching hotels:", error.message);
  //     setLoading(false); // <-- Spinner ausblenden bei Fehler
  //     setError("Fehler beim Laden der Hotels. Bitte versuchen Sie es erneut.");
  //     return [];
  //   }
  // };

  return (
    <div
      className="text-gray-600 p-6 rounded-2xl w-full max-w-7xl -mt-20 z-50 mx-auto shadow-md relative"
      style={{
        background: "linear-gradient(135deg, #ff7626, #ff7851)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Reiseziel */}
        <div className="relative w-full">
          <div className="flex mb-1 items-center gap-2">
            <img
              src={travelGoal}
              alt="icon: mountain and building"
              className="h-4"
            />
            <label className="font-semibold flex items-center gap-2">
              {t("search.whereTravel") || "Wohin möchtest du reisen?"}
            </label>
          </div>
          <input
            type="text"
            placeholder={t("search.enterDestination") || "Reiseziel eingeben"}
            className="w-full p-2 rounded border hover:bg-blue-200 bg-white border-gray-800"
            value={myCity}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 bg-white border border-gray-500 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
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
              className="absolute -right-2 top-4 -translate-y-1/2 text-gray-300 cursor-pointer min-w-2"
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
        <div>
          <label className="font-semibold hover:cursor-pointer flex text-blue-100 gap-2"></label>
          <div className="w-full">
            <div className="flex mb-1 items-center gap-2">
              <img
                src={plane}
                alt="icon: mountain and building"
                className="h-4"
              />
              <label className="font-semibold hover:cursor-pointer flex text-blue-800 gap-2">
                Willst du fliegen?
              </label>
            </div>
            <input
              type="text"
              placeholder={t("search.addFlight") || "  +  Flug hinzufügen"}
              className="w-full p-2 hover:cursor-pointer border rounded border-dashed border-gray-800 text-gray-600 placeholder-gray-600"
            />
          </div>
        </div>
        <div>
          <label className="font-semibold mb-1 flex items-center gap-2">
            <FaCalendarAlt className="text-black" />
            {t("search.whenTravel") || "Wann reisen?"}
          </label>
          <div className="w-full">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              className="w-full p-2  bg-white rounded border border-gray-500 cursor-pointer  hover:bg-blue-200"
              wrapperClassName="w-full"
              placeholderText={t("search.selectDate") || "Datum auswählen"}
              dateFormat="dd.MM.yyyy"
              monthsShown={2}
              isClearable
              customInput={
                <input
                  style={{
                    width: "100%", //hier size anpassen
                    padding: "8px",
                    border: "1px solid #1f2937",
                    borderRadius: "3px",
                    outline: "none",
                    height: "40px",
                    boxSizing: "border-box",
                    fontSize: "16px",
                  }}
                />
              }
            />
          </div>
        </div>
        {/* Personenwahl */}
        <div className="relative" ref={dropdownRef}>
          <div className="font-semibold flex flex-row mb-1">
            <img
              src={persons}
              alt="icon: group of 3 people"
              className="h-5 pr-2"
            />
            {t("search.howManyPeople") || "Wie viele Personen reisen?"}
          </div>

          <div
            className="w-full p-2 rounded border border-gray-800 pl-4 bg-white cursor-pointer hover:bg-blue-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {adults} {t("search.adults") || "Erwachsene"}, {children}
            {t("search.children") || " Kinder (0 - 17 Jahre)"}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-15 bg-white border border-gray-500 rounded p-4 mt-2 w-full shadow-md"
              >
                <div className="relative mb-2 h-6">
                  <button className="absolute top-0 right-0 p-1 border-2 border-gray-500 rounded-md cursor-pointer">
                    <img
                      src={xButtonDelete}
                      alt="Icon X"
                      width={10}
                      className="flex-end"
                      onClick={() => setShowDropdown(false)}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span>{t("search.adults") || "Erwachsene"}</span>
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
                  <span>{t("search.children") || "Kinder (0 - 17 Jahre)"}</span>
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
                      }}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                {children >= 1 && (
                  <>
                    <div className="pt-3 pb-2 w-full">
                      <p className="pb-3 ">Alter bei Hinreise:</p>
                      {/* Für jedes Kind ein Dropdown */}
                      <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-7">
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
                                <option
                                  key={age}
                                  value={age}
                                  className="justify-center text-center"
                                >
                                  {age}&#32;Jahre
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-8">
                      <button
                        className="bg-blue-400 rounded absolute bottom-0 right-0 w-fit px-2 py-1"
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
      <div className="mt-6 flex w-full sm:w-full sm:justify-center md:justify-end xl:justify-end">
        <button
          onClick={async () => {
            // validierung
            console.log("Starte Validierung");

            if (!handleSearch()) return;
            console.log("Beende Validierung");

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
            const updatedSearches = [newSearch, ...previousSearches].slice(
              0,
              4
            );
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
              const mockValue = validMocks.includes(lowerCity) ? lowerCity : "";

              params.append("mock", encodeURIComponent(mockValue));

              window.location.href = `/hotel-results?${params.toString()}`;
            }
          }}
          className="text-gray-800 w-full sm:w-full xl:w-1/7 px-6 py-2 mt-3 rounded transition font-semibold cursor-pointer"
          style={{ backgroundColor: "#a8d5e2" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#a2ceda")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#a8d5e2")}
        >
          {t("search.searchButton") || "Suchen"}
        </button>
      </div>
      {/*hier ist Grid zu Ende! */}
      {/* Error Message */}

      <section className="w-full lg:w-3/4">
        {error && (
          <div className="bg-white rounded-lg shadow-md pb-4 pl-4 pt-1 pr-4 mb-6 mt-6 w-full">
            <div className="text-green-600 font-semibold">
              {error}
              <button
                className="border border-gray-600 rounded-full ml-3 pr-2 pl-2 pt-1 pb-1 mt-3 hover:bg-orange-500"
                onClick={() => setShowErrorInfo((prev) => !prev)}
              >
                <img src={question} alt="icon info" width={10} />
              </button>
              {showErrorInfo && !startDate && (
                <div className="mt-2 text-sm text-gray-700 bg-orange-100 rounded p-2">
                  Das Startdatum darf <span className="underline">nicht</span>{" "}
                  in der Vergangenheit liegen.
                </div>
              )}
              {showErrorInfo && !myCity && startDate && (
                <div className="mt-2 text-sm text-gray-700 bg-orange-100 rounded p-2">
                  Für die Suchanfrage wird ein Ziel benötigt. Wohin soll die
                  Reise gehen?
                </div>
              )}
              {showErrorInfo && !validCities.includes(myCity) && (
                <div className="mt-2 text-sm text-gray-700 bg-orange-100 rounded p-2">
                  Bitte die Eingabe nochmals überprüfen.
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

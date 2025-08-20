import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";

import xButtonDelete from "../icons/x-solid-black.svg";
import persons from "../icons/people-group-solid-black.svg";
import plane from "../icons/plane-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import calendar from "../icons/calendar-days-solid-black.svg";
// import pencil from "../icons/pencil-solid-black.svg";
import pencil2 from "../icons/pencil-solid-white.svg";

import validCities from "../utils/validCities.js";

import { useTranslate } from "../locales/index.js"; // Import the translation context

const MiniSearchbar = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [cityError, setCityError] = useState("");

  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  const [showErrorInfo, setShowErrorInfo] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const { t } = useTranslate();

  const togglePopup = () => {
    if (!showPopup && lastSearches[0]?.to) {
      setMyCity(lastSearches[0].to); // Wert aus localStorage übernehmen
    }
    setShowPopup(!showPopup);
  };
  // Daten aus localStorage holen
  useEffect(() => {
    const lastHotels = JSON.parse(localStorage.getItem("lastHotels")) || [];
    if (lastHotels.length > 0) {
      setHotels(lastHotels);
    }
  }, []);

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

  // localStorage last-search-Hotellist
  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem("lastHotels", JSON.stringify(hotels));
    }
  }, [hotels]);

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

  const handleSearch = () => {
    let valid = true;
    if (!myCity) {
      setCityError("Bitte einen Städtenamen eingeben.");
      valid = false;
    } else if (!validCities.includes(myCity)) {
      setCityError("Ungültiger Städtename, bitte Eingabe überprüfen.");
      valid = false;
    } else {
      setCityError("");
      setShowSuggestions(false);
    }
  };

  // 1.Endpunkt für UUID
  // onclick button anfrage an backend senden, um UUID zu generieren
  // und die UUID in der MongoDB zu speichern
  const getCombinedData = async () => {
    try {
      setError(""); // optional: reset error before fetch
      setHotels([]); // optional: clear previous hotels
      setLoading(true); // <-- Spinner sichtbar machen
      const response = await axios.get(
        // "http://localhost:3000/api/uuid/generate",
        `${import.meta.env.VITE_BACKEND_API_URL}api/uuid/generate`,
        {
          params: {
            //zum backend schicken
            cityName: myCity,
            startDate: startDate,
            endDate: endDate,
            adults: adults,
            children: children,
          },
        }
      );
      const myUuid = response.data.uuid;

      console.log("UUID:", myUuid); // Gibt die generierte UUID aus

      // 2. Endpunkt: Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // const url = `http://localhost:3000/api/uuid/status/${myUuid}`;
      const url = `${
        import.meta.env.VITE_BACKEND_API_URL
      }api/uuid/status/${myUuid}`;
      const hotelCountResponse = await axios.get(url);
      const countRaw = hotelCountResponse.data.count; // {"count":3 }
      let flag = hotelCountResponse.data.flag; // false?

      console.log("2.Endpunkt: aktueller Count", countRaw);
      console.log("2.Endpunkt: aktuelle flag", flag);

      let allHotels = []; // Array für alle Hotels
      let newCount = 0; // Variable für neuen Count

      while (flag === false) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const retryResponse = await axios.get(url); // erneute Abfrage der Anzahl der Hotels
        newCount = retryResponse.data.count; // aktualisiere neuen Count
        console.log("newCount aus while-loop:", newCount);
        flag = retryResponse.data.flag;

        if (newCount > allHotels.length) {
          //3. endpunkt
          const hotelLength = allHotels.length;
          // const urlHotel = "http://localhost:3000/api/uuid/hotels";
          const urlHotel = `${
            import.meta.env.VITE_BACKEND_API_URL
          }api/uuid/hotels`;
          const hotelResponse = await axios.get(urlHotel, {
            params: {
              uuid: myUuid,
              count: hotelLength,
              limit: newCount - hotelLength,
            },
          });
          console.log(hotelResponse.data.hotels);
          console.log(Array.isArray(hotelResponse.data.hotels));

          hotelResponse.data.hotels.forEach((hotel) => {
            console.log(hotel);
            allHotels.push(hotel[0]);
          });

          setHotels([...allHotels]);
        }
      }
      if (allHotels.length === 0) {
        setError("Es wurden keine Hotels gefunden.");
        setLoading(false);
      } else {
        // setHotels([...allHotels]);
        setLoading(false);
      }
      console.log("allHotels", allHotels);

      localStorage.setItem("lastHotels", JSON.stringify(allHotels));

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
  const lastSearches = JSON.parse(localStorage.getItem("lastSearches") || "[]");

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white border border-orange-500 rounded px-3 py-3 flex items-center space-x-4 w-fit shadow-md">
        {/* Reiseziel */}
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 text-blue-900">
            <img src={travelGoal} alt="icon: mountain and building" />
          </div>
          <span className="font-semibold text-blue-900">
            {lastSearches[0]?.to}
          </span>
        </div>

        {/* Datum */}
        <div className="flex items-center space-x-1">
          <div className="w-3 h-4 text-blue-900">
            <img src={calendar} alt="icon: calendar" />
          </div>
          <span className="text-blue-900 font-semibold">
            {lastSearches[0]?.startDate && lastSearches[0]?.endDate && (
              <span>
                {new Date(lastSearches[0]?.startDate).toLocaleDateString()} –{" "}
                {new Date(lastSearches[0]?.endDate).toLocaleDateString()}
              </span>
            )}
          </span>
        </div>

        {/* Personen */}
        <div className="flex items-center space-x-1">
          <div className="w-5 h-4 text-blue-900 ">
            <img src={persons} alt="icon: persons" />
          </div>
          <span className="text-blue-900 font-semibold">
            {lastSearches[0]?.adults}{" "}
            {lastSearches[0]?.adults > 1 ? "Erwachsene" : "Erwachsener"}
          </span>
        </div>

        {/* Bearbeiten-Button */}
        <button
          className="ml-2 w-fit pr-2 pl-3 h-8 rounded-md bg-orange-500 flex items-center justify-center hover:bg-orange-400"
          onClick={togglePopup}
        >
          <div className="w-full flex h-5 gap-2">
            <p className="text-white">bearbeiten</p>
            <img src={pencil2} alt="icon: pencil" width={30} />
          </div>
        </button>
        {showPopup && (
          <div className="fixed mt-52 bg-gray-500 bg-opacity-50 flex z-50 max-w-full">
            <div className="bg-white p-6 rounded-xl shadow-xl justify-center">
              <div>
                <button
                  onClick={togglePopup}
                  className="text-gray-400 hover:text-black justify-end w-1/2 border border-gray-300"
                >
                  ✕ Abbrechen
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={travelGoal}
                    alt="icon: mountain and building"
                    className="h-4"
                  />
                  <label className="text-sm font-medium">
                    {t("search.whereTravel") || "Wohin möchtest du reisen?"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      t("search.enterDestination") || "Reiseziel eingeben"
                    }
                    className="w-full mt-1 border rounded px-3 py-2"
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

                <div>
                  <img
                    src={plane}
                    alt="icon: mountain and building"
                    className="h-4"
                  />
                  <label className="text-sm font-medium">
                    Willst du fliegen?
                  </label>
                  <input
                    type="text"
                    placeholder={
                      t("search.addFlight") || "  +  Flug hinzufügen"
                    }
                    className="w-full hover:cursor-pointer mt-1 border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    <img
                      src={calendar}
                      alt="icon: mountain and building"
                      className="h-4"
                    />
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
                      className="w-full mt-1 border rounded px-3 py-2"
                      wrapperClassName="w-full"
                      placeholderText={
                        t("search.selectDate") || "Datum auswählen"
                      }
                      dateFormat="dd.MM.yyyy"
                      monthsShown={2}
                      isClearable
                      // selected={startDate}
                      selected={startDate}
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

                <div className="relative" ref={dropdownRef}>
                  <div className="font-semibold flex flex-row mb-1">
                    <img
                      src={persons}
                      alt="icon: group of 3 people"
                      className="h-5 pr-2"
                    />
                    <label className="text-sm font-medium">
                      {t("search.howManyPeople") ||
                        "Wie viele Personen reisen?"}
                    </label>
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
                                onClick={() =>
                                  setAdults(Math.max(1, adults - 1))
                                }
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
                            <span>
                              {t("search.children") || "Kinder (0 - 17 Jahre)"}
                            </span>
                            <div className="flex gap-2 items-center">
                              <button
                                className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                                onClick={() =>
                                  setChildren(Math.max(0, children - 1))
                                }
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
                                  {Array.from({ length: children }).map(
                                    (_, idx) => (
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
                                          <option value="Alter">
                                            Alter wählen
                                          </option>
                                          {Array.from({ length: 18 }).map(
                                            (_, age) => (
                                              <option
                                                key={age}
                                                value={age}
                                                className="justify-center text-center"
                                              >
                                                {age}&#32;Jahre
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    )
                                  )}
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
              </div>

              <div className="mt-6 mb-4 flex justify-between">
                <button
                  className="bg-indigo-900 text-black px-6 py-2 rounded hover:bg-indigo-800 w-full"
                  onClick={async () => {
                    handleSearch();

                    // Only fetch hotels if there is no error, myCity is valid, and both dates are selected
                    if (
                      myCity &&
                      validCities.includes(myCity) &&
                      startDate &&
                      endDate
                    ) {
                      getCombinedData();

                      togglePopup();

                      //Tag bei Zeitzonenverschiebung sonst falsch
                      const transformStartDate =
                        startDate.toLocaleDateString("sv-SE");
                      console.log("check of startDate:", transformStartDate);

                      const transformEndDate =
                        endDate.toLocaleDateString("sv-SE");
                      console.log("check of endDate:", transformEndDate);

                      navigate(
                        `/hotel-results?cityName=${encodeURIComponent(
                          myCity
                        )}&startDate=${transformStartDate}&endDate=${transformEndDate}&adults=${adults}&children=${children}`
                      );
                    } else if (!startDate || !endDate) {
                      setError("Bitte ein Reisedatum angeben!");
                    } else if (!myCity) {
                      setError("Bitte einen Städtenamen eingeben.");
                    } else if (!validCities.includes(myCity)) {
                      setError("Ungültigen Städtename gefunden!");
                    }
                  }}
                  style={{
                    backgroundColor: "#a8d5e2",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#a2ceda";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#a8d5e2";
                  }}
                >
                  {t("search.searchButton") || "Suchen"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniSearchbar;

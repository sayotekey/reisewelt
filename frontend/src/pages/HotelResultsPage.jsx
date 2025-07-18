import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";

import xButtonDelete from "../icons/x-solid-black.svg";
import persons from "../icons/people-group-solid-black.svg";
import plane from "../icons/plane-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import calendar from "../icons/calendar-days-solid-black.svg";
// import pencil from "../icons/pencil-solid-black.svg";
import pencil2 from "../icons/pencil-solid-white.svg";
// import wishlistHeartFull from "../icons/heart-solid-black.svg";
import wishlistHeartEmpty from "../icons/heart-regular-black.svg";
import {
  // FaCalendarAlt,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaBed,
  FaUtensils,
  FaSpinner,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
  FaBuilding,
  FaSnowflake,
  FaSpa,
  FaDumbbell,
} from "react-icons/fa";
import validCities from "../utils/validCities.js";
import hotelRooms from "../data/hotelRooms";

import { useTranslate } from "../locales/index.js"; // Import the translation context

import gptExample from "../images/chat-gpt-example.png";

// handleEdit

const HotelResultsPage = () => {
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);

  // const myCity = query.get("city");
  // const startDate = query.get("start");
  // const endDate = query.get("end");
  // const adults = query.get("adults");
  // const children = query.get("children");

  // const [myUuid, setMyUuid] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [cityError, setCityError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");
  const [error, setError] = useState("");
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
    setHotels(lastHotels);
    setLoading(false);
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
    if (e.target.value.trim() !== "") {
      setErrorInfo("");
    }
  };

  ///
  useEffect(() => {
    // Nur ausführen, wenn alle Parameter vorhanden sind (children kann auch 0 sein)
    if (
      myCity &&
      startDate &&
      endDate &&
      typeof adults === "number" &&
      typeof children === "number"
    ) {
      setLoading(true);
      setError("");
      setHotels([]);
      axios
        .get("http://localhost:3000/api/uuid/generate", {
          params: {
            cityName: myCity,
            startDate,
            endDate,
            adults,
            children,
          },
        })
        .then((response) => {
          setHotels(response.data.hotels || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Fehler beim Laden der Hotels.");
          setLoading(false);
        });
    }
  }, [myCity, startDate, endDate, adults, children]);
  ///
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
    if (!myCity) {
      setCityError("Bitte einen Städtenamen eingeben.");
    } else if (!validCities.includes(myCity)) {
      setCityError("Ungültiger Städtename, bitte Eingabe überprüfen.");
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
        "http://localhost:3000/api/uuid/generate",
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

      const url = `http://localhost:3000/api/uuid/status/${myUuid}`;
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
          const urlHotel = "http://localhost:3000/api/uuid/hotels";
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
    <div className="block w-full mt-24">
      {/* MiniSearchbar */}
      <div className="flex justify-center items-center">
        <div className="bg-white border relative border-orange-500 rounded px-3 py-3 flex items-center space-x-4 w-fit shadow-md">
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
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/40 h-2/3 bg-opacity-50 z-50 flex items-center justify-center">
              {/*  bg-gray-500  w-full */}
              <div className="bg-white w-2/3 p-6 rounded-xl shadow-xl border border-gray-200 justify-center">
                <div className="w-full flex relative">
                  <div className="w-3/4">
                    <p>
                      {errorInfo && (
                        <div className="text-red-600 mt-2">{errorInfo}</div>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={togglePopup}
                    className="text-gray-400 p-2 hover:text-black absolute top-0 right-0 w-fit border border-gray-300"
                  >
                    <img src={xButtonDelete} alt="icon: x" width={15} />
                  </button>
                </div>
                {/* Reiseziel */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="relative">
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
                        className="absolute -right-1 top-16 -translate-y-1/2 text-gray-300 cursor-pointer min-w-2"
                        onClick={() => setMyCity("")}
                        tabIndex={-1}
                        aria-label="Eingabe löschen"
                      >
                        <div className="w-10 h-10 flex justify-center">
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
                          // Fehler ausblenden, wenn beide Daten gesetzt sind
                          if (update[0] && update[1]) {
                            setErrorInfo("");
                          }
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
                        {adults} {t("search.adults") || "Erwachsene"},{" "}
                        {children}
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
                                {t("search.children") ||
                                  "Kinder (0 - 17 Jahre)"}
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
                        // setError("Bitte ein Reisedatum angeben!");
                        setErrorInfo("Bitte ein Reisedatum angeben!");
                      } else if (!myCity) {
                        setErrorInfo("Bitte einen Städtenamen eingeben.");
                      } else if (!validCities.includes(myCity)) {
                        setErrorInfo("Ungültigen Städtename gefunden!");
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
      {/* Filter */}
      <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-600">Filter</h2>
          <button
            // onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Zurücksetzen
          </button>
        </div>

        <div className="space-y-6">
          {/* 1. Preiskategorie */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Preiskategorie
            </label>
            <select
              // value={filters.priceRange}
              // onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
            >
              <option value="all">Alle Preise</option>
              <option value="under300">Unter 300€</option>
              <option value="300-350">300€ - 350€</option>
              <option value="over350">Über 350€</option>
            </select>
          </div>

          {/* 2. Sterne */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Sterne
            </label>
            <select
              // value={filters.stars}
              // onChange={(e) => handleFilterChange("stars", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Alle Sterne</option>
              <option value="3">3 Sterne</option>
              <option value="4">4 Sterne</option>
              <option value="5">5 Sterne</option>
            </select>
          </div>

          {/* 3. Bewertung */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Bewertung
            </label>
            <select
              // value={filters.rating}
              // onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Alle Bewertungen</option>
              <option value="above80">Ab 80%</option>
              <option value="above90">Ab 90%</option>
              <option value="above95">Ab 95%</option>
            </select>
          </div>

          {/* 4. Stadtteil */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Stadtteil
            </label>
            <select
              // value={filters.district}
              // onChange={(e) => handleFilterChange("district", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Alle Stadtteile</option>
              <option value="Altstadt">Altstadt</option>
              <option value="Speicherstadt">Speicherstadt</option>
              <option value="St. Pauli">St. Pauli</option>
              <option value="Rotherbaum">Rotherbaum</option>
              <option value="Neustadt">Neustadt</option>
              <option value="Harburg">Harburg</option>
            </select>
          </div>

          {/* 5. Verpflegung */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Verpflegung
            </label>
            <select
              // value={filters.breakfast}
              // onChange={(e) => handleFilterChange("breakfast", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Alle Optionen</option>
              <option value="Frühstück">Frühstück</option>
              <option value="Halbpension">Halbpension</option>
              <option value="All-Inclusive">All-Inclusive</option>
            </select>
          </div>

          {/* 6. Zimmertyp */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">
              Zimmertyp
            </label>
            <select
              // value={filters.roomType}
              // onChange={(e) => handleFilterChange("roomType", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Alle Zimmertypen</option>
              <option value="Economy">Economy</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Ausstattung */}
          <div>
            <label className="block font-semibold text-gray-600 mb-3">
              Ausstattung
            </label>
            <div className="space-y-3">
              {[
                {
                  key: "parking",
                  label: "Parkplatz",
                  // value: filters.parking,
                  icon: <FaCar className="text-blue-400" />,
                },
                {
                  key: "petFriendly",
                  label: "Haustierfreundlich",
                  // value: filters.petFriendly,
                  icon: <FaDog className="text-blue-400" />,
                },
                {
                  key: "businessCenter",
                  label: "Business Center",
                  // value: filters.businessCenter,
                  icon: <FaBuilding className="text-blue-400" />,
                },
                {
                  key: "pool",
                  label: "Pool",
                  // value: filters.pool,
                  icon: <FaSwimmingPool className="text-blue-400" />,
                },
                {
                  key: "wifi",
                  label: "WLAN",
                  // value: filters.wifi,
                  icon: <FaWifi className="text-blue-400" />,
                },
                {
                  key: "airConditioning",
                  label: "Klimaanlage",
                  // value: filters.airConditioning,
                  icon: <FaSnowflake className="text-blue-400" />,
                },
                {
                  key: "spa",
                  label: "Spa",
                  // value: filters.spa,
                  icon: <FaSpa className="text-blue-400" />,
                },
                {
                  key: "fitness",
                  label: "Fitnessstudio",
                  // value: filters.fitness,
                  icon: <FaDumbbell className="text-blue-400" />,
                },
              ].map((filter) => (
                <label
                  key={filter.key}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    // checked={filter.value}
                    // onChange={(e) =>
                    //   handleFilterChange(filter.key, e.target.checked)
                    // }
                    className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                  />
                  {filter.icon}
                  <span className="text-gray-600">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sortierung */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Sortieren nach
            </label>
            <select
              // value={filters.sortBy}
              // onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">Bewertung (höchste zuerst)</option>
              <option value="price_low">Preis (niedrigste zuerst)</option>
              <option value="price_high">Preis (höchste zuerst)</option>
              <option value="stars">Sterne (höchste zuerst)</option>
            </select>
          </div>
        </div>
      </aside>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Gefundene Hotels</h1>
        {loading && (
          <div className="flex items-center gap-2 text-blue-600 text-lg mb-4">
            <FaSpinner className="animate-spin" />
            Hotels werden geladen...
          </div>
        )}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {hotels.length === 0 ? (
          <p>Keine Hotels gefunden.</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.hotel.dupeId}>
              <p className="text-gray-600">
                {hotels.length} Angebote für Hotels in{" "}
                {myCity || lastSearches[0]?.to} verfügbar
              </p>
              <div
                className="flex flex-col md:flex-row bg-gray-50 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                onClick={() =>
                  (window.location.href = `/hotel/${hotel.hotel.dupeId}`)
                }
              ></div>
              <div className="w-full md:w-[320px] h-[250px] md:h-[220px] overflow-hidden rounded-lg ml-4 mt-4">
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
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1 ml-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-700">
                      {hotel.hotel.name
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h3>
                    {/* <p>{Bewertung später}</p> */}

                    <div className="flex items-center">
                      {/*  {[...Array(hotel.stars)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-lg" />
                                          ))}
                                        </div>
                  */}
                    </div>
                    <p className="text-gray-600 mb-1 flex items-center">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      {/* {hotel.district}, {hotel.location} */}
                    </p>
                    <p className="text-blue-400 font-semibold mb-2 flex items-center">
                      <FaThumbsUp className="text-blue-400 mr-2" />
                      {/* {hotel.rating} */}positive Bewertungen
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {hotel.offers?.[0]?.checkInDate
                        ? new Date(
                            hotel.offers[0].checkInDate
                          ).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                      &#32; &#45;&#32;
                      {hotel.offers?.[0]?.checkOutDate
                        ? new Date(
                            hotel.offers[0].checkOutDate
                          ).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </p>

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
                    {/* Anzahl + Erwachsene(r) */}
                    {/* Kinder und Erwachsene zusammen als Personen zählen */}
                    <p>
                      {hotel.offers[0].guests.adults}&#32;
                      {hotel.offers[0].guests.adults > 1
                        ? "Personen"
                        : "Person"}
                    </p>
                    {/* Kinder normalerweise extra */}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/*} {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >*/}
                    {/* {amenity} */}
                    {/* </span> */}
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaBed className="text-gray-500 mr-2" />
                      {/* Zeige den passenden Wert aus hotelRooms basierend auf category */}
                      {hotelRooms[hotel.offers[0].roomEstimated?.category] ||
                        hotelRooms.STANDARD_ROOM}

                      <FaUtensils className="text-gray-500 mx-2" />
                      {hotel.offers[0].boardtype?.toLowerCase() === "breakfast"
                        ? "Frühstück inklusive"
                        : ""}
                    </p>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        <p>
                          Preis ab:{" "}
                          {hotel.offers[0].price.total
                            ? hotel.offers[0].price.total.replace(".", ",")
                            : ""}{" "}
                          {hotel.offers[0].price.currency}{" "}
                          {hotel.offers[0]?.price.currency.replace("EUR", "€")}
                        </p>{" "}
                      </div>

                      <button className="mt-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg">
                        Buchen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelResultsPage;
